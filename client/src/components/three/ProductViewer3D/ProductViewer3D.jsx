import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import Spinner from '../../common/Spinner';

// Procedural 3D model generators depending on category/id
const RenderProceduralModel = ({ productId, category }) => {
  // OS & Recovery -> USB Stick model
  if (category === 'OS & Recovery') {
    return (
      <group scale={1.5}>
        {/* Metal casing */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.8]} />
          <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Connective USB gold tip */}
        <mesh position={[1.1, 0, 0]}>
          <boxGeometry args={[0.7, 0.22, 0.65]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* LED slot */}
        <mesh position={[-0.5, 0.16, 0]}>
          <boxGeometry args={[0.2, 0.05, 0.2]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} />
        </mesh>
      </group>
    );
  }

  // Networking -> PCIe Card model
  if (category === 'Networking') {
    return (
      <group rotation={[0, -Math.PI / 4, 0]}>
        {/* Green/blue PCB board */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.08, 1.4]} />
          <meshStandardMaterial color="#065f46" roughness={0.8} />
        </mesh>
        {/* Metal bracket */}
        <mesh position={[-1.25, 0.5, 0]}>
          <boxGeometry args={[0.08, 1.6, 0.4]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Golden connection teeth */}
        <mesh position={[0, -0.1, -0.7]}>
          <boxGeometry args={[1.8, 0.12, 0.05]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Heatsink grid */}
        <mesh position={[0.3, 0.2, 0]}>
          <boxGeometry args={[0.8, 0.3, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  // Development Boards / Displays / GPS -> Micro-controller or module
  return (
    <group rotation={[0.2, 0.4, 0]}>
      {/* Dark blue board */}
      <mesh>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#1e2235" roughness={0.6} />
      </mesh>
      {/* Golden pins */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[1.9, 0.2, 1.9]} />
        <meshBasicMaterial color="#fbbf24" wireframe />
      </mesh>
      {/* Main chip */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Emissive pin indicator */}
      <mesh position={[0.8, 0.1, 0.8]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

const ProductViewer3D = ({ productId, category }) => {
  return (
    <div
      className="interactive-3d"
      style={{
        width: '100%',
        height: '350px',
        background: 'rgba(9, 10, 15, 0.6)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Suspense
        fallback={
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size={32} />
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f472b6" />

          <Center>
            <RenderProceduralModel productId={productId} category={category} />
          </Center>

          {/* User controls to inspect item */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={8}
            enablePan={false}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ProductViewer3D;
