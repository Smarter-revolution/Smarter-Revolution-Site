'use client';

import { motion } from 'framer-motion';

// Circuit board pattern lines
function CircuitLines() {
  const lines = [
    // Horizontal lines with nodes
    { x1: '5%', y1: '20%', x2: '25%', y2: '20%', nodes: [{ x: '15%', y: '20%' }] },
    { x1: '75%', y1: '15%', x2: '95%', y2: '15%', nodes: [{ x: '85%', y: '15%' }] },
    { x1: '10%', y1: '80%', x2: '30%', y2: '80%', nodes: [{ x: '20%', y: '80%' }] },
    { x1: '70%', y1: '85%', x2: '90%', y2: '85%', nodes: [{ x: '80%', y: '85%' }] },
    // Vertical lines
    { x1: '15%', y1: '20%', x2: '15%', y2: '40%', nodes: [] },
    { x1: '85%', y1: '15%', x2: '85%', y2: '35%', nodes: [] },
    { x1: '20%', y1: '60%', x2: '20%', y2: '80%', nodes: [] },
    { x1: '80%', y1: '65%', x2: '80%', y2: '85%', nodes: [] },
    // Diagonal accents
    { x1: '25%', y1: '20%', x2: '30%', y2: '25%', nodes: [] },
    { x1: '75%', y1: '15%', x2: '70%', y2: '20%', nodes: [] },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
      <defs>
        <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0" />
          <stop offset="50%" stopColor="#dc2626" stopOpacity="1" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {lines.map((line, i) => (
        <g key={i}>
          {/* Main line */}
          <motion.line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#dc2626"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, delay: i * 0.2, ease: 'easeInOut' }}
          />
          
          {/* Animated pulse along line */}
          <motion.circle
            r="2"
            fill="#dc2626"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [line.x1, line.x2],
              cy: [line.y1, line.y2],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
          />
          
          {/* Node points */}
          {line.nodes.map((node, j) => (
            <motion.circle
              key={j}
              cx={node.x}
              cy={node.y}
              r="3"
              fill="none"
              stroke="#dc2626"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.2 + 1 }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

// Seeded random function for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Floating data points - using deterministic values
function DataPoints() {
  const points = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1) * 100,
    y: seededRandom(i * 2) * 100,
    size: 1 + seededRandom(i * 3) * 2,
    duration: 3 + seededRandom(i * 4) * 4,
    delay: seededRandom(i * 5) * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {points.map((point) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full"
          style={{
            width: point.size,
            height: point.size,
            left: `${point.x}%`,
            top: `${point.y}%`,
            backgroundColor: point.id % 3 === 0 ? '#dc2626' : '#ffffff',
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -20, 0],
          }}
          transition={{
            duration: point.duration,
            delay: point.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Hexagonal grid pattern - using deterministic values
function HexGrid() {
  const hexagons = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 10 + (i % 4) * 25 + (Math.floor(i / 4) % 2) * 12,
    y: 15 + Math.floor(i / 4) * 30,
    size: 40 + seededRandom(i * 10) * 20,
    delay: i * 0.15,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
      {hexagons.map((hex) => (
        <motion.polygon
          key={hex.id}
          points={generateHexPoints(hex.x, hex.y, hex.size)}
          fill="none"
          stroke="#dc2626"
          strokeWidth="0.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: hex.delay }}
        />
      ))}
    </svg>
  );
}

function generateHexPoints(cx: number, cy: number, size: number): string {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + size * Math.cos(angle) / 2;
    const y = cy + size * Math.sin(angle) / 2;
    points.push(`${x},${y}`);
  }
  return points.join(' ');
}

// Gradient mesh background
function GradientMesh() {
  return (
    <div className="absolute inset-0">
      {/* Primary gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Secondary accent orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
          left: '20%',
          top: '30%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%)',
          right: '15%',
          bottom: '20%',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}

// Animated scan line
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
      initial={{ top: '0%', opacity: 0 }}
      animate={{
        top: ['0%', '100%'],
        opacity: [0, 0.5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 3,
      }}
    />
  );
}

// Tech grid overlay
function TechGrid() {
  return (
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    >
      {/* Larger grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '180px 180px',
        }}
      />
    </div>
  );
}

// Corner accents
function CornerAccents() {
  return (
    <>
      {/* Top left */}
      <div className="absolute top-8 left-8 w-20 h-20 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-red-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-red-500/50 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      
      {/* Top right */}
      <div className="absolute top-8 right-8 w-20 h-20 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-red-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-red-500/50 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </div>
      
      {/* Bottom left */}
      <div className="absolute bottom-8 left-8 w-20 h-20 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-red-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-red-500/50 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </div>
      
      {/* Bottom right */}
      <div className="absolute bottom-8 right-8 w-20 h-20 pointer-events-none">
        <motion.div
          className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-red-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-red-500/50 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>
    </>
  );
}

// Noise texture overlay
function NoiseTexture() {
  return (
    <div 
      className="absolute inset-0 opacity-[0.015] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Main Hero Background Component
export default function HeroBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Gradient mesh */}
      <GradientMesh />
      
      {/* Tech grid */}
      <TechGrid />
      
      {/* Hexagonal pattern */}
      <HexGrid />
      
      {/* Circuit lines */}
      <CircuitLines />
      
      {/* Floating data points */}
      <DataPoints />
      
      {/* Scan line effect */}
      <ScanLine />
      
      {/* Corner accents */}
      <CornerAccents />
      
      {/* Noise texture for depth */}
      <NoiseTexture />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.4) 70%, rgba(10, 10, 10, 0.8) 100%)',
        }}
      />
      
      {/* Top gradient for navbar blend */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
      
      {/* Bottom gradient for section blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      
      {children}
    </div>
  );
}
