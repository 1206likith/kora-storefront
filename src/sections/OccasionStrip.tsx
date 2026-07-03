import './OccasionStrip.css';
import { slugify } from '../data/catalog';
import { c } from '../data/content';

const OCCASIONS = ['Work', 'Party', 'Sports', 'Casual', 'Wedding', 'Home Wear', 'Outdoors'];

export default function OccasionStrip() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="eyebrow">{c('home.occasion.heading', 'What are you shopping for?')}</div>
        <div className="occasion-rail">
          {OCCASIONS.map((o, i) => (
            <a key={o} className="occasion-pill" href={`#/collection/${slugify(o)}`}>
              {c(`home.occasion.pill.${i}.label`, o)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
