import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * 01 / Chronos Visual
 * SVG Path Animation + Ticking Clock
 */
export const ChronosVisual: React.FC = () => {
  const [time, setTime] = useState("18:32:01");
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Ticking logic
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);

    // Path animation simulation
    if (pathRef.current) {
        gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            duration: 3,
            repeat: -1,
            ease: "none"
        });
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0C0C0C] rounded-[40px] overflow-hidden border border-white/5">
      <div className="absolute top-10 right-10 font-mono text-4xl text-[#0070F3] opacity-80 tabular-nums">
        {time}
      </div>
      
      <svg width="80%" height="80%" viewBox="0 0 400 400" className="opacity-50">
        <path 
          ref={pathRef}
          d="M50,200 Q200,50 350,200 T50,350" 
          fill="none" 
          stroke="#0070F3" 
          strokeWidth="2" 
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <circle cx="50" cy="200" r="4" fill="#0070F3" />
        <circle cx="350" cy="200" r="4" fill="#0070F3" />
      </svg>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

/**
 * 02 / Bio-Link Visual
 * Tilt Effect + Accuracy Counter + Pulse
 */
export const BioLinkVisual: React.FC = () => {
  const [accuracy, setAccuracy] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Accuracy Counter
    let start = 0;
    const end = 99.2;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = progress * end;
      
      // Add small oscillation at the end
      if (progress > 0.95) {
        setAccuracy(end + (Math.random() - 0.5) * 0.2);
      } else {
        setAccuracy(current);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAccuracy(end);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(containerRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full bg-[#0C0C0C] rounded-[40px] overflow-hidden border border-white/5 perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full border-2 border-purple-500/20 animate-pulse-slow" />
        <div className="absolute w-48 h-48 rounded-full border border-purple-500/40 animate-pulse-fast" />
      </div>
      
      <div className="absolute bottom-10 left-10">
        <span className="text-xs text-purple-400 font-mono block mb-1">SYSTEM ACCURACY</span>
        <span className="text-5xl font-bold text-white tabular-nums">
          {accuracy.toFixed(1)}%
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent pointer-events-none" />
    </div>
  );
};

/**
 * 03 / Aether Mind Visual
 * Three.js Point Cloud Globe
 */
function Globe() {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.002;
    pointsRef.current.rotation.x += 0.001;
  });

  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    const r = 2;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#F5A623"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export const AetherMindVisual: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0C0C0C] rounded-[40px] overflow-hidden border border-white/5 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Globe />
      </Canvas>
      
      <div className="absolute top-10 left-10">
        <span className="text-xs text-amber-500 font-mono block mb-1">COLLECTIVE NODE MAPPING</span>
        <div className="flex gap-2">
            {[1,2,3].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-amber-500 animate-ping" style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/10 pointer-events-none" />
    </div>
  );
};
