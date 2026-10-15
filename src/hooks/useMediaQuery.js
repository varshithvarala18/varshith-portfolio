import { useEffect, useState } from 'react';

/**
 * Tracks a CSS media query, e.g. useMediaQuery('(max-width: 768px)').
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

// Phones and small tablets get lighter 3D scenes.
export const useIsCompact = () => useMediaQuery('(max-width: 768px)');

// Hover-capable fine pointers (mouse/trackpad) get tilt and parallax effects.
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
