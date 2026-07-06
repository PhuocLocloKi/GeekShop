import { useRef, useEffect } from 'react';

/**
 * Custom hook for managing Three.js scene lifecycle
 * Provides refs and cleanup for common Three.js patterns
 * @returns {{ containerRef, rendererRef, sceneRef, cameraRef }}
 */
export const useThreeScene = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return {
    containerRef,
    rendererRef,
    sceneRef,
    cameraRef,
    animationRef,
  };
};

export default useThreeScene;
