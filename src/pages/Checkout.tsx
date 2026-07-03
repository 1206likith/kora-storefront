import { useState } from 'react';
import './Checkout.css';
import PlaceholderTile from '../components/PlaceholderTile';
import { DEMO_PRODUCTS, inr } from '../data/catalog';
import { go } from '../router';

type PayMethod = 'upi' | 'cod' | 'card' | 'netbanking' | 'emi';
type DeliveryMethod = 'standard' | 'express';

const FREE_DELIVERY_THRESHOLD = 599;
const DISCOUNT = 200;
const CART_IDS = ['kora-sneak', 'asc-heel', 'kora-mojari'];

const PAY_METHODS: { id: PayMethod; label: string }[] = [
  { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm / Other)' },
  { id: 'cod', label: 'Cash on delivery' },
  { id: 'card', label: 'Credit / Debit card' },
  { id: 'netbanking', label: 'Net banking' },
  { id: 'emi', label: 'EMI (0% over ₹1,500)' },
];

const STEPPER_LABELS = ['Cart', 'Address', 'Payment'] as const;

export default function Checkout() {
  const [coStep, setCoStep] = useState<1 | 2 | 3 | 4>(1);
  const [cart, setCart] = useState(() => DEMO_PRODUCTS.filter((p) => CART_IDS.includes(p.id)));
  const [promo, setPromo] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const [pay, setPay] = useState<PayMethod>('upi');

  const removeItem = (id: string) => setCart((c) => c.filter((p) => p.id !== id));

  const subtotal = cart.reduce((sum, p) => sum + p.price, 0);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryPct = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const deliveryFee = deliveryMethod === 'express' ? 99 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 49;
  const baseTotal = Math.max(0, subtotal + deliveryFee - DISCOUNT);
  const upiDiscount = pay === 'upi' ? Math.round(baseTotal * 0.05) : 0;
  const total = Math.max(0, baseTotal - upiDiscount);

  return (
    <div className="co-page">
      <div className="kora-wrap co-wrap">
        {coStep !== 4 && (
          <div className="co-stepper">
            {STEPPER_LABELS.map((label, i) => (
              <span
                key={label}
                className={`co-step${coStep === i + 1 ? ' is-active' : ''}${coStep > i + 1 ? ' is-done' : ''}`}
              >
                {label}
                {i < STEPPER_LABELS.length - 1 && <span className="co-step-arrow">→</span>}
              </span>
            ))}
          </div>
        )}

        {coStep === 1 && (
          <div className="co-grid">
            <div className="co-main">
              <h1 className="co-title">Your cart</h1>
              <div className="co-delivery-bar">
                <div className="co-delivery-fill" style={{ width: `${freeDeliveryPct}%` }} />
              </div>
              <p className="co-delivery-msg">
                {subtotal >= FREE_DELIVERY_THRESHOLD
                  ? "You've unlocked FREE delivery ✓"
                  : `Add ${inr(remainingForFreeDelivery)} more for FREE delivery`}
              </p>

              <div className="co-items">
                {cart.map((item) => (
                  <div className="co-item" key={item.id}>
                    <PlaceholderTile
                      label={item.cat}
                      ratio="1 / 1"
                      radius={10}
                      style={{ width: 72, height: 72, flex: '0 0 auto' }}
                    />
                    <div className="co-item-info">
                      <div className="co-item-brand">{item.brandName}</div>
                      <div className="co-item-name">{item.name}</div>
                      <div className="co-item-meta">Size 9 · Qty 1</div>
                    </div>
                    <div className="co-item-price">{inr(item.price)}</div>
                    <button type="button" className="co-remove" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}
                {cart.length === 0 && <p className="co-empty">Your cart is empty.</p>}
              </div>
            </div>

            <div className="co-summary">
              <h2 className="co-summary-title">Order summary</h2>
              <div className="co-summary-row">
                <span>Subtotal</span>
                <span>{inr(subtotal)}</span>
              </div>
              <div className="co-summary-row">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : inr(deliveryFee)}</span>
              </div>
              <div className="co-summary-row co-summary-discount">
                <span>Discount</span>
                <span>−{inr(DISCOUNT)}</span>
              </div>
              <div className="co-promo">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="co-promo-input"
                />
                <button type="button" className="co-promo-apply">Apply</button>
              </div>
              <div className="co-summary-row co-summary-total">
                <span>Total</span>
                <span>{inr(baseTotal)}</span>
              </div>
              <button type="button" className="btn-orange co-cta" onClick={() => setCoStep(2)}>
                Proceed to checkout →
              </button>
            </div>
          </div>
        )}

        {coStep === 2 && (
          <div className="co-address">
            <h1 className="co-title">Delivery address</h1>
            <div className="co-form-grid">
              <label className="co-field">
                <span>Full name</span>
                <input type="text" placeholder="Your full name" />
              </label>
              <label className="co-field">
                <span>Phone</span>
                <input type="tel" placeholder="10-digit mobile number" />
              </label>
              <label className="co-field">
                <span>Pincode</span>
                <input type="text" placeholder="6-digit pincode" />
              </label>
              <label className="co-field">
                <span>City & state</span>
                <input type="text" placeholder="City, State" />
              </label>
            </div>
            <label className="co-field co-field--full">
              <span>Address</span>
              <input type="text" placeholder="House no., street, area" />
            </label>
            <label className="co-field co-field--full">
              <span>Landmark</span>
              <input type="text" placeholder="Nearby landmark (optional)" />
            </label>

            <div className="co-delivery-options">
              <label className={`co-radio-row${deliveryMethod === 'standard' ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'standard'}
                  onChange={() => setDeliveryMethod('standard')}
                />
                <span>Standard · 3–5 days · FREE</span>
              </label>
              <label className={`co-radio-row${deliveryMethod === 'express' ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'express'}
                  onChange={() => setDeliveryMethod('express')}
                />
                <span>Express · 1–2 days · ₹99</span>
              </label>
            </div>

            <div className="co-actions">
              <button type="button" className="co-back" onClick={() => setCoStep(1)}>Back</button>
              <button type="button" className="btn-navy" onClick={() => setCoStep(3)}>Continue to payment →</button>
            </div>
          </div>
        )}

        {coStep === 3 && (
          <div className="co-payment">
            <h1 className="co-title">Payment</h1>
            <p className="co-payment-intro">UPI is the fastest way to pay — and saves you 5%.</p>

            <div className="co-pay-methods">
              {PAY_METHODS.map((m) => (
                <label key={m.id} className={`co-radio-row${pay === m.id ? ' is-selected' : ''}`}>
                  <input type="radio" name="pay" checked={pay === m.id} onChange={() => setPay(m.id)} />
                  <span>{m.label}</span>
                  {m.id === 'upi' && <span className="co-pay-tag">5% OFF</span>}
                </label>
              ))}
            </div>

            <p className="co-trust">🔒 Secure checkout · 256-bit SSL encryption · PCI-DSS compliant</p>

            <div className="co-actions">
              <button type="button" className="co-back" onClick={() => setCoStep(2)}>Back</button>
              <button type="button" className="btn-orange" onClick={() => setCoStep(4)}>
                Place order · {inr(total)}
              </button>
            </div>
          </div>
        )}

        {coStep === 4 && (
          <div className="co-confirm">
            <div className="co-check">✓</div>
            <h1 className="co-title">Order confirmed!</h1>
            <p className="co-order-id">Order #KORA-48217 · Arriving Thursday, 2 July</p>

            <div className="co-recap">
              {cart.map((item) => (
                <div className="co-recap-row" key={item.id}>
                  <span>{item.brandName} — {item.name}</span>
                  <span>{inr(item.price)}</span>
                </div>
              ))}
              <div className="co-recap-row co-recap-total">
                <span>Total paid</span>
                <span>{inr(total)}</span>
              </div>
            </div>

            <div className="co-actions co-actions--center">
              <a className="co-whatsapp" href="https://wa.me/" target="_blank" rel="noreferrer">
                Track order on WhatsApp
              </a>
              <button type="button" className="btn-navy" onClick={() => go('/')}>Continue shopping →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
