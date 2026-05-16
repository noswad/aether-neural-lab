import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <main className="hero section relative min-h-screen flex flex-col items-center text-center pt-[18vh] px-5 overflow-hidden">
      <div className="hero-content relative z-[300] max-w-[1100px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          id="hero-title"
          className="font-display text-[clamp(3rem,8.5vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] mb-6 text-white"
        >
          <span className="hero-heading bg-gradient-to-br from-white to-white/30 bg-clip-text text-transparent">
            Architecting<br />Fluid Intelligence
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="hero-subtext text-[clamp(1rem,2vw,1.25rem)] text-white/50 leading-[1.4] max-w-[580px] mx-auto mb-12 font-light tracking-[-0.01em]"
        >
          Transforming complex data into sentient motion. Aether is the world's first generative engine for organic neural interfaces.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a href="#explore" className="btn btn-cta opacity-100 scale-100 inline-block px-[3.5rem] py-[1.2rem] text-[1.05rem] rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl shadow-2xl hover:border-cyan-400 hover:shadow-cyan-400/30 transition-all duration-300">
            Start Generating
          </a>
        </motion.div>
      </div>

      {/* Dynamic Sphere Background */}
      <div className="sphere-container fixed top-0 left-0 w-full h-screen z-[-1] overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top scale-[1.2] mix-blend-lighten opacity-80"
        >
          <source src="liquid2.webm" type="video/webm" />
          <source src="liquid2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Floating Cards */}
      <div className="card-anim-wrapper wrapper-left absolute z-[200] bottom-[22%] left-[clamp(8%,15vw,20%)] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="floating-card pointer-events-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[40px] w-[clamp(260px,25vw,340px)] text-left shadow-2xl"
        >
          <div className="card-label flex justify-between items-center mb-8 font-display text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
            <span>Neural Synthesis</span>
            <div className="icon-circle w-9 h-9 rounded-full bg-white flex items-center justify-center text-black">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
            </div>
          </div>
          <div className="card-title font-display text-[1.5rem] font-medium leading-tight mb-4">Generative<br />Accuracy</div>
          <div className="card-stats flex items-baseline gap-3">
            <span className="stat-value font-display text-[3.5rem] font-semibold leading-none">99.8%</span>
            <span className="stat-label text-[0.7rem] font-bold text-cyan-400 animate-pulse">OPTIMIZED</span>
          </div>
        </motion.div>
      </div>

      <div className="card-anim-wrapper wrapper-right absolute z-[200] bottom-[8%] right-[clamp(8%,15vw,20%)] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="floating-card pointer-events-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[40px] w-[clamp(260px,25vw,340px)] text-left shadow-2xl"
        >
          <div className="card-label flex justify-between items-center mb-8 font-display text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
            <span>Engine Performance</span>
            <div className="icon-circle w-9 h-9 rounded-full bg-white flex items-center justify-center text-black">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
          </div>
          <div className="card-title font-display text-[1.5rem] font-medium leading-tight mb-4">Inference Time</div>
          <div className="card-value-hero font-display text-[4.5rem] font-semibold leading-[0.9]">
            12.4<span className="unit text-2xl text-white/50 ml-1">ms</span>
          </div>
          <div className="progress-bar w-full h-1 bg-white/5 rounded-full mt-10 overflow-hidden">
            <div className="progress-fill h-full bg-gradient-to-r from-cyan-400 to-purple-500 w-[96%] shadow-[0_0_20px_rgba(0,242,255,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-1/2 -left-full animate-[dataFlow_2s_infinite_linear]"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Hero;
