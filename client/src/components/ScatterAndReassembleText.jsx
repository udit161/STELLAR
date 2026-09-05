import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const TEXT = "SatQuery AI.".toUpperCase();

// Color palette (cycled per letter)
const PALETTE = ["#D8D365", "#E6F082", "#D8D365", "#605B51", "#D8D365", "#E6F082", "#D8D365", "#605B51", "#454040", "#D8D365", "#E6F082", "#D8D365"];

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
   CHANDRAYAAN-3 SPACECRAFT SVG COMPONENT
   ============================================================ */
function ChandrayaanSatellite() {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Thruster Exhaust Ion Plume */}
      <div style={{
        position: "absolute",
        left: "-28px",
        top: "40%",
        transform: "translateY(-50%)",
        width: "32px",
        height: "14px",
        background: "radial-gradient(ellipse at right, rgba(56,189,248,0.95), rgba(59,130,246,0.5), transparent)",
        borderRadius: "50% 0 0 50%",
        filter: "blur(2px)",
        animation: "pulsePlume 0.8s ease-in-out infinite alternate"
      }} />

      <svg width="96" height="54" viewBox="0 0 96 54" style={{ overflow: "visible", filter: "drop-shadow(0 0 10px rgba(56,189,248,0.4))" }}>
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
        marginTop: "2px",
        fontSize: "8px",
        fontWeight: 800,
        letterSpacing: "0.15em",
        color: "#38bdf8",
        fontFamily: "monospace",
        textShadow: "0 0 6px rgba(56,189,248,0.8)",
        whiteSpace: "nowrap"
      }}>
        CHANDRAYAAN-3
      </span>
    </div>
  );
}

/* ============================================================
   VIKRAM LANDER (VIKRAMYAAN) SVG COMPONENT
   ============================================================ */
function VikramLanderSatellite() {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Retro Thruster Rocket Flame */}
      <div style={{
        position: "absolute",
        bottom: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "18px",
        height: "22px",
        background: "radial-gradient(ellipse at top, rgba(251,146,60,0.95), rgba(245,158,11,0.6), transparent)",
        borderRadius: "0 0 50% 50%",
        filter: "blur(2px)",
        animation: "pulseFlame 0.6s ease-in-out infinite alternate"
      }} />

      <svg width="86" height="68" viewBox="0 0 86 68" style={{ overflow: "visible", filter: "drop-shadow(0 0 10px rgba(245,158,11,0.4))" }}>
        <defs>
          <linearGradient id="vikGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff176" />
            <stop offset="30%" stopColor="#fbc02d" />
            <stop offset="70%" stopColor="#f57f17" />
            <stop offset="100%" stopColor="#4e342e" />
          </linearGradient>
        </defs>

        {/* Shock-Absorbing Landing Legs */}
        <line x1="24" y1="36" x2="8" y2="58" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="58" x2="20" y2="44" stroke="#64748b" strokeWidth="1.5" />
        <ellipse cx="7" cy="59" rx="5" ry="2" fill="#cbd5e1" />

        <line x1="62" y1="36" x2="78" y2="58" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="78" y1="58" x2="66" y2="44" stroke="#64748b" strokeWidth="1.5" />
        <ellipse cx="79" cy="59" rx="5" ry="2" fill="#cbd5e1" />

        <line x1="30" y1="40" x2="20" y2="62" stroke="#e2e8f0" strokeWidth="2.8" strokeLinecap="round" />
        <ellipse cx="19" cy="63" rx="6" ry="2.2" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />

        <line x1="56" y1="40" x2="66" y2="62" stroke="#e2e8f0" strokeWidth="2.8" strokeLinecap="round" />
        <ellipse cx="67" cy="63" rx="6" ry="2.2" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />

        {/* Octagonal Lander Body */}
        <polygon points="26,16 60,16 68,28 68,44 60,48 26,48 18,44 18,28"
          fill="url(#vikGold)" stroke="#f57f17" strokeWidth="1.2" />

        {/* Solar Panels on Top & Sides */}
        <rect x="28" y="10" width="30" height="6" rx="1" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="0.8" />
        <rect x="20" y="24" width="5" height="16" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="0.6" />
        <rect x="61" y="24" width="5" height="16" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="0.6" />

        {/* Sensors & Telemetry Antennas */}
        <circle cx="43" cy="6" r="3.5" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
        <line x1="43" y1="9" x2="43" y2="16" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="34" y1="8" x2="34" y2="16" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="34" cy="7" r="1.2" fill="#38bdf8" />
        <line x1="52" y1="8" x2="52" y2="16" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="52" cy="7" r="1.2" fill="#38bdf8" />

        {/* Pragyan Rover Ramp Outline */}
        <path d="M28,40 L58,40 L52,47 L34,47 Z" fill="rgba(0,0,0,0.35)" />

        {/* Retro Engine Nozzles */}
        <rect x="30" y="48" width="6" height="5" fill="#334155" />
        <rect x="50" y="48" width="6" height="5" fill="#334155" />

        {/* Indian Flag Tricolor Badge */}
        <rect x="37" y="22" width="12" height="2" fill="#ff9933" />
        <rect x="37" y="24" width="12" height="2" fill="#ffffff" />
        <rect x="37" y="26" width="12" height="2" fill="#138808" />
      </svg>

      <span style={{
        marginTop: "2px",
        fontSize: "8px",
        fontWeight: 800,
        letterSpacing: "0.15em",
        color: "#fbbf24",
        fontFamily: "monospace",
        textShadow: "0 0 6px rgba(251,191,36,0.8)",
        whiteSpace: "nowrap"
      }}>
        VIKRAM-LANDER
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
        @keyframes orbitChandrayaan {
          0% {
            transform: translate3d(-38vw, -12vh, -100px) rotate(-15deg) scale(0.65);
            opacity: 0.5;
            z-index: 0;
            filter: drop-shadow(0 0 6px rgba(14,165,233,0.3)) blur(1px);
          }
          25% {
            transform: translate3d(0vw, -18vh, 0px) rotate(5deg) scale(0.85);
            opacity: 0.85;
            z-index: 2;
            filter: drop-shadow(0 0 12px rgba(14,165,233,0.6));
          }
          50% {
            transform: translate3d(38vw, 10vh, 120px) rotate(25deg) scale(1.25);
            opacity: 1;
            z-index: 25;
            filter: drop-shadow(0 0 24px rgba(14,165,233,0.95));
          }
          75% {
            transform: translate3d(0vw, 20vh, 20px) rotate(5deg) scale(0.95);
            opacity: 0.9;
            z-index: 25;
            filter: drop-shadow(0 0 16px rgba(14,165,233,0.75));
          }
          100% {
            transform: translate3d(-38vw, -12vh, -100px) rotate(-15deg) scale(0.65);
            opacity: 0.5;
            z-index: 0;
            filter: drop-shadow(0 0 6px rgba(14,165,233,0.3)) blur(1px);
          }
        }

        @keyframes orbitVikram {
          0% {
            transform: translate3d(36vw, -14vh, 90px) rotate(20deg) scale(1.18);
            opacity: 1;
            z-index: 25;
            filter: drop-shadow(0 0 22px rgba(245,158,11,0.95));
          }
          25% {
            transform: translate3d(0vw, 18vh, -20px) rotate(-5deg) scale(0.90);
            opacity: 0.85;
            z-index: 25;
            filter: drop-shadow(0 0 14px rgba(245,158,11,0.65));
          }
          50% {
            transform: translate3d(-36vw, 12vh, -120px) rotate(-22deg) scale(0.62);
            opacity: 0.5;
            z-index: 0;
            filter: drop-shadow(0 0 6px rgba(245,158,11,0.3)) blur(1px);
          }
          75% {
            transform: translate3d(0vw, -20vh, 20px) rotate(0deg) scale(0.88);
            opacity: 0.85;
            z-index: 2;
            filter: drop-shadow(0 0 12px rgba(245,158,11,0.55));
          }
          100% {
            transform: translate3d(36vw, -14vh, 90px) rotate(20deg) scale(1.18);
            opacity: 1;
            z-index: 25;
            filter: drop-shadow(0 0 22px rgba(245,158,11,0.95));
          }
        }

        @keyframes pulsePlume {
          0%   { transform: translateY(-50%) scaleX(0.8); opacity: 0.7; }
          100% { transform: translateY(-50%) scaleX(1.3); opacity: 1; }
        }

        @keyframes pulseFlame {
          0%   { transform: translateX(-50%) scaleY(0.8); opacity: 0.75; }
          100% { transform: translateX(-50%) scaleY(1.3); opacity: 1; }
        }

        @keyframes orbitDash {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: 360; }
        }
      `}</style>

      {/* Glowing 3D Orbit Path Trajectories */}
      <svg width="100%" height="100%" viewBox="0 0 1000 350"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotateX(68deg) rotateZ(-12deg)",
          pointerEvents: "none",
          overflow: "visible",
          opacity: 0.35,
          zIndex: 1,
        }}>
        <defs>
          <linearGradient id="orbGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="orbGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <ellipse cx="500" cy="175" rx="440" ry="140" fill="none"
          stroke="url(#orbGrad1)" strokeWidth="2" strokeDasharray="10 14"
          style={{ animation: "orbitDash 20s linear infinite" }} />
        <ellipse cx="500" cy="175" rx="390" ry="120" fill="none"
          stroke="url(#orbGrad2)" strokeWidth="1.8" strokeDasharray="8 12"
          style={{ animation: "orbitDash 16s linear infinite reverse" }} />
      </svg>

      {/* Orbiting Chandrayaan-3 Satellite */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transformStyle: "preserve-3d",
        animation: "orbitChandrayaan 14s linear infinite",
        pointerEvents: "none",
      }}>
        <ChandrayaanSatellite />
      </div>

      {/* Orbiting Vikram Lander (Vikramyaan) */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transformStyle: "preserve-3d",
        animation: "orbitVikram 17s linear infinite",
        pointerEvents: "none",
      }}>
        <VikramLanderSatellite />
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
