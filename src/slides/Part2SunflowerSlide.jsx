import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Dna, Palette } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const Part2SunflowerSlide = () => {
  const [activeLens, setActiveLens] = useState('none');

  const perspectives = {
    mathematician: {
      id: 'mathematician',
      title: 'Mathematician',
      icon: Calculator,
      color: '#2196F3',
      video: '/math.mp4',
      description: "They see math in nature. The seeds grow in a perfect spiral pattern called the Fibonacci sequence. This pattern helps the flower pack the most seeds in a small space."
    },
    biologist: {
      id: 'biologist',
      title: 'Biologist',
      icon: Dna,
      color: '#4CAF50',
      video: '/bio.mp4',
      description: "They see how the plant survives. The flower acts like a solar panel. It slowly turns to follow the sun across the sky all day to help it grow."
    },
    artist: {
      id: 'artist',
      title: 'Artist / Designer',
      icon: Palette,
      color: '#FF9800',
      video: '/artist.mp4',
      description: "They see beautiful shapes and colors. They look at the bright yellow petals next to the dark center. They notice the perfect symmetry and how the geometric shapes catch the light."
    }
  };

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        gap: '2rem'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 2 // Interdisciplinary Learning
          </div>
          <h2 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700 }}>
            How do we see this sunflower?
          </h2>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          gap: '3rem',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem'
        }}>
          
          {/* Media Display Area */}
          <div style={{
            flex: '0 0 600px',
            height: '600px',
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            border: `2px solid ${activeLens === 'none' ? 'var(--border-color)' : perspectives[activeLens].color}`,
            transition: 'border-color 0.5s ease'
          }}>
            <AnimatePresence mode="wait">
              {activeLens === 'none' ? (
                <motion.img
                  key="static-image"
                  src="/sf.png"
                  alt="Sunflower"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <motion.video
                  key={`video-${activeLens}`}
                  src={perspectives[activeLens].video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Interaction Cards & Description */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxWidth: '500px'
          }}>
            
            {/* Lenses Grid */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {Object.values(perspectives).map((lens) => {
                const Icon = lens.icon;
                const isActive = activeLens === lens.id;
                return (
                  <motion.div
                    key={lens.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveLens(isActive ? 'none' : lens.id)}
                    style={{
                      background: isActive ? `${lens.color}20` : 'var(--glass-bg)',
                      border: `1px solid ${isActive ? lens.color : 'var(--border-color)'}`,
                      borderRadius: '16px',
                      padding: '1.5rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      boxShadow: isActive ? `0 0 20px ${lens.color}40` : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Icon size={32} color={isActive ? lens.color : 'var(--text-secondary)'} />
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: isActive ? lens.color : 'var(--text-primary)'
                    }}>
                      {lens.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Dynamic Description Box */}
            <AnimatePresence>
              {activeLens !== 'none' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  style={{
                    background: 'var(--glass-bg)',
                    border: `1px solid ${perspectives[activeLens].color}50`,
                    borderRadius: '16px',
                    padding: '2rem',
                    backdropFilter: 'blur(20px)',
                    boxShadow: `0 10px 30px ${perspectives[activeLens].color}20`,
                    borderLeft: `4px solid ${perspectives[activeLens].color}`,
                    marginTop: '1rem'
                  }}
                >
                  <p style={{ 
                    fontSize: '1.25rem', 
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {perspectives[activeLens].description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

export default Part2SunflowerSlide;
