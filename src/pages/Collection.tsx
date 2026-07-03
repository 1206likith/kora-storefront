/* Collection / PLP — SPEC "Collection". Demo = Women's Heels. */
import { useMemo, useState } from 'react';
import './Collection.css';
import ProductCard from '../components/ProductCard';
import { DEMO_PRODUCTS, type Product } from '../data/catalog';
import { go } from '../router';

const BRAND_FILTERS = ['KORA', 'ASC', 'KLASIS'];
const PRICE_FILTERS = ['₹0–500', '₹500–1000', '₹1000–2000', '₹2000+'];
const SIZE_FILTERS = [3, 4, 5, 6, 7, 8, 9];
const OCCASION_FILTERS = ['Work', 'Party', 'Wedding', 'Casual'];
const SWATCHES = ['#1c1c1a', '#c9a227', '#a85c43', '#e2570f', '#14245c', '#e8c4b8', '#5ed17e'];
const SORTS = ['Newest', 'Price ↑', 'Price ↓', 'Best Selling', 'Top Rated'] as const;
type Sort = typeof SORTS[number];

interface Props {
  slug?: string;
}

export default function Collection({ slug = 'heels' }: Props) {
  const [sort, setSort] = useState<Sort>('Newest');

  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const products: Product[] = useMemo(() => {
    const copy = [...DEMO_PRODUCTS];
    if (sort === 'Price ↑') copy.sort((a, b) => a.price - b.price);
    if (sort === 'Price ↓') copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [sort]);

  return (
    <div className="coll">
      <section className="coll-hero">
        <div className="kora-wrap">
          <div className="coll-crumb">Home › Women › Heels</div>
          <h1 className="coll-title">{title} collection</h1>
          <div className="coll-sub">128 styles · Updated weekly</div>
        </div>
      </section>

      <section className="section">
        <div className="kora-wrap coll-layout">
          <aside className="coll-filters">
            <div className="coll-filter-head">
              <span className="coll-filter-heading">Filters</span>
              <a href="#" className="coll-clear" onClick={(e) => e.preventDefault()}>Clear all</a>
            </div>

            <div className="coll-filter-group">
              <div className="coll-filter-title">Brand</div>
              {BRAND_FILTERS.map((b) => (
                <label className="coll-check" key={b}>
                  <input type="checkbox" /> {b}
                </label>
              ))}
            </div>

            <div className="coll-filter-group">
              <div className="coll-filter-title">Price</div>
              {PRICE_FILTERS.map((p) => (
                <label className="coll-check" key={p}>
                  <input type="checkbox" /> {p}
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
                <ProductCard key={p.id} p={p} onOpen={(prod) => go('/product/' + prod.id)} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
