import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-[5%] py-8 fixed top-0 w-full z-[1000]">
      <div className="logo font-display text-2xl font-bold tracking-[-0.04em] text-white">
        Aether Neural
      </div>
      
      <div className={`nav-toggle flex flex-col justify-between w-[30px] h-5 cursor-pointer lg:hidden z-[1100] ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isOpen ? 'translate-y-[9px] rotate-45' : ''}`}></span>
        <span className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isOpen ? '-translate-y-[9px] -rotate-45' : ''}`}></span>
      </div>

      <div className={`nav-links fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-8 lg:static lg:bg-transparent lg:flex-row lg:gap-10 lg:px-10 lg:py-3 lg:rounded-full lg:border lg:border-white/10 lg:backdrop-blur-3xl transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        {['The Lab', 'Neural Engine', 'Case Studies', 'Contact'].map((link) => (
          <a 
            key={link}
            href={`#${link.toLowerCase().replace(' ', '')}`} 
            className="text-white/50 hover:text-white text-xs font-medium uppercase tracking-widest transition-all duration-300 relative group"
            onClick={() => setIsOpen(false)}
          >
            {link}
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </a>
        ))}
        
        <div className="lg:hidden flex flex-col gap-4 mt-8 w-[80%] max-w-xs">
          <a href="#demo" className="btn btn-secondary w-full">Request Demo</a>
          <a href="#access" className="btn btn-primary w-full">Get Access</a>
        </div>
      </div>

      <div className="nav-actions hidden lg:flex gap-4 items-center">
        <a href="#demo" className="btn btn-secondary px-6 py-3 rounded-full text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all">Request Demo</a>
        <a href="#access" className="btn btn-primary px-6 py-3 rounded-full text-xs font-semibold bg-gradient-to-br from-cyan-400 to-purple-500 text-black shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:shadow-[0_0_30px_rgba(0,242,255,0.6)] transition-all">Get Access</a>
      </div>
    </nav>
  );
};

export default Navbar;
