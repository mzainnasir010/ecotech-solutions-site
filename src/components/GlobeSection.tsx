import { useRef, useMemo, useState, useEffect, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

// Check if WebGL is available
const isWebGLAvailable = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
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

// Fallback static globe illustration
const FallbackGlobe = ({ isMobile }: { isMobile: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className={`relative ${isMobile ? 'w-48 h-48' : 'w-80 h-80'} rounded-full border border-primary/20 opacity-30`}>
      <div className="absolute inset-4 rounded-full border border-primary/15" />
      <div className="absolute inset-8 rounded-full border border-primary/10" />
      <div className="absolute inset-12 rounded-full border border-primary/5" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/10" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/10" />
    </div>
  </div>
);

interface GlobeProps {
  mousePosition: { x: number; y: number };
  isDragging: boolean;
  dragDelta: { x: number; y: number };
  scale: number;
}

const Globe = ({ mousePosition, isDragging, dragDelta, scale }: GlobeProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  // Create sphere points
  const particlesPosition = useMemo(() => {
    const positions = [];
    const count = 3000;
    const radius = 2;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
    }

    return new Float32Array(positions);
  }, []);

  // Create connecting lines (latitude/longitude style)
  const linesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const radius = 2;

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const phi = (90 - lat) * (Math.PI / 180);
      for (let lng = 0; lng <= 360; lng += 5) {
        const theta = lng * (Math.PI / 180);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));
      }
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const theta = lng * (Math.PI / 180);
      for (let lat = -90; lat <= 90; lat += 5) {
        const phi = (90 - lat) * (Math.PI / 180);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Update rotation based on drag
      if (isDragging) {
        rotationRef.current.x += dragDelta.y * 0.01;
        rotationRef.current.y += dragDelta.x * 0.01;
      } else {
        // Slow auto rotation when not dragging
        rotationRef.current.y += 0.002;
      }

      // Apply rotation with smooth lerp
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotationRef.current.y,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotationRef.current.x + mousePosition.y * 0.1,
        0.1
      );

      // Subtle floating animation
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = floatY;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Globe wireframe */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
          color="#ACC8A2" 
          wireframe 
          transparent 
          opacity={0.1} 
        />
      </mesh>

      {/* Particles on surface */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#ACC8A2"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Grid lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#ACC8A2" transparent opacity={0.05} />
      </lineSegments>

      {/* Glow sphere */}
      <mesh scale={2.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#ACC8A2" 
          transparent 
          opacity={0.02} 
        />
      </mesh>
    </group>
  );
};

export const GlobeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
    
    if (isDragging) {
      setDragDelta({
        x: e.clientX - lastMousePos.current.x,
        y: e.clientY - lastMousePos.current.y,
      });
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setDragDelta({ x: 0, y: 0 });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragDelta({ x: 0, y: 0 });
  };

  const locations = [
    { city: "New York", role: "Americas HQ" },
    { city: "London", role: "EMEA HQ" },
    { city: "Singapore", role: "APAC HQ" },
    { city: "Sydney", role: "Oceania Hub" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 md:py-20 bg-secondary overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: webGLSupported && isDragging ? 'grabbing' : webGLSupported ? 'grab' : 'default' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary" />
      
      {/* 3D Globe or Fallback */}
      <div className={`absolute z-0 ${isMobile ? 'inset-x-0 -bottom-[10px] h-[45vh]' : 'inset-0'}`}>
        {webGLSupported ? (
          <CanvasErrorBoundary fallback={<FallbackGlobe isMobile={isMobile} />}>
            <Canvas
              camera={{ position: [0, 0, isMobile ? 7 : 6], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ 
                antialias: false,
                powerPreference: "low-power",
                failIfMajorPerformanceCaveat: true
              }}
            >
              <ambientLight intensity={0.5} />
              <Globe 
                mousePosition={mousePosition}
                isDragging={isDragging}
                dragDelta={dragDelta}
                scale={isMobile ? 0.65 : 1}
              />
            </Canvas>
          </CanvasErrorBoundary>
        ) : (
          <FallbackGlobe isMobile={isMobile} />
        )}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
                Global Reach
              </span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-off-white leading-[1.1] mb-8">
              Impact That{" "}
              <span className="text-primary">Spans</span>{" "}
              The Globe
            </h2>
            
            <p className="text-off-white/60 text-lg leading-relaxed mb-12 max-w-lg">
              From renewable energy installations in remote villages to carbon-neutral 
              data centers in major cities, our solutions are making a difference 
              across every continent.
            </p>

            {/* Location cards */}
            <div className="grid grid-cols-2 gap-4">
              {locations.map((location, index) => (
                <motion.div
                  key={location.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group p-4 rounded-xl border border-off-white/10 hover:border-primary/30 hover:bg-off-white/5 transition-all duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mb-3 group-hover:scale-125 transition-transform" />
                  <h4 className="font-serif text-xl text-off-white mb-1">{location.city}</h4>
                  <p className="text-off-white/50 text-sm">{location.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - empty for globe to show */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-12 right-12 text-off-white/20 text-xs tracking-widest hidden lg:block">
        <div className="rotate-90 origin-bottom-right">WORLDWIDE OPERATIONS</div>
      </div>
    </section>
  );
};
