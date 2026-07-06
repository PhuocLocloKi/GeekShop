import React from 'react';
import { Canvas } from '@react-three/fiber';
import HeroModel from './HeroModel';
import ParticleDust from '../ParticleSystem/ParticleDust';
import CameraRig from '../CameraRig/CameraRig';
import Effects from '../PostProcessing/Effects';
import useFPS from '../../../hooks/useFPS';

const Hero3D = ({ scrollProgress = 0 }) => {
  const { quality } = useFPS();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: quality === 'high', powerPreference: 'high-performance' }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* Sky/Atmospheric Void Background */}
        <color attach="background" args={['#090a0f']} />

        {/* Ambient lighting */}
        <ambientLight intensity={0.4} />

        {/* Directional Key Light */}
        <directionalLight
          position={[5, 10, 7]}
          intensity={1.2}
          color="#06b6d4"
        />

        {/* Fill Light */}
        <directionalLight
          position={[-5, -5, -5]}
          intensity={0.5}
          color="#f472b6"
        />

        {/* Exploded board model */}
        <HeroModel scrollProgress={scrollProgress} />

        {/* Floating dust particles */}
        <ParticleDust count={quality === 'low' ? 500 : 2000} scrollProgress={scrollProgress} />

        {/* Custom interactive camera path */}
        <CameraRig scrollProgress={scrollProgress} />

        {/* Postprocessing composer */}
        <Effects quality={quality} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
