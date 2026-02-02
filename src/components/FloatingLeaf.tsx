import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const LeafShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  // Create a leaf-like shape using a custom geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Draw leaf outline
    shape.moveTo(0, -1.5);
    shape.bezierCurveTo(0.8, -0.8, 1.2, 0.2, 0.8, 1);
    shape.bezierCurveTo(0.4, 1.5, 0.1, 1.8, 0, 2);
    shape.bezierCurveTo(-0.1, 1.8, -0.4, 1.5, -0.8, 1);
    shape.bezierCurveTo(-1.2, 0.2, -0.8, -0.8, 0, -1.5);

    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Slow auto-rotation
    meshRef.current.rotation.y += 0.002;

    // Follow cursor with smooth lerping
    targetRotation.current.x = pointer.y * 0.3;
    targetRotation.current.y = pointer.x * 0.3;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );

    // Subtle floating motion
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} geometry={geometry} scale={0.8}>
        <meshStandardMaterial
          color="#ACC8A2"
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Leaf vein */}
      <mesh position={[0, 0.2, 0.08]} scale={0.8}>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshStandardMaterial color="#8BA882" roughness={0.5} />
      </mesh>
    </Float>
  );
};

interface FloatingLeafProps {
  scrollProgress?: number;
}

export const FloatingLeaf = ({ scrollProgress = 0 }: FloatingLeafProps) => {
  const scale = Math.max(0.3, 1 - scrollProgress * 1.2);
  const opacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] pointer-events-none"
      style={{
        opacity,
        transform: `translateY(-50%) scale(${scale})`,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ACC8A2" />
        <LeafShape />
      </Canvas>
    </div>
  );
};
