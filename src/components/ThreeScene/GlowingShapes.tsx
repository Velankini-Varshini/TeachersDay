import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

export function GlowingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();
  
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      type: i % 3,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 2
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ],
      color: ['#ec4899', '#8b5cf6', '#3b82f6'][i % 3], // pink, violet, blue
      scale: 0.5 + Math.random() * 0.8
    }));
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += delta * 0.1;

      // Mouse interaction
      const targetX = (mouse.x * viewport.width) / 20;
      const targetY = (mouse.y * viewport.height) / 20;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.1;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={3}>
          <mesh position={shape.position as any} rotation={shape.rotation as any} scale={shape.scale}>
            {shape.type === 0 && <Sphere args={[0.5, 32, 32]} />}
            {shape.type === 1 && <Torus args={[0.4, 0.15, 16, 32]} />}
            {shape.type === 2 && <Octahedron args={[0.5]} />}
            <meshPhysicalMaterial 
              color={shape.color} 
              emissive={shape.color}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
    </group>
  );
}
