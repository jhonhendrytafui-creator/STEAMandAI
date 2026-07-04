import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ListChecks } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const Part1DiscussionSlide = () => {
  const [activeTab, setActiveTab] = useState('problem'); // 'problem' or 'poll'
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(15 * 60); // Default 15 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [initialTime, setInitialTime] = useState(15 * 60);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setTimer = (minutes) => {
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setInitialTime(seconds);
    setIsTimerActive(false);
  };

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsTimerActive(!isTimerActive);
    }
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsTimerActive(false);
  };

  const isWarning = timeLeft > 0 && timeLeft <= 60; // Last minute warning
  const isDanger = timeLeft === 0;

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        gap: '1.5rem'
      }}>
        
        {/* Header & Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em' }} className="mono-text">
              PART 1 // DISCUSSION
            </div>
            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Survival Scenario</h2>
          </div>
        </div>

        {/* Top Bar: Tabs & Timer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '0.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('problem')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'problem' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'problem' ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: activeTab === 'problem' ? 600 : 400,
                transition: 'all 0.3s ease'
              }}
            >
              The Scenario
            </button>
            <button
              onClick={() => setActiveTab('poll')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === 'poll' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'poll' ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: activeTab === 'poll' ? 600 : 400,
                transition: 'all 0.3s ease'
              }}
            >
              Live Poll
            </button>
          </div>

          {/* Timer Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingRight: '1rem' }}>
            {/* Presets */}
            <div style={{ display: 'flex', gap: '0.5rem' }} className="mono-text">
              {[5, 10, 15].map(min => (
                <button
                  key={min}
                  onClick={() => setTimer(min)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    border: `1px solid ${initialTime === min * 60 ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                    background: initialTime === min * 60 ? 'rgba(255, 179, 0, 0.1)' : 'transparent',
                    color: initialTime === min * 60 ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {min}m
                </button>
              ))}
            </div>

            <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }} />

            {/* Timer Display & Action */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: isDanger ? 'var(--accent-secondary)' : isWarning ? 'var(--accent-primary)' : 'var(--text-primary)',
                fontFamily: 'JetBrains Mono, monospace',
                width: '90px',
                textAlign: 'center',
                transition: 'color 0.3s'
              }}>
                {formatTime(timeLeft)}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={toggleTimer}
                  style={{
                    width: '36px', height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: isTimerActive ? 'rgba(229, 57, 53, 0.2)' : 'rgba(255, 179, 0, 0.2)',
                    color: isTimerActive ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {isTimerActive ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={resetTimer}
                  style={{
                    width: '36px', height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Reset Timer"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          backdropFilter: 'blur(20px)'
        }}>
          <AnimatePresence mode="wait">
            {activeTab === 'problem' ? (
              <motion.div
                key="problem"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  height: '100%',
                  width: '100%',
                  padding: '2rem',
                  gap: '2rem'
                }}
              >
                {/* Video Side */}
                <div style={{
                  flex: '0 0 45%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--glass-border)',
                  background: '#000'
                }}>
                  <video
                    src="/problem1.mp4"
                    autoPlay
                    loop
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Text Side */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.5rem', background: 'rgba(229, 57, 53, 0.15)', borderRadius: '8px', color: 'var(--accent-secondary)' }}>
                      <ListChecks size={28} />
                    </div>
                    <h3 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: 0 }}>The Challenge</h3>
                  </div>
                  
                  <p style={{
                    fontSize: '1.5rem',
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem'
                  }}>
                    Your plane has crashed in the Sahara Desert. The pilot is dead, and the wreckage is burned. You have exactly 5 items remaining. 
                    <br/><br/>
                    <strong style={{ color: 'var(--text-primary)' }}>Your goal:</strong> Rank these items from most critical (1) to least critical (5) for your survival.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      "A parachute",
                      "A magnetic compass",
                      "A pistol",
                      "A gallon of water",
                      "A solar-powered flashlight"
                    ].map((item, index) => (
                      <div key={index} style={{
                        padding: '1rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        fontSize: '1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <div style={{ 
                          width: '24px', height: '24px', 
                          borderRadius: '50%', 
                          border: '1px solid var(--text-secondary)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.8rem', color: 'var(--text-secondary)'
                        }}>
                          ?
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="poll"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                style={{
                  height: '100%',
                  width: '100%',
                  background: '#fff' // White background usually preferred for external poll iframes
                }}
              >
                <iframe
                  src="https://poll.pahoacourse.online/present/PAHOA"
                  title="Live Discussion Poll"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allowFullScreen
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </SlideWrapper>
  );
};

export default Part1DiscussionSlide;
