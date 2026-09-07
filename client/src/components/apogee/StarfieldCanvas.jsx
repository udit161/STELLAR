import React, { useEffect, useRef } from 'react';

export function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handlePointerMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);

    const STAR_COUNT = Math.min(Math.floor((width * height) / 8000), 160);
    const stars = [];

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.6 + 0.5,
          baseAlpha: Math.random() * 0.6 + 0.2,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
        });
      }
    }

    initStars();
    let animId = 0;

    function render() {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!prefersReducedMotion) {
          s.x += s.vx;
          s.y += s.vy;
          s.phase += s.twinkleSpeed;

          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;
        }

        const currentAlpha = s.baseAlpha + Math.sin(s.phase) * 0.25;
        const alpha = Math.max(0.1, Math.min(1, currentAlpha));

        ctx.fillStyle = `rgba(238, 241, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // Constellation lines
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dx = s2.x - s.x;
          const dy = s2.y - s.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = 110 * 110;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / 110) * 0.16;
            ctx.strokeStyle = `rgba(139, 107, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }

        // Glowing cursor threads
        if (mouse.active) {
          const mdx = mouse.x - s.x;
          const mdy = mouse.y - s.y;
          const mdistSq = mdx * mdx + mdy * mdy;
          const maxMDistSq = 170 * 170;

          if (mdistSq < maxMDistSq) {
            const mdist = Math.sqrt(mdistSq);
            const threadAlpha = (1 - mdist / 170) * 0.38;
            ctx.strokeStyle = `rgba(63, 231, 200, ${threadAlpha})`;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="apogee-starfield" aria-hidden="true" />;
}

export default StarfieldCanvas;
