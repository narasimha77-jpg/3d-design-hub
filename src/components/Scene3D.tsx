import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/* Generates a primitive shape based on model ID (since we use demo data) */
function DemoShape({
  shapeType,
  materialMode,
}: {
  shapeType: string;
  materialMode: "solid" | "wireframe";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry =
    shapeType === "demo-2" ? (
      <sphereGeometry args={[1.2, 64, 64]} />
    ) : shapeType === "demo-3" ? (
      <torusGeometry args={[1, 0.4, 32, 64]} />
    ) : (
      <boxGeometry args={[1.5, 1.5, 1.5]} />
    );

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]}>
      {geometry}
      <meshStandardMaterial
        color="#22d3ee"
        wireframe={materialMode === "wireframe"}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#444" wireframe />
    </mesh>
  );
}

interface Scene3DProps {
  modelId?: string;
  materialMode?: "solid" | "wireframe";
  lighting?: "day" | "night";
  autoRotate?: boolean;
  minimal?: boolean;
}

export default function Scene3D({
  modelId = "demo-1",
  materialMode = "solid",
  lighting = "night",
  autoRotate = false,
  minimal = false,
}: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [3, 2.5, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      {/* Lighting */}
      <ambientLight intensity={lighting === "day" ? 0.8 : 0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={lighting === "day" ? 1.2 : 0.6}
        castShadow
      />
      {lighting === "night" && (
        <pointLight position={[-3, 2, -3]} intensity={0.5} color="#a78bfa" />
      )}

      <Suspense fallback={<LoadingFallback />}>
        <DemoShape shapeType={modelId} materialMode={materialMode} />
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
        />
        <Environment preset={lighting === "day" ? "city" : "night"} />
      </Suspense>

      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={2}
        enablePan={!minimal}
        enableZoom={!minimal}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
