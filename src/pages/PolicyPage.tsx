/* Legal / policy pages. One component, switch on slug for the title + body.
   Real wording fetched from koraretail.in (shipping, refund, terms, privacy).
   Every string is editable via c('legal.<slug>...') with the live text as fallback. */
import { c } from '../data/content';
import '../styles/content-pages.css';

export type PolicySlug = 'shipping' | 'refund' | 'terms' | 'privacy';

interface Block {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}
interface Policy {
  eyebrow: string;
  title: string;
  blocks: Block[];
}

const DISCLAIMER: Block = {
  heading: 'Disclaimer',
  paragraphs: [
    'Kora Retail Private Limited curates a limited-edition collection. Availability of products, sizes, and styles is subject to stock. While we strive to display accurate product images and descriptions, minor variations in color or texture may occur due to screen settings or photographic lighting. Kora Retail reserves the right to update or amend these policies at any time without prior notice.',
  ],
};

const POLICIES: Record<PolicySlug, Policy> = {
  shipping: {
    eyebrow: 'Legal',
    title: 'Shipping & Return Policy',
    blocks: [
      {
        heading: 'Ordering & Shipping Policy',
        paragraphs: [
          "Once your order is placed, you'll receive a confirmation email with your order details.",
          'Orders are typically dispatched within 1-2 business days. Deliveries are made between Monday-Saturday. Delivery timelines depend on courier partners but usually take 3-7 days post-dispatch.',
          'After dispatch, a tracking number will be shared via email to track your shipment.',
          'Please ensure your shipping address and contact details are accurate. Incomplete or incorrect information may lead to delays.',
          'Orders cannot be scheduled for delivery without a valid phone number and address.',
          'Deliveries are attempted up to 2 times before items are returned to us.',
          'For reshipping or address changes after dispatch, additional delivery charges may apply.',
        ],
      },
      {
        heading: 'Return & Exchange Policy',
        paragraphs: [
          'We understand that sometimes things may not fit as expected. You may request an exchange within 7 days of delivery. Exchanges are only accepted if:',
        ],
        bullets: [
          'The product is unworn and unused.',
          'Original tags, labels, and packaging are intact.',
          'Proof of purchase is provided.',
        ],
      },
      {
        paragraphs: [
          'Exchange requests can be sent to ecommerce@koraretail.in with your order number and preferred size. If the requested size is unavailable, we will issue store credit for the same amount. No cash refunds are issued for size exchanges.',
        ],
      },
      DISCLAIMER,
    ],
  },
  refund: {
    eyebrow: 'Legal',
    title: 'Refund Policy',
    blocks: [
      {
        heading: 'Order Cancellation Policy',
        paragraphs: [
          'Orders can be cancelled only before dispatch for specified reasons.',
          'To cancel, email ecommerce@koraretail.in with your order number and reason for cancellation.',
          'Once an order has been shipped, cancellations are not accepted.',
        ],
      },
      {
        heading: 'Refunds',
        paragraphs: ['We issue refunds only for the following cases:'],
        bullets: [
          'Incorrect item shipped',
          'Damaged or defective product',
          'Missing item(s) from your order',
        ],
      },
      {
        paragraphs: [
          'For approved cases, a full refund will be processed to your original payment method.',
          'Refunds are not applicable for size exchanges or personal preference returns.',
        ],
      },
      DISCLAIMER,
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms & Conditions',
    blocks: [
      {
        paragraphs: [
          'Thank you for visiting www.koraretail.in. If you continue to browse and use www.koraretail.in you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Kora Retail Private Limited’s relationship with you in relation to this website.',
          'The term "Kora Retail" or "us" or "we" refers to Kora Retail Private Limited, the company whose office is located at 137-1-B, Mustabad Gram Panchayat, 2nd Lane, Mustabad, Krishna, Andhra Pradesh, 521107. The term "you" refers to the user or viewer of our website.',
        ],
      },
      {
        heading: 'Terms of Use',
        paragraphs: [
          'The use of Kora Retail Private Limited is subject to the following terms of use:',
          'The content of the pages of Kora Retail Private Limited is for your general information and use only. It is subject to change without notice.',
          'Neither Kora Retail Private Limited nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.',
          'Your use of any information or materials on Kora Retail Private Limited is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website meet your specific requirements.',
        ],
      },
    ],
  },
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    blocks: [
      {
        paragraphs: [
          'Kora Retail Private Limited manages the footwear ecommerce website at www.koraretail.in. The company is dedicated to protecting your privacy while you shop for shoes online. When you use our website, we collect basic details like your name, address, phone number, and email to deliver your orders and keep you updated about your purchase. Our technology ensures your information is secure, and we do not sell your personal details to anyone. Only our authorized team members and trusted delivery partners can access your data, and in rare cases, we may need to share your details with authorities if required by law.',
          'You have control over your information and can log into your account anytime to review, change, or delete your details. If you prefer not to receive marketing messages, you can unsubscribe easily. We do not intentionally collect information from children under 13 years old, and if you believe a child’s information has been shared with us, let us know so we can remove it.',
          'If you have queries or want help regarding your privacy or personal details, reach out at info@koraretail.in. Our privacy policy follows Indian laws and is designed to make your online footwear shopping experience safe, transparent, and worry-free.',
        ],
      },
      DISCLAIMER,
    ],
  },
};

export default function PolicyPage({ slug }: { slug?: string }) {
  const key: PolicySlug = (['shipping', 'refund', 'terms', 'privacy'] as const).includes(
    slug as PolicySlug,
  )
    ? (slug as PolicySlug)
    : 'shipping';
  const p = POLICIES[key];

  return (
    <div>
      <section className="cp-hero">
        <span className="cp-hero__eyebrow">{c(`legal.${key}.eyebrow`, p.eyebrow)}</span>
        <h1 className="cp-hero__title">{c(`legal.${key}.title`, p.title)}</h1>
      </section>

      <section className="section">
        <div className="kora-wrap legal-body">
          {p.blocks.map((block, bi) => (
            <div key={bi} className="legal-block">
              {block.heading && (
                <h2 className="legal-block__h">
                  {c(`legal.${key}.block.${bi}.heading`, block.heading)}
                </h2>
              )}
              {block.paragraphs?.map((para, pi) => (
                <p key={pi} className="legal-p">
                  {c(`legal.${key}.block.${bi}.p.${pi}`, para)}
                </p>
              ))}
              {block.bullets && (
                <ul className="legal-list">
                  {block.bullets.map((li, li2) => (
                    <li key={li2}>{c(`legal.${key}.block.${bi}.li.${li2}`, li)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p className="legal-updated">
            {c('legal.updated', '© Kora Retail Private Limited 2026')}
          </p>
        </div>
      </section>
    </div>
  );
}
