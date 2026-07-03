/* Global chrome: two-tier ASICS utility bar, announcement marquee, KORA/ASC
   logo lockup, primary nav with mega-menus, search + wishlist + bag. */
import { useState } from 'react';
import { BRANDS } from '../data/brands';
import { slugify } from '../data/catalog';
import { go } from '../router';
import '../styles/chrome.css';

const ANNOUNCE = [
  '🚚 FREE DELIVERY ON ORDERS OVER ₹599',
  '🎁 EXTRA 5% OFF WHEN YOU PAY VIA UPI',
  '↩ 15-DAY EASY RETURNS',
  '🇮🇳 MADE IN SOUTH INDIA',
];

const MENU: Record<string, { title: string; items: string[] }[]> = {
  Men: [
    { title: 'Occasion', items: ['Casual', 'Formal', 'Party', 'Sports', 'Wedding', 'Ethnic', 'Outdoors'] },
    { title: 'Shoe type', items: ['Sneakers', 'Oxfords', 'Brogues', 'Loafers', 'Monk strap', 'Chelsea boots', 'Sandals & sliders', 'Slip-ons'] },
    { title: 'Shop by activity', items: ['Running', 'Walking', 'Trail & hiking', 'Office', 'Everyday'] },
    { title: 'Featured', items: ['New arrivals', 'Bestsellers', 'Under ₹1000', 'Spring / Summer'] },
  ],
  Women: [
    { title: 'Occasion', items: ['Casual', 'Formal', 'Party', 'Sports', 'Wedding', 'Ethnic'] },
    { title: 'Shoe type', items: ['Heels', 'Ballet flats', 'Wedges', 'Pumps', 'Sandals', 'Mules', 'Sneakers', 'Loafers', 'Slides'] },
    { title: 'Heel type', items: ['Block heels', 'Kitten heels', 'Platform', 'Stilettos', 'Flats', 'Wedges'] },
    { title: 'Featured', items: ['New arrivals', 'Bestsellers', 'Under ₹1000', 'Spring / Summer'] },
  ],
  Kids: [
    { title: 'Shop by age', items: ['1.5–3.5 yrs', '4–8 yrs', '8–13 yrs'] },
    { title: 'Shop by gender', items: ['Boys', 'Girls', 'Toddlers'] },
    { title: 'Shoe type', items: ['Velcro sneakers', 'Sandals', 'School shoes', 'Slip-ons', 'Light-up'] },
    { title: 'Featured', items: ['New arrivals', 'Bestsellers', 'Under ₹1000'] },
  ],
};

const NAV = ['Men', 'Women', 'Kids', 'Brands', 'Collection', 'Sale', 'Shoe Finder'];

/* Top-level nav targets (hash paths). */
const NAV_TARGET: Record<string, string> = {
  Men: '/collection/men',
  Women: '/collection/women',
  Kids: '/collection/kids',
  Brands: '/collection/all',
  Collection: '/collection/all',
  Sale: '/collection/sale',
  'Shoe Finder': '/finder',
};

/* Mega-menu sub-item → collection slug. Featured items map to semantic slugs;
   everything else slugifies to a type/gender slug (collectionFor falls back to all). */
const megaSlug = (item: string): string => {
  const l = item.toLowerCase();
  if (l === 'new arrivals') return 'new';
  if (l === 'bestsellers') return 'bestsellers';
  if (l.startsWith('under ')) return 'under-1000';
  return slugify(item);
};

export default function Header({ cart = 0 }: { cart?: number }) {
  const [mega, setMega] = useState<string | null>(null);
  const accentFor = (k: string) => (k === 'Women' ? '#a85c43' : k === 'Kids' ? '#e8730a' : '#14245c');

  return (
    <header className="hdr" onMouseLeave={() => setMega(null)}>
      {/* Utility bar (two-tier, ASICS) */}
      <div className="hdr__util">
        <div className="hdr__util-1">
          Cash on Delivery now available on select PIN codes for all orders between ₹599 and ₹14,999 · No COD charges for a limited period
        </div>
        <div className="hdr__util-2">
          <span>Join <b>KORA Club</b> and get 10% off your first order</span>
          <span className="hdr__util-links">
            <a href="#/checkout">Track Order</a><i>·</i><a href="#/story">Help</a><i>·</i><a href="#/">Find A Store</a><i>·</i><a href="#/story">Join KORA Club</a><i>◦</i><a href="#/">Log In</a>
          </span>
        </div>
      </div>

      {/* Announcement marquee (mobile-style rotating, shown as continuous strip) */}
      <div className="hdr__announce">
        <div className="hdr__marquee">
          {[...ANNOUNCE, ...ANNOUNCE, ...ANNOUNCE, ...ANNOUNCE].map((m, i) => (
            <span key={i} className="hdr__announce-item"><i>◆</i>{m}</span>
          ))}
        </div>
      </div>

      {/* Main bar */}
      <div className="hdr__main">
        <a className="hdr__logo" href="#/">
          <span className="hdr__logo-kora">KORA</span>
          <span className="hdr__logo-cap">by Ajantha Shoe Co.</span>
        </a>
        <nav className="hdr__nav">
          {NAV.map((n) => (
            <button
              key={n}
              className={'hdr__navitem' + (n === 'Sale' ? ' hdr__navitem--sale' : '')}
              onMouseEnter={() => setMega(MENU[n] || n === 'Brands' ? n : null)}
              onClick={() => { setMega(null); go(NAV_TARGET[n]); }}
            >
              {n}{(MENU[n] || n === 'Brands') && <i className="hdr__caret">▾</i>}
            </button>
          ))}
        </nav>
        <div className="hdr__actions">
          <form
            className="hdr__search"
            onSubmit={(e) => { e.preventDefault(); go('/collection/all'); }}
          >
            <span>⌕</span><input placeholder="Search KORA" />
          </form>
          <a className="hdr__icon" aria-label="Wishlist" href="#/">♥</a>
          <a className="hdr__icon hdr__bag" aria-label="Bag" href="#/checkout">🛍<span className="hdr__badge">{cart}</span></a>
        </div>
      </div>

      {/* Mega-menus */}
      {mega && MENU[mega] && (
        <div className="mega" style={{ borderTopColor: accentFor(mega) }}>
          <div className="mega__grid kora-wrap">
            {MENU[mega].map((col) => (
              <div key={col.title} className="mega__col">
                <div className="mega__coltitle" style={{ color: accentFor(mega) }}>{col.title}</div>
                {col.items.map((it) => <a key={it} className="mega__item" href={`#/collection/${megaSlug(it)}`}>{it}</a>)}
              </div>
            ))}
            <div className="mega__feature">
              <div className="mega__feature-tile" />
              <div className="mega__feature-ey">{mega} feature</div>
              <div className="mega__feature-h">New in {mega}</div>
              <a className="link-arrow" href={`#/collection/${mega.toLowerCase()}`}>Shop now →</a>
            </div>
          </div>
        </div>
      )}
      {mega === 'Brands' && (
        <div className="mega" style={{ borderTopColor: '#14245c' }}>
          <div className="mega__brands kora-wrap">
            {BRANDS.map((b) => (
              <a key={b.key} className="mega__brandchip" href={`#/brand/${b.key}`}>
                <span className="mega__swatch" style={{ background: b.primary }} />
                <span>
                  <b>{b.name}</b>
                  <em>{b.category}</em>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
