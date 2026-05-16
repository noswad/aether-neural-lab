import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Lab from './components/Lab';
import Engine from './components/Engine';
import CaseStudies from './components/CaseStudies';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="scroll-container bg-black text-white selection:bg-cyan-400 selection:text-black">
      <div className="noise-overlay fixed inset-0 opacity-[0.03] pointer-events-none z-[9999] mix-blend-overlay"></div>
      <div className="bg-gradient-layer fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#0d0d1a_0%,#000000_100%)] z-[-2]"></div>
      
      <Navbar />
      
      <main>
        <section id="hero">
          <Hero />
        </section>
        
        <section id="lab">
          <Lab />
        </section>
        
        <section id="engine">
          <Engine />
        </section>
        
        <section id="cases">
          <CaseStudies />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
