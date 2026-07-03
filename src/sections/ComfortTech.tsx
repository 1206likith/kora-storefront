import './ComfortTech.css';
import { c, cimg } from '../data/content';

const TECH = [
  { name: 'CloudWalk™', caption: 'Air-cooled memory foam' },
  { name: 'ArchFlex™', caption: 'Podiatrist-certified arch support' },
  { name: 'Slip-In Ready', caption: 'Heel pillow, hands-free' },
  { name: 'GripMax™', caption: 'Natural rubber, 3× grip' },
];

export default function ComfortTech() {
  return (
    <section className="section comfort-tech">
      <div className="kora-wrap">
        <p className="comfort-tech__eyebrow">{c('home.comfortTech.eyebrow', 'KORA comfort technology')}</p>
        <h2 className="comfort-tech__title">{c('home.comfortTech.heading', 'Engineered to be worn all day')}</h2>
        <div className="comfort-tech__grid">
          {TECH.map((t, i) => {
            const icon = cimg(`home.comfortTech.card.${i}.icon`);
            return (
              <div className="comfort-tech__card" key={t.name}>
                <div className="comfort-tech__glyph" aria-hidden="true" style={icon ? { backgroundImage: `url(${icon})`, backgroundSize: 'cover' } : undefined} />
                <div className="comfort-tech__name">{c(`home.comfortTech.card.${i}.name`, t.name)}</div>
                <div className="comfort-tech__caption">{c(`home.comfortTech.card.${i}.caption`, t.caption)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
