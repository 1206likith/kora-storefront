import './PopularSearches.css';
import { BRANDS } from '../data/brands';

const SEARCHES = [
  "Men's Sneakers",
  "Women's Heels",
  'Formal Oxfords',
  'Running Shoes',
  "Kids' Velcro",
  'Loafers',
  'Sandals & Sliders',
  'Chelsea Boots',
  'Walking Shoes',
  'Office Formals',
  'Wedding Mojaris',
  'Under ₹1000',
];

export default function PopularSearches() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="sec-head">
          <h2 className="h2">Popular searches</h2>
        </div>
        <div className="pop-search__chips">
          {SEARCHES.map((s) => (
            <a href="#" className="pop-search__chip" key={s}>
              {s}
            </a>
          ))}
        </div>

        <p className="pop-search__brands-label">Our brands</p>
        <div className="rail">
          {BRANDS.map((b) => (
            <div className="brand-chip" key={b.key}>
              <span className="brand-chip__swatch" style={{ background: b.primary }} />
              <span className="brand-chip__name">{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
