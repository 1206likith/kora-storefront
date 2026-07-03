/* Trust bar + Footer + WhatsApp FAB (SPEC). Business info from koraretail.in. */
import { BRANDS } from '../data/brands';
import '../styles/footer.css';

const TRUST = [
  'Free delivery over ₹599',
  '15-day easy returns',
  'Cash on delivery',
  'UPI accepted',
  'Made in India',
];

export function TrustBar() {
  return (
    <div className="trust">
      <div className="trust__row kora-wrap">
        {TRUST.map((t) => (
          <div key={t} className="trust__item"><span className="trust__dia">◆</span>{t}</div>
        ))}
      </div>
    </div>
  );
}

export function WhatsAppFab() {
  return (
    <a className="wafab" href="https://wa.me/919981234108" target="_blank" rel="noreferrer">
      <span>🟢</span> Chat on WhatsApp
    </a>
  );
}

export default function Footer() {
  return (
    <>
      <TrustBar />
      <footer className="ft">
        <div className="ft__grid kora-wrap">
          <div className="ft__brand">
            <a className="ft__logo" href="#/">KORA</a>
            <p className="ft__tag">Born in South India.</p>
            <div className="ft__social">
              <a href="https://instagram.com/kora_shoe_makers" aria-label="Instagram">Instagram</a>
              <a href="https://facebook.com/share/1FKfWftoDR" aria-label="Facebook">Facebook</a>
              <a href="https://youtube.com/@korashoemakers" aria-label="YouTube">YouTube</a>
              <a href="https://wa.me/919981234108" aria-label="WhatsApp">WhatsApp</a>
            </div>
            <p className="ft__contact">WhatsApp +91 99812 34108<br />ecommerce@koraretail.in</p>
          </div>
          <div className="ft__col">
            <h4>Shop</h4>
            <a href="#/collection/men">Men's shoes</a><a href="#/collection/women">Women's shoes</a><a href="#/collection/kids">Kids' shoes</a>
            <a href="#/collection/new">New arrivals</a><a href="#/collection/sale">Sale</a><a href="#/collection/all">By occasion</a>
          </div>
          <div className="ft__col">
            <h4>Help</h4>
            <a href="#/checkout">Track order</a><a href="#/story">Returns &amp; exchange</a><a href="#/story">Size guide</a>
            <a href="#/">Store locator</a><a href="#/story">Contact us</a><a href="https://wa.me/919981234108" target="_blank" rel="noreferrer">WhatsApp support</a>
          </div>
          <div className="ft__col">
            <h4>Company</h4>
            <a href="#/story">About KORA</a><a href="#/story">Our story</a><a href="#/story">Careers</a>
            <a href="#/story">KORA Club loyalty</a><a href="#/story">Bulk enquiry</a>
          </div>
          <div className="ft__col">
            <h4>More info</h4>
            <a href="#/story">Secure shopping</a><a href="#/story">Shipping &amp; returns</a><a href="#/story">Terms &amp; conditions</a>
            <a href="#/story">Privacy policy</a><a href="#/">Sitemap</a>
          </div>
        </div>
        <div className="ft__fam kora-wrap">
          <div>
            <span className="ft__fam-lbl">KORA family of brands</span>
            <div className="ft__fam-chips">
              {BRANDS.filter((b) => b.key !== 'kora').map((b) => <a key={b.key} href={`#/brand/${b.key}`}>{b.name}</a>)}
            </div>
          </div>
          <div>
            <span className="ft__fam-lbl">We accept</span>
            <div className="ft__fam-chips">
              {['UPI', 'GPay', 'PhonePe', 'Paytm', 'RuPay', 'Visa', 'Mastercard', 'COD'].map((p) => <span key={p}>{p}</span>)}
            </div>
          </div>
        </div>
        <div className="ft__base kora-wrap">
          <span>© 2026 KORA Retail Pvt. Ltd. All rights reserved.</span>
          <span>All prices in INR, inclusive of GST</span>
        </div>
      </footer>
      <WhatsAppFab />
    </>
  );
}
