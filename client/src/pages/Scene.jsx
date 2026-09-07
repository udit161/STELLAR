import React from "react";
import { ConstellationField } from "./ConstellationField";
import ScatterAndReassembleText from "../components/ScatterAndReassembleText";
import "./shader-frame.css";

export function Scene({ onEnter, isEmbedded = false }) {
  return (
    <div 
      className={`shader-frame ${isEmbedded ? 'embed-mode' : ''}`}
      onClick={onEnter}
      style={{ cursor: isEmbedded ? 'default' : 'pointer' }}
      title={isEmbedded ? '' : 'Click anywhere to enter SatQuery AI'}
    >
      {/* Background Animated Interface Line Constellation Field */}
      <ConstellationField
        variant="interface-lines"
        mode="dark"
        speed={1.00}
        size={1.00}
        length={1.00}
        density={1.00}
        opacity={1.00}
        hue={0}
        saturation={1.00}
      />

      {/* Center-Mid Abstract Morphing Blob Card with Main Page Animated Logo */}
      {!isEmbedded && (
        <div className="intro-logo-wrapper">
          <div className="intro-abstract-card-container">
            {/* Outer Morphing Halo Glow */}
            <div className="intro-abstract-halo" />
            {/* Outer Morphing Gradient Border Ring */}
            <div className="intro-abstract-ring" />
            {/* Dark Mask for Border Edge */}
            <div className="intro-abstract-mask" />
            {/* Main Abstract Morphing Card Body */}
            <div className="intro-abstract-card">
              <div className="intro-logo-scaled-inner">
                <ScatterAndReassembleText showMultilingual={false} singleLine={true} />
              </div>
            </div>
          </div>
          <span className="intro-logo-hint">Click anywhere to enter</span>
        </div>
      )}
    </div>
  );
}

export default Scene;
