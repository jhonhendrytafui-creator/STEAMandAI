import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { Play, Cpu } from 'lucide-react';

const Part2ReginaldDennySlide = () => {
  // 0 = Initial (Portrait only), 1 = Video shown, 2 = Edge detection demo shown
  const [step, setStep] = useState(0);

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: '3rem 5rem' // Increased offset space
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 2 // Real-World Application
          </div>
          <h2 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700 }}>
            Mathematics in Justice
          </h2>
        </div>

        {/* Media Row */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6rem', // Increased offset space
          minHeight: '450px'
        }}>
          
          <AnimatePresence mode="wait">
            {step < 2 ? (
              <motion.div 
                key="stage1"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, position: 'absolute' }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6rem', // Increased offset space
                  width: '100%'
                }}
              >
                {/* Portrait Area */}
                <motion.div 
                  layout 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2.5rem', // Increased offset space
                    position: 'relative'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <motion.img
                      layout
                      src="/reginald.png"
                      alt="Reginald Denny"
                      style={{
                        height: '420px', // Scaled down slightly for proportional balance
                        width: 'auto',
                        borderRadius: '16px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                      }}
                    />
                    <motion.div layout style={{
                      marginTop: '1.5rem', // Increased offset space
                      background: 'rgba(0,0,0,0.6)',
                      padding: '0.6rem 1.8rem',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em'
                    }}>
                      Reginald Denny
                    </motion.div>
                  </div>

                  {/* Button to the right of portrait */}
                  <AnimatePresence>
                    {step === 0 && (
                      <motion.button
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(1)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '1rem 2.5rem',
                          background: 'var(--accent-primary)',
                          color: '#000',
                          border: 'none',
                          borderRadius: '30px',
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          boxShadow: '0 10px 20px rgba(255, 179, 0, 0.3)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Play size={20} fill="#000" />
                        See the video
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Video */}
                <AnimatePresence>
                  {step === 1 && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8, x: -30 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      style={{
                        height: '420px', // Matching portrait height
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        background: '#000'
                      }}
                    >
                      <video
                        src="/reginald.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          height: '100%',
                          width: 'auto',
                          objectFit: 'cover'
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                key="stage2"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  position: 'relative'
                }}
              >
                {/* Edge Detection Wipe Effect */}
                <div style={{
                  position: 'relative',
                  height: '460px', // Scaled for breathing room
                  borderRadius: '16px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)'
                }}>
                  {/* Base Original Image */}
                  <img src="/arm.png" style={{ height: '100%', width: 'auto', display: 'block' }} alt="Original Arm" />
                  
                  {/* Processed Image with wipe animation */}
                  <motion.div
                    animate={{ clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)', 'inset(0 0 0 0)', 'inset(0 100% 0 0)'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      borderRight: '2px solid var(--accent-primary)'
                    }}
                  >
                    <img src="/arm1.png" style={{ height: '100%', width: 'auto', display: 'block' }} alt="Edge Detection" />
                  </motion.div>

                  <div style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '20px',
                    color: 'var(--accent-primary)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--accent-primary)'
                  }}>
                    Scanning...
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Information Box at the bottom */}
        <motion.div 
          layout 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ 
            marginTop: '4rem', // Generous offset from media row
            marginBottom: '2rem',
            width: '100%'
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            gap: '2rem' // Generous gap between text and buttons
          }}>
            <p style={{ 
              fontSize: '1.6rem', 
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 300,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              During the <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>April 29, 1992 Los Angeles riots</span>, mathematicians used <span style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>edge detection algorithms</span> to enhance low-quality broadcast footage of <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Reginald Denny's assault</span>, successfully identifying a perpetrator's tattoo and securing a conviction.
            </p>

            {/* How they did it Button */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.button
                  key="btn-how"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, height: 0, margin: 0, padding: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.8rem 2.5rem',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    border: '2px solid var(--accent-primary)',
                    borderRadius: '30px',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <Cpu size={22} color="var(--accent-primary)" />
                  How they did it
                </motion.button>
              )}
              {step === 2 && (
                <motion.button
                  key="btn-back"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, height: 0, margin: 0, padding: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.8rem 2.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  Go Back
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </SlideWrapper>
  );
};

export default Part2ReginaldDennySlide;
