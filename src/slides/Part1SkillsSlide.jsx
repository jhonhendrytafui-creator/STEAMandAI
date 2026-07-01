import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Users, MessageSquare, ChevronLeft } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const SkillCard = ({ title, icon: Icon, color, delay, onClick }) => {
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
        flex: '1 1 220px',
        maxWidth: '280px',
        height: '220px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
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
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        position: 'relative'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: `${color}15`,
        marginBottom: '1.25rem',
        border: `1px solid ${color}25`,
        boxShadow: `0 0 15px ${color}08`
      }}>
        <Icon size={32} color={color} style={{ filter: `drop-shadow(0 0 6px ${color}30)` }} />
      </div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>{title}</h3>
      <div style={{ fontSize: '0.85rem', color: color }} className="mono-text">
        Click for details
      </div>
    </motion.div>
  );
};

const Part1SkillsSlide = ({ goToSlide }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillsData = [
    {
      title: "Critical Thinking",
      icon: Brain,
      color: "var(--color-s)", // Gold
      bullets: [
        "Focuses on solving puzzles and real-world problems.",
        "Encourages students to ask questions and think for themselves.",
        "Helps students find accurate information and separate facts from opinions.",
        "Teaches students how to find the truth, not just memorize facts."
      ]
    },
    {
      title: "Creative Thinking",
      icon: Sparkles,
      color: "var(--color-e)", // Vermilion
      bullets: [
        "Teaches students to think outside the box.",
        "Helps students look at problems from different angles.",
        "Encourages trying new ideas and experimenting.",
        "Shows that making mistakes is a natural part of learning."
      ]
    },
    {
      title: "Collaboration",
      icon: Users,
      color: "var(--color-a)", // Rose
      bullets: [
        "Teaches students to work together toward a common goal.",
        "Helps teams discuss ideas and choose the best solution.",
        "Shows how to value different opinions and work as a team.",
        "Prepares students to work with others throughout their lives."
      ]
    },
    {
      title: "Communication",
      icon: MessageSquare,
      color: "var(--color-m)", // Violet
      bullets: [
        "Teaches how to share ideas clearly and directly.",
        "Helps write clear emails and messages where tone is hard to show.",
        "Helps students understand their audience and keep them interested.",
        "Makes it easy to express ideas and make a positive impression."
      ]
    }
  ];

  return (
    <SlideWrapper>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          marginBottom: isRevealed ? '1.5rem' : 'auto',
          transition: 'margin 0.8s ease',
          zIndex: 45 
        }}>
          <div 
            onClick={() => goToSlide(3)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              alignSelf: 'flex-start'
            }}
            className="mono-text"
          >
            <ChevronLeft size={16} /> Back to Slide 1
          </div>
          
          <div 
            onClick={() => goToSlide(1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              alignSelf: 'flex-start'
            }}
            className="mono-text"
          >
            Hub <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          </div>
        </div>

        {/* Central Layout Container (Centering Content in the Middle) */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          width: '100%',
          gap: '2.5rem'
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
              zIndex: 30
            }}
          >
            <motion.div 
              layout
              style={{ color: 'var(--color-s)', marginBottom: '1rem' }} 
              className="mono-text"
            >
              Part 01: Becoming a Relevant Teacher
            </motion.div>
            
            <motion.h2 
              layout
              style={{ 
                fontSize: isRevealed ? 'clamp(1.5rem, 2.5vw, 2.5rem)' : 'clamp(3rem, 5vw, 4.5rem)',
                lineHeight: 1.35, 
                fontWeight: 300, 
                color: 'var(--text-primary)',
                transition: 'font-size 0.8s ease'
              }}
            >
              What kind of teaching <span style={{ color: 'var(--accent-primary)' }}>is relevant</span> in this era?
            </motion.h2>
          </motion.div>

          {/* Reveal Button */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(255, 179, 0, 0.5)' }}
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
                Reveal Core Skills
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
                style={{ 
                  display: 'flex', 
                  gap: '2.5rem', 
                  width: '100%', 
                  maxWidth: '1400px', 
                  zIndex: 45,
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {skillsData.map((skill, index) => (
                  <SkillCard 
                    key={index} 
                    {...skill} 
                    delay={index * 0.1}
                    onClick={() => setSelectedSkill(skill)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* P21 Framework Context Info (Now below the cards, with ESL simplification) */}
          <AnimatePresence>
            {isRevealed && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  maxWidth: '950px',
                  fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  fontWeight: 300,
                  textAlign: 'center',
                  margin: '0 auto',
                  zIndex: 30
                }}
              >
                Based on the <strong>P21 Framework (Partnership for 21st Century Learning)</strong> by Battelle for Kids—a US initiative uniting business, education, and government to define key student skills.
              </motion.p>
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
                onClick={() => goToSlide(1)}
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
                Next Part <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popup Detail Modal (Enlarged to 80% screen size with very large ESL fonts) */}
        <AnimatePresence>
          {selectedSkill !== null && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSkill(null)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  cursor: 'pointer'
                }}
              />

              {/* Modal Content - Covers 80% of Viewport */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                style={{
                  width: '80vw',
                  height: '80vh',
                  background: '#0d0d0d',
                  border: `1px solid ${selectedSkill.color}35`,
                  borderTop: `8px solid ${selectedSkill.color}`,
                  borderRadius: '32px',
                  boxShadow: `0 35px 80px ${selectedSkill.color}25, 0 20px 60px rgba(0,0,0,0.8)`,
                  padding: '4.5rem 5rem',
                  zIndex: 1010,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  boxSizing: 'border-box'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedSkill(null)}
                  style={{
                    position: 'absolute',
                    top: '2.5rem',
                    right: '3.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '3.5rem',
                    lineHeight: 1,
                    padding: 0,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = selectedSkill.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  &times;
                </button>

                {/* Modal Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3.5rem', flexShrink: 0 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    background: `${selectedSkill.color}15`,
                    border: `1px solid ${selectedSkill.color}25`
                  }}>
                    <selectedSkill.icon size={48} color={selectedSkill.color} />
                  </div>
                  <h2 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    {selectedSkill.title}
                  </h2>
                </div>

                {/* Modal Bullets - Scrollable if content overflows */}
                <div style={{ width: '100%', overflowY: 'auto', flex: 1, paddingRight: '1rem' }}>
                  <ul style={{
                    width: '100%',
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                  }}>
                    {selectedSkill.bullets.map((bullet, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.08 }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1.5rem',
                          fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)',
                          lineHeight: 1.5,
                          color: 'var(--text-secondary)',
                          textAlign: 'left'
                        }}
                      >
                        {/* Bullet Custom Dot with color */}
                        <span style={{
                          display: 'inline-block',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: selectedSkill.color,
                          marginTop: '0.85rem',
                          flexShrink: 0,
                          boxShadow: `0 0 12px ${selectedSkill.color}`
                        }} />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
      </div>
    </SlideWrapper>
  );
};

export default Part1SkillsSlide;
