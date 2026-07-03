/* Product model + catalog.
   Data source today: a real 64-product sample pulled live from the KORA Wix
   Stores catalog (kora-products.json), brand-balanced across all 8 brands.
   Integration seam: `getProducts()` returns this today; swap its body for a live
   @wix/stores query to drive the full 527-product catalog with zero component
   changes. Image URLs are rebuilt from the stored wixstatic media id. */
import raw from './kora-products.json';

export interface Product {
  id: string;
  brand: string;      // brand key (see brands.ts)
  brandName: string;
  name: string;
  cat: string;
  price: number;      // whole ₹, no paise
  mrp?: number;
  badge?: 'NEW' | 'BESTSELLER' | 'SELLING FAST' | 'MOST LOVED';
  image?: string;
  gender?: 'men' | 'women' | 'kids';
  description?: string;
  images?: string[];
  sizes?: string[];
}

interface RawProduct { i: string; b: string; n: string; c: string; p: number; m: number; g: string; im: string; x?: string; d?: string; ims?: string[]; sz?: string[]; }

const BRAND_NAME: Record<string, string> = {
  kora: 'KORA', escalade: 'ESCALADE', asc: 'ASC', klasis: 'KLASIS',
  koraprox: 'KORAPROX', mediplus: 'MEDIPLUS', robur: 'ROBUR', kkids: 'KKIDS',
};

const mediaUrl = (im: string) =>
  `https://static.wixstatic.com/media/${im}/v1/fit/w_640,h_640,q_85/file.${im.split('.').pop()}`;

export const DEMO_PRODUCTS: Product[] = (raw as RawProduct[]).map((r) => ({
  id: r.i,
  brand: r.b,
  brandName: BRAND_NAME[r.b] ?? r.b.toUpperCase(),
  name: r.n,
  cat: r.c,
  price: r.p,
  ...(r.m && r.m > r.p ? { mrp: r.m } : {}),
  ...(r.g ? { badge: r.g as Product['badge'] } : {}),
  ...(r.x ? { gender: r.x as Product['gender'] } : {}),
  ...(r.d ? { description: r.d } : {}),
  ...(r.ims && r.ims.length ? { images: r.ims.map(mediaUrl) } : {}),
  ...(r.sz && r.sz.length ? { sizes: r.sz } : {}),
  image: mediaUrl(r.im),
}));

/* Semantic selectors — pick products by meaning, not by array position, so they
   stay correct against the live catalogue's ordering/size. Each pads from the
   full list if there aren't enough tagged items. */
const pick = (filtered: Product[], n: number) =>
  (filtered.length >= n ? filtered : [...filtered, ...DEMO_PRODUCTS]).slice(0, n);

export const newArrivals = (n = 8) => pick(DEMO_PRODUCTS.filter((p) => p.badge === 'NEW'), n);
export const bestsellers = (n = 8) => pick(DEMO_PRODUCTS.filter((p) => p.badge === 'BESTSELLER'), n);
export const byBrand = (brand: string, n = 8) => pick(DEMO_PRODUCTS.filter((p) => p.brand === brand), n);
export const under = (max: number, n = 3) => pick(DEMO_PRODUCTS.filter((p) => p.price < max), n);

type Gender = NonNullable<Product['gender']>;
export const byGender = (g: Gender, n?: number) => {
  const filtered = DEMO_PRODUCTS.filter((p) => p.gender === g);
  return n == null ? filtered : pick(filtered, n);
};

/* slugify — lowercase, collapse spaces/& into single dashes. */
export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const titleCase = (s: string) =>
  s.split('-').filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const BRAND_KEYS = new Set(Object.keys(BRAND_NAME));
const GENDERS: Gender[] = ['men', 'women', 'kids'];

export interface Collection {
  title: string;
  crumb: string;
  products: Product[];
}

/* Resolve a collection slug to a title, breadcrumb and product list.
   First match wins; unknown slugs fall back to the full catalogue. */
export function collectionFor(slug: string): Collection {
  const s = (slug || 'all').toLowerCase();
  let products: Product[];

  if (s === 'all') {
    products = DEMO_PRODUCTS;
  } else if (s === 'new') {
    products = DEMO_PRODUCTS.filter((p) => p.badge === 'NEW');
  } else if (s === 'bestsellers') {
    products = DEMO_PRODUCTS.filter((p) => p.badge === 'BESTSELLER');
  } else if (s === 'sale' || s === 'under-1000') {
    products = DEMO_PRODUCTS.filter((p) => p.price < 1000);
  } else if (GENDERS.includes(s as Gender)) {
    const byG = DEMO_PRODUCTS.filter((p) => p.gender === (s as Gender));
    products = byG.length > 0 ? byG : DEMO_PRODUCTS; // fallback: all, if no gender data
  } else if (BRAND_KEYS.has(s)) {
    products = DEMO_PRODUCTS.filter((p) => p.brand === s);
  } else {
    const byType = DEMO_PRODUCTS.filter((p) => slugify(p.cat) === s);
    products = byType.length > 0 ? byType : DEMO_PRODUCTS;
  }

  const title =
    s === 'under-1000' ? 'Under ₹1000'
    : s === 'all' ? 'All'
    : BRAND_KEYS.has(s) ? (BRAND_NAME[s] ?? titleCase(s))
    : titleCase(s);

  return { title, crumb: `Home › ${title}`, products };
}

/* ₹ formatting — en-IN grouping, no paise (SPEC). */
export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
export const savePct = (price: number, mrp?: number) =>
  mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

export async function getProducts(): Promise<Product[]> {
  // TODO(integration): replace with the live full Wix Stores catalog (527 products)
  //   import { products } from '@wix/stores';
  //   const res = await products.queryProducts().find();
  //   return res.items.map(mapWixProduct);
  return DEMO_PRODUCTS;
}

export const badgeColor = (b?: Product['badge']): { bg: string; fg: string } => {
  switch (b) {
    case 'NEW':
    case 'BESTSELLER':   return { bg: '#c9a227', fg: '#0c0c0e' };
    case 'SELLING FAST': return { bg: '#d24a17', fg: '#ffffff' };
    case 'MOST LOVED':   return { bg: '#d98aa0', fg: '#0c0c0e' };
    default:             return { bg: 'transparent', fg: '#fff' };
  }
};
