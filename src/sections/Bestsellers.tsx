import ProductCard from '../components/ProductCard';
import { bestsellers } from '../data/catalog';

export default function Bestsellers() {
  const products = bestsellers(8);

  return (
    <section className="section section--warm">
      <div className="kora-wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Loved by thousands</div>
            <h2 className="h2">Bestsellers</h2>
          </div>
          <a className="viewall" href="#">View all →</a>
        </div>
        <div className="pgrid">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
