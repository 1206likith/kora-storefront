/* Wishlist page — saved products from localStorage, rendered with the same
   collection grid + ProductCard. Route: #/wishlist. */
import './Collection.css';
import ProductCard from '../components/ProductCard';
import { DEMO_PRODUCTS, type Product } from '../data/catalog';
import { go } from '../router';
import { useWishlist } from '../wishlist';

export default function Wishlist() {
  const { ids } = useWishlist();
  const saved: Product[] = DEMO_PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="coll">
      <section className="srp-hero kora-wrap">
        <div className="srp-crumb">Home › Wishlist</div>
        <h1 className="srp-title">Your wishlist</h1>
        <div className="srp-sub">{saved.length} {saved.length === 1 ? 'saved item' : 'saved items'}</div>
      </section>

      <section className="section">
        <div className="kora-wrap">
          {saved.length > 0 ? (
            <div className="coll-grid">
              {saved.map((p) => (
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
              <p>Nothing saved yet. Tap the heart on any product to keep it here.</p>
              <button type="button" className="btn-navy" onClick={() => go('/collection/all')}>
                Discover shoes →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
