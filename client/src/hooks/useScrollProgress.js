import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track scroll progress (0 to 1)
 * @returns {{ progress: number, scrollY: number, direction: 'up'|'down' }}
 */
export const useScrollProgress = () => {
  const [state, setState] = useState({
    progress: 0,
    scrollY: 0,
    direction: 'down',
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    setState((prev) => ({
      progress,
      scrollY,
      direction: scrollY > prev.scrollY ? 'down' : 'up',
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return state;
};

export default useScrollProgress;
