import { useState } from 'react';
import './ShoeFinder.css';
import PlaceholderTile from '../components/PlaceholderTile';
import { DEMO_PRODUCTS, inr } from '../data/catalog';
import { go } from '../router';

interface Answers {
  who: string;
  occ: string;
  act: string;
}

const EMPTY_ANSWERS: Answers = { who: '', occ: '', act: '' };

const QUESTIONS = [
  {
    text: 'Who are you shopping for?',
    key: 'who' as const,
    options: ['For me — Men', 'For me — Women', 'For Kids', 'As a gift'],
  },
  {
    text: "What's the occasion?",
    key: 'occ' as const,
    options: ['Work/Office', 'Party/Evening', 'Sports/Active', 'Everyday casual', 'Wedding', 'Home/Relaxing'],
  },
  {
    text: 'How active will you be?',
    key: 'act' as const,
    options: ['Mostly seated', 'On my feet a lot', 'Very active'],
  },
];

const RESULTS = [
  { pct: 98, product: DEMO_PRODUCTS[0] },
  { pct: 94, product: DEMO_PRODUCTS[6] },
  { pct: 89, product: DEMO_PRODUCTS[12] },
];

export default function ShoeFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);

  const select = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  const startOver = () => {
    setStep(0);
    setAnswers(EMPTY_ANSWERS);
  };

  const reasons: Record<string, string> = {
    [RESULTS[0].product.id]: `Great fit for ${answers.occ || 'your everyday occasions'}`,
    [RESULTS[1].product.id]: `Built for when you're ${(answers.act || 'on the move').toLowerCase()}`,
    [RESULTS[2].product.id]: `A versatile pick ${answers.who ? `for ${answers.who.replace('For me — ', '').replace('For ', '').replace('As a ', '').toLowerCase()}` : 'for everyone'}`,
  };

  return (
    <div className="finder-page">
      <div className="finder-card">
        {step < QUESTIONS.length ? (
          <>
            <span className="finder-pill">KORA AI · Step {step + 1} of 3</span>
            <div className="finder-dashes">
              {QUESTIONS.map((q, i) => (
                <span key={q.key} className={`finder-dash${i <= step ? ' is-active' : ''}`} />
              ))}
            </div>
            <h1 className="finder-q">{QUESTIONS[step].text}</h1>
            <div className="finder-options">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="finder-option"
                  onClick={() => select(QUESTIONS[step].key, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <span className="finder-pill">KORA AI</span>
            <h1 className="finder-q">Match complete</h1>
            <div className="finder-results">
              {RESULTS.map(({ pct, product }) => (
                <div className="finder-result" key={product.id}>
                  <PlaceholderTile
                    label={product.cat}
                    ratio="1 / 1"
                    radius={10}
                    style={{ width: 64, height: 64, flex: '0 0 auto' }}
                  />
                  <div className="finder-result-info">
                    <span className="finder-result-badge">{pct}% MATCH</span>
                    <div className="finder-result-brand">{product.brandName}</div>
                    <div className="finder-result-name">{product.name} · {inr(product.price)}</div>
                    <div className="finder-result-why">Why it matches · {reasons[product.id]}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="finder-cta-row">
              <button type="button" className="btn-navy" onClick={() => go('/collection/all')}>
                See all 24 matches →
              </button>
              <a className="finder-whatsapp" href="https://wa.me/" target="_blank" rel="noreferrer">
                Ask us on WhatsApp →
              </a>
              <button type="button" className="finder-startover" onClick={startOver}>
                Start over
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
