import React from 'react';
import { motion } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { MessageSquare, Workflow, Bot } from 'lucide-react';

const Part3LevelsSlide = () => {
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
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
            Part 3 // The Journey
          </div>
          <h2 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 700 }}>
            Levels of AI Integration
          </h2>
        </div>

        {/* 3 Pillars */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
            alignItems: 'end',
            paddingBottom: '2rem'
          }}
        >
          {/* Level 1: Prompting */}
          <motion.div variants={itemVariants} style={{ height: '70%', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              flex: 1, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '24px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#3b82f6' }} />
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <MessageSquare size={40} color="#3b82f6" />
              </div>
              <div className="mono-text" style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>Level 1</div>
              <h3 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: '0 0 1rem 0' }}>Simple Prompting</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Conversational use. Asking a chatbot a direct question or giving it a one-off task, like drafting an email or explaining a concept.
              </p>
            </div>
          </motion.div>

          {/* Level 2: Workflow */}
          <motion.div variants={itemVariants} style={{ height: '85%', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              flex: 1, background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '24px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#a855f7' }} />
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <Workflow size={40} color="#a855f7" />
              </div>
              <div className="mono-text" style={{ color: '#a855f7', marginBottom: '0.5rem' }}>Level 2</div>
              <h3 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: '0 0 1rem 0' }}>AI Workflow</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Systematic use. Chaining multiple AI tools or prompts together to create a repeatable process, like a structured lesson planning pipeline.
              </p>
            </div>
          </motion.div>

          {/* Level 3: Automation */}
          <motion.div variants={itemVariants} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              flex: 1, background: 'rgba(255, 179, 0, 0.1)', border: '1px solid var(--accent-primary)',
              borderRadius: '24px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 40px rgba(255, 179, 0, 0.15)'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--accent-primary)' }} />
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255, 179, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <Bot size={40} color="var(--accent-primary)" />
              </div>
              <div className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Level 3</div>
              <h3 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: '0 0 1rem 0' }}>AI Automation</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Autonomous use. Agents running in the background without constant supervision, handling complex, multi-step tasks independently.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default Part3LevelsSlide;
