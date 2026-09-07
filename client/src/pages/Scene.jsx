import { ConstellationField } from "./ConstellationField";
import "./shader-frame.css";

export function Scene() {
  return (
    <div className="shader-frame">
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
    </div>
  );
}

export default Scene;
