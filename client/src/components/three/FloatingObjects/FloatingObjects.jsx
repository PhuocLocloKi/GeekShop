import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingObjects = ({ count = 10 }) => {
  const groupRef = useRef();

  const objects = Array.from({ length: count }).map((_, idx) => {
    const scale = THREE.MathUtils.randFloat(0.15, 0.45);
    const position = [
      THREE.MathUtils.randFloatSpread(25),
      THREE.MathUtils.randFloatSpread(15),
      THREE.MathUtils.randFloatSpread(10) - 5,
    ];
    const speed = THREE.MathUtils.randFloat(0.1, 0.5);
    const rotSpeed = [
      THREE.MathUtils.randFloat(-0.01, 0.01),
      THREE.MathUtils.randFloat(-0.01, 0.01),
      THREE.MathUtils.randFloat(-0.01, 0.01),
    ];
    const type = idx % 3; // 0: Cube, 1: Torus, 2: Cone
    return { scale, position, speed, rotSpeed, type };
  });

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, idx) => {
      const obj = objects[idx];
      // Float vertically
      child.position.y = obj.position[1] + Math.sin(time * obj.speed) * 0.4;
      // Drift rotation
      child.rotation.x += obj.rotSpeed[0];
      child.rotation.y += obj.rotSpeed[1];
      child.rotation.z += obj.rotSpeed[2];
    });
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj, idx) => {
        const material = (
          <meshStandardMaterial
            color={idx % 2 === 0 ? '#06b6d4' : '#f472b6'}
            wireframe
            transparent
            opacity={0.15}
          />
        );

        if (obj.type === 0) {
          return (
            <mesh key={idx} position={obj.position} scale={obj.scale}>
              <boxGeometry args={[1, 1, 1]} />
              {material}
            </mesh>
          );
        } else if (obj.type === 1) {
          return (
            <mesh key={idx} position={obj.position} scale={obj.scale}>
              <torusGeometry args={[0.6, 0.2, 8, 24]} />
              {material}
            </mesh>
          );
        } else {
          return (
            <mesh key={idx} position={obj.position} scale={obj.scale}>
              <coneGeometry args={[0.5, 1, 4]} />
              {material}
            </mesh>
          );
        }
      })}
    </group>
  );
};

export default FloatingObjects;
