/* PDP — SPEC "Product Detail / PDP".
   Two-column layout (gallery / buy-box), size + pincode + tabs, two ProductCard rails. */
import { useState } from 'react';
import './ProductDetail.css';
import ProductCard from '../components/ProductCard';
import PlaceholderTile from '../components/PlaceholderTile';
import { DEMO_PRODUCTS, inr, savePct, type Product } from '../data/catalog';
import { brandByKey, onColor } from '../data/brands';
import { go } from '../router';

const SIZES = [6, 7, 8, 9, 10, 11];
const THUMBS = ['Front', 'Side', 'Back', 'Sole', 'Macro'];
const TABS = ['Description', 'Materials & care', 'Size guide', 'Reviews (127)'];

const SIZE_TABLE: Array<{ uk: number; cm: string; us: string }> = [
  { uk: 6, cm: '24.5', us: '7' },
  { uk: 7, cm: '25.5', us: '8' },
  { uk: 8, cm: '26', us: '9' },
  { uk: 9, cm: '27', us: '10' },
  { uk: 10, cm: '28', us: '11' },
  { uk: 11, cm: '29', us: '12' },
];

const REVIEWS = [
  { name: 'Arjun M.', rating: 5, text: 'Exceptionally comfortable straight out of the box. True to size and the finish feels premium.' },
  { name: 'Priya S.', rating: 4, text: 'Great looking pair, fits well. Delivery was quick — would buy again.' },
];

interface Props {
  id?: string;
}

export default function ProductDetail({ id = 'esc-derby' }: Props) {
  const p: Product = DEMO_PRODUCTS.find((x) => x.id === id) ?? DEMO_PRODUCTS[0];
  const brand = brandByKey(p.brand)!;
  const accent = brand.accent;
  const onAccent = onColor(accent);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [pin, setPin] = useState('');
  const [pinMsg, setPinMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const pct = savePct(p.price, p.mrp);

  const checkPincode = () => {
    if (/^\d{6}$/.test(pin)) {
      setPinMsg({ ok: true, text: `Delivered by Thu, 2 Jul to ${pin} · FREE delivery` });
    } else {
      setPinMsg({ ok: false, text: 'Enter a valid 6-digit pincode' });
    }
  };

  const completeLook = DEMO_PRODUCTS.slice(0, 6);
  const recentlyViewed = DEMO_PRODUCTS.slice(6, 12);

  return (
    <div className="pdp">
      <section className="section">
        <div className="pdp-wrap">
          <div className="pdp-grid">
            {/* ---- Gallery ---- */}
            <div className="pdp-gallery">
              <div className="pdp-main">
                {p.image ? (
                  <img src={p.image} alt={p.name} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 14, display: 'block' }} />
                ) : (
                  <PlaceholderTile label={p.name} ratio="1 / 1" radius={14} style={{ width: '100%' }} />
                )}
                <span className="pdp-chip" style={{ color: accent }}>{brand.name}</span>
                <button className="pdp-wish" aria-label="Add to wishlist">♥</button>
                <span className="pdp-360">360° view</span>
              </div>
              <div className="pdp-thumbs">
                {(p.image ? [p.image] : []).map((src, i) => (
                  <img key={i} src={src} alt={p.name} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 10, display: 'block' }} />
                ))}
                {!p.image && THUMBS.map((t) => (
                  <PlaceholderTile key={t} label={t} ratio="1 / 1" radius={10} />
                ))}
              </div>
            </div>

            {/* ---- Buy box ---- */}
            <div className="pdp-buybox">
              <span className="pdp-chip pdp-chip--static" style={{ color: accent }}>{brand.name}</span>
              <h1 className="pdp-name">{p.name}</h1>
              <p className="pdp-desc">
                A {p.cat.toLowerCase()} silhouette from {brand.name}, built on a comfort-first last with a
                durable outsole and premium finish — designed for all-day wear.
              </p>
              <div className="pdp-rating">
                <span className="pdp-stars">★★★★☆</span>
                <span>4.2 · 127 reviews</span>
              </div>

              <div className="pdp-price-row">
                <span className="pdp-price">{inr(p.price)}</span>
                {p.mrp && p.mrp > p.price && <span className="pdp-mrp">{inr(p.mrp)}</span>}
                {pct > 0 && <span className="pdp-save">−{pct}%</span>}
              </div>
              <div className="pdp-taxes">Inclusive of all taxes</div>

              <div className="pdp-stock">Only 4 pairs left in your size</div>

              <div className="pdp-size-block">
                <div className="pdp-size-head">
                  <span className="pdp-label">Select size (UK)</span>
                  <a className="pdp-size-link" href="#size-guide" onClick={(e) => { e.preventDefault(); setActiveTab(2); }}>
                    What's my size?
                  </a>
                </div>
                <div className="pdp-sizes">
                  {SIZES.map((s) => {
                    const sel = selectedSize === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        className="pdp-size"
                        style={sel ? { background: accent, color: onAccent, borderColor: accent } : undefined}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pdp-pincode">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter pincode"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  className="pdp-pincode-input"
                />
                <button type="button" className="pdp-pincode-btn" onClick={checkPincode}>Check</button>
              </div>
              {pinMsg && (
                <div className={pinMsg.ok ? 'pdp-pin-msg pdp-pin-msg--ok' : 'pdp-pin-msg pdp-pin-msg--bad'}>
                  {pinMsg.text}
                </div>
              )}

              <div className="pdp-actions">
                <button
                  type="button"
                  className="pdp-add"
                  style={{ background: accent, color: onAccent }}
                  onClick={() => go('/checkout')}
                >
                  Add to bag
                </button>
                <button type="button" className="pdp-whatsapp">
                  <span className="pdp-wa-dot" />
                  Ask about this on WhatsApp
                </button>
              </div>

              <div className="pdp-payment">UPI · GPay · PhonePe · Paytm · COD · 0% EMI</div>

              <div className="pdp-reassure">
                <span><i className="pdp-diamond" />15-day returns</span>
                <span><i className="pdp-diamond" />COD</span>
                <span><i className="pdp-diamond" />Free delivery</span>
                <span><i className="pdp-diamond" />Made in India</span>
              </div>
            </div>
          </div>

          {/* ---- Tabs ---- */}
          <div className="pdp-tabs" id="size-guide">
            <div className="pdp-tabstrip">
              {TABS.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className={i === activeTab ? 'pdp-tab pdp-tab--active' : 'pdp-tab'}
                  onClick={() => setActiveTab(i)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pdp-tabpanel">
              {activeTab === 0 && (
                <p>
                  The {p.name} pairs a refined upper with a lightweight, cushioned midsole for comfort that
                  lasts the whole day. Every pair is finished by hand and quality-checked before it ships.
                </p>
              )}
              {activeTab === 1 && (
                <ul className="pdp-list">
                  <li>Genuine leather / performance-grade upper</li>
                  <li>Cushioned, breathable insole</li>
                  <li>Durable rubber outsole with flex grooves</li>
                  <li>Wipe clean with a soft, dry cloth</li>
                  <li>Store in a cool, dry place away from direct sunlight</li>
                </ul>
              )}
              {activeTab === 2 && (
                <table className="pdp-size-table">
                  <thead>
                    <tr><th>UK</th><th>CM</th><th>US</th></tr>
                  </thead>
                  <tbody>
                    {SIZE_TABLE.map((row) => (
                      <tr key={row.uk}>
                        <td>{row.uk}</td>
                        <td>{row.cm}</td>
                        <td>{row.us}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 3 && (
                <div className="pdp-reviews">
                  <div className="pdp-reviews-avg">
                    <span className="pdp-reviews-num">4.2</span>
                    <span className="pdp-stars">★★★★☆</span>
                    <span className="pdp-muted">127 reviews</span>
                  </div>
                  {REVIEWS.map((r) => (
                    <div className="pdp-review" key={r.name}>
                      <div className="pdp-review-head">
                        <strong>{r.name}</strong>
                        <span className="pdp-verified">Verified Purchase</span>
                      </div>
                      <div className="pdp-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                      <p>{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="pdp-wrap">
          <div className="sec-head">
            <div className="h2">Complete your look</div>
          </div>
          <div className="rail">
            {completeLook.map((prod) => (
              <ProductCard key={prod.id} p={prod} width={240} onOpen={(x) => go('/product/' + x.id)} onAdd={(x) => go('/product/' + x.id)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="pdp-wrap">
          <div className="sec-head">
            <div className="h2">Recently viewed</div>
          </div>
          <div className="rail">
            {recentlyViewed.map((prod) => (
              <ProductCard key={prod.id} p={prod} width={240} onOpen={(x) => go('/product/' + x.id)} onAdd={(x) => go('/product/' + x.id)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
