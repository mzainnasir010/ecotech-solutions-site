import { useRef, useMemo, useState, useEffect, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Check if WebGL is available
const isWebGLAvailable = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

// Error Boundary for Canvas
class CanvasErrorBoundary extends Component<
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
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback gradient background
const FallbackBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
);

const WaveParticles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  
  // Create particle grid
  const { positions, colors } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * count * 3);
    const colors = new Float32Array(count * count * 3);
    
    let index = 0;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i - count / 2) * 0.25;
        const z = (j - count / 2) * 0.25;
        const y = 0;
        
        positions[index] = x;
        positions[index + 1] = y;
        positions[index + 2] = z;
        
        // Sage green with variations
        colors[index] = 0.67 + Math.random() * 0.1;     // R
        colors[index + 1] = 0.78 + Math.random() * 0.1; // G
        colors[index + 2] = 0.63 + Math.random() * 0.1; // B
        
        index += 3;
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positionAttr = meshRef.current.geometry.attributes.position;
    const count = 80;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const index = (i * count + j) * 3;
        const x = positionAttr.array[index];
        const z = positionAttr.array[index + 2];
        
        // Create wave effect with mouse influence
        const distance = Math.sqrt(
          Math.pow(x - pointer.x * 5, 2) + 
          Math.pow(z - pointer.y * 5, 2)
        );
        
        const wave = Math.sin(distance * 0.5 - time * 1.5) * 0.3;
        const mouseInfluence = Math.max(0, 2 - distance * 0.3) * 0.5;
        
        (positionAttr.array as Float32Array)[index + 1] = wave + mouseInfluence;
      }
    }
    
    positionAttr.needsUpdate = true;
    
    // Gentle rotation
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <points ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
      />
    </points>
  );
};

interface ParticleWaveProps {
  scrollProgress?: number;
}

export const ParticleWave = ({ scrollProgress = 0 }: ParticleWaveProps) => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const opacity = Math.max(0, 1 - scrollProgress * 1.2);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
  }, []);

  if (!webGLSupported) {
    return <FallbackBackground />;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <CanvasErrorBoundary fallback={<FallbackBackground />}>
        <Canvas
          camera={{ position: [0, 8, 12], fov: 60 }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
          gl={{ 
            antialias: false,
            powerPreference: "low-power",
            failIfMajorPerformanceCaveat: true
          }}
        >
          <ambientLight intensity={0.3} />
          <WaveParticles />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};
