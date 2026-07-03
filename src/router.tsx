/* Tiny hash router — portable, no deps. Routes:
   #/                     home
   #/brand/<key>          brand world
   #/product/<id>         product detail
   #/collection/<slug>    collection / PLP
   #/finder               AI shoe finder (slim chrome)
   #/checkout             cart (slim chrome)  — #/cart is an alias
   #/search/<query>       search results
   #/wishlist             saved products
   #/story                our story
   #/policy/<slug>        legal pages (shipping | refund | terms | privacy)
   #/stores               store locator
   #/contact              contact
   #/loyalty              KORA Club loyalty
*/
import { useEffect, useState } from 'react';

export interface Route {
  name: 'home' | 'brand' | 'product' | 'collection' | 'finder' | 'checkout' | 'search' | 'wishlist' | 'story' | 'policy' | 'stores' | 'contact' | 'loyalty';
  param?: string;
}

function parse(): Route {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [rawName, ...rest] = h.split('/');
  const name = rawName === 'cart' ? 'checkout' : rawName; // #/cart alias
  const param = rest.join('/'); // keep encoded search queries intact
  const known = ['home', 'brand', 'product', 'collection', 'finder', 'checkout', 'search', 'wishlist', 'story', 'policy', 'stores', 'contact', 'loyalty'];
  return { name: (known.includes(name) ? name : 'home') as Route['name'], param: param || undefined };
}

export function useHashRoute(): Route {
  const [r, setR] = useState<Route>(parse);
  useEffect(() => {
    const on = () => {
      setR(parse());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return r;
}

export const go = (path: string) => {
  window.location.hash = path.startsWith('#') ? path : '#/' + path.replace(/^\//, '');
};
