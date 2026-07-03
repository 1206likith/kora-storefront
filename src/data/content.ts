/* Editable-content loader. Reads build-synced content.json, sourced from the
   `SiteContent` CMS collection on "KORA Retail". Every getter falls back to the
   value the caller passes in, so the site renders exactly as before until the
   owner edits content in the Wix dashboard (or the custom editor). Keys are the
   dotted paths seeded into SiteContent (e.g. 'home.hero.slide.1.headline'). */
import raw from './content.json';

const data = raw as Record<string, unknown>;
const at = (key: string): unknown =>
  key.split('.').reduce<unknown>(
    (a, k) => (a == null ? undefined : (a as Record<string, unknown>)[k]),
    data,
  );

/** Editable text with an inline fallback (the current hardcoded value). */
export function c(key: string, fallback = ''): string {
  const v = at(key);
  return typeof v === 'string' && v.length ? v : fallback;
}
/** Editable image URL ('' when unset — caller shows a placeholder). */
export function cimg(key: string, fallback = ''): string {
  const v = at(key);
  return typeof v === 'string' && v.length ? v : fallback;
}
/** CMS array at key (or [] — caller falls back to its hardcoded array). */
export function carr<T = unknown>(key: string): T[] {
  const v = at(key);
  return Array.isArray(v) ? (v as T[]) : [];
}
