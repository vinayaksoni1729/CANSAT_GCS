import React, { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// Loading placeholder while STL loads
const LoadingPlaceholder = () => {
  return (
    <mesh>
      <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
      <meshStandardMaterial color="#4a90e2" wireframe />
    </mesh>
  );
};

// STL model component
const STLModel = ({ rotation = { x: 0, y: 0, z: 0 } }) => {
  const meshRef = useRef();
  const geometry = useLoader(STLLoader, '/model.stl');
  
  useEffect(() => {
    if (geometry) {
      // Center the geometry
      geometry.center();
      
      // Compute bounding box and auto-scale
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1 / maxDim * 2.0; // Same scale factor as your GLB version
      
      meshRef.current.scale.set(scale, scale, scale);
    }
  }, [geometry]);

  useFrame(() => {
    if (meshRef.current) {
      // Smooth rotation updates
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        rotation.x,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation.y,
        0.1
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        rotation.z,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial 
        color="#4a90e2"
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
};

const ThreeD = ({ orientation = { x: 0, y: 0, z: 0 }, height = 400 }) => {
  return (
    <div 
      className="w-full bg-slate-800 rounded-lg overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <Canvas
        camera={{ 
          position: [3, 2, 3],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        style={{ background: '#1e293b' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.5}
          castShadow
        />

        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={1}
          maxDistance={10}
          enableDamping={true}
          dampingFactor={0.05}
        />
        
        <gridHelper 
          args={[20, 20, '#4a5568', '#2d3748']}
          position={[0, -2, 0]}
        />
        
        <Suspense fallback={<LoadingPlaceholder />}>
          <STLModel rotation={orientation} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeD;