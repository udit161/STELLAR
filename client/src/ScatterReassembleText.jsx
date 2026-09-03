import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * ScatterAndReassembleText
 * -------------------------
 * Renders "SATQUERY AI" as individually animated letter spans that loop
 * through four phases:
 *
 *   1. Scattered   – letters jump to random x/y offsets (+ slight rotation
 *                    on some letters) to create a "broken apart" look.
 *   2. Hold        – brief pause while scattered.
 *   3. Reassemble  – letters spring back to x:0, y:0, rotate:0 using
 *                    spring physics (stiffness: 100, damping: 15).
 *   4. Hold        – text sits perfectly readable before the loop repeats.
 *
 * Drop this component anywhere in a Tailwind + Framer Motion project.
 */

const TEXT = "SatQuery AI".toUpperCase();

// Phase durations (ms)
const SCATTER_HOLD_MS = 400; // Phase 2
const REASSEMBLE_HOLD_MS = 2000; // Phase 4
// Phase 1 (scatter-out) and Phase 3 (reassemble) durations are governed by
// their own transitions below (tween for scatter, spring for reassemble),
// but we still need rough estimates to time the state machine.
const SCATTER_TRANSITION_MS = 600;
const REASSEMBLE_TRANSITION_MS = 700; // approx settle time for the spring

// Deterministic pseudo-random scatter offsets per letter index, so the
// "broken" layout is stable across renders instead of reshuffling.
function getScatterOffset(index) {
  const seed = index * 9301 + 49297;
  const rand = (n) => {
    const x = Math.sin(seed + n) * 10000;
    return x - Math.floor(x);
  };

  const x = (rand(1) - 0.5) * 80; // -40px to 40px
  const y = (rand(2) - 0.5) * 80; // -40px to 40px
  const shouldRotate = rand(3) > 0.4; // only some letters rotate
  const rotate = shouldRotate ? (rand(4) - 0.5) * 20 : 0; // -10deg to 10deg

  return { x, y, rotate };
}

export default function ScatterAndReassembleText() {
  const letters = useMemo(() => TEXT.split(""), []);
  const scatterOffsets = useMemo(
    () => letters.map((_, i) => getScatterOffset(i)),
    [letters]
  );

  // "scattered" | "reassembled"
  const [phase, setPhase] = useState("reassembled");

  useEffect(() => {
    let timeoutId;

    const runCycle = () => {
      // Start reassembled -> hold -> scatter -> hold scattered -> reassemble -> repeat
      timeoutId = setTimeout(() => {
        setPhase("scattered");
        timeoutId = setTimeout(() => {
          setPhase("reassembled");
          runCycle();
        }, SCATTER_TRANSITION_MS + SCATTER_HOLD_MS);
      }, REASSEMBLE_TRANSITION_MS + REASSEMBLE_HOLD_MS);
    };

    runCycle();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="flex flex-wrap items-center justify-center">
        {letters.map((char, i) => {
          const { x, y, rotate } = scatterOffsets[i];
          const isSpace = char === " ";
          const target =
            phase === "scattered" ? { x, y, rotate } : { x: 0, y: 0, rotate: 0 };

          return (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block text-6xl md:text-8xl lg:text-[9rem] font-black font-sans tracking-tight select-none text-slate-50"
              animate={target}
              transition={
                phase === "scattered"
                  ? {
                      duration: SCATTER_TRANSITION_MS / 1000,
                      ease: "easeInOut",
                    }
                  : {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }
              }
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
