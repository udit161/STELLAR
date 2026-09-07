import React from "react";
import { ConstellationField } from "./ConstellationField";
import "./shader-frame.css";

export function Scene({ onEnter, isEmbedded = false }) {
  return (
    <div 
      className={`shader-frame ${isEmbedded ? 'embed-mode' : ''}`}
      onClick={onEnter}
      style={{ cursor: isEmbedded ? 'default' : 'pointer' }}
      title={isEmbedded ? '' : 'Click anywhere to enter SatQuery AI'}
    >
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
    </div>
  );
}

export default Scene;
