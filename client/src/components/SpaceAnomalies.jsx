import React from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   SpaceAnomalies
   A fixed, pointer-events:none overlay that adds floating space objects above
   the existing TopologyBackground without touching it.

   Objects
   ───────
   • 3 planets (different sizes / colours, slow drift + self-rotation ring)
   • Chandrayaan-3 orbiter  (iconic box + solar panels + comms dish)
   • Vikram Lander          (descent module silhouette)
   • Generic satellite      (rectangular bus + dual solar wings)
   • 7 debris fragments     (tiny tumbling polygons / shards)

   All motion is pure CSS keyframes — no JS animation loop needed.
   z-index: 2  →  sits above the topology canvas (z:0) but below UI (z:10+)
───────────────────────────────────────────────────────────────────────────── */

export default function SpaceAnomalies() {
  return (
    <>
      <style>{`
        /* ── generic drift paths ───────────────────────────────── */
        @keyframes drift1 {
          0%   { transform: translate(0px,  0px) rotate(0deg);   }
          25%  { transform: translate(18px,-22px) rotate(4deg);  }
          50%  { transform: translate(6px, -40px) rotate(-3deg); }
          75%  { transform: translate(-14px,-20px) rotate(5deg); }
          100% { transform: translate(0px,  0px) rotate(0deg);   }
        }
        @keyframes drift2 {
          0%   { transform: translate(0px,  0px) rotate(0deg);   }
          33%  { transform: translate(-22px,14px) rotate(-6deg); }
          66%  { transform: translate(10px, 30px) rotate(8deg);  }
          100% { transform: translate(0px,  0px) rotate(0deg);   }
        }
        @keyframes drift3 {
          0%   { transform: translate(0px,  0px) rotate(0deg);   }
          20%  { transform: translate(30px, 10px) rotate(3deg);  }
          50%  { transform: translate(14px, 28px) rotate(-5deg); }
          80%  { transform: translate(-8px, 12px) rotate(7deg);  }
          100% { transform: translate(0px,  0px) rotate(0deg);   }
        }
        @keyframes drift4 {
          0%   { transform: translate(0px,  0px);   }
          40%  { transform: translate(-18px,-28px); }
          70%  { transform: translate(8px, -16px);  }
          100% { transform: translate(0px,  0px);   }
        }
        @keyframes drift5 {
          0%   { transform: translate(0px, 0px) rotate(0deg);   }
          50%  { transform: translate(24px,20px) rotate(-12deg); }
          100% { transform: translate(0px, 0px) rotate(0deg);   }
        }

        /* ── satellite tumble ──────────────────────────────────── */
        @keyframes satDrift {
          0%   { transform: translate(0px,  0px) rotate(0deg);   }
          25%  { transform: translate(28px,-16px) rotate(-8deg);  }
          50%  { transform: translate(14px,-36px) rotate(-14deg); }
          75%  { transform: translate(-8px,-18px) rotate(-6deg);  }
          100% { transform: translate(0px,  0px) rotate(0deg);   }
        }
        @keyframes vikramDrift {
          0%   { transform: translate(0px, 0px) rotate(0deg);   }
          30%  { transform: translate(-20px,18px) rotate(4deg);  }
          60%  { transform: translate(10px, 32px) rotate(-3deg); }
          100% { transform: translate(0px,  0px) rotate(0deg);   }
        }

        /* ── planet ring rotation ──────────────────────────────── */
        @keyframes ringRotate {
          from { transform: rotateX(75deg) rotate(0deg);   }
          to   { transform: rotateX(75deg) rotate(360deg); }
        }

        /* ── debris tumble ─────────────────────────────────────── */
        @keyframes debris1 {
          0%   { transform: translate(0px,0px) rotate(0deg);    }
          100% { transform: translate(60px,-80px) rotate(420deg); }
        }
        @keyframes debris2 {
          0%   { transform: translate(0px,0px) rotate(0deg);      }
          100% { transform: translate(-90px,50px) rotate(-380deg); }
        }
        @keyframes debris3 {
          0%   { transform: translate(0px,0px) rotate(0deg);     }
          100% { transform: translate(40px,90px) rotate(540deg); }
        }
        @keyframes debris4 {
          0%   { transform: translate(0px,0px) rotate(0deg);       }
          100% { transform: translate(-50px,-70px) rotate(310deg); }
        }
        @keyframes debris5 {
          0%   { transform: translate(0px,0px) rotate(0deg);    }
          100% { transform: translate(80px,40px) rotate(-480deg); }
        }
        @keyframes debris6 {
          0%   { transform: translate(0px,0px) rotate(0deg);     }
          100% { transform: translate(-30px,100px) rotate(600deg); }
        }
        @keyframes debris7 {
          0%   { transform: translate(0px,0px) rotate(0deg);    }
          100% { transform: translate(70px,-60px) rotate(-350deg); }
        }

        /* ── solar panel slow flicker (glint) ─────────────────── */
        @keyframes solarGlint {
          0%,100% { opacity: 0.55; }
          50%      { opacity: 0.90; }
        }

        /* ── planet atmospheric glow pulse ────────────────────── */
        @keyframes atmoPulse {
          0%,100% { opacity: 0.35; transform: scale(1);    }
          50%      { opacity: 0.55; transform: scale(1.06); }
        }
      `}</style>

      {/* ── ROOT LAYER ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >

        {/* ════════════════════════════════════════════════════════
            PLANET A  — large dusty orange/red (Mars-like), top-right
        ════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute", top: "6%", right: "8%",
          animation: "drift1 28s ease-in-out infinite",
        }}>
          {/* Atmospheric halo */}
          <div style={{
            position: "absolute", top: "-16px", left: "-16px",
            width: "120px", height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(220,100,40,0.25) 40%, transparent 75%)",
            filter: "blur(10px)",
            animation: "atmoPulse 6s ease-in-out infinite",
          }} />
          <svg width="88" height="88" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="mgA" cx="38%" cy="35%" r="60%">
                <stop offset="0%"   stopColor="#e8855a"/>
                <stop offset="40%"  stopColor="#c05030"/>
                <stop offset="75%"  stopColor="#7a2910"/>
                <stop offset="100%" stopColor="#3a0e04"/>
              </radialGradient>
            </defs>
            {/* Glow */}
            <circle cx="44" cy="44" r="44" fill="rgba(200,70,30,0.12)" />
            {/* Globe */}
            <circle cx="44" cy="44" r="38" fill="url(#mgA)" />
            {/* Surface bands */}
            <ellipse cx="44" cy="34" rx="30" ry="5" fill="rgba(255,140,80,0.18)" />
            <ellipse cx="44" cy="44" rx="35" ry="4" fill="rgba(100,30,10,0.20)" />
            <ellipse cx="44" cy="55" rx="28" ry="4" fill="rgba(255,120,60,0.14)" />
            {/* Polar cap */}
            <ellipse cx="44" cy="12" rx="12" ry="5" fill="rgba(255,230,210,0.45)" />
            {/* Crater */}
            <circle cx="30" cy="38" r="5" fill="rgba(80,20,5,0.45)" />
            <circle cx="30" cy="38" r="3" fill="rgba(160,60,20,0.3)" />
            <circle cx="56" cy="50" r="3" fill="rgba(80,20,5,0.35)" />
            {/* Limb highlight */}
            <ellipse cx="32" cy="30" rx="10" ry="6"
              fill="rgba(255,200,160,0.22)" transform="rotate(-20 32 30)" />
          </svg>
          {/* Ring system */}
          <div style={{
            position: "absolute", top: "18px", left: "-12px",
            width: "112px", height: "32px",
            borderRadius: "50%",
            border: "2px solid rgba(200,100,50,0.30)",
            boxShadow: "0 0 0 5px rgba(200,100,50,0.10), 0 0 0 10px rgba(200,100,50,0.06)",
            animation: "ringRotate 18s linear infinite",
          }} />
        </div>

        {/* ════════════════════════════════════════════════════════
            PLANET B  — medium icy blue/teal (Neptune-like), mid-left
        ════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute", top: "38%", left: "3%",
          animation: "drift2 34s ease-in-out infinite",
        }}>
          <div style={{
            position: "absolute", top: "-12px", left: "-12px",
            width: "90px", height: "90px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(40,160,200,0.22) 40%, transparent 75%)",
            filter: "blur(9px)",
            animation: "atmoPulse 8s ease-in-out infinite 2s",
          }} />
          <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="mgB" cx="36%" cy="32%" r="62%">
                <stop offset="0%"   stopColor="#8ee8f8"/>
                <stop offset="35%"  stopColor="#2880c0"/>
                <stop offset="70%"  stopColor="#0d3060"/>
                <stop offset="100%" stopColor="#050e24"/>
              </radialGradient>
            </defs>
            <circle cx="32" cy="32" r="32" fill="rgba(30,120,200,0.10)" />
            <circle cx="32" cy="32" r="28" fill="url(#mgB)" />
            <ellipse cx="32" cy="24" rx="22" ry="4" fill="rgba(180,230,255,0.15)" />
            <ellipse cx="32" cy="32" rx="26" ry="3" fill="rgba(10,50,120,0.25)" />
            <ellipse cx="32" cy="40" rx="20" ry="3" fill="rgba(100,200,240,0.12)" />
            <ellipse cx="22" cy="18" rx="7" ry="4" fill="rgba(200,240,255,0.20)" transform="rotate(-15 22 18)" />
          </svg>
          {/* Ring */}
          <div style={{
            position: "absolute", top: "14px", left: "-14px",
            width: "92px", height: "24px",
            borderRadius: "50%",
            border: "2px solid rgba(60,160,220,0.28)",
            boxShadow: "0 0 0 4px rgba(60,160,220,0.09)",
            animation: "ringRotate 24s linear infinite reverse",
          }} />
        </div>

        {/* ════════════════════════════════════════════════════════
            PLANET C  — small gas giant (Jupiter-like bands), bottom-right
        ════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute", bottom: "14%", right: "18%",
          animation: "drift3 40s ease-in-out infinite",
        }}>
          <div style={{
            position: "absolute", top: "-10px", left: "-10px",
            width: "80px", height: "80px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,150,80,0.20) 40%, transparent 75%)",
            filter: "blur(8px)",
            animation: "atmoPulse 5s ease-in-out infinite 1s",
          }} />
          <svg width="58" height="58" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="mgC" cx="40%" cy="36%" r="58%">
                <stop offset="0%"   stopColor="#f0d090"/>
                <stop offset="30%"  stopColor="#c87830"/>
                <stop offset="65%"  stopColor="#8a4010"/>
                <stop offset="100%" stopColor="#3a1804"/>
              </radialGradient>
              <clipPath id="clipC">
                <circle cx="29" cy="29" r="26" />
              </clipPath>
            </defs>
            <circle cx="29" cy="29" r="29" fill="rgba(200,120,40,0.08)" />
            <circle cx="29" cy="29" r="26" fill="url(#mgC)" />
            {/* Jupiter bands */}
            <g clipPath="url(#clipC)">
              <rect x="3" y="15" width="52" height="5" fill="rgba(180,100,40,0.35)" />
              <rect x="3" y="22" width="52" height="4" fill="rgba(240,200,120,0.25)" />
              <rect x="3" y="28" width="52" height="6" fill="rgba(150,70,20,0.40)" />
              <rect x="3" y="36" width="52" height="4" fill="rgba(220,170,80,0.20)" />
              <rect x="3" y="42" width="52" height="5" fill="rgba(170,90,30,0.30)" />
              {/* Great Red Spot */}
              <ellipse cx="20" cy="31" rx="7" ry="4" fill="rgba(200,50,20,0.55)" />
              <ellipse cx="20" cy="31" rx="4" ry="2.5" fill="rgba(240,100,60,0.35)" />
            </g>
            <ellipse cx="20" cy="18" rx="8" ry="5" fill="rgba(255,240,200,0.18)" transform="rotate(-10 20 18)" />
          </svg>
        </div>

        {/* ════════════════════════════════════════════════════════
            CHANDRAYAAN-3 ORBITER  — top-center-left
        ════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute", top: "12%", left: "28%",
          animation: "satDrift 22s ease-in-out infinite",
          opacity: 0.82,
        }}>
          {/* Engine glow */}
          <div style={{
            position: "absolute", bottom: "-8px", left: "50%",
            transform: "translateX(-50%)",
            width: "16px", height: "16px",
            background: "radial-gradient(circle, rgba(100,180,255,0.6) 0%, transparent 70%)",
            filter: "blur(4px)",
            animation: "atmoPulse 2s ease-in-out infinite",
          }} />
          <svg width="80" height="54" viewBox="0 0 80 54" xmlns="http://www.w3.org/2000/svg">
            {/* Left solar panel */}
            <rect x="0" y="18" width="26" height="14" rx="2"
              fill="rgba(30,80,160,0.75)" stroke="rgba(80,160,255,0.5)" strokeWidth="0.8"
              style={{ animation: "solarGlint 4s ease-in-out infinite" }} />
            {/* Panel grid lines */}
            <line x1="8"  y1="18" x2="8"  y2="32" stroke="rgba(80,160,255,0.35)" strokeWidth="0.6" />
            <line x1="16" y1="18" x2="16" y2="32" stroke="rgba(80,160,255,0.35)" strokeWidth="0.6" />
            <line x1="0"  y1="24" x2="26" y2="24" stroke="rgba(80,160,255,0.35)" strokeWidth="0.6" />

            {/* Right solar panel */}
            <rect x="54" y="18" width="26" height="14" rx="2"
              fill="rgba(30,80,160,0.75)" stroke="rgba(80,160,255,0.5)" strokeWidth="0.8"
              style={{ animation: "solarGlint 4s ease-in-out infinite 1s" }} />
            <line x1="62" y1="18" x2="62" y2="32" stroke="rgba(80,160,255,0.35)" strokeWidth="0.6" />
            <line x1="70" y1="18" x2="70" y2="32" stroke="rgba(80,160,255,0.35)" strokeWidth="0.6" />
            <line x1="54" y1="24" x2="80" y2="24" stroke="rgba(80,160,255,0.35)" strokeWidth="0.6" />

            {/* Panel booms */}
            <line x1="26" y1="25" x2="32" y2="25" stroke="rgba(180,200,230,0.6)" strokeWidth="1.2" />
            <line x1="48" y1="25" x2="54" y2="25" stroke="rgba(180,200,230,0.6)" strokeWidth="1.2" />

            {/* Main bus body */}
            <rect x="30" y="12" width="20" height="26" rx="3"
              fill="rgba(40,50,70,0.90)" stroke="rgba(100,160,255,0.45)" strokeWidth="1" />
            {/* Thermal blanket pattern */}
            <rect x="32" y="14" width="16" height="22" rx="2" fill="rgba(200,170,80,0.18)" />
            <line x1="32" y1="20" x2="48" y2="20" stroke="rgba(200,170,80,0.25)" strokeWidth="0.7" />
            <line x1="32" y1="26" x2="48" y2="26" stroke="rgba(200,170,80,0.25)" strokeWidth="0.7" />
            <line x1="32" y1="32" x2="48" y2="32" stroke="rgba(200,170,80,0.25)" strokeWidth="0.7" />

            {/* High-gain dish */}
            <ellipse cx="40" cy="10" rx="8" ry="3"
              fill="rgba(180,200,230,0.40)" stroke="rgba(140,180,255,0.50)" strokeWidth="0.8" />
            <line x1="40" y1="10" x2="40" y2="14" stroke="rgba(180,200,230,0.55)" strokeWidth="1" />

            {/* Thruster nozzles */}
            <rect x="34" y="37" width="4" height="3" rx="1" fill="rgba(120,140,170,0.60)" />
            <rect x="42" y="37" width="4" height="3" rx="1" fill="rgba(120,140,170,0.60)" />

            {/* CHANDRAYAAN-3 label */}
            <text x="40" y="52" textAnchor="middle"
              fontSize="5" fill="rgba(140,180,255,0.65)" fontFamily="monospace" letterSpacing="0.5">
              CHANDRAYAAN-3
            </text>
          </svg>
        </div>

        {/* ════════════════════════════════════════════════════════
            VIKRAM LANDER  — mid-right area
        ════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute", top: "55%", right: "10%",
          animation: "vikramDrift 30s ease-in-out infinite",
          opacity: 0.78,
        }}>
          <svg width="60" height="66" viewBox="0 0 60 66" xmlns="http://www.w3.org/2000/svg">
            {/* Descent module (truncated cone shape) */}
            <polygon points="20,8 40,8 50,40 10,40"
              fill="rgba(50,60,80,0.88)" stroke="rgba(120,180,255,0.45)" strokeWidth="1" />
            {/* Thermal panel */}
            <rect x="22" y="12" width="16" height="20" rx="2"
              fill="rgba(200,160,60,0.22)" stroke="rgba(200,160,60,0.30)" strokeWidth="0.6" />
            <line x1="22" y1="18" x2="38" y2="18" stroke="rgba(200,160,60,0.25)" strokeWidth="0.6" />
            <line x1="22" y1="24" x2="38" y2="24" stroke="rgba(200,160,60,0.25)" strokeWidth="0.6" />
            <line x1="22" y1="30" x2="38" y2="30" stroke="rgba(200,160,60,0.25)" strokeWidth="0.6" />
            {/* Camera eye */}
            <circle cx="30" cy="22" r="3" fill="rgba(20,30,50,0.9)" stroke="rgba(140,200,255,0.5)" strokeWidth="0.8" />
            <circle cx="30" cy="22" r="1.5" fill="rgba(60,140,255,0.4)" />

            {/* Landing leg - left */}
            <line x1="14" y1="38" x2="4"  y2="54" stroke="rgba(140,160,200,0.65)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="4"  y1="54" x2="0"  y2="54" stroke="rgba(140,160,200,0.65)" strokeWidth="1.8" strokeLinecap="round" />
            {/* Landing leg - right */}
            <line x1="46" y1="38" x2="56" y2="54" stroke="rgba(140,160,200,0.65)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="56" y1="54" x2="60" y2="54" stroke="rgba(140,160,200,0.65)" strokeWidth="1.8" strokeLinecap="round" />
            {/* Front leg */}
            <line x1="30" y1="40" x2="30" y2="56" stroke="rgba(140,160,200,0.55)" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="30" cy="57" rx="5" ry="2" fill="rgba(140,160,200,0.40)" />

            {/* Thruster */}
            <rect x="26" y="40" width="8" height="4" rx="1" fill="rgba(80,100,140,0.70)" />
            {/* Thruster nozzle glow */}
            <ellipse cx="30" cy="47" rx="4" ry="2"
              fill="rgba(80,160,255,0.15)" />

            {/* Antenna */}
            <line x1="30" y1="8" x2="30" y2="2" stroke="rgba(180,200,230,0.65)" strokeWidth="1" />
            <circle cx="30" cy="2" r="1.5" fill="rgba(180,200,230,0.55)" />

            {/* VIKRAM label */}
            <text x="30" y="64" textAnchor="middle"
              fontSize="5" fill="rgba(140,180,255,0.60)" fontFamily="monospace" letterSpacing="0.5">
              VIKRAM
            </text>
          </svg>
        </div>

        {/* ════════════════════════════════════════════════════════
            GENERIC COMMS SATELLITE  — bottom-left quadrant
        ════════════════════════════════════════════════════════ */}
        <div style={{
          position: "absolute", bottom: "22%", left: "14%",
          animation: "drift5 26s ease-in-out infinite",
          opacity: 0.70,
        }}>
          <svg width="70" height="40" viewBox="0 0 70 40" xmlns="http://www.w3.org/2000/svg">
            {/* Left wing */}
            <rect x="0" y="12" width="22" height="12" rx="2"
              fill="rgba(20,60,140,0.70)" stroke="rgba(60,140,255,0.45)" strokeWidth="0.8"
              style={{ animation: "solarGlint 5s ease-in-out infinite 0.5s" }} />
            <line x1="7"  y1="12" x2="7"  y2="24" stroke="rgba(60,140,255,0.30)" strokeWidth="0.6" />
            <line x1="14" y1="12" x2="14" y2="24" stroke="rgba(60,140,255,0.30)" strokeWidth="0.6" />
            <line x1="0"  y1="18" x2="22" y2="18" stroke="rgba(60,140,255,0.30)" strokeWidth="0.6" />
            {/* Right wing */}
            <rect x="48" y="12" width="22" height="12" rx="2"
              fill="rgba(20,60,140,0.70)" stroke="rgba(60,140,255,0.45)" strokeWidth="0.8"
              style={{ animation: "solarGlint 5s ease-in-out infinite 1.5s" }} />
            <line x1="55" y1="12" x2="55" y2="24" stroke="rgba(60,140,255,0.30)" strokeWidth="0.6" />
            <line x1="62" y1="12" x2="62" y2="24" stroke="rgba(60,140,255,0.30)" strokeWidth="0.6" />
            <line x1="48" y1="18" x2="70" y2="18" stroke="rgba(60,140,255,0.30)" strokeWidth="0.6" />
            {/* Boom */}
            <line x1="22" y1="18" x2="28" y2="18" stroke="rgba(160,180,220,0.55)" strokeWidth="1" />
            <line x1="42" y1="18" x2="48" y2="18" stroke="rgba(160,180,220,0.55)" strokeWidth="1" />
            {/* Body */}
            <rect x="28" y="8" width="14" height="20" rx="2"
              fill="rgba(40,50,70,0.90)" stroke="rgba(80,140,255,0.40)" strokeWidth="1" />
            {/* Dish */}
            <ellipse cx="35" cy="7" rx="6" ry="2.5"
              fill="rgba(160,190,230,0.35)" stroke="rgba(140,180,255,0.45)" strokeWidth="0.8" />
            <line x1="35" y1="7" x2="35" y2="10" stroke="rgba(160,190,230,0.5)" strokeWidth="0.8" />
          </svg>
        </div>

        {/* ════════════════════════════════════════════════════════
            SPACE DEBRIS  — 7 tumbling fragments scattered
        ════════════════════════════════════════════════════════ */}

        {/* Debris 1 — upper left drift */}
        <div style={{
          position: "absolute", top: "20%", left: "15%",
          animation: "debris1 35s linear infinite",
          opacity: 0.45,
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon points="5,0 10,4 8,10 2,10 0,4" fill="rgba(180,190,210,0.8)" />
          </svg>
        </div>

        {/* Debris 2 — middle, drifting right→left */}
        <div style={{
          position: "absolute", top: "45%", left: "60%",
          animation: "debris2 42s linear infinite 5s",
          opacity: 0.38,
        }}>
          <svg width="7" height="7" viewBox="0 0 7 7">
            <polygon points="3.5,0 7,7 0,7" fill="rgba(160,170,200,0.75)" />
          </svg>
        </div>

        {/* Debris 3 — large-ish tumbling shard */}
        <div style={{
          position: "absolute", top: "70%", left: "40%",
          animation: "debris3 50s linear infinite 12s",
          opacity: 0.35,
        }}>
          <svg width="14" height="9" viewBox="0 0 14 9">
            <polygon points="0,9 6,0 14,3 10,9" fill="rgba(140,150,180,0.70)" />
          </svg>
        </div>

        {/* Debris 4 — tiny bolt fragment top-center */}
        <div style={{
          position: "absolute", top: "30%", left: "50%",
          animation: "debris4 38s linear infinite 8s",
          opacity: 0.42,
        }}>
          <svg width="8" height="8" viewBox="0 0 8 8">
            <rect x="0" y="2" width="8" height="4" rx="1" fill="rgba(200,210,230,0.70)" transform="rotate(20 4 4)" />
          </svg>
        </div>

        {/* Debris 5 — mid-right */}
        <div style={{
          position: "absolute", top: "62%", right: "30%",
          animation: "debris5 44s linear infinite 3s",
          opacity: 0.40,
        }}>
          <svg width="11" height="7" viewBox="0 0 11 7">
            <polygon points="0,7 4,0 11,2 8,7" fill="rgba(170,180,210,0.65)" />
          </svg>
        </div>

        {/* Debris 6 — lower-left */}
        <div style={{
          position: "absolute", bottom: "30%", left: "30%",
          animation: "debris6 56s linear infinite 18s",
          opacity: 0.33,
        }}>
          <svg width="9" height="9" viewBox="0 0 9 9">
            <polygon points="4.5,0 9,9 0,6" fill="rgba(150,160,190,0.65)" />
          </svg>
        </div>

        {/* Debris 7 — upper-right corner */}
        <div style={{
          position: "absolute", top: "8%", right: "30%",
          animation: "debris7 32s linear infinite 1s",
          opacity: 0.37,
        }}>
          <svg width="12" height="6" viewBox="0 0 12 6">
            <polygon points="0,6 5,0 12,1 10,6" fill="rgba(180,185,210,0.65)" />
          </svg>
        </div>

      </div>
    </>
  );
}
