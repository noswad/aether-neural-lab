import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Engine: React.FC = () => {
  const [load, setLoad] = useState(84);
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Animate the load value slightly
    const interval = setInterval(() => {
      setLoad(prev => {
        const next = prev + (Math.random() - 0.5) * 4;
        return Math.max(70, Math.min(95, Math.round(next)));
      });
    }, 2000);

    // Wave animation for throughput
    if (!waveCanvasRef.current) return;
    const canvas = waveCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 242, 255, 0.4)';
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.05 + offset) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      offset += 0.1;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="engine" className="section engine-section py-[100px] bg-black min-h-screen">
      <div className="container max-w-[1400px] mx-auto px-[5%] w-full">
        <div className="engine-header text-center mb-16">
          <span className="tag font-display text-[0.8rem] tracking-[0.3em] text-cyan-400 mb-6 block uppercase">02 / PERFORMANCE</span>
          <h2 className="section-title font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] mb-8 text-white">
            The Neural Engine
          </h2>
          <p className="section-desc text-lg text-white/50 leading-relaxed max-w-[600px] mx-auto">
            Massive throughput meets surgical precision. Our decentralized architecture redefines the limits of computational fluidity.
          </p>
        </div>

        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-none lg:grid-rows-[repeat(2,280px)] gap-6 max-w-[1200px] mx-auto">
          {/* Large Card: Main Core */}
          <motion.div 
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(0,242,255,0.2)' }}
            className="bento-item lg:col-span-1 lg:row-span-2 bg-white/5 backdrop-blur-[20px] rounded-[32px] p-10 border border-white/10 relative overflow-hidden transition-all duration-500 flex flex-col justify-between"
          >
            <div className="bento-label text-[0.7rem] tracking-[0.2em] text-white/50 uppercase">SYSTEM LOAD</div>
            <div className="core-display relative flex items-center justify-center my-8">
              <svg className="core-svg w-[180px] h-[180px] -rotate-90" viewBox="0 0 200 200">
                <circle className="ring-bg fill-none stroke-white/5 stroke-[8]" cx="100" cy="100" r="90"></circle>
                <circle 
                  className="ring-progress fill-none stroke-cyan-400 stroke-[8] transition-all duration-1000" 
                  cx="100" cy="100" r="90"
                  strokeDasharray="565.48"
                  strokeDashoffset={565.48 - (565.48 * load) / 100}
                ></circle>
              </svg>
              <div className="core-value absolute inset-0 flex items-center justify-center font-display text-[3rem] font-bold text-white">
                {load}<span className="text-xl text-white/50 ml-1">%</span>
              </div>
            </div>
            <div className="bento-footer flex justify-between items-center text-[0.7rem] font-medium">
              <span className="text-white/50 uppercase tracking-wider">CPU UTILIZATION</span>
              <span className="text-cyan-400 animate-pulse uppercase tracking-widest">OPTIMAL</span>
            </div>
          </motion.div>

          {/* Medium Card: Throughput */}
          <motion.div 
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(0,242,255,0.2)' }}
            className="bento-item lg:col-span-2 bg-white/5 backdrop-blur-[20px] rounded-[32px] p-10 border border-white/10 relative overflow-hidden transition-all duration-500"
          >
            <div className="bento-label text-[0.7rem] tracking-[0.2em] text-white/50 uppercase">THROUGHPUT</div>
            <div className="flex flex-col h-full justify-center">
              <div className="stat-large font-display text-[4rem] font-bold text-white leading-none mb-2">1.2B</div>
              <div className="stat-unit text-sm text-cyan-400 font-bold tracking-[0.1em] uppercase mb-6">TOKENS / SEC</div>
              <div className="mini-chart h-20 w-full opacity-60">
                <canvas ref={waveCanvasRef} className="w-full h-full" />
              </div>
            </div>
          </motion.div>

          {/* Small Card: Latency */}
          <motion.div 
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(0,242,255,0.2)' }}
            className="bento-item bg-white/5 backdrop-blur-[20px] rounded-[32px] p-10 border border-white/10 relative overflow-hidden transition-all duration-500"
          >
            <div className="bento-label text-[0.7rem] tracking-[0.2em] text-white/50 uppercase mb-8">LATENCY</div>
            <div className="latency-grid flex flex-col gap-4">
              {[
                { loc: "SFO", val: 12 },
                { loc: "TPE", val: 24 },
                { loc: "LHR", val: 38 }
              ].map((item, i) => (
                <div key={i} className="loc flex justify-between items-center text-lg">
                  <span className="text-white/40 font-display font-medium">{item.loc}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-bold">{item.val}</span>
                    <span className="text-[0.7rem] text-white/30 uppercase">ms</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Small Card: Security */}
          <motion.div 
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(0,242,255,0.2)' }}
            className="bento-item bg-white/5 backdrop-blur-[20px] rounded-[32px] p-10 border border-white/10 relative overflow-hidden transition-all duration-500"
          >
            <div className="bento-label text-[0.7rem] tracking-[0.2em] text-white/50 uppercase mb-6">SECURITY</div>
            <div className="security-visual flex flex-col items-center justify-center py-4">
              <div className="shield-icon relative text-cyan-400">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-pulse"></div>
              </div>
              <div className="security-status mt-6 text-[0.8rem] font-bold tracking-[0.2em] text-white uppercase">ENCRYPTED</div>
            </div>
          </motion.div>

          {/* Wide Card: Global Infrastructure */}
          <motion.div 
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(0,242,255,0.2)' }}
            className="bento-item lg:col-span-3 bg-white/5 backdrop-blur-[20px] rounded-[32px] p-10 border border-white/10 relative overflow-hidden transition-all duration-500"
          >
            <div className="bento-label text-[0.7rem] tracking-[0.2em] text-white/50 uppercase">GLOBAL INFRASTRUCTURE</div>
            <div className="infra-map relative h-32 my-6">
              {/* Simplified map visual with points */}
              <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f2ff]"></div>
              <div className="absolute top-[60%] left-[45%] w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#8b5cf6]"></div>
              <div className="absolute top-[30%] left-[80%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f2ff]"></div>
              <div className="absolute top-[75%] left-[85%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f2ff]"></div>
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 150">
                <path d="M60 30 Q 180 70 200 90 Q 220 110 320 45" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
            <div className="infra-footer flex justify-between items-center text-[0.7rem] font-medium text-white/50">
              <span className="uppercase tracking-wider">DECENTRALIZED MESH NETWORK</span>
              <span className="uppercase tracking-wider">42 ACTIVE CLUSTERS</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Engine;
