import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideWrapper from '../components/SlideWrapper';
import { BarChart2, Info, X } from 'lucide-react';

const anthropicData = [
  { category: "Computer & Math", observed: 32, theoretical: 96 },
  { category: "Business & Finance", observed: 28, theoretical: 94 },
  { category: "Office & Admin", observed: 42, theoretical: 94 },
  { category: "Management", observed: 25, theoretical: 92 },
  { category: "Legal", observed: 15, theoretical: 88 },
  { category: "Arts & Media", observed: 20, theoretical: 85 },
  { category: "Architecture & Eng.", observed: 18, theoretical: 82 },
  { category: "Life & Social Sciences", observed: 12, theoretical: 80 },
  { category: "Sales", observed: 18, theoretical: 72 },
  { 
    category: "Education & Library", 
    observed: 12, 
    theoretical: 68, 
    highlight: true,
    customDetail: "AI theoretically has the capability to handle 68% of tasks in Education (like grading, lesson planning, and content generation). However, actual adoption is only at 12%. This massive 56% gap highlights a significant opportunity for educators to integrate these tools to save time and enhance learning." 
  },
  { category: "Healthcare Practitioners", observed: 5, theoretical: 58 },
  { category: "Social Services", observed: 8, theoretical: 52 },
  { category: "Healthcare Support", observed: 4, theoretical: 38 },
  { category: "Transportation", observed: 6, theoretical: 28 },
  { category: "Production", observed: 5, theoretical: 25 },
  { category: "Protective Service", observed: 4, theoretical: 22 },
  { category: "Installation & Repair", observed: 4, theoretical: 20 },
  { category: "Personal Care", observed: 3, theoretical: 20 },
  { category: "Construction", observed: 3, theoretical: 18 },
  { category: "Agriculture", observed: 2, theoretical: 15 },
  { category: "Food & Serving", observed: 2, theoretical: 12 },
  { category: "Grounds Maintenance", observed: 2, theoretical: 10 },
];

const Part3AnthropicDataSlide = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <SlideWrapper>
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        padding: '2rem 4rem'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '0.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="mono-text">
              Part 3 // The Impact
            </div>
            <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <BarChart2 size={36} color="var(--accent-primary)" />
              Theoretical vs Observed AI Exposure
            </h2>
          </div>
          
          {/* Legend */}
          <div style={{ display: 'flex', gap: '2rem', background: 'var(--glass-bg)', padding: '1rem 2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '20px', height: '20px', background: 'rgba(59, 130, 246, 0.8)', borderRadius: '4px', border: '1px solid #60a5fa' }} />
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Theoretical Capability</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '20px', height: '20px', background: 'rgba(239, 68, 68, 0.8)', borderRadius: '4px', border: '1px solid #f87171' }} />
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Observed Usage</span>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 179, 0, 0.1)', border: '1px solid var(--accent-primary)', padding: '0.75rem 1.5rem', borderRadius: '12px' }}>
          <Info size={20} color="var(--accent-primary)" />
          <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Data from Anthropic showing the massive gap between what AI <strong>could theoretically do</strong> versus what it is <strong>actually doing</strong> right now. (Click any row for details)
          </span>
        </div>

        {/* Chart Container */}
        <div style={{ 
          flex: 1, 
          background: 'var(--glass-bg)', 
          borderRadius: '24px', 
          border: '1px solid var(--glass-border)',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* X-Axis Grid Lines */}
          <div style={{ position: 'absolute', top: '1.5rem', bottom: '2.5rem', left: '250px', right: '2rem', display: 'flex', justifyContent: 'space-between', zIndex: 0, opacity: 0.1, pointerEvents: 'none' }}>
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => (
              <div key={val} style={{ height: '100%', width: '1px', background: '#fff', position: 'relative' }}>
                {val % 20 === 0 && (
                  <div style={{ position: 'absolute', bottom: '-2rem', left: '-10px', fontSize: '0.9rem', color: '#fff', opacity: 0.5 }}>
                    {val}%
                  </div>
                )}
              </div>
            ))}
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', zIndex: 1, position: 'relative', paddingBottom: '2rem' }}
          >
            {anthropicData.map((data, index) => {
              const isHovered = hoveredIndex === index;
              const isHighlighted = data.highlight;
              
              return (
                <motion.div 
                  key={data.category} 
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedData(data)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    height: '22px', 
                    position: 'relative',
                    cursor: 'pointer',
                    background: isHovered 
                      ? 'rgba(255,255,255,0.08)' 
                      : isHighlighted ? 'rgba(255, 179, 0, 0.15)' : 'transparent',
                    borderRadius: '6px',
                    padding: '0 0.5rem',
                    border: isHighlighted && !isHovered ? '1px dashed rgba(255, 179, 0, 0.5)' : '1px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Y-Axis Label */}
                  <div style={{ 
                    width: '230px', 
                    fontSize: '0.95rem', 
                    color: isHighlighted ? 'var(--accent-primary)' : isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: isHovered || isHighlighted ? 600 : 400,
                    transition: 'color 0.2s'
                  }}>
                    {data.category}
                  </div>

                  {/* Bars Container */}
                  <div style={{ flex: 1, height: '14px', position: 'relative' }}>
                    {/* Theoretical Bar (Blue - Background) */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.theoretical}%` }}
                      transition={{ duration: 1.5, type: 'spring', damping: 20, delay: index * 0.05 }}
                      style={{
                        position: 'absolute',
                        top: 0, left: 0, height: '100%',
                        background: isHovered ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0.6)',
                        borderRadius: '0 4px 4px 0',
                        boxShadow: isHovered ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none'
                      }}
                    />
                    {/* Observed Bar (Red - Foreground) */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.observed}%` }}
                      transition={{ duration: 1.5, type: 'spring', damping: 20, delay: 0.5 + (index * 0.05) }}
                      style={{
                        position: 'absolute',
                        top: '2px', left: 0, height: '10px',
                        background: isHovered ? 'rgba(239, 68, 68, 1)' : 'rgba(239, 68, 68, 0.8)',
                        borderRadius: '0 4px 4px 0',
                        boxShadow: isHovered ? '0 0 10px rgba(239, 68, 68, 0.5)' : 'none',
                        zIndex: 2
                      }}
                    />
                    
                    {/* Value Tooltips (show on hover) */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        style={{
                          position: 'absolute',
                          left: `${data.theoretical}%`,
                          top: '50%',
                          transform: 'translate(10px, -50%)',
                          fontSize: '0.85rem',
                          display: 'flex', gap: '0.5rem',
                          background: 'var(--bg-dark)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          border: '1px solid var(--glass-border)',
                          zIndex: 10
                        }}
                      >
                        <span style={{ color: '#60a5fa' }}>{data.theoretical}%</span>
                        <span style={{ color: '#fff' }}>vs</span>
                        <span style={{ color: '#f87171' }}>{data.observed}%</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Modal for Details */}
        <AnimatePresence>
          {selectedData && (
            <div style={{
              position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300vw', height: '300vh',
              zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedData(null)}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', cursor: 'pointer'
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                style={{
                  position: 'relative', zIndex: 2010, width: '600px',
                  background: 'var(--glass-bg)', backdropFilter: 'blur(20px)',
                  borderRadius: '24px', padding: '3rem',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px var(--glass-border)',
                  borderTop: `4px solid ${selectedData.highlight ? 'var(--accent-primary)' : 'rgba(59, 130, 246, 1)'}`
                }}
              >
                <button
                  onClick={() => setSelectedData(null)}
                  style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
                    width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <X size={20} />
                </button>

                <h3 style={{ fontSize: '2.5rem', margin: '0 0 1.5rem 0', color: selectedData.highlight ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                  {selectedData.category}
                </h3>

                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                  <div style={{ flex: 1, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '1.5rem', borderRadius: '16px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Theoretical Capability</div>
                    <div style={{ fontSize: '3rem', fontWeight: 700, color: '#fff' }}>{selectedData.theoretical}%</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1.5rem', borderRadius: '16px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Observed Usage</div>
                    <div style={{ fontSize: '3rem', fontWeight: 700, color: '#fff' }}>{selectedData.observed}%</div>
                  </div>
                </div>

                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  {selectedData.customDetail 
                    ? selectedData.customDetail 
                    : `In the ${selectedData.category} sector, AI models theoretically possess the capability to perform ${selectedData.theoretical}% of core tasks. However, real-world constraints, workflows, and adoption hurdles mean observed usage only covers ${selectedData.observed}% of tasks—a gap of ${selectedData.theoretical - selectedData.observed}%.`
                  }
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </SlideWrapper>
  );
};

export default Part3AnthropicDataSlide;
