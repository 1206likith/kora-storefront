/* Cart page — real Wix currentCart line items with a Checkout button that
   redirects to the Wix-hosted secure checkout. Keeps the slim chrome + existing
   .co-* visual style. Route: #/checkout (alias #/cart). */
import { useState } from 'react';
import './Checkout.css';
import { inr } from '../data/catalog';
import { go } from '../router';
import { useCart } from '../cart';
import { checkout, lineItemImage, lineItemSize } from '../lib/wix';

export default function Checkout() {
  const { items, subtotal, loading, setQty, remove } = useCart();
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    setError(null);
    setRedirecting(true);
    // Wix returns the buyer here after the hosted flow (back to the storefront home).
    const postFlowUrl = window.location.href.split('#')[0] + '#/';
    const url = await checkout(postFlowUrl);
    if (url) {
      window.location.href = url;
    } else {
      setRedirecting(false);
      setError('Could not start checkout right now. Please try again in a moment.');
    }
  };

  if (loading) {
    return (
      <div className="co-page">
        <div className="kora-wrap co-wrap">
          <div className="co-loading">Loading your bag…</div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="co-page">
        <div className="kora-wrap co-wrap">
          <div className="co-empty-cta">
            <h1 className="co-title">Your bag is empty</h1>
            <p className="co-empty">Add a pair you love and it'll show up here.</p>
            <button type="button" className="btn-navy co-cta" onClick={() => go('/collection/all')}>
              Start shopping →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="co-page">
      <div className="kora-wrap co-wrap">
        <div className="co-grid">
          <div className="co-main">
            <h1 className="co-title">Your bag</h1>

            <div className="co-items">
              {items.map((item) => {
                const id = item._id ?? '';
                const qty = item.quantity ?? 1;
                const img = lineItemImage(item.image);
                const size = lineItemSize(item);
                const each = Number(item.price?.amount ?? 0);
                const lineTotal = item.lineItemPrice?.formattedAmount ?? inr(each * qty);
                return (
                  <div className="co-item" key={id}>
                    {img ? (
                      <img className="co-item-thumb" src={img} alt={item.productName?.original ?? ''} />
                    ) : (
                      <div className="co-item-thumb" />
                    )}
                    <div className="co-item-info">
                      <div className="co-item-name">{item.productName?.original}</div>
                      <div className="co-item-meta">{size ? `Size ${size}` : 'One size'}</div>
                      <button type="button" className="co-remove" onClick={() => remove(id)}>
                        Remove
                      </button>
                    </div>
                    <div className="co-qty">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        disabled={qty <= 1}
                        onClick={() => setQty(id, qty - 1)}
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => setQty(id, qty + 1)}>
                        +
                      </button>
                    </div>
                    <div className="co-item-lineprice">
                      <span className="co-item-price">{lineTotal}</span>
                    </div>
                  </div>
                );
              })}
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
              <span>Calculated at checkout</span>
            </div>
            <div className="co-summary-row co-summary-total">
              <span>Total</span>
              <span>{inr(subtotal)}</span>
            </div>

            {error && <p className="pdp-pin-msg pdp-pin-msg--bad" style={{ marginTop: 12 }}>{error}</p>}

            <button
              type="button"
              className="btn-orange co-cta"
              onClick={startCheckout}
              disabled={redirecting}
            >
              {redirecting ? 'Redirecting…' : 'Checkout →'}
            </button>
            <p className="co-note">
              Payment, coupons &amp; delivery are handled on the secure Wix checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
