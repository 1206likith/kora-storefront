/* Reusable ProductCard — dark by design (SPEC), even on the light site.
   Brand chip (top-left), optional badge (top-right), wishlist (bottom-right),
   category label (bottom-center), name + price row + outline Add-to-bag. */
import PlaceholderTile from './PlaceholderTile';
import { inr, savePct, badgeColor, type Product } from '../data/catalog';
import { brandByKey } from '../data/brands';
import { useWishlist } from '../wishlist';

interface Props {
  p: Product;
  width?: number;
  onOpen?: (p: Product) => void;
  onAdd?: (p: Product) => void;
}

export default function ProductCard({ p, width, onOpen, onAdd }: Props) {
  const brand = brandByKey(p.brand);
  const accent = brand?.accent ?? 'var(--gold)';
  const badge = badgeColor(p.badge);
  const pct = savePct(p.price, p.mrp);
  const wishlist = useWishlist();
  const saved = wishlist.has(p.id);

  return (
    <article
      className="pcard"
      style={{ width: width ? `${width}px` : undefined }}
      onClick={() => onOpen?.(p)}
    >
      <div className="pcard__img">
        {p.image ? (
          <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <PlaceholderTile label={p.name} dark radius={0} style={{ height: '100%', borderRadius: 0 }} />
        )}
        <span className="pcard__brand" style={{ color: accent }}>{p.brandName}</span>
        {p.badge && (
          <span className="pcard__badge" style={{ background: badge.bg, color: badge.fg }}>{p.badge}</span>
        )}
        <button
          className={saved ? 'pcard__wish is-saved' : 'pcard__wish'}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={saved}
          onClick={(e) => { e.stopPropagation(); wishlist.toggle(p.id); }}
        >
          {saved ? '♥' : '♡'}
        </button>
        <span className="pcard__cat">{p.cat}</span>
      </div>
      <div className="pcard__body">
        <h3 className="pcard__name">{p.name}</h3>
        <div className="pcard__price">
          <span className="pcard__now">{inr(p.price)}</span>
          {p.mrp && p.mrp > p.price && <span className="pcard__mrp">{inr(p.mrp)}</span>}
          {pct > 0 && <span className="pcard__save">−{pct}%</span>}
        </div>
        <button
          className="pcard__add"
          onClick={(e) => { e.stopPropagation(); onAdd?.(p); }}
        >
          Add to bag
        </button>
      </div>
    </article>
  );
}
