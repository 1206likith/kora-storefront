/* Search results — filters the full catalogue by name / brand / category and
   reuses the collection grid + ProductCard. Route: #/search/<query>. */
import { useMemo } from 'react';
import './Collection.css';
import ProductCard from '../components/ProductCard';
import { DEMO_PRODUCTS, type Product } from '../data/catalog';
import { go } from '../router';

interface Props {
  query?: string;
}

export default function SearchResults({ query = '' }: Props) {
  const q = decodeURIComponent(query).trim();
  const needle = q.toLowerCase();

  const results: Product[] = useMemo(() => {
    if (!needle) return [];
    return DEMO_PRODUCTS.filter((p) =>
      [p.name, p.brandName, p.cat].some((f) => f.toLowerCase().includes(needle)),
    );
  }, [needle]);

  return (
    <div className="coll">
      <section className="srp-hero kora-wrap">
        <div className="srp-crumb">Home › Search</div>
        <h1 className="srp-title">Search results for "{q}"</h1>
        <div className="srp-sub">{results.length} {results.length === 1 ? 'result' : 'results'}</div>
      </section>

      <section className="section">
        <div className="kora-wrap">
          {results.length > 0 ? (
            <div className="coll-grid">
              {results.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  onOpen={(prod) => go('/product/' + prod.id)}
                  onAdd={(prod) => go('/product/' + prod.id)}
                />
              ))}
            </div>
          ) : (
            <div className="srp-empty">
              <p>
                {q
                  ? `We couldn't find anything for "${q}". Try a brand, a style, or a category like "sneakers".`
                  : 'Type something in the search bar to find your next pair.'}
              </p>
              <button type="button" className="btn-navy" onClick={() => go('/collection/all')}>
                Browse everything →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
