/* Brand World (SPEC "Brand World") — per-brand color-world storefront page.
   Theme derives from the selected brand's primary/accent colors so every
   one of the 8 KORA sub-brands (light or dark) renders correctly with no
   per-brand branching logic. */
import type { CSSProperties } from 'react';
import './BrandWorld.css';
import ProductCard from '../components/ProductCard';
import { DEMO_PRODUCTS } from '../data/catalog';
import { brandByKey, onColor } from '../data/brands';
import { go } from '../router';

const SUBNAV = ['All', 'Formal', 'Casual', 'Sneakers', 'Loafers', 'New arrivals', 'Best sellers'];

const MATERIALS = [
  { title: 'Full-grain leather', copy: 'Sourced and tanned for strength that only gets better with wear.' },
  { title: 'Goodyear welt', copy: 'A stitched construction built to be resoled, not replaced.' },
  { title: 'Cushioned footbed', copy: 'Shaped for all-day support with zero break-in time.' },
  { title: 'Natural rubber sole', copy: 'Grip and give from a sole that moves the way you do.' },
];

export default function BrandWorld({ brandKey }: { brandKey?: string }) {
  const brand = brandByKey(brandKey ?? 'escalade')!;
  const text = onColor(brand.primary);
  const onAccent = onColor(brand.accent);
  const muted = text === '#ffffff' ? 'rgba(255,255,255,0.68)' : 'rgba(12,12,14,0.62)';

  const own = DEMO_PRODUCTS.filter((p) => p.brand === brand.key);
  const products = own.length >= 4 ? own : DEMO_PRODUCTS.slice(0, 8);

  const themeStyle = {
    '--bw-primary': brand.primary,
    '--bw-accent': brand.accent,
    '--bw-text': text,
    '--bw-muted': muted,
    '--bw-on-accent': onAccent,
  } as CSSProperties;

  return (
    <div className="bw" style={themeStyle}>
      {/* Hero */}
      <section className="bw-hero">
        <div className="kora-wrap bw-hero__inner">
          <span className="bw-hero__eyebrow">{brand.category}</span>
          <h1 className="bw-hero__name">{brand.name}</h1>
          <span className="bw-hero__bar" aria-hidden="true" />
          <p className="bw-hero__tagline">{brand.tagline}</p>
          <p className="bw-hero__copy">
            Explore the full {brand.name} world — engineered, styled and finished for how you
            actually move, with every pair backed by the KORA promise of craft you can feel.
          </p>
          <div className="bw-hero__ctas">
            <button className="bw-hero__shop" onClick={() => go('/collection/' + brand.key)}>
              Shop {brand.name}
            </button>
            <button className="bw-hero__story" onClick={() => go('/story')}>
              Our story
            </button>
          </div>
        </div>
      </section>

      {/* Sub-nav */}
      <nav className="bw-subnav">
        <div className="kora-wrap bw-subnav__rail">
          {SUBNAV.map((s, i) => (
            <button key={s} className={'bw-pill' + (i === 0 ? ' bw-pill--active' : '')}>
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* Drop countdown */}
      <section className="bw-drop">
        <div className="kora-wrap">
          <div className="bw-drop__card">
            <span className="bw-drop__eyebrow">New drop</span>
            <h2 className="bw-drop__title">{brand.name} Midnight Edition</h2>
            <p className="bw-drop__meta">Limited to 200 pairs · Drops in 02 : 14 : 33 : 08</p>
            <button className="bw-drop__notify">Notify me</button>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="section">
        <div className="kora-wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">{brand.name} catalog</span>
              <h2 className="h2">Shop the collection</h2>
            </div>
          </div>
          <div className="pgrid">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="bw-story">
        <div className="kora-wrap">
          <p className="bw-story__statement">{brand.tagline}</p>
        </div>
      </section>

      {/* The craft */}
      <section className="section section--warm">
        <div className="kora-wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">The craft</span>
              <h2 className="h2">What goes into every pair</h2>
            </div>
          </div>
          <div className="bw-craft__grid">
            {MATERIALS.map((m) => (
              <div key={m.title} className="bw-craft__card">
                <span className="bw-craft__diamond" aria-hidden="true" />
                <h3 className="bw-craft__title">{m.title}</h3>
                <p className="bw-craft__copy">{m.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
