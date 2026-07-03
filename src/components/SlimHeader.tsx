/* Slim header for finder + checkout (SPEC): navy/orange rules, italic KORA, Exit. */
import { go } from '../router';

export default function SlimHeader() {
  return (
    <header
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 40px', background: 'var(--page)',
        borderTop: '4px solid var(--navy)', borderBottom: '3px solid var(--orange)',
        position: 'sticky', top: 0, zIndex: 100,
      }}
    >
      <a href="#/" style={{ font: 'italic 900 26px/1 var(--font-display)', color: 'var(--navy)', letterSpacing: '-0.5px' }}>KORA</a>
      <button onClick={() => go('/')} style={{ font: '700 14px/1 var(--font-ui)', color: 'var(--navy)' }}>Exit ×</button>
    </header>
  );
}
