import './ShopByGender.css';

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
          {TILES.map((t) => (
            <a key={t.key} className="gender-tile" href="#" style={{ background: t.bg, color: t.color }}>
              <span className="gender-tile__label">{t.label}</span>
              <span className="gender-tile__sub">{t.sub}</span>
              <span className="gender-tile__cta">Shop now →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
