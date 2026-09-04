import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export function WireframeStructure() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
      // Gentle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Outer Shell */}
      <Icosahedron args={[4, 1]}>
        <meshBasicMaterial color="#4fd1c5" wireframe transparent opacity={0.15} />
      </Icosahedron>
      
      {/* Inner Structure */}
      <Box args={[3, 3, 3]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#e0fbfc" wireframe transparent opacity={0.3} />
      </Box>

      {/* Core Pillar */}
      <Cylinder args={[0.5, 0.5, 8, 16]}>
        <meshBasicMaterial color="#4fd1c5" wireframe transparent opacity={0.2} />
      </Cylinder>
    </group>
  );
}
