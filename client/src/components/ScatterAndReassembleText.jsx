import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const TEXT = "Stellar AI.".toUpperCase();

// Color palette matching brand design
const PALETTE = [
  "#D8D365", "#E6F082", "#D8D365", "#605B51",
  "#D8D365", "#E6F082", "#D8D365", "#605B51",
  "#454040", "#D8D365", "#E6F082", "#E6F082"
];

// Multilingual Stellar AI translations positioned OUTSIDE the main logo bounding box
// MULTILINGUAL_TEXTS removed as per user request

const FLOAT_HOLD_MS = 3600;
const SCATTER_TRANSITION_MS = 1400;
const SCATTER_HOLD_MS = 800;
const REASSEMBLE_SETTLE_MS = 1800;

function getScatterOffset(index) {
  if (index === 11) {
    const iOffset = getScatterOffset(10);
    return {
      x: iOffset.x + 12,
      y: iOffset.y + 2.3,
      rotate: iOffset.rotate,
    };
  }
  const seed = index * 9301 + 49297;
  const rand = (n) => {
    const v = Math.sin(seed + n) * 10000;
    return v - Math.floor(v);
  };
  return {
    x: (rand(1) - 0.5) * 58,
    y: (rand(2) - 0.5) * 35,
    rotate: rand(3) > 0.4 ? (rand(4) - 0.5) * 14 : 0,
  };
}

function getFloatParams(index) {
  return {
    duration: 2.2 + (index % 5) * 0.3,
    amplitude: 3 + (index % 3) * 1.5,
  };
}

function ChandrayaanSatellite() {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        position: "absolute",
        left: "-18px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "22px",
        height: "5px",
        background: "radial-gradient(ellipse at right, #38bdf8 0%, #818cf8 60%, transparent 100%)",
        borderRadius: "50% 0 0 50%",
        filter: "blur(1px) drop-shadow(0 0 8px #38bdf8)",
        animation: "pulsePlume 0.2s ease-in-out infinite alternate",
      }} />

      <svg width="68" height="38" viewBox="0 0 110 60" style={{ filter: "drop-shadow(0 0 14px rgba(14,165,233,0.7))" }}>
        <defs>
          <linearGradient id="goldMLI" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
          <linearGradient id="solarCell" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        <g>
          <rect x="2" y="16" width="30" height="28" rx="2" fill="#020617" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="4" y="18" width="8" height="24" rx="1" fill="url(#solarCell)" />
          <rect x="13" y="18" width="8" height="24" rx="1" fill="url(#solarCell)" />
          <rect x="22" y="18" width="8" height="24" rx="1" fill="url(#solarCell)" />
          <line x1="2" y1="30" x2="32" y2="30" stroke="#bae6fd" strokeWidth="0.5" opacity="0.6" />
          <line x1="32" y1="30" x2="38" y2="30" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>

        <g>
          <rect x="38" y="14" width="34" height="32" rx="3" fill="url(#goldMLI)" stroke="#fef08a" strokeWidth="0.7" />
          <line x1="46" y1="14" x2="46" y2="46" stroke="#a16207" strokeWidth="0.4" opacity="0.5" />
          <line x1="55" y1="14" x2="55" y2="46" stroke="#a16207" strokeWidth="0.4" opacity="0.5" />
          <line x1="64" y1="14" x2="64" y2="46" stroke="#a16207" strokeWidth="0.4" opacity="0.5" />
          <line x1="38" y1="24" x2="72" y2="24" stroke="#a16207" strokeWidth="0.4" opacity="0.5" />
          <line x1="38" y1="34" x2="72" y2="34" stroke="#a16207" strokeWidth="0.4" opacity="0.5" />

          <path d="M55,14 Q55,4 65,3" fill="none" stroke="#e2e8f0" strokeWidth="1.2" />
          <circle cx="66" cy="3" r="3.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.8" />
          <circle cx="66" cy="3" r="1.2" fill="#0284c7" />

          <circle cx="55" cy="30" r="4.5" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="55" cy="30" r="2.5" fill="#0ea5e9" />
          <circle cx="54" cy="29" r="0.8" fill="#ffffff" />
        </g>

        <g>
          <line x1="72" y1="30" x2="78" y2="30" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="78" y="16" width="30" height="28" rx="2" fill="#020617" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="80" y="18" width="8" height="24" rx="1" fill="url(#solarCell)" />
          <rect x="89" y="18" width="8" height="24" rx="1" fill="url(#solarCell)" />
          <rect x="98" y="18" width="8" height="24" rx="1" fill="url(#solarCell)" />
          <line x1="78" y1="30" x2="108" y2="30" stroke="#bae6fd" strokeWidth="0.5" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

export default function ScatterAndReassembleText({ showMultilingual = true, animated = true }) {
  const letters = useMemo(() => TEXT.split(""), []);
  const scatterOffsets = useMemo(() => letters.map((_, i) => getScatterOffset(i)), [letters]);
  const floatParams = useMemo(() => letters.map((_, i) => getFloatParams(i)), [letters]);

  const [phase, setPhase] = useState("reassembled");

  useEffect(() => {
    if (!animated) {
      setPhase("reassembled");
      return;
    }
    let t1, t2, t3;
    let isMounted = true;

    function runCycle() {
      if (!isMounted) return;
      t1 = setTimeout(() => {
        if (!isMounted) return;
        setPhase("scattered");

        t2 = setTimeout(() => {
          if (!isMounted) return;
          setPhase("reassembling");

          t3 = setTimeout(() => {
            if (!isMounted) return;
            setPhase("reassembled");
            runCycle();
          }, REASSEMBLE_SETTLE_MS);
        }, SCATTER_TRANSITION_MS + SCATTER_HOLD_MS);
      }, FLOAT_HOLD_MS);
    }

    runCycle();

    return () => {
      isMounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [animated]);

  return (
    <div
      style={{
        position: "relative",
        perspective: "1200px",
        transformStyle: "preserve-3d",
        width: "100%",
        maxWidth: "1150px",
        height: "360px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes letterFloatBob {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes orbitChandrayaan {
          0% {
            transform: translate3d(-36vw, 0vh, -100px) rotate(-12deg) scale(0.45);
            opacity: 0.45;
            z-index: 0;
            filter: drop-shadow(0 0 4px rgba(14,165,233,0.25)) blur(1px);
          }
          12.5% {
            transform: translate3d(-25vw, -11vh, -50px) rotate(-6deg) scale(0.47);
            opacity: 0.65;
            z-index: 1;
            filter: drop-shadow(0 0 6px rgba(14,165,233,0.35));
          }
          25% {
            transform: translate3d(0vw, -16vh, 0px) rotate(4deg) scale(0.49);
            opacity: 0.85;
            z-index: 2;
            filter: drop-shadow(0 0 8px rgba(14,165,233,0.5));
          }
          37.5% {
            transform: translate3d(25vw, -6vh, 55px) rotate(14deg) scale(0.51);
            opacity: 0.92;
            z-index: 20;
            filter: drop-shadow(0 0 10px rgba(14,165,233,0.65));
          }
          50% {
            transform: translate3d(36vw, 10vh, 110px) rotate(22deg) scale(0.53);
            opacity: 0.96;
            z-index: 25;
            filter: drop-shadow(0 0 12px rgba(14,165,233,0.7));
          }
          62.5% {
            transform: translate3d(22vw, 17vh, 70px) rotate(14deg) scale(0.51);
            opacity: 0.92;
            z-index: 25;
            filter: drop-shadow(0 0 11px rgba(14,165,233,0.65));
          }
          75% {
            transform: translate3d(0vw, 18vh, 20px) rotate(4deg) scale(0.49);
            opacity: 0.88;
            z-index: 25;
            filter: drop-shadow(0 0 10px rgba(14,165,233,0.6));
          }
          87.5% {
            transform: translate3d(-22vw, 11vh, -40px) rotate(-6deg) scale(0.47);
            opacity: 0.65;
            z-index: 0;
            filter: drop-shadow(0 0 6px rgba(14,165,233,0.35)) blur(0.5px);
          }
          100% {
            transform: translate3d(-36vw, 0vh, -100px) rotate(-12deg) scale(0.45);
            opacity: 0.45;
            z-index: 0;
            filter: drop-shadow(0 0 4px rgba(14,165,233,0.25)) blur(1px);
          }
        }

        @keyframes pulsePlume {
          0%   { transform: translateY(-50%) scaleX(0.75); opacity: 0.65; }
          100% { transform: translateY(-50%) scaleX(1.2); opacity: 0.95; }
        }

        @keyframes orbitDash {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: 360; }
        }

        @keyframes langTwinkleFloat {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.96);
            opacity: 0.65;
            filter: brightness(1.0);
          }
          50% {
            transform: translate(-50%, calc(-50% - 6px)) scale(1.04);
            opacity: 1;
            filter: brightness(1.3);
          }
        }
      `}</style>

      {/* Multilingual Floating Texts Positioned Symmetrically OUTSIDE the Main Title (Removed) */}
      {/* Glowing 3D Orbit Trajectory Line */}
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
      {animated && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transformStyle: "preserve-3d",
          animation: "orbitChandrayaan 28s cubic-bezier(0.37, 0, 0.63, 1) infinite",
          willChange: "transform, opacity, filter",
          backfaceVisibility: "hidden",
          pointerEvents: "none",
        }}>
          <ChandrayaanSatellite />
        </div>
      )}

      {/* Main Text Content: Strict No-Wrap Container */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        {letters.map((char, i) => {
          const { x, y, rotate } = scatterOffsets[i];
          const isSpace = char === " ";
          const isDot = char === ".";

          let animateTarget;
          let transition;

          if (!animated) {
            animateTarget = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
            transition = { duration: 0.5 };
          } else if (phase === "scattered") {
            animateTarget = { x, y, rotate, scale: 0.92, opacity: 0.85 };
            transition = {
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            };
          } else {
            animateTarget = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
            transition = {
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
            };
          }

          return (
            <motion.span
              key={`${char}-${i}`}
              style={{
                display: "inline-block",
                fontSize: "clamp(2.4rem, 5.8vw, 5.6rem)",
                fontWeight: 900,
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                letterSpacing: "-0.02em",
                userSelect: "none",
                color: isSpace ? "transparent" : (PALETTE[i] ?? "#D8D365"),
                marginLeft: isDot ? "-0.05em" : "0",
                lineHeight: 1,
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
              animate={animateTarget}
              transition={transition}
            >
              <span
                style={{
                  display: "inline-block",
                  animation: animated && (phase === "reassembled" || phase === "reassembling")
                    ? `letterFloatBob ${floatParams[i].duration}s ease-in-out infinite alternate ${i * 0.12}s`
                    : "none",
                }}
              >
                {isSpace ? "\u00A0" : char}
              </span>
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
