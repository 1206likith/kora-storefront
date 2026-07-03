/* Wishlist — localStorage-backed, no login required. A single global list of
   product ids with a change event so every mounted component re-renders when it
   changes (works across cards, the PDP heart, and the wishlist page). */
import { useCallback, useSyncExternalStore } from 'react';

const KEY = 'kora_wishlist';
const EVENT = 'kora:wishlist';

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function write(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* storage full / unavailable — ignore */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function list(): string[] {
  return read();
}

export function has(id: string): boolean {
  return read().includes(id);
}

export function toggle(id: string): void {
  const ids = read();
  write(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
}

/* --- React binding --------------------------------------------------------- */

function subscribe(cb: () => void): () => void {
  const onChange = () => cb();
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange); // other tabs
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

// Stable snapshot cache so useSyncExternalStore doesn't loop on a fresh array.
let cache: string[] = read();
let cacheKey = JSON.stringify(cache);
function getSnapshot(): string[] {
  const raw = localStorage.getItem(KEY) ?? '[]';
  if (raw !== cacheKey) {
    cacheKey = raw;
    cache = read();
  }
  return cache;
}

export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => cache);
  return {
    ids,
    has: useCallback((id: string) => ids.includes(id), [ids]),
    toggle: useCallback((id: string) => toggle(id), []),
    list: useCallback(() => ids, [ids]),
  };
}
