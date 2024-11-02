"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Color } from "three";
import { 
  Float, 
  Environment,
  Center,
  MeshTransmissionMaterial,
  Sparkles
} from "@react-three/drei";

export function Scene() {
  const cube = useRef<Mesh>(null);
  const innerCube = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (cube.current) {
      cube.current.rotation.x = Math.sin(time * 0.2) * 0.2;
      cube.current.rotation.y = Math.cos(time * 0.3) * 0.2;
    }

    if (innerCube.current) {
      innerCube.current.rotation.x = -Math.sin(time * 0.2) * 0.3;
      innerCube.current.rotation.y = -Math.cos(time * 0.3) * 0.3;
      innerCube.current.scale.setScalar(0.8 + Math.sin(time * 0.5) * 0.05);
    }
  });

  return (
    <>
      <Environment preset="city" />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <Center>
          {/* Cube extérieur en verre */}
          <mesh ref={cube} scale={2}>
            <boxGeometry args={[1, 1, 1]} />
            <MeshTransmissionMaterial
              samples={16}
              resolution={256}
              thickness={0.5}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0}
              transmission={1}
              ior={1.5}
              chromaticAberration={0.06}
              backside={true}
              color="#c4b5fd"
            />
          </mesh>

          {/* Cube intérieur avec effet mat */}
          <mesh ref={innerCube} scale={1.5}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial
              color="#8b5cf6"
              roughness={0.4}
              metalness={0.1}
              emissive="#8b5cf6"
              emissiveIntensity={0.2}
              clearcoat={0.5}
              clearcoatRoughness={0.4}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Center>
      </Float>

      {/* Particules subtiles */}
      <Sparkles
        count={50}
        scale={8}
        size={1}
        speed={0.2}
        opacity={0.2}
        color="#a855f7"
      />
    </>
  );
}