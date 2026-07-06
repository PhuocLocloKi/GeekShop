import React, { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const FoxModel = ({ scrollProgress = 0 }) => {
  const groupRef = useRef();
  const { scene, animations } = useGLTF('/models/Fox.glb');
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Play the first available animation (Survey/Walk/Run)
    if (names.length > 0) {
      // Try to play "Survey" (idle) animation first, fallback to first
      const idleAction = actions['Survey'] || actions[names[0]];
      if (idleAction) {
        idleAction.reset().fadeIn(0.5).play();
        idleAction.setLoop(THREE.LoopRepeat);
        idleAction.timeScale = 0.8;
      }
    }
    return () => {
      names.forEach((name) => {
        if (actions[name]) actions[name].fadeOut(0.5);
      });
    };
  }, [actions, names]);

  // Switch animations based on scroll
  useEffect(() => {
    if (names.length < 2) return;
    
    if (scrollProgress > 0.5) {
      // Run animation when scrolled far
      const runAction = actions['Run'] || actions[names[names.length - 1]];
      const currentAction = actions['Survey'] || actions[names[0]];
      if (runAction && currentAction) {
        currentAction.fadeOut(0.3);
        runAction.reset().fadeIn(0.3).play();
        runAction.timeScale = 1.2;
      }
    } else if (scrollProgress > 0.2) {
      // Walk animation when scrolled a bit
      const walkAction = actions['Walk'] || actions[names[Math.min(1, names.length - 1)]];
      const currentAction = actions['Survey'] || actions[names[0]];
      if (walkAction && currentAction) {
        currentAction.fadeOut(0.3);
        walkAction.reset().fadeIn(0.3).play();
        walkAction.timeScale = 1.0;
      }
    } else {
      // Idle animation
      const idleAction = actions['Survey'] || actions[names[0]];
      if (idleAction) {
        names.forEach((name) => {
          if (name !== 'Survey' && name !== names[0] && actions[name]) {
            actions[name].fadeOut(0.3);
          }
        });
        idleAction.reset().fadeIn(0.3).play();
        idleAction.timeScale = 0.8;
      }
    }
  }, [scrollProgress > 0.5, scrollProgress > 0.2]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = -1.5 + Math.sin(elapsed * 0.6) * 0.15;
      // Subtle rotation following mouse
      const targetRotY = state.mouse.x * 0.3 + Math.PI * 0.1;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[3, -1.5, 0]} scale={0.035} rotation={[0, -0.3, 0]}>
      <primitive object={scene} />
    </group>
  );
};

// Energy rings around the fox
const EnergyRings = ({ scrollProgress = 0 }) => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const rotateSpeed = 0.5 + scrollProgress * 2.0;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = elapsed * 0.6 * rotateSpeed;
      ring1Ref.current.rotation.y = elapsed * 0.3 * rotateSpeed;
      ring1Ref.current.scale.setScalar(1.0 + scrollProgress * 1.2);
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -elapsed * 0.5 * rotateSpeed;
      ring2Ref.current.rotation.z = elapsed * 0.25 * rotateSpeed;
      ring2Ref.current.scale.setScalar(1.0 + scrollProgress * 1.6);
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -elapsed * 0.25 * rotateSpeed;
      ring3Ref.current.rotation.z = -elapsed * 0.7 * rotateSpeed;
      ring3Ref.current.scale.setScalar(1.0 + scrollProgress * 2.0);
    }
  });

  return (
    <group position={[3, 0, 0]}>
      {/* Inner Ring (Warm Gold) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#ffb347"
          wireframe={true}
          transparent={true}
          opacity={0.5}
        />
      </mesh>

      {/* Middle Ring (Orange Ember) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.015, 8, 80]} />
        <meshBasicMaterial
          color="#ff6b35"
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* Outer Ring (Soft Cyan) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.8, 0.01, 6, 60]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe={true}
          transparent={true}
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

// Floating energy particles
const FloatingEmbers = () => {
  const particlesRef = useRef();
  const count = 50;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.3) * 10 + 3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = elapsed * 0.05;
      const posArray = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] += Math.sin(elapsed * 0.8 + i) * 0.003;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <float32BufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffb347"
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};

const HeroModel = ({ scrollProgress = 0 }) => {
  return (
    <group>
      <Suspense fallback={null}>
        <FoxModel scrollProgress={scrollProgress} />
      </Suspense>
      <EnergyRings scrollProgress={scrollProgress} />
      <FloatingEmbers />
      
      {/* Point light on fox */}
      <pointLight
        position={[3, 2, 3]}
        intensity={2}
        color="#ff8c42"
        distance={12}
      />
      <pointLight
        position={[4, -1, -2]}
        intensity={1}
        color="#06b6d4"
        distance={10}
      />
    </group>
  );
};

// Preload model
useGLTF.preload('/models/Fox.glb');

export default HeroModel;
