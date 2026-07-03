import './AIFinderWidget.css';
import { DEMO_PRODUCTS, inr } from '../data/catalog';

const MATCHES = [
  { pct: 98, p: DEMO_PRODUCTS[5] },
  { pct: 94, p: DEMO_PRODUCTS[2] },
  { pct: 89, p: DEMO_PRODUCTS[10] },
];

export default function AIFinderWidget() {
  return (
    <section className="section">
      <div className="kora-wrap">
        <div className="ai-card">
          <div className="ai-copy">
            <span className="ai-chip">KORA AI</span>
            <h2 className="ai-heading">Not sure what you need?</h2>
            <p className="ai-sub">Tell our AI what you're after — occasion, budget, comfort level — and get matched to the right pair in seconds.</p>
            <a className="btn-orange" href="#/finder">Find my shoe →</a>
          </div>
          <div className="ai-matches">
            {MATCHES.map(({ pct, p }) => (
              <div className="ai-match-row" key={p.id}>
                <span className="ai-match-pct">{pct}%</span>
                <span className="ai-match-name">{p.name}</span>
                <span className="ai-match-price">{inr(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
