import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export function PaperParticles() {
  const groupRef = useRef<THREE.Group>(null);
  
  const papers = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: 0.2 + Math.random() * 0.4
    }));
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y += delta * 0.2;
      if (groupRef.current.position.y > 10) {
        groupRef.current.position.y = -10;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {papers.map((paper, i) => (
        <Float key={i} speed={1 + Math.random() * 2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={paper.position as any} rotation={paper.rotation as any} scale={paper.scale}>
            <planeGeometry args={[1, 1.4]} />
            <meshBasicMaterial color="#f0e6d2" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
