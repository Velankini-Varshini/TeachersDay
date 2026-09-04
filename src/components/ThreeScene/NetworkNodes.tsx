import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  const nodeCount = 50;
  
  // Generate random nodes
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map(() => {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      );
      return position;
    });
  }, []);

  // Generate lines between close nodes
  const lines = useMemo(() => {
    const connections: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 4) {
          connections.push([nodes[i], nodes[j]]);
        }
      }
    }
    return connections;
  }, [nodes]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;

      // Mouse interaction (parallax)
      const targetX = (mouse.x * viewport.width) / 50;
      const targetY = (mouse.y * viewport.height) / 50;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.05, 16, 16]}>
          <meshBasicMaterial color="#00ffff" />
        </Sphere>
      ))}

      {/* Lines */}
      {lines.map((pts, i) => (
        <Line 
          key={i} 
          points={[pts[0], pts[1]]} 
          color="#8b5cf6" 
          lineWidth={1} 
          transparent 
          opacity={0.3} 
        />
      ))}
      
      <ambientLight intensity={0.5} />
    </group>
  );
}
