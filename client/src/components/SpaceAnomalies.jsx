import React, { useMemo } from "react";

export default function SpaceAnomalies() {
  const stars = useMemo(() => {
    const starList = [];
    const colors = ["#ffffff", "#e0f2fe", "#bae6fd", "#fef08a", "#f5d0fe", "#fca5a5", "#a5f3fc"];
    let seed = 2026;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < 70; i++) {
      starList.push({
        id: i,
        top: (rnd() * 92 + 4).toFixed(2) + "%",
        left: (rnd() * 92 + 4).toFixed(2) + "%",
        size: (rnd() * 2.2 + 0.6).toFixed(1) + "px",
        color: colors[Math.floor(rnd() * colors.length)],
        duration: (rnd() * 4 + 2).toFixed(1) + "s",
        delay: (rnd() * 5).toFixed(1) + "s",
      });
    }
    return starList;
  }, []);

  return (
    <>
      <style>{`
        /* ====================================================
           SOLAR SYSTEM SEQUENTIAL FLYBY  —  240s cycle
           One object visible at a time, crossing viewport
           diagonal: top-left (India badge) to bottom-right (ISRO badge)
           ==================================================== */

        /* MERCURY 0s-22s */
        @keyframes flyMercury {
          0%   { transform: translate(8vw,10vh)  scale(0.60); opacity:0; }
          3%   { opacity:0.88; }
          14%  { transform: translate(52vw,28vh) scale(0.88); opacity:0.88; }
          18%  { transform: translate(86vw,44vh) scale(0.55); opacity:0; }
          100% { transform: translate(86vw,44vh) scale(0.55); opacity:0; }
        }
        /* VENUS 24s-46s */
        @keyframes flyVenus {
          0%   { transform: translate(10vw,8vh)  scale(0.62); opacity:0; }
          3%   { opacity:0.86; }
          14%  { transform: translate(50vw,26vh) scale(0.92); opacity:0.86; }
          18%  { transform: translate(84vw,42vh) scale(0.58); opacity:0; }
          100% { transform: translate(84vw,42vh) scale(0.58); opacity:0; }
        }
        /* EARTH 48s-70s */
        @keyframes flyEarth {
          0%   { transform: translate(6vw,12vh)  scale(0.65); opacity:0; }
          3%   { opacity:0.90; }
          14%  { transform: translate(48vw,24vh) scale(0.95); opacity:0.90; }
          18%  { transform: translate(82vw,40vh) scale(0.60); opacity:0; }
          100% { transform: translate(82vw,40vh) scale(0.60); opacity:0; }
        }
        /* MARS 72s-94s (enters right exits left — variety) */
        @keyframes flyMars {
          0%   { transform: translate(82vw,10vh) scale(0.60); opacity:0; }
          3%   { opacity:0.88; }
          14%  { transform: translate(42vw,28vh) scale(0.90); opacity:0.88; }
          18%  { transform: translate(10vw,44vh) scale(0.56); opacity:0; }
          100% { transform: translate(10vw,44vh) scale(0.56); opacity:0; }
        }
        /* ASTEROID BELT 96s-112s */
        @keyframes flyAsteroids {
          0%   { transform: translate(14vw,14vh) scale(0.70); opacity:0; }
          3%   { opacity:0.82; }
          12%  { transform: translate(54vw,30vh) scale(0.90); opacity:0.82; }
          16%  { transform: translate(80vw,46vh) scale(0.60); opacity:0; }
          100% { transform: translate(80vw,46vh) scale(0.60); opacity:0; }
        }
        /* JUPITER 114s-138s */
        @keyframes flyJupiter {
          0%   { transform: translate(80vw,8vh)  scale(0.60); opacity:0; }
          3%   { opacity:0.88; }
          14%  { transform: translate(44vw,22vh) scale(0.92); opacity:0.88; }
          18%  { transform: translate(8vw,38vh)  scale(0.55); opacity:0; }
          100% { transform: translate(8vw,38vh)  scale(0.55); opacity:0; }
        }
        /* SATURN 140s-162s */
        @keyframes flySaturn {
          0%   { transform: translate(10vw,6vh)  scale(0.58); opacity:0; }
          3%   { opacity:0.85; }
          14%  { transform: translate(46vw,22vh) scale(0.88); opacity:0.85; }
          18%  { transform: translate(80vw,36vh) scale(0.54); opacity:0; }
          100% { transform: translate(80vw,36vh) scale(0.54); opacity:0; }
        }
        /* URANUS 164s-186s */
        @keyframes flyUranus {
          0%   { transform: translate(78vw,12vh) scale(0.60); opacity:0; }
          3%   { opacity:0.84; }
          14%  { transform: translate(42vw,26vh) scale(0.90); opacity:0.84; }
          18%  { transform: translate(12vw,42vh) scale(0.56); opacity:0; }
          100% { transform: translate(12vw,42vh) scale(0.56); opacity:0; }
        }
        /* NEPTUNE 188s-210s */
        @keyframes flyNeptune {
          0%   { transform: translate(12vw,10vh) scale(0.62); opacity:0; }
          3%   { opacity:0.88; }
          14%  { transform: translate(50vw,24vh) scale(0.92); opacity:0.88; }
          18%  { transform: translate(84vw,40vh) scale(0.56); opacity:0; }
          100% { transform: translate(84vw,40vh) scale(0.56); opacity:0; }
        }
        /* PLUTO 212s-228s */
        @keyframes flyPluto {
          0%   { transform: translate(76vw,14vh) scale(0.52); opacity:0; }
          3%   { opacity:0.78; }
          12%  { transform: translate(42vw,28vh) scale(0.75); opacity:0.78; }
          16%  { transform: translate(14vw,44vh) scale(0.48); opacity:0; }
          100% { transform: translate(14vw,44vh) scale(0.48); opacity:0; }
        }

        @keyframes starTwinkle {
          0%,100% { opacity:0.18; transform:scale(0.85); }
          50%     { opacity:0.75; transform:scale(1.2); }
        }
        @keyframes meteorRare {
          0%   { transform:translate(0,0) rotate(-38deg) scaleX(0); opacity:0; }
          1.5% { opacity:0.92; transform:translate(14vw,16vh) rotate(-38deg) scaleX(1); }
          3%   { opacity:0; transform:translate(32vw,40vh) rotate(-38deg) scaleX(1.5); }
          100% { opacity:0; }
        }
        @keyframes nebulaShift {
          0%,100% { opacity:0.40; transform:scale(1); }
          50%     { opacity:0.65; transform:scale(1.06); }
        }
        @keyframes asteroidSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* SVG Global Gradient Defs */}
      <svg width="0" height="0" style={{ position:"absolute" }}>
        <defs>
          <filter id="shadow3d" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-3" dy="7" stdDeviation="9" floodColor="#000" floodOpacity="0.75" />
          </filter>

          {/* MERCURY */}
          <radialGradient id="mercG" cx="34%" cy="28%" r="64%">
            <stop offset="0%"   stopColor="#d4cfc8"/>
            <stop offset="22%"  stopColor="#b0aba4"/>
            <stop offset="50%"  stopColor="#7e7870"/>
            <stop offset="78%"  stopColor="#4a4540"/>
            <stop offset="100%" stopColor="#1e1b18"/>
          </radialGradient>
          <radialGradient id="mercSpec" cx="28%" cy="22%" r="30%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.55)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>

          {/* VENUS */}
          <radialGradient id="venG" cx="36%" cy="30%" r="62%">
            <stop offset="0%"   stopColor="#ffe5a0"/>
            <stop offset="18%"  stopColor="#f5c842"/>
            <stop offset="44%"  stopColor="#c98a00"/>
            <stop offset="72%"  stopColor="#7a4e00"/>
            <stop offset="100%" stopColor="#2d1a00"/>
          </radialGradient>
          <radialGradient id="venSpec" cx="28%" cy="22%" r="34%">
            <stop offset="0%"   stopColor="rgba(255,248,200,0.60)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>

          {/* EARTH */}
          <radialGradient id="earthG" cx="36%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#7dd3fc"/>
            <stop offset="20%"  stopColor="#0ea5e9"/>
            <stop offset="48%"  stopColor="#0284c7"/>
            <stop offset="75%"  stopColor="#1e3a8a"/>
            <stop offset="92%"  stopColor="#0f172a"/>
            <stop offset="100%" stopColor="#020617"/>
          </radialGradient>
          <radialGradient id="earthSpec" cx="29%" cy="23%" r="32%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.62)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="earthTerm" x1="88%" y1="0%" x2="12%" y2="100%">
            <stop offset="0%"  stopColor="transparent"/>
            <stop offset="52%" stopColor="transparent"/>
            <stop offset="80%" stopColor="rgba(0,0,15,0.50)"/>
            <stop offset="100%" stopColor="rgba(0,0,5,0.82)"/>
          </linearGradient>

          {/* MARS */}
          <radialGradient id="marsG" cx="34%" cy="28%" r="64%">
            <stop offset="0%"   stopColor="#fca17a"/>
            <stop offset="20%"  stopColor="#e8622e"/>
            <stop offset="48%"  stopColor="#b94020"/>
            <stop offset="74%"  stopColor="#7a2010"/>
            <stop offset="100%" stopColor="#2e0c05"/>
          </radialGradient>
          <radialGradient id="marsSpec" cx="30%" cy="24%" r="30%">
            <stop offset="0%"   stopColor="rgba(255,200,160,0.55)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="marsTerm" x1="88%" y1="0%" x2="12%" y2="100%">
            <stop offset="0%"  stopColor="transparent"/>
            <stop offset="55%" stopColor="transparent"/>
            <stop offset="82%" stopColor="rgba(0,0,0,0.48)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.82)"/>
          </linearGradient>

          {/* JUPITER */}
          <radialGradient id="jupG" cx="38%" cy="32%" r="60%">
            <stop offset="0%"   stopColor="#fef3c7"/>
            <stop offset="18%"  stopColor="#fbbf24"/>
            <stop offset="42%"  stopColor="#d97706"/>
            <stop offset="68%"  stopColor="#92400e"/>
            <stop offset="88%"  stopColor="#451a03"/>
            <stop offset="100%" stopColor="#170601"/>
          </radialGradient>
          <radialGradient id="jupSpec" cx="30%" cy="24%" r="30%">
            <stop offset="0%"   stopColor="rgba(255,248,200,0.52)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="jupTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%"  stopColor="transparent"/>
            <stop offset="52%" stopColor="transparent"/>
            <stop offset="80%" stopColor="rgba(0,0,0,0.44)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.78)"/>
          </linearGradient>

          {/* SATURN */}
          <radialGradient id="satG" cx="38%" cy="32%" r="62%">
            <stop offset="0%"   stopColor="#fef08a"/>
            <stop offset="18%"  stopColor="#fde047"/>
            <stop offset="42%"  stopColor="#d97706"/>
            <stop offset="68%"  stopColor="#92400e"/>
            <stop offset="90%"  stopColor="#451a03"/>
            <stop offset="100%" stopColor="#1c0a02"/>
          </radialGradient>
          <radialGradient id="satSpec" cx="30%" cy="24%" r="30%">
            <stop offset="0%"   stopColor="rgba(255,252,200,0.52)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="satTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%"  stopColor="transparent"/>
            <stop offset="52%" stopColor="transparent"/>
            <stop offset="80%" stopColor="rgba(0,0,0,0.44)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.80)"/>
          </linearGradient>

          {/* URANUS */}
          <radialGradient id="uraG" cx="36%" cy="30%" r="62%">
            <stop offset="0%"   stopColor="#b2f0f0"/>
            <stop offset="22%"  stopColor="#5ecfcf"/>
            <stop offset="50%"  stopColor="#2fa8a8"/>
            <stop offset="76%"  stopColor="#1a6666"/>
            <stop offset="100%" stopColor="#082828"/>
          </radialGradient>
          <radialGradient id="uraSpec" cx="28%" cy="22%" r="32%">
            <stop offset="0%"   stopColor="rgba(200,255,255,0.58)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="uraTerm" x1="88%" y1="0%" x2="12%" y2="100%">
            <stop offset="0%"  stopColor="transparent"/>
            <stop offset="55%" stopColor="transparent"/>
            <stop offset="82%" stopColor="rgba(0,0,0,0.45)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.80)"/>
          </linearGradient>

          {/* NEPTUNE */}
          <radialGradient id="nepG" cx="36%" cy="30%" r="62%">
            <stop offset="0%"   stopColor="#a8d8ff"/>
            <stop offset="20%"  stopColor="#4c9be8"/>
            <stop offset="46%"  stopColor="#1e6fc8"/>
            <stop offset="72%"  stopColor="#0c3878"/>
            <stop offset="100%" stopColor="#020d2a"/>
          </radialGradient>
          <radialGradient id="nepSpec" cx="28%" cy="22%" r="32%">
            <stop offset="0%"   stopColor="rgba(180,220,255,0.58)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="nepTerm" x1="88%" y1="0%" x2="12%" y2="100%">
            <stop offset="0%"  stopColor="transparent"/>
            <stop offset="55%" stopColor="transparent"/>
            <stop offset="82%" stopColor="rgba(0,0,0,0.46)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.82)"/>
          </linearGradient>

          {/* PLUTO */}
          <radialGradient id="pluG" cx="34%" cy="28%" r="62%">
            <stop offset="0%"   stopColor="#d4c8b8"/>
            <stop offset="24%"  stopColor="#a89888"/>
            <stop offset="52%"  stopColor="#705848"/>
            <stop offset="80%"  stopColor="#3a2a20"/>
            <stop offset="100%" stopColor="#100a08"/>
          </radialGradient>
          <radialGradient id="pluSpec" cx="28%" cy="22%" r="30%">
            <stop offset="0%"   stopColor="rgba(230,220,200,0.50)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
      </svg>

      {/* Main Viewport */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>

        {/* Nebula backdrops */}
        <div style={{
          position:"absolute", top:"10%", right:"15%",
          width:"52vw", height:"52vh",
          background:"radial-gradient(ellipse at center,rgba(14,165,233,0.032) 0%,transparent 68%)",
          filter:"blur(70px)", animation:"nebulaShift 14s ease-in-out infinite",
        }}/>
        <div style={{
          position:"absolute", bottom:"15%", left:"10%",
          width:"44vw", height:"40vh",
          background:"radial-gradient(ellipse at center,rgba(168,85,247,0.028) 0%,transparent 68%)",
          filter:"blur(80px)", animation:"nebulaShift 18s ease-in-out infinite 4s",
        }}/>

        {/* Stars */}
        <div style={{ position:"absolute", inset:0 }}>
          {stars.map((s) => (
            <div key={s.id} style={{
              position:"absolute", top:s.top, left:s.left,
              width:s.size, height:s.size, borderRadius:"50%",
              backgroundColor:s.color, boxShadow:"0 0 3px "+s.color,
              animation:"starTwinkle "+s.duration+" ease-in-out infinite alternate "+s.delay,
            }}/>
          ))}
        </div>

        {/* Shooting star */}
        <div style={{
          position:"absolute", top:"8%", left:"38%",
          width:"160px", height:"1.5px",
          background:"linear-gradient(90deg,#ffffff 0%,rgba(147,197,253,0.7) 35%,transparent 100%)",
          borderRadius:"2px", animation:"meteorRare 35s ease-out infinite 10s",
          transformOrigin:"left center",
        }}/>

        {/* ======================================================
            1. MERCURY — heavily cratered grey body
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flyMercury 240s linear infinite 0s both", filter:"url(#shadow3d)" }}>
          <svg width="72" height="72" viewBox="0 0 72 72"
            style={{ filter:"drop-shadow(0 0 12px rgba(180,170,160,0.40))" }}>
            <defs><clipPath id="mercClip"><circle cx="36" cy="36" r="32"/></clipPath></defs>
            <circle cx="36" cy="36" r="32" fill="url(#mercG)"/>
            <g clipPath="url(#mercClip)">
              {[[22,20,5],[50,28,3.5],[16,46,4],[44,52,3],[58,18,2.5],[30,54,2.8],[60,44,4],[8,30,2.5]].map(([cx,cy,r],i)=>(
                <g key={i}>
                  <circle cx={cx} cy={cy} r={r} fill="rgba(0,0,0,0.35)"/>
                  <circle cx={cx-1} cy={cy-1} r={r*0.5} fill="rgba(255,255,255,0.14)"/>
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.20)" strokeWidth="0.8"/>
                </g>
              ))}
              {/* Large impact basin */}
              <circle cx="52" cy="52" r="9" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="2"/>
              <circle cx="52" cy="52" r="6" fill="rgba(0,0,0,0.18)"/>
              {/* Specular highlight */}
              <circle cx="36" cy="36" r="32" fill="url(#mercSpec)"/>
              {/* Terminator */}
              <ellipse cx="54" cy="42" rx="15" ry="32" fill="rgba(0,0,0,0.52)"/>
            </g>
            <circle cx="36" cy="36" r="31.5" fill="none" stroke="rgba(200,195,185,0.20)" strokeWidth="0.7"/>
          </svg>
          <div style={{ textAlign:"center", marginTop:"3px", fontSize:"6px", fontWeight:700,
            letterSpacing:"0.15em", color:"rgba(180,170,155,0.80)", fontFamily:"monospace" }}>MERCURY</div>
        </div>

        {/* ======================================================
            2. VENUS — thick sulphuric cloud atmosphere
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flyVenus 240s linear infinite 24s both", filter:"url(#shadow3d)" }}>
          <svg width="88" height="88" viewBox="0 0 88 88"
            style={{ filter:"drop-shadow(0 0 20px rgba(220,160,0,0.40))" }}>
            <defs><clipPath id="venClip"><circle cx="44" cy="44" r="38"/></clipPath></defs>
            {/* Atmospheric glow */}
            <circle cx="44" cy="44" r="41" fill="rgba(245,200,60,0.10)"/>
            <circle cx="44" cy="44" r="38" fill="url(#venG)"/>
            <g clipPath="url(#venClip)">
              {/* Cloud band swirls */}
              <g style={{ mixBlendMode:"screen", opacity:0.40 }}>
                <path d="M4,25 Q24,20 44,25 T84,23 L84,35 Q64,37 44,32 T4,34Z" fill="#ffe099"/>
                <path d="M4,38 Q24,34 44,38 T84,36 L84,48 Q64,50 44,46 T4,48Z" fill="#e8c020"/>
                <path d="M4,52 Q24,48 44,52 T84,50 L84,62 Q64,64 44,60 T4,62Z" fill="#ffe099"/>
                <path d="M4,65 Q24,61 44,65 T84,63 L84,73 Q64,75 44,71 T4,73Z" fill="#d4a800"/>
              </g>
              {/* Bright polar vortex */}
              <ellipse cx="44" cy="8" rx="18" ry="8" fill="rgba(255,235,120,0.25)"/>
              <circle cx="44" cy="44" r="38" fill="url(#venSpec)"/>
              {/* Terminator */}
              <ellipse cx="64" cy="50" rx="20" ry="38" fill="rgba(0,0,0,0.55)"/>
            </g>
            <circle cx="44" cy="44" r="37.5" fill="none" stroke="rgba(255,230,100,0.22)" strokeWidth="0.8"/>
            <circle cx="44" cy="44" r="41" fill="none" stroke="rgba(245,190,40,0.15)" strokeWidth="3"/>
          </svg>
          <div style={{ textAlign:"center", marginTop:"3px", fontSize:"6px", fontWeight:700,
            letterSpacing:"0.15em", color:"rgba(240,190,40,0.80)", fontFamily:"monospace" }}>VENUS</div>
        </div>

        {/* ======================================================
            3. EARTH — continents, oceans, polar caps, clouds
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flyEarth 240s linear infinite 48s both", filter:"url(#shadow3d)" }}>
          <svg width="110" height="110" viewBox="0 0 110 110"
            style={{ filter:"drop-shadow(0 0 24px rgba(14,165,233,0.42))" }}>
            <defs><clipPath id="earthClip"><circle cx="55" cy="55" r="50"/></clipPath></defs>
            <circle cx="55" cy="55" r="52" fill="rgba(14,165,233,0.10)"/>
            <circle cx="55" cy="55" r="50" fill="url(#earthG)"/>
            <g clipPath="url(#earthClip)">
              {/* Eurasia */}
              <path d="M40,18 Q54,12 72,16 Q84,22 86,36 Q80,46 68,44 Q62,54 57,60 Q52,52 48,44 Q38,40 40,28Z"
                fill="#15803d" stroke="#166534" strokeWidth="0.6"/>
              {/* Africa */}
              <path d="M50,52 Q58,48 64,54 Q68,64 64,78 Q58,84 52,76 Q46,68 48,58Z"
                fill="#c2801a" opacity="0.85"/>
              {/* Americas */}
              <path d="M16,30 Q24,26 30,34 Q34,48 28,62 Q22,70 16,60 Q10,50 12,38Z"
                fill="#15803d" opacity="0.88"/>
              <path d="M20,64 Q24,60 28,66 Q26,78 22,84 Q16,82 18,72Z"
                fill="#15803d" opacity="0.78"/>
              {/* Australia */}
              <ellipse cx="82" cy="76" rx="9" ry="6" fill="#d97706"/>
              {/* Greenland */}
              <ellipse cx="36" cy="14" rx="7" ry="5" fill="#e2e8f0" opacity="0.80"/>
              {/* Polar caps */}
              <ellipse cx="55" cy="5"  rx="20" ry="5"  fill="#f8fafc" opacity="0.92"/>
              <ellipse cx="55" cy="105" rx="24" ry="5.5" fill="#f8fafc" opacity="0.92"/>
              {/* Cloud wisps */}
              <g style={{ mixBlendMode:"screen", opacity:0.50 }}>
                <path d="M6,38 Q28,30 55,34 T104,32" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round"/>
                <path d="M12,54 Q38,48 66,52 T108,48" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
                <path d="M8,70 Q32,64 60,68 T106,64" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round"/>
              </g>
              {/* Blue atmosphere limb */}
              <circle cx="55" cy="55" r="50" fill="url(#earthSpec)"/>
              <circle cx="55" cy="55" r="50" fill="url(#earthTerm)"/>
            </g>
            <circle cx="55" cy="55" r="49.5" fill="none" stroke="rgba(186,230,253,0.22)" strokeWidth="1"/>
            <circle cx="55" cy="55" r="52.5" fill="none" stroke="rgba(56,189,248,0.14)" strokeWidth="3.5"/>
            {/* ISS-style tiny satellite */}
            <circle cx="90" cy="26" r="1.5" fill="#e2e8f0" opacity="0.80"/>
          </svg>
          <div style={{ textAlign:"center", marginTop:"3px", fontSize:"6px", fontWeight:700,
            letterSpacing:"0.15em", color:"rgba(56,189,248,0.85)", fontFamily:"monospace" }}>EARTH</div>
        </div>

        {/* ======================================================
            4. MARS — Valles Marineris, Olympus Mons, polar ice
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flyMars 240s linear infinite 72s both", filter:"url(#shadow3d)" }}>
          <svg width="90" height="90" viewBox="0 0 90 90"
            style={{ filter:"drop-shadow(0 0 18px rgba(200,70,30,0.45))" }}>
            <defs><clipPath id="marsClip"><circle cx="45" cy="45" r="42"/></clipPath></defs>
            <circle cx="45" cy="45" r="42" fill="url(#marsG)"/>
            <g clipPath="url(#marsClip)">
              {/* Valles Marineris */}
              <path d="M10,48 Q26,42 45,46 Q58,50 70,46 Q78,44 84,46"
                fill="none" stroke="#5a1a08" strokeWidth="4" strokeLinecap="round"/>
              <path d="M14,52 Q28,46 45,49 Q56,53 68,50"
                fill="none" stroke="#7a2810" strokeWidth="2" strokeLinecap="round" opacity="0.60"/>
              {/* Olympus Mons shield volcano */}
              <circle cx="26" cy="36" r="10" fill="#7a2010" opacity="0.50"/>
              <circle cx="26" cy="36" r="6"  fill="#5a1008" opacity="0.55"/>
              <circle cx="26" cy="36" r="2.5" fill="#8a1808" opacity="0.70"/>
              {/* Tharsis volcanic ridge */}
              <ellipse cx="36" cy="40" rx="6" ry="3" fill="#6a1810" opacity="0.45" transform="rotate(-15,36,40)"/>
              {/* Hellas Basin (largest impact) */}
              <ellipse cx="70" cy="64" rx="12" ry="8" fill="rgba(0,0,0,0.22)" transform="rotate(-10,70,64)"/>
              <ellipse cx="70" cy="64" rx="8"  ry="5" fill="#6a1510" opacity="0.35" transform="rotate(-10,70,64)"/>
              {/* Polar ice caps */}
              <ellipse cx="45" cy="4"  rx="16" ry="4.5" fill="#f0ede8" opacity="0.90"/>
              <ellipse cx="45" cy="4"  rx="12" ry="2.8" fill="#ffffff"  opacity="0.80"/>
              <ellipse cx="45" cy="86" rx="13" ry="4"   fill="#f0ede8" opacity="0.78"/>
              {/* Small craters */}
              {[[62,24,5],[74,56,4],[20,64,3.5],[56,70,3]].map(([cx,cy,r],i)=>(
                <g key={i}>
                  <circle cx={cx} cy={cy} r={r} fill="rgba(0,0,0,0.30)"/>
                  <circle cx={cx-0.8} cy={cy-0.8} r={r*0.5} fill="rgba(255,200,160,0.18)"/>
                </g>
              ))}
              {/* Dust storm */}
              <ellipse cx="58" cy="54" rx="12" ry="7" fill="rgba(220,140,80,0.28)" transform="rotate(20,58,54)"/>
              <circle cx="45" cy="45" r="42" fill="url(#marsSpec)"/>
              <circle cx="45" cy="45" r="42" fill="url(#marsTerm)"/>
            </g>
            <circle cx="45" cy="45" r="41.5" fill="none" stroke="rgba(220,100,60,0.20)" strokeWidth="0.8"/>
            <circle cx="45" cy="45" r="43.5" fill="none" stroke="rgba(200,100,50,0.10)" strokeWidth="2.5"/>
            {/* Phobos */}
            <ellipse cx="78" cy="30" rx="3.5" ry="2.5" fill="#a0907a"
              style={{ filter:"drop-shadow(0 0 2px rgba(160,140,120,0.50))" }}/>
          </svg>
          <div style={{ textAlign:"center", marginTop:"3px", fontSize:"6px", fontWeight:700,
            letterSpacing:"0.15em", color:"rgba(220,90,40,0.85)", fontFamily:"monospace" }}>MARS</div>
        </div>

        {/* ======================================================
            5. ASTEROID BELT — 15 varied 3D rocks + debris
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flyAsteroids 240s linear infinite 96s both" }}>
          <svg width="210" height="130" viewBox="0 0 210 130"
            style={{ filter:"drop-shadow(0 0 12px rgba(160,140,100,0.32))" }}>
            {[
              [30, 64, 13, 9,  15,  "#8a7a60","#4a3e2c"],
              [62, 46, 9,  6,  -22, "#7a6e56","#3e3428"],
              [92, 72, 15, 10, 32,  "#968060","#504030"],
              [120,38, 7,  5,  -12, "#6e6452","#3a3020"],
              [148,64, 11, 7,  46,  "#88785c","#483e2c"],
              [174,44, 10, 6,  -32, "#7e6e56","#423628"],
              [48, 82, 7,  4,  62,  "#726452","#3c3424"],
              [138,84, 9,  5.5,26,  "#8a7860","#46402e"],
              [108,55, 6,  4,  72,  "#706050","#3a3028"],
              [80, 30, 5,  3.5,-52, "#7e7060","#403828"],
              [162,80, 7,  4.5,42,  "#807060","#443c2e"],
              [20, 40, 5,  3,  22,  "#766856","#3e3426"],
              [190,62, 7,  5,  -18, "#887868","#483e34"],
              [55, 22, 4,  3,  57,  "#6e6050","#38302a"],
              [104,92, 10, 6.5,-38, "#927e62","#4c4030"],
            ].map(([cx,cy,rx,ry,rot,bc,dc],i)=>(
              <g key={i} transform={"translate("+cx+","+cy+") rotate("+rot+")"}>
                <ellipse cx="0" cy="0" rx={rx} ry={ry} fill={bc}/>
                <ellipse cx={rx*0.28} cy={ry*0.28} rx={rx*0.55} ry={ry*0.55} fill={dc} opacity="0.52"/>
                <ellipse cx={-rx*0.32} cy={-ry*0.32} rx={rx*0.34} ry={ry*0.30} fill="rgba(255,245,220,0.26)"/>
                {rx > 8 && (
                  <>
                    <circle cx={-rx*0.38} cy={ry*0.14} r={ry*0.26} fill="rgba(0,0,0,0.28)"/>
                    <circle cx={rx*0.24}  cy={-ry*0.30} r={ry*0.20} fill="rgba(0,0,0,0.22)"/>
                  </>
                )}
                {rx > 12 && (
                  <circle cx={rx*0.40} cy={ry*0.40} r={ry*0.18} fill="rgba(0,0,0,0.24)"/>
                )}
              </g>
            ))}
            {/* Dust / pebbles */}
            {[[40,52],[72,67],[103,42],[132,72],[162,52],[88,87],[118,27],[150,90],[28,75]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r={1.0+(i%3)*0.55} fill="rgba(180,160,120,0.55)"/>
            ))}
            <text x="105" y="118" textAnchor="middle" fontSize="7"
              fill="rgba(180,160,100,0.70)" fontFamily="monospace" letterSpacing="2">ASTEROID BELT</text>
          </svg>
        </div>

        {/* ======================================================
            6. JUPITER — 5 bands, GRS, 3 Galilean moons
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flyJupiter 240s linear infinite 114s both", filter:"url(#shadow3d)" }}>
          <svg width="148" height="148" viewBox="0 0 148 148"
            style={{ filter:"drop-shadow(0 0 30px rgba(217,119,6,0.38))" }}>
            <defs><clipPath id="jupClip"><circle cx="74" cy="74" r="66"/></clipPath></defs>
            <circle cx="74" cy="74" r="66" fill="url(#jupG)"/>
            <g clipPath="url(#jupClip)">
              {/* Atmospheric bands */}
              <g style={{ mixBlendMode:"multiply", opacity:0.58 }}>
                <path d="M0,28 Q36,24 74,28 T148,26 L148,41 Q112,43 74,39 T0,41Z" fill="#78350f"/>
                <path d="M0,45 Q36,41 74,45 T148,43 L148,58 Q112,60 74,56 T0,58Z" fill="#92400e"/>
                <path d="M0,66 Q36,62 74,66 T148,64 L148,80 Q112,82 74,78 T0,80Z" fill="#854d0e"/>
                <path d="M0,85 Q36,81 74,85 T148,83 L148,98 Q112,100 74,96 T0,98Z" fill="#78350f"/>
                <path d="M0,104 Q36,100 74,104 T148,102 L148,116 Q112,118 74,114 T0,116Z" fill="#92400e"/>
              </g>
              {/* NEB bright zone */}
              <g style={{ mixBlendMode:"screen", opacity:0.18 }}>
                <path d="M0,56 Q74,52 148,56 T148,70 Q74,74 0,70Z" fill="#fefce8"/>
              </g>
              {/* Great Red Spot */}
              <g style={{ mixBlendMode:"screen", opacity:0.75 }}>
                <ellipse cx="96" cy="82" rx="20" ry="12" fill="#c0392b"/>
                <ellipse cx="96" cy="82" rx="14" ry="8"  fill="#e74c3c"/>
                <ellipse cx="96" cy="82" rx="8.5" ry="5" fill="#ff6b6b"/>
                <ellipse cx="96" cy="82" rx="4.5" ry="2.8" fill="#fef08a"/>
              </g>
              {/* Festoons / turbulence */}
              <g style={{ opacity:0.30 }}>
                <path d="M4,44 Q20,40 36,46 Q50,40 66,44" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M80,44 Q96,40 112,46" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              <circle cx="74" cy="74" r="66" fill="url(#jupSpec)"/>
              <circle cx="74" cy="74" r="66" fill="url(#jupTerm)"/>
            </g>
            {/* Io */}
            <circle cx="124" cy="54" r="4.8" fill="#fef08a" style={{ filter:"drop-shadow(0 0 5px #f59e0b)" }}/>
            {/* Europa */}
            <circle cx="136" cy="82" r="3.5" fill="#e5e7eb" style={{ filter:"drop-shadow(0 0 3px #9ca3af)" }}/>
            {/* Ganymede */}
            <circle cx="6"   cy="68" r="4"   fill="#fde68a" style={{ filter:"drop-shadow(0 0 4px #d97706)" }}/>
            <circle cx="73" cy="73" r="65.5" fill="none" stroke="rgba(254,243,199,0.15)" strokeWidth="1"/>
          </svg>
          <div style={{ textAlign:"center", marginTop:"4px", fontSize:"6px", fontWeight:700,
            letterSpacing:"0.15em", color:"rgba(245,158,11,0.85)", fontFamily:"monospace" }}>JUPITER</div>
        </div>

        {/* ======================================================
            7. SATURN — layered ring system, Titan moon
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flySaturn 240s linear infinite 140s both", filter:"url(#shadow3d)" }}>
          <svg width="240" height="148" viewBox="0 0 240 148"
            style={{ filter:"drop-shadow(0 0 28px rgba(245,158,11,0.34))" }}>
            <defs>
              <clipPath id="satClip"><circle cx="120" cy="74" r="50"/></clipPath>
              <clipPath id="satRingFront"><rect x="-120" y="0" width="240" height="54"/></clipPath>
            </defs>
            {/* Rear rings */}
            <g transform="translate(120,74) rotate(-18)">
              <ellipse cx="0" cy="0" rx="110" ry="26" fill="none" stroke="rgba(120,60,5,0.20)"  strokeWidth="14"/>
              <ellipse cx="0" cy="0" rx="102" ry="24" fill="none" stroke="rgba(245,158,11,0.52)" strokeWidth="9"/>
              <ellipse cx="0" cy="0" rx="96"  ry="22.5" fill="none" stroke="rgba(0,0,0,0.90)"  strokeWidth="2.5"/>
              <ellipse cx="0" cy="0" rx="90"  ry="21" fill="none" stroke="rgba(253,224,71,0.65)" strokeWidth="10"/>
              <ellipse cx="0" cy="0" rx="82"  ry="19" fill="none" stroke="rgba(180,83,9,0.26)"  strokeWidth="5.5"/>
              <ellipse cx="0" cy="0" rx="74"  ry="17" fill="none" stroke="rgba(253,224,71,0.35)" strokeWidth="3"/>
              {/* Cassini Division */}
              <ellipse cx="0" cy="0" rx="97"  ry="23" fill="none" stroke="rgba(0,0,0,0.88)"  strokeWidth="1.5"/>
            </g>
            {/* Globe */}
            <circle cx="120" cy="74" r="50" fill="url(#satG)"/>
            <g clipPath="url(#satClip)">
              <g style={{ mixBlendMode:"multiply", opacity:0.50 }}>
                <path d="M60,54 Q90,50 120,54 T180,52 L180,64 Q150,66 120,62 T60,64Z" fill="#92400e"/>
                <path d="M60,68 Q90,64 120,68 T180,66 L180,78 Q150,80 120,76 T60,78Z" fill="#78350f"/>
                <path d="M60,82 Q90,78 120,82 T180,80 L180,92 Q150,94 120,90 T60,92Z" fill="#92400e"/>
              </g>
              <circle cx="120" cy="74" r="50" fill="url(#satSpec)"/>
              <circle cx="120" cy="74" r="50" fill="url(#satTerm)"/>
            </g>
            <circle cx="120" cy="74" r="49.5" fill="none" stroke="rgba(254,240,138,0.18)" strokeWidth="0.8"/>
            {/* Front rings */}
            <g transform="translate(120,74) rotate(-18)">
              <g clipPath="url(#satRingFront)">
                <ellipse cx="0" cy="0" rx="110" ry="26" fill="none" stroke="rgba(120,60,5,0.20)"  strokeWidth="14"/>
                <ellipse cx="0" cy="0" rx="102" ry="24" fill="none" stroke="rgba(245,158,11,0.52)" strokeWidth="9"/>
                <ellipse cx="0" cy="0" rx="96"  ry="22.5" fill="none" stroke="rgba(0,0,0,0.90)"  strokeWidth="2.5"/>
                <ellipse cx="0" cy="0" rx="90"  ry="21" fill="none" stroke="rgba(253,224,71,0.65)" strokeWidth="10"/>
                <ellipse cx="0" cy="0" rx="82"  ry="19" fill="none" stroke="rgba(180,83,9,0.26)"  strokeWidth="5.5"/>
                <ellipse cx="0" cy="0" rx="74"  ry="17" fill="none" stroke="rgba(253,224,71,0.35)" strokeWidth="3"/>
                <ellipse cx="0" cy="0" rx="97"  ry="23" fill="none" stroke="rgba(0,0,0,0.88)"  strokeWidth="1.5"/>
              </g>
            </g>
            {/* Titan */}
            <circle cx="206" cy="48" r="5.5" fill="#f5c842" style={{ filter:"drop-shadow(0 0 6px #d97706)" }}/>
            {/* Enceladus */}
            <circle cx="14"  cy="88" r="2.8" fill="#e8f0f8" style={{ filter:"drop-shadow(0 0 3px #a8c8e8)" }}/>
          </svg>
          <div style={{ textAlign:"center", marginTop:"4px", fontSize:"6px", fontWeight:700,
            letterSpacing:"0.15em", color:"rgba(253,224,71,0.85)", fontFamily:"monospace" }}>SATURN</div>
        </div>

        {/* ======================================================
            8. URANUS — near-vertical tilted rings (97° tilt), icy
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flyUranus 240s linear infinite 164s both", filter:"url(#shadow3d)" }}>
          <svg width="140" height="140" viewBox="0 0 140 140"
            style={{ filter:"drop-shadow(0 0 22px rgba(94,207,207,0.40))" }}>
            <defs>
              <clipPath id="uraClip"><circle cx="70" cy="70" r="48"/></clipPath>
              <clipPath id="uraRingFront"><rect x="50" y="-70" width="40" height="70"/></clipPath>
            </defs>
            {/* Rear rings — near-vertical */}
            <g transform="translate(70,70) rotate(10)">
              <ellipse cx="0" cy="0" rx="14" ry="62" fill="none" stroke="rgba(94,207,207,0.20)" strokeWidth="11"/>
              <ellipse cx="0" cy="0" rx="18" ry="74" fill="none" stroke="rgba(46,175,175,0.28)" strokeWidth="7"/>
              <ellipse cx="0" cy="0" rx="22" ry="84" fill="none" stroke="rgba(0,0,0,0.72)"    strokeWidth="2.2"/>
              <ellipse cx="0" cy="0" rx="25" ry="92" fill="none" stroke="rgba(94,207,207,0.25)" strokeWidth="4"/>
              <ellipse cx="0" cy="0" rx="28" ry="100" fill="none" stroke="rgba(46,175,175,0.15)" strokeWidth="2.5"/>
            </g>
            {/* Globe */}
            <circle cx="70" cy="70" r="48" fill="url(#uraG)"/>
            <g clipPath="url(#uraClip)">
              {/* Very subtle banding */}
              <g style={{ mixBlendMode:"screen", opacity:0.16 }}>
                <path d="M22,56 Q46,52 70,56 T118,54 L118,66 Q94,68 70,64 T22,66Z" fill="#b2f0f0"/>
                <path d="M22,70 Q46,66 70,70 T118,68 L118,80 Q94,82 70,78 T22,80Z" fill="#a0e8e8"/>
              </g>
              {/* Polar haze */}
              <ellipse cx="70" cy="24" rx="22" ry="14" fill="rgba(200,255,255,0.20)"/>
              <circle cx="70" cy="70" r="48" fill="url(#uraSpec)"/>
              <circle cx="70" cy="70" r="48" fill="url(#uraTerm)"/>
            </g>
            <circle cx="70" cy="70" r="47.5" fill="none" stroke="rgba(150,240,240,0.20)" strokeWidth="0.8"/>
            {/* Front rings */}
            <g transform="translate(70,70) rotate(10)">
              <g clipPath="url(#uraRingFront)">
                <ellipse cx="0" cy="0" rx="14" ry="62" fill="none" stroke="rgba(94,207,207,0.20)" strokeWidth="11"/>
                <ellipse cx="0" cy="0" rx="18" ry="74" fill="none" stroke="rgba(46,175,175,0.28)" strokeWidth="7"/>
                <ellipse cx="0" cy="0" rx="22" ry="84" fill="none" stroke="rgba(0,0,0,0.72)"    strokeWidth="2.2"/>
                <ellipse cx="0" cy="0" rx="25" ry="92" fill="none" stroke="rgba(94,207,207,0.25)" strokeWidth="4"/>
                <ellipse cx="0" cy="0" rx="28" ry="100" fill="none" stroke="rgba(46,175,175,0.15)" strokeWidth="2.5"/>
              </g>
            </g>
            {/* Miranda moon */}
            <circle cx="112" cy="50" r="3.5" fill="#c8e8e8" style={{ filter:"drop-shadow(0 0 4px #5ecfcf)" }}/>
            {/* Titania */}
            <circle cx="18"  cy="84" r="3"   fill="#d0ecec" style={{ filter:"drop-shadow(0 0 3px #5ecfcf)" }}/>
          </svg>
          <div style={{ textAlign:"center", marginTop:"3px", fontSize:"6px", fontWeight:700,
            letterSpacing:"0.15em", color:"rgba(94,207,207,0.85)", fontFamily:"monospace" }}>URANUS</div>
        </div>

        {/* ======================================================
            9. NEPTUNE — Great Dark Spot, Scooter, ring arcs
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flyNeptune 240s linear infinite 188s both", filter:"url(#shadow3d)" }}>
          <svg width="116" height="116" viewBox="0 0 116 116"
            style={{ filter:"drop-shadow(0 0 24px rgba(28,100,220,0.44))" }}>
            <defs><clipPath id="nepClip"><circle cx="58" cy="58" r="50"/></clipPath></defs>
            <circle cx="58" cy="58" r="52.5" fill="rgba(28,100,220,0.12)"/>
            <circle cx="58" cy="58" r="50"   fill="url(#nepG)"/>
            <g clipPath="url(#nepClip)">
              {/* Bands */}
              <g style={{ mixBlendMode:"screen", opacity:0.28 }}>
                <path d="M8,38 Q33,34 58,38 T108,36 L108,50 Q83,52 58,48 T8,50Z" fill="#a8d8ff"/>
                <path d="M8,56 Q33,52 58,56 T108,54 L108,68 Q83,70 58,66 T8,68Z" fill="#90c8ff"/>
                <path d="M8,74 Q33,70 58,74 T108,72 L108,84 Q83,86 58,82 T8,84Z" fill="#a8d8ff"/>
              </g>
              {/* Great Dark Spot */}
              <ellipse cx="76" cy="62" rx="16" ry="10" fill="rgba(4,18,72,0.68)"/>
              <ellipse cx="76" cy="62" rx="11" ry="7"  fill="rgba(7,28,112,0.58)"/>
              {/* Small Dark Spot 2 */}
              <ellipse cx="36" cy="80" rx="8" ry="5"   fill="rgba(5,20,80,0.50)"/>
              {/* Scooter bright cloud */}
              <ellipse cx="38" cy="68" rx="10" ry="6"  fill="rgba(160,210,255,0.42)"/>
              {/* Polar haze */}
              <ellipse cx="58" cy="10" rx="18" ry="9"  fill="rgba(180,220,255,0.28)"/>
              <circle cx="58" cy="58" r="50" fill="url(#nepSpec)"/>
              <circle cx="58" cy="58" r="50" fill="url(#nepTerm)"/>
            </g>
            {/* Ring arcs — Adams ring */}
            <g transform="translate(58,58) rotate(-14)">
              <ellipse cx="0" cy="0" rx="59" ry="14" fill="none"
                stroke="rgba(100,160,255,0.18)" strokeWidth="1.8" strokeDasharray="42 30"/>
            </g>
            <circle cx="58" cy="58" r="49.5" fill="none" stroke="rgba(100,180,255,0.20)" strokeWidth="0.8"/>
            <circle cx="58" cy="58" r="53"   fill="none" stroke="rgba(56,120,220,0.12)"  strokeWidth="3"/>
            {/* Triton */}
            <circle cx="100" cy="38" r="4"   fill="#cce8ff" style={{ filter:"drop-shadow(0 0 5px #4c9be8)" }}/>
            {/* Nereid */}
            <circle cx="10"  cy="78" r="2"   fill="#b8d8f8" style={{ filter:"drop-shadow(0 0 2px #4c9be8)" }}/>
          </svg>
          <div style={{ textAlign:"center", marginTop:"3px", fontSize:"6px", fontWeight:700,
            letterSpacing:"0.15em", color:"rgba(76,155,232,0.85)", fontFamily:"monospace" }}>NEPTUNE</div>
        </div>

        {/* ======================================================
            10. PLUTO — Tombaugh Regio heart, Charon
            ====================================================== */}
        <div style={{ position:"absolute", top:0, left:0, opacity:0,
          animation:"flyPluto 240s linear infinite 212s both", filter:"url(#shadow3d)" }}>
          <svg width="68" height="68" viewBox="0 0 68 68"
            style={{ filter:"drop-shadow(0 0 10px rgba(160,140,120,0.38))" }}>
            <defs><clipPath id="pluClip"><circle cx="34" cy="34" r="28"/></clipPath></defs>
            {/* Charon behind */}
            <circle cx="58" cy="22" r="12" fill="#9a8a78" style={{ filter:"drop-shadow(0 0 4px rgba(140,120,100,0.40))" }}/>
            <circle cx="58" cy="22" r="12" fill="none" stroke="rgba(180,160,140,0.30)" strokeWidth="0.7"/>
            <ellipse cx="55" cy="19" rx="4" ry="3.5" fill="rgba(255,255,255,0.14)"/>
            <ellipse cx="60" cy="26" rx="5" ry="3"   fill="rgba(0,0,0,0.20)"/>
            {/* Pluto globe */}
            <circle cx="34" cy="34" r="28" fill="url(#pluG)"/>
            <g clipPath="url(#pluClip)">
              {/* Tombaugh Regio — heart-shaped nitrogen ice plain */}
              <path d="M22,30 Q28,20 34,26 Q40,20 46,30 Q48,38 34,48 Q20,38 22,30Z"
                fill="rgba(242,238,228,0.80)"/>
              {/* Darker highland rim */}
              <path d="M14,40 Q20,34 28,38 Q22,46 14,46Z" fill="rgba(50,34,24,0.40)"/>
              <path d="M46,24 Q52,28 50,36 Q44,32 46,24Z" fill="rgba(60,44,30,0.35)"/>
              {/* Polar cap */}
              <ellipse cx="34" cy="6"  rx="12" ry="4"  fill="rgba(232,228,218,0.75)"/>
              {/* Methane ice patches */}
              <ellipse cx="20" cy="22" rx="5"  ry="3.5" fill="rgba(180,170,160,0.42)" transform="rotate(-20,20,22)"/>
              {/* Craters */}
              {[[44,22,2.8],[18,46,2.2],[46,48,2.4]].map(([cx,cy,r],i)=>(
                <circle key={i} cx={cx} cy={cy} r={r} fill="rgba(0,0,0,0.24)"/>
              ))}
              <circle cx="34" cy="34" r="28" fill="url(#pluSpec)"/>
              <ellipse cx="50" cy="40" rx="13" ry="28" fill="rgba(0,0,0,0.54)"/>
            </g>
            <circle cx="34" cy="34" r="27.5" fill="none" stroke="rgba(200,185,165,0.20)" strokeWidth="0.7"/>
          </svg>
          <div style={{ textAlign:"center", marginTop:"3px", fontSize:"6px", fontWeight:700,
            letterSpacing:"0.15em", color:"rgba(160,145,120,0.80)", fontFamily:"monospace" }}>PLUTO</div>
        </div>

      </div>
    </>
  );
}
