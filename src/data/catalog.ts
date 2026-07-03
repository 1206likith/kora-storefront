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
}

interface RawProduct { i: string; b: string; n: string; c: string; p: number; m: number; g: string; im: string; }

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
