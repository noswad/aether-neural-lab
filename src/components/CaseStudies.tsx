import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from './case-studies/MagneticButton';
import { TypingEffect } from './case-studies/TypingEffect';
import { ChronosVisual, BioLinkVisual, AetherMindVisual } from './case-studies/ProjectVisuals';

/**
 * Project Data
 */
const PROJECTS = [
  {
    id: "01",
    title: "Project Chronos",
    category: "PREDICTIVE LOGISTICS",
    tech: "Temporal CNN",
    description: "Implementation of temporal neural modeling to optimize global supply chains. Achieved 40% reduction in latency through deep-learning forecast engines and real-time data ingestion.",
    visual: <ChronosVisual />,
    color: "#0070F3",
    meta: [
      { label: "IMPACT", value: "-42% Latency" },
      { label: "TECH", value: "Temporal CNN" }
    ]
  },
  {
    id: "02",
    title: "Bio-Neural Link",
    category: "HUMAN INTERFACE",
    tech: "Synaptic Bridge v4",
    description: "Real-time prosthetic synchronization using low-latency neural signal processing. Bridging the gap between biological intent and mechanical execution via sub-5ms packet transmission.",
    visual: <BioLinkVisual />,
    color: "#7928CA",
    meta: [
      { label: "LATENCY", value: "< 5ms" },
      { label: "ACCURACY", value: "99.2%" }
    ]
  },
  {
    id: "03",
    title: "Aether Mind",
    category: "SOCIAL ANALYTICS",
    tech: "Emergent Swarm AI",
    description: "Large-scale simulation of cognitive sentiment patterns across digital populations. Predictive modeling for high-stakes geopolitical decision making and market volatility analysis.",
    visual: <AetherMindVisual />,
    color: "#F5A623",
    meta: [
      { label: "SCALE", value: "500M Nodes" },
      { label: "RELIABILITY", value: "94.8%" }
    ]
  }
];

/**
 * Individual Project Card Component
 */
const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0]; 
  index: number; 
  total: number; 
  scrollProgress: any 
}> = ({ project, index, total, scrollProgress }) => {
  const start = index / total;
  const end = (index + 1) / total;

  // Stacking Scale: Previous cards shrink as next cards come up
  // The card starts at scale 1. As scroll reaches the NEXT card (start + 1/total), it shrinks.
  const scale = useTransform(
    scrollProgress,
    [start + 0.1/total, start + 0.8/total],
    [1, 0.9],
    { clamp: true }
  );

  // Parallax for the number
  const numberY = useTransform(
    scrollProgress,
    [start, end],
    [0, -150]
  );

  // Card Y offset for stacking (sticky top offset)
  const topOffset = 80 + index * 40;

  return (
    <div 
      className="sticky h-screen flex items-center justify-center w-full px-6" 
      style={{ top: 0, zIndex: index }}
    >
      <motion.div
        style={{ 
          scale,
          top: `${topOffset}px`,
        }}
        className="relative w-full max-w-5xl h-[60vh] bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-8 md:p-12 flex flex-col md:flex-row gap-12 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)]"
      >
        {/* Background Accent Glow */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none blur-[120px]"
          style={{ background: project.color }}
        />

        {/* Content Side */}
        <div className="flex-1 flex flex-col justify-between z-10">
          <div>
            <motion.span 
              style={{ y: numberY }}
              className="text-[8rem] md:text-[12rem] font-black text-[#D7E2EA] leading-none opacity-10 block pointer-events-none"
            >
              {project.id}
            </motion.span>
            
            <div className="mt-[-4rem] md:mt-[-6rem]">
              <span className="text-accent-primary font-bold tracking-[0.4em] text-xs block mb-3 uppercase">
                {project.category}
              </span>
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {project.title}
              </h3>
              
              <TypingEffect 
                prefix="TECH: "
                text={project.tech} 
                className="text-[#D7E2EA] font-mono text-sm mb-6" 
              />
              
              <p className="text-white/60 text-base md:text-lg max-w-md leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex gap-10">
                {project.meta.map((m, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-accent-primary tracking-widest uppercase">{m.label}</span>
                    <span className="text-white font-medium">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <MagneticButton className="mt-8">
            <button className="group relative px-10 py-3.5 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-bold tracking-widest text-xs uppercase overflow-hidden transition-all duration-500">
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">Live Project</span>
              <div className="absolute inset-0 bg-[#D7E2EA] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </MagneticButton>
        </div>

        {/* Visual Side */}
        <div className="flex-[1.5] relative rounded-[30px] overflow-hidden border border-white/5 bg-black/40">
          {project.visual}
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Main CaseStudies Section
 */
const CaseStudies: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Background Accent Transition
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    ["#0C0C0C", "#001021", "#150821", "#1C1103"]
  );

  return (
    <section ref={container} id="cases" className="relative bg-[#0C0C0C]">
      {/* Dynamic Background Layer */}
      <motion.div 
        style={{ backgroundColor: bgColor }}
        className="fixed inset-0 pointer-events-none z-0 transition-colors duration-700"
      />
      
      <div className="relative z-10 py-32">
        <div className="container mx-auto px-6 mb-20 text-center md:text-left">
          <span className="text-accent-primary font-bold tracking-[0.5em] text-sm block mb-4 uppercase">Exploration</span>
          <h2 className="hero-heading text-5xl md:text-8xl">Case Studies</h2>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={i} 
              total={PROJECTS.length}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
        
        {/* Spacer for final card scroll depth */}
        <div className="h-[20vh]" />
      </div>
    </section>
  );
};

export default CaseStudies;
