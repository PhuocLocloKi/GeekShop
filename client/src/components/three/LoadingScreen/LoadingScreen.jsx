import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

const LoadingScreen = () => {
  const { active, progress } = useProgress();
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeAway, setFadeAway] = useState(false);
  const [statusText, setStatusText] = useState('Initializing shaders...');

  const messages = [
    'Initializing shaders...',
    'Loading 3D models...',
    'Compiling textures...',
    'Calibrating camera rig...',
    'Setting up particles...',
    'System ready.',
  ];

  useEffect(() => {
    let interval;
    if (active) {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % (messages.length - 1);
        setStatusText(messages[index]);
      }, 1500);
    } else {
      setStatusText('System ready.');
    }
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active) {
      const timeout = setTimeout(() => {
        setFadeAway(true);
        const removeTimeout = setTimeout(() => {
          setShouldRender(false);
        }, 800); // match transition duration
        return () => clearTimeout(removeTimeout);
      }, 1000); // Show "System ready" for 1s for aesthetic feel
      return () => clearTimeout(timeout);
    }
  }, [active]);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#090a0f',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeAway ? 0 : 1,
        pointerEvents: fadeAway ? 'none' : 'auto',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Scanline overlay specifically for the loading screen */}
      <div className="crt-overlay" />
      <div className="noise-overlay" />

      {/* Main Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-xl)',
          width: '90%',
          maxWidth: '400px',
        }}
      >
        {/* Title */}
        <h1
          className="glitch-text"
          data-text="GEEKSHOP"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 800,
            letterSpacing: '0.25em',
            margin: 0,
          }}
        >
          GEEKSHOP
        </h1>

        {/* Status indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 'var(--space-sm)',
            marginTop: 'var(--space-md)',
          }}
        >
          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--glass-border)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: active ? `${progress}%` : '100%',
                height: '100%',
                background: 'var(--neon-green)',
                boxShadow: 'var(--glow-green)',
                transition: 'width 0.5s ease-out',
              }}
            />
          </div>

          {/* Details */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-code)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
            }}
          >
            <span>{statusText}</span>
            <span style={{ color: 'var(--neon-green)' }}>{active ? Math.round(progress) : 100}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
