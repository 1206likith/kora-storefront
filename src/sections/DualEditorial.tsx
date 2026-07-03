import './DualEditorial.css';

export default function DualEditorial() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="dual-ed__grid">
          <div className="dual-ed__tile dual-ed__tile--her">
            <span className="dual-ed__eyebrow">For her</span>
            <h3 className="dual-ed__title">Step up your style</h3>
            <p className="dual-ed__sub">
              Heels, flats and wedges shaped for all-day wear — without giving up the look.
            </p>
            <a href="#/collection/women" className="dual-ed__cta">
              Shop now →
            </a>
          </div>
          <div className="dual-ed__tile dual-ed__tile--him">
            <span className="dual-ed__eyebrow">For him</span>
            <h3 className="dual-ed__title">Own the spotlight</h3>
            <p className="dual-ed__sub">
              Sneakers, formals and boots built to move with you, wherever the day takes you.
            </p>
            <a href="#/collection/men" className="dual-ed__cta">
              Shop now →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
