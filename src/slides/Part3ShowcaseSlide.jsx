import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { Sparkles, BookOpen, UserCheck } from 'lucide-react';

const tabs = [
  { id: 'assessment', label: 'STEAM Assessment', icon: Sparkles, video: '/steamai.mp4' },
  { id: 'academy', label: 'Teacher Academy', icon: BookOpen, video: '/ta.mp4' },
  { id: 'assistant', label: 'Teacher Assistant', icon: UserCheck, video: '/lp.mp4' }
];

const Part3ShowcaseSlide = () => {
  const [activeTab, setActiveTab] = useState('assessment');

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        padding: '2rem 4rem'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '0.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 3 // The Tools
          </div>
          <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: 700 }}>
            AI Tools for Teachers
          </h2>
        </div>

        {/* Browser Mockup */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{
              width: '100%', maxWidth: '1400px', height: '75vh',
              background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
            }}
          >
            {/* Window Controls & Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0 1rem', borderBottom: '1px solid var(--glass-border)', height: '50px' }}>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginRight: '2rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              </div>

              <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', gap: '0.5rem' }}>
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      height: '40px', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
                      background: activeTab === tab.id ? 'var(--bg-surface)' : 'rgba(255,255,255,0.05)',
                      borderRadius: '8px 8px 0 0', cursor: 'pointer',
                      border: '1px solid var(--glass-border)', borderBottom: 'none',
                      color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      boxShadow: activeTab === tab.id ? '0 -5px 15px rgba(0,0,0,0.2)' : 'none',
                      transition: 'all 0.2s', position: 'relative', zIndex: activeTab === tab.id ? 2 : 1
                    }}
                  >
                    {React.createElement(tab.icon, { size: 16 })}
                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>{tab.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Content */}
            <div style={{ flex: 1, position: 'relative', background: '#000' }}>
              <AnimatePresence mode="wait">
                {tabs.map((tab) => activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  >
                    <video 
                      src={tab.video} 
                      autoPlay loop muted playsInline 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
};

export default Part3ShowcaseSlide;
