import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const TEXT = "SatQuery AI.".toUpperCase();

// Color palette (cycled per letter)
const PALETTE = ["#D8D365", "#E6F082", "#D8D365", "#605B51", "#D8D365", "#E6F082", "#D8D365", "#605B51", "#454040", "#D8D365", "#E6F082", "#D8D365"];

// Multilingual SatQuery AI translations floating around the main title (uneven staggered positions, zero overlap with '.')
const MULTILINGUAL_TEXTS = [
  { text: "सत्क्वेरी एआई", lang: "Hindi",     top: "-55px",  left: "-6%",   delay: "0s",   color: "#D8D365" },
  { text: "സാറ്റ് ക്വറി എഐ", lang: "Malayalam",top: "-108px", left: "20%",   delay: "0.2s", color: "#E6F082" }, // Shifted high & left, completely clear of '.'
  { text: "சாட்கொரி ஏஐ", lang: "Tamil",     top: "-48px",  left: "46%",   delay: "0.4s", color: "#D8D365" },
  { text: "সৎকোয়েরি এআই", lang: "Bengali",   top: "-102px", left: "75%",   delay: "0.6s", color: "#E6F082" }, // High top-right, shifted away from Telugu
  { text: "સતક્વેરી એઆઈ", lang: "Gujarati",  top: "16%",    right: "-240px",delay: "0.8s", color: "#D8D365" }, // High on right, well clear of '.'
  { text: "ସାଟ୍କ୍ୱେରୀ ଏଆଇ", lang: "Odia",      bottom: "-105px",right: "6%", delay: "1.0s", color: "#E6F082" }, // Deep below right side, clear of '.'
  { text: "సాట్ క్వెరీ ఏఐ", lang: "Telugu",    bottom: "-52px",left: "52%",   delay: "1.2s", color: "#D8D365" }, // Shifted to bottom, uneven & separated from Bengali
  { text: "ਸੈਟਕੁਏਰੀ ਏਆਈ", lang: "Punjabi",   bottom: "-102px",left: "24%",  delay: "1.4s", color: "#E6F082" },
  { text: "सटक्वेरी एआय", lang: "Marathi",   bottom: "-52px",left: "-5%",   delay: "1.6s", color: "#D8D365" },
  { text: "ست کوئری اے آئی", lang: "Urdu",     top: "62%",    left: "-230px",delay: "1.8s", color: "#E6F082" },
  { text: "ಸ್ಯಾಟ್ಕ್ವೇರಿ ಎಐ", lang: "Kannada",  top: "10%",    left: "-210px",delay: "2.0s", color: "#D8D365" },
];

const FLOAT_HOLD_MS         = 3200;  // time to float before next scatter
const SCATTER_TRANSITION_MS = 1200;  // letters fly apart
const SCATTER_HOLD_MS       = 700;   // pause while scattered
const REASSEMBLE_SETTLE_MS  = 2000;  // generous settle time for spring → 0

// Deterministic scatter offsets — stable across renders
function getScatterOffset(index) {
  const seed = index * 9301 + 49297;
  const rand = (n) => {
    const v = Math.sin(seed + n) * 10000;
    return v - Math.floor(v);
  };
  return {
    x:      (rand(1) - 0.5) * 100,
    y:      (rand(2) - 0.5) * 100,
    rotate: rand(3) > 0.4 ? (rand(4) - 0.5) * 24 : 0,
  };
}

// Per-letter bob — vary DURATION for the organic wave; NO delay to avoid glitch
function getFloatParams(index) {
  return {
    duration:  2.0 + (index % 6) * 0.22,  // 2.0s – 3.1s
    amplitude: 5   + (index % 4) * 1.5,   // 5px – 9.5px
  };
}

/* ============================================================
   SINGLE SLEEK 3D CHANDRAYAAN-3 SATELLITE (COMPACT SIZE)
   ============================================================ */
function ChandrayaanSatellite() {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Thruster Exhaust Ion Plume */}
      <div style={{
        position: "absolute",
        left: "-18px",
        top: "38%",
        transform: "translateY(-50%)",
        width: "20px",
        height: "9px",
        background: "radial-gradient(ellipse at right, rgba(56,189,248,0.95), rgba(59,130,246,0.5), transparent)",
        borderRadius: "50% 0 0 50%",
        filter: "blur(1.5px)",
        animation: "pulsePlume 0.8s ease-in-out infinite alternate"
      }} />

      {/* Sleek Compact SVG Body (58x33px) */}
      <svg width="58" height="33" viewBox="0 0 96 54" style={{ overflow: "visible", filter: "drop-shadow(0 0 8px rgba(56,189,248,0.45))" }}>
        <defs>
          <linearGradient id="chGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe082" />
            <stop offset="35%" stopColor="#ffb300" />
            <stop offset="70%" stopColor="#ff8f00" />
            <stop offset="100%" stopColor="#6d4c41" />
          </linearGradient>
          <linearGradient id="solarCell" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
        </defs>

        {/* Left Solar Panel Array */}
        <g transform="translate(4, 15)">
          <rect x="0" y="0" width="26" height="24" rx="2" fill="url(#solarCell)" stroke="#60a5fa" strokeWidth="0.8" />
          <line x1="8.6" y1="0" x2="8.6" y2="24" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <line x1="17.3" y1="0" x2="17.3" y2="24" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <line x1="0" y1="12" x2="26" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <rect x="26" y="9" width="6" height="6" fill="#94a3b8" />
        </g>

        {/* Right Solar Panel Array */}
        <g transform="translate(66, 15)">
          <rect x="0" y="0" width="26" height="24" rx="2" fill="url(#solarCell)" stroke="#60a5fa" strokeWidth="0.8" />
          <line x1="8.6" y1="0" x2="8.6" y2="24" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <line x1="17.3" y1="0" x2="17.3" y2="24" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <line x1="0" y1="12" x2="26" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <rect x="-6" y="9" width="6" height="6" fill="#94a3b8" />
        </g>

        {/* Central Satellite Body (Gold Thermal Blanket) */}
        <rect x="32" y="10" width="32" height="34" rx="4" fill="url(#chGold)" stroke="#ffa000" strokeWidth="1" />
        <path d="M32,18 L64,18 M32,27 L64,27 M32,36 L64,36 M42,10 L42,44 M54,10 L54,44" stroke="rgba(0,0,0,0.25)" strokeWidth="0.7" />

        {/* High-Gain Parabolic Dish Antenna */}
        <g transform="translate(48, 6)">
          <path d="M-10,-4 Q0,-12 10,-4 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
          <line x1="0" y1="-8" x2="0" y2="-13" stroke="#cbd5e1" strokeWidth="1.2" />
          <circle cx="0" cy="-13" r="1.5" fill="#ef4444" />
        </g>

        {/* Main Liquid Rocket Thruster */}
        <rect x="42" y="44" width="12" height="7" rx="1" fill="#475569" />
        <polygon points="40,51 56,51 52,44 44,44" fill="#334155" />

        {/* ISRO / Indian Flag Tricolor Badge */}
        <rect x="36" y="24" width="24" height="2" fill="#ff9933" />
        <rect x="36" y="26" width="24" height="2" fill="#ffffff" />
        <rect x="36" y="28" width="24" height="2" fill="#138808" />
        <circle cx="48" cy="27" r="0.8" fill="#000080" />
      </svg>

      <span style={{
        marginTop: "1px",
        fontSize: "6.5px",
        fontWeight: 800,
        letterSpacing: "0.12em",
        color: "rgba(56,189,248,0.9)",
        fontFamily: "monospace",
        textShadow: "0 0 5px rgba(56,189,248,0.7)",
        whiteSpace: "nowrap"
      }}>
        CHANDRAYAAN-3
      </span>
    </div>
  );
}

export default function ScatterAndReassembleText() {
  const letters        = useMemo(() => TEXT.split(""), []);
  const scatterOffsets = useMemo(() => letters.map((_, i) => getScatterOffset(i)), [letters]);
  const floatParams    = useMemo(() => letters.map((_, i) => getFloatParams(i)),   [letters]);

  const [phase, setPhase] = useState("reassembling");

  useEffect(() => {
    let tid;

    const runCycle = (isFirst = false) => {
      const holdMs = isFirst ? 400 : FLOAT_HOLD_MS;

      tid = setTimeout(() => {
        setPhase("scattered");

        tid = setTimeout(() => {
          setPhase("reassembling");

          tid = setTimeout(() => {
            setPhase("floating");
            runCycle(false);
          }, REASSEMBLE_SETTLE_MS);

        }, SCATTER_TRANSITION_MS + SCATTER_HOLD_MS);
      }, holdMs);
    };

    tid = setTimeout(() => {
      setPhase("floating");
      runCycle(true);
    }, REASSEMBLE_SETTLE_MS);

    return () => clearTimeout(tid);
  }, []);

  return (
    <div style={{ position: "relative", perspective: "1200px", transformStyle: "preserve-3d" }}>
      <style>{`
        /* Smooth 3D Spiral Orbit around SatQuery AI (24s cycle — constant small scale) */
        @keyframes orbitChandrayaan {
          0% {
            transform: translate3d(-36vw, -12vh, -90px) rotate(-12deg) scale(0.46);
            opacity: 0.45;
            z-index: 0;
            filter: drop-shadow(0 0 4px rgba(14,165,233,0.25)) blur(1px);
          }
          25% {
            transform: translate3d(0vw, -16vh, 0px) rotate(4deg) scale(0.49);
            opacity: 0.85;
            z-index: 2;
            filter: drop-shadow(0 0 8px rgba(14,165,233,0.5));
          }
          50% {
            transform: translate3d(36vw, 10vh, 110px) rotate(22deg) scale(0.52);
            opacity: 0.95;
            z-index: 25;
            filter: drop-shadow(0 0 12px rgba(14,165,233,0.7));
          }
          75% {
            transform: translate3d(0vw, 18vh, 20px) rotate(4deg) scale(0.49);
            opacity: 0.88;
            z-index: 25;
            filter: drop-shadow(0 0 10px rgba(14,165,233,0.6));
          }
          100% {
            transform: translate3d(-36vw, -12vh, -90px) rotate(-12deg) scale(0.46);
            opacity: 0.45;
            z-index: 0;
            filter: drop-shadow(0 0 4px rgba(14,165,233,0.25)) blur(1px);
          }
        }

        @keyframes pulsePlume {
          0%   { transform: translateY(-50%) scaleX(0.7); opacity: 0.65; }
          100% { transform: translateY(-50%) scaleX(1.25); opacity: 1; }
        }

        @keyframes orbitDash {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: 360; }
        }

        @keyframes langTwinkleFloat {
          0%, 100% {
            transform: translateY(0px) scale(0.96);
            opacity: 0.32;
            filter: brightness(0.85);
          }
          50% {
            transform: translateY(-7px) scale(1.03);
            opacity: 1;
            filter: brightness(1.25);
          }
        }
      `}</style>

      {/* Multilingual Floating Texts around Main Logo (Twinkling with 0.2s staggered delay) */}
      {MULTILINGUAL_TEXTS.map((item, idx) => (
        <span
          key={idx}
          style={{
            position: "absolute",
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            fontSize: "20px",
            fontWeight: 800,
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            color: item.color,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 14,
            animation: `langTwinkleFloat 2.6s ease-in-out infinite alternate ${item.delay}`,
          }}
        >
          {item.text}
        </span>
      ))}

      {/* Glowing 3D Orbit Trajectory Line (Single Sleek Ring) */}
      <svg width="100%" height="100%" viewBox="0 0 1000 350"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotateX(68deg) rotateZ(-12deg)",
          pointerEvents: "none",
          overflow: "visible",
          opacity: 0.32,
          zIndex: 1,
        }}>
        <defs>
          <linearGradient id="orbGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <ellipse cx="500" cy="175" rx="430" ry="135" fill="none"
          stroke="url(#orbGrad1)" strokeWidth="1.6" strokeDasharray="9 13"
          style={{ animation: "orbitDash 32s linear infinite" }} />
      </svg>

      {/* Single Orbiting Chandrayaan-3 Satellite */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transformStyle: "preserve-3d",
        animation: "orbitChandrayaan 24s linear infinite",
        pointerEvents: "none",
      }}>
        <ChandrayaanSatellite />
      </div>

      {/* Main Text Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {letters.map((char, i) => {
          const { x, y, rotate }        = scatterOffsets[i];
          const { duration, amplitude } = floatParams[i];
          const isSpace = char === " ";

          let animateTarget;
          if (phase === "scattered") {
            animateTarget = { x, y, rotate, opacity: 0.6 };
          } else if (phase === "reassembling") {
            animateTarget = { x: 0, y: 0, rotate: 0, opacity: 1 };
          } else {
            animateTarget = { y: [0, -amplitude, 0], opacity: 1 };
          }

          let transition;
          if (phase === "scattered") {
            transition = {
              duration: SCATTER_TRANSITION_MS / 1000,
              ease: "easeInOut",
            };
          } else if (phase === "reassembling") {
            transition = {
              type: "spring",
              stiffness: 60,
              damping: 22,
              mass: 1,
              restDelta: 0.001,
              restSpeed: 0.001,
            };
          } else {
            transition = {
              opacity: { duration: 0.4, ease: "easeOut" },
              y: {
                duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              },
            };
          }

          return (
            <motion.span
              key={`${char}-${i}`}
              style={{
                display: "inline-block",
                fontSize: "clamp(3rem, 8vw, 9rem)",
                fontWeight: 900,
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                letterSpacing: "-0.02em",
                userSelect: "none",
                color: isSpace ? "transparent" : (PALETTE[i] ?? "#D8D365"),
                lineHeight: 1,
              }}
              animate={animateTarget}
              transition={transition}
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
