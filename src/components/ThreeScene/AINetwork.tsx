import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function AINetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  const nodeCount = 45;
  
  // Generate random AI nodes
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map(() => {
      return new THREE.Vector3(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12 - 4
      );
    });
  }, []);

  // Connections between close nodes (neural synapses)
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
      // Gentle floating rotation
      groupRef.current.rotation.y += delta * 0.04;
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
      {/* Glowing Neural Nodes */}
      {nodes.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.06, 16, 16]}>
          <meshBasicMaterial color={i % 2 === 0 ? "#00f0ff" : "#38bdf8"} />
        </Sphere>
      ))}

      {/* Synaptic Connections */}
      {lines.map((pts, i) => (
        <Line 
          key={i} 
          points={[pts[0], pts[1]]} 
          color={i % 3 === 0 ? "#38bdf8" : "#1e40af"} 
          lineWidth={1} 
          transparent 
          opacity={0.35} 
        />
      ))}
      
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
    </group>
  );
}
