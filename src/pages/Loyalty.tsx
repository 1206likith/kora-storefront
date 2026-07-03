/* KORA Club — the loyalty / rewards page. Program details are the real ones
   published on koraretail.in/loyalty: earn 25 points per purchase, redeem
   50 points for ₹25 off, and "Become a Member" to start. */
import { c } from '../data/content';
import '../styles/content-pages.css';

const STEPS = [
  {
    h: 'Sign Up',
    p: 'Sign up as a member to start enjoying the loyalty program.',
    big: '',
  },
  {
    h: 'Earn Points',
    p: 'Purchase a product and earn points on every order.',
    big: 'Get 25 points',
  },
  {
    h: 'Redeem Rewards',
    p: 'Flexible rewards you can use at checkout.',
    big: '50 points = ₹25 off',
  },
];

export default function Loyalty() {
  return (
    <div>
      <section className="cp-hero">
        <span className="cp-hero__eyebrow">{c('loyalty.eyebrow', 'KORA Club')}</span>
        <h1 className="cp-hero__title">
          {c('loyalty.title', 'Earn points and turn them into rewards')}
        </h1>
        <p className="cp-hero__sub">
          {c(
            'loyalty.intro',
            'Join KORA Club and get rewarded every time you shop. Earn points on every purchase and redeem them for money off your next pair.',
          )}
        </p>
      </section>

      <section className="section">
        <div className="kora-wrap">
          <div className="loyalty-steps">
            {STEPS.map((s, i) => (
              <div key={i} className="loyalty-step">
                <span className="loyalty-step__num">{i + 1}</span>
                <h2 className="loyalty-step__h">{c(`loyalty.step.${i}.h`, s.h)}</h2>
                <p className="loyalty-step__p">{c(`loyalty.step.${i}.p`, s.p)}</p>
                {s.big && (
                  <span className="loyalty-step__big">{c(`loyalty.step.${i}.big`, s.big)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--warm" style={{ textAlign: 'center' }}>
        <div className="kora-wrap">
          <span className="eyebrow">{c('loyalty.cta.eyebrow', 'Membership is free')}</span>
          <h2 className="h2" style={{ marginBottom: 20 }}>
            {c('loyalty.cta.heading', 'Become a Member')}
          </h2>
          <a className="loyalty-cta" href="#/">
            {c('loyalty.cta.label', 'Join KORA Club')}
          </a>
          <p className="loyalty-step__p" style={{ marginTop: 16 }}>
            {c('loyalty.cta.note', 'Member sign-in is coming soon — check back shortly to start earning.')}
          </p>
        </div>
      </section>
    </div>
  );
}
