import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { BrainCircuit, PenTool, Mic, MapPin, Repeat, X } from 'lucide-react';

const strategies = [
  {
    title: "Require Metacognition & Reflection",
    icon: BrainCircuit,
    color: "#3b82f6",
    desc: "Ask students to explain how and why they arrived at an answer. Have them write a brief reflection on what they found easiest and hardest, or what sources they cross-checked to verify AI information."
  },
  {
    title: "Emphasize the Writing Process",
    icon: PenTool,
    color: "#10b981",
    desc: "Break assignments into smaller, graded, low-stakes milestones. Collect topic outlines, draft brainstorming notes, and peer-review sessions rather than just the final essay."
  },
  {
    title: "Presentation",
    icon: Mic,
    color: "#8b5cf6",
    desc: "Have students deliver short presentations, record video journals, or participate in brief, one-on-one check-ins where they must defend their work and explain their conclusions in their own words."
  },
  {
    title: "Personalized Problem",
    icon: MapPin,
    color: "#f59e0b",
    desc: "AI often generates generalized, surface-level content. Assign tasks that require students to connect theories to personal experiences, real-world community examples, or class-specific discussions."
  },
  {
    title: "AI Partner",
    icon: Repeat,
    color: "#ef4444",
    desc: "Instead of banning AI, teach students how to use it as a thought partner. Instruct them to ask AI for counterarguments or outlines, and then grade them on their ability to fact-check, critique, and vastly improve upon the AI-generated text."
  }
];

const Part3StrategiesSlide = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        padding: '2.5rem 4rem'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '0.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 3 // The Solution
          </div>
          <h2 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700 }}>
            Strategies for the AI Era
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
            Click on a card to reveal the strategy
          </p>
        </div>

        {/* Strategies Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', paddingBottom: '2rem' }}
        >
          {/* Top Row: 3 items */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {strategies.slice(0, 3).map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants} 
                onClick={() => setSelectedStrategy(item)}
                style={{
                  background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                  borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', textAlign: 'center', cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = item.color; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {React.createElement(item.icon, { size: 40, color: item.color })}
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>{item.title}</h3>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: 2 items */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', padding: '0 4rem' }}>
            {strategies.slice(3, 5).map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants} 
                onClick={() => setSelectedStrategy(item)}
                style={{
                  width: '400px',
                  background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                  borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', textAlign: 'center', cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = item.color; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {React.createElement(item.icon, { size: 40, color: item.color })}
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modal Popup */}
        <AnimatePresence>
          {selectedStrategy && (
            <div style={{
              position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300vw', height: '300vh',
              zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedStrategy(null)}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', cursor: 'pointer'
                }}
              />
              
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                style={{
                  position: 'relative', zIndex: 2010, width: '700px', maxWidth: '90%',
                  background: 'var(--bg-dark)',
                  borderRadius: '32px', padding: '4rem',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                  border: `2px solid ${selectedStrategy.color}`
                }}
              >
                <button
                  onClick={() => setSelectedStrategy(null)}
                  style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
                    width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <X size={24} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: `${selectedStrategy.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {React.createElement(selectedStrategy.icon, { size: 40, color: selectedStrategy.color })}
                  </div>
                  <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    {selectedStrategy.title}
                  </h3>
                </div>

                <div style={{ height: '2px', width: '100%', background: `linear-gradient(90deg, ${selectedStrategy.color}, transparent)`, marginBottom: '2rem' }} />

                <p style={{ fontSize: '1.5rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
                  {selectedStrategy.desc}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </SlideWrapper>
  );
};

export default Part3StrategiesSlide;
