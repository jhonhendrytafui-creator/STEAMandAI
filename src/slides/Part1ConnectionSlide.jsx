import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, Combine, 
  Compass, MessageCircle, BookOpen, Lightbulb, PenTool, Target 
} from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const Bubble = ({ children, size, color, delay, duration, icon: Icon, main, isFloating, onClick, styleProps, animateProps, transitionProps }) => {
  // Outer div positions the center point.
  // Inner motion.div is offset by -size/2 to perfectly center itself around that point,
  // allowing x, y, rotate, and scale to animate purely from the center without calc() or translate(-50%, -50%).
  
  const outerStyle = {
    position: 'absolute',
    top: styleProps?.top !== undefined ? styleProps.top : '50%',
    left: styleProps?.left !== undefined ? styleProps.left : '50%',
    width: 0,
    height: 0,
    zIndex: styleProps?.zIndex || (main ? 10 : 2),
    pointerEvents: styleProps?.pointerEvents || 'auto',
  };

  const innerStyle = {
    position: 'absolute',
    top: -size / 2,
    left: -size / 2,
    width: size,
    height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle at 35% 25%, ${color}80 0%, ${color}30 50%, ${color}10 100%)`,
    border: `1px solid ${color}`,
    boxShadow: `
      inset -15px -15px 30px rgba(0,0,0,0.6), 
      inset 10px 10px 20px rgba(255,255,255,0.25), 
      0 15px 35px rgba(0,0,0,0.5), 
      0 0 25px ${color}60
    `,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '1rem',
    cursor: main ? 'pointer' : 'default',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    ...styleProps?.inner // allow overrides if needed
  };

  const animation = animateProps || (isFloating ? { 
    opacity: 1, 
    scale: 1,
    y: [0, -15, 0],
    x: [0, 10, 0]
  } : {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0
  });

  const transition = transitionProps || (animateProps ? { duration: 0.6, type: 'spring', bounce: 0.3 } : {
    opacity: { duration: 0.8, delay },
    scale: { type: 'spring', stiffness: 100, delay },
    y: { repeat: Infinity, duration: duration, ease: "easeInOut", delay: delay * 0.5 },
    x: { repeat: Infinity, duration: duration * 1.2, ease: "easeInOut", delay: delay * 0.7 }
  });

  return (
    <div style={outerStyle}>
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
        animate={animation}
        transition={transition}
        whileHover={main ? { scale: 1.1, boxShadow: `0 0 50px ${color}A0` } : { scale: 1.05 }}
        onClick={onClick}
        style={innerStyle}
      >
        {Icon && (
          <div style={{ marginBottom: '0.5rem' }}>
            <Icon size={main ? 36 : 24} color={color} style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
          </div>
        )}
        <span style={{ 
          fontSize: main ? '1.25rem' : '0.95rem', 
          fontWeight: main ? 700 : 600,
          color: '#fff',
          lineHeight: 1.2,
          textShadow: '0 2px 5px rgba(0,0,0,0.9)'
        }}>
          {children}
        </span>
      </motion.div>
    </div>
  );
};

const Part1ConnectionSlide = ({ goToSlide }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChild, setActiveChild] = useState(null);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) setActiveChild(null); // Reset when closing
  };

  // Sub-elements data
  const childElements = [
    { title: "Exploration", icon: Compass, color: "#FF9800" },
    { title: "Structured Discussion", icon: MessageCircle, color: "#00BCD4" },
    { title: "Reading", icon: BookOpen, color: "#4CAF50" },
    { title: "Reflection", icon: Lightbulb, color: "#FFC107" },
    { title: "Journal Writing", icon: PenTool, color: "#E91E63" },
    { title: "Practice", icon: Target, color: "#9C27B0" }
  ];

  const radius = 250;
  const centerX = 300;
  const centerY = 300;

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        gap: '1.5rem'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.1em' }} className="mono-text">
              PART 1 // CONNECTION
            </div>
            <h2 style={{ fontSize: '3rem', margin: 0 }}>Implementing the 4Cs</h2>
          </div>
        </div>

        {/* Content Area - The Visualization */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingRight: '350px' // Provides space between animation and text box
        }}>
          
          {/* Main 4C Framework Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
            style={{
              position: 'relative',
              width: '600px',
              height: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Outer Framework Circle (Fades out when expanded) */}
            <motion.div
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '2px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 0 100px rgba(255, 179, 0, 0.05), inset 0 0 60px rgba(255, 255, 255, 0.02)'
              }}
            />

            {/* Rotating Dashed Ring (Fades out when expanded) */}
            <motion.div
              animate={{ 
                rotate: 360,
                opacity: isExpanded ? 0 : 1 
              }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 40, ease: "linear" },
                opacity: { duration: 0.5 }
              }}
              style={{
                position: 'absolute',
                top: '-5%', left: '-5%', right: '-5%', bottom: '-5%',
                borderRadius: '50%',
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                zIndex: 0
              }}
            />

            {/* Framework Title (Fades out) */}
            <motion.div 
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '5%',
                width: '100%',
                textAlign: 'center',
                zIndex: 1
              }}
            >
              <h3 style={{ 
                fontSize: '2rem', 
                color: 'var(--text-secondary)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}>
                The 4C Framework
              </h3>
            </motion.div>

            {/* Background Bubbles (Fade out when expanded) */}
            <motion.div
              animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.8 : 1 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
            >
              <Bubble 
                main 
                size={210} 
                color="#E53935" 
                delay={0.6} 
                duration={6} 
                icon={Combine} 
                isFloating 
                onClick={() => goToSlide && goToSlide(1)}
                styleProps={{ top: 380, left: 400, pointerEvents: 'auto' }}
              >
                Interdisciplinary and Multidisciplinary
              </Bubble>
              <Bubble size={110} color="#9C27B0" delay={0.8} duration={4.5} isFloating styleProps={{ top: 450, left: 200 }}>
                Design Thinking
              </Bubble>
              <Bubble size={120} color="#2196F3" delay={0.9} duration={5.5} isFloating styleProps={{ top: 200, left: 450 }}>
                Project-Based Learning
              </Bubble>
              <Bubble size={90} color="#4CAF50" delay={1.0} duration={4} isFloating styleProps={{ top: 350, left: 120 }}>
                SEL
              </Bubble>
            </motion.div>

            {/* Revolving Container for 6 Elements */}
            <motion.div
              animate={{ 
                rotate: isExpanded ? 360 : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 40, ease: "linear" },
                opacity: { duration: 0.5 }
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                pointerEvents: isExpanded ? 'auto' : 'none',
                zIndex: 40
              }}
            >
              {childElements.map((child, index) => {
                const angle = (index * (360 / 6)) * (Math.PI / 180);
                const expandedX = centerX + radius * Math.cos(angle);
                const expandedY = centerY + radius * Math.sin(angle);

                return (
                  <Bubble
                    key={index}
                    size={140}
                    color={child.color}
                    icon={child.icon}
                    main={false}
                    onClick={() => setActiveChild(child.title)}
                    styleProps={{
                      top: 0,
                      left: 0,
                      pointerEvents: isExpanded ? 'auto' : 'none',
                      cursor: 'pointer'
                    }}
                    animateProps={{
                      x: isExpanded ? expandedX : centerX,
                      y: isExpanded ? expandedY : centerY,
                      scale: isExpanded ? 1 : 0,
                      opacity: isExpanded ? 1 : 0, // Ensure they fade in!
                      rotate: isExpanded ? -360 : 0 // Counter-rotate to stay upright
                    }}
                    transitionProps={{
                      x: { duration: 0.8, type: 'spring', bounce: 0.2 },
                      y: { duration: 0.8, type: 'spring', bounce: 0.2 },
                      scale: { duration: 0.8, type: 'spring', bounce: 0.2 },
                      opacity: { duration: 0.3 },
                      rotate: { repeat: Infinity, duration: 40, ease: "linear" }
                    }}
                  >
                    {child.title}
                  </Bubble>
                );
              })}
            </motion.div>

            {/* The Central Interactive Bubble (6 Elements) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 50, pointerEvents: 'none' }}>
              <Bubble 
                main 
                size={isExpanded ? 240 : 190} 
                color="#FFB300" 
                icon={Layers}
                onClick={toggleExpand}
                styleProps={{
                  top: 0,
                  left: 0,
                  pointerEvents: 'auto' // Make just the bubble clickable
                }}
                animateProps={{
                  x: isExpanded ? centerX : 200,
                  y: isExpanded ? centerY : 220,
                  opacity: 1,
                  scale: 1,
                }}
                transitionProps={{
                  x: { duration: 0.8, type: 'spring', bounce: 0.2 },
                  y: { duration: 0.8, type: 'spring', bounce: 0.2 },
                  scale: { duration: 0.8, type: 'spring', bounce: 0.2 }
                }}
              >
                6 Elements of Teaching
              </Bubble>
            </div>

          </motion.div>

          {/* Context/Explanation Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: isExpanded ? 0 : 1, 
              x: isExpanded ? 50 : 0 
            }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              right: '3%',
              width: '400px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              pointerEvents: isExpanded ? 'none' : 'auto'
            }}
          >
            <h4 style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>
              How do we get there?
            </h4>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              The 4C Skills form our ultimate goal framework. To successfully achieve this in our classrooms, we rely on concrete methodologies like the <strong style={{ color: 'var(--text-primary)' }}>6 Elements of Teaching</strong> and <strong style={{ color: 'var(--text-primary)' }}>Interdisciplinary Learning</strong>.
            </p>
          </motion.div>

          {/* Structured Discussion Techniques List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: (isExpanded && activeChild === 'Structured Discussion') ? 1 : 0, 
              x: (isExpanded && activeChild === 'Structured Discussion') ? 0 : 50 
            }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              right: '3%',
              width: '420px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--accent-primary)',
              borderRadius: '24px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              pointerEvents: (isExpanded && activeChild === 'Structured Discussion') ? 'auto' : 'none',
              zIndex: 100
            }}
          >
            <h4 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', marginBottom: '1.5rem', fontWeight: 600, lineHeight: 1.2 }}>
              6 Techniques of<br/>Structured Discussion
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                "Revoicing (Paraphrasing)", 
                "Scaffolding (Asking Questions)", 
                "Organizing / Summarizing", 
                "Neutral Response (Giving Criteria for Correctness)", 
                "Setting Expectations & Affirming Behaviors", 
                "Repetition & Rhythm (Correcting Misconceptions)"
              ].map((tech, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', marginTop: '0.4rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{tech}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </SlideWrapper>
  );
};

export default Part1ConnectionSlide;
