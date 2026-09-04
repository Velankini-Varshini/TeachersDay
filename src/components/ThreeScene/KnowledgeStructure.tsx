import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function KnowledgeStructure({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y += delta * 0.1;
      
      // Parallax interaction
      const targetX = (mouse.x * viewport.width) / 30;
      const targetY = (mouse.y * viewport.height) / 30;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;

      // Unfold structure based on scroll progress (0 to 1)
      const scale = 0.5 + (scrollProgress * 1.5);
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -5]}>
      
      {/* Base: Experience (Always visible, solid) */}
      <Cylinder args={[2, 2.5, 0.5, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} transparent opacity={0.6 + scrollProgress * 0.4} />
      </Cylinder>

      {/* Layer 2: Knowledge */}
      <group position={[0, 1.5, 0]} scale={scrollProgress > 0.2 ? 1 : 0.001}>
        <Box args={[2.5, 0.2, 2.5]} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#8b5cf6" wireframe={scrollProgress < 0.4} transparent opacity={Math.min(1, (scrollProgress - 0.2) * 3)} />
        </Box>
      </group>

      {/* Layer 3: Guidance */}
      <group position={[0, 3, 0]} scale={scrollProgress > 0.4 ? 1 : 0.001}>
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial color="#06b6d4" transparent opacity={Math.min(1, (scrollProgress - 0.4) * 3)} wireframe={scrollProgress < 0.6} />
        </Sphere>
      </group>

      {/* Layer 4: Growth (Floating elements around guidance) */}
      <group position={[0, 4.5, 0]} scale={scrollProgress > 0.6 ? 1 : 0.001}>
        <Cylinder args={[1.5, 0.5, 0.2, 6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#a855f7" transparent opacity={Math.min(1, (scrollProgress - 0.6) * 3)} />
        </Cylinder>
      </group>

      {/* Layer 5: Future (Top crown) */}
      <group position={[0, 6, 0]} scale={scrollProgress > 0.8 ? 1 : 0.001}>
        <Box args={[0.5, 2, 0.5]}>
          <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={0.5} transparent opacity={Math.min(1, (scrollProgress - 0.8) * 5)} />
        </Box>
      </group>

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#c084fc" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#2dd4bf" />
    </group>
  );
}
