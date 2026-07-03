import ProductCard from '../components/ProductCard';
import { bestsellers } from '../data/catalog';
import { c } from '../data/content';
import { go } from '../router';

export default function Bestsellers() {
  const products = bestsellers(8);

  return (
    <section className="section section--warm">
      <div className="kora-wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">{c('home.bestsellers.eyebrow', 'Loved by thousands')}</div>
            <h2 className="h2">{c('home.bestsellers.heading', 'Bestsellers')}</h2>
          </div>
          <a className="viewall" href="#/collection/bestsellers">{c('home.bestsellers.viewAllLabel', 'View all →')}</a>
        </div>
        <div className="pgrid">
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
    </section>
  );
}
