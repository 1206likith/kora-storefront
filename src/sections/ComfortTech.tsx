import './ComfortTech.css';

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
        <p className="comfort-tech__eyebrow">KORA comfort technology</p>
        <h2 className="comfort-tech__title">Engineered to be worn all day</h2>
        <div className="comfort-tech__grid">
          {TECH.map((t) => (
            <div className="comfort-tech__card" key={t.name}>
              <div className="comfort-tech__glyph" aria-hidden="true" />
              <div className="comfort-tech__name">{t.name}</div>
              <div className="comfort-tech__caption">{t.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
