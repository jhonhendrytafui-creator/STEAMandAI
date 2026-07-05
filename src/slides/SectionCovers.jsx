import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';

const CoverSlide = ({ title, subtitle, color, partNumber }) => {
  return (
    <SlideWrapper>
      <div 
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 10,
          background: 'var(--bg-surface)',
          padding: '5rem',
          textAlign: 'center',
          borderTop: `4px solid ${color}`
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mono-text" style={{ color: color, marginBottom: '1rem', fontSize: '1.25rem' }}>
            Part 0{partNumber}
          </div>
          <h1 style={{ fontSize: 'clamp(4rem, 6vw, 6rem)', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {title}
          </h1>
          {subtitle && (
            <h2 style={{ fontSize: '2rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
              {subtitle}
            </h2>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ position: 'absolute', bottom: '4rem', color: 'var(--text-secondary)' }}
          className="mono-text"
        >
          Press space or arrow keys to continue
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export const Part1Cover = () => <CoverSlide partNumber={1} title="Being a Relevant Teacher" color="var(--color-s)" />;
export const Part2Cover = () => <CoverSlide partNumber={2} title="Multidisciplinary and Interdisciplinary Learning" color="var(--color-a)" />;
export const Part3Cover = () => <CoverSlide partNumber={3} title="Artificial Intelligence" color="var(--color-ai)" />;
export const Part4Cover = () => <CoverSlide partNumber={4} title="Workshop" color="var(--color-t)" />;
