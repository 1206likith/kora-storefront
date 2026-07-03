import './ShopByCategory.css';
import PlaceholderTile from '../components/PlaceholderTile';

const CATEGORIES = ['Sneakers', 'Formal', 'Loafers', 'Heels', 'Boots', 'Sandals', 'Sliders', 'Kids'];

export default function ShopByCategory() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="sec-head">
          <h2 className="h2">Shop by category</h2>
          <p className="shop-cat__sub">Find your fit, fast</p>
        </div>
        <div className="shop-cat__grid">
          {CATEGORIES.map((cat) => (
            <div className="shop-cat__tile" key={cat}>
              <div className="shop-cat__thumb">
                <PlaceholderTile ratio="1 / 1" label={cat} style={{ border: '2px solid transparent' }} />
              </div>
              <span className="shop-cat__label">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
