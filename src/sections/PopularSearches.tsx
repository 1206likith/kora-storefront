import './PopularSearches.css';
import { BRANDS } from '../data/brands';
import { c } from '../data/content';

const SEARCHES: { label: string; slug: string }[] = [
  { label: "Men's Sneakers", slug: 'men' },
  { label: "Women's Heels", slug: 'women' },
  { label: 'Formal Oxfords', slug: 'formal-shoes' },
  { label: 'Running Shoes', slug: 'sneakers' },
  { label: "Kids' Velcro", slug: 'kids' },
  { label: 'Loafers', slug: 'loafers' },
  { label: 'Sandals & Sliders', slug: 'sandals' },
  { label: 'Chelsea Boots', slug: 'all' },
  { label: 'Walking Shoes', slug: 'sneakers' },
  { label: 'Office Formals', slug: 'formal-shoes' },
  { label: 'Wedding Mojaris', slug: 'all' },
  { label: 'Under ₹1000', slug: 'under-1000' },
];

export default function PopularSearches() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="sec-head">
          <h2 className="h2">{c('home.popularSearches.heading', 'Popular searches')}</h2>
        </div>
        <div className="pop-search__chips">
          {SEARCHES.map((s, i) => (
            <a href={`#/collection/${s.slug}`} className="pop-search__chip" key={s.label}>
              {c(`home.popularSearches.chip.${i}.label`, s.label)}
            </a>
          ))}
        </div>

        <p className="pop-search__brands-label">{c('home.popularSearches.brandsLabel', 'Our brands')}</p>
        <div className="rail">
          {BRANDS.map((b) => (
            <a className="brand-chip" key={b.key} href={`#/brand/${b.key}`}>
              <span className="brand-chip__swatch" style={{ background: b.primary }} />
              <span className="brand-chip__name">{b.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
