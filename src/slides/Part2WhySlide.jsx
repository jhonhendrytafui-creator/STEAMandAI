import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { Target, Brain, Globe, Briefcase, Lightbulb } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: "High-Quality Anchor Tasks",
    desc: "Increases the quality of anchor tasks given to students, allowing them to deeply explore complex ideas.",
    color: "var(--color-s)"
  },
  {
    icon: Brain,
    title: "Emphasize 4C Skills",
    desc: "Naturally builds Critical Thinking, Creativity, Collaboration, and Communication into everyday learning.",
    color: "var(--color-a)"
  },
  {
    icon: Globe,
    title: "Real-World Context",
    desc: "Provides real-world contextual problems to the class, making learning much more relevant.",
    color: "var(--color-e)"
  },
  {
    icon: Briefcase,
    title: "Future Readiness",
    desc: "Prepares students for future careers where combining multiple skills and domains is essential.",
    color: "var(--color-t)"
  },
  {
    icon: Lightbulb,
    title: "Deeper Innovation",
    desc: "Encourages innovative solutions by teaching students to connect completely different ideas together.",
    color: "var(--color-m)"
  }
];

const ReasonCard = ({ title, icon: Icon, color, delay, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: delay, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ 
        y: -10, 
        scale: 1.05,
        boxShadow: `0 20px 40px ${color}20, 0 0 0 1px ${color}35`,
        borderColor: color
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        flex: '1 1 200px',
        maxWidth: '260px',
        height: '240px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        borderTop: `4px solid ${color}`,
        borderRadius: '20px',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: `${color}15`,
        marginBottom: '1.5rem',
        border: `1px solid ${color}25`,
        boxShadow: `0 0 15px ${color}08`
      }}>
        <Icon size={36} color={color} style={{ filter: `drop-shadow(0 0 6px ${color}30)` }} />
      </div>
      <h3 style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.2 }}>{title}</h3>
      <div style={{ fontSize: '0.9rem', color: color }} className="mono-text">
        Click to reveal
      </div>
    </motion.div>
  );
};

const Part2WhySlide = () => {
  const [selectedReason, setSelectedReason] = useState(null);

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        padding: '3rem 5rem', justifyContent: 'center', alignItems: 'center'
      }}>
        {/* Header - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 2 // The Purpose
          </div>
          <h2 style={{ fontSize: '4rem', margin: 0, fontWeight: 700 }}>
            Why we need Multi-Interdisciplinary Learning
          </h2>
        </motion.div>

        {/* Content - Interactive Grid */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '1400px',
          width: '100%'
        }}>
          {reasons.map((reason, idx) => (
            <ReasonCard 
              key={idx} 
              {...reason} 
              delay={0.2 + idx * 0.1}
              onClick={() => setSelectedReason(reason)}
            />
          ))}
        </div>

        {/* Popup Detail Modal */}
        <AnimatePresence>
          {selectedReason !== null && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedReason(null)}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', cursor: 'pointer'
                }}
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                style={{
                  width: '70vw', maxWidth: '1000px',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${selectedReason.color}35`,
                  borderTop: `6px solid ${selectedReason.color}`,
                  borderRadius: '32px',
                  boxShadow: `0 35px 80px ${selectedReason.color}25, 0 20px 60px rgba(0,0,0,0.8)`,
                  padding: '5rem', zIndex: 1010, position: 'relative',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedReason(null)}
                  style={{
                    position: 'absolute', top: '2rem', right: '3rem',
                    background: 'none', border: 'none', color: 'var(--text-secondary)',
                    cursor: 'pointer', fontSize: '3rem', transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = selectedReason.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  &times;
                </button>

                <div style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  width: '120px', height: '120px', borderRadius: '50%',
                  background: `${selectedReason.color}15`, border: `1px solid ${selectedReason.color}25`,
                  marginBottom: '2.5rem'
                }}>
                  <selectedReason.icon size={64} color={selectedReason.color} />
                </div>
                
                <h2 style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2rem 0' }}>
                  {selectedReason.title}
                </h2>
                
                <p style={{ fontSize: '2.2rem', lineHeight: 1.5, color: 'var(--text-secondary)', margin: 0, maxWidth: '800px' }}>
                  {selectedReason.desc}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </SlideWrapper>
  );
};

export default Part2WhySlide;
