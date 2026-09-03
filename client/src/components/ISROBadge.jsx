import React from 'react';

/**
 * ISROBadge
 * ----------
 * Displays the official ISRO SVG logo inside a continuously morphing
 * abstract blob frame rendered with CSS clip-path keyframes.
 *
 * The frame layer (gradient ring) and the image container share the
 * same animation so the cutout and border stay perfectly in sync.
 */
export default function ISROBadge() {
  return (
    <>
      {/* Inject keyframes once */}
      <style>{`
        @keyframes isroBlobMorph {
          0%   { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; }
          10%  { border-radius: 38% 62% 60% 40% / 42% 58% 42% 58%; }
          20%  { border-radius: 50% 50% 28% 72% / 50% 34% 66% 50%; }
          30%  { border-radius: 68% 32% 52% 48% / 38% 62% 38% 62%; }
          40%  { border-radius: 34% 66% 42% 58% / 66% 28% 72% 34%; }
          50%  { border-radius: 56% 44% 64% 36% / 48% 72% 28% 52%; }
          60%  { border-radius: 44% 56% 36% 64% / 72% 40% 60% 28%; }
          70%  { border-radius: 70% 30% 54% 46% / 34% 66% 34% 66%; }
          80%  { border-radius: 32% 68% 66% 34% / 56% 44% 56% 44%; }
          90%  { border-radius: 58% 42% 30% 70% / 44% 56% 44% 56%; }
          100% { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; }
        }


        .isro-frame-ring {
          animation: isroBlobMorph 8s ease-in-out infinite;
        }

        .isro-frame-clip {
          animation: isroBlobMorph 8s ease-in-out infinite;
        }

        .isro-badge-wrap:hover .isro-frame-ring,
        .isro-badge-wrap:hover .isro-frame-clip {
          animation-play-state: paused;
        }

        .isro-badge-wrap:hover {
          transform: scale(1.08);
        }
      `}</style>

      <div
        className="isro-badge-wrap"
        style={{
          position: 'fixed',
          bottom: '22px',
          right: '26px',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '7px',
          cursor: 'default',
          transition: 'transform 0.35s ease',
        }}
      >
        {/* Morphing glow ring (4px larger on every side) */}
        <div style={{ position: 'relative', width: '104px', height: '104px' }}>

          {/* Outer gradient ring — same morph as the clip */}
          <div
            className="isro-frame-ring"
            style={{
              position: 'absolute',
              inset: '-4px',
              background: 'linear-gradient(135deg, #e6641e 0%, #E6F082 40%, #D8D365 60%, #e6641e 100%)',
            }}
          />

          {/* Dark inset so only the border shows */}
          <div
            className="isro-frame-ring"
            style={{
              position: 'absolute',
              inset: '-1px',
              background: '#050508',
              zIndex: 1,
            }}
          />

          {/* Logo clip container — same morph */}
          <div
            className="isro-frame-clip"
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              zIndex: 2,
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/isro_official.svg"
              alt="ISRO — Indian Space Research Organisation"
              style={{
                width: '90%',
                height: '90%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* Label */}
        <span
          style={{
            fontSize: '8.5px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'rgba(230,100,30,0.80)',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          ISRO
        </span>
      </div>
    </>
  );
}
