/* Build-time CONTENT sync (Home + About editable copy/images).
 *
 * Reads the `SiteContent` CMS collection on "KORA Retail" (each row is one
 * editable field: { key, text, richText, image, group, order, note }) and
 * assembles src/data/content.json — a nested object keyed by the row's dotted
 * `key` (e.g. home.hero.slide.1.headline, about.materials.item.2.image).
 * Components read this with hardcoded fallbacks, so missing fields are harmless.
 *
 * Auth: the site's public headless client (WIX_CLIENT_ID, read-only). Bail-safe:
 * on any failure it leaves the committed content.json untouched.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, '..', 'src', 'data', 'content.json');
const cfg = JSON.parse(readFileSync(join(__dir, 'wix-catalog.config.json'), 'utf8'));
const CLIENT_ID = process.env.WIX_CLIENT_ID || cfg.clientId;
const API = 'https://www.wixapis.com';

function bail(msg) {
  console.warn(`[sync-content] ${msg} — keeping existing content.json.`);
  process.exit(0);
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
  if (!t) throw new Error('no access_token');
  return t;
}

// Wix IMAGE field -> static URL. Handles wix:image://v1/<id>/..., objects, or plain URLs.
function imageUrl(img) {
  if (!img) return '';
  const s = typeof img === 'string' ? img : img.url || img.src || img.id || img._id || '';
  if (!s) return '';
  if (s.startsWith('http')) return s;
  let m = s.match(/wix:image:\/\/v1\/([^/]+)/) || s.match(/\/media\/([^/]+)/);
  if (m) return `https://static.wixstatic.com/media/${m[1]}`;
  if (/~mv2\.\w+$/.test(s)) return `https://static.wixstatic.com/media/${s}`;
  return '';
}

function setDeep(root, keyPath, value) {
  const parts = keyPath.split('.');
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    const nextIsIndex = /^\d+$/.test(parts[i + 1]);
    if (cur[k] == null) cur[k] = nextIsIndex ? [] : {};
    cur = cur[k];
  }
  cur[parts[parts.length - 1]] = value;
}

async function queryAll(token) {
  const out = [];
  let cursor = null;
  for (let i = 0; i < 40; i++) {
    const body = { dataCollectionId: 'SiteContent', query: { cursorPaging: cursor ? { limit: 100, cursor } : { limit: 100 } } };
    const r = await api('/wix-data/v2/items/query', body, token);
    const items = r.dataItems || r.items || [];
    for (const it of items) out.push(it.data || it.dataItem?.data || it);
    cursor = r.pagingMetadata?.cursors?.next;
    if (!r.pagingMetadata?.hasNext || !cursor) break;
  }
  return out;
}

async function main() {
  if (!CLIENT_ID) bail('WIX_CLIENT_ID not set');
  const token = await getToken();
  let rows;
  try { rows = await queryAll(token); }
  catch (e) { bail(`SiteContent query failed (${e.message})`); }
  if (!rows || rows.length === 0) bail('SiteContent empty or unavailable');

  const content = {};
  let imgCount = 0;
  for (const d of rows) {
    const key = d.key;
    if (!key) continue;
    const isImage = /\.(image|icon)$/.test(key);
    let value;
    if (isImage) { value = imageUrl(d.image); if (value) imgCount++; }
    else value = (d.richText && String(d.richText).trim()) || (d.text != null ? d.text : '');
    // skip empty non-image slots so component fallbacks win
    if (!isImage && (value === '' || value == null)) continue;
    if (isImage && !value) continue;
    setDeep(content, key, value);
  }

  writeFileSync(OUT, JSON.stringify(content));
  console.log(`[sync-content] wrote content.json from ${rows.length} rows (${imgCount} images).`);
}

main().catch((e) => bail(e.message));
