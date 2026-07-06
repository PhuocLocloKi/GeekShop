import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../utils/constants';

/**
 * Custom hook for responsive media queries
 * @param {string} query - CSS media query or breakpoint name
 * @returns {boolean} Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const resolvedQuery = BREAKPOINTS[query]
    ? `(max-width: ${BREAKPOINTS[query]}px)`
    : query;

  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(resolvedQuery).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(resolvedQuery);
    const handler = (e) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handler);
    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [resolvedQuery]);

  return matches;
};

export default useMediaQuery;
