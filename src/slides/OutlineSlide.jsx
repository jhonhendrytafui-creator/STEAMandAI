import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Waypoints, Cpu, Laptop } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const OutlineSlide = ({ goToSlide }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  const outlineItems = [
    { title: "Being a Relevant Teacher", icon: GraduationCap, color: "var(--color-s)", targetIndex: 2 },
    { title: "Interdisciplinary Learning", icon: Waypoints, color: "var(--color-a)", targetIndex: 5 },
    { title: "Artificial Intelligence", icon: Cpu, color: "var(--color-ai)", targetIndex: 6 },
    { title: "Workshop", icon: Laptop, color: "var(--color-t)", targetIndex: 7 }
  ];

  return (
    <SlideWrapper>
      <div 
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centers everything horizontally
          justifyContent: 'center', // Centers everything vertically
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 10,
          background: 'var(--bg-surface)',
          padding: '5rem',
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '4rem', textAlign: 'center' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ width: '40px', height: '2px', background: 'var(--accent-primary)' }} />
              <span className="mono-text">Agenda / Interactive Hub</span>
              <div style={{ width: '40px', height: '2px', background: 'var(--accent-primary)' }} />
            </div>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--text-primary)' }}>
              Presentation Outline
            </h1>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              marginTop: '1rem'
            }}
          >
            {outlineItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => goToSlide && goToSlide(item.targetIndex)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2.5rem',
                    padding: '1.5rem 2rem',
                    borderRadius: '16px',
                    borderLeft: `4px solid ${item.color}`,
                    background: 'rgba(255, 255, 255, 0.01)',
                    cursor: 'pointer', // Indicates it is clickable
                    transition: 'box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 30px ${item.color}20`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '24px',
                    background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)`,
                    border: '1px solid var(--glass-border)',
                    color: item.color,
                    boxShadow: `0 0 20px ${item.color}20`
                  }}>
                    <Icon size={40} />
                  </div>
                  
                  <div>
                    <div className="mono-text" style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1rem' }}>
                      Part 0{index + 1}
                    </div>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', fontWeight: 400 }}>
                      {item.title}
                    </h2>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
};

export default OutlineSlide;
