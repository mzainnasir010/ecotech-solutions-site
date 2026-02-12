import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Component, ReactNode } from "react";

// Error Boundary
class OrbErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const FloatingOrb = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  // Orbital particles
  const particlePositions = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 0.8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Mouse influence - subtle tilt
      groupRef.current.rotation.x = pointer.y * 0.15 + Math.sin(t * 0.3) * 0.1;
      groupRef.current.rotation.y = pointer.x * 0.15 + t * 0.08;
      // Scroll-based vertical offset
      groupRef.current.position.y = -scrollProgress * 3 + Math.sin(t * 0.5) * 0.15;
    }

    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.15;
      icoRef.current.rotation.z = t * 0.1;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.2 + 0.5;
      ringRef1.current.rotation.z = t * 0.15;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = t * 0.18 + 1.2;
      ringRef2.current.rotation.x = t * 0.12;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.z = t * 0.22 + 2.4;
      ringRef3.current.rotation.y = t * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
      particlesRef.current.rotation.x = t * 0.03;
    }
  });

  // Sage green color
  const sageColor = new THREE.Color("hsl(104, 30%, 71%)");
  const sageDark = new THREE.Color("hsl(104, 30%, 50%)");
  const sageLight = new THREE.Color("hsl(104, 30%, 82%)");

  return (
    <group ref={groupRef}>
      {/* Core icosahedron - wireframe */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color={sageColor}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner solid icosahedron - very subtle */}
      <mesh>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshBasicMaterial
          color={sageDark}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.8, 0.008, 16, 100]} />
        <meshBasicMaterial color={sageColor} transparent opacity={0.3} />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ringRef2}>
        <torusGeometry args={[2.0, 0.006, 16, 100]} />
        <meshBasicMaterial color={sageLight} transparent opacity={0.2} />
      </mesh>

      {/* Orbital ring 3 */}
      <mesh ref={ringRef3}>
        <torusGeometry args={[1.5, 0.005, 16, 80]} />
        <meshBasicMaterial color={sageColor} transparent opacity={0.15} />
      </mesh>

      {/* Scattered orbital particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={sageLight}
          size={0.04}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

interface HeroOrbProps {
  scrollProgress: number;
}

export const HeroOrb = ({ scrollProgress }: HeroOrbProps) => {
  return (
    <div className="w-full h-full pointer-events-auto">
      <OrbErrorBoundary fallback={<div />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "low-power",
            failIfMajorPerformanceCaveat: true,
          }}
        >
          <FloatingOrb scrollProgress={scrollProgress} />
        </Canvas>
      </OrbErrorBoundary>
    </div>
  );
};
