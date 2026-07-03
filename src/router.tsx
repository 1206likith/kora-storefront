/* Tiny hash router — portable, no deps. Routes:
   #/                     home
   #/brand/<key>          brand world
   #/product/<id>         product detail
   #/collection/<slug>    collection / PLP
   #/finder               AI shoe finder (slim chrome)
   #/checkout             checkout (slim chrome)
   #/story                our story
*/
import { useEffect, useState } from 'react';

export interface Route {
  name: 'home' | 'brand' | 'product' | 'collection' | 'finder' | 'checkout' | 'story';
  param?: string;
}

function parse(): Route {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [name, param] = h.split('/');
  const known = ['home', 'brand', 'product', 'collection', 'finder', 'checkout', 'story'];
  return { name: (known.includes(name) ? name : 'home') as Route['name'], param };
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
