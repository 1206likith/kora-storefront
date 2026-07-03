/* Hero carousel: ASICS END OF SEASON SALE + 2 promo slides (SPEC). */
import { useEffect, useState } from 'react';
import './Hero.css';

const SLIDES = ['sale', 'newseason', 'comfort'] as const;

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
      {SLIDES[i] === 'sale' && (
        <div className="hero__slide hero__sale">
          <div className="hero__watermark" aria-hidden>
            {Array.from({ length: 8 }).map((_, r) => (
              <span key={r}>END OF SEASON SALE&nbsp;&nbsp;END OF SEASON SALE&nbsp;&nbsp;END OF SEASON SALE</span>
            ))}
          </div>
          <div className="hero__sale-inner kora-wrap">
            <div className="hero__lockup-left">
              <span>END OF</span><span>SEASON</span><span>SALE</span>
            </div>
            <div className="hero__rule" />
            <div className="hero__lockup-right">
              <span className="hero__upto">UP TO</span>
              <span className="hero__pct">50%</span>
              <span className="hero__off">OFF*</span>
              <span className="hero__on">ON BESTSELLERS</span>
              <a className="btn-navy hero__cta" href="#/collection/sale">SHOP NOW →</a>
            </div>
          </div>
          <span className="hero__tc">*T&amp;Cs apply</span>
        </div>
      )}

      {/* Slide 1 — Spring / Summer '26 */}
      {SLIDES[i] === 'newseason' && (
        <div className="hero__slide hero__promo hero__promo--navy">
          <div className="hero__promo-copy kora-wrap">
            <span className="hero__eyebrow">NEW SEASON</span>
            <h1>Spring / Summer ’26</h1>
            <p>Fresh silhouettes across all eight KORA brands — made in South India, built to last.</p>
            <a className="btn-orange" href="#/collection/new">Shop new arrivals →</a>
          </div>
        </div>
      )}

      {/* Slide 2 — KORA CloudWalk™ */}
      {SLIDES[i] === 'comfort' && (
        <div className="hero__slide hero__promo hero__promo--green">
          <div className="hero__promo-copy kora-wrap">
            <span className="hero__eyebrow">COMFORT TECH</span>
            <h1>KORA CloudWalk™</h1>
            <p>Air-cooled memory foam engineered to be worn all day.</p>
            <a className="btn-navy" href="#/collection/all" style={{ background: '#fff', color: '#14245c' }}>Explore comfort tech →</a>
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
