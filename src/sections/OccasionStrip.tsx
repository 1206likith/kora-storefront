import './OccasionStrip.css';

const OCCASIONS = ['Work', 'Party', 'Sports', 'Casual', 'Wedding', 'Home Wear', 'Outdoors'];

export default function OccasionStrip() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="eyebrow">What are you shopping for?</div>
        <div className="occasion-rail">
          {OCCASIONS.map((o) => (
            <button key={o} className="occasion-pill" type="button">
              {o}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
