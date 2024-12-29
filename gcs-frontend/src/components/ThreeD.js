import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// CanSat 3D model component
const CanSat = ({ rotation = { x: 0, y: 0, z: 0 } }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation.x;
      meshRef.current.rotation.y = rotation.y;
      meshRef.current.rotation.z = rotation.z;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main cylinder body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 3, 32]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      
      {/* Top dome */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Bottom dome */}
      <mesh position={[0, -1.5, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Ring details */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.1, 0.1, 16, 32]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
    </group>
  );
};

const ThreeD = ({ orientation = { x: 0, y: 0, z: 0 }, height = 400 }) => {
  return (
    <div 
      className="w-full bg-slate-800 rounded-lg overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: '#1e293b' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <gridHelper args={[20, 20, '#4a5568', '#2d3748']} />
        <CanSat rotation={orientation} />
      </Canvas>
    </div>
  );
};

export default ThreeD;