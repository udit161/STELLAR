import React, { useMemo } from "react";

export default function SpaceAnomalies() {
  // Peaceful, subtle background starfield
  const stars = useMemo(() => {
    const starList = [];
    const colors = ["#ffffff", "#e0f2fe", "#bae6fd", "#fef08a", "#f5d0fe", "#d1fae5"];

    let seed = 2026;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < 80; i++) {
      const top = (rnd() * 92 + 4).toFixed(2);
      const left = (rnd() * 92 + 4).toFixed(2);
      const size = (rnd() * 2 + 0.6).toFixed(1);
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
           SEQUENTIAL CELESTIAL FLIGHTS — 480s Cycle
           15 objects: 8 solar system planets, 4 ISRO/space missions,
           1 ISS, 1 comet anomaly, 1 space debris anomaly
           Varied directions: left↔right, top↓bottom, diagonals
           ========================================================= */

        /* Object 1: EARTH — left→right diagonal ↘ */
        @keyframes orbitEarth {
          0%    { transform: translate(8vw, 10vh) scale(0.60); opacity: 0; }
          3%    { opacity: 0.90; }
          15%   { transform: translate(45vw, 22vh) scale(0.88); opacity: 0.88; }
          18%   { transform: translate(80vw, 30vh) scale(0.62); opacity: 0; }
          100%  { transform: translate(80vw, 30vh) scale(0.62); opacity: 0; }
        }

        /* Object 2: MARS — right→left diagonal ↙ */
        @keyframes orbitMars {
          0%    { transform: translate(82vw, 12vh) scale(0.58); opacity: 0; }
          3%    { opacity: 0.88; }
          15%   { transform: translate(46vw, 20vh) scale(0.80); opacity: 0.88; }
          18%   { transform: translate(12vw, 28vh) scale(0.58); opacity: 0; }
          100%  { transform: translate(12vw, 28vh) scale(0.58); opacity: 0; }
        }

        /* Object 3: CHANDRAYAAN-3 — left→right angled ↗ */
        @keyframes flightChandra {
          0%    { transform: translate(10vw, 18vh) rotate(8deg) scale(0.72); opacity: 0; }
          3%    { opacity: 0.92; }
          15%   { transform: translate(48vw, 26vh) rotate(14deg) scale(0.85); opacity: 0.92; }
          18%   { transform: translate(84vw, 36vh) rotate(20deg) scale(0.62); opacity: 0; }
          100%  { transform: translate(84vw, 36vh) rotate(20deg) scale(0.62); opacity: 0; }
        }

        /* Object 4: SATURN — right→left horizontal ← */
        @keyframes orbitSaturn {
          0%    { transform: translate(78vw, 10vh) scale(0.62); opacity: 0; }
          3%    { opacity: 0.84; }
          15%   { transform: translate(44vw, 20vh) scale(0.88); opacity: 0.84; }
          18%   { transform: translate(14vw, 28vh) scale(0.60); opacity: 0; }
          100%  { transform: translate(14vw, 28vh) scale(0.60); opacity: 0; }
        }

        /* Object 5: ADITYA-L1 — right→left tilted ↖ */
        @keyframes flightAditya {
          0%    { transform: translate(74vw, 16vh) rotate(-10deg) scale(0.68); opacity: 0; }
          3%    { opacity: 0.88; }
          14%   { transform: translate(42vw, 24vh) rotate(-6deg) scale(0.84); opacity: 0.88; }
          17%   { transform: translate(12vw, 32vh) rotate(-2deg) scale(0.60); opacity: 0; }
          100%  { transform: translate(12vw, 32vh) rotate(-2deg) scale(0.60); opacity: 0; }
        }

        /* Object 6: JUPITER — left→right gentle arc → */
        @keyframes orbitJupiter {
          0%    { transform: translate(10vw, 20vh) scale(0.62); opacity: 0; }
          3%    { opacity: 0.84; }
          14%   { transform: translate(46vw, 14vh) scale(0.88); opacity: 0.84; }
          17%   { transform: translate(80vw, 20vh) scale(0.60); opacity: 0; }
          100%  { transform: translate(80vw, 20vh) scale(0.60); opacity: 0; }
        }

        /* Object 7: VENUS — right→left ← */
        @keyframes orbitVenus {
          0%    { transform: translate(76vw, 14vh) scale(0.60); opacity: 0; }
          3%    { opacity: 0.86; }
          15%   { transform: translate(44vw, 22vh) scale(0.84); opacity: 0.86; }
          18%   { transform: translate(12vw, 30vh) scale(0.58); opacity: 0; }
          100%  { transform: translate(12vw, 30vh) scale(0.58); opacity: 0; }
        }

        /* Object 8: COMET — India Logo (top-left) → ISRO Logo (bottom-right) ↘ */
        @keyframes cometFlight {
          0%    { transform: translate(3.5vw, 4.5vh) rotate(43deg) scale(0.68); opacity: 0; }
          2%    { opacity: 0.95; }
          12%   { transform: translate(48vw, 46.5vh) rotate(43deg) scale(0.85); opacity: 0.90; }
          16%   { transform: translate(92.5vw, 88.5vh) rotate(43deg) scale(0.65); opacity: 0; }
          100%  { transform: translate(92.5vw, 88.5vh) rotate(43deg) scale(0.65); opacity: 0; }
        }

        /* Object 9: SPACE DEBRIS — India Logo (top-left) → ISRO Logo (bottom-right) ↘ */
        @keyframes debrisField {
          0%    { transform: translate(4vw, 5.5vh) rotate(0deg) scale(0.70); opacity: 0; }
          2%    { opacity: 0.85; }
          12%   { transform: translate(48.5vw, 47.5vh) rotate(180deg) scale(0.88); opacity: 0.82; }
          16%   { transform: translate(93vw, 89.5vh) rotate(360deg) scale(0.60); opacity: 0; }
          100%  { transform: translate(93vw, 89.5vh) rotate(360deg) scale(0.60); opacity: 0; }
        }

        /* Object 16: QUANTUM ENERGY ORB ANOMALY — India Logo → ISRO Logo ↘ */
        @keyframes indiaToIsroOrb {
          0%    { transform: translate(4vw, 5vh) scale(0.60); opacity: 0; }
          2%    { opacity: 0.92; }
          12%   { transform: translate(48vw, 47vh) scale(0.90); opacity: 0.88; }
          16%   { transform: translate(92vw, 89vh) scale(0.62); opacity: 0; }
          100%  { transform: translate(92vw, 89vh) scale(0.62); opacity: 0; }
        }

        /* Object 17: TELEMETRY PLASMA RIBBON ANOMALY — India Logo → ISRO Logo ↘ */
        @keyframes indiaToIsroPlasma {
          0%    { transform: translate(4.5vw, 5.5vh) rotate(43deg) scale(0.65); opacity: 0; }
          2%    { opacity: 0.90; }
          12%   { transform: translate(49vw, 48vh) rotate(43deg) scale(0.86); opacity: 0.85; }
          16%   { transform: translate(93.5vw, 90vh) rotate(43deg) scale(0.60); opacity: 0; }
          100%  { transform: translate(93.5vw, 90vh) rotate(43deg) scale(0.60); opacity: 0; }
        }

        /* Object 10: MERCURY — top→bottom ↓ steep diagonal */
        @keyframes orbitMercury {
          0%    { transform: translate(22vw, -5vh) scale(0.50); opacity: 0; }
          3%    { opacity: 0.85; }
          14%   { transform: translate(38vw, 32vh) scale(0.72); opacity: 0.85; }
          17%   { transform: translate(52vw, 62vh) scale(0.50); opacity: 0; }
          100%  { transform: translate(52vw, 62vh) scale(0.50); opacity: 0; }
        }

        /* Object 11: NEPTUNE — bottom-left → top-right ↗ */
        @keyframes orbitNeptune {
          0%    { transform: translate(6vw, 65vh) scale(0.62); opacity: 0; }
          3%    { opacity: 0.82; }
          15%   { transform: translate(42vw, 30vh) scale(0.88); opacity: 0.82; }
          18%   { transform: translate(78vw, 8vh) scale(0.60); opacity: 0; }
          100%  { transform: translate(78vw, 8vh) scale(0.60); opacity: 0; }
        }

        /* Object 12: URANUS — top-right → bottom-left ↙ */
        @keyframes orbitUranus {
          0%    { transform: translate(80vw, 5vh) scale(0.58); opacity: 0; }
          3%    { opacity: 0.80; }
          15%   { transform: translate(48vw, 35vh) scale(0.82); opacity: 0.80; }
          18%   { transform: translate(10vw, 62vh) scale(0.55); opacity: 0; }
          100%  { transform: translate(10vw, 62vh) scale(0.55); opacity: 0; }
        }

        /* Object 13: ISS — fast horizontal left→right → (low orbit) */
        @keyframes flightISS {
          0%    { transform: translate(-8vw, 42vh) rotate(2deg) scale(0.80); opacity: 0; }
          2%    { opacity: 0.95; }
          10%   { transform: translate(45vw, 40vh) rotate(1deg) scale(0.90); opacity: 0.92; }
          13%   { transform: translate(108vw, 38vh) rotate(0deg) scale(0.78); opacity: 0; }
          100%  { transform: translate(108vw, 38vh) rotate(0deg) scale(0.78); opacity: 0; }
        }

        /* Object 14: MOM MANGALYAAN — diagonal ↗ bottom→top-right */
        @keyframes flightMOM {
          0%    { transform: translate(15vw, 68vh) rotate(-30deg) scale(0.70); opacity: 0; }
          3%    { opacity: 0.90; }
          14%   { transform: translate(46vw, 32vh) rotate(-28deg) scale(0.84); opacity: 0.90; }
          17%   { transform: translate(76vw, 6vh) rotate(-26deg) scale(0.62); opacity: 0; }
          100%  { transform: translate(76vw, 6vh) rotate(-26deg) scale(0.62); opacity: 0; }
        }

        /* Object 15: PSLV-C55 — top-left → bottom vertical ↓ */
        @keyframes flightPSLV {
          0%    { transform: translate(58vw, -8vh) rotate(90deg) scale(0.75); opacity: 0; }
          2%    { opacity: 0.92; }
          12%   { transform: translate(60vw, 40vh) rotate(90deg) scale(0.88); opacity: 0.90; }
          15%   { transform: translate(62vw, 78vh) rotate(90deg) scale(0.65); opacity: 0; }
          100%  { transform: translate(62vw, 78vh) rotate(90deg) scale(0.65); opacity: 0; }
        }

        /* Shooting stars along India→ISRO trajectory */
        @keyframes meteorRare1 {
          0%    { transform: translate(3.5vw, 4.5vh) rotate(43deg) scaleX(0); opacity: 0; }
          1.5%  { opacity: 0.95; transform: translate(48vw, 46.5vh) rotate(43deg) scaleX(1); }
          3%    { opacity: 0; transform: translate(92.5vw, 88.5vh) rotate(43deg) scaleX(1.4); }
          100%  { opacity: 0; transform: translate(92.5vw, 88.5vh) rotate(43deg) scaleX(0); }
        }
        @keyframes meteorRare2 {
          0%    { transform: translate(0, 0) rotate(-28deg) scaleX(0); opacity: 0; }
          1.5%  { opacity: 0.90; transform: translate(20vw, 22vh) rotate(-28deg) scaleX(1); }
          3%    { opacity: 0; transform: translate(45vw, 50vh) rotate(-28deg) scaleX(1.2); }
          100%  { opacity: 0; transform: translate(45vw, 50vh) rotate(-28deg) scaleX(0); }
        }

        @keyframes starTwinkleSubtle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50%      { opacity: 0.75; transform: scale(1.2); }
        }
        @keyframes enginePlumeSubtle {
          0%, 100% { opacity: 0.45; filter: blur(3px); }
          50%      { opacity: 0.90; filter: blur(5px); }
        }
        @keyframes cometTailPulse {
          0%, 100% { opacity: 0.70; }
          50%      { opacity: 1.00; }
        }
        @keyframes nebulaFloat {
          0%   { transform: translateX(0px) scale(1); opacity: 0.04; }
          50%  { transform: translateX(8px) scale(1.04); opacity: 0.07; }
          100% { transform: translateX(0px) scale(1); opacity: 0.04; }
        }
        @keyframes debrisSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes telemetryDashFlow {
          from { stroke-dashoffset: 320; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* SVG Global Definitions: Universal Gradients & 3D Shading */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="shadow3d" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="-4" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.80" />
          </filter>

          {/* Earth */}
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

          {/* Mars */}
          <radialGradient id="marsG" cx="36%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="22%" stopColor="#f87171" />
            <stop offset="45%" stopColor="#dc2626" />
            <stop offset="68%" stopColor="#991b1b" />
            <stop offset="88%" stopColor="#450a0a" />
            <stop offset="100%" stopColor="#1c0a02" />
          </radialGradient>
          <radialGradient id="marsSpec" cx="30%" cy="24%" r="32%">
            <stop offset="0%" stopColor="rgba(255,200,180,0.50)" />
            <stop offset="55%" stopColor="rgba(252,165,165,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="marsTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="52%" stopColor="transparent" />
            <stop offset="80%" stopColor="rgba(0,0,0,0.40)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.78)" />
          </linearGradient>

          {/* Venus */}
          <radialGradient id="venusG" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="20%" stopColor="#fde047" />
            <stop offset="44%" stopColor="#ca8a04" />
            <stop offset="68%" stopColor="#854d0e" />
            <stop offset="88%" stopColor="#431407" />
            <stop offset="100%" stopColor="#1c0a02" />
          </radialGradient>
          <radialGradient id="venusSpec" cx="30%" cy="25%" r="34%">
            <stop offset="0%" stopColor="rgba(255,249,200,0.65)" />
            <stop offset="60%" stopColor="rgba(253,224,71,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="venusTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="78%" stopColor="rgba(0,0,0,0.42)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.80)" />
          </linearGradient>

          {/* Saturn */}
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

          {/* Jupiter */}
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

          {/* Spacecraft */}
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

          {/* India-to-ISRO Telemetry Corridor Vector */}
          <linearGradient id="indiaIsroVectorG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#e6641e" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="anomalyOrbG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#7dd3fc" />
            <stop offset="55%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Comet */}
          <linearGradient id="cometTailG" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="rgba(147,197,253,0.35)" />
            <stop offset="75%" stopColor="rgba(224,242,254,0.75)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
          </linearGradient>
          <linearGradient id="cometTailG2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(125,211,252,0.20)" />
            <stop offset="100%" stopColor="rgba(186,230,253,0.55)" />
          </linearGradient>
          <radialGradient id="cometCoreG" cx="60%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#bae6fd" />
            <stop offset="70%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
          {/* Mercury */}
          <radialGradient id="mercuryG" cx="36%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#d4b896" />
            <stop offset="25%" stopColor="#b8956a" />
            <stop offset="50%" stopColor="#8b6914" />
            <stop offset="75%" stopColor="#5c4008" />
            <stop offset="92%" stopColor="#2d1f04" />
            <stop offset="100%" stopColor="#0f0a02" />
          </radialGradient>
          <radialGradient id="mercurySpec" cx="28%" cy="22%" r="30%">
            <stop offset="0%" stopColor="rgba(220,195,155,0.55)" />
            <stop offset="60%" stopColor="rgba(184,149,106,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="mercuryTerm" x1="88%" y1="0%" x2="12%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="80%" stopColor="rgba(0,0,0,0.50)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.85)" />
          </linearGradient>

          {/* Neptune */}
          <radialGradient id="neptuneG" cx="36%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="22%" stopColor="#3b82f6" />
            <stop offset="48%" stopColor="#1d4ed8" />
            <stop offset="72%" stopColor="#1e3a8a" />
            <stop offset="90%" stopColor="#0c1f5c" />
            <stop offset="100%" stopColor="#020b2e" />
          </radialGradient>
          <radialGradient id="neptuneSpec" cx="30%" cy="24%" r="32%">
            <stop offset="0%" stopColor="rgba(147,197,253,0.55)" />
            <stop offset="55%" stopColor="rgba(59,130,246,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="neptuneTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="52%" stopColor="transparent" />
            <stop offset="80%" stopColor="rgba(0,0,0,0.45)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.80)" />
          </linearGradient>

          {/* Uranus */}
          <radialGradient id="uranusG" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="22%" stopColor="#34d399" />
            <stop offset="46%" stopColor="#059669" />
            <stop offset="70%" stopColor="#065f46" />
            <stop offset="88%" stopColor="#022c22" />
            <stop offset="100%" stopColor="#010f0c" />
          </radialGradient>
          <radialGradient id="uranusSpec" cx="30%" cy="24%" r="32%">
            <stop offset="0%" stopColor="rgba(167,243,208,0.55)" />
            <stop offset="55%" stopColor="rgba(52,211,153,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="uranusTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="78%" stopColor="rgba(0,0,0,0.42)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.78)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Celestial Viewport */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>

        {/* ── AMBIENT NEBULA BACKDROPS ── */}
        <div style={{ position: "absolute", top: "8%", right: "12%", width: "55vw", height: "55vh",
          background: "radial-gradient(ellipse at center, rgba(14,165,233,0.04) 0%, transparent 65%)",
          filter: "blur(80px)", animation: "nebulaFloat 12s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "8%", width: "40vw", height: "40vh",
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.03) 0%, transparent 65%)",
          filter: "blur(90px)", animation: "nebulaFloat 16s ease-in-out infinite 4s" }} />
        <div style={{ position: "absolute", top: "40%", right: "30%", width: "35vw", height: "35vh",
          background: "radial-gradient(ellipse at center, rgba(220,38,38,0.025) 0%, transparent 65%)",
          filter: "blur(70px)", animation: "nebulaFloat 20s ease-in-out infinite 8s" }} />

        {/* ── INDIA LOGO TO ISRO LOGO TELEMETRY CORRIDOR BEAM ── */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <line
            x1="4.5%" y1="5.5%"
            x2="93.5%" y2="89.5%"
            stroke="url(#indiaIsroVectorG)"
            strokeWidth="1.2"
            strokeDasharray="6 12"
            style={{ animation: "telemetryDashFlow 16s linear infinite", opacity: 0.30 }}
          />
        </svg>

        {/* ── TWINKLING STARS ── */}
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
                boxShadow: `0 0 3px ${s.color}`,
                animation: `starTwinkleSubtle ${s.duration} ease-in-out infinite alternate ${s.delay}`,
              }}
            />
          ))}
        </div>

        {/* ── SHOOTING STARS ── */}
        <div style={{ position: "absolute", top: "10%", left: "42%", width: "140px", height: "1.5px",
          background: "linear-gradient(90deg, #ffffff 0%, rgba(147,197,253,0.7) 35%, transparent 100%)",
          borderRadius: "2px", animation: "meteorRare1 45s ease-out infinite 6s", transformOrigin: "left center" }} />
        <div style={{ position: "absolute", top: "28%", left: "18%", width: "110px", height: "1.2px",
          background: "linear-gradient(90deg, #ffffff 0%, rgba(196,181,253,0.7) 35%, transparent 100%)",
          borderRadius: "2px", animation: "meteorRare2 60s ease-out infinite 22s", transformOrigin: "left center" }} />

        {/* =================================================================
           CELESTIAL OBJECTS — 15 total on a 480s cycle
           Varied directions for all objects
           ================================================================= */}

        {/* ── 1. EARTH — ↘ left to right diagonal ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "orbitEarth 480s linear infinite 0s both", filter: "url(#shadow3d)" }}>
          <svg width="104" height="104" viewBox="0 0 104 104"
            style={{ filter: "drop-shadow(0 0 22px rgba(14,165,233,0.40))" }}>
            <defs>
              <clipPath id="earthRoundClip"><circle cx="52" cy="52" r="48" /></clipPath>
            </defs>
            <circle cx="52" cy="52" r="48" fill="url(#earthG)" />
            <g clipPath="url(#earthRoundClip)">
              <g style={{ opacity: 0.85 }}>
                <path d="M38,26 Q46,20 60,23 Q72,28 76,40 Q70,48 60,46 Q56,56 52,62 Q48,54 44,46 Q34,42 36,32 Z"
                  fill="#15803d" stroke="#166534" strokeWidth="0.8" />
                <path d="M26,44 Q36,40 42,46 Q46,56 40,70 Q34,76 30,66 Q24,58 26,44 Z"
                  fill="#b45309" opacity="0.80" />
                <ellipse cx="74" cy="72" rx="7" ry="5" fill="#15803d" />
                <circle cx="86" cy="66" r="2" fill="#16a34a" />
                <ellipse cx="52" cy="8" rx="16" ry="4" fill="#f8fafc" opacity="0.95" />
                <ellipse cx="52" cy="96" rx="20" ry="4.5" fill="#f8fafc" opacity="0.95" />
              </g>
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

        {/* ── 2. MARS — ↙ right to left diagonal ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "orbitMars 480s linear infinite 30s both", filter: "url(#shadow3d)" }}>
          <svg width="90" height="90" viewBox="0 0 90 90"
            style={{ filter: "drop-shadow(0 0 20px rgba(220,38,38,0.42))" }}>
            <defs>
              <clipPath id="marsRoundClip"><circle cx="45" cy="45" r="41" /></clipPath>
            </defs>
            <circle cx="45" cy="45" r="41" fill="url(#marsG)" />
            <g clipPath="url(#marsRoundClip)">
              {/* Valles Marineris canyon system */}
              <path d="M18,40 Q30,36 50,38 Q62,42 70,40" fill="none" stroke="rgba(100,25,25,0.70)"
                strokeWidth="3.5" strokeLinecap="round" />
              <path d="M22,48 Q36,44 54,47 Q66,50 72,47" fill="none" stroke="rgba(80,15,15,0.55)"
                strokeWidth="2.5" strokeLinecap="round" />
              {/* Olympus Mons */}
              <circle cx="30" cy="34" r="5" fill="rgba(140,35,35,0.55)" />
              <circle cx="30" cy="34" r="2.5" fill="rgba(160,50,50,0.40)" />
              {/* Polar ice caps */}
              <ellipse cx="45" cy="7" rx="13" ry="4.5" fill="rgba(240,248,255,0.88)" />
              <ellipse cx="45" cy="83" rx="10" ry="3.5" fill="rgba(230,242,255,0.70)" />
              {/* Dust storm */}
              <path d="M50,54 Q62,50 72,55 Q68,64 56,62 Z" fill="rgba(220,120,60,0.30)" />
              <circle cx="45" cy="45" r="41" fill="url(#marsSpec)" />
              <circle cx="45" cy="45" r="41" fill="url(#marsTerm)" />
            </g>
            <circle cx="45" cy="45" r="40.5" fill="none" stroke="rgba(252,165,165,0.20)" strokeWidth="0.8" />
          </svg>
        </div>

        {/* ── 3. CHANDRAYAAN-3 — ↗ left to right angled ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "flightChandra 480s linear infinite 60s both" }}>
          <div style={{ position: "absolute", bottom: "-10px", left: "50%", width: "18px", height: "22px",
            background: "radial-gradient(circle, rgba(56,189,248,0.75) 0%, transparent 75%)",
            animation: "enginePlumeSubtle 2.2s ease-in-out infinite" }} />
          <svg width="92" height="60" viewBox="0 0 92 60">
            <rect x="0" y="20" width="30" height="16" rx="2" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.6)" strokeWidth="0.8" />
            <line x1="10" y1="20" x2="10" y2="36" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <line x1="20" y1="20" x2="20" y2="36" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <line x1="0" y1="28" x2="30" y2="28" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <rect x="62" y="20" width="30" height="16" rx="2" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.6)" strokeWidth="0.8" />
            <line x1="72" y1="20" x2="72" y2="36" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <line x1="82" y1="20" x2="82" y2="36" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <line x1="62" y1="28" x2="92" y2="28" stroke="rgba(56,189,248,0.35)" strokeWidth="0.5" />
            <line x1="30" y1="28" x2="36" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="56" y1="28" x2="62" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="36" y="14" width="20" height="26" rx="2.5" fill="url(#goldMliG)" stroke="#f59e0b" strokeWidth="0.8" />
            <rect x="38" y="16" width="16" height="22" rx="2" fill="rgba(15,23,42,0.65)" />
            <ellipse cx="46" cy="11" rx="9" ry="3.5" fill="rgba(203,213,225,0.85)" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="46" y1="11" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="46" cy="11" r="1.4" fill="#38bdf8" />
            <text x="46" y="52" textAnchor="middle" fontSize="4.6" fill="rgba(56,189,248,0.85)"
              fontFamily="monospace" letterSpacing="0.8">CHANDRAYAAN-3</text>
          </svg>
        </div>

        {/* ── 4. SATURN — ← right to left horizontal ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "orbitSaturn 480s linear infinite 88s both", filter: "url(#shadow3d)" }}>
          <svg width="190" height="120" viewBox="0 0 190 120"
            style={{ filter: "drop-shadow(0 0 22px rgba(245,158,11,0.30))" }}>
            <defs>
              <clipPath id="saturnRoundClip"><circle cx="95" cy="60" r="38" /></clipPath>
              <clipPath id="saturnRingsFrontClip"><rect x="-95" y="0" width="190" height="42" /></clipPath>
            </defs>
            <g transform="translate(95, 60) rotate(-16)">
              <ellipse cx="0" cy="0" rx="86" ry="20" fill="none" stroke="rgba(180,83,9,0.28)" strokeWidth="11" />
              <ellipse cx="0" cy="0" rx="78" ry="18" fill="none" stroke="rgba(245,158,11,0.60)" strokeWidth="7" />
              <ellipse cx="0" cy="0" rx="72" ry="16.5" fill="none" stroke="rgba(0,0,0,0.9)" strokeWidth="2.2" />
              <ellipse cx="0" cy="0" rx="66" ry="15" fill="none" stroke="rgba(253,224,71,0.70)" strokeWidth="8" />
              <ellipse cx="0" cy="0" rx="56" ry="13" fill="none" stroke="rgba(217,119,6,0.32)" strokeWidth="4.5" />
            </g>
            <circle cx="95" cy="60" r="38" fill="url(#saturnG)" />
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

        {/* ── 5. ADITYA-L1 — ↖ right to left tilted ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "flightAditya 480s linear infinite 118s both" }}>
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
            <text x="43" y="50" textAnchor="middle" fontSize="4.5" fill="rgba(245,158,11,0.85)"
              fontFamily="monospace" letterSpacing="0.8">ADITYA-L1</text>
          </svg>
        </div>

        {/* ── 6. JUPITER — → left to right arc ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "orbitJupiter 480s linear infinite 146s both", filter: "url(#shadow3d)" }}>
          <svg width="112" height="112" viewBox="0 0 112 112"
            style={{ filter: "drop-shadow(0 0 22px rgba(217,119,6,0.32))" }}>
            <defs>
              <clipPath id="jupRoundClip"><circle cx="56" cy="56" r="48" /></clipPath>
            </defs>
            <circle cx="56" cy="56" r="48" fill="url(#jupG)" />
            <g clipPath="url(#jupRoundClip)">
              <g style={{ mixBlendMode: "multiply", opacity: 0.58 }}>
                <path d="M 0,24 Q 28,20 56,24 T 112,22 L 112,32 Q 84,34 56,30 T 0,32 Z" fill="#78350f" />
                <path d="M 0,38 Q 28,34 56,38 T 112,36 L 112,48 Q 84,50 56,46 T 0,48 Z" fill="#92400e" />
                <path d="M 0,62 Q 28,58 56,62 T 112,60 L 112,73 Q 84,75 56,71 T 0,73 Z" fill="#854d0e" />
                <path d="M 0,79 Q 28,76 56,79 T 112,77 L 112,88 Q 84,90 56,87 T 0,88 Z" fill="#78350f" />
              </g>
              <g style={{ mixBlendMode: "screen", opacity: 0.65 }}>
                <ellipse cx="72" cy="62" rx="14" ry="9" fill="#ef4444" />
                <ellipse cx="72" cy="62" rx="10" ry="6" fill="#f87171" />
                <ellipse cx="72" cy="62" rx="6" ry="3.5" fill="#fef08a" />
                <path d="M 10,42 Q 32,38 56,42 T 100,40" fill="none" stroke="rgba(254,240,138,0.25)" strokeWidth="1.2" />
              </g>
              <circle cx="56" cy="56" r="48" fill="url(#jupSpec)" />
              <circle cx="56" cy="56" r="48" fill="url(#jupTerm)" />
            </g>
            <circle cx="98" cy="45" r="2.8" fill="#fef08a" filter="drop-shadow(0 0 3px #f59e0b)" />
            <circle cx="56" cy="56" r="47.5" fill="none" stroke="rgba(254,243,199,0.15)" strokeWidth="1" />
          </svg>
        </div>

        {/* ── 7. VENUS — ← right to left ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "orbitVenus 480s linear infinite 175s both", filter: "url(#shadow3d)" }}>
          <svg width="96" height="96" viewBox="0 0 96 96"
            style={{ filter: "drop-shadow(0 0 20px rgba(202,138,4,0.45))" }}>
            <defs>
              <clipPath id="venusRoundClip"><circle cx="48" cy="48" r="44" /></clipPath>
            </defs>
            <circle cx="48" cy="48" r="44" fill="url(#venusG)" />
            <g clipPath="url(#venusRoundClip)">
              <g style={{ mixBlendMode: "screen", opacity: 0.40 }}>
                <path d="M 0,18 Q 24,14 48,18 T 96,16 L 96,28 Q 72,30 48,26 T 0,28 Z" fill="#fef08a" />
                <path d="M 0,36 Q 24,32 48,36 T 96,34 L 96,44 Q 72,46 48,42 T 0,44 Z" fill="#fde047" />
                <path d="M 0,58 Q 24,54 48,58 T 96,56 L 96,67 Q 72,69 48,65 T 0,67 Z" fill="#fef08a" />
                <path d="M 0,76 Q 24,72 48,76 T 96,74 L 96,84 Q 72,86 48,82 T 0,84 Z" fill="#fde047" />
              </g>
              <path d="M 8,24 Q 28,18 55,22 T 90,20" fill="none" stroke="rgba(255,250,180,0.35)"
                strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="48" cy="48" r="44" fill="url(#venusSpec)" />
              <circle cx="48" cy="48" r="44" fill="url(#venusTerm)" />
            </g>
            <circle cx="48" cy="48" r="43.5" fill="none" stroke="rgba(254,240,138,0.30)" strokeWidth="1.5" />
            <circle cx="48" cy="48" r="46" fill="none" stroke="rgba(253,224,71,0.10)" strokeWidth="2.5" />
          </svg>
        </div>

        {/* ── 8. COMET ANOMALY — India Logo (top-left) → ISRO Logo (bottom-right) ↘ ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "cometFlight 480s linear infinite 15s both" }}>
          <svg width="220" height="70" viewBox="0 0 220 70"
            style={{ filter: "drop-shadow(0 0 16px rgba(186,230,253,0.70))" }}>
            <path d="M 202,35 Q 160,52 0,65" fill="none" stroke="url(#cometTailG2)" strokeWidth="18"
              strokeLinecap="round" opacity="0.55" />
            <path d="M 202,35 Q 150,42 0,48" fill="none" stroke="url(#cometTailG)" strokeWidth="7"
              strokeLinecap="round" />
            <circle cx="202" cy="35" r="14" fill="rgba(186,230,253,0.30)" />
            <circle cx="202" cy="35" r="10" fill="rgba(224,242,254,0.50)" />
            <circle cx="202" cy="35" r="6" fill="url(#cometCoreG)" />
            <circle cx="202" cy="35" r="3" fill="#ffffff" />
            <path d="M 202,35 Q 185,46 150,52" fill="none" stroke="rgba(186,230,253,0.60)"
              strokeWidth="2" strokeLinecap="round" />
            <path d="M 202,35 Q 182,40 142,45" fill="none" stroke="rgba(147,197,253,0.40)"
              strokeWidth="1.2" strokeLinecap="round" />
            <text x="140" y="66" textAnchor="middle" fontSize="4.2" fill="rgba(186,230,253,0.85)"
              fontFamily="monospace" letterSpacing="0.8">COMET ANOMALY</text>
          </svg>
        </div>

        {/* ── 9. SPACE DEBRIS ANOMALY — India Logo (top-left) → ISRO Logo (bottom-right) ↘ ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "debrisField 480s linear infinite 135s both" }}>
          <svg width="110" height="90" viewBox="0 0 110 90"
            style={{ filter: "drop-shadow(0 0 10px rgba(148,163,184,0.50))" }}>
            <rect x="38" y="30" width="34" height="20" rx="2" fill="#334155" stroke="#64748b" strokeWidth="0.8" />
            <rect x="40" y="33" width="10" height="7" rx="1" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
            <rect x="54" y="33" width="16" height="7" rx="1" fill="rgba(14,165,233,0.15)" stroke="#0284c7" strokeWidth="0.5" />
            <rect x="4" y="34" width="32" height="12" rx="1" fill="url(#solarPanelG)" stroke="#334155" strokeWidth="0.8" opacity="0.65" />
            <line x1="15" y1="34" x2="15" y2="46" stroke="rgba(56,189,248,0.25)" strokeWidth="0.5" />
            <line x1="26" y1="34" x2="26" y2="46" stroke="rgba(56,189,248,0.25)" strokeWidth="0.5" />
            <polygon points="88,22 94,28 86,32 80,26" fill="#475569" stroke="#64748b" strokeWidth="0.5" />
            <polygon points="95,50 102,55 98,62 91,57" fill="#334155" stroke="#475569" strokeWidth="0.5" />
            <polygon points="18,62 25,68 20,75 13,69" fill="#3f4f65" stroke="#64748b" strokeWidth="0.5" />
            <circle cx="72" cy="18" r="2.5" fill="#64748b" />
            <circle cx="102" cy="34" r="1.8" fill="#475569" />
            <circle cx="8" cy="40" r="1.5" fill="#64748b" />
            <text x="55" y="62" textAnchor="middle" fontSize="4" fill="rgba(148,163,184,0.75)"
              fontFamily="monospace" letterSpacing="0.6">SPACE DEBRIS</text>
          </svg>
        </div>

        {/* ── 16. QUANTUM ANOMALY ORB — India Logo (top-left) → ISRO Logo (bottom-right) ↘ ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "indiaToIsroOrb 480s linear infinite 255s both" }}>
          <svg width="100" height="100" viewBox="0 0 100 100"
            style={{ filter: "drop-shadow(0 0 18px rgba(56,189,248,0.70))" }}>
            <circle cx="50" cy="50" r="38" fill="url(#anomalyOrbG)" opacity="0.85" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(245,158,11,0.60)" strokeWidth="1.5"
              strokeDasharray="8 6" style={{ animation: "debrisSpin 6s linear infinite" }} />
            <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(56,189,248,0.80)" strokeWidth="1.8"
              strokeDasharray="5 5" style={{ animation: "debrisSpin 4s linear infinite reverse" }} />
            <circle cx="50" cy="50" r="8" fill="#ffffff" style={{ filter: "drop-shadow(0 0 8px #ffffff)" }} />
            <text x="50" y="86" textAnchor="middle" fontSize="4.5" fill="rgba(245,158,11,0.90)"
              fontFamily="monospace" letterSpacing="0.8">QUANTUM ANOMALY</text>
          </svg>
        </div>

        {/* ── 17. TELEMETRY PLASMA RIBBON ANOMALY — India Logo → ISRO Logo ↘ ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "indiaToIsroPlasma 480s linear infinite 375s both" }}>
          <svg width="180" height="80" viewBox="0 0 180 80"
            style={{ filter: "drop-shadow(0 0 16px rgba(251,146,60,0.65))" }}>
            <path d="M 0,40 Q 45,10 90,40 T 180,40" fill="none" stroke="url(#indiaIsroVectorG)" strokeWidth="4"
              strokeLinecap="round" opacity="0.85" />
            <path d="M 0,40 Q 45,70 90,40 T 180,40" fill="none" stroke="rgba(56,189,248,0.70)" strokeWidth="2"
              strokeDasharray="6 4" strokeLinecap="round" />
            <circle cx="180" cy="40" r="6" fill="#f97316" style={{ filter: "drop-shadow(0 0 8px #f97316)" }} />
            <circle cx="180" cy="40" r="3" fill="#ffffff" />
            <text x="90" y="70" textAnchor="middle" fontSize="4.2" fill="rgba(56,189,248,0.85)"
              fontFamily="monospace" letterSpacing="0.8">PLASMA RIFT ANOMALY</text>
          </svg>
        </div>

        {/* ── 10. MERCURY — ↓ top to bottom steep diagonal ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "orbitMercury 480s linear infinite 245s both", filter: "url(#shadow3d)" }}>
          <svg width="62" height="62" viewBox="0 0 62 62"
            style={{ filter: "drop-shadow(0 0 14px rgba(184,149,106,0.50))" }}>
            <defs>
              <clipPath id="mercuryRoundClip"><circle cx="31" cy="31" r="28" /></clipPath>
            </defs>
            <circle cx="31" cy="31" r="28" fill="url(#mercuryG)" />
            <g clipPath="url(#mercuryRoundClip)">
              {/* Heavily cratered surface */}
              <circle cx="18" cy="22" r="6" fill="rgba(0,0,0,0.30)" stroke="rgba(120,80,20,0.40)" strokeWidth="0.8" />
              <circle cx="18" cy="22" r="3" fill="rgba(80,50,10,0.25)" />
              <circle cx="42" cy="18" r="4" fill="rgba(0,0,0,0.25)" stroke="rgba(100,70,15,0.35)" strokeWidth="0.6" />
              <circle cx="38" cy="42" r="5" fill="rgba(0,0,0,0.28)" stroke="rgba(110,75,18,0.38)" strokeWidth="0.7" />
              <circle cx="20" cy="44" r="3.5" fill="rgba(0,0,0,0.22)" />
              <circle cx="50" cy="34" r="3" fill="rgba(0,0,0,0.20)" />
              <circle cx="28" cy="12" r="2.5" fill="rgba(0,0,0,0.20)" />
              {/* Caloris basin (large impact) */}
              <ellipse cx="44" cy="26" rx="9" ry="8" fill="rgba(0,0,0,0.18)" stroke="rgba(150,100,30,0.30)" strokeWidth="1" />
              <circle cx="31" cy="31" r="28" fill="url(#mercurySpec)" />
              <circle cx="31" cy="31" r="28" fill="url(#mercuryTerm)" />
            </g>
            <circle cx="31" cy="31" r="27.5" fill="none" stroke="rgba(212,184,150,0.18)" strokeWidth="0.7" />
          </svg>
        </div>

        {/* ── 11. NEPTUNE — ↗ bottom-left to top-right ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "orbitNeptune 480s linear infinite 270s both", filter: "url(#shadow3d)" }}>
          <svg width="96" height="96" viewBox="0 0 96 96"
            style={{ filter: "drop-shadow(0 0 22px rgba(59,130,246,0.45))" }}>
            <defs>
              <clipPath id="neptuneRoundClip"><circle cx="48" cy="48" r="44" /></clipPath>
            </defs>
            <circle cx="48" cy="48" r="44" fill="url(#neptuneG)" />
            <g clipPath="url(#neptuneRoundClip)">
              {/* Supersonic storm bands */}
              <g style={{ mixBlendMode: "screen", opacity: 0.45 }}>
                <path d="M 0,22 Q 24,18 48,22 T 96,20 L 96,30 Q 72,32 48,28 T 0,30 Z" fill="#60a5fa" />
                <path d="M 0,46 Q 24,42 48,46 T 96,44 L 96,54 Q 72,56 48,52 T 0,54 Z" fill="#3b82f6" />
                <path d="M 0,68 Q 24,64 48,68 T 96,66 L 96,76 Q 72,78 48,74 T 0,76 Z" fill="#60a5fa" />
              </g>
              {/* Great Dark Spot */}
              <ellipse cx="34" cy="52" rx="10" ry="6" fill="rgba(15,30,100,0.60)" />
              <ellipse cx="34" cy="52" rx="6" ry="3.5" fill="rgba(10,20,80,0.45)" />
              {/* Bright cloud feature */}
              <ellipse cx="62" cy="32" rx="7" ry="4" fill="rgba(191,219,254,0.55)" />
              <circle cx="48" cy="48" r="44" fill="url(#neptuneSpec)" />
              <circle cx="48" cy="48" r="44" fill="url(#neptuneTerm)" />
            </g>
            {/* Triton moon */}
            <circle cx="82" cy="20" r="3" fill="#93c5fd" style={{ filter: "drop-shadow(0 0 3px #3b82f6)" }} />
            <circle cx="48" cy="48" r="43.5" fill="none" stroke="rgba(147,197,253,0.20)" strokeWidth="1" />
          </svg>
        </div>

        {/* ── 12. URANUS — ↙ top-right to bottom-left (with rings) ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "orbitUranus 480s linear infinite 298s both", filter: "url(#shadow3d)" }}>
          <svg width="130" height="110" viewBox="0 0 130 110"
            style={{ filter: "drop-shadow(0 0 18px rgba(52,211,153,0.35))" }}>
            <defs>
              <clipPath id="uranusRoundClip"><circle cx="65" cy="55" r="34" /></clipPath>
              {/* Uranus rings are nearly vertical due to axial tilt */}
              <clipPath id="uranusRingFront"><rect x="0" y="0" width="130" height="36" /></clipPath>
            </defs>
            {/* Rear rings (vertical/tilted) */}
            <g transform="translate(65,55) rotate(80)">
              <ellipse cx="0" cy="0" rx="60" ry="14" fill="none" stroke="rgba(52,211,153,0.22)" strokeWidth="6" />
              <ellipse cx="0" cy="0" rx="52" ry="12" fill="none" stroke="rgba(16,185,129,0.35)" strokeWidth="4" />
              <ellipse cx="0" cy="0" rx="44" ry="10" fill="none" stroke="rgba(0,0,0,0.85)" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="38" ry="8.5" fill="none" stroke="rgba(110,231,183,0.28)" strokeWidth="3" />
            </g>
            <circle cx="65" cy="55" r="34" fill="url(#uranusG)" />
            <g clipPath="url(#uranusRoundClip)">
              <g style={{ mixBlendMode: "screen", opacity: 0.35 }}>
                <path d="M 25,38 Q 48,34 65,38 T 105,36 L 105,46 Q 82,48 65,44 T 25,46 Z" fill="#6ee7b7" />
                <path d="M 25,56 Q 48,52 65,56 T 105,54 L 105,64 Q 82,66 65,62 T 25,64 Z" fill="#34d399" />
              </g>
              <circle cx="65" cy="55" r="34" fill="url(#uranusSpec)" />
              <circle cx="65" cy="55" r="34" fill="url(#uranusTerm)" />
            </g>
            <circle cx="65" cy="55" r="33.5" fill="none" stroke="rgba(167,243,208,0.18)" strokeWidth="0.8" />
            {/* Front rings */}
            <g transform="translate(65,55) rotate(80)">
              <g clipPath="url(#uranusRingFront)">
                <ellipse cx="0" cy="0" rx="60" ry="14" fill="none" stroke="rgba(52,211,153,0.22)" strokeWidth="6" />
                <ellipse cx="0" cy="0" rx="52" ry="12" fill="none" stroke="rgba(16,185,129,0.35)" strokeWidth="4" />
                <ellipse cx="0" cy="0" rx="44" ry="10" fill="none" stroke="rgba(0,0,0,0.85)" strokeWidth="1.5" />
                <ellipse cx="0" cy="0" rx="38" ry="8.5" fill="none" stroke="rgba(110,231,183,0.28)" strokeWidth="3" />
              </g>
            </g>
          </svg>
        </div>

        {/* ── 13. ISS — → fast horizontal orbit across mid-screen ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "flightISS 480s linear infinite 325s both" }}>
          <svg width="120" height="50" viewBox="0 0 120 50"
            style={{ filter: "drop-shadow(0 0 10px rgba(148,163,184,0.55))" }}>
            {/* Main truss */}
            <rect x="0" y="22" width="120" height="6" rx="1" fill="#475569" stroke="#64748b" strokeWidth="0.6" />
            {/* P-port solar arrays */}
            <rect x="2" y="6" width="28" height="10" rx="1" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.5)" strokeWidth="0.7" />
            <rect x="2" y="34" width="28" height="10" rx="1" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.5)" strokeWidth="0.7" />
            <line x1="30" y1="11" x2="38" y2="25" stroke="#94a3b8" strokeWidth="1" />
            <line x1="30" y1="39" x2="38" y2="25" stroke="#94a3b8" strokeWidth="1" />
            {/* S-port solar arrays */}
            <rect x="90" y="6" width="28" height="10" rx="1" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.5)" strokeWidth="0.7" />
            <rect x="90" y="34" width="28" height="10" rx="1" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.5)" strokeWidth="0.7" />
            <line x1="90" y1="11" x2="82" y2="25" stroke="#94a3b8" strokeWidth="1" />
            <line x1="90" y1="39" x2="82" y2="25" stroke="#94a3b8" strokeWidth="1" />
            {/* Central module (Zarya/Unity) */}
            <rect x="44" y="16" width="32" height="18" rx="3" fill="#334155" stroke="#64748b" strokeWidth="0.8" />
            <rect x="48" y="19" width="10" height="8" rx="1.5" fill="rgba(56,189,248,0.20)" stroke="#0284c7" strokeWidth="0.5" />
            <rect x="62" y="19" width="10" height="8" rx="1.5" fill="rgba(56,189,248,0.20)" stroke="#0284c7" strokeWidth="0.5" />
            {/* Solar panel junction cells */}
            <line x1="6" y1="6" x2="6" y2="16" stroke="rgba(56,189,248,0.25)" strokeWidth="0.4" />
            <line x1="16" y1="6" x2="16" y2="16" stroke="rgba(56,189,248,0.25)" strokeWidth="0.4" />
            <line x1="106" y1="6" x2="106" y2="16" stroke="rgba(56,189,248,0.25)" strokeWidth="0.4" />
            <line x1="116" y1="6" x2="116" y2="16" stroke="rgba(56,189,248,0.25)" strokeWidth="0.4" />
            <text x="60" y="47" textAnchor="middle" fontSize="4" fill="rgba(148,163,184,0.70)"
              fontFamily="monospace" letterSpacing="0.8">ISS</text>
          </svg>
        </div>

        {/* ── 14. MOM MANGALYAAN — ↗ bottom-left to top-right ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "flightMOM 480s linear infinite 350s both" }}>
          <div style={{ position: "absolute", bottom: "-8px", left: "40%", width: "14px", height: "18px",
            background: "radial-gradient(circle, rgba(245,158,11,0.80) 0%, transparent 75%)",
            animation: "enginePlumeSubtle 1.8s ease-in-out infinite" }} />
          <svg width="80" height="54" viewBox="0 0 80 54">
            {/* Solar wings */}
            <rect x="0" y="18" width="24" height="14" rx="1.5" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.55)" strokeWidth="0.7" />
            <line x1="8" y1="18" x2="8" y2="32" stroke="rgba(56,189,248,0.30)" strokeWidth="0.4" />
            <line x1="16" y1="18" x2="16" y2="32" stroke="rgba(56,189,248,0.30)" strokeWidth="0.4" />
            <rect x="56" y="18" width="24" height="14" rx="1.5" fill="url(#solarPanelG)" stroke="rgba(56,189,248,0.55)" strokeWidth="0.7" />
            <line x1="64" y1="18" x2="64" y2="32" stroke="rgba(56,189,248,0.30)" strokeWidth="0.4" />
            <line x1="72" y1="18" x2="72" y2="32" stroke="rgba(56,189,248,0.30)" strokeWidth="0.4" />
            {/* Struts */}
            <line x1="24" y1="25" x2="28" y2="25" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="52" y1="25" x2="56" y2="25" stroke="#94a3b8" strokeWidth="1.2" />
            {/* Gold MLI body */}
            <rect x="28" y="12" width="24" height="28" rx="2" fill="url(#goldMliG)" stroke="#f59e0b" strokeWidth="0.8" />
            <rect x="31" y="15" width="18" height="22" rx="1.5" fill="rgba(15,23,42,0.60)" />
            {/* SAR sensor dish */}
            <ellipse cx="40" cy="10" rx="8" ry="3" fill="rgba(203,213,225,0.80)" stroke="#94a3b8" strokeWidth="0.7" />
            <line x1="40" y1="10" x2="40" y2="12" stroke="#94a3b8" strokeWidth="0.8" />
            <circle cx="40" cy="10" r="1.2" fill="#ef4444" />
            <text x="40" y="46" textAnchor="middle" fontSize="4" fill="rgba(245,158,11,0.80)"
              fontFamily="monospace" letterSpacing="0.6">MOM / MANGALYAAN</text>
          </svg>
        </div>

        {/* ── 15. PSLV-C55 — ↓ vertical top-to-bottom descent ── */}
        <div style={{ position: "absolute", top: 0, left: 0, opacity: 0,
          animation: "flightPSLV 480s linear infinite 375s both" }}>
          {/* Engine exhaust plume at bottom */}
          <div style={{ position: "absolute", bottom: "-16px", left: "50%", transform: "translateX(-50%)",
            width: "22px", height: "30px",
            background: "radial-gradient(ellipse at top, rgba(251,146,60,0.90) 0%, rgba(239,68,68,0.55) 40%, transparent 80%)",
            animation: "enginePlumeSubtle 1.4s ease-in-out infinite",
            borderRadius: "0 0 50% 50%" }} />
          <svg width="36" height="110" viewBox="0 0 36 110">
            {/* Payload fairing (nose cone) */}
            <polygon points="18,0 6,18 30,18" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
            {/* Stage 1 body */}
            <rect x="10" y="18" width="16" height="38" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="0.7" />
            {/* ISRO logo stripe */}
            <rect x="10" y="30" width="16" height="5" fill="#f97316" opacity="0.85" />
            <rect x="10" y="38" width="16" height="3" fill="#ffffff" opacity="0.70" />
            <rect x="10" y="43" width="16" height="5" fill="#22c55e" opacity="0.85" />
            {/* Stage 2 */}
            <rect x="11" y="56" width="14" height="24" rx="1.5" fill="#334155" stroke="#475569" strokeWidth="0.6" />
            {/* Stage 3 strap-on motors */}
            <rect x="4" y="62" width="6" height="18" rx="2" fill="#475569" stroke="#64748b" strokeWidth="0.5" />
            <rect x="26" y="62" width="6" height="18" rx="2" fill="#475569" stroke="#64748b" strokeWidth="0.5" />
            {/* Engine nozzles */}
            <ellipse cx="8" cy="82" rx="4" ry="2.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.5" />
            <ellipse cx="28" cy="82" rx="4" ry="2.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.5" />
            <rect x="12" y="80" width="12" height="8" rx="1" fill="#374151" stroke="#64748b" strokeWidth="0.5" />
            <ellipse cx="18" cy="90" rx="8" ry="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
            {/* Stage 4 */}
            <rect x="13" y="88" width="10" height="16" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
            <text x="18" y="108" textAnchor="middle" fontSize="3.5" fill="rgba(148,163,184,0.70)"
              fontFamily="monospace" letterSpacing="0.5">PSLV-C55</text>
          </svg>
        </div>

      </div>
    </>
  );
}
