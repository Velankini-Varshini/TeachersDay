import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingBooks() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create 10 floating books/pages
  const books = useMemo(() => {
    return Array.from({ length: 15 }).map((_, _i) => {
      const position = [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      ];
      const rotation = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ];
      const scale = 0.5 + Math.random() * 0.8;
      // Dimensions of a book
      const args = [1.2 * scale, 1.8 * scale, 0.15 * scale] as [number, number, number];
      
      return { position, rotation, args };
    });
  }, []);

  useFrame((_state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(_state.clock.elapsedTime * 0.1) * 1.5;
      groupRef.current.rotation.y = _state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {books.map((book, _i) => (
        <Float
          key={_i}
          speed={0.8 + Math.random()}
          rotationIntensity={0.2 + Math.random() * 0.5}
          floatIntensity={0.5 + Math.random()}
        >
          <mesh position={book.position as [number, number, number]} rotation={book.rotation as [number, number, number]}>
            <boxGeometry args={book.args} />
            <meshStandardMaterial 
              color="#d4af37" // Golden/warm tone
              roughness={0.7}
              metalness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffd700" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#ffaa00" />
    </group>
  );
}
