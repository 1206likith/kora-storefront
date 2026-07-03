/* Hero carousel: ASICS END OF SEASON SALE + 2 promo slides (SPEC). */
import { useEffect, useState } from 'react';
import './Hero.css';
import { c, cimg } from '../data/content';

const SLIDES = ['sale', 'newseason', 'comfort'] as const;

const bgStyle = (img: string) =>
  img ? { backgroundImage: `url(${img})`, backgroundSize: 'cover' } : undefined;

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const go = (n: number) => setI((n + SLIDES.length) % SLIDES.length);

  return (
    <section className="hero">
      {/* Slide 0 — END OF SEASON SALE */}
      {SLIDES[i] === 'sale' && (() => {
        const watermark = c('home.hero.slide.0.watermark', 'END OF SEASON SALE');
        return (
        <div className="hero__slide hero__sale" style={bgStyle(cimg('home.hero.slide.0.image'))}>
          <div className="hero__watermark" aria-hidden>
            {Array.from({ length: 8 }).map((_, r) => (
              <span key={r}>{watermark}&nbsp;&nbsp;{watermark}&nbsp;&nbsp;{watermark}</span>
            ))}
          </div>
          <div className="hero__sale-inner kora-wrap">
            <div className="hero__lockup-left">
              <span>END OF</span><span>SEASON</span><span>SALE</span>
            </div>
            <div className="hero__rule" />
            <div className="hero__lockup-right">
              <span className="hero__upto">{c('home.hero.slide.0.upto', 'UP TO')}</span>
              <span className="hero__pct">{c('home.hero.slide.0.percent', '50%')}</span>
              <span className="hero__off">{c('home.hero.slide.0.off', 'OFF*')}</span>
              <span className="hero__on">{c('home.hero.slide.0.on', 'ON BESTSELLERS')}</span>
              <a className="btn-navy hero__cta" href="#/collection/sale">{c('home.hero.slide.0.ctaLabel', 'SHOP NOW →')}</a>
            </div>
          </div>
          <span className="hero__tc">{c('home.hero.slide.0.terms', '*T&Cs apply')}</span>
        </div>
        );
      })()}

      {/* Slide 1 — Spring / Summer '26 */}
      {SLIDES[i] === 'newseason' && (
        <div className="hero__slide hero__promo hero__promo--navy" style={bgStyle(cimg('home.hero.slide.1.image'))}>
          <div className="hero__promo-copy kora-wrap">
            <span className="hero__eyebrow">{c('home.hero.slide.1.eyebrow', 'NEW SEASON')}</span>
            <h1>{c('home.hero.slide.1.headline', 'Spring / Summer ’26')}</h1>
            <p>{c('home.hero.slide.1.subcopy', 'Fresh silhouettes across all eight KORA brands — made in South India, built to last.')}</p>
            <a className="btn-orange" href="#/collection/new">{c('home.hero.slide.1.ctaLabel', 'Shop new arrivals →')}</a>
          </div>
        </div>
      )}

      {/* Slide 2 — KORA CloudWalk™ */}
      {SLIDES[i] === 'comfort' && (
        <div className="hero__slide hero__promo hero__promo--green" style={bgStyle(cimg('home.hero.slide.2.image'))}>
          <div className="hero__promo-copy kora-wrap">
            <span className="hero__eyebrow">{c('home.hero.slide.2.eyebrow', 'COMFORT TECH')}</span>
            <h1>{c('home.hero.slide.2.headline', 'KORA CloudWalk™')}</h1>
            <p>{c('home.hero.slide.2.subcopy', 'Air-cooled memory foam engineered to be worn all day.')}</p>
            <a className="btn-navy" href="#/collection/all" style={{ background: '#fff', color: '#14245c' }}>{c('home.hero.slide.2.ctaLabel', 'Explore comfort tech →')}</a>
          </div>
        </div>
      )}

      <button className="hero__arrow hero__arrow--l" onClick={() => go(i - 1)} aria-label="Previous">‹</button>
      <button className="hero__arrow hero__arrow--r" onClick={() => go(i + 1)} aria-label="Next">›</button>
      <div className="hero__dots">
        {SLIDES.map((_, n) => (
          <button key={n} className={'hero__dot' + (n === i ? ' hero__dot--on' : '')} onClick={() => go(n)} aria-label={`Slide ${n + 1}`} />
        ))}
      </div>
    </section>
  );
}
