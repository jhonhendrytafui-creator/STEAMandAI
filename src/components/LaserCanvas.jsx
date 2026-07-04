import React, { useRef, useEffect } from 'react';

const LaserCanvas = ({ isActive }) => {
  const canvasRef = useRef(null);
  const segmentsRef = useRef([]);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);

  // Resize canvas to cover screen, handling DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Animation Loop for decay
  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateAndRender = () => {
      const now = Date.now();
      
      // Filter out expired segments (decay duration: 3000ms)
      segmentsRef.current = segmentsRef.current.filter(seg => now - seg.time < 3000);

      // Clear canvas
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Render segments
      segmentsRef.current.forEach(seg => {
        const elapsed = now - seg.time;
        const opacity = Math.max(0, 1 - elapsed / 3000);

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Outer Glow (Neon Crimson Red)
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.strokeStyle = `rgba(229, 57, 53, ${opacity * 0.45})`; // Crimson red glow
        ctx.lineWidth = 10;
        ctx.stroke();

        // Mid Glow (Amber/Gold Accent)
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.strokeStyle = `rgba(255, 179, 0, ${opacity * 0.75})`; // Gold glow
        ctx.lineWidth = 5;
        ctx.stroke();

        // Inner Core (Bright White)
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Keep running the animation loop if laser is active, OR there are still visible segments
      if (isActive || segmentsRef.current.length > 0) {
        animationFrameId = requestAnimationFrame(updateAndRender);
      }
    };

    if (isActive || segmentsRef.current.length > 0) {
      animationFrameId = requestAnimationFrame(updateAndRender);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e) => {
    if (!isActive) return;
    isDrawingRef.current = true;
    const coords = getCoordinates(e);
    if (!coords) return;

    lastPointRef.current = coords;

    // Draw a single point segment immediately
    segmentsRef.current.push({
      x1: coords.x,
      y1: coords.y,
      x2: coords.x,
      y2: coords.y,
      time: Date.now()
    });
  };

  const handlePointerMove = (e) => {
    if (!isActive || !isDrawingRef.current) return;
    const coords = getCoordinates(e);
    if (!coords) return;

    const lastPoint = lastPointRef.current;
    if (lastPoint) {
      segmentsRef.current.push({
        x1: lastPoint.x,
        y1: lastPoint.y,
        x2: coords.x,
        y2: coords.y,
        time: Date.now()
      });
    }

    lastPointRef.current = coords;
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: 990,
        touchAction: 'none' // Disable page navigation/pinch gestures while drawing
      }}
    />
  );
};

export default LaserCanvas;
