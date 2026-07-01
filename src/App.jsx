import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import TitleSlide from './slides/TitleSlide';
import OutlineSlide from './slides/OutlineSlide';
import Part1Slide from './slides/Part1Slide';
import { Part1Cover, Part2Cover, Part3Cover, Part4Cover } from './slides/SectionCovers';
import BackgroundAnimation from './components/BackgroundAnimation';

// Non-linear presentation map (Hub and Spoke)
const slideMap = [
  { id: 0, component: TitleSlide, next: 1, prev: 0 },
  { id: 1, component: OutlineSlide, next: 2, prev: 0 }, // Hub
  
  // Part 1: Being a Relevant Teacher
  { id: 2, component: Part1Cover, next: 3, prev: 1 },
  { id: 3, component: Part1Slide, next: 1, prev: 2 },
  
  // Part 2: Interdisciplinary Learning
  { id: 4, component: Part2Cover, next: 1, prev: 1 },
  
  // Part 3: Artificial Intelligence
  { id: 5, component: Part3Cover, next: 1, prev: 1 },
  
  // Part 4: Workshop
  { id: 6, component: Part4Cover, next: 1, prev: 1 },
];

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
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

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
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
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <BackgroundAnimation />
      
      <AnimatePresence mode="wait">
        <CurrentSlideComponent key={currentSlideIndex} goToSlide={goToSlide} />
      </AnimatePresence>
      
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
