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

export default function ScatterAndReassembleText() {
  const letters        = useMemo(() => TEXT.split(""), []);
  const scatterOffsets = useMemo(() => letters.map((_, i) => getScatterOffset(i)), [letters]);
  const floatParams    = useMemo(() => letters.map((_, i) => getFloatParams(i)),   [letters]);

  /**
   * Three-phase state machine (no 2-phase snap):
   *   "reassembling" → spring x/y/rotate to exactly 0
   *   "floating"     → only y loops; x & rotate stay untouched at 0
   *   "scattered"    → tween all to scatter offsets
   */
  const [phase, setPhase] = useState("reassembling");

  useEffect(() => {
    let tid;

    const runCycle = (isFirst = false) => {
      const holdMs = isFirst ? 400 : FLOAT_HOLD_MS;

      // Hold (floating) → scatter
      tid = setTimeout(() => {
        setPhase("scattered");

        // Scatter → reassemble (spring to 0)
        tid = setTimeout(() => {
          setPhase("reassembling");

          // Once settled at 0 → start float loop
          tid = setTimeout(() => {
            setPhase("floating");
            runCycle(false);
          }, REASSEMBLE_SETTLE_MS);

        }, SCATTER_TRANSITION_MS + SCATTER_HOLD_MS);
      }, holdMs);
    };

    // On mount: spring in → then begin normal cycle
    tid = setTimeout(() => {
      setPhase("floating");
      runCycle(true);
    }, REASSEMBLE_SETTLE_MS);

    return () => clearTimeout(tid);
  }, []);

  return (
    <div
      style={{
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

        // ── animate target ────────────────────────────────────────────────
        let animateTarget;
        if (phase === "scattered") {
          animateTarget = { x, y, rotate, opacity: 0.6 };
        } else if (phase === "reassembling") {
          animateTarget = { x: 0, y: 0, rotate: 0, opacity: 1 };
        } else {
          // "floating": ONLY animate y — x and rotate left untouched at 0
          // This eliminates any chance of snap on those axes
          animateTarget = { y: [0, -amplitude, 0], opacity: 1 };
        }

        // ── transition ────────────────────────────────────────────────────
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
            restDelta: 0.001,  // stop spring as soon as visually settled
            restSpeed: 0.001,
          };
        } else {
          // "floating": y loops via mirror (smoothest reversal)
          // No delay — duration variation creates the natural wave
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
  );
}
