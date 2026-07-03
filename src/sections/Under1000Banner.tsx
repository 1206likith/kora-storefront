import './Under1000Banner.css';
import ProductCard from '../components/ProductCard';
import { DEMO_PRODUCTS } from '../data/catalog';
import { go } from '../router';

export default function Under1000Banner() {
  const products = DEMO_PRODUCTS.filter((p) => p.price < 1000).slice(0, 3);

  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="u1k-card">
          <div className="u1k-copy">
            <div className="u1k-eyebrow">Budget buys</div>
            <h2 className="u1k-title">Everything under ₹1000</h2>
            <p className="u1k-sub">Great shoes shouldn't cost a fortune. Sliders, flats, and everyday styles that keep it light on your wallet.</p>
            <a className="u1k-cta" href="#/collection/under-1000">Shop under ₹1000 →</a>
          </div>
          <div className="u1k-products">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                width={200}
                onOpen={(prod) => go('/product/' + prod.id)}
                onAdd={(prod) => go('/product/' + prod.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
