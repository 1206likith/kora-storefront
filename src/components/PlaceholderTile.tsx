/* SPEC imagery placeholder: labelled diagonal-stripe box.
   Swap for real <img> photography at the documented aspect ratios later. */

interface Props {
  label?: string;
  c1?: string;
  c2?: string;
  ratio?: string;   // e.g. '1 / 1', '4 / 3', '16 / 9'
  radius?: number;
  dark?: boolean;
  style?: React.CSSProperties;
}

export default function PlaceholderTile({
  label,
  c1,
  c2,
  ratio = '1 / 1',
  radius = 12,
  dark = false,
  style,
}: Props) {
  const a = c1 ?? (dark ? '#1c1c26' : 'var(--surface-tile)');
  const b = c2 ?? (dark ? '#23232f' : 'var(--surface-tile-2)');
  return (
    <div
      style={{
        aspectRatio: ratio,
        borderRadius: radius,
        background: `repeating-linear-gradient(135deg, ${a} 0 12px, ${b} 12px 26px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            font: '600 10px/1.2 var(--font-ui)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: dark ? 'rgba(255,255,255,0.55)' : 'var(--muted)',
            textAlign: 'center',
            padding: '0 10px',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
