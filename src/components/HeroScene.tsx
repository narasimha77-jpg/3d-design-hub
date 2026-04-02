import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

function HeroObject() {
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#7c3aed"
          emissiveIntensity={0.15}
          metalness={0.8}
          roughness={0.15}
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-3, 1, -2]} intensity={0.5} color="#a78bfa" />
      <Suspense fallback={null}>
        <HeroObject />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  );
}
