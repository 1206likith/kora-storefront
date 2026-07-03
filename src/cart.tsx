/* Cart state for the whole app. Wraps the Wix currentCart client (src/lib/wix.ts)
   and exposes count / subtotal / actions plus a lightweight add-to-bag toast. */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  addToCart,
  getCart,
  removeLineItem,
  updateQty,
  type WixCart,
  type WixLineItem,
} from './lib/wix';
import type { Product } from './data/catalog';

interface CartContextValue {
  cart: WixCart | null;
  items: WixLineItem[];
  count: number;
  subtotal: number;
  loading: boolean;
  toast: string | null;
  add: (product: Product, size?: string) => Promise<boolean>;
  remove: (lineId: string) => Promise<void>;
  setQty: (lineId: string, n: number) => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

const lineItemsOf = (cart: WixCart | null): WixLineItem[] => cart?.lineItems ?? [];

const totalQty = (cart: WixCart | null): number =>
  lineItemsOf(cart).reduce((sum, li) => sum + (li.quantity ?? 0), 0);

/** Sum of line-item prices (amount × qty) in the cart currency. */
const cartSubtotal = (cart: WixCart | null): number =>
  lineItemsOf(cart).reduce((sum, li) => {
    const each = Number(li.price?.amount ?? 0);
    return sum + (Number.isFinite(each) ? each * (li.quantity ?? 0) : 0);
  }, 0);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<WixCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const refresh = useCallback(async () => {
    const next = await getCart();
    setCart(next);
  }, []);

  useEffect(() => {
    let live = true;
    (async () => {
      const next = await getCart();
      if (live) {
        setCart(next);
        setLoading(false);
      }
    })();
    return () => {
      live = false;
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const add = useCallback(
    async (product: Product, size?: string): Promise<boolean> => {
      try {
        const next = await addToCart(product.id, size);
        setCart(next);
        showToast(`Added to bag — ${product.name}`);
        return true;
      } catch (err) {
        console.error('[cart] add failed', err);
        showToast('Could not add to bag. Please try again.');
        return false;
      }
    },
    [showToast],
  );

  const remove = useCallback(async (lineId: string) => {
    try {
      const next = await removeLineItem(lineId);
      setCart(next);
    } catch (err) {
      console.error('[cart] remove failed', err);
    }
  }, []);

  const setQty = useCallback(
    async (lineId: string, n: number) => {
      if (n < 1) return remove(lineId);
      try {
        const next = await updateQty(lineId, n);
        setCart(next);
      } catch (err) {
        console.error('[cart] setQty failed', err);
      }
    },
    [remove],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      items: lineItemsOf(cart),
      count: totalQty(cart),
      subtotal: cartSubtotal(cart),
      loading,
      toast,
      add,
      remove,
      setQty,
      refresh,
    }),
    [cart, loading, toast, add, remove, setQty, refresh],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div className="cart-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
