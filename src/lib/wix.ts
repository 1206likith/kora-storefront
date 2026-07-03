/* Headless Wix eCommerce client for the KORA storefront.
   Uses the site's public OAuth client id (visitor tokens, no login) to drive a
   real currentCart and a Wix-hosted checkout redirect. The visitor session is
   persisted in the `session` cookie so the same cart survives reloads.

   Wix eCommerce Quick Start:
   https://dev.wix.com/docs/sdk/backend-modules/ecom/current-cart/introduction */
import Cookies from 'js-cookie';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { currentCart } from '@wix/ecom';
import { redirects } from '@wix/redirects';

/** Public OAuth client id bound to the KORA Retail store (visitor auth). */
const CLIENT_ID = '0d84331d-ca62-4785-9541-7bc11f54fa39';
/** Wix Stores app id — required on every catalog line item's catalogReference. */
const STORES_APP_ID = '215238eb-22a5-4c36-9e7b-e7c08025e04e';
const SESSION_COOKIE = 'session';
const EMPTY_TOKENS = '{"accessToken":{},"refreshToken":{}}';

function loadTokens() {
  try {
    return JSON.parse(Cookies.get(SESSION_COOKIE) || EMPTY_TOKENS);
  } catch {
    return JSON.parse(EMPTY_TOKENS);
  }
}

const client = createClient({
  modules: { currentCart, redirects },
  auth: OAuthStrategy({ clientId: CLIENT_ID, tokens: loadTokens() }),
});

/** Persist the (possibly refreshed) visitor tokens after each cart call. */
function persistSession() {
  try {
    Cookies.set(SESSION_COOKIE, JSON.stringify(client.auth.getTokens()), { expires: 180 });
  } catch {
    /* cookies unavailable (private mode / SSR) — cart just won't persist */
  }
}

/** A "no current cart yet" response is normal for a fresh visitor, not an error. */
function isCartNotFound(err: unknown): boolean {
  const s = JSON.stringify(
    (err as { message?: string; details?: unknown } | undefined)?.details ??
      (err as { message?: string } | undefined)?.message ??
      err ?? '',
  );
  return s.includes('OWNED_CART_NOT_FOUND') || s.includes('NOT_FOUND');
}

export type WixCart = Awaited<ReturnType<typeof client.currentCart.getCurrentCart>>;
export type WixLineItem = NonNullable<WixCart['lineItems']>[number];

/** Fetch the visitor's current cart; returns null when there is no cart yet. */
export async function getCart(): Promise<WixCart | null> {
  try {
    const cart = await client.currentCart.getCurrentCart();
    persistSession();
    return cart;
  } catch (err) {
    persistSession();
    if (isCartNotFound(err)) return null;
    console.error('[wix] getCart failed', err);
    return null;
  }
}

/** Add one unit of a product (with an optional Size variant) to the current cart. */
export async function addToCart(productId: string, size?: string): Promise<WixCart | null> {
  const res = await client.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: STORES_APP_ID,
          catalogItemId: productId,
          ...(size ? { options: { options: { Size: size } } } : {}),
        },
        quantity: 1,
      },
    ],
  });
  persistSession();
  return res.cart ?? null;
}

/** Set the quantity of a line item (Wix clamps to available stock). */
export async function updateQty(lineItemId: string, quantity: number): Promise<WixCart | null> {
  const res = await client.currentCart.updateCurrentCartLineItemQuantity([
    { _id: lineItemId, quantity },
  ]);
  persistSession();
  return res.cart ?? null;
}

/** Remove a single line item from the current cart. */
export async function removeLineItem(lineItemId: string): Promise<WixCart | null> {
  const res = await client.currentCart.removeLineItemsFromCurrentCart([lineItemId]);
  persistSession();
  return res.cart ?? null;
}

/** Delete the whole current cart. */
export async function clearCart(): Promise<void> {
  try {
    await client.currentCart.deleteCurrentCart();
  } catch (err) {
    if (!isCartNotFound(err)) console.error('[wix] clearCart failed', err);
  }
  persistSession();
}

/** Create a Wix-hosted checkout from the current cart and return the redirect URL.
    `postFlowUrl` is where Wix returns the buyer after the hosted flow completes. */
export async function checkout(postFlowUrl: string): Promise<string | null> {
  try {
    const { checkoutId } = await client.currentCart.createCheckoutFromCurrentCart({
      channelType: currentCart.ChannelType.WEB,
    });
    if (!checkoutId) return null;
    const { redirectSession } = await client.redirects.createRedirectSession({
      ecomCheckout: { checkoutId },
      callbacks: { postFlowUrl },
    });
    persistSession();
    return redirectSession?.fullUrl ?? null;
  } catch (err) {
    console.error('[wix] checkout failed', err);
    return null;
  }
}

/** Convert a Wix line-item image reference to a displayable https URL. */
export function lineItemImage(image?: string): string | undefined {
  if (!image) return undefined;
  if (image.startsWith('http')) return image;
  // wix:image://v1/<mediaId>/<filename>#... -> static.wixstatic media URL
  const m = image.match(/wix:image:\/\/v1\/([^/#]+)/);
  const mediaId = m ? m[1] : image;
  const ext = mediaId.split('.').pop() || 'jpg';
  return `https://static.wixstatic.com/media/${mediaId}/v1/fit/w_320,h_320,q_85/file.${ext}`;
}

/** Read the Size option (if any) off a line item's description lines. */
export function lineItemSize(item: WixLineItem): string | undefined {
  const line = item.descriptionLines?.find(
    (d) => (d.name?.original || '').toLowerCase() === 'size',
  );
  return line?.plainText?.original || undefined;
}
