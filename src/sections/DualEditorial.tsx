import './DualEditorial.css';
import { c, cimg } from '../data/content';

const bgStyle = (img: string) =>
  img ? { backgroundImage: `url(${img})`, backgroundSize: 'cover' } : undefined;

export default function DualEditorial() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="dual-ed__grid">
          <div className="dual-ed__tile dual-ed__tile--her" style={bgStyle(cimg('home.dualEditorial.her.image'))}>
            <span className="dual-ed__eyebrow">{c('home.dualEditorial.her.eyebrow', 'For her')}</span>
            <h3 className="dual-ed__title">{c('home.dualEditorial.her.title', 'Step up your style')}</h3>
            <p className="dual-ed__sub">
              {c('home.dualEditorial.her.sub', 'Heels, flats and wedges shaped for all-day wear — without giving up the look.')}
            </p>
            <a href="#/collection/women" className="dual-ed__cta">
              {c('home.dualEditorial.her.ctaLabel', 'Shop now →')}
            </a>
          </div>
          <div className="dual-ed__tile dual-ed__tile--him" style={bgStyle(cimg('home.dualEditorial.him.image'))}>
            <span className="dual-ed__eyebrow">{c('home.dualEditorial.him.eyebrow', 'For him')}</span>
            <h3 className="dual-ed__title">{c('home.dualEditorial.him.title', 'Own the spotlight')}</h3>
            <p className="dual-ed__sub">
              {c('home.dualEditorial.him.sub', 'Sneakers, formals and boots built to move with you, wherever the day takes you.')}
            </p>
            <a href="#/collection/men" className="dual-ed__cta">
              {c('home.dualEditorial.him.ctaLabel', 'Shop now →')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
