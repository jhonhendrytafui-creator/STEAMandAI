import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, MessageCircle, Quote } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const Part2DiscussionSlide = () => {
  const [activeTab, setActiveTab] = useState('problem');
  const [timeLeft, setTimeLeft] = useState(15 * 60);
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

  const isWarning = timeLeft > 0 && timeLeft <= 60;
  const isDanger = timeLeft === 0;

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%', gap: '1.5rem'
      }}>
        {/* Header & Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em' }} className="mono-text">
              PART 2 // DISCUSSION
            </div>
            <h2 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700 }}>Critical Debate</h2>
          </div>
        </div>

        {/* Top Bar: Tabs & Timer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
          borderRadius: '16px', padding: '0.5rem', backdropFilter: 'blur(10px)'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('problem')}
              style={{
                padding: '0.75rem 1.5rem', borderRadius: '12px', border: 'none',
                background: activeTab === 'problem' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'problem' ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '1.1rem', fontWeight: activeTab === 'problem' ? 600 : 400,
                transition: 'all 0.3s ease'
              }}
            >
              The Statement
            </button>
            <button
              onClick={() => setActiveTab('poll')}
              style={{
                padding: '0.75rem 1.5rem', borderRadius: '12px', border: 'none',
                background: activeTab === 'poll' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'poll' ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '1.1rem', fontWeight: activeTab === 'poll' ? 600 : 400,
                transition: 'all 0.3s ease'
              }}
            >
              Live Poll
            </button>
          </div>

          {/* Timer Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingRight: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }} className="mono-text">
              {[5, 10, 15].map(min => (
                <button
                  key={min} onClick={() => setTimer(min)}
                  style={{
                    padding: '0.4rem 0.8rem', borderRadius: '8px',
                    border: `1px solid ${initialTime === min * 60 ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                    background: initialTime === min * 60 ? 'rgba(255, 179, 0, 0.1)' : 'transparent',
                    color: initialTime === min * 60 ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s'
                  }}
                >
                  {min}m
                </button>
              ))}
            </div>

            <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                fontSize: '1.75rem', fontWeight: 600,
                color: isDanger ? 'var(--accent-secondary)' : isWarning ? 'var(--accent-primary)' : 'var(--text-primary)',
                fontFamily: 'JetBrains Mono, monospace', width: '90px', textAlign: 'center', transition: 'color 0.3s'
              }}>
                {formatTime(timeLeft)}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={toggleTimer}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                    background: isTimerActive ? 'rgba(229, 57, 53, 0.2)' : 'rgba(255, 179, 0, 0.2)',
                    color: isTimerActive ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}
                >
                  {isTimerActive ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={resetTimer}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                    background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
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
          flex: 1, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
          borderRadius: '24px', overflow: 'hidden', position: 'relative', backdropFilter: 'blur(20px)'
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
                  display: 'flex', height: '100%', width: '100%', padding: '4rem', gap: '4rem',
                  alignItems: 'center'
                }}
              >
                {/* Visual Side (Replacing Video) */}
                <div style={{
                  flex: '0 0 35%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--glass-border)',
                  padding: '3rem', height: '100%', textAlign: 'center'
                }}>
                  <div style={{
                    width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255, 179, 0, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem',
                    border: '1px solid var(--accent-primary)', boxShadow: '0 0 30px rgba(255, 179, 0, 0.2)'
                  }}>
                    <MessageCircle size={60} color="var(--accent-primary)" />
                  </div>
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', margin: '0 0 1rem 0' }}>The Challenge</h3>
                  <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    Analyze the statement on the right and construct a well-reasoned response with your group.
                  </p>
                </div>

                {/* Text Side */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', padding: '3rem 4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', borderLeft: '6px solid var(--accent-primary)' }}>
                    <Quote size={60} color="var(--accent-primary)" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', opacity: 0.2 }} />
                    <p style={{
                      fontSize: '2.4rem', lineHeight: 1.4, color: 'var(--text-primary)', margin: '0 0 1.5rem 0', fontStyle: 'italic', position: 'relative', zIndex: 1
                    }}>
                      "Combining subjects is a great idea, but it makes students learn less about the core subjects. It also takes way too much time for teachers to plan together."
                    </p>
                  </div>

                  <div style={{ marginTop: '3rem', padding: '2rem 3rem', background: 'rgba(255, 179, 0, 0.05)', borderRadius: '16px', border: '1px solid var(--accent-primary)' }}>
                    <h4 style={{ fontSize: '1.6rem', color: 'var(--accent-primary)', margin: '0 0 0.5rem 0' }}>Your Task:</h4>
                    <p style={{ fontSize: '1.6rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Do you agree or disagree? How would you respond? Explain your reasons.
                    </p>
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
                style={{ height: '100%', width: '100%', background: '#fff' }}
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

export default Part2DiscussionSlide;
