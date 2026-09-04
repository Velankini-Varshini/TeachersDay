import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function CompilerNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  const nodeCount = 45;
  
  // Generate random compiler/code nodes
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map(() => {
      return new THREE.Vector3(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12 - 4
      );
    });
  }, []);

  // Connections between close nodes (AST / Token stream pipeline)
  const lines = useMemo(() => {
    const connections: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 4.5) {
          connections.push([nodes[i], nodes[j]]);
        }
      }
    }
    return connections;
  }, [nodes]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Slow tech-like rotation
      groupRef.current.rotation.y += delta * 0.035;
      groupRef.current.rotation.x += delta * 0.015;

      // Parallax interaction
      const targetX = (mouse.x * viewport.width) / 45;
      const targetY = (mouse.y * viewport.height) / 45;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.04;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing Warm Amber & Orange Code Nodes */}
      {nodes.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.06, 16, 16]}>
          <meshBasicMaterial color={i % 2 === 0 ? "#f59e0b" : "#fbbf24"} />
        </Sphere>
      ))}

      {/* Syntax Pipeline Connections */}
      {lines.map((pts, i) => (
        <Line 
          key={i} 
          points={[pts[0], pts[1]]} 
          color={i % 3 === 0 ? "#f59e0b" : "#d97706"} 
          lineWidth={1} 
          transparent 
          opacity={0.3} 
        />
      ))}
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#f59e0b" />
    </group>
  );
}
