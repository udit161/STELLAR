import React, { useMemo } from "react";

export default function SpaceAnomalies() {
  // Peaceful, subtle background starfield
  const stars = useMemo(() => {
    const starList = [];
    const colors = ["#ffffff", "#e0f2fe", "#bae6fd", "#fef08a", "#f5d0fe"];

    let seed = 2026;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < 50; i++) {
      const top = (rnd() * 92 + 4).toFixed(2);
      const left = (rnd() * 92 + 4).toFixed(2);
      const size = (rnd() * 1.5 + 0.8).toFixed(1);
      const color = colors[Math.floor(rnd() * colors.length)];
      const duration = (rnd() * 3 + 2.5).toFixed(1);
      const delay = (rnd() * 4).toFixed(1);

      starList.push({
        id: i,
        top: `${top}%`,
        left: `${left}%`,
        size: `${size}px`,
        color,
        duration: `${duration}s`,
        delay: `${delay}s`,
      });
    }
    return starList;
  }, []);

  return (
    <>
      <style>{`
        /* =========================================================
           SEQUENTIAL, NON-OVERLAPPING CELESTIAL FLIGHTS (120s Cycle)
           Only 1 object visible in deep space at any given time.
           Never obstructs India Badge, ISRO Badge, or Query Dock.
           ========================================================= */

        /* Object 1: EARTH (Active: 2s - 24s) */
        @keyframes orbitEarth {
          0%    { transform: translate(12vw, 15vh) scale(0.65); opacity: 0; }
          2%    { opacity: 0.85; }
          15%   { transform: translate(46vw, 24vh) scale(0.85); opacity: 0.85; }
          18%   { transform: translate(78vw, 32vh) scale(0.60); opacity: 0; }
          100%  { transform: translate(78vw, 32vh) scale(0.60); opacity: 0; }
        }

        /* Object 2: CHANDRAYAAN-3 (Active: 26s - 48s) */
        @keyframes flightChandra {
          0%    { transform: translate(16vw, 20vh) rotate(10deg) scale(0.75); opacity: 0; }
          2%    { opacity: 0.90; }
          15%   { transform: translate(50vw, 28vh) rotate(14deg) scale(0.85); opacity: 0.90; }
          18%   { transform: translate(82vw, 36vh) rotate(18deg) scale(0.65); opacity: 0; }
          100%  { transform: translate(82vw, 36vh) rotate(18deg) scale(0.65); opacity: 0; }
        }

        /* Object 3: SATURN (Active: 50s - 72s) */
        @keyframes orbitSaturn {
          0%    { transform: translate(80vw, 14vh) scale(0.65); opacity: 0; }
          2%    { opacity: 0.80; }
          15%   { transform: translate(48vw, 22vh) scale(0.85); opacity: 0.80; }
          18%   { transform: translate(18vw, 30vh) scale(0.60); opacity: 0; }
          100%  { transform: translate(18vw, 30vh) scale(0.60); opacity: 0; }
        }

        /* Object 4: ADITYA-L1 (Active: 74s - 94s) */
        @keyframes flightAditya {
          0%    { transform: translate(76vw, 18vh) rotate(-8deg) scale(0.70); opacity: 0; }
          2%    { opacity: 0.85; }
          14%   { transform: translate(44vw, 26vh) rotate(-5deg) scale(0.85); opacity: 0.85; }
          17%   { transform: translate(14vw, 34vh) rotate(-2deg) scale(0.60); opacity: 0; }
          100%  { transform: translate(14vw, 34vh) rotate(-2deg) scale(0.60); opacity: 0; }
        }

        /* Object 5: JUPITER (Active: 96s - 116s) — 100% CIRCULAR, NO SQUARES */
        @keyframes orbitJupiter {
          0%    { transform: translate(14vw, 24vh) scale(0.65); opacity: 0; }
          2%    { opacity: 0.82; }
          14%   { transform: translate(48vw, 16vh) scale(0.85); opacity: 0.82; }
          17%   { transform: translate(80vw, 22vh) scale(0.60); opacity: 0; }
          100%  { transform: translate(80vw, 22vh) scale(0.60); opacity: 0; }
        }

        /* Occasional shooting star */
        @keyframes meteorRare {
          0%    { transform: translate(0, 0) rotate(-35deg) scaleX(0); opacity: 0; }
          1.5%  { opacity: 0.95; transform: translate(15vw, 18vh) rotate(-35deg) scaleX(1); }
          3%    { opacity: 0; transform: translate(35vw, 44vh) rotate(-35deg) scaleX(1.4); }
          100%  { opacity: 0; transform: translate(35vw, 44vh) rotate(-35deg) scaleX(0); }
        }

        @keyframes starTwinkleSubtle {
          0%, 100% { opacity: 0.20; transform: scale(0.9); }
          50%      { opacity: 0.70; transform: scale(1.15); }
        }

        @keyframes enginePlumeSubtle {
          0%, 100% { opacity: 0.45; filter: blur(3px); }
          50%      { opacity: 0.85; filter: blur(4px); }
        }
      `}</style>

      {/* SVG Global Definitions: Universal Gradients & 3D Shading */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="shadow3d" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="-4" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.80" />
          </filter>

          {/* Earth Shading */}
          <radialGradient id="earthG" cx="36%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="20%" stopColor="#38bdf8" />
            <stop offset="48%" stopColor="#0284c7" />
            <stop offset="75%" stopColor="#1e3a8a" />
            <stop offset="92%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <radialGradient id="earthSpec" cx="30%" cy="24%" r="32%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.60)" />
            <stop offset="55%" stopColor="rgba(186,230,253,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="earthTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="52%" stopColor="transparent" />
            <stop offset="80%" stopColor="rgba(0,0,15,0.45)" />
            <stop offset="100%" stopColor="rgba(0,0,5,0.80)" />
          </linearGradient>

          {/* Saturn Shading */}
          <radialGradient id="saturnG" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="18%" stopColor="#fde047" />
            <stop offset="42%" stopColor="#d97706" />
            <stop offset="68%" stopColor="#92400e" />
            <stop offset="88%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#1c0a02" />
          </radialGradient>
          <radialGradient id="saturnSpec" cx="30%" cy="25%" r="30%">
            <stop offset="0%" stopColor="rgba(254,249,195,0.50)" />
            <stop offset="60%" stopColor="rgba(253,224,71,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="saturnTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="52%" stopColor="transparent" />
            <stop offset="80%" stopColor="rgba(0,0,0,0.42)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.78)" />
          </linearGradient>

          {/* Jupiter Shading */}
          <radialGradient id="jupG" cx="38%" cy="33%" r="60%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="20%" stopColor="#fde68a" />
            <stop offset="44%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#92400e" />
            <stop offset="88%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#170601" />
          </radialGradient>
          <radialGradient id="jupSpec" cx="32%" cy="26%" r="30%">
            <stop offset="0%" stopColor="rgba(255,248,220,0.50)" />
            <stop offset="60%" stopColor="rgba(245,158,11,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="jupTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="78%" stopColor="rgba(0,0,0,0.42)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.76)" />
          </linearGradient>

          {/* Gold MLI & Solar Gradients */}
          <linearGradient id="goldMliG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="solarPanelG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Celestial Viewport */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>

        {/* ── 1. SOFT COSMIC NEBULA BACKDROP ── */}
        <div
          style={{
            position: "absolute",
            top: "12%",
            right: "18%",
            width: "48vw",
            height: "48vh",
            background: "radial-gradient(ellipse at center, rgba(14, 165, 233, 0.035) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        {/* ── 2. CALM TWINKLING STARS ── */}
        <div style={{ position: "absolute", inset: 0 }}>
          {stars.map((s) => (
            <div
              key={s.id}
              style={{
                position: "absolute",
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                backgroundColor: s.color,
                boxShadow: `0 0 2px ${s.color}`,
                animation: `starTwinkleSubtle ${s.duration} ease-in-out infinite alternate ${s.delay}`,
              }}
            />
          ))}
        </div>

        {/* ── 3. RARE SHOOTING STAR ── */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "42%",
            width: "140px",
            height: "1.5px",
            background: "linear-gradient(90deg, #ffffff 0%, rgba(147,197,253,0.7) 35%, transparent 100%)",
            borderRadius: "2px",
            animation: "meteorRare 30s ease-out infinite 8s",
            transformOrigin: "left center",
          }}
        />

        {/* =================================================================
           4. CELESTIAL OBJECTS (ONE AT A TIME, STRICTLY CLIPPED)
           ================================================================= */}

        {/* ── 1. EARTH (Active ~2s to 24s of 120s cycle) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            animation: "orbitEarth 120s linear infinite 0s both",
            filter: "url(#shadow3d)",
          }}
        >
          <svg width="104" height="104" viewBox="0 0 104 104" style={{ filter: "drop-shadow(0 0 20px rgba(14,165,233,0.35))" }}>
            <defs>
              <clipPath id="earthRoundClip">
                <circle cx="52" cy="52" r="48" />
              </clipPath>
            </defs>

            {/* Base Sphere */}
            <circle cx="52" cy="52" r="48" fill="url(#earthG)" />

            {/* All details strictly clipped within sphere */}
            <g clipPath="url(#earthRoundClip)">
              <g style={{ opacity: 0.85 }}>
                <path
                  d="M38,26 Q46,20 60,23 Q72,28 76,40 Q70,48 60,46 Q56,56 52,62 Q48,54 44,46 Q34,42 36,32 Z"
                  fill="#15803d"
                  stroke="#166534"
                  strokeWidth="0.8"
                />
                <path
                  d="M26,44 Q36,40 42,46 Q46,56 40,70 Q34,76 30,66 Q24,58 26,44 Z"
                  fill="#b45309"
                  opacity="0.80"
                />
                <ellipse cx="74" cy="72" rx="7" ry="5" fill="#15803d" />
                <circle cx="86" cy="66" r="2" fill="#16a34a" />
                <ellipse cx="52" cy="8" rx="16" ry="4" fill="#f8fafc" opacity="0.95" />
                <ellipse cx="52" cy="96" rx="20" ry="4.5" fill="#f8fafc" opacity="0.95" />
              </g>

              {/* Weather Clouds */}
              <g style={{ mixBlendMode: "screen", opacity: 0.60 }}>
                <path d="M10,40 Q26,32 48,36 T94,34" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M16,56 Q40,50 66,54 T100,50" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              </g>

              <circle cx="52" cy="52" r="48" fill="url(#earthSpec)" />
              <circle cx="52" cy="52" r="48" fill="url(#earthTerm)" />
            </g>

            <circle cx="52" cy="52" r="47.5" fill="none" stroke="rgba(186,230,253,0.25)" strokeWidth="1" />
          </svg>
        </div>

        {/* ── 2. CHANDRAYAAN-3 (Active ~26s to 48s of 120s cycle) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            animation: "flightChandra 120s linear infinite 24s both",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              width: "18px",
              height: "20px",
              background: "radial-gradient(circle, rgba(56,189,248,0.7) 0%, transparent 75%)",
              animation: "enginePlumeSubtle 2.2s ease-in-out infinite",
            }}
          />
          <svg width="92" height="60" viewBox="0 0 92 60">
            {/* Left Solar Wing */}
            <rect x="0" y="20" width="30" height="16" rx="2" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.6)" strokeWidth="0.8" />
            <line x1="10" y1="20" x2="10" y2="36" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <line x1="20" y1="20" x2="20" y2="36" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <line x1="0" y1="28" x2="30" y2="28" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />

            {/* Right Solar Wing */}
            <rect x="62" y="20" width="30" height="16" rx="2" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.6)" strokeWidth="0.8" />
            <line x1="72" y1="20" x2="72" y2="36" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <line x1="82" y1="20" x2="82" y2="36" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <line x1="62" y1="28" x2="92" y2="28" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />

            <line x1="30" y1="28" x2="36" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="56" y1="28" x2="62" y2="28" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Gold Body */}
            <rect x="36" y="14" width="20" height="26" rx="2.5" fill="url(#goldMliG)" stroke="#f59e0b" strokeWidth="0.8" />
            <rect x="38" y="16" width="16" height="22" rx="2" fill="rgba(15,23,42,0.65)" />

            <ellipse cx="46" cy="11" rx="9" ry="3.5" fill="rgba(203,213,225,0.85)" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="46" y1="11" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="46" cy="11" r="1.4" fill="#38bdf8" />
            <text x="46" y="52" textAnchor="middle" fontSize="4.6" fill="rgba(56,189,248,0.85)" fontFamily="monospace" letterSpacing="0.8">CHANDRAYAAN-3</text>
          </svg>
        </div>

        {/* ── 3. SATURN (Active ~50s to 72s of 120s cycle) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            animation: "orbitSaturn 120s linear infinite 48s both",
            filter: "url(#shadow3d)",
          }}
        >
          <svg width="190" height="120" viewBox="0 0 190 120" style={{ filter: "drop-shadow(0 0 22px rgba(245,158,11,0.30))" }}>
            <defs>
              <clipPath id="saturnRoundClip">
                <circle cx="95" cy="60" r="38" />
              </clipPath>
              <clipPath id="saturnRingsFrontClip">
                <rect x="-95" y="0" width="190" height="42" />
              </clipPath>
            </defs>

            {/* Rear Rings */}
            <g transform="translate(95, 60) rotate(-16)">
              <ellipse cx="0" cy="0" rx="86" ry="20" fill="none" stroke="rgba(180,83,9,0.28)" strokeWidth="11" />
              <ellipse cx="0" cy="0" rx="78" ry="18" fill="none" stroke="rgba(245,158,11,0.60)" strokeWidth="7" />
              <ellipse cx="0" cy="0" rx="72" ry="16.5" fill="none" stroke="rgba(0,0,0,0.9)" strokeWidth="2.2" />
              <ellipse cx="0" cy="0" rx="66" ry="15" fill="none" stroke="rgba(253,224,71,0.70)" strokeWidth="8" />
              <ellipse cx="0" cy="0" rx="56" ry="13" fill="none" stroke="rgba(217,119,6,0.32)" strokeWidth="4.5" />
            </g>

            {/* Planet Base */}
            <circle cx="95" cy="60" r="38" fill="url(#saturnG)" />

            {/* Clipped Atmosphere */}
            <g clipPath="url(#saturnRoundClip)">
              <g style={{ mixBlendMode: "multiply", opacity: 0.55 }}>
                <path d="M 45,44 Q 75,41 95,44 T 145,42 L 145,51 Q 115,53 95,50 T 45,51 Z" fill="#92400e" />
                <path d="M 45,56 Q 75,53 95,56 T 145,54 L 145,64 Q 115,66 95,63 T 45,64 Z" fill="#78350f" />
                <path d="M 45,70 Q 75,68 95,70 T 145,69 L 145,78 Q 115,80 95,77 T 45,78 Z" fill="#92400e" />
              </g>
              <circle cx="95" cy="60" r="38" fill="url(#saturnSpec)" />
              <circle cx="95" cy="60" r="38" fill="url(#saturnTerm)" />
            </g>

            <circle cx="95" cy="60" r="37.5" fill="none" stroke="rgba(254,240,138,0.18)" strokeWidth="0.8" />

            {/* Front Rings */}
            <g transform="translate(95, 60) rotate(-16)">
              <g clipPath="url(#saturnRingsFrontClip)">
                <ellipse cx="0" cy="0" rx="86" ry="20" fill="none" stroke="rgba(180,83,9,0.28)" strokeWidth="11" />
                <ellipse cx="0" cy="0" rx="78" ry="18" fill="none" stroke="rgba(245,158,11,0.60)" strokeWidth="7" />
                <ellipse cx="0" cy="0" rx="72" ry="16.5" fill="none" stroke="rgba(0,0,0,0.9)" strokeWidth="2.2" />
                <ellipse cx="0" cy="0" rx="66" ry="15" fill="none" stroke="rgba(253,224,71,0.70)" strokeWidth="8" />
                <ellipse cx="0" cy="0" rx="56" ry="13" fill="none" stroke="rgba(217,119,6,0.32)" strokeWidth="4.5" />
              </g>
            </g>
          </svg>
        </div>

        {/* ── 4. ADITYA-L1 (Active ~74s to 94s of 120s cycle) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            animation: "flightAditya 120s linear infinite 72s both",
          }}
        >
          <svg width="86" height="58" viewBox="0 0 86 58">
            <rect x="2" y="20" width="26" height="14" rx="1.5" fill="url(#solarPanelG)" stroke="#38bdf8" strokeWidth="0.8" />
            <rect x="58" y="20" width="26" height="14" rx="1.5" fill="url(#solarPanelG)" stroke="#38bdf8" strokeWidth="0.8" />
            <line x1="28" y1="27" x2="34" y2="27" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="52" y1="27" x2="58" y2="27" stroke="#94a3b8" strokeWidth="1.2" />
            <polygon points="36,14 50,14 54,36 32,36" fill="url(#goldMliG)" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="43" cy="20" r="3.5" fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" />
            <circle cx="43" cy="20" r="1.5" fill="#ef4444" />
            <line x1="43" y1="14" x2="43" y2="6" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="43" cy="6" r="1.5" fill="#38bdf8" />
            <text x="43" y="50" textAnchor="middle" fontSize="4.5" fill="rgba(245,158,11,0.85)" fontFamily="monospace" letterSpacing="0.8">ADITYA-L1</text>
          </svg>
        </div>

        {/* ── 5. JUPITER (Active ~96s to 118s of 120s cycle) — 100% CIRCULAR, ZERO SQUARES! ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            animation: "orbitJupiter 120s linear infinite 95s both",
            filter: "url(#shadow3d)",
          }}
        >
          <svg width="112" height="112" viewBox="0 0 112 112" style={{ filter: "drop-shadow(0 0 22px rgba(217,119,6,0.32))" }}>
            <defs>
              {/* STRICT CIRCULAR CLIP: Guarantees Jupiter is 100% round, ZERO bleeding rects */}
              <clipPath id="jupRoundClip">
                <circle cx="56" cy="56" r="48" />
              </clipPath>
            </defs>

            {/* Base Jovian Sphere */}
            <circle cx="56" cy="56" r="48" fill="url(#jupG)" />

            {/* Everything inside is clipped to the 48px circle boundary! */}
            <g clipPath="url(#jupRoundClip)">
              {/* Jovian Atmospheric Bands — smooth organic waves */}
              <g style={{ mixBlendMode: "multiply", opacity: 0.58 }}>
                <path d="M 0,24 Q 28,20 56,24 T 112,22 L 112,32 Q 84,34 56,30 T 0,32 Z" fill="#78350f" />
                <path d="M 0,38 Q 28,34 56,38 T 112,36 L 112,48 Q 84,50 56,46 T 0,48 Z" fill="#92400e" />
                <path d="M 0,62 Q 28,58 56,62 T 112,60 L 112,73 Q 84,75 56,71 T 0,73 Z" fill="#854d0e" />
                <path d="M 0,79 Q 28,76 56,79 T 112,77 L 112,88 Q 84,90 56,87 T 0,88 Z" fill="#78350f" />
              </g>

              {/* The Great Red Spot */}
              <g style={{ mixBlendMode: "screen", opacity: 0.65 }}>
                <ellipse cx="72" cy="62" rx="14" ry="9" fill="#ef4444" />
                <ellipse cx="72" cy="62" rx="10" ry="6" fill="#f87171" />
                <ellipse cx="72" cy="62" rx="6" ry="3.5" fill="#fef08a" />
                <path d="M 10,42 Q 32,38 56,42 T 100,40" fill="none" stroke="rgba(254,240,138,0.25)" strokeWidth="1.2" />
              </g>

              {/* Specular & Day-Night Terminator */}
              <circle cx="56" cy="56" r="48" fill="url(#jupSpec)" />
              <circle cx="56" cy="56" r="48" fill="url(#jupTerm)" />
            </g>

            {/* Moon Io in Orbit */}
            <circle cx="98" cy="45" r="2.8" fill="#fef08a" filter="drop-shadow(0 0 3px #f59e0b)" />

            {/* Rim stroke */}
            <circle cx="56" cy="56" r="47.5" fill="none" stroke="rgba(254,243,199,0.15)" strokeWidth="1" />
          </svg>
        </div>

      </div>
    </>
  );
}
