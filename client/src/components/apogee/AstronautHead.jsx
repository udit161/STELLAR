import React, { useEffect, useRef } from 'react';

export function AstronautHead() {
  const tiltRef = useRef(null);
  const visorRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const leftSparkleRef = useRef(null);
  const rightSparkleRef = useRef(null);

  // Store physics state in refs to bypass React re-renders for 60fps performance
  const physicsRef = useRef({
    currentRotX: 0,
    currentRotY: 0,
    currentRotZ: 0,
    targetRotX: 0,
    targetRotY: 0,
    targetRotZ: 0,
    deltaX: 0,
    deltaY: 0,
  });

  useEffect(() => {
    const tiltEl = tiltRef.current;
    if (!tiltEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e) => {
      if (prefersReducedMotion) return;
      const rect = tiltEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      physicsRef.current.deltaX = deltaX;
      physicsRef.current.deltaY = deltaY;

      // 3D Pitch (RotX), Yaw (RotY), and Head Roll Tilt (RotZ)
      physicsRef.current.targetRotY = Math.max(-18, Math.min(18, deltaX * 20));
      physicsRef.current.targetRotX = Math.max(-15, Math.min(15, -deltaY * 16));
      physicsRef.current.targetRotZ = Math.max(-10, Math.min(10, deltaX * 10));
    };

    window.addEventListener('pointermove', handlePointerMove);

    let animId = 0;

    function animLoop() {
      if (prefersReducedMotion) return;

      const p = physicsRef.current;

      // Smooth inertia interpolation (lerp)
      p.currentRotX += (p.targetRotX - p.currentRotX) * 0.085;
      p.currentRotY += (p.targetRotY - p.currentRotY) * 0.085;
      p.currentRotZ += (p.targetRotZ - p.currentRotZ) * 0.085;

      // Parallax translation coupled with rotation
      const translateX = p.currentRotY * 1.2;
      const translateY = -p.currentRotX * 0.8;

      if (tiltEl) {
        tiltEl.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) rotateX(${p.currentRotX.toFixed(2)}deg) rotateY(${p.currentRotY.toFixed(2)}deg) rotateZ(${p.currentRotZ.toFixed(2)}deg)`;
      }

      // Visor reflection sheen movement synchronized with head turn
      if (visorRef.current) {
        const reflX = 120 + p.currentRotY * 2.4;
        const reflY = 115 + p.currentRotX * 2.0;
        visorRef.current.setAttribute('cx', reflX.toFixed(2));
        visorRef.current.setAttribute('cy', reflY.toFixed(2));
      }

      // Eye Pupil Tracking synchronized with 3D Head Tilt
      const pupilOffX = Math.max(-10, Math.min(10, (p.currentRotY / 18) * 11));
      const pupilOffY = Math.max(-8, Math.min(8, (-p.currentRotX / 15) * 9));

      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute('cx', (123 + pupilOffX).toFixed(2));
        leftPupilRef.current.setAttribute('cy', (135 + pupilOffY).toFixed(2));
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute('cx', (177 + pupilOffX).toFixed(2));
        rightPupilRef.current.setAttribute('cy', (135 + pupilOffY).toFixed(2));
      }
      if (leftSparkleRef.current) {
        leftSparkleRef.current.setAttribute('cx', (120 + pupilOffX).toFixed(2));
        leftSparkleRef.current.setAttribute('cy', (132 + pupilOffY).toFixed(2));
      }
      if (rightSparkleRef.current) {
        rightSparkleRef.current.setAttribute('cx', (174 + pupilOffX).toFixed(2));
        rightSparkleRef.current.setAttribute('cy', (132 + pupilOffY).toFixed(2));
      }

      animId = requestAnimationFrame(animLoop);
    }

    if (!prefersReducedMotion) {
      animLoop();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div className="astronaut-viewport">
      {/* Outer CSS floating bob wrapper */}
      <div className="astronaut-container astronaut-bobbing">
        {/* Inner JS 3D tilt & rotation container — separated from CSS keyframes so no style conflicts occur */}
        <div className="astronaut-tilt-layer" ref={tiltRef}>
          <svg
            className="helmet-svg"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Stellar AI Interactive Astronaut Helmet with 3D Tilt & Eye Tracking"
          >
            {/* Dashed Outer Orbit Ring & Satellite Dot */}
            <g className="orbit-ring-svg">
              <circle cx="150" cy="150" r="142" stroke="url(#orbitGrad)" strokeWidth="1.5" strokeDasharray="8 12" opacity="0.6" />
              <circle cx="292" cy="150" r="4.5" fill="#3fe7c8" filter="drop-shadow(0 0 6px #3fe7c8)" />
            </g>

            {/* Antenna Assembly */}
            <path d="M150 52V22" stroke="#d9e1ff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="150" cy="18" r="6" className="antenna-led" />

            {/* Main Helmet Silver Shell */}
            <path d="M150 48C90 48 56 88 56 150C56 215 92 245 150 245C208 245 244 215 244 150C244 88 210 48 150 48Z" fill="url(#shellGrad)" stroke="#d9e1ff" strokeWidth="2" />

            {/* Helmet Metallic Collars & Side Bolts */}
            <path d="M72 232C90 252 118 262 150 262C182 262 210 252 228 232V250C228 264 192 274 150 274C108 274 72 264 72 250V232Z" fill="url(#collarGrad)" stroke="#98a1c7" strokeWidth="1.5" />
            <circle cx="82" cy="244" r="3.5" fill="#131a3d" stroke="#d9e1ff" strokeWidth="1" />
            <circle cx="218" cy="244" r="3.5" fill="#131a3d" stroke="#d9e1ff" strokeWidth="1" />

            {/* Deep Visor Outer Frame */}
            <path d="M78 120C78 95 105 84 150 84C195 84 222 95 222 120C222 170 200 205 150 205C100 205 78 170 78 120Z" fill="#05060d" stroke="#8b6bff" strokeWidth="2" />

            {/* Visor Background & Dynamic Reflection */}
            <g>
              <path d="M82 120C82 98 107 88 150 88C193 88 218 98 218 120C218 166 197 200 150 200C103 200 82 166 82 120Z" fill="url(#visorShine)" />
              
              {/* Enlarged Dynamic Cursor-Tracking Glowing Cybernetic Eyes */}
              <g id="astronautEyes">
                {/* Left Eye Socket */}
                <ellipse cx="123" cy="135" rx="20" ry="16" fill="#020617" stroke="rgba(63, 231, 200, 0.85)" strokeWidth="1.6" filter="drop-shadow(0 0 4px rgba(63, 231, 200, 0.3))" />
                <circle cx="123" cy="135" r="11" fill="#3fe7c8" opacity="0.22" />
                <circle ref={leftPupilRef} cx="123" cy="135" r="7" fill="#3fe7c8" filter="drop-shadow(0 0 8px #3fe7c8)" />
                <circle ref={leftSparkleRef} cx="120" cy="132" r="2.4" fill="#ffffff" />

                {/* Right Eye Socket */}
                <ellipse cx="177" cy="135" rx="20" ry="16" fill="#020617" stroke="rgba(63, 231, 200, 0.85)" strokeWidth="1.6" filter="drop-shadow(0 0 4px rgba(63, 231, 200, 0.3))" />
                <circle cx="177" cy="135" r="11" fill="#3fe7c8" opacity="0.22" />
                <circle ref={rightPupilRef} cx="177" cy="135" r="7" fill="#3fe7c8" filter="drop-shadow(0 0 8px #3fe7c8)" />
                <circle ref={rightSparkleRef} cx="174" cy="132" r="2.4" fill="#ffffff" />
              </g>

              {/* Reflection Glass Highlight */}
              <ellipse ref={visorRef} cx="120" cy="115" rx="35" ry="20" fill="url(#reflGrad)" opacity="0.6" transform="rotate(-20 120 115)" />
            </g>

            {/* Audio Comm Ports */}
            <rect x="50" y="142" width="12" height="24" rx="4" fill="#131a3d" stroke="#98a1c7" strokeWidth="1.5" />
            <rect x="238" y="142" width="12" height="24" rx="4" fill="#131a3d" stroke="#98a1c7" strokeWidth="1.5" />

            {/* SVG Gradients */}
            <defs>
              <linearGradient id="shellGrad" x1="56" y1="48" x2="244" y2="245" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#d9e1ff" />
                <stop offset="70%" stopColor="#98a1c7" />
                <stop offset="100%" stopColor="#131a3d" />
              </linearGradient>

              <linearGradient id="collarGrad" x1="72" y1="232" x2="228" y2="274" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#d9e1ff" />
                <stop offset="50%" stopColor="#5b3bff" />
                <stop offset="100%" stopColor="#0a0f26" />
              </linearGradient>

              <radialGradient id="visorShine" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(130 110) scale(110 90)">
                <stop offset="0%" stopColor="#131a3d" />
                <stop offset="60%" stopColor="#0a0f26" />
                <stop offset="100%" stopColor="#05060d" />
              </radialGradient>

              <linearGradient id="reflGrad" x1="85" y1="95" x2="155" y2="135" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3fe7c8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8b6bff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b6bff" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="orbitGrad" x1="8" y1="150" x2="292" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8b6bff" />
                <stop offset="50%" stopColor="#3fe7c8" />
                <stop offset="100%" stopColor="#8b6bff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AstronautHead;
