import ProductCard from '../components/ProductCard';
import { newArrivals } from '../data/catalog';
import { go } from '../router';

export default function NewIn() {
  const products = newArrivals(8);

  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Just dropped</div>
            <h2 className="h2">New in</h2>
          </div>
          <a className="viewall" href="#/collection/new">View all →</a>
        </div>
        <div className="rail">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              width={248}
              onOpen={(prod) => go('/product/' + prod.id)}
              onAdd={(prod) => go('/product/' + prod.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
