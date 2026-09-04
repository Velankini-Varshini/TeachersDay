import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import * as THREE from 'three';

export function BalanceNetwork({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  // Create nodes that can morph between a strict grid and an organic cloud
  const nodeCount = 50;
  
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map((_, i) => {
      // Grid position (Strict State)
      const row = Math.floor(i / 10);
      const col = i % 10;
      const gridX = (col - 4.5) * 1.5;
      const gridY = (row - 2) * 1.5;
      const gridZ = 0;

      // Cloud position (Organic State)
      const cloudX = (Math.random() - 0.5) * 15;
      const cloudY = (Math.random() - 0.5) * 15;
      const cloudZ = (Math.random() - 0.5) * 10 - 2;

      return {
        gridPos: new THREE.Vector3(gridX, gridY, gridZ),
        cloudPos: new THREE.Vector3(cloudX, cloudY, cloudZ),
        currentPos: new THREE.Vector3()
      };
    });
  }, []);

  // Connections generation removed as they are unused directly.

  useFrame((_state, _delta) => {
    if (groupRef.current) {
      // Rotate slowly based on progress
      groupRef.current.rotation.y = scrollProgress * Math.PI;

      // Parallax mouse effect (stronger in organic state)
      const targetX = (mouse.x * viewport.width) / (10 + (1-scrollProgress)*20);
      const targetY = (mouse.y * viewport.height) / (10 + (1-scrollProgress)*20);
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;

      // Update positions
      nodes.forEach((node, i) => {
        // Linear interpolate between Grid and Cloud based on scrollProgress
        // We use Math.min(1, Math.max(0, scrollProgress * 1.5 - 0.2)) to delay the morph slightly
        const morphFactor = Math.min(1, Math.max(0, scrollProgress * 1.5 - 0.2));
        
        node.currentPos.lerpVectors(node.gridPos, node.cloudPos, morphFactor);
        
        // Add subtle noise if organic
        if (morphFactor > 0) {
          node.currentPos.x += Math.sin(_state.clock.elapsedTime + i) * 0.01 * morphFactor;
          node.currentPos.y += Math.cos(_state.clock.elapsedTime + i) * 0.01 * morphFactor;
        }

        const sphereMesh = groupRef.current?.children[i] as THREE.Mesh;
        if (sphereMesh) {
          sphereMesh.position.copy(node.currentPos);
          
          const mat = sphereMesh.material as THREE.MeshStandardMaterial;
          // Color transition: Strict (Cyan/White) -> Organic (Pink/Orange/Warm)
          const color1 = new THREE.Color("#e2e8f0"); // Slate-200
          const color2 = new THREE.Color("#f472b6"); // Pink-400
          mat.color.lerpColors(color1, color2, morphFactor);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {/* Render Spheres */}
      {nodes.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Render Connections */}
      {/* Connections are harder to animate directly via JSX instances efficiently, 
          so we let the network drift organically. */}
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#fbcfe8" />
    </group>
  );
}
