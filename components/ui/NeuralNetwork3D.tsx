'use client';

import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { Line2, LineMaterial } from 'three-stdlib';

// Types
interface NodeData {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  explodedPosition: THREE.Vector3;
  size: number;
  type: 'core' | 'primary' | 'secondary' | 'outer';
  connections: number[];
}

interface PulseData {
  startNode: number;
  endNode: number;
  progress: number;
  speed: number;
  active: boolean;
}

// Generate brain-like node structure
function generateBrainNodes(count: number, scale: number = 2): NodeData[] {
  const nodes: NodeData[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  
  // Core nodes (central processing)
  for (let i = 0; i < 5; i++) {
    const theta = (2 * Math.PI * i) / 5;
    const pos = new THREE.Vector3(
      Math.cos(theta) * 0.3 * scale,
      (Math.random() - 0.5) * 0.4 * scale,
      Math.sin(theta) * 0.3 * scale
    );
    nodes.push({
      position: pos.clone(),
      originalPosition: pos.clone(),
      explodedPosition: pos.clone().multiplyScalar(3),
      size: 0.12,
      type: 'core',
      connections: []
    });
  }
  
  // Primary neural highways
  for (let i = 0; i < 15; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / 15);
    const theta = 2 * Math.PI * i / goldenRatio;
    const r = 0.7 * scale;
    const pos = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
    nodes.push({
      position: pos.clone(),
      originalPosition: pos.clone(),
      explodedPosition: pos.clone().multiplyScalar(2.5),
      size: 0.08,
      type: 'primary',
      connections: []
    });
  }
  
  // Secondary connection networks
  for (let i = 0; i < 30; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / 30);
    const theta = 2 * Math.PI * i / goldenRatio;
    const r = (1.0 + Math.random() * 0.3) * scale;
    const pos = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
    nodes.push({
      position: pos.clone(),
      originalPosition: pos.clone(),
      explodedPosition: pos.clone().multiplyScalar(2.2),
      size: 0.05,
      type: 'secondary',
      connections: []
    });
  }
  
  // Outer protective mesh nodes
  for (let i = 0; i < count - 50; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / (count - 50));
    const theta = 2 * Math.PI * i / goldenRatio;
    const r = (1.4 + Math.random() * 0.2) * scale;
    const pos = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
    nodes.push({
      position: pos.clone(),
      originalPosition: pos.clone(),
      explodedPosition: pos.clone().multiplyScalar(2.0),
      size: 0.03,
      type: 'outer',
      connections: []
    });
  }
  
  // Generate connections based on proximity
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].originalPosition.distanceTo(nodes[j].originalPosition);
      const threshold = nodes[i].type === 'core' || nodes[j].type === 'core' ? 1.5 : 0.8;
      if (dist < threshold && nodes[i].connections.length < 6) {
        nodes[i].connections.push(j);
      }
    }
  }
  
  return nodes;
}

// Single glowing node
function GlowNode({ 
  node, 
  exploded, 
  index 
}: { 
  node: NodeData; 
  exploded: number; 
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  const colors = {
    core: '#ff4444',      // Bright red for core
    primary: '#dc2626',   // Red-600
    secondary: '#991b1b', // Red-800
    outer: '#7f1d1d'      // Red-900
  };
  
  const emissiveIntensity = {
    core: 2,
    primary: 1.5,
    secondary: 1,
    outer: 0.5
  };
  
  useFrame((state) => {
    if (meshRef.current) {
      // Interpolate position based on exploded state
      const targetPos = new THREE.Vector3().lerpVectors(
        node.originalPosition,
        node.explodedPosition,
        exploded
      );
      meshRef.current.position.lerp(targetPos, 0.05);
      
      // Subtle pulsing
      const pulse = Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
      
      if (glowRef.current) {
        glowRef.current.position.copy(meshRef.current.position);
        glowRef.current.scale.setScalar(pulse * 1.5);
      }
    }
  });
  
  return (
    <>
      <mesh ref={meshRef} position={node.position}>
        <sphereGeometry args={[node.size, 16, 16]} />
        <meshStandardMaterial
          color={colors[node.type]}
          emissive={colors[node.type]}
          emissiveIntensity={emissiveIntensity[node.type]}
          toneMapped={false}
        />
      </mesh>
      {/* Glow effect */}
      <mesh ref={glowRef} position={node.position}>
        <sphereGeometry args={[node.size * 2, 8, 8]} />
        <meshBasicMaterial
          color={colors[node.type]}
          transparent
          opacity={0.15}
        />
      </mesh>
    </>
  );
}

// Connection line between nodes
function Connection({
  start,
  end,
  exploded,
  type
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  exploded: number;
  type: 'core' | 'primary' | 'secondary' | 'outer';
}) {
  const lineRef = useRef<Line2>(null);
  
  const colors = {
    core: '#ff4444',
    primary: '#dc2626',
    secondary: '#991b1b',
    outer: '#7f1d1d'
  };
  
  const lineWidth = {
    core: 2,
    primary: 1.5,
    secondary: 1,
    outer: 0.5
  };
  
  useFrame(() => {
    // Lines will fade/stretch during explosion
    const opacity = Math.max(0, 1 - exploded * 1.5);
    const material = lineRef.current?.material as LineMaterial | undefined;
    if (material) material.opacity = opacity;
  });
  
  return (
    <Line
      ref={lineRef}
      points={[start, end]}
      color={colors[type]}
      transparent
      opacity={0.4}
      lineWidth={lineWidth[type]}
    />
  );
}

// Animated pulse traveling along connection
function Pulse({
  startPos,
  endPos,
  exploded
}: {
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  exploded: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useRef(Math.random());
  const speed = useRef(0.3 + Math.random() * 0.4);
  
  useFrame((state, delta) => {
    if (meshRef.current && exploded < 0.3) {
      progress.current += delta * speed.current;
      if (progress.current > 1) progress.current = 0;
      
      const pos = new THREE.Vector3().lerpVectors(startPos, endPos, progress.current);
      meshRef.current.position.copy(pos);
      
      // Pulse size based on position
      const sizePulse = Math.sin(progress.current * Math.PI) * 0.5 + 0.5;
      meshRef.current.scale.setScalar(sizePulse);
      
      // Fade out during explosion
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = (1 - exploded * 3) * sizePulse;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial
        color="#ff6666"
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Main Neural Network Scene
function NeuralNetworkScene({ 
  exploded, 
  autoRotate = true,
  interactionEnabled = true 
}: { 
  exploded: number;
  autoRotate?: boolean;
  interactionEnabled?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  const nodes = useMemo(() => generateBrainNodes(80, 1.8), []);
  
  // Generate connections data
  const connections = useMemo(() => {
    const conns: { start: THREE.Vector3; end: THREE.Vector3; type: NodeData['type'] }[] = [];
    nodes.forEach((node, i) => {
      node.connections.forEach(j => {
        conns.push({
          start: node.originalPosition,
          end: nodes[j].originalPosition,
          type: node.type
        });
      });
    });
    return conns;
  }, [nodes]);
  
  // Generate pulses
  const pulses = useMemo(() => {
    return connections.slice(0, 30).map(conn => ({
      start: conn.start,
      end: conn.end
    }));
  }, [connections]);
  
  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Rim lighting for dramatic effect */}
      <pointLight position={[5, 5, 5]} intensity={1} color="#dc2626" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ff4444" />
      <pointLight position={[0, 0, -5]} intensity={0.5} color="#991b1b" />
      
      {/* Central core glow */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff4444" distance={3} />
      
      {/* Render connections */}
      {connections.map((conn, i) => (
        <Connection
          key={`conn-${i}`}
          start={conn.start}
          end={conn.end}
          exploded={exploded}
          type={conn.type}
        />
      ))}
      
      {/* Render nodes */}
      {nodes.map((node, i) => (
        <GlowNode
          key={`node-${i}`}
          node={node}
          exploded={exploded}
          index={i}
        />
      ))}
      
      {/* Render pulses */}
      {pulses.map((pulse, i) => (
        <Pulse
          key={`pulse-${i}`}
          startPos={pulse.start}
          endPos={pulse.end}
          exploded={exploded}
        />
      ))}
      
      {/* Volumetric fog effect using transparent sphere */}
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial
          color="#050505"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
    </div>
  );
}

// Main exported component
interface NeuralNetwork3DProps {
  className?: string;
  exploded?: number;
  onExplodedChange?: (value: number) => void;
  autoRotate?: boolean;
  interactionEnabled?: boolean;
  showControls?: boolean;
}

export default function NeuralNetwork3D({
  className = '',
  exploded = 0,
  onExplodedChange,
  autoRotate = true,
  interactionEnabled = true,
  showControls = false
}: NeuralNetwork3DProps) {
  const [internalExploded, setInternalExploded] = useState(exploded);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    setInternalExploded(exploded);
  }, [exploded]);
  
  const handleExplodedChange = (value: number) => {
    setInternalExploded(value);
    onExplodedChange?.(value);
  };
  
  if (!isClient) {
    return <LoadingFallback />;
  }
  
  // Mobile fallback - simpler 2D animation
  if (isMobile) {
    return (
      <div className={`relative ${className}`}>
        <MobileNeuralFallback exploded={internalExploded} />
        {showControls && (
          <ExplodeControl value={internalExploded} onChange={handleExplodedChange} />
        )}
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <NeuralNetworkScene 
            exploded={internalExploded}
            autoRotate={autoRotate}
            interactionEnabled={interactionEnabled}
          />
          {interactionEnabled && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate={false}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
            />
          )}
        </Canvas>
      </Suspense>
      
      {showControls && (
        <ExplodeControl value={internalExploded} onChange={handleExplodedChange} />
      )}
    </div>
  );
}

// Explode control slider
function ExplodeControl({ 
  value, 
  onChange 
}: { 
  value: number; 
  onChange: (value: number) => void;
}) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
      <span className="text-xs text-gray-400">Assembled</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
      />
      <span className="text-xs text-gray-400">Exploded</span>
    </div>
  );
}

// Mobile fallback component (2D CSS animation)
function MobileNeuralFallback({ exploded }: { exploded: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="relative w-64 h-64"
        style={{
          transform: `scale(${1 + exploded * 0.5})`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        {/* Central core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse" />
        
        {/* Primary nodes */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 60 + exploded * 40;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_20px_rgba(220,38,38,0.6)]"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: 'translate(-50%, -50%)',
                animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`,
                opacity: 1 - exploded * 0.3
              }}
            />
          );
        })}
        
        {/* Secondary nodes */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2 + 0.26;
          const radius = 100 + exploded * 60;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={i + 6}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-[0_0_15px_rgba(153,27,27,0.5)]"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: 'translate(-50%, -50%)',
                animation: `pulse 2s ease-in-out ${i * 0.15}s infinite`,
                opacity: 1 - exploded * 0.5
              }}
            />
          );
        })}
        
        {/* Connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 1 - exploded * 1.5 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ff4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * 60 + 128;
            const y = Math.sin(angle) * 60 + 128;
            return (
              <line
                key={i}
                x1="128"
                y1="128"
                x2={x}
                y2={y}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                className="animate-pulse"
              />
            );
          })}
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
