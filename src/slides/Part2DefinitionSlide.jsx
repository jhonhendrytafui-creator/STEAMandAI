import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';

const BallsAnimation = ({ gooey }) => {
  // Define keyframes based on whether we want them to fuse (gooey) or stay separate (buzzing)
  const b1_x = gooey ? [-60, -20, 20, 0, 0, -60] : [-70, -50, -80, -60, -50, -70];
  const b1_y = gooey ? [-40, -10, 20, 0, 0, -40] : [40, 20, 50, 30, 60, 40];
  
  const b2_x = gooey ? [60, 30, -10, 0, 0, 60] : [70, 50, 80, 60, 50, 70];
  const b2_y = gooey ? [-20, 0, -30, 0, 0, -20] : [40, 60, 30, 50, 20, 40];
  
  const b3_x = gooey ? [0, 0, -20, 0, 0, 0] : [0, -20, 20, -10, 10, 0];
  const b3_y = gooey ? [60, 30, 10, 0, 0, 60] : [-60, -80, -50, -70, -40, -60];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '220px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: gooey ? 'url(#goo)' : 'none',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: '24px',
      border: '1px solid var(--glass-border)',
      overflow: 'hidden'
    }}>
      {/* Ball 1 - Blue/Purple */}
      <motion.div
        animate={{ x: b1_x, y: b1_y, scale: [1, 1.1, 1, 1.3, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.7, 0.9, 1] }}
        style={{
          position: 'absolute', width: '90px', height: '90px', borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #a8c0ff, #3f2b96)',
          boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
        }}
      />
      {/* Ball 2 - Amber/Orange */}
      <motion.div
        animate={{ x: b2_x, y: b2_y, scale: [1, 1.1, 1, 1.25, 1.25, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.7, 0.9, 1] }}
        style={{
          position: 'absolute', width: '70px', height: '70px', borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ffd194, #70e1f5)',
          boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
        }}
      />
      {/* Ball 3 - Pink/Red */}
      <motion.div
        animate={{ x: b3_x, y: b3_y, scale: [1, 1.1, 1, 1.35, 1.35, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.7, 0.9, 1] }}
        style={{
          position: 'absolute', width: '80px', height: '80px', borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #ff9a9e, #fecfef)',
          boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
        }}
      />
    </div>
  );
};

const Part2DefinitionSlide = () => {
  const [step, setStep] = useState(0);

  return (
    <SlideWrapper>
      {/* SVG Filter for Gooey Fusion Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div 
        onClick={() => { if (step === 0) setStep(1); }}
        style={{
          display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
          padding: '3rem 5rem', cursor: step === 0 ? 'pointer' : 'default'
        }}
      >
        {/* Header */}
        <motion.div 
          layout
          style={{ 
            textAlign: 'center', 
            marginBottom: step === 0 ? 'auto' : '2rem',
            marginTop: step === 0 ? 'auto' : '0'
          }}
        >
          <motion.div layout style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 2 // The Core Concept
          </motion.div>
          <motion.h2 
            layout 
            style={{ 
              fontSize: step === 0 ? '4.5rem' : '2.8rem', 
              margin: 0, fontWeight: 700,
              transition: 'font-size 0.8s ease-in-out',
              lineHeight: 1.2
            }}
          >
            What is Multidisciplinary and <br/> Interdisciplinary learning?
          </motion.h2>
          
          <AnimatePresence>
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                style={{ marginTop: '2rem', fontSize: '1.5rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}
              >
                Click anywhere to continue
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Content Row */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ flex: 1, display: 'flex', gap: '3rem', minHeight: '400px' }}
            >
              
              {/* Multidisciplinary Column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)', border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)', flex: 1
                }}>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginTop: 0, marginBottom: '1rem', borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>
                    Multidisciplinary
                  </h3>
                  <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                    People from different subjects work together, but they still keep their ideas separate. 
                    <br/><br/>
                    The <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>boundaries</span> between subjects stay very clear.
                  </p>
                </div>
                <BallsAnimation gooey={false} />
              </div>

              {/* Interdisciplinary Column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: 'rgba(255, 179, 0, 0.05)', border: '2px solid var(--accent-primary)',
                  borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 40px rgba(255, 179, 0, 0.1)', flex: 1
                }}>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', marginTop: 0, marginBottom: '1rem', borderBottom: '2px solid rgba(255, 179, 0, 0.2)', paddingBottom: '0.5rem' }}>
                    Interdisciplinary
                  </h3>
                  <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                    Bringing different subjects together into a cohesive whole.
                    <br/><br/>
                    Instead of keeping subjects separate, we combine their methods to <span className="text-gradient">create something completely new</span>.
                  </p>
                </div>
                <BallsAnimation gooey={true} />
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SlideWrapper>
  );
};

export default Part2DefinitionSlide;
