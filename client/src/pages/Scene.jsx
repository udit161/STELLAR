import React from "react";
import { ArrowRight } from "lucide-react";
import { ConstellationField } from "./ConstellationField";
import ScatterAndReassembleText from "../components/ScatterAndReassembleText";
import "./shader-frame.css";

export function Scene({ onEnter, isEmbedded = false }) {
  return (
    <div className={`shader-frame ${isEmbedded ? 'embed-mode' : ''}`}>
      {/* Background WebGL Constellation Contour Field */}
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

      {/* Foreground Typography Layout & Interactive Control */}
      {!isEmbedded && (
        <div className="scene-content-wrapper">
          <ScatterAndReassembleText />

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
