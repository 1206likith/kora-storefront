/* Trust bar + Footer + WhatsApp FAB (SPEC). Business info from koraretail.in. */
import { BRANDS } from '../data/brands';
import { c } from '../data/content';
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
        {TRUST.map((t, i) => (
          <div key={t} className="trust__item"><span className="trust__dia">◆</span>{c(`footer.trust.${i}`, t)}</div>
        ))}
      </div>
    </div>
  );
}

export function WhatsAppFab() {
  return (
    <a className="wafab" href="https://wa.me/919981234108" target="_blank" rel="noreferrer">
      <span>🟢</span> {c('footer.waFab.label', 'Chat on WhatsApp')}
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
            <a className="ft__logo" href="#/">{c('footer.logo', 'KORA')}</a>
            <p className="ft__tag">{c('footer.tagline', 'Born in South India.')}</p>
            <div className="ft__social">
              <a href="https://instagram.com/kora_shoe_makers" aria-label="Instagram">{c('footer.social.0.label', 'Instagram')}</a>
              <a href="https://facebook.com/share/1FKfWftoDR" aria-label="Facebook">{c('footer.social.1.label', 'Facebook')}</a>
              <a href="https://youtube.com/@korashoemakers" aria-label="YouTube">{c('footer.social.2.label', 'YouTube')}</a>
              <a href="https://wa.me/919981234108" aria-label="WhatsApp">{c('footer.social.3.label', 'WhatsApp')}</a>
            </div>
            <p className="ft__contact">{c('footer.contact.whatsapp', 'WhatsApp +91 99812 34108')}<br />{c('footer.contact.email', 'ecommerce@koraretail.in')}</p>
          </div>
          <div className="ft__col">
            <h4>{c('footer.column.shop.heading', 'Shop')}</h4>
            <a href="#/collection/men">{c('footer.column.shop.item.0.label', "Men's shoes")}</a><a href="#/collection/women">{c('footer.column.shop.item.1.label', "Women's shoes")}</a><a href="#/collection/kids">{c('footer.column.shop.item.2.label', "Kids' shoes")}</a>
            <a href="#/collection/new">{c('footer.column.shop.item.3.label', 'New arrivals')}</a><a href="#/collection/sale">{c('footer.column.shop.item.4.label', 'Sale')}</a><a href="#/collection/all">{c('footer.column.shop.item.5.label', 'By occasion')}</a>
          </div>
          <div className="ft__col">
            <h4>{c('footer.column.help.heading', 'Help')}</h4>
            <a href="#/checkout">{c('footer.column.help.item.0.label', 'Track order')}</a><a href="#/policy/refund">{c('footer.column.help.item.1.label', 'Returns & exchange')}</a><a href="#/story">{c('footer.column.help.item.2.label', 'Size guide')}</a>
            <a href="#/stores">{c('footer.column.help.item.3.label', 'Store locator')}</a><a href="#/contact">{c('footer.column.help.item.4.label', 'Contact us')}</a><a href="https://wa.me/919981234108" target="_blank" rel="noreferrer">{c('footer.column.help.item.5.label', 'WhatsApp support')}</a>
          </div>
          <div className="ft__col">
            <h4>{c('footer.column.company.heading', 'Company')}</h4>
            <a href="#/story">{c('footer.column.company.item.0.label', 'About KORA')}</a><a href="#/story">{c('footer.column.company.item.1.label', 'Our story')}</a><a href="#/story">{c('footer.column.company.item.2.label', 'Careers')}</a>
            <a href="#/loyalty">{c('footer.column.company.item.3.label', 'KORA Club loyalty')}</a><a href="#/contact">{c('footer.column.company.item.4.label', 'Bulk enquiry')}</a>
          </div>
          <div className="ft__col">
            <h4>{c('footer.column.more.heading', 'More info')}</h4>
            <a href="#/policy/terms">{c('footer.column.more.item.0.label', 'Secure shopping')}</a><a href="#/policy/shipping">{c('footer.column.more.item.1.label', 'Shipping & returns')}</a><a href="#/policy/terms">{c('footer.column.more.item.2.label', 'Terms & conditions')}</a>
            <a href="#/policy/privacy">{c('footer.column.more.item.3.label', 'Privacy policy')}</a><a href="#/">{c('footer.column.more.item.4.label', 'Sitemap')}</a>
          </div>
        </div>
        <div className="ft__fam kora-wrap">
          <div>
            <span className="ft__fam-lbl">{c('footer.familyLabel', 'KORA family of brands')}</span>
            <div className="ft__fam-chips">
              {BRANDS.filter((b) => b.key !== 'kora').map((b) => <a key={b.key} href={`#/brand/${b.key}`}>{b.name}</a>)}
            </div>
          </div>
          <div>
            <span className="ft__fam-lbl">{c('footer.paymentsLabel', 'We accept')}</span>
            <div className="ft__fam-chips">
              {['UPI', 'GPay', 'PhonePe', 'Paytm', 'RuPay', 'Visa', 'Mastercard', 'COD'].map((p, i) => <span key={p}>{c(`footer.payment.${i}`, p)}</span>)}
            </div>
          </div>
        </div>
        <div className="ft__base kora-wrap">
          <span>{c('footer.copyright', '© 2026 KORA Retail Pvt. Ltd. All rights reserved.')}</span>
          <span>{c('footer.priceNote', 'All prices in INR, inclusive of GST')}</span>
        </div>
      </footer>
      <WhatsAppFab />
    </>
  );
}
