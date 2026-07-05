import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { Bot, Database } from 'lucide-react';

const Part3HowAIThinksSlide = () => {
  return (
    <SlideWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        padding: '2rem 4rem'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '0.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 3 // The Mechanics
          </div>
          <h2 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700 }}>
            How AI Thinks
          </h2>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem' }}>
          
          {/* Prompt Simulation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50px',
              padding: '1.25rem 3.5rem',
              display: 'flex', alignItems: 'center', gap: '1.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ background: 'var(--accent-primary)', borderRadius: '50%', padding: '0.6rem', color: '#000' }}>
              <Bot size={28} />
            </div>
            <p style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'monospace' }}>
              "Generate an image of a person writing with their <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>left hand</span>."
            </p>
          </motion.div>

          {/* Images */}
          <div style={{ display: 'flex', gap: '3.5rem', width: '100%', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                width: '360px', height: '360px',
                background: 'var(--glass-bg)', borderRadius: '24px',
                border: '1px solid var(--glass-border)', padding: '1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative'
              }}
            >
              <img src="/left.png" alt="AI Generated 1" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'rgba(229, 57, 53, 0.9)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
                Right Handed!
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                width: '360px', height: '360px',
                background: 'var(--glass-bg)', borderRadius: '24px',
                border: '1px solid var(--glass-border)', padding: '1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative'
              }}
            >
              <img src="/left1.png" alt="AI Generated 2" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'rgba(229, 57, 53, 0.9)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
                Right Handed!
              </div>
            </motion.div>
          </div>

          {/* Takeaway / Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '1.5rem',
              background: 'rgba(255, 179, 0, 0.1)', border: '1px solid var(--accent-primary)',
              borderRadius: '24px', padding: '1.5rem 3rem', maxWidth: '950px',
              boxShadow: '0 10px 20px rgba(255,179,0,0.1)'
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <Database size={48} color="var(--accent-primary)" />
            </div>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              AI doesn't <strong style={{ color: 'var(--text-primary)' }}>understand</strong> what "left-handed" means. It generates images based on the patterns it saw most frequently in its database—where almost everyone writes with their right hand.
            </p>
          </motion.div>

        </div>
      </div>
    </SlideWrapper>
  );
};

export default Part3HowAIThinksSlide;
