/* Applies content-editor edits to the SiteContent collection, then the workflow
   rebuilds (which re-syncs SiteContent -> content.json). Runs in CI only.
   Env: WIX_API_KEY (secret), WIX_ACCOUNT_ID, WIX_SITE_ID, CONTENT_CHANGES (JSON
   array of { key, text? , richText?, image? } from the editor's dispatch). */
const API = 'https://www.wixapis.com';
const KEY = process.env.WIX_API_KEY;
const ACC = process.env.WIX_ACCOUNT_ID;
const SITE = process.env.WIX_SITE_ID;
const changes = JSON.parse(process.env.CONTENT_CHANGES || '[]');

const headers = () => ({ 'Content-Type': 'application/json', Authorization: KEY, 'wix-account-id': ACC, 'wix-site-id': SITE });
async function api(path, body) {
  const r = await fetch(API + path, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`${path} -> ${r.status} ${(await r.text()).slice(0, 300)}`);
  return r.json();
}

async function main() {
  if (!KEY) { console.log('[apply-content] WIX_API_KEY not set — skipping.'); return; }
  if (!Array.isArray(changes) || changes.length === 0) { console.log('[apply-content] no changes.'); return; }

  const byKey = new Map();
  let cursor = null;
  for (let i = 0; i < 40; i++) {
    const r = await api('/wix-data/v2/items/query', { dataCollectionId: 'SiteContent', query: { cursorPaging: cursor ? { limit: 100, cursor } : { limit: 100 } } });
    for (const it of (r.dataItems || r.items || [])) {
      const d = it.data || it;
      byKey.set(d.key, { id: it._id || it.id || d._id, data: d });
    }
    cursor = r.pagingMetadata?.cursors?.next;
    if (!r.pagingMetadata?.hasNext || !cursor) break;
  }

  const dataItems = [];
  for (const ch of changes) {
    const cur = byKey.get(ch.key);
    if (!cur) { console.warn('[apply-content] unknown key:', ch.key); continue; }
    const data = { ...cur.data };
    if (ch.richText != null) data.richText = ch.richText;
    else if (ch.text != null) data.text = ch.text;
    if (ch.image != null) data.image = ch.image;
    dataItems.push({ id: cur.id, data });
  }
  if (!dataItems.length) { console.log('[apply-content] nothing to apply.'); return; }

  let ok = 0;
  for (let i = 0; i < dataItems.length; i += 100) {
    const res = await api('/wix-data/v2/bulk/items/update', { dataCollectionId: 'SiteContent', dataItems: dataItems.slice(i, i + 100) });
    ok += res.bulkActionMetadata?.totalSuccesses || 0;
  }
  console.log(`[apply-content] applied ${ok}/${dataItems.length} changes to SiteContent.`);
}
main().catch((e) => { console.error('[apply-content]', e.message); process.exit(1); });
