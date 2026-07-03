/* Our Story (SPEC "Our Story") — the KORA brand-house narrative page. */
import './OurStory.css';
import PlaceholderTile from '../components/PlaceholderTile';
import { BRANDS } from '../data/brands';
import { go } from '../router';

const MATERIALS = [
  { title: 'Full-grain leather', caption: 'The best hides, tanned for character that only deepens with age.' },
  { title: 'Hand stitching', caption: 'Seams closed by hand, pair by pair, by makers who know the craft.' },
  { title: 'Natural rubber soles', caption: 'Grip and give from a compound that moves the way you do.' },
  { title: 'Cushioned footbeds', caption: 'Shaped for comfort from the very first step, no break-in needed.' },
];

const STATS = [
  { value: '50,000+', label: 'Happy customers' },
  { value: '527', label: 'Styles & counting' },
  { value: '8', label: 'Brand worlds' },
  { value: '3×', label: 'Longer-lasting soles' },
];

export default function OurStory() {
  return (
    <div className="story">
      {/* Hero */}
      <section className="story-hero">
        <div className="kora-wrap">
          <p className="story-hero__statement">
            Born in South India. <em>Built for everyone.</em>
          </p>
        </div>
      </section>

      {/* We make shoes the old way. */}
      <section className="section">
        <div className="kora-wrap story-split">
          <PlaceholderTile label="Craftsmanship" ratio="4 / 3" />
          <div className="story-split__copy">
            <span className="eyebrow">Since generation one</span>
            <h2 className="h2">We make shoes the old way.</h2>
            <p className="story-split__p">
              Three generations of last-makers, tanners and stitchers in South India taught us
              that a good shoe can't be rushed. Every KORA pair still passes through the same
              patient hands — cut, shaped, stitched and finished the way our founders learned it,
              because craft like that doesn't go out of style.
            </p>
          </div>
        </div>
      </section>

      {/* The materials */}
      <section className="section section--warm">
        <div className="kora-wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">What goes in</span>
              <h2 className="h2">The materials</h2>
            </div>
          </div>
          <div className="story-materials__grid">
            {MATERIALS.map((m) => (
              <div key={m.title} className="story-materials__item">
                <PlaceholderTile label={m.title} ratio="4 / 3" />
                <p className="story-materials__caption">{m.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eight worlds, one family */}
      <section className="section">
        <div className="kora-wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">One house, eight worlds</span>
              <h2 className="h2">Eight worlds, one family</h2>
            </div>
          </div>
          <div className="story-hub__grid">
            {BRANDS.map((b) => (
              <button key={b.key} className="story-hub__tile" onClick={() => go('/brand/' + b.key)}>
                <span className="story-hub__swatch" style={{ background: b.primary }} />
                <span className="story-hub__name">{b.name}</span>
                <span className="story-hub__tagline">{b.tagline}</span>
                <span className="story-hub__cat">{b.category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Proudly Indian */}
      <section className="section section--warm story-india">
        <div className="kora-wrap">
          <span className="story-india__flag" aria-hidden="true">🇮🇳</span>
          <h2 className="h2 story-india__h2">Proudly Indian</h2>
          <div className="story-india__stats">
            {STATS.map((s) => (
              <div key={s.label} className="story-india__stat">
                <span className="story-india__value">{s.value}</span>
                <span className="story-india__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
