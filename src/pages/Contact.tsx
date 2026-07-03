/* Contact page. WhatsApp / email / store-locator / social + a simple contact form.
   The form has no backend: on submit it opens a prefilled mailto: to
   ecommerce@koraretail.in (client-side), so it works on the static build. */
import { useState } from 'react';
import { c } from '../data/content';
import '../styles/content-pages.css';

const EMAIL = 'ecommerce@koraretail.in';
const WA_NUMBER = '919981234108';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website enquiry from ${name || 'a customer'}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <section className="cp-hero">
        <span className="cp-hero__eyebrow">{c('contact.eyebrow', 'We’re here to help')}</span>
        <h1 className="cp-hero__title">{c('contact.title', 'Get in touch')}</h1>
        <p className="cp-hero__sub">
          {c(
            'contact.intro',
            'Questions about an order, a size, or a store visit? Reach us on WhatsApp, by email, or send a message below.',
          )}
        </p>
      </section>

      <section className="section">
        <div className="kora-wrap contact-grid">
          <div className="contact-methods">
            <a
              className="contact-method"
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-method__label">{c('contact.whatsapp.label', 'WhatsApp')}</span>
              <span className="contact-method__value">
                {c('contact.whatsapp.value', '+91 99812 34108')}
              </span>
            </a>
            <a className="contact-method" href={`mailto:${EMAIL}`}>
              <span className="contact-method__label">{c('contact.email.label', 'Email')}</span>
              <span className="contact-method__value">{c('contact.email.value', EMAIL)}</span>
            </a>
            <a className="contact-method" href="#/stores">
              <span className="contact-method__label">{c('contact.stores.label', 'Visit us')}</span>
              <span className="contact-method__value">
                {c('contact.stores.value', 'Find a store near you →')}
              </span>
            </a>
            <div className="contact-method">
              <span className="contact-method__label">{c('contact.social.label', 'Follow')}</span>
              <div className="contact-social">
                <a href="https://instagram.com/kora_shoe_makers" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://facebook.com/share/1FKfWftoDR" target="_blank" rel="noreferrer">Facebook</a>
                <a href="https://youtube.com/@korashoemakers" target="_blank" rel="noreferrer">YouTube</a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <div>
              <label htmlFor="cf-name">{c('contact.form.name', 'Your name')}</label>
              <input
                id="cf-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="cf-email">{c('contact.form.email', 'Your email')}</label>
              <input
                id="cf-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="cf-msg">{c('contact.form.message', 'Message')}</label>
              <textarea
                id="cf-msg"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button className="contact-form__btn" type="submit">
              {c('contact.form.submit', 'Send message')}
            </button>
            <p className="contact-form__note">
              {c(
                'contact.form.note',
                'This opens your email app with the message prefilled to ecommerce@koraretail.in.',
              )}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
