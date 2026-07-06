import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleDust = ({ count = 2000, scrollProgress = 0 }) => {
  const pointsRef = useRef();
  const { mouse } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(50);
      const y = THREE.MathUtils.randFloatSpread(50);
      const z = THREE.MathUtils.randFloatSpread(50);
      const speedX = THREE.MathUtils.randFloat(-0.02, 0.02);
      const speedY = THREE.MathUtils.randFloat(0.01, 0.05); // float upwards
      const speedZ = THREE.MathUtils.randFloat(-0.02, 0.02);
      temp.push({ x, y, z, speedX, speedY, speedZ });
    }
    return temp;
  }, [count]);

  const [positions, initialZ] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initZ = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = particles[i].x;
      pos[i * 3 + 1] = particles[i].y;
      pos[i * 3 + 2] = particles[i].z;
      initZ[i] = particles[i].z;
    }
    return [pos, initZ];
  }, [particles, count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posArray = geo.attributes.position.array;

    // Detect fast scroll/warp speed if scrollProgress is high/changing fast
    const isWarpSpeed = scrollProgress > 0.8;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Base movement
      posArray[i3] += particles[i].speedX;
      posArray[i3 + 1] += particles[i].speedY;

      // Wrap-around y axis
      if (posArray[i3 + 1] > 25) posArray[i3 + 1] = -25;

      // Warp speed stretch along Z
      if (isWarpSpeed) {
        // Fly forward towards screen fast
        posArray[i3 + 2] += 0.4;
        if (posArray[i3 + 2] > 25) {
          posArray[i3 + 2] = -25;
        }
      } else {
        // Normal drift + slight scroll influence
        posArray[i3 + 2] += particles[i].speedZ + scrollProgress * 0.05;
        if (posArray[i3 + 2] > 25) posArray[i3 + 2] = -25;
        if (posArray[i3 + 2] < -25) posArray[i3 + 2] = 25;
      }

      // Mouse interactive repelling force
      const dx = posArray[i3] - mouse.x * 20;
      const dy = posArray[i3 + 1] - mouse.y * 20;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        const force = (4 - dist) * 0.02;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#06b6d4"
        size={0.06}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleDust;
