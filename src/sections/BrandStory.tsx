import './BrandStory.css';

const CRAFT_POINTS = ['Hand stitched', 'Full-grain leather', 'Made in India', 'Built to last'];

export default function BrandStory() {
  return (
    <section className="section section--warm">
      <div className="kora-wrap">
        <div className="brand-story__inner">
          <p className="brand-story__statement">
            Born in South India. <em>Built for everyone.</em>
          </p>
          <p className="brand-story__copy">
            Every KORA pair starts with full-grain leather and a last-maker's eye — shaped by
            three generations of craft in South India, and refined for how people actually move,
            work and live today.
          </p>
          <div className="brand-story__points">
            {CRAFT_POINTS.map((point, i) => (
              <span key={point} style={{ display: 'contents' }}>
                {i > 0 && (
                  <span className="brand-story__dot" aria-hidden="true">
                    ◆
                  </span>
                )}
                <span className="brand-story__point">{point}</span>
              </span>
            ))}
          </div>
          <a href="#" className="link-arrow">
            Our story →
          </a>
        </div>
      </div>
    </section>
  );
}
