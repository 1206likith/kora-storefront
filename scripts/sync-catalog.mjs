/* Build-time catalogue sync.
 *
 * Reads the live Wix Stores catalogue on "KORA Retail" (the 528 KORA products the
 * owner manages in the Wix dashboard) and regenerates src/data/kora-products.json
 * in the compact shape catalog.ts already consumes: { i, b, n, c, p, m, g, im }.
 *
 * Auth: the site's existing headless OAuth client (public, read-only). Set env
 * WIX_CLIENT_ID (default falls back to the id in wix-catalog.config.json). The
 * client is bound to the site, so no siteId is needed for reads.
 *
 * On ANY failure it leaves the committed JSON untouched so the build still
 * succeeds with the last-known-good catalogue.
 *
 * No SDK dependency — plain fetch against documented Wix REST endpoints:
 *   POST /oauth2/token                     (anonymous visitor token)
 *   POST /categories/v1/categories/query   (category id -> name)
 *   POST /stores/v3/products/query         (all products, paginated + deduped)
 * Notes learned the hard way: products/QUERY paginates correctly with
 * {query:{cursorPaging:{limit,cursor}}}; products/SEARCH resets to page 1 when a
 * cursor is sent alongside other params, and QUERY can't filter by category — so
 * we read each product's own `directCategoriesInfo` (field DIRECT_CATEGORIES_INFO).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, '..', 'src', 'data', 'kora-products.json');
const cfg = JSON.parse(readFileSync(join(__dir, 'wix-catalog.config.json'), 'utf8'));

const CLIENT_ID = process.env.WIX_CLIENT_ID || cfg.clientId;
const API = 'https://www.wixapis.com';
const TREE = { appNamespace: '@wix/stores', treeKey: null };
const MIN_OK = 400; // sanity floor: never overwrite good data with a partial/empty pull

function bail(msg) {
  console.warn(`[sync-catalog] ${msg} — keeping existing kora-products.json.`);
  process.exit(0); // non-fatal: build proceeds with committed data
}

async function api(path, body, token) {
  const res = await fetch(API + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: token } : {}) },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function getToken() {
  const r = await api('/oauth2/token', { clientId: CLIENT_ID, grantType: 'anonymous' });
  const t = r.access_token || r.accessToken;
  if (!t) throw new Error('no access_token in oauth2 response');
  return t; // Wix REST wants the raw token in Authorization
}

const cid = (c) => c?.id || c?._id;

// Extract the wixstatic media id (e.g. 5da6bd_hash~mv2.jpg) from any Wix image shape.
function mediaId(image) {
  if (!image) return '';
  const s = typeof image === 'string' ? image : image.url || image.id || image._id || '';
  if (!s) return '';
  let m = s.match(/\/media\/([^/]+)/);        // https://static.wixstatic.com/media/<id>/...
  if (m) return m[1];
  m = s.match(/wix:image:\/\/v1\/([^/]+)/);    // wix:image://v1/<id>/...
  if (m) return m[1];
  if (/~mv2\.\w+$/.test(s)) return s;          // already a bare id
  return '';
}
function pickMainImage(p) {
  const m = p.media || {};
  return mediaId(m.main?.image) || mediaId(m.itemsInfo?.items?.[0]?.image) || '';
}
function priceOf(p) {
  const a = p.actualPriceRange?.minValue?.amount ?? p.actualPriceRange?.maxValue?.amount;
  const n = Number(a);
  return Number.isFinite(n) ? Math.round(n) : 0;
}
function mrpOf(p, price) {
  const c = p.compareAtPriceRange?.minValue?.amount;
  const n = Number(c);
  return Number.isFinite(n) && n > price ? Math.round(n) : 0;
}
const titleCase = (s) => (s || '').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

async function queryAllProducts(token) {
  const byId = new Map();
  let cursor = null;
  for (let i = 0; i < 40; i++) {
    const r = await api('/stores/v3/products/query', {
      query: { cursorPaging: cursor ? { limit: 100, cursor } : { limit: 100 } },
      fields: ['CURRENCY', 'MEDIA_ITEMS_INFO', 'DIRECT_CATEGORIES_INFO'],
    }, token);
    for (const p of r.products || []) byId.set(p.id, p);
    cursor = r.pagingMetadata?.cursors?.next;
    if (!r.pagingMetadata?.hasNext || !cursor) break;
  }
  return [...byId.values()];
}

async function main() {
  if (!CLIENT_ID) bail('WIX_CLIENT_ID not set');
  const token = await getToken();

  // category id -> name
  const catRes = await api('/categories/v1/categories/query', { query: { cursorPaging: { limit: 200 } }, treeReference: TREE }, token);
  const nameById = new Map((catRes.categories || []).map((c) => [cid(c), c.name]));
  const typeSet = new Set(cfg.typeCategoryNames);

  const products = await queryAllProducts(token);
  if (products.length < MIN_OK) bail(`only ${products.length} products returned (expected ~528)`);

  const rows = products.map((p) => {
    const catNames = (p.directCategoriesInfo?.categories || [])
      .map((c) => nameById.get(cid(c)))
      .filter(Boolean);
    const brand = catNames.map((n) => cfg.brandKeyByCategoryName[n]).find(Boolean) || 'kora';
    const gender = catNames.map((n) => cfg.genderByCategoryName?.[n]).find(Boolean) || '';
    const cat = titleCase(catNames.find((n) => typeSet.has(n)) || 'Footwear');
    const ribbon = p.ribbon?.name || p.ribbon || '';
    let badge = cfg.ribbonToBadge[ribbon] || '';
    if (!badge && catNames.includes('BEST SELLER')) badge = 'BESTSELLER';
    if (!badge && catNames.includes('NEW ARRIVALS')) badge = 'NEW';
    const price = priceOf(p);
    return { i: p.id, b: brand, n: p.name, c: cat, p: price, m: mrpOf(p, price), g: badge, im: pickMainImage(p), x: gender };
  }).filter((r) => r.n && r.im);

  if (rows.length < MIN_OK) bail(`only ${rows.length} usable rows after mapping`);

  writeFileSync(OUT, JSON.stringify(rows));
  const byBrand = rows.reduce((a, r) => ((a[r.b] = (a[r.b] || 0) + 1), a), {});
  console.log(`[sync-catalog] wrote ${rows.length} products to kora-products.json`);
  console.log('[sync-catalog] by brand:', byBrand);
}

main().catch((e) => bail(e.message));
