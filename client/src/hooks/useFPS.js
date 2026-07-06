import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Custom hook to monitor FPS and toggle quality settings
 * @param {number} lowFpsThreshold - FPS below this triggers quality reduction (default: 30)
 * @returns {{ fps: number, isLowEnd: boolean, quality: 'high'|'medium'|'low' }}
 */
export const useFPS = (lowFpsThreshold = 30) => {
  const frameRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsRef = useRef(60);
  const samplesRef = useRef([]);
  const [quality, setQuality] = useState('high');
  const [fps, setFps] = useState(60);
  const rafRef = useRef(null);

  const measureFPS = useCallback(() => {
    frameRef.current++;
    const now = performance.now();
    const delta = now - lastTimeRef.current;

    if (delta >= 1000) {
      const currentFps = Math.round((frameRef.current * 1000) / delta);
      fpsRef.current = currentFps;
      setFps(currentFps);

      samplesRef.current.push(currentFps);
      if (samplesRef.current.length > 5) {
        samplesRef.current.shift();
      }

      // Average FPS over last 5 seconds
      const avgFps = samplesRef.current.reduce((a, b) => a + b, 0) / samplesRef.current.length;

      if (avgFps < lowFpsThreshold * 0.6) {
        setQuality('low');
      } else if (avgFps < lowFpsThreshold) {
        setQuality('medium');
      } else {
        setQuality('high');
      }

      frameRef.current = 0;
      lastTimeRef.current = now;
    }

    rafRef.current = requestAnimationFrame(measureFPS);
  }, [lowFpsThreshold]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(measureFPS);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [measureFPS]);

  return {
    fps,
    isLowEnd: quality !== 'high',
    quality,
  };
};

export default useFPS;
