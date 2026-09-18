import { useEffect, useMemo, useState } from "react";
import "./SatQueryLogo.css";

/**
 * SatQueryLogo — Sequenced brand intro
 * ──────────────────────────────────────────────────────────────
 * Phase 1: Letter-by-letter reveal (70ms stagger, left → right)
 *   • Each letter flickers on as a hollow wireframe outline
 *   • Then jumps up from below, overshoots with a bright lime bloom
 *   • Dips into a small rebound, settles with a soft glow
 *   • Colors: lime #e3ea6f (default) | muted olive #6c6355 (Q, Y)
 *   • A mirrored reflection fades in below the wordmark
 *
 * Phase 2: Multilingual scatter (starts 200ms after wordmark settles)
 *   • ~12 Indian scripts fade + scale in around the logo
 *   • Each gently pulses in dusty rose
 *
 * Ambient: Chandrayaan lander orbits on a tilted elliptical path
 * Respects prefers-reduced-motion. Background is untouched.
 * ──────────────────────────────────────────────────────────────
 */

const WORD_1 = [
  { ch: "S", muted: false },
  { ch: "A", muted: false },
  { ch: "T", muted: false },
  { ch: "Q", muted: true  },
  { ch: "U", muted: false },
  { ch: "E", muted: false },
  { ch: "R", muted: false },
  { ch: "Y", muted: true  },
];
const WORD_2 = [
  { ch: "A", muted: false },
  { ch: "I", muted: false },
];

const TRANSLATIONS = [
  { lang: "hi", text: "सैटक्वेरी एआई",    top: "9%",  left: "6%"  },
  { lang: "ml", text: "സാറ്റ്ക്വറി എഐ",   top: "6%",  left: "36%" },
  { lang: "bn", text: "স্যাটকোয়েরি এআই", top: "5%",  left: "65%" },
  { lang: "ta", text: "சாட்குவேரி ஏஐ",    top: "14%", left: "86%" },
  { lang: "kn", text: "ಸ್ಯಾಟ್\u200cಕ್ವೇರಿ ಏಐ", top: "35%", left: "1%"  },
  { lang: "te", text: "సాట్క్వేరీ ఏఐ",    top: "39%", left: "91%" },
  { lang: "ur", text: "سیٹ کوئری اے آئی", top: "63%", left: "3%",  dir: "rtl" },
  { lang: "gu", text: "સેટક્વેરી એઆઈ",    top: "69%", left: "28%" },
  { lang: "or", text: "ସାଟ୍\u200cକ୍ୱେରୀ ଏଆଇ", top: "77%", left: "56%" },
  { lang: "pa", text: "ਸੈਟਕਵੇਰੀ ਏਆਈ",    top: "67%", left: "88%" },
  { lang: "mr", text: "सॅटक्वेरी एआय",    top: "88%", left: "15%" },
  { lang: "as", text: "চেটকোৱেৰী এআই",   top: "89%", left: "73%" },
];

const LETTER_STAGGER_MS  = 70;
const SETTLE_OFFSET_MS   = 900;
const INTRO_MS           = LETTER_STAGGER_MS * (WORD_1.length + WORD_2.length) + SETTLE_OFFSET_MS;
const TRANSLATIONS_DELAY = INTRO_MS + 200;
const STAR_COUNT         = 60;

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => (typeof window !== "undefined" ? window.matchMedia?.("(prefers-reduced-motion: reduce)").matches : false) ?? false
  );
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const h = (e) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

function Letter({ ch, muted, index, reduced }) {
  return (
    <span
      className={`sq-letter${muted ? " is-muted" : ""}${reduced ? " no-anim" : ""}`}
      style={{ "--i": index }}
      aria-hidden="true"
    >
      <span className="sq-letter-outline">{ch}</span>
      <span className="sq-letter-fill">{ch}</span>
    </span>
  );
}

function Starfield({ count }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top:   `${Math.random() * 100}%`,
        left:  `${Math.random() * 100}%`,
        size:  `${(Math.random() * 1.8 + 0.5).toFixed(2)}px`,
        dur:   `${(Math.random() * 3 + 2).toFixed(2)}s`,
        delay: `${(Math.random() * 5).toFixed(2)}s`,
        minOp: (Math.random() * 0.2 + 0.1).toFixed(2),
        maxOp: (Math.random() * 0.35 + 0.65).toFixed(2),
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
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            "--dur":    s.dur,
            "--delay":  s.delay,
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
        <ellipse cx="200" cy="200" rx="180" ry="62" />
        <ellipse cx="200" cy="200" rx="180" ry="112" />
        <ellipse cx="200" cy="200" rx="62"  ry="180" />
        <ellipse cx="200" cy="200" rx="112" ry="180" />
        <circle cx="200" cy="200" r="122" opacity="0.55" />
        <circle cx="82"  cy="140" r="2.6" className="sq-node" />
        <circle cx="300" cy="90"  r="2.3" className="sq-node" />
        <circle cx="330" cy="232" r="2.7" className="sq-node" />
        <circle cx="150" cy="332" r="2.3" className="sq-node" />
        <circle cx="260" cy="312" r="2.1" className="sq-node" />
        <circle cx="70"  cy="260" r="2.1" className="sq-node" />
        <circle cx="200" cy="42"  r="2.3" className="sq-node" />
      </g>
    </svg>
  );
}

function ChandrayaanLander() {
  return (
    <svg className="sq-lander-svg" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="sqLanderBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#f3d488" />
          <stop offset="55%"  stopColor="#d7a03f" />
          <stop offset="100%" stopColor="#8a5a1f" />
        </linearGradient>
      </defs>
      <rect x="2"  y="26" width="14" height="10" rx="1.2" fill="#2f6fa3" stroke="#bfe1ff" strokeWidth="0.6" />
      <rect x="48" y="26" width="14" height="10" rx="1.2" fill="#2f6fa3" stroke="#bfe1ff" strokeWidth="0.6" />
      <line x1="16" y1="31" x2="24" y2="31" stroke="#cbd5df" strokeWidth="1.4" />
      <line x1="40" y1="31" x2="48" y2="31" stroke="#cbd5df" strokeWidth="1.4" />
      <line x1="24" y1="40" x2="14" y2="56" stroke="#c9c9c9" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="40" x2="50" y2="56" stroke="#c9c9c9" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="42" x2="20" y2="56" stroke="#c9c9c9" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="42" x2="44" y2="56" stroke="#c9c9c9" strokeWidth="2" strokeLinecap="round" />
      <rect x="21" y="22" width="22" height="20" rx="3" fill="url(#sqLanderBody)" stroke="#5c3d13" strokeWidth="0.8" />
      <rect x="26" y="27" width="12" height="6"  rx="1.4" fill="#12324a" opacity="0.85" />
      <line x1="32" y1="22" x2="32" y2="10" stroke="#e7e7e7" strokeWidth="1.4" />
      <circle cx="32" cy="9" r="2" fill="#f3f3f3" />
    </svg>
  );
}

export function SatQueryLogo({ onClick, size = "normal" }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? "done" : "intro");

  useEffect(() => {
    if (reduced) { setPhase("done"); return; }
    setPhase("intro");
    const t1 = setTimeout(() => setPhase("settling"),     INTRO_MS);
    const t2 = setTimeout(() => setPhase("translations"), TRANSLATIONS_DELAY);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduced]);

  return (
    <div
      className={`sq-stage sq-phase-${phase} sq-size-${size}`}
      onClick={onClick}
      title="SatQuery AI"
    >
      <Starfield count={STAR_COUNT} />
      <WireframeGlobe />

      <div className="sq-translations" aria-hidden="true">
        {TRANSLATIONS.map((t, i) => (
          <span
            key={t.lang}
            className="sq-translation"
            lang={t.lang}
            dir={t.dir}
            style={{ top: t.top, left: t.left, "--t-delay": `${i * 85}ms` }}
          >
            {t.text}
          </span>
        ))}
      </div>

      {!reduced && (
        <>
          <div className="sq-orbit-ring" aria-hidden="true" />
          <div className="sq-orbiter" aria-hidden="true">
            <span className="sq-orbiter-glow" />
            <ChandrayaanLander />
          </div>
        </>
      )}

      <div className="sq-logo-wrap">
        <h1 className="sq-sr-only">SatQuery AI</h1>

        <div className="sq-logo" aria-hidden="true">
          {WORD_1.map((l, i) => (
            <Letter key={`w1-${i}`} ch={l.ch} muted={l.muted} index={i} reduced={reduced} />
          ))}
          <span className="sq-word-gap" />
          {WORD_2.map((l, i) => (
            <Letter key={`w2-${i}`} ch={l.ch} muted={l.muted} index={WORD_1.length + i} reduced={reduced} />
          ))}
        </div>

        <div className="sq-reflection" aria-hidden="true">
          {WORD_1.map((l, i) => (
            <span key={i} className={l.muted ? "is-muted" : ""}>{l.ch}</span>
          ))}
          <span>&nbsp;</span>
          {WORD_2.map((l, i) => (
            <span key={i}>{l.ch}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SatQueryLogo;

