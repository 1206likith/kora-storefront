import './OccasionStrip.css';
import { slugify } from '../data/catalog';

const OCCASIONS = ['Work', 'Party', 'Sports', 'Casual', 'Wedding', 'Home Wear', 'Outdoors'];

export default function OccasionStrip() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="eyebrow">What are you shopping for?</div>
        <div className="occasion-rail">
          {OCCASIONS.map((o) => (
            <a key={o} className="occasion-pill" href={`#/collection/${slugify(o)}`}>
              {o}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
