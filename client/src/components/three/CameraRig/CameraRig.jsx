import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CameraRig = ({ scrollProgress = 0 }) => {
  useFrame((state) => {
    const { camera, mouse } = state;

    // Predefined camera path based on scroll progress
    // Scroll progress 0 -> Front view (Z=12, Y=0, X=0)
    // Scroll progress 1 -> Close-up angled view (Z=6, Y=2, X=4)
    const targetX = THREE.MathUtils.lerp(0, 4, scrollProgress);
    const targetY = THREE.MathUtils.lerp(0, 2, scrollProgress);
    const targetZ = THREE.MathUtils.lerp(12, 6, scrollProgress);

    // Mouse parallax effect (adds subtle responsiveness to cursor)
    const parallaxX = mouse.x * 1.5;
    const parallaxY = mouse.y * 1.5;

    // Smoothly interpolate current camera position to target position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + parallaxX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + parallaxY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    // Always look at the center object (0,0,0) or slightly offset on scroll
    const lookAtTarget = new THREE.Vector3(
      THREE.MathUtils.lerp(0, 0.5, scrollProgress),
      THREE.MathUtils.lerp(0, -0.2, scrollProgress),
      0
    );
    camera.lookAt(lookAtTarget);
  });

  return null;
};

export default CameraRig;
