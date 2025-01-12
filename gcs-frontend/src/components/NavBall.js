import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const NavBallSphere = ({ roll, pitch, yaw }) => {
  const sphereRef = useRef();

  useFrame(() => {
    // Apply roll, pitch, and yaw rotations
    sphereRef.current.rotation.x = THREE.MathUtils.degToRad(pitch);
    sphereRef.current.rotation.y = THREE.MathUtils.degToRad(yaw);
    sphereRef.current.rotation.z = THREE.MathUtils.degToRad(roll);
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load('/textures/navball_texture.jpg')} // Sky/Ground texture
      />
    </mesh>
  );
};

const Crosshair = () => (
  <Html center>
    <div style={{ position: 'absolute', color: 'yellow', fontSize: '24px' }}>+</div>
  </Html>
);

const NavBall = ({ roll, pitch, yaw }) => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <NavBallSphere roll={roll} pitch={pitch} yaw={yaw} />
        <Crosshair />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default NavBall;
