import React, { useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Network } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const NetworkAnimation = () => {
  const initialNodes = [
    { id: 1, x: 0, y: -130, z: 0, isCenter: false, color: 'var(--color-s)', shadow: '#806103' },
    { id: 2, x: 123, y: -40, z: 50, isCenter: false, color: 'var(--color-t)', shadow: '#804c00' },
    { id: 3, x: 76, y: 105, z: -80, isCenter: false, color: 'var(--color-e)', shadow: '#802b11' },
    { id: 4, x: -76, y: 105, z: 80, isCenter: false, color: 'var(--color-a)', shadow: '#740f31' },
    { id: 5, x: -123, y: -40, z: -50, isCenter: false, color: 'var(--color-m)', shadow: '#4e1358' },
    { id: 6, x: 0, y: 0, z: 0, isCenter: true, color: 'var(--color-ai)', shadow: '#721c1c' },
  ];

  const edges = [
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], 
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 1]
  ];

  const [projectedNodes, setProjectedNodes] = useState([]);
  const [timeState, setTimeState] = useState(0);

  useAnimationFrame((time) => {
    const speed = 0.0012; 
    const ax = time * speed;
    const ay = time * (speed * 1.3); 
    setTimeState(time);

    const cosX = Math.cos(ax);
    const sinX = Math.sin(ax);
    const cosY = Math.cos(ay);
    const sinY = Math.sin(ay);

    const newNodes = initialNodes.map(node => {
      let x1 = node.x * cosY - node.z * sinY;
      let z1 = node.x * sinY + node.z * cosY;
      let y2 = node.y * cosX - z1 * sinX;
      let z2 = node.y * sinX + z1 * cosX;

      const perspective = 500;
      const scale = perspective / (perspective + z2);
      
      return {
        ...node,
        projX: x1 * scale + 175, 
        projY: y2 * scale + 200, 
        scale: scale,
        zIndex: z2
      };
    });
    
    setProjectedNodes(newNodes);
  });

  if (projectedNodes.length === 0) return null;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 350 400" style={{ overflow: 'visible' }}>
        <defs>
          {initialNodes.map(node => (
            <radialGradient key={`grad-${node.id}`} id={`grad-${node.id}`} cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="35%" stopColor={node.color} />
              <stop offset="100%" stopColor={node.shadow} />
            </radialGradient>
          ))}
        </defs>

        {/* Draw Edges and Pulses */}
        {edges.map(([n1, n2], i) => {
          const node1 = projectedNodes.find(n => n.id === n1);
          const node2 = projectedNodes.find(n => n.id === n2);
          
          const t = ((timeState * 0.0005) + i * 0.2) % 1; 
          const pulseX = node1.projX + (node2.projX - node1.projX) * t;
          const pulseY = node1.projY + (node2.projY - node1.projY) * t;
          const opacity = Math.sin(t * Math.PI); 

          return (
            <g key={`edge-group-${i}`}>
              <line
                x1={node1.projX} y1={node1.projY}
                x2={node2.projX} y2={node2.projY}
                stroke="var(--glass-border)"
                strokeWidth={2 * ((node1.scale + node2.scale) / 2)}
              />
              <circle
                cx={pulseX} cy={pulseY} r={3 * ((node1.scale + node2.scale) / 2)}
                fill={node1.color}
                opacity={opacity}
                style={{ filter: `drop-shadow(0 0 4px ${node1.color})` }}
              />
            </g>
          );
        })}

        {/* Draw Nodes */}
        {[...projectedNodes].sort((a, b) => b.zIndex - a.zIndex).map((node) => (
          <g key={`node-${node.id}`}>
            {/* The main 3D ball node */}
            <circle
              cx={node.projX} cy={node.projY} 
              r={(node.isCenter ? 18 : 12) * node.scale}
              fill={`url(#grad-${node.id})`}
              style={{ filter: `drop-shadow(0 0 10px ${node.color})` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

const TitleSlide = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <SlideWrapper>
      <div 
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 10,
          background: 'var(--bg-surface)',
          padding: '4rem',
          gap: '4rem'
        }}
      >
        {/* Left Column: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              borderLeft: '4px solid var(--accent-primary)',
              background: 'rgba(255, 255, 255, 0.03)',
              color: 'var(--text-secondary)'
            }}>
              <Network size={24} color="var(--accent-primary)" />
              <span className="mono-text">Pahoa School Teachers Seminar</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            style={{ fontSize: 'clamp(4rem, 6vw, 7rem)', lineHeight: 1.05, marginBottom: '1rem' }}
          >
            The Relevance of
          </motion.h1>
          
          <motion.h1 
            variants={itemVariants}
            style={{ fontSize: 'clamp(4rem, 6vw, 7rem)', lineHeight: 1.05, marginBottom: '2rem' }}
            className="text-gradient-warm"
          >
            Teaching
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}
          >
            <div style={{ width: '60px', height: '2px', background: 'var(--text-secondary)' }} />
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
              AI and <span style={{ opacity: 0.8 }}>Multidisciplinary-Interdisciplinary Learning</span>
            </h2>
          </motion.div>
        </motion.div>

        {/* Right Column: Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ flex: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <NetworkAnimation />
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default TitleSlide;
