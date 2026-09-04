import React from "react";

/**
 * IndiaFlagBadge
 * ---------------
 * An abstract, continuously morphing blob in the top-left corner
 * inspired by the Indian tricolor (saffron, white, green) and the
 * Ashoka Chakra. Uses the same border-radius keyframe morph pattern
 * as ISROBadge, but with India flag colors.
 */
export default function IndiaFlagBadge() {
  const spokes = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i * 360) / 24;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 50 + 6 * Math.cos(rad),
      y1: 50 + 6 * Math.sin(rad),
      x2: 50 + 43 * Math.cos(rad),
      y2: 50 + 43 * Math.sin(rad),
    };
  });

  return (
    <>
      <style>{`
        @keyframes indiaBlobMorph {
          0%   { border-radius: 58% 42% 52% 48% / 48% 62% 38% 52%; }
          12%  { border-radius: 42% 58% 36% 64% / 62% 44% 56% 38%; }
          24%  { border-radius: 66% 34% 60% 40% / 36% 68% 32% 64%; }
          36%  { border-radius: 38% 62% 44% 56% / 70% 30% 70% 30%; }
          48%  { border-radius: 54% 46% 68% 32% / 44% 56% 44% 56%; }
          60%  { border-radius: 72% 28% 38% 62% / 52% 40% 60% 48%; }
          72%  { border-radius: 30% 70% 56% 44% / 64% 36% 64% 36%; }
          84%  { border-radius: 46% 54% 30% 70% / 38% 72% 28% 62%; }
          100% { border-radius: 58% 42% 52% 48% / 48% 62% 38% 52%; }
        }

        @keyframes chakraSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes indiaHaloPulse {
          0%, 100% { opacity: 0.28; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(1.1); }
        }

        .india-badge-wrap {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
        }
        .india-badge-wrap:hover { transform: scale(1.1) !important; }
        .india-badge-wrap:hover .india-ring,
        .india-badge-wrap:hover .india-ring-mask,
        .india-badge-wrap:hover .india-clip,
        .india-badge-wrap:hover .india-halo { animation-play-state: paused; }
        .india-badge-wrap:hover .india-chakra { animation-play-state: paused; }

        .india-ring      { animation: indiaBlobMorph 9s ease-in-out infinite; }
        .india-ring-mask { animation: indiaBlobMorph 9s ease-in-out infinite; }
        .india-clip      { animation: indiaBlobMorph 9s ease-in-out infinite; }
        .india-halo      { animation: indiaBlobMorph 9s ease-in-out infinite, indiaHaloPulse 3s ease-in-out infinite; }
        .india-chakra    { animation: chakraSpin 8s linear infinite; transform-origin: center; }
      `}</style>

      <div
        className="india-badge-wrap"
        style={{
          position: "fixed",
          top: "22px",
          left: "26px",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "7px",
        }}
      >
        <div style={{ position: "relative", width: "88px", height: "88px" }}>

          {/* Outer halo pulse */}
          <div
            className="india-halo"
            style={{
              position: "absolute",
              inset: "-12px",
              background:
                "conic-gradient(from 0deg, rgba(255,153,51,0.35), rgba(19,136,8,0.35), rgba(0,0,128,0.25), rgba(255,153,51,0.35))",
              filter: "blur(14px)",
              zIndex: 0,
            }}
          />

          {/* Tricolor gradient ring border */}
          <div
            className="india-ring"
            style={{
              position: "absolute",
              inset: "-5px",
              background:
                "linear-gradient(180deg, #FF9933 0%, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%, #138808 100%)",
              zIndex: 1,
            }}
          />

          {/* Dark mask to make ring appear as border only */}
          <div
            className="india-ring-mask"
            style={{
              position: "absolute",
              inset: "-1px",
              background: "rgba(4,6,14,0.96)",
              zIndex: 2,
            }}
          />

          {/* Main clip: tricolor stripes + Ashoka Chakra */}
          <div
            className="india-clip"
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              zIndex: 3,
              background:
                "linear-gradient(180deg, #FF9933 0%, #FF9933 33%, #f0f0f0 33%, #f0f0f0 66%, #138808 66%, #138808 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              className="india-chakra"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="50"
              height="50"
              aria-label="Ashoka Chakra"
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="#000080" strokeWidth="4" />
              <circle cx="50" cy="50" r="6" fill="#000080" />
              {spokes.map((s, i) => (
                <line
                  key={i}
                  x1={s.x1} y1={s.y1}
                  x2={s.x2} y2={s.y2}
                  stroke="#000080"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ))}
              <circle cx="50" cy="50" r="42" fill="none" stroke="#000080" strokeWidth="1.2" strokeDasharray="4 3.5" />
            </svg>
          </div>
        </div>

        {/* Label */}
        <span
          style={{
            fontSize: "7.5px",
            fontWeight: 800,
            letterSpacing: "0.22em",
            color: "rgba(255,153,51,0.85)",
            textTransform: "uppercase",
            userSelect: "none",
            textShadow: "0 0 8px rgba(255,153,51,0.4)",
          }}
        >
          INDIA
        </span>
      </div>
    </>
  );
}
