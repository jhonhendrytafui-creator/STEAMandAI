import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { Cpu, User, ArrowRightLeft, Heart, Zap, Brain, Target, Shield, CheckCircle } from 'lucide-react';

const Part3CollaboratorSlide = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        padding: '3rem 5rem'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 3 // The Future
          </div>
          <h2 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700 }}>
            AI as a Collaborative Partner
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}
        >
          {/* AI Side */}
          <motion.div variants={itemVariants} style={{
            flex: 1, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '24px', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Cpu size={40} color="#3b82f6" />
            </div>
            <h3 style={{ fontSize: '2.5rem', color: '#3b82f6', margin: '0 0 2rem 0' }}>The AI</h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                <Zap color="#3b82f6" size={24} /> High-speed data processing
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                <CheckCircle color="#3b82f6" size={24} /> Rapid drafting & rubrics
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                <Brain color="#3b82f6" size={24} /> Complex pattern recognition
              </li>
            </ul>
          </motion.div>

          {/* Connection */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRightLeft size={64} color="var(--accent-primary)" style={{ opacity: 0.5 }} />
            <div style={{ marginTop: '1rem', color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '0.1em' }} className="mono-text">SYNERGY</div>
          </motion.div>

          {/* Human Side */}
          <motion.div variants={itemVariants} style={{
            flex: 1, background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '24px', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <User size={40} color="#a855f7" />
            </div>
            <h3 style={{ fontSize: '2.5rem', color: '#a855f7', margin: '0 0 2rem 0' }}>The Teacher</h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                <Heart color="#a855f7" size={24} /> Empathy & student connection
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                <Shield color="#a855f7" size={24} /> Ethical judgment & context
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                <Target color="#a855f7" size={24} /> Inspiring motivation & curiosity
              </li>
            </ul>
          </motion.div>

        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default Part3CollaboratorSlide;
