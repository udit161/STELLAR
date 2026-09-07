import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ConstellationField } from "./ConstellationField (1)";
import "./shader-frame.css";

export function Scene({ onEnter, isEmbedded = false }) {
  return (
    <div className={`shader-frame ${isEmbedded ? 'embed-mode' : ''}`}>
      <ConstellationField
        variant="topo-field"
        mode="dark"
        speed={1.0}
        size={1.0}
        length={1.0}
        density={1.0}
        opacity={1.0}
        hue={0}
        saturation={1.0}
        brightness={1.0}
      />

      {!isEmbedded && (
        <div className="scene-intro-overlay">
          <div className="scene-badge">
            <div className="scene-badge-dot" />
            <span>ORBITAL CONSTELLATION ONLINE</span>
          </div>

          <h1 className="scene-main-title">
            SatQuery AI <br />
            <span className="scene-title-gradient">Mission Control</span>
          </h1>

          <p className="scene-subtitle">
            Autonomous multi-spectral satellite intelligence, bi-temporal change detection, and geospatial visual query engine.
          </p>

          <button
            className="scene-enter-btn"
            onClick={onEnter}
            title="Enter SatQuery AI Platform"
          >
            <span>Enter Mission Control</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Scene;
