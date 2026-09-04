import React from "react";

export default function SpaceAnomalies() {
  return (
    <>
      <style>{`
        /* traverse: top-right corner → bottom-left, scale shrinks */
        @keyframes travA {
          0%   { transform:translate(0,0) scale(1);      opacity:0; }
          5%   { opacity:0.88; }
          90%  { opacity:0.82; }
          100% { transform:translate(-55vw,62vh) scale(0.3); opacity:0; }
        }
        @keyframes travB {
          0%   { transform:translate(0,0) scale(1);      opacity:0; }
          6%   { opacity:0.80; }
          88%  { opacity:0.75; }
          100% { transform:translate(-62vw,56vh) scale(0.25); opacity:0; }
        }
        @keyframes travC {
          0%   { transform:translate(0,0) scale(1);      opacity:0; }
          4%   { opacity:0.72; }
          92%  { opacity:0.68; }
          100% { transform:translate(-50vw,70vh) scale(0.22); opacity:0; }
        }
        @keyframes travS1 {
          0%   { transform:translate(0,0) scale(1) rotate(0deg);   opacity:0; }
          5%   { opacity:0.85; }
          90%  { opacity:0.78; }
          100% { transform:translate(-60vw,58vh) scale(0.28) rotate(-12deg); opacity:0; }
        }
        @keyframes travS2 {
          0%   { transform:translate(0,0) scale(1) rotate(0deg);   opacity:0; }
          6%   { opacity:0.78; }
          88%  { opacity:0.70; }
          100% { transform:translate(-48vw,72vh) scale(0.24) rotate(8deg); opacity:0; }
        }
        @keyframes travS3 {
          0%   { transform:translate(0,0) scale(1) rotate(0deg);   opacity:0; }
          5%   { opacity:0.70; }
          90%  { opacity:0.65; }
          100% { transform:translate(-56vw,54vh) scale(0.32) rotate(-6deg); opacity:0; }
        }
        @keyframes deb1 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 4%{opacity:.5} 92%{opacity:.38} 100%{transform:translate(-63vw,58vh)rotate(720deg) scale(.18);opacity:0} }
        @keyframes deb2 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 5%{opacity:.44} 90%{opacity:.32} 100%{transform:translate(-54vw,66vh)rotate(-540deg) scale(.14);opacity:0} }
        @keyframes deb3 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 6%{opacity:.40} 88%{opacity:.28} 100%{transform:translate(-58vw,52vh)rotate(480deg) scale(.20);opacity:0} }
        @keyframes deb4 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 4%{opacity:.46} 90%{opacity:.36} 100%{transform:translate(-50vw,74vh)rotate(-600deg) scale(.16);opacity:0} }
        @keyframes deb5 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 5%{opacity:.42} 92%{opacity:.30} 100%{transform:translate(-68vw,48vh)rotate(420deg) scale(.12);opacity:0} }
        @keyframes deb6 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 7%{opacity:.44} 88%{opacity:.34} 100%{transform:translate(-57vw,60vh)rotate(-500deg) scale(.17);opacity:0} }
        @keyframes deb7 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 3%{opacity:.48} 90%{opacity:.38} 100%{transform:translate(-62vw,56vh)rotate(660deg) scale(.13);opacity:0} }
        @keyframes ringA { from{transform:rotateX(72deg) rotateZ(0)} to{transform:rotateX(72deg) rotateZ(360deg)} }
        @keyframes ringB { from{transform:rotateX(68deg) rotateZ(0)} to{transform:rotateX(68deg) rotateZ(-360deg)} }
        @keyframes glint { 0%,100%{opacity:.5} 50%{opacity:.95} }
        @keyframes atmo  { 0%,100%{opacity:.30;transform:scale(1)} 50%{opacity:.52;transform:scale(1.07)} }
        @keyframes eng   { 0%,100%{opacity:.30;filter:blur(3px)} 50%{opacity:.80;filter:blur(5px)} }
      `}</style>

      {/* shared SVG gradient/filter defs */}
      <svg width="0" height="0" style={{position:"absolute"}}>
        <defs>
          <radialGradient id="marsG" cx="34%" cy="28%" r="66%">
            <stop offset="0%" stopColor="#f4a878"/>
            <stop offset="20%" stopColor="#d97848"/>
            <stop offset="45%" stopColor="#b25028"/>
            <stop offset="70%" stopColor="#7a3010"/>
            <stop offset="90%" stopColor="#3e1004"/>
            <stop offset="100%" stopColor="#0e0400"/>
          </radialGradient>
          <radialGradient id="marsSpec" cx="28%" cy="22%" r="32%">
            <stop offset="0%" stopColor="rgba(255,220,180,0.50)"/>
            <stop offset="60%" stopColor="rgba(255,190,140,0.08)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="marsTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="52%" stopColor="transparent"/>
            <stop offset="80%" stopColor="rgba(0,0,0,0.38)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.70)"/>
          </linearGradient>
          <radialGradient id="nepG" cx="36%" cy="30%" r="64%">
            <stop offset="0%" stopColor="#aaeeff"/>
            <stop offset="18%" stopColor="#60c0e8"/>
            <stop offset="38%" stopColor="#2878c0"/>
            <stop offset="60%" stopColor="#124888"/>
            <stop offset="82%" stopColor="#061830"/>
            <stop offset="100%" stopColor="#010810"/>
          </radialGradient>
          <radialGradient id="nepSpec" cx="30%" cy="24%" r="28%">
            <stop offset="0%" stopColor="rgba(200,240,255,0.55)"/>
            <stop offset="55%" stopColor="rgba(140,220,255,0.09)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="nepTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="54%" stopColor="transparent"/>
            <stop offset="82%" stopColor="rgba(0,0,20,0.42)"/>
            <stop offset="100%" stopColor="rgba(0,0,10,0.72)"/>
          </linearGradient>
          <radialGradient id="jupG" cx="38%" cy="33%" r="60%">
            <stop offset="0%" stopColor="#f8e0a0"/>
            <stop offset="22%" stopColor="#dea855"/>
            <stop offset="48%" stopColor="#b87828"/>
            <stop offset="72%" stopColor="#884818"/>
            <stop offset="92%" stopColor="#3a2005"/>
            <stop offset="100%" stopColor="#100800"/>
          </radialGradient>
          <radialGradient id="jupSpec" cx="34%" cy="27%" r="30%">
            <stop offset="0%" stopColor="rgba(255,240,200,0.42)"/>
            <stop offset="55%" stopColor="rgba(255,220,160,0.07)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="jupTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="50%" stopColor="transparent"/>
            <stop offset="78%" stopColor="rgba(0,0,0,0.32)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.65)"/>
          </linearGradient>
          <clipPath id="jClip"><circle cx="52" cy="52" r="46"/></clipPath>
          <filter id="sph" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="bl"/>
            <feOffset dx="5" dy="5" result="ob"/>
            <feFlood floodColor="rgba(0,0,0,0.55)" result="c"/>
            <feComposite in="c" in2="ob" operator="in" result="sh"/>
            <feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
      </svg>
      {/* ROOT OVERLAY */}
      <div aria-hidden="true" style={{position:"fixed",inset:0,zIndex:2,pointerEvents:"none",overflow:"hidden"}}>
        {/* PLANET MARS — starts top-right, drifts bottom-left, shrinks */}
        <div style={{position:"absolute",top:"-2%",right:"-3%",animation:"travA 44s linear infinite"}}>
          <div style={{position:"absolute",top:"-22px",left:"-22px",width:"164px",height:"164px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,100,40,0.20) 28%,rgba(255,70,20,0.07) 58%,transparent 78%)",filter:"blur(14px)",animation:"atmo 6s ease-in-out infinite"}}/>
          <svg width="120" height="120" viewBox="0 0 120 120" filter="url(#sph)">
            <circle cx="60" cy="60" r="58" fill="rgba(255,100,40,0.07)"/>
            <circle cx="60" cy="60" r="52" fill="url(#marsG)"/>
            <ellipse cx="60" cy="40" rx="40" ry="6" fill="rgba(210,110,55,0.18)" transform="rotate(-4 60 40)"/>
            <ellipse cx="60" cy="54" rx="46" ry="4.5" fill="rgba(80,22,4,0.28)" transform="rotate(3 60 54)"/>
            <ellipse cx="60" cy="68" rx="38" ry="5" fill="rgba(220,125,62,0.16)" transform="rotate(-2 60 68)"/>
            <ellipse cx="60" cy="82" rx="34" ry="4" fill="rgba(90,28,5,0.22)" transform="rotate(2 60 82)"/>
            <path d="M30,52 Q44,47 60,52 Q76,57 90,52" fill="none" stroke="rgba(50,12,3,0.45)" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="40" cy="38" r="9" fill="rgba(180,75,28,0.32)"/>
            <circle cx="40" cy="38" r="5" fill="rgba(210,110,55,0.26)"/>
            <circle cx="40" cy="38" r="2" fill="rgba(110,45,12,0.42)"/>
            <circle cx="74" cy="64" r="6" fill="rgba(60,16,4,0.42)"/>
            <circle cx="74" cy="64" r="3.5" fill="rgba(130,55,22,0.30)"/>
            <circle cx="50" cy="76" r="4" fill="rgba(60,16,4,0.36)"/>
            <circle cx="78" cy="44" r="5" fill="rgba(55,14,3,0.32)"/>
            <circle cx="78" cy="44" r="2.5" fill="rgba(140,58,24,0.26)"/>
            <ellipse cx="60" cy="11" rx="20" ry="8" fill="rgba(255,240,228,0.60)"/>
            <ellipse cx="60" cy="11" rx="13" ry="5" fill="rgba(255,248,242,0.42)"/>
            <ellipse cx="60" cy="106" rx="16" ry="6" fill="rgba(245,230,218,0.34)"/>
            <ellipse cx="66" cy="58" rx="14" ry="9" fill="rgba(220,165,105,0.14)" transform="rotate(18 66 58)"/>
            <circle cx="60" cy="60" r="52" fill="url(#marsSpec)"/>
            <circle cx="60" cy="60" r="52" fill="url(#marsTerm)"/>
            <circle cx="60" cy="60" r="51" fill="none" stroke="rgba(255,170,110,0.10)" strokeWidth="1.5"/>
          </svg>
          <div style={{position:"absolute",top:"24px",left:"-20px",width:"160px",height:"44px",borderRadius:"50%",border:"2.5px solid rgba(200,100,50,0.28)",boxShadow:"0 0 0 5px rgba(200,100,50,0.09),0 0 0 11px rgba(200,100,50,0.04),inset 0 0 8px rgba(200,100,50,0.12)",animation:"ringA 20s linear infinite"}}/>
        </div>
        {/* PLANET NEPTUNE */}
        <div style={{position:"absolute",top:"4%",right:"14%",animation:"travB 56s linear infinite 14s"}}>
          <div style={{position:"absolute",top:"-16px",left:"-16px",width:"124px",height:"124px",borderRadius:"50%",background:"radial-gradient(circle,rgba(40,165,255,0.18) 28%,transparent 70%)",filter:"blur(11px)",animation:"atmo 8s ease-in-out infinite 2s"}}/>
          <svg width="92" height="92" viewBox="0 0 92 92" filter="url(#sph)">
            <circle cx="46" cy="46" r="45" fill="rgba(40,140,255,0.08)"/>
            <circle cx="46" cy="46" r="40" fill="url(#nepG)"/>
            <ellipse cx="46" cy="30" rx="32" ry="5" fill="rgba(140,225,255,0.17)" transform="rotate(-3 46 30)"/>
            <ellipse cx="46" cy="38" rx="36" ry="4" fill="rgba(8,35,95,0.32)" transform="rotate(2 46 38)"/>
            <ellipse cx="46" cy="46" rx="38" ry="3.5" fill="rgba(70,185,245,0.14)"/>
            <ellipse cx="46" cy="54" rx="34" ry="4" fill="rgba(12,42,110,0.28)" transform="rotate(-2 46 54)"/>
            <ellipse cx="46" cy="62" rx="30" ry="3.5" fill="rgba(90,200,250,0.13)" transform="rotate(3 46 62)"/>
            <ellipse cx="33" cy="46" rx="9" ry="6" fill="rgba(4,12,48,0.52)" transform="rotate(-12 33 46)"/>
            <ellipse cx="33" cy="46" rx="5.5" ry="3.5" fill="rgba(8,25,75,0.38)" transform="rotate(-12 33 46)"/>
            <path d="M24,32 Q36,28 52,32 Q62,36 70,32" fill="none" stroke="rgba(175,232,255,0.13)" strokeWidth="1.5"/>
            <path d="M18,58 Q30,54 46,57 Q58,60 65,56" fill="none" stroke="rgba(110,200,248,0.11)" strokeWidth="1.2"/>
            <circle cx="46" cy="46" r="40" fill="url(#nepSpec)"/>
            <circle cx="46" cy="46" r="40" fill="url(#nepTerm)"/>
            <circle cx="46" cy="46" r="39" fill="none" stroke="rgba(70,175,255,0.09)" strokeWidth="1.2"/>
          </svg>
          <div style={{position:"absolute",top:"18px",left:"-17px",width:"126px",height:"32px",borderRadius:"50%",border:"2px solid rgba(70,178,240,0.24)",boxShadow:"0 0 0 4px rgba(70,178,240,0.07),inset 0 0 6px rgba(70,178,240,0.09)",animation:"ringB 26s linear infinite"}}/>
        </div>
        {/* PLANET JUPITER */}
        <div style={{position:"absolute",top:"-4%",right:"28%",animation:"travC 66s linear infinite 26s"}}>
          <div style={{position:"absolute",top:"-15px",left:"-15px",width:"110px",height:"110px",borderRadius:"50%",background:"radial-gradient(circle,rgba(220,165,65,0.16) 28%,transparent 72%)",filter:"blur(10px)",animation:"atmo 5.5s ease-in-out infinite 1s"}}/>
          <svg width="104" height="104" viewBox="0 0 104 104" filter="url(#sph)">
            <circle cx="52" cy="52" r="50" fill="url(#jupG)"/>
            <g clipPath="url(#jClip)">
              <rect x="6" y="15" width="92" height="5" fill="rgba(248,210,128,0.22)"/>
              <rect x="6" y="21" width="92" height="7" fill="rgba(162,82,22,0.38)"/>
              <rect x="6" y="29" width="92" height="5" fill="rgba(245,198,108,0.19)"/>
              <rect x="6" y="35" width="92" height="8" fill="rgba(178,98,28,0.42)"/>
              <rect x="6" y="44" width="92" height="4" fill="rgba(252,218,135,0.16)"/>
              <rect x="6" y="49" width="92" height="9" fill="rgba(138,58,14,0.48)"/>
              <rect x="6" y="59" width="92" height="5" fill="rgba(225,175,82,0.21)"/>
              <rect x="6" y="65" width="92" height="8" fill="rgba(158,78,22,0.40)"/>
              <rect x="6" y="74" width="92" height="5" fill="rgba(242,205,115,0.18)"/>
              <rect x="6" y="80" width="92" height="7" fill="rgba(148,68,18,0.34)"/>
              <rect x="6" y="88" width="92" height="5" fill="rgba(225,182,98,0.16)"/>
              <ellipse cx="36" cy="53" rx="13" ry="8" fill="rgba(195,48,14,0.58)"/>
              <ellipse cx="36" cy="53" rx="9"  ry="5.5" fill="rgba(228,78,28,0.42)"/>
              <ellipse cx="36" cy="53" rx="5"  ry="3" fill="rgba(252,125,62,0.32)"/>
              <ellipse cx="35" cy="50" rx="3"  ry="1.5" fill="rgba(255,185,125,0.28)"/>
              <path d="M18,35 Q32,31 46,35 Q58,39 70,35 Q82,31 92,35" fill="none" stroke="rgba(228,168,82,0.18)" strokeWidth="1.2"/>
              <path d="M14,50 Q28,46 42,49 Q56,52 70,49 Q82,46 94,49" fill="none" stroke="rgba(178,100,30,0.16)" strokeWidth="1"/>
              <path d="M16,66 Q30,62 48,66 Q62,70 75,66 Q86,62 96,65" fill="none" stroke="rgba(205,145,62,0.14)" strokeWidth="1"/>
            </g>
            <circle cx="52" cy="52" r="46" fill="url(#jupSpec)"/>
            <circle cx="52" cy="52" r="46" fill="url(#jupTerm)"/>
            <circle cx="52" cy="52" r="45" fill="none" stroke="rgba(225,162,80,0.08)" strokeWidth="1.2"/>
          </svg>
        </div>
        {/* CHANDRAYAAN-3 */}
        <div style={{position:"absolute",top:"1%",right:"4%",animation:"travS1 38s linear infinite 8s"}}>
          <div style={{position:"absolute",bottom:"-10px",left:"50%",transform:"translateX(-50%)",width:"20px",height:"20px",background:"radial-gradient(circle,rgba(80,160,255,0.65) 0%,rgba(60,120,220,0.18) 55%,transparent 80%)",filter:"blur(4px)",animation:"eng 2.5s ease-in-out infinite"}}/>
          <svg width="92" height="64" viewBox="0 0 92 64">
            <rect x="0" y="22" width="32" height="16" rx="2" fill="rgba(22,68,148,0.82)" stroke="rgba(65,148,255,0.55)" strokeWidth="0.8"/>
            <line x1="10" y1="22" x2="10" y2="38" stroke="rgba(65,148,255,0.34)" strokeWidth="0.5"/>
            <line x1="20" y1="22" x2="20" y2="38" stroke="rgba(65,148,255,0.34)" strokeWidth="0.5"/>
            <line x1="0"  y1="28" x2="32" y2="28" stroke="rgba(65,148,255,0.34)" strokeWidth="0.5"/>
            <line x1="0"  y1="34" x2="32" y2="34" stroke="rgba(65,148,255,0.34)" strokeWidth="0.5"/>
            <rect x="0" y="22" width="32" height="16" rx="2" fill="rgba(115,195,255,0.06)" style={{animation:"glint 4s ease-in-out infinite"}}/>
            <rect x="60" y="22" width="32" height="16" rx="2" fill="rgba(22,68,148,0.82)" stroke="rgba(65,148,255,0.55)" strokeWidth="0.8"/>
            <line x1="70" y1="22" x2="70" y2="38" stroke="rgba(65,148,255,0.34)" strokeWidth="0.5"/>
            <line x1="80" y1="22" x2="80" y2="38" stroke="rgba(65,148,255,0.34)" strokeWidth="0.5"/>
            <line x1="60" y1="28" x2="92" y2="28" stroke="rgba(65,148,255,0.34)" strokeWidth="0.5"/>
            <line x1="60" y1="34" x2="92" y2="34" stroke="rgba(65,148,255,0.34)" strokeWidth="0.5"/>
            <rect x="60" y="22" width="32" height="16" rx="2" fill="rgba(115,195,255,0.06)" style={{animation:"glint 4s ease-in-out infinite 1.2s"}}/>
            <line x1="32" y1="30" x2="37" y2="30" stroke="rgba(155,178,218,0.65)" strokeWidth="1.5"/>
            <line x1="55" y1="30" x2="60" y2="30" stroke="rgba(155,178,218,0.65)" strokeWidth="1.5"/>
            <rect x="35" y="15" width="22" height="28" rx="3" fill="rgba(32,42,62,0.94)" stroke="rgba(85,145,255,0.52)" strokeWidth="1"/>
            <rect x="37" y="17" width="18" height="24" rx="2" fill="rgba(195,168,68,0.14)"/>
            <line x1="37" y1="23" x2="55" y2="23" stroke="rgba(195,168,68,0.22)" strokeWidth="0.6"/>
            <line x1="37" y1="29" x2="55" y2="29" stroke="rgba(195,168,68,0.22)" strokeWidth="0.6"/>
            <line x1="37" y1="35" x2="55" y2="35" stroke="rgba(195,168,68,0.22)" strokeWidth="0.6"/>
            <line x1="46" y1="17" x2="46" y2="41" stroke="rgba(195,168,68,0.14)" strokeWidth="0.5"/>
            <ellipse cx="46" cy="12" rx="10" ry="3.5" fill="rgba(168,192,225,0.38)" stroke="rgba(128,168,255,0.50)" strokeWidth="0.8"/>
            <line x1="46" y1="12" x2="46" y2="17" stroke="rgba(168,192,225,0.55)" strokeWidth="1"/>
            <circle cx="46" cy="12" r="1.2" fill="rgba(205,225,255,0.62)"/>
            <rect x="38" y="42" width="5" height="3.5" rx="1" fill="rgba(98,118,158,0.72)"/>
            <rect x="49" y="42" width="5" height="3.5" rx="1" fill="rgba(98,118,158,0.72)"/>
            <text x="46" y="60" textAnchor="middle" fontSize="4.5" fill="rgba(128,168,255,0.72)" fontFamily="monospace" letterSpacing="0.6">CHANDRAYAAN-3</text>
          </svg>
        </div>
        {/* VIKRAM LANDER */}
        <div style={{position:"absolute",top:"0%",right:"20%",animation:"travS2 50s linear infinite 20s"}}>
          <div style={{position:"absolute",bottom:"4px",left:"50%",transform:"translateX(-50%)",width:"14px",height:"14px",background:"radial-gradient(circle,rgba(100,182,255,0.52) 0%,transparent 72%)",filter:"blur(3px)",animation:"eng 3.2s ease-in-out infinite 0.5s"}}/>
          <svg width="68" height="74" viewBox="0 0 68 74">
            <polygon points="22,10 46,10 56,46 12,46" fill="rgba(40,50,74,0.94)" stroke="rgba(108,168,255,0.48)" strokeWidth="1"/>
            <rect x="25" y="14" width="18" height="26" rx="2" fill="rgba(198,158,58,0.18)" stroke="rgba(198,158,58,0.28)" strokeWidth="0.5"/>
            <line x1="25" y1="20" x2="43" y2="20" stroke="rgba(198,158,58,0.22)" strokeWidth="0.5"/>
            <line x1="25" y1="27" x2="43" y2="27" stroke="rgba(198,158,58,0.22)" strokeWidth="0.5"/>
            <line x1="25" y1="34" x2="43" y2="34" stroke="rgba(198,158,58,0.22)" strokeWidth="0.5"/>
            <line x1="34" y1="14" x2="34" y2="40" stroke="rgba(198,158,58,0.14)" strokeWidth="0.5"/>
            <circle cx="34" cy="24" r="4.5" fill="rgba(14,22,44,0.94)" stroke="rgba(118,188,255,0.58)" strokeWidth="0.8"/>
            <circle cx="34" cy="24" r="2.2" fill="rgba(58,138,255,0.48)"/>
            <circle cx="33" cy="22" r="0.9" fill="rgba(178,222,255,0.62)"/>
            <rect x="12" y="32" width="4.5" height="6" rx="1" fill="rgba(85,98,128,0.62)"/>
            <rect x="51" y="32" width="4.5" height="6" rx="1" fill="rgba(85,98,128,0.62)"/>
            <line x1="17" y1="44" x2="4"  y2="60" stroke="rgba(128,148,194,0.72)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4"  y1="60" x2="0"  y2="60" stroke="rgba(128,148,194,0.72)" strokeWidth="2" strokeLinecap="round"/>
            <ellipse cx="2" cy="61" rx="3.5" ry="1.8" fill="rgba(128,148,194,0.38)"/>
            <line x1="51" y1="44" x2="64" y2="60" stroke="rgba(128,148,194,0.72)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="64" y1="60" x2="68" y2="60" stroke="rgba(128,148,194,0.72)" strokeWidth="2" strokeLinecap="round"/>
            <ellipse cx="66" cy="61" rx="3.5" ry="1.8" fill="rgba(128,148,194,0.38)"/>
            <line x1="34" y1="46" x2="34" y2="62" stroke="rgba(128,148,194,0.58)" strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx="34" cy="63" rx="4.5" ry="2" fill="rgba(128,148,194,0.38)"/>
            <rect x="28" y="46" width="12" height="5.5" rx="1.5" fill="rgba(68,82,118,0.78)" stroke="rgba(108,148,220,0.42)" strokeWidth="0.6"/>
            <line x1="34" y1="10" x2="34" y2="3" stroke="rgba(168,192,225,0.68)" strokeWidth="1"/>
            <circle cx="34" cy="3" r="1.5" fill="rgba(168,192,225,0.58)"/>
            <text x="34" y="72" textAnchor="middle" fontSize="4.5" fill="rgba(128,168,255,0.65)" fontFamily="monospace" letterSpacing="0.6">VIKRAM</text>
          </svg>
        </div>
        {/* COMMS SATELLITE */}
        <div style={{position:"absolute",top:"6%",right:"36%",animation:"travS3 44s linear infinite 5s"}}>
          <svg width="82" height="48" viewBox="0 0 82 48">
            <rect x="0" y="15" width="28" height="14" rx="2" fill="rgba(18,52,132,0.80)" stroke="rgba(52,132,255,0.52)" strokeWidth="0.8"/>
            <line x1="9"  y1="15" x2="9"  y2="29" stroke="rgba(52,132,255,0.30)" strokeWidth="0.5"/>
            <line x1="18" y1="15" x2="18" y2="29" stroke="rgba(52,132,255,0.30)" strokeWidth="0.5"/>
            <line x1="0"  y1="21" x2="28" y2="21" stroke="rgba(52,132,255,0.30)" strokeWidth="0.5"/>
            <rect x="0" y="15" width="28" height="14" rx="2" fill="rgba(98,178,255,0.05)" style={{animation:"glint 5s ease-in-out infinite 0.5s"}}/>
            <rect x="54" y="15" width="28" height="14" rx="2" fill="rgba(18,52,132,0.80)" stroke="rgba(52,132,255,0.52)" strokeWidth="0.8"/>
            <line x1="63" y1="15" x2="63" y2="29" stroke="rgba(52,132,255,0.30)" strokeWidth="0.5"/>
            <line x1="72" y1="15" x2="72" y2="29" stroke="rgba(52,132,255,0.30)" strokeWidth="0.5"/>
            <line x1="54" y1="21" x2="82" y2="21" stroke="rgba(52,132,255,0.30)" strokeWidth="0.5"/>
            <rect x="54" y="15" width="28" height="14" rx="2" fill="rgba(98,178,255,0.05)" style={{animation:"glint 5s ease-in-out infinite 2s"}}/>
            <line x1="28" y1="22" x2="32" y2="22" stroke="rgba(148,172,215,0.58)" strokeWidth="1"/>
            <line x1="50" y1="22" x2="54" y2="22" stroke="rgba(148,172,215,0.58)" strokeWidth="1"/>
            <rect x="30" y="11" width="22" height="22" rx="2.5" fill="rgba(32,44,68,0.94)" stroke="rgba(72,128,255,0.48)" strokeWidth="1"/>
            <rect x="32" y="13" width="18" height="18" rx="1.5" fill="rgba(188,158,58,0.12)"/>
            <ellipse cx="41" cy="9" rx="9" ry="3.2" fill="rgba(152,185,228,0.38)" stroke="rgba(128,168,255,0.48)" strokeWidth="0.8"/>
            <line x1="41" y1="9" x2="41" y2="13" stroke="rgba(152,185,228,0.55)" strokeWidth="0.8"/>
            <circle cx="41" cy="9" r="1.1" fill="rgba(202,222,255,0.58)"/>
          </svg>
        </div>
        {/* DEBRIS */}
        <div style={{position:"absolute",top:"2%",right:"9%",animation:"deb1 30s linear infinite 2s"}}>
          <svg width="13" height="13" viewBox="0 0 13 13"><polygon points="6,0 13,4 11,13 2,11 0,5" fill="rgba(168,178,210,0.76)" stroke="rgba(200,210,232,0.28)" strokeWidth="0.5"/></svg>
        </div>
        <div style={{position:"absolute",top:"5%",right:"18%",animation:"deb2 37s linear infinite 7s"}}>
          <svg width="9" height="9" viewBox="0 0 9 9"><polygon points="4.5,0 9,7 0,9" fill="rgba(152,162,198,0.70)" stroke="rgba(188,198,222,0.24)" strokeWidth="0.5"/></svg>
        </div>
        <div style={{position:"absolute",top:"1%",right:"26%",animation:"deb3 44s linear infinite 15s"}}>
          <svg width="17" height="11" viewBox="0 0 17 11"><polygon points="0,11 8,0 17,3 13,11" fill="rgba(138,148,184,0.66)" stroke="rgba(178,188,212,0.20)" strokeWidth="0.5"/></svg>
        </div>
        <div style={{position:"absolute",top:"3%",right:"33%",animation:"deb4 34s linear infinite 5s"}}>
          <svg width="11" height="11" viewBox="0 0 11 11"><rect x="0" y="2" width="11" height="6" rx="1.2" fill="rgba(188,198,228,0.66)" transform="rotate(24 5.5 5.5)"/></svg>
        </div>
        <div style={{position:"absolute",top:"7%",right:"5%",animation:"deb5 40s linear infinite 22s"}}>
          <svg width="14" height="9" viewBox="0 0 14 9"><polygon points="0,9 6,0 14,2 10,9" fill="rgba(162,172,205,0.62)"/></svg>
        </div>
        <div style={{position:"absolute",top:"1%",right:"42%",animation:"deb6 52s linear infinite 11s"}}>
          <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 10,10 0,8" fill="rgba(148,158,194,0.60)"/></svg>
        </div>
        <div style={{position:"absolute",top:"4%",right:"1%",animation:"deb7 32s linear infinite 17s"}}>
          <svg width="15" height="8" viewBox="0 0 15 8"><polygon points="0,8 7,0 15,1 12,8" fill="rgba(172,178,210,0.62)" stroke="rgba(200,210,232,0.20)" strokeWidth="0.4"/></svg>
        </div>
      </div>
    </>
  );
}
