/* Our Stores — the KORA / ASC retail store locator.
   Store list (format + city + directions link) is the real data published on
   koraretail.in/about-us: 21 stores across 17 cities in Andhra Pradesh & Telangana,
   under two formats — "Kora Shoe Makers" and "ASC Ajantha Shoe Company".
   The live page only exposes format + city + a share.google directions link per
   store (no street address in the page), so cards show city + region and link to
   the store's directions, falling back to a Google Maps search when none exists. */
import { c } from '../data/content';
import '../styles/content-pages.css';

interface Store {
  format: 'Kora Shoe Makers' | 'ASC Ajantha Shoe Company';
  city: string;
  region: 'Andhra Pradesh' | 'Telangana';
  dir?: string; // explicit directions link published on the site
}

const STORES: Store[] = [
  { format: 'ASC Ajantha Shoe Company', city: 'Amalapuram', region: 'Andhra Pradesh', dir: 'https://share.google/dWTGF06CP4B47l26b' },
  { format: 'Kora Shoe Makers', city: 'Guntur', region: 'Andhra Pradesh', dir: 'https://share.google/rEBB3XqWrk03RORbq' },
  { format: 'ASC Ajantha Shoe Company', city: 'Kakinada', region: 'Andhra Pradesh', dir: 'https://share.google/N2qllXPmHP578g19E' },
  { format: 'ASC Ajantha Shoe Company', city: 'Vijayawada', region: 'Andhra Pradesh', dir: 'https://share.google/vgBUAbS9C3am7Iaoq' },
  { format: 'ASC Ajantha Shoe Company', city: 'Ananthapuram', region: 'Andhra Pradesh', dir: 'https://share.google/dvZx26cmW3erU2Uo6' },
  { format: 'Kora Shoe Makers', city: 'Vizag', region: 'Andhra Pradesh', dir: 'https://share.google/b2KtdxweJeDSXduGe' },
  { format: 'Kora Shoe Makers', city: 'Kakinada', region: 'Andhra Pradesh', dir: 'https://share.google/paSAsuX2sj3HwnVoi' },
  { format: 'ASC Ajantha Shoe Company', city: 'Guntur', region: 'Andhra Pradesh', dir: 'https://share.google/KpzQXxo7UHQ8dnMFl' },
  { format: 'ASC Ajantha Shoe Company', city: 'Kadapa', region: 'Andhra Pradesh', dir: 'https://share.google/xzWpRutq5tiYijnEd' },
  { format: 'ASC Ajantha Shoe Company', city: 'Vizianagaram', region: 'Andhra Pradesh', dir: 'https://share.google/tmEv5GdbFzIOFS9wI' },
  { format: 'Kora Shoe Makers', city: 'Kadapa', region: 'Andhra Pradesh', dir: 'https://share.google/2XArSTUi4MTKQIqOO' },
  { format: 'ASC Ajantha Shoe Company', city: 'Madanapalle', region: 'Andhra Pradesh', dir: 'https://share.google/pLZqsnfNpSVSsoEio' },
  { format: 'ASC Ajantha Shoe Company', city: 'Mancherial', region: 'Telangana' },
  { format: 'ASC Ajantha Shoe Company', city: 'Armoor', region: 'Telangana' },
  { format: 'ASC Ajantha Shoe Company', city: 'Nizamabad', region: 'Telangana' },
  { format: 'ASC Ajantha Shoe Company', city: 'Proddatur', region: 'Andhra Pradesh', dir: 'https://share.google/tw6QQw8tZBb5xcoJh' },
  { format: 'ASC Ajantha Shoe Company', city: 'Tenali', region: 'Andhra Pradesh' },
  { format: 'Kora Shoe Makers', city: 'Rajamahendravaram', region: 'Andhra Pradesh' },
  { format: 'Kora Shoe Makers', city: 'Khammam', region: 'Telangana' },
  { format: 'Kora Shoe Makers', city: 'AS Rao Nagar, Hyderabad', region: 'Telangana' },
  { format: 'Kora Shoe Makers', city: 'Nellore', region: 'Andhra Pradesh' },
];

const directionsHref = (s: Store): string =>
  s.dir ??
  'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(`${s.format} ${s.city} ${s.region}`);

export default function StoreLocator() {
  return (
    <div>
      <section className="cp-hero">
        <span className="cp-hero__eyebrow">{c('stores.eyebrow', 'Find us in store')}</span>
        <h1 className="cp-hero__title">{c('stores.title', 'Our Stores')}</h1>
        <p className="cp-hero__sub">
          {c(
            'stores.intro',
            'We operate 21 retail stores across 17 cities in Andhra Pradesh and Telangana, through two store formats — Kora Shoe Makers and ASC Ajantha Shoe Company.',
          )}
        </p>
      </section>

      <section className="section">
        <div className="kora-wrap">
          <div className="stores-grid">
            {STORES.map((s, i) => (
              <div key={i} className="store-card">
                <span className="store-card__fmt">{s.format}</span>
                <span className="store-card__city">{s.city}</span>
                <span className="store-card__addr">{s.region}, India</span>
                <a
                  className="store-card__dir link-arrow"
                  href={directionsHref(s)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c('stores.directions', 'Get directions')} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
