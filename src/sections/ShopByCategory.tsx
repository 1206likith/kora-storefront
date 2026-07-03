import './ShopByCategory.css';
import PlaceholderTile from '../components/PlaceholderTile';
import { slugify } from '../data/catalog';
import { c, cimg } from '../data/content';

const CATEGORIES = ['Sneakers', 'Formal', 'Loafers', 'Heels', 'Boots', 'Sandals', 'Sliders', 'Kids'];

export default function ShopByCategory() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="sec-head">
          <h2 className="h2">{c('home.shopByCategory.heading', 'Shop by category')}</h2>
          <p className="shop-cat__sub">{c('home.shopByCategory.sub', 'Find your fit, fast')}</p>
        </div>
        <div className="shop-cat__grid">
          {CATEGORIES.map((cat, i) => {
            const label = c(`home.shopByCategory.tile.${i}.label`, cat);
            const img = cimg(`home.shopByCategory.tile.${i}.image`);
            return (
              <a className="shop-cat__tile" key={cat} href={`#/collection/${slugify(cat)}`}>
                <div className="shop-cat__thumb">
                  {img
                    ? <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <PlaceholderTile ratio="1 / 1" label={label} style={{ border: '2px solid transparent' }} />}
                </div>
                <span className="shop-cat__label">{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
