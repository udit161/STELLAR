import React from "react";

export default function SpaceAnomalies() {
  return (
    <>
      <style>{`
        /* traverse: India logo (top-left) → ISRO logo (bottom-right), scale shrinks */
        @keyframes travA {
          0%   { transform:translate(0,0) scale(1);      opacity:0; }
          5%   { opacity:0.88; }
          90%  { opacity:0.82; }
          100% { transform:translate(75vw,80vh) scale(0.3); opacity:0; }
        }
        @keyframes travB {
          0%   { transform:translate(0,0) scale(1);      opacity:0; }
          6%   { opacity:0.80; }
          88%  { opacity:0.75; }
          100% { transform:translate(80vw,74vh) scale(0.25); opacity:0; }
        }
        @keyframes travC {
          0%   { transform:translate(0,0) scale(1);      opacity:0; }
          4%   { opacity:0.72; }
          92%  { opacity:0.68; }
          100% { transform:translate(70vw,85vh) scale(0.22); opacity:0; }
        }
        @keyframes travS1 {
          0%   { transform:translate(0,0) scale(1) rotate(0deg);   opacity:0; }
          5%   { opacity:0.85; }
          90%  { opacity:0.78; }
          100% { transform:translate(78vw,76vh) scale(0.28) rotate(12deg); opacity:0; }
        }
        @keyframes travS2 {
          0%   { transform:translate(0,0) scale(1) rotate(0deg);   opacity:0; }
          6%   { opacity:0.78; }
          88%  { opacity:0.70; }
          100% { transform:translate(66vw,82vh) scale(0.24) rotate(-8deg); opacity:0; }
        }
        @keyframes travS3 {
          0%   { transform:translate(0,0) scale(1) rotate(0deg);   opacity:0; }
          5%   { opacity:0.70; }
          90%  { opacity:0.65; }
          100% { transform:translate(74vw,72vh) scale(0.32) rotate(6deg); opacity:0; }
        }
        @keyframes deb1 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 4%{opacity:.5} 92%{opacity:.38} 100%{transform:translate(82vw,78vh)rotate(720deg) scale(.18);opacity:0} }
        @keyframes deb2 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 5%{opacity:.44} 90%{opacity:.32} 100%{transform:translate(72vw,84vh)rotate(-540deg) scale(.14);opacity:0} }
        @keyframes deb3 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 6%{opacity:.40} 88%{opacity:.28} 100%{transform:translate(76vw,72vh)rotate(480deg) scale(.20);opacity:0} }
        @keyframes deb4 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 4%{opacity:.46} 90%{opacity:.36} 100%{transform:translate(68vw,88vh)rotate(-600deg) scale(.16);opacity:0} }
        @keyframes deb5 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 5%{opacity:.42} 92%{opacity:.30} 100%{transform:translate(86vw,70vh)rotate(420deg) scale(.12);opacity:0} }
        @keyframes deb6 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 7%{opacity:.44} 88%{opacity:.34} 100%{transform:translate(74vw,82vh)rotate(-500deg) scale(.17);opacity:0} }
        @keyframes deb7 { 0%{transform:translate(0,0)rotate(0deg) scale(1);opacity:0} 3%{opacity:.48} 90%{opacity:.38} 100%{transform:translate(78vw,76vh)rotate(660deg) scale(.13);opacity:0} }
        @keyframes ringA { from{transform:rotateX(72deg) rotateZ(0)} to{transform:rotateX(72deg) rotateZ(360deg)} }
        @keyframes ringB { from{transform:rotateX(68deg) rotateZ(0)} to{transform:rotateX(68deg) rotateZ(-360deg)} }
        @keyframes glint { 0%,100%{opacity:.5} 50%{opacity:.95} }
        @keyframes atmo  { 0%,100%{opacity:.30;transform:scale(1)} 50%{opacity:.52;transform:scale(1.07)} }
        @keyframes eng   { 0%,100%{opacity:.30;filter:blur(3px)} 50%{opacity:.80;filter:blur(5px)} }
      `}</style>

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
            <stop offset="18%" stopColor="#e8b870"/>
            <stop offset="42%" stopColor="#c08038"/>
            <stop offset="68%" stopColor="#804418"/>
            <stop offset="88%" stopColor="#401a08"/>
            <stop offset="100%" stopColor="#100502"/>
          </radialGradient>
          <radialGradient id="jupSpec" cx="32%" cy="26%" r="30%">
            <stop offset="0%" stopColor="rgba(255,240,200,0.50)"/>
            <stop offset="60%" stopColor="rgba(240,200,140,0.08)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="jupTerm" x1="90%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="50%" stopColor="transparent"/>
            <stop offset="78%" stopColor="rgba(0,0,0,0.40)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.74)"/>
          </linearGradient>
          <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-6" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.85"/>
          </filter>
        </defs>
      </svg>

      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {/* MARS */}
        <div style={{position:"absolute",top:"2%",left:"3%",animation:"travA 42s linear infinite 0s",filter:"url(#shadow3d)"}}>
          <div style={{position:"absolute",inset:"-16px",borderRadius:"50%",background:"radial-gradient(circle,rgba(235,110,60,0.32) 0%,rgba(180,60,20,0.08) 55%,transparent 75%)",animation:"atmo 5s ease-in-out infinite"}}/>
          <svg width="104" height="104" viewBox="0 0 104 104" style={{filter:"drop-shadow(0 0 16px rgba(220,90,40,0.38))"}}>
            <circle cx="52" cy="52" r="48" fill="url(#marsG)"/>
            <g style={{mixBlendMode:"overlay",opacity:0.65}}>
              <ellipse cx="50" cy="18" rx="14" ry="4" fill="#ffffff" opacity="0.88"/>
              <ellipse cx="50" cy="18" rx="20" ry="7" fill="#ffffff" opacity="0.32"/>
              <ellipse cx="56" cy="84" rx="12" ry="3.5" fill="#ffffff" opacity="0.82"/>
              <ellipse cx="56" cy="84" rx="17" ry="6"   fill="#ffffff" opacity="0.28"/>
              <path d="M22,50 Q36,44 54,48 Q70,52 84,47" fill="none" stroke="rgba(40,10,4,0.72)" strokeWidth="4.5" strokeLinecap="round"/>
              <circle cx="34" cy="38" r="8" fill="rgba(50,15,5,0.65)"/>
              <circle cx="34" cy="38" r="3" fill="rgba(30,8,2,0.85)"/>
              <ellipse cx="68" cy="62" rx="14" ry="8" fill="rgba(220,120,60,0.35)"/>
              <path d="M16,36 Q32,32 50,34 T86,32" fill="none" stroke="rgba(120,40,15,0.40)" strokeWidth="2.5"/>
              <path d="M18,66 Q40,62 62,65 T88,62" fill="none" stroke="rgba(100,30,10,0.40)" strokeWidth="2"/>
            </g>
            <circle cx="52" cy="52" r="48" fill="url(#marsSpec)"/>
            <circle cx="52" cy="52" r="48" fill="url(#marsTerm)"/>
            <circle cx="52" cy="52" r="47" fill="none" stroke="rgba(255,160,100,0.14)" strokeWidth="1.2"/>
          </svg>
        </div>
        {/* NEPTUNE */}
        <div style={{position:"absolute",top:"1%",left:"10%",animation:"travB 54s linear infinite 14s",filter:"url(#shadow3d)"}}>
          <div style={{position:"absolute",inset:"-22px",borderRadius:"50%",background:"radial-gradient(circle,rgba(60,170,255,0.38) 0%,rgba(20,80,180,0.12) 55%,transparent 75%)",animation:"atmo 6s ease-in-out infinite 1s"}}/>
          <div style={{position:"absolute",top:"50%",left:"50%",width:"170px",height:"42px",marginTop:"-21px",marginLeft:"-85px",borderRadius:"50%",border:"2.5px solid rgba(120,210,255,0.45)",boxShadow:"0 0 12px rgba(80,180,255,0.30)",animation:"ringA 22s linear infinite",transformStyle:"preserve-3d",pointerEvents:"none"}}/>
          <svg width="112" height="112" viewBox="0 0 112 112" style={{filter:"drop-shadow(0 0 20px rgba(40,140,240,0.45))"}}>
            <circle cx="56" cy="56" r="50" fill="url(#nepG)"/>
            <g style={{mixBlendMode:"soft-light",opacity:0.75}}>
              <ellipse cx="64" cy="62" rx="15" ry="9" fill="rgba(2,15,45,0.85)"/>
              <ellipse cx="64" cy="62" rx="19" ry="12" fill="none" stroke="rgba(80,180,255,0.40)" strokeWidth="1.5"/>
              <path d="M12,38 Q35,32 60,35 Q82,38 98,34" fill="none" stroke="rgba(220,245,255,0.65)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18,74 Q42,70 66,73 Q85,76 96,72" fill="none" stroke="rgba(200,240,255,0.55)" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M10,50 Q30,46 54,49 T100,47" fill="none" stroke="rgba(10,50,110,0.50)" strokeWidth="3"/>
            </g>
            <circle cx="56" cy="56" r="50" fill="url(#nepSpec)"/>
            <circle cx="56" cy="56" r="50" fill="url(#nepTerm)"/>
            <circle cx="56" cy="56" r="49" fill="none" stroke="rgba(140,220,255,0.18)" strokeWidth="1.2"/>
          </svg>
        </div>
        {/* JUPITER */}
        <div style={{position:"absolute",top:"0%",left:"18%",animation:"travC 65s linear infinite 28s",filter:"url(#shadow3d)"}}>
          <div style={{position:"absolute",inset:"-18px",borderRadius:"50%",background:"radial-gradient(circle,rgba(230,170,90,0.28) 0%,rgba(160,100,40,0.08) 55%,transparent 75%)",animation:"atmo 7s ease-in-out infinite 2s"}}/>
          <div style={{position:"absolute",top:"50%",left:"50%",width:"190px",height:"34px",marginTop:"-17px",marginLeft:"-95px",borderRadius:"50%",border:"1.8px solid rgba(220,170,100,0.30)",animation:"ringB 30s linear infinite",pointerEvents:"none"}}/>
          <svg width="104" height="104" viewBox="0 0 104 104" style={{filter:"drop-shadow(0 0 18px rgba(210,140,60,0.35))"}}>
            <circle cx="52" cy="52" r="46" fill="url(#jupG)"/>
            <g style={{mixBlendMode:"multiply",opacity:0.55}}>
              <rect x="6" y="16" width="92" height="6" fill="#703010"/>
              <rect x="6" y="26" width="92" height="9" fill="#904818"/>
              <rect x="6" y="39" width="92" height="7" fill="#602408"/>
              <rect x="6" y="50" width="92" height="11" fill="#884014"/>
              <rect x="6" y="65" width="92" height="8" fill="#582006"/>
              <rect x="6" y="77" width="92" height="6" fill="#78340c"/>
            </g>
            <g style={{mixBlendMode:"screen",opacity:0.45}}>
              <ellipse cx="65" cy="55" rx="14" ry="9" fill="#ff6030"/>
              <ellipse cx="65" cy="55" rx="11" ry="7" fill="#ff9050"/>
              <ellipse cx="65" cy="55" rx="7"  ry="4" fill="#ffd090"/>
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
        <div style={{position:"absolute",top:"1%",left:"5%",animation:"travS1 38s linear infinite 8s"}}>
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
        <div style={{position:"absolute",top:"0%",left:"14%",animation:"travS2 50s linear infinite 20s"}}>
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
        <div style={{position:"absolute",top:"4%",left:"22%",animation:"travS3 44s linear infinite 5s"}}>
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
        <div style={{position:"absolute",top:"2%",left:"2%",animation:"deb1 30s linear infinite 2s"}}>
          <svg width="13" height="13" viewBox="0 0 13 13"><polygon points="6,0 13,4 11,13 2,11 0,5" fill="rgba(168,178,210,0.76)" stroke="rgba(200,210,232,0.28)" strokeWidth="0.5"/></svg>
        </div>
        <div style={{position:"absolute",top:"5%",left:"8%",animation:"deb2 37s linear infinite 7s"}}>
          <svg width="9" height="9" viewBox="0 0 9 9"><polygon points="4.5,0 9,7 0,9" fill="rgba(152,162,198,0.70)" stroke="rgba(188,198,222,0.24)" strokeWidth="0.5"/></svg>
        </div>
        <div style={{position:"absolute",top:"1%",left:"12%",animation:"deb3 44s linear infinite 15s"}}>
          <svg width="17" height="11" viewBox="0 0 17 11"><polygon points="0,11 8,0 17,3 13,11" fill="rgba(138,148,184,0.66)" stroke="rgba(178,188,212,0.20)" strokeWidth="0.5"/></svg>
        </div>
        <div style={{position:"absolute",top:"3%",left:"16%",animation:"deb4 34s linear infinite 5s"}}>
          <svg width="11" height="11" viewBox="0 0 11 11"><rect x="0" y="2" width="11" height="6" rx="1.2" fill="rgba(188,198,228,0.66)" transform="rotate(24 5.5 5.5)"/></svg>
        </div>
        <div style={{position:"absolute",top:"7%",left:"20%",animation:"deb5 40s linear infinite 22s"}}>
          <svg width="14" height="9" viewBox="0 0 14 9"><polygon points="0,9 6,0 14,2 10,9" fill="rgba(162,172,205,0.62)"/></svg>
        </div>
        <div style={{position:"absolute",top:"1%",left:"24%",animation:"deb6 52s linear infinite 11s"}}>
          <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 10,10 0,8" fill="rgba(148,158,194,0.60)"/></svg>
        </div>
        <div style={{position:"absolute",top:"4%",left:"1%",animation:"deb7 32s linear infinite 17s"}}>
          <svg width="15" height="8" viewBox="0 0 15 8"><polygon points="0,8 7,0 15,1 12,8" fill="rgba(172,178,210,0.62)" stroke="rgba(200,210,232,0.20)" strokeWidth="0.4"/></svg>
        </div>
      </div>
    </>
  );
}
