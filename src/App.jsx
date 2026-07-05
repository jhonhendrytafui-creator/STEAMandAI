import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Maximize, Minimize, Pencil, ChevronLeft, ChevronRight, Home, ZoomIn, ZoomOut } from 'lucide-react';
import TitleSlide from './slides/TitleSlide';
import OutlineSlide from './slides/OutlineSlide';
import Part1Slide from './slides/Part1Slide';
import Part1SkillsSlide from './slides/Part1SkillsSlide';
import { Part1Cover, Part2Cover, Part3Cover, Part4Cover } from './slides/SectionCovers';

import LaserCanvas from './components/LaserCanvas';
import Part1DiscussionSlide from './slides/Part1DiscussionSlide';
import Part1ReflectionSlide from './slides/Part1ReflectionSlide';
import Part1ConnectionSlide from './slides/Part1ConnectionSlide';
import Part2SunflowerSlide from './slides/Part2SunflowerSlide';
import Part2ReginaldDennySlide from './slides/Part2ReginaldDennySlide';
import Part2DefinitionSlide from './slides/Part2DefinitionSlide';
import Part2WhySlide from './slides/Part2WhySlide';
import Part2LaunchSlide from './slides/Part2LaunchSlide';
import Part2DiscussionSlide from './slides/Part2DiscussionSlide';
import Part3HistorySlide from './slides/Part3HistorySlide';
import Part3HowAIThinksSlide from './slides/Part3HowAIThinksSlide';
import Part3AnthropicDataSlide from './slides/Part3AnthropicDataSlide';
import Part3LevelsSlide from './slides/Part3LevelsSlide';
import Part3ShowcaseSlide from './slides/Part3ShowcaseSlide';
import Part3CollaboratorSlide from './slides/Part3CollaboratorSlide';
import Part3PollingSlide from './slides/Part3PollingSlide';
import Part3StrategiesSlide from './slides/Part3StrategiesSlide';


// Non-linear presentation map (Hub and Spoke)
const slideMap = [
  { id: 0, component: TitleSlide, next: 1, prev: 0 },
  { id: 1, component: OutlineSlide, next: 2, prev: 0 }, // Hub
  
  // Part 1: Being a Relevant Teacher
  { id: 2, component: Part1Cover, next: 3, prev: 1 },
  { id: 3, component: Part1Slide, next: 4, prev: 2 },
  { id: 4, component: Part1SkillsSlide, next: 5, prev: 3 },
  { id: 5, component: Part1DiscussionSlide, next: 6, prev: 4 },
  { id: 6, component: Part1ReflectionSlide, next: 7, prev: 5 },
  { id: 7, component: Part1ConnectionSlide, next: 1, prev: 6 },
  
  // Part 2: Interdisciplinary Learning
  { id: 8, component: Part2Cover, next: 9, prev: 1 },
  { id: 9, component: Part2SunflowerSlide, next: 10, prev: 8 },
  { id: 10, component: Part2ReginaldDennySlide, next: 11, prev: 9 },
  { id: 11, component: Part2DefinitionSlide, next: 12, prev: 10 },
  { id: 12, component: Part2WhySlide, next: 13, prev: 11 },
  { id: 13, component: Part2DiscussionSlide, next: 14, prev: 12 },
  { id: 14, component: Part2LaunchSlide, next: 1, prev: 13 },
  
  // Part 3: Artificial Intelligence
  { id: 15, component: Part3Cover, next: 16, prev: 1 },
  { id: 16, component: Part3HistorySlide, next: 17, prev: 15 },
  { id: 17, component: Part3HowAIThinksSlide, next: 18, prev: 16 },
  { id: 18, component: Part3AnthropicDataSlide, next: 19, prev: 17 },
  { id: 19, component: Part3LevelsSlide, next: 20, prev: 18 },
  { id: 20, component: Part3ShowcaseSlide, next: 21, prev: 19 },
  { id: 21, component: Part3CollaboratorSlide, next: 22, prev: 20 },
  { id: 22, component: Part3PollingSlide, next: 23, prev: 21 },
  { id: 23, component: Part3StrategiesSlide, next: 1, prev: 22 },
  
  // Part 4: Workshop
  { id: 24, component: Part4Cover, next: 1, prev: 1 },
];

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLaserActive, setIsLaserActive] = useState(false);

  
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const minSwipeDistance = 50;

  const handleNext = () => {
    setCurrentSlideIndex(prev => slideMap[prev].next);
  };

  const handlePrev = () => {
    setCurrentSlideIndex(prev => slideMap[prev].prev);
  };

  const goToSlide = (index) => {
    if (slideMap[index]) {
      setCurrentSlideIndex(index);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Note: using state updater pattern in handleNext/Prev so we don't need dependencies here

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error("Error toggling fullscreen", err);
    }
  };

  const onTouchStart = (e) => {
    if (isLaserActive) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (isLaserActive) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (isLaserActive) return;
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    
    if (distance > minSwipeDistance) {
      handleNext(); // swipe left -> next
    } else if (distance < -minSwipeDistance) {
      handlePrev(); // swipe right -> prev
    }
  };

  const CurrentSlideComponent = slideMap[currentSlideIndex].component;

  return (
    <div 
      style={{ width: '100%', height: '100%', position: 'relative', overflow: zoomLevel > 1 ? 'auto' : 'hidden' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >

      
      {/* Zoom Controls */}
      <div style={{
        position: 'fixed', top: '2rem', left: '2.5rem', zIndex: 1000,
        display: 'flex', gap: '0.5rem', background: 'var(--glass-bg)', padding: '0.5rem',
        borderRadius: '50px', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <button
          onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))}
          style={{
            background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
          title="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          style={{
            background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer',
            padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '18px', transition: 'all 0.2s', fontSize: '0.9rem', fontWeight: 'bold'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          title="Reset Zoom"
        >
          {Math.round(zoomLevel * 100)}%
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.1))}
          style={{
            background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
          title="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
      </div>

      {/* Laser Writer Canvas */}
      <LaserCanvas isActive={isLaserActive} />

      {/* Laser Writer Toggle Button */}
      <button
        onClick={() => setIsLaserActive(prev => !prev)}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '6.5rem',
          background: isLaserActive ? 'rgba(255, 179, 0, 0.15)' : 'var(--glass-bg)',
          border: isLaserActive ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isLaserActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: isLaserActive ? '0 0 20px rgba(255, 179, 0, 0.3)' : '0 4px 30px rgba(0, 0, 0, 0.2)'
        }}
        onMouseEnter={(e) => {
          if (!isLaserActive) {
            e.currentTarget.style.color = 'var(--accent-primary)';
            e.currentTarget.style.borderColor = 'rgba(255, 179, 0, 0.3)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 179, 0, 0.2)';
          }
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          if (!isLaserActive) {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 179, 0, 0.3)';
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.color = 'var(--accent-primary)';
          }
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title={isLaserActive ? 'Disable Laser Writer' : 'Enable Laser Writer'}
      >
        <Pencil size={20} />
      </button>

      {/* Universal Navigation */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        right: '10.5rem',
        display: 'flex',
        gap: '0.75rem',
        zIndex: 1000
      }}>
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: currentSlideIndex === 0 ? 'var(--glass-border)' : 'var(--text-secondary)',
            cursor: currentSlideIndex === 0 ? 'default' : 'pointer',
            transition: 'all 0.3s',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            if (currentSlideIndex !== 0) {
              e.currentTarget.style.color = 'var(--accent-primary)';
              e.currentTarget.style.borderColor = 'rgba(255, 179, 0, 0.3)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSlideIndex !== 0) {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          title="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button
          onClick={handleNext}
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-primary)';
            e.currentTarget.style.borderColor = 'rgba(255, 179, 0, 0.3)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Back to Hub - Always visible on content slides */}
        {currentSlideIndex !== 1 && currentSlideIndex !== 0 && (
          <button
            onClick={() => goToSlide(1)}
            style={{
              background: 'rgba(255, 179, 0, 0.1)',
              border: '1px solid var(--accent-primary)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 15px rgba(255, 179, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 179, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(255, 179, 0, 0.1)';
            }}
            title="Back to Hub"
          >
            <Home size={20} />
          </button>
        )}
      </div>

      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreen}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2.5rem',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-primary)';
          e.currentTarget.style.borderColor = 'rgba(255, 179, 0, 0.3)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 179, 0, 0.2)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)';
          e.currentTarget.style.borderColor = 'var(--glass-border)';
          e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      >
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>
      
      <div style={{ width: '100%', height: '100%', zoom: zoomLevel }}>
        <AnimatePresence mode="wait">
          <CurrentSlideComponent key={currentSlideIndex} goToSlide={goToSlide} />
        </AnimatePresence>
      </div>
      
      {/* Slide / Routing Indicator */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2.5rem',
        color: 'var(--text-secondary)',
        zIndex: 100
      }} className="mono-text">
        {currentSlideIndex === 1 ? 'HUB' : `0${currentSlideIndex}`}
      </div>
    </div>
  );
}

export default App;
