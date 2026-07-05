import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { Rocket, ExternalLink } from 'lucide-react';

const Part2LaunchSlide = () => {
  const [isLaunched, setIsLaunched] = useState(false);

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        padding: '3rem 5rem', position: 'relative'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Official Platform Launch
          </div>
          <h2 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700 }}>
            pahoasteam.space
          </h2>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          
          <AnimatePresence mode="wait">
            {!isLaunched ? (
              <motion.div
                key="launch-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
                transition={{ duration: 0.8 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
              >
                <motion.button
                  onClick={() => setIsLaunched(true)}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255, 179, 0, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '180px', height: '180px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--color-e))',
                    border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative'
                  }}
                >
                  <Rocket size={80} />
                  {/* Pulsing ring */}
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '50%', border: '2px solid var(--accent-primary)' }}
                  />
                </motion.button>
                <h3 style={{ fontSize: '2rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
                  Click to Launch
                </h3>
              </motion.div>
            ) : (
              <motion.div
                key="browser-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, type: "spring" }}
                style={{
                  width: '100%', height: '100%', maxWidth: '1400px',
                  background: '#fff', borderRadius: '24px', overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.1)',
                  position: 'relative', border: '1px solid var(--glass-border)'
                }}
              >
                {/* Browser-like Header */}
                <div style={{
                  height: '40px', background: '#f1f1f1', display: 'flex', alignItems: 'center', padding: '0 1rem', borderBottom: '1px solid #ddd'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                  </div>
                  <div style={{
                    flex: 1, textAlign: 'center', color: '#666', fontSize: '0.9rem', fontFamily: 'monospace',
                    background: '#fff', margin: '0 2rem', padding: '0.2rem', borderRadius: '4px'
                  }}>
                    https://pahoasteam.space/
                  </div>
                  <a href="https://pahoasteam.space/" target="_blank" rel="noreferrer" style={{ color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Open in new tab">
                    <ExternalLink size={18} />
                  </a>
                </div>
                
                {/* The Video replacing the iframe */}
                <video 
                  src="/steamspace.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  style={{ width: '100%', height: 'calc(100% - 40px)', objectFit: 'cover', background: '#000' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideWrapper>
  );
};

export default Part2LaunchSlide;
