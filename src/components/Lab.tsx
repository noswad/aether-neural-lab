import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Lab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple neural network animation
    let animationFrameId: number;
    const nodes: { x: number, y: number, vx: number, vy: number }[] = [];
    const nodeCount = 12;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0, 242, 255, 0.15)';
      ctx.fillStyle = 'rgba(0, 242, 255, 0.5)';

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const nextNode = nodes[j];
          const dist = Math.sqrt((node.x - nextNode.x) ** 2 + (node.y - nextNode.y) ** 2);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nextNode.x, nextNode.y);
            ctx.stroke();
          }
        }
      });

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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="lab" className="section lab-section min-h-screen bg-black relative flex items-center justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(139,92,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_90%_10%,rgba(0,242,255,0.08)_0%,transparent_50%)]"></div>
      
      <div className="container max-w-[1400px] mx-auto px-[5%] w-full relative z-10">
        <div className="lab-grid grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-[100px] items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lab-content"
          >
            <span className="tag font-display text-[0.8rem] tracking-[0.3em] text-cyan-400 mb-6 block">01 / CONCEPT</span>
            <h2 className="section-title font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] mb-8 text-white">
              The Genesis of<br />Neural Fluidity
            </h2>
            <p className="section-desc text-lg text-white/50 leading-relaxed max-w-[500px] mb-12">
              We don't just build models; we grow digital ecosystems that mimic biological adaptability. The Lab is where raw data meets sentient motion.
            </p>
            
            <div className="feature-list flex flex-col gap-8">
              {[
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
                  title: "Global Synchronicity",
                  desc: "Latency-free neural distribution across decentralized nodes."
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                  title: "Adaptive Learning",
                  desc: "Self-evolving architectures that learn from every interaction."
                }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="feature-item flex gap-6 items-start p-4 rounded-[20px] hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="feature-icon w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="feature-text">
                    <h3 className="text-lg text-white mb-2 font-medium">{feature.title}</h3>
                    <p className="text-sm text-white/50">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lab-visual relative flex justify-center items-center"
          >
            <div className="main-glass-card bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-[40px] rounded-[40px] p-12 w-full max-w-[500px] h-[400px] relative shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10">
              <div className="glass-header flex items-center gap-3 mb-12">
                <span className="status-dot w-2 h-2 bg-[#00ffa3] rounded-full relative shadow-[0_0_10px_rgba(0,255,163,0.5)]">
                  <span className="absolute -inset-1 border border-[#00ffa3] rounded-full animate-ping opacity-75"></span>
                </span>
                <span className="status-text text-[0.7rem] tracking-[0.1em] text-white/50 uppercase">LIVE CORE ANALYSIS</span>
              </div>
              <div className="neural-nodes relative h-[150px] mb-8">
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>
              <div className="data-stream flex flex-col gap-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="stream-line h-1 bg-white/5 rounded-full w-full relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 w-[40%] -left-full animate-[streamFlow_3s_infinite_linear]"
                      style={{ animationDelay: `${i}s` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="floating-stat absolute -bottom-8 -right-5 bg-white/5 backdrop-blur-[20px] border border-white/10 p-6 rounded-3xl z-10"
            >
              <div className="stat-num font-display text-[2rem] font-bold text-white mb-1">14.2K</div>
              <div className="stat-name text-[0.6rem] tracking-[0.2em] text-cyan-400 uppercase">ACTIVE NODES</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Lab;
