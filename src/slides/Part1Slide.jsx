import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Droplets, FlaskConical, ChevronLeft } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const FlipCard = ({ id, title, description, icon: Icon, color, mediaType, mediaSrc, isActive, onToggle }) => {
  return (
    <div style={{ perspective: '1200px', flex: 1, height: '400px', zIndex: isActive ? 50 : 10, position: 'relative' }}>
      <motion.div
        animate={{ 
          rotateY: isActive ? 180 : 0,
          scale: isActive ? 1.05 : 1,
          y: isActive ? -20 : 0
        }}
        transition={{ duration: 0.8, type: "spring", stiffness: 50, damping: 15 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          cursor: 'pointer'
        }}
        onClick={() => onToggle(isActive ? null : id)}
      >
        {/* Front of Card */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          borderTop: `4px solid ${color}`,
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: `0 10px 30px rgba(0,0,0,0.4)`
        }}>
          <Icon size={64} color={color} style={{ marginBottom: '2rem', filter: `drop-shadow(0 0 10px ${color}50)` }} />
          <h3 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>{title}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.5 }}>
            {description}
          </p>
          <div style={{ marginTop: 'auto', color: color }} className="mono-text">
            Click to Expand
          </div>
        </div>

        {/* Back of Card (Media Reveal) */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: '#000',
          border: `2px solid ${color}`,
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isActive ? `0 0 50px ${color}60, 0 20px 40px rgba(0,0,0,0.8)` : 'none'
        }}>
          {mediaType === 'video' ? (
            <video 
              src={mediaSrc} 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
            />
          ) : (
            <motion.img 
              src={mediaSrc} 
              alt={title}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2rem' }}
            />
          )}
          {/* Overlay gradient to ensure text readability if needed, or just a close label */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: '1.5rem',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h4>
            <div className="mono-text" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Click to Close</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Part1Slide = ({ goToSlide }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null);

  const cardsData = [
    {
      id: 1,
      title: "Time-Lapse Video",
      description: "Instead of writing notes, students record a time-lapse video to watch the plant grow quickly.",
      icon: Video,
      color: "var(--color-s)",
      mediaType: "video",
      mediaSrc: "/timelapse.mp4"
    },
    {
      id: 2,
      title: "Automatic Watering",
      description: "Students build an automatic watering system, learning basic engineering through hands-on practice.",
      icon: Droplets,
      color: "var(--color-t)",
      mediaType: "video",
      mediaSrc: "/auto.mp4"
    },
    {
      id: 3,
      title: "Modern Growth Medium",
      description: "Instead of using soil, students grow plants in glowing hydro-orbs to make science feel like magic.",
      icon: FlaskConical,
      color: "var(--color-e)",
      mediaType: "video",
      mediaSrc: "/orb.mp4"
    }
  ];

  return (
    <SlideWrapper>
      {/* Spotlight Dimming Overlay */}
      <AnimatePresence>
        {activeCardId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 40,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Navigation Breadcrumb */}
        <div 
          onClick={() => goToSlide(1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            marginBottom: isRevealed ? '2rem' : 'auto',
            alignSelf: 'flex-start',
            transition: 'margin 0.8s ease',
            zIndex: 45 // Above spotlight for escape
          }}
          className="mono-text"
        >
          <ChevronLeft size={16} /> Back to Hub
        </div>

        {/* Central Layout Container */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: isRevealed ? 'flex-start' : 'center',
          alignItems: 'center',
          flex: 1,
          width: '100%'
        }}>
          
          {/* Animated Premise Text */}
          <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            style={{ 
              textAlign: 'center',
              maxWidth: '1200px',
              marginBottom: isRevealed ? '4rem' : '2rem',
              zIndex: 30
            }}
          >
            <motion.div 
              layout
              style={{ color: 'var(--color-s)', marginBottom: '1rem' }} 
              className="mono-text"
            >
              Part 01: Being a Relevant Teacher
            </motion.div>
            
            <motion.h2 
              layout
              style={{ 
                fontSize: isRevealed ? 'clamp(1.5rem, 2.5vw, 2.5rem)' : 'clamp(3rem, 5vw, 4.5rem)',
                lineHeight: 1.3, 
                fontWeight: 300, 
                color: 'var(--text-primary)',
                transition: 'font-size 0.8s ease'
              }}
            >
              "Years have passed, yet the way we teach the <span style={{ color: 'var(--color-s)' }}>'bean experiment'</span> remains the same. 
              It is not wrong, but is it still <span style={{ color: 'var(--accent-secondary)' }}>relevant</span>?"
            </motion.h2>
          </motion.div>

          {/* Reveal Button */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 179, 0, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRevealed(true)}
                style={{
                  padding: '1.25rem 3rem',
                  fontSize: '1.25rem',
                  background: 'linear-gradient(45deg, var(--accent-primary), var(--color-e))',
                  border: 'none',
                  borderRadius: '30px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                  zIndex: 20
                }}
              >
                Reveal Modern Methods
              </motion.button>
            )}
          </AnimatePresence>

          {/* Interactive Cards Row */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
                style={{ display: 'flex', gap: '3rem', width: '100%', maxWidth: '1400px', zIndex: 45 }}
              >
                {cardsData.map((card) => (
                  <FlipCard 
                    key={card.id} 
                    {...card} 
                    isActive={activeCardId === card.id}
                    onToggle={setActiveCardId} 
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        
        {/* Next Part Button */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                zIndex: 100
              }}
            >
              <button
                onClick={() => goToSlide(4)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--accent-primary)',
                  borderRadius: '8px',
                  color: 'var(--accent-primary)',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
                className="mono-text"
              >
                Next Slide <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </SlideWrapper>
  );
};

export default Part1Slide;
