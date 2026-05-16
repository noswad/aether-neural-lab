import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          <motion.div 
            className="contact-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="contact-number">04</span>
            <div className="contact-header-text">
              <span className="subtitle">INITIATE LINK</span>
              <h2 className="hero-heading" style={{ fontSize: '3.5rem' }}>Contact</h2>
            </div>
          </motion.div>

          <motion.div 
            className="contact-right"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="contact-form-container">
              <form id="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label className="form-label">Architect Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="NEURAL ARCHITECT" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Digital Uplink (Email)</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="ARCHITECT@DISTRICT7.IO" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Transmission Data</label>
                  <textarea 
                    className="form-input" 
                    placeholder="DESCRIBE YOUR VISION..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-transmit">
                  Transmit Signal
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
