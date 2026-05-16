import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer py-16 border-t border-white/5 bg-black">
      <div className="container max-w-[1400px] mx-auto px-[5%]">
        <div className="footer-content flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="footer-logo font-display font-bold tracking-[-0.02em] text-white/80">AETHER NEURAL LAB</div>
          <div className="social-links flex gap-8">
            {['TWITTER', 'GITHUB', 'LINKEDIN'].map(social => (
              <a key={social} href="#" className="text-[0.7rem] font-bold tracking-widest text-white/40 hover:text-cyan-400 transition-colors">
                {social}
              </a>
            ))}
          </div>
          <div className="copyright text-[0.7rem] font-medium tracking-widest text-white/20 uppercase">
            © 2026 AETHER NEURAL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
