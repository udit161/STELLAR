import { useEffect, useMemo, useState } from "react";
import "./SatQueryLogo.css";

/**
 * SatQueryLogo
 * ------------------------------------------------------------------
 * Sequenced brand intro:
 *   1) "SATQUERY AI" draws in letter-by-letter — hollow wireframe
 *      flickers on, then a glowing solid fill sweeps up into place
 *      (left → right), same lime/muted-olive palette as today.
 *   2) Once the wordmark has settled, the multilingual renderings
 *      of the name scatter in around it.
 *   3) A small chandrayaan-style lander fades in and orbits the
 *      whole lockup forever on a tilted elliptical path, scaling
 *      and dimming as it swings "behind" the logo for depth.
 *
 * Colors are left untouched (lime #e3ea6f / muted olive #6c6355).
 * No external assets — the globe, stars and lander are all inline SVG.
 * ------------------------------------------------------------------
 */

// "SATQUERY" + "AI" as two words, muted=true matches the grey-olive
// letters in the current logo (Q and Y).
const WORD_1 = [
  { ch: "S", muted: false },
  { ch: "A", muted: false },
  { ch: "T", muted: false },
  { ch: "Q", muted: true },
  { ch: "U", muted: false },
  { ch: "E", muted: false },
  { ch: "R", muted: false },
  { ch: "Y", muted: true },
];
const WORD_2 = [
  { ch: "A", muted: false },
  { ch: "I", muted: false },
];

// Phonetic renderings of "SatQuery AI" in a spread of Indian languages.
// Swap these for your verified in-house translations if you have them.
const TRANSLATIONS = [
  { lang: "hi", text: "सैटक्वेरी एआई", top: "10%", left: "8%" },
  { lang: "ml", text: "സാറ്റ്ക്വറി എഐ", top: "7%", left: "37%" },
  { lang: "bn", text: "স্যাটকোয়েরি এআই", top: "6%", left: "67%" },
  { lang: "ta", text: "சாட்குவேரி ஏஐ", top: "15%", left: "87%" },
  { lang: "kn", text: "ಸ್ಯಾಟ್\u200cಕ್ವೇರಿ ಏಐ", top: "36%", left: "2%" },
  { lang: "te", text: "సాట్క్వేరీ ఏఐ", top: "40%", left: "92%" },
  { lang: "ur", text: "سیٹ کوئری اے آئی", top: "64%", left: "4%", dir: "rtl" },
  { lang: "gu", text: "સેટક્વેરી એઆઈ", top: "70%", left: "29%" },
  { lang: "or", text: "ସାଟକ୍ୱେରୀ ଏଆଇ", top: "78%", left: "57%" },
  { lang: "pa", text: "ਸੈਟਕਵੇਰੀ ਏਆਈ", top: "68%", left: "89%" },
  { lang: "mr", text: "सॅटक्वेरी एआय", top: "89%", left: "16%" },
  { lang: "as", text: "চেটকোৱেৰী এআই", top: "90%", left: "74%" },
];

const INTRO_MS = 1700; // when the wordmark has fully settled (bounce-in included)
const STAR_COUNT = 55;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

function Letter({ ch, muted, index }) {
  return (
    <span className={`sq-letter${muted ? " is-muted" : ""}`} style={{ "--i": index }}>
      <span className="sq-letter-outline" aria-hidden="true">{ch}</span>
      <span className="sq-letter-fill" aria-hidden="true">{ch}</span>
    </span>
  );
}

function Starfield({ count }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${(Math.random() * 1.6 + 0.6).toFixed(2)}px`,
        dur: `${(Math.random() * 3 + 2.2).toFixed(2)}s`,
        delay: `${(Math.random() * 4).toFixed(2)}s`,
        minOp: (Math.random() * 0.2 + 0.15).toFixed(2),
        maxOp: (Math.random() * 0.3 + 0.7).toFixed(2),
      })),
    [count]
  );

  return (
    <div className="sq-stars" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="sq-star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            "--dur": s.dur,
            "--delay": s.delay,
            "--min-op": s.minOp,
            "--max-op": s.maxOp,
          }}
        />
      ))}
    </div>
  );
}

function WireframeGlobe() {
  return (
    <svg className="sq-globe" viewBox="0 0 400 400" aria-hidden="true">
      <g>
        <circle cx="200" cy="200" r="180" />
        <ellipse cx="200" cy="200" rx="180" ry="60" />
        <ellipse cx="200" cy="200" rx="180" ry="110" />
        <ellipse cx="200" cy="200" rx="60" ry="180" />
        <ellipse cx="200" cy="200" rx="110" ry="180" />
        <circle cx="200" cy="200" r="120" opacity="0.6" />
        <circle cx="80" cy="140" r="2.4" className="sq-node" />
        <circle cx="300" cy="90" r="2.2" className="sq-node" />
        <circle cx="330" cy="230" r="2.6" className="sq-node" />
        <circle cx="150" cy="330" r="2.2" className="sq-node" />
        <circle cx="260" cy="310" r="2" className="sq-node" />
        <circle cx="70" cy="260" r="2" className="sq-node" />
        <circle cx="200" cy="40" r="2.2" className="sq-node" />
      </g>
    </svg>
  );
}

function ChandrayaanIcon() {
  // Stylised lander: gold-foil body, four splayed legs, antenna + solar wings.
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="sqBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3d488" />
          <stop offset="55%" stopColor="#d7a03f" />
          <stop offset="100%" stopColor="#8a5a1f" />
        </linearGradient>
      </defs>
      {/* solar panels */}
      <rect x="2" y="26" width="14" height="10" rx="1.2" fill="#2f6fa3" stroke="#bfe1ff" strokeWidth="0.6" />
      <rect x="48" y="26" width="14" height="10" rx="1.2" fill="#2f6fa3" stroke="#bfe1ff" strokeWidth="0.6" />
      <line x1="16" y1="31" x2="24" y2="31" stroke="#cbd5df" strokeWidth="1.4" />
      <line x1="40" y1="31" x2="48" y2="31" stroke="#cbd5df" strokeWidth="1.4" />
      {/* legs */}
      <line x1="24" y1="40" x2="14" y2="56" stroke="#c9c9c9" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="40" x2="50" y2="56" stroke="#c9c9c9" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="42" x2="20" y2="56" stroke="#c9c9c9" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="42" x2="44" y2="56" stroke="#c9c9c9" strokeWidth="2" strokeLinecap="round" />
      {/* body */}
      <rect x="21" y="22" width="22" height="20" rx="3" fill="url(#sqBody)" stroke="#5c3d13" strokeWidth="0.8" />
      <rect x="26" y="27" width="12" height="6" rx="1.4" fill="#12324a" opacity="0.85" />
      {/* antenna */}
      <line x1="32" y1="22" x2="32" y2="10" stroke="#e7e7e7" strokeWidth="1.4" />
      <circle cx="32" cy="9" r="2" fill="#f3f3f3" />
    </svg>
  );
}

export default function SatQueryLogo() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(reducedMotion ? "done" : "intro");

  useEffect(() => {
    if (reducedMotion) {
      setPhase("done");
      return;
    }
    const t = setTimeout(() => setPhase("translations"), INTRO_MS);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  return (
    <div className={`sq-stage sq-phase-${phase}`}>
      <Starfield count={STAR_COUNT} />
      <WireframeGlobe />

      <div className="sq-translations" aria-hidden="true">
        {TRANSLATIONS.map((t, i) => (
          <span
            key={t.lang}
            className="sq-translation"
            lang={t.lang}
            dir={t.dir}
            style={{ top: t.top, left: t.left, "--t-delay": `${i * 90}ms` }}
          >
            {t.text}
          </span>
        ))}
      </div>

      <div className="sq-orbit-ring" aria-hidden="true" />
      <div className="sq-orbiter" aria-hidden="true">
        <span className="sq-orbiter-glow" />
        <ChandrayaanIcon />
      </div>

      <div className="sq-logo-wrap">
        <h1 className="sq-sr-only">SatQuery AI</h1>
        <div className="sq-logo" aria-hidden="true">
          {WORD_1.map((l, i) => (
            <Letter key={`w1-${i}`} ch={l.ch} muted={l.muted} index={i} />
          ))}
          <span className="sq-word-gap" />
          {WORD_2.map((l, i) => (
            <Letter key={`w2-${i}`} ch={l.ch} muted={l.muted} index={WORD_1.length + i} />
          ))}
        </div>
        <div className="sq-reflection" aria-hidden="true">SATQUERY AI</div>
      </div>
    </div>
  );
}
