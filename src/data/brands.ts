/* The 8 KORA sub-brands and their color worlds (SPEC.md "Per-brand color worlds"). */

export interface Brand {
  key: string;
  name: string;
  primary: string; // world background
  accent: string;  // highlight
  light: boolean;  // flips the world to a light theme
  tagline: string;
  category: string;
}

export const BRANDS: Brand[] = [
  { key: 'kora',     name: 'KORA',     primary: '#1a1a2e', accent: '#c9a227', light: false, tagline: 'The original. The flagship.',  category: 'Flagship · own line' },
  { key: 'escalade', name: 'ESCALADE', primary: '#0a0a0a', accent: '#7fff7f', light: false, tagline: 'Built for the bold.',          category: "Men's premium" },
  { key: 'asc',      name: 'ASC',      primary: '#e8c4b8', accent: '#a85c43', light: true,  tagline: 'Designed for her.',            category: "Women's line" },
  { key: 'klasis',   name: 'KLASIS',   primary: '#5d4037', accent: '#e8d9b5', light: false, tagline: 'Timeless by design.',          category: 'Classic · timeless' },
  { key: 'koraprox', name: 'KORAPROX', primary: '#1f5a23', accent: '#b0bec5', light: false, tagline: 'Move. Rest. Repeat.',          category: 'Athletic & homewear' },
  { key: 'mediplus', name: 'MEDIPLUS', primary: '#f4f6f7', accent: '#00acc1', light: true,  tagline: 'Comfort that heals.',          category: 'Medical comfort' },
  { key: 'robur',    name: 'ROBUR',    primary: '#2b3942', accent: '#d24a17', light: false, tagline: 'Built for the terrain.',       category: 'Rugged · outdoors' },
  { key: 'kkids',    name: 'KKIDS',    primary: '#e8730a', accent: '#ffd600', light: false, tagline: 'Big adventures. Small feet.',  category: 'Kids line' },
];

export const brandByKey = (k: string) => BRANDS.find((b) => b.key === k);

/* Contrast helper (SPEC): text on a color = luminance > 0.6 ? ink : white. */
export function onColor(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0c0c0e' : '#ffffff';
}
