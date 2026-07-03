import './ShopByGender.css';
import { c, cimg } from '../data/content';

interface Tile {
  key: string;
  label: string;
  sub: string;
  bg: string;
  color: string;
}

const TILES: Tile[] = [
  { key: 'men', label: "Shop Men's", sub: 'Formal · Sneakers · Sliders', bg: 'var(--navy)', color: '#ffffff' },
  { key: 'women', label: "Shop Women's", sub: 'Heels · Flats · Wedges', bg: '#e8c4b8', color: 'var(--ink)' },
  { key: 'kids', label: "Shop Kids'", sub: 'Velcro · Sandals · School', bg: 'var(--orange)', color: '#ffffff' },
];

export default function ShopByGender() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="shop-gender">
          {TILES.map((t, i) => {
            const img = cimg(`home.shopByGender.tile.${i}.image`);
            const style = img
              ? { background: t.bg, color: t.color, backgroundImage: `url(${img})`, backgroundSize: 'cover' }
              : { background: t.bg, color: t.color };
            return (
              <a key={t.key} className="gender-tile" href={`#/collection/${t.key}`} style={style}>
                <span className="gender-tile__label">{c(`home.shopByGender.tile.${i}.label`, t.label)}</span>
                <span className="gender-tile__sub">{c(`home.shopByGender.tile.${i}.sub`, t.sub)}</span>
                <span className="gender-tile__cta">{c(`home.shopByGender.tile.${i}.ctaLabel`, 'Shop now →')}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
