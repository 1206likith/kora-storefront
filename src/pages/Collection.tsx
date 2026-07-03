/* Collection / PLP — SPEC "Collection". Driven by the slug via collectionFor(). */
import { useMemo, useState } from 'react';
import './Collection.css';
import ProductCard from '../components/ProductCard';
import { collectionFor, type Product } from '../data/catalog';
import { BRANDS } from '../data/brands';
import { go } from '../router';

const BRAND_FILTERS = BRANDS.map((b) => b.name); // the real 8 brand names
const PRICE_FILTERS: { label: string; min: number; max: number }[] = [
  { label: '₹0–500', min: 0, max: 500 },
  { label: '₹500–1000', min: 500, max: 1000 },
  { label: '₹1000–2000', min: 1000, max: 2000 },
  { label: '₹2000+', min: 2000, max: Infinity },
];
const SIZE_FILTERS = [3, 4, 5, 6, 7, 8, 9];
const OCCASION_FILTERS = ['Work', 'Party', 'Wedding', 'Casual'];
const SWATCHES = ['#1c1c1a', '#c9a227', '#a85c43', '#e2570f', '#14245c', '#e8c4b8', '#5ed17e'];
const SORTS = ['Newest', 'Price ↑', 'Price ↓', 'Best Selling', 'Top Rated'] as const;
type Sort = typeof SORTS[number];

interface Props {
  slug?: string;
}

export default function Collection({ slug = 'all' }: Props) {
  const [sort, setSort] = useState<Sort>('Newest');
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [priceSel, setPriceSel] = useState<string[]>([]);

  const { title, crumb, products: base } = useMemo(() => collectionFor(slug), [slug]);

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const clearAll = () => {
    setBrandSel([]);
    setPriceSel([]);
    setSort('Newest');
  };

  const products: Product[] = useMemo(() => {
    let list = base;
    if (brandSel.length) list = list.filter((p) => brandSel.includes(p.brandName));
    if (priceSel.length) {
      const ranges = PRICE_FILTERS.filter((r) => priceSel.includes(r.label));
      list = list.filter((p) => ranges.some((r) => p.price >= r.min && p.price < r.max));
    }
    const copy = [...list];
    if (sort === 'Price ↑') copy.sort((a, b) => a.price - b.price);
    if (sort === 'Price ↓') copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [base, brandSel, priceSel, sort]);

  return (
    <div className="coll">
      <section className="coll-hero">
        <div className="kora-wrap">
          <div className="coll-crumb">{crumb}</div>
          <h1 className="coll-title">{title} collection</h1>
          <div className="coll-sub">{products.length} styles · Updated weekly</div>
        </div>
      </section>

      <section className="section">
        <div className="kora-wrap coll-layout">
          <aside className="coll-filters">
            <div className="coll-filter-head">
              <span className="coll-filter-heading">Filters</span>
              <a
                href="#"
                className="coll-clear"
                onClick={(e) => { e.preventDefault(); clearAll(); }}
              >
                Clear all
              </a>
            </div>

            <div className="coll-filter-group">
              <div className="coll-filter-title">Brand</div>
              {BRAND_FILTERS.map((b) => (
                <label className="coll-check" key={b}>
                  <input
                    type="checkbox"
                    checked={brandSel.includes(b)}
                    onChange={() => setBrandSel((s) => toggle(s, b))}
                  /> {b}
                </label>
              ))}
            </div>

            <div className="coll-filter-group">
              <div className="coll-filter-title">Price</div>
              {PRICE_FILTERS.map((p) => (
                <label className="coll-check" key={p.label}>
                  <input
                    type="checkbox"
                    checked={priceSel.includes(p.label)}
                    onChange={() => setPriceSel((s) => toggle(s, p.label))}
                  /> {p.label}
                </label>
              ))}
            </div>

            <div className="coll-filter-group">
              <div className="coll-filter-title">Size</div>
              {SIZE_FILTERS.map((s) => (
                <label className="coll-check" key={s}>
                  <input type="checkbox" /> UK {s}
                </label>
              ))}
            </div>

            <div className="coll-filter-group">
              <div className="coll-filter-title">Occasion</div>
              {OCCASION_FILTERS.map((o) => (
                <label className="coll-check" key={o}>
                  <input type="checkbox" /> {o}
                </label>
              ))}
            </div>

            <div className="coll-filter-group">
              <div className="coll-filter-title">Colour</div>
              <div className="coll-swatches">
                {SWATCHES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="coll-swatch"
                    style={{ background: c }}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>
          </aside>

          <div className="coll-main">
            <div className="coll-sortrow">
              {SORTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={s === sort ? 'coll-sortpill coll-sortpill--active' : 'coll-sortpill'}
                  onClick={() => setSort(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="coll-grid">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  onOpen={(prod) => go('/product/' + prod.id)}
                  onAdd={(prod) => go('/product/' + prod.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
