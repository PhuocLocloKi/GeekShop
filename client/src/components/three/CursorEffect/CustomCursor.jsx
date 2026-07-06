import React, { useEffect, useState, useRef } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';

const CustomCursor = () => {
  const isMobile = useMediaQuery('tablet');
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState('default'); // 'default' | 'hover' | 'canvas'
  const targetPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;

    // Hide default cursor
    document.body.style.cursor = 'none';
    const clickables = 'a, button, input, select, textarea, [role="button"], .cyber-btn';

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest(clickables)) {
        setHoverState('hover');
      } else if (e.target.closest('canvas') || e.target.closest('.interactive-3d')) {
        setHoverState('canvas');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth lerp delay loop for outer ring
    let animationFrameId;
    const render = () => {
      // Lerp logic
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const getRingStyle = () => {
    switch (hoverState) {
      case 'hover':
        return {
          width: '48px',
          height: '48px',
          borderColor: 'var(--neon-pink)',
          background: 'rgba(244, 114, 182, 0.05)',
          boxShadow: 'var(--glow-pink)',
        };
      case 'canvas':
        return {
          width: '54px',
          height: '54px',
          borderColor: 'var(--neon-cyan)',
          borderRadius: '4px', // square-ish crosshair
          borderStyle: 'dashed',
          boxShadow: 'var(--glow-cyan)',
        };
      default:
        return {
          width: '32px',
          height: '32px',
          borderColor: 'var(--neon-cyan)',
          background: 'transparent',
          boxShadow: 'none',
        };
    }
  };

  const getDotStyle = () => {
    if (hoverState === 'hover') {
      return { background: 'var(--neon-pink)' };
    }
    return { background: 'var(--neon-green)' };
  };

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          borderWidth: '1px',
          borderStyle: 'solid',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, background 0.2s, border-radius 0.2s, border-style 0.2s',
          transform: 'translate(-50%, -50%)',
          ...getRingStyle(),
        }}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 0.2s',
          ...getDotStyle(),
        }}
      />
    </>
  );
};

export default CustomCursor;
