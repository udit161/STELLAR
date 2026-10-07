import React from 'react';

/**
 * ShootingStars: Adds occasional shooting meteors to the background.
 */
export default function ShootingStars() {
  return (
    <div
      className="shooting-stars-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1, // Just above the background
        overflow: 'hidden',
      }}
    >
      <style>{`
        /* Rare shooting meteor */
        @keyframes meteorTrail {
          0% {
            transform: translate(0, 0) rotate(-35deg) scaleX(0);
            opacity: 0;
          }
          1% {
            opacity: 0.9;
            transform: translate(12vw, 15vh) rotate(-35deg) scaleX(1);
          }
          3% {
            opacity: 0;
            transform: translate(30vw, 38vh) rotate(-35deg) scaleX(1.4);
          }
          100% {
            opacity: 0;
            transform: translate(30vw, 38vh) rotate(-35deg) scaleX(0);
          }
        }

        @keyframes meteorTrailSecond {
          0% {
            transform: translate(0, 0) rotate(-42deg) scaleX(0);
            opacity: 0;
          }
          1.2% {
            opacity: 0.85;
            transform: translate(16vw, 20vh) rotate(-42deg) scaleX(1);
          }
          3.2% {
            opacity: 0;
            transform: translate(36vw, 45vh) rotate(-42deg) scaleX(1.3);
          }
          100% {
            opacity: 0;
            transform: translate(36vw, 45vh) rotate(-42deg) scaleX(0);
          }
        }
        
        @keyframes meteorTrailThird {
          0% {
            transform: translate(0, 0) rotate(-25deg) scaleX(0);
            opacity: 0;
          }
          2% {
            opacity: 0.8;
            transform: translate(20vw, 10vh) rotate(-25deg) scaleX(1);
          }
          5% {
            opacity: 0;
            transform: translate(40vw, 20vh) rotate(-25deg) scaleX(1.5);
          }
          100% {
            opacity: 0;
            transform: translate(40vw, 20vh) rotate(-25deg) scaleX(0);
          }
        }
      `}</style>

      {/* Occasional shooting stars (meteors) */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '32%',
          width: '140px',
          height: '1.5px',
          background: 'linear-gradient(90deg, #ffffff 0%, rgba(147, 197, 253, 0.8) 35%, transparent 100%)',
          borderRadius: '2px',
          animation: 'meteorTrail 15s ease-out infinite 2s',
          transformOrigin: 'left center',
          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '22%',
          right: '25%',
          width: '160px',
          height: '1.5px',
          background: 'linear-gradient(90deg, #ffffff 0%, rgba(254, 240, 138, 0.75) 40%, transparent 100%)',
          borderRadius: '2px',
          animation: 'meteorTrailSecond 22s ease-out infinite 10s',
          transformOrigin: 'left center',
          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '60%',
          width: '180px',
          height: '1.5px',
          background: 'linear-gradient(90deg, #ffffff 0%, rgba(167, 139, 250, 0.8) 40%, transparent 100%)',
          borderRadius: '2px',
          animation: 'meteorTrailThird 18s ease-out infinite 16s',
          transformOrigin: 'left center',
          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))',
        }}
      />
    </div>
  );
}
