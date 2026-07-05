import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { Cpu, MessageSquare, Lightbulb, Snowflake, Database, Sparkles } from 'lucide-react';

const timelineEvents = [
  {
    year: "1940s",
    title: "The Spark",
    icon: Cpu,
    desc: (showModal) => (
      <>
        <span 
          onClick={() => showModal("/alan.png")}
          style={{ 
            color: 'var(--color-s)', 
            cursor: 'pointer', 
            fontWeight: 600, 
            borderBottom: '2px dashed var(--color-s)',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
        >
          Alan Turing
        </span> cracks the Enigma code, planting the seed: Can machines think?
      </>
    ),
    color: "var(--color-s)"
  },
  {
    year: "1950",
    title: "Turing Test",
    icon: MessageSquare,
    desc: "Turing proposes a game to define intelligence based on human-machine conversation.",
    color: "var(--color-t)"
  },
  {
    year: "1956",
    title: "Birth of AI",
    icon: Lightbulb,
    desc: "The term 'Artificial Intelligence' is coined by optimistic scientists at Dartmouth College.",
    color: "var(--color-a)"
  },
  {
    year: "1970s-90s",
    title: "AI Winters",
    icon: Snowflake,
    desc: "Progress stalls due to slow computers and lack of data. Funding dries up.",
    color: "var(--text-secondary)"
  },
  {
    year: "2000s-10s",
    title: "Data Explosion",
    icon: Database,
    desc: "Massive internet data and fast chips allow computers to learn patterns (Machine Learning).",
    color: "var(--color-e)"
  },
  {
    year: "Today",
    title: "Generative Era",
    icon: Sparkles,
    desc: "AI predicts what comes next, shifting from just analyzing things to creating things.",
    color: "var(--accent-primary)"
  }
];

const Part3HistorySlide = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        padding: '2rem 5rem'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 3 // The Evolution
          </div>
          <h2 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700 }}>
            A Brief History of AI
          </h2>
        </div>

        {/* Selected Event Details (Top Half) */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, type: 'spring' }}
              style={{
                display: 'flex', gap: '4rem', alignItems: 'center',
                background: 'var(--glass-bg)', padding: '3rem 5rem', borderRadius: '32px',
                border: `1px solid ${timelineEvents[activeIndex].color}40`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.3), inset 0 0 40px ${timelineEvents[activeIndex].color}10`,
                maxWidth: '1100px', width: '100%'
              }}
            >
              <div style={{
                width: '160px', height: '160px', borderRadius: '50%',
                background: `${timelineEvents[activeIndex].color}15`,
                border: `4px solid ${timelineEvents[activeIndex].color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: `0 0 40px ${timelineEvents[activeIndex].color}40`,
                overflow: 'hidden'
              }}>
                {timelineEvents[activeIndex].image ? (
                  <img 
                    src={timelineEvents[activeIndex].image} 
                    alt={timelineEvents[activeIndex].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  React.createElement(timelineEvents[activeIndex].icon, { size: 80, color: timelineEvents[activeIndex].color })
                )}
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', color: timelineEvents[activeIndex].color, fontWeight: 600, marginBottom: '0.5rem' }} className="mono-text">
                  {timelineEvents[activeIndex].year}
                </div>
                <h3 style={{ fontSize: '3.5rem', color: 'var(--text-primary)', margin: '0 0 1rem 0' }}>
                  {timelineEvents[activeIndex].title}
                </h3>
                <p style={{ fontSize: '1.6rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  {typeof timelineEvents[activeIndex].desc === 'function' 
                    ? timelineEvents[activeIndex].desc(setModalImage) 
                    : timelineEvents[activeIndex].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline Stepper (Bottom Half) */}
        <div style={{ position: 'relative', marginTop: '3rem', paddingBottom: '2rem' }}>
          {/* Connecting Line - vertically centered based on dot position */}
          <div style={{ position: 'absolute', top: '56px', left: '5%', right: '5%', height: '3px', background: 'var(--glass-border)', zIndex: 0 }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            {timelineEvents.map((event, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '1.2rem', width: '160px' }} onClick={() => setActiveIndex(idx)}>
                <div style={{
                  fontSize: '1.3rem', color: activeIndex === idx ? event.color : 'var(--text-secondary)',
                  fontWeight: activeIndex === idx ? 700 : 400, transition: 'all 0.3s'
                }}>
                  {event.year}
                </div>
                
                <motion.div
                  animate={{ 
                    scale: activeIndex === idx ? 1.3 : 1,
                    backgroundColor: activeIndex === idx ? event.color : 'var(--glass-bg)',
                    borderColor: activeIndex === idx ? event.color : 'var(--glass-border)'
                  }}
                  whileHover={{ scale: 1.2 }}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    border: '3px solid', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: activeIndex === idx ? `0 0 25px ${event.color}` : 'none',
                    background: 'var(--bg-surface)'
                  }}
                >
                  {activeIndex === idx && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fff' }} />}
                </motion.div>

                <div style={{
                  fontSize: '1.1rem', color: activeIndex === idx ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textAlign: 'center', fontWeight: activeIndex === idx ? 600 : 400, opacity: activeIndex === idx ? 1 : 0.7
                }}>
                  {event.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {modalImage && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setModalImage(null)}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', cursor: 'pointer'
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                style={{
                  position: 'relative', zIndex: 2010, maxWidth: '80%', maxHeight: '80vh',
                  borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <img src={modalImage} alt="Popup" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                <button
                  onClick={() => setModalImage(null)}
                  style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
                    width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer',
                    fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >&times;</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </SlideWrapper>
  );
};

export default Part3HistorySlide;
