import React, { useMemo } from 'react';

/**
 * TwinklingStars: Deep space celestial background with multi-tier twinkling stars,
 * cross-diffraction flare stars, subtle nebula dust, and occasional shooting meteors.
 */
export default function TwinklingStars() {
  // Deterministic star generation so positions don't shift across re-renders
  const { tinyStars, midStars, heroStars } = useMemo(() => {
    let seed = 4289;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const colors = [
      '#ffffff',
      '#ffffff',
      '#e0f2fe', // subtle cyan-white
      '#bae6fd', // light ice blue
      '#fef08a', // gentle stellar gold
      '#f3e8ff', // subtle lavender
      '#fed7aa', // warm amber-white
    ];

    // Layer 1: Distant micro stars (dense field)
    const tiny = [];
    for (let i = 0; i < 110; i++) {
      tiny.push({
        id: `tiny-${i}`,
        top: `${(rnd() * 98 + 1).toFixed(2)}%`,
        left: `${(rnd() * 98 + 1).toFixed(2)}%`,
        size: `${(rnd() * 0.8 + 0.8).toFixed(1)}px`,
        color: colors[Math.floor(rnd() * 3)], // mostly white & ice blue
        duration: `${(rnd() * 3.5 + 2.5).toFixed(1)}s`,
        delay: `${(rnd() * 5).toFixed(1)}s`,
        baseOpacity: (rnd() * 0.25 + 0.15).toFixed(2),
        peakOpacity: (rnd() * 0.35 + 0.45).toFixed(2),
      });
    }

    // Layer 2: Mid-field vivid twinkling stars
    const mid = [];
    for (let i = 0; i < 55; i++) {
      const color = colors[Math.floor(rnd() * colors.length)];
      mid.push({
        id: `mid-${i}`,
        top: `${(rnd() * 96 + 2).toFixed(2)}%`,
        left: `${(rnd() * 96 + 2).toFixed(2)}%`,
        size: `${(rnd() * 1.4 + 1.6).toFixed(1)}px`,
        color: color,
        duration: `${(rnd() * 3.0 + 2.0).toFixed(1)}s`,
        delay: `${(rnd() * 6).toFixed(1)}s`,
        baseOpacity: (rnd() * 0.2 + 0.2).toFixed(2),
        peakOpacity: (rnd() * 0.3 + 0.68).toFixed(2),
      });
    }

    // Layer 3: Hero twinkling stars with 4-point cross diffraction spikes
    const hero = [];
    for (let i = 0; i < 16; i++) {
      hero.push({
        id: `hero-${i}`,
        top: `${(rnd() * 90 + 5).toFixed(2)}%`,
        left: `${(rnd() * 92 + 4).toFixed(2)}%`,
        size: `${(rnd() * 1.2 + 2.6).toFixed(1)}px`,
        color: colors[Math.floor(rnd() * colors.length)],
        duration: `${(rnd() * 3.5 + 2.8).toFixed(1)}s`,
        delay: `${(rnd() * 7).toFixed(1)}s`,
      });
    }

    return { tinyStars: tiny, midStars: mid, heroStars: hero };
  }, []);

  return (
    <div
      className="twinkling-stars-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <style>{`
        /* Micro star twinkle */
        @keyframes microTwinkle {
          0%, 100% {
            opacity: var(--base-op, 0.2);
            transform: scale(0.85);
          }
          50% {
            opacity: var(--peak-op, 0.7);
            transform: scale(1.15);
          }
        }

        /* Mid star vivid sparkle */
        @keyframes vividTwinkle {
          0%, 100% {
            opacity: var(--base-op, 0.25);
            transform: scale(0.8);
          }
          40% {
            opacity: var(--peak-op, 0.85);
            transform: scale(1.25);
          }
          65% {
            opacity: calc(var(--peak-op, 0.85) * 0.7);
            transform: scale(1.0);
          }
        }

        /* Hero star cross diffraction spike pulse */
        @keyframes heroTwinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.4));
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 12px rgba(186, 230, 253, 0.6));
          }
        }

        /* Cross spike shimmer */
        @keyframes spikeShimmer {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.2) rotate(0deg);
          }
        }

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

        /* Subtle ambient nebula drift */
        @keyframes subtleNebulaShift {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1) translate(0, 0);
          }
          50% {
            opacity: 0.55;
            transform: scale(1.08) translate(-1%, 2%);
          }
        }
      `}</style>

      {/* Atmospheric nebula tint clouds (very soft, adds deep space atmosphere) */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '12%',
          width: '45vw',
          height: '45vh',
          background: 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.035) 0%, transparent 70%)',
          filter: 'blur(75px)',
          animation: 'subtleNebulaShift 16s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '14%',
          width: '40vw',
          height: '40vh',
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.028) 0%, transparent 70%)',
          filter: 'blur(85px)',
          animation: 'subtleNebulaShift 22s ease-in-out infinite 5s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '42%',
          width: '35vw',
          height: '35vh',
          background: 'radial-gradient(ellipse at center, rgba(245, 197, 66, 0.02) 0%, transparent 65%)',
          filter: 'blur(90px)',
          animation: 'subtleNebulaShift 20s ease-in-out infinite 9s',
        }}
      />

      {/* Layer 1: Distant micro stars */}
      {tinyStars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            backgroundColor: star.color,
            boxShadow: `0 0 2px ${star.color}`,
            '--base-op': star.baseOpacity,
            '--peak-op': star.peakOpacity,
            animation: `microTwinkle ${star.duration} ease-in-out infinite ${star.delay}`,
            willChange: 'opacity, transform',
          }}
        />
      ))}

      {/* Layer 2: Mid-distance vivid twinkling stars */}
      {midStars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            backgroundColor: star.color,
            boxShadow: `0 0 4px ${star.color}, 0 0 8px ${star.color}66`,
            '--base-op': star.baseOpacity,
            '--peak-op': star.peakOpacity,
            animation: `vividTwinkle ${star.duration} ease-in-out infinite ${star.delay}`,
            willChange: 'opacity, transform',
          }}
        />
      ))}

      {/* Layer 3: Hero stars with 4-point cross diffraction flare */}
      {heroStars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: `heroTwinkle ${star.duration} ease-in-out infinite ${star.delay}`,
            willChange: 'opacity, transform',
          }}
        >
          {/* Central bright star core */}
          <div
            style={{
              position: 'absolute',
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              backgroundColor: star.color,
              boxShadow: `0 0 6px ${star.color}, 0 0 12px ${star.color}88`,
            }}
          />

          {/* Horizontal diffraction spike */}
          <div
            style={{
              position: 'absolute',
              width: '14px',
              height: '1px',
              background: `linear-gradient(90deg, transparent 0%, ${star.color} 50%, transparent 100%)`,
              animation: `spikeShimmer ${star.duration} ease-in-out infinite ${star.delay}`,
            }}
          />

          {/* Vertical diffraction spike */}
          <div
            style={{
              position: 'absolute',
              width: '1px',
              height: '14px',
              background: `linear-gradient(180deg, transparent 0%, ${star.color} 50%, transparent 100%)`,
              animation: `spikeShimmer ${star.duration} ease-in-out infinite ${star.delay}`,
            }}
          />
        </div>
      ))}

      {/* Layer 4: Occasional shooting stars (meteors) */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '32%',
          width: '140px',
          height: '1.5px',
          background: 'linear-gradient(90deg, #ffffff 0%, rgba(147, 197, 253, 0.8) 35%, transparent 100%)',
          borderRadius: '2px',
          animation: 'meteorTrail 28s ease-out infinite 6s',
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
          animation: 'meteorTrailSecond 38s ease-out infinite 20s',
          transformOrigin: 'left center',
          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))',
        }}
      />
    </div>
  );
}
