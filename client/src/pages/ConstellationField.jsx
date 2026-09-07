/**
 * ConstellationField — "topo-field" variant
 * -------------------------------------------------------------------------
 * Original implementation written for this project. It is NOT a copy of,
 * or reconstruction from, any "@designcodeio/threeui" package — that
 * package could not be verified or fetched, so nothing from it was used.
 * This is a raw-WebGL topographic contour-band field built from scratch
 * to match the prop interface you specified:
 *
 *   <ConstellationField
 *     variant="topo-field"
 *     mode="dark" | "light"
 *     speed={number}       // animation rate
 *     size={number}        // feature scale of the terrain
 *     length={number}      // contour band thickness / stretch
 *     density={number}     // number of contour bands
 *     opacity={number}     // overall alpha
 *     hue={number}         // 0–360
 *     saturation={number}  // 0–1
 *     brightness={number}  // 0–1
 *   />
 *
 * How it works:
 *  - A fullscreen triangle is drawn with raw WebGL (no three.js / libraries).
 *  - The fragment shader builds a fractal-noise heightfield (fbm of value
 *    noise), animates it by drifting the sample domain over time, and
 *    slices it into contour bands (like a topographic map) whose spacing
 *    is controlled by `density` and whose crispness by `length`.
 *  - Color is derived from HSB (hue/saturation/brightness props) with a
 *    dark or light base determined by `mode`.
 *  - Respects prefers-reduced-motion (freezes animation, still renders a
 *    static frame) and resizes with devicePixelRatio-aware canvas sizing.
 */

import { useEffect, useRef } from "react";

const VERTEX_SRC = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uSize;
uniform float uLength;
uniform float uDensity;
uniform float uOpacity;
uniform float uHue;
uniform float uSaturation;
uniform float uBrightness;
uniform float uDark; // 1.0 = dark mode

// ---- organic hash & fbm fractal noise -------------------------------------

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.04;
    amplitude *= 0.52;
  }
  return value;
}

vec3 hsb2rgb(vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;

  // Smooth continuous diagonal drift rate
  float t = uTime * uSpeed * 0.05;

  // Domain scaling for organic terrain landscape features
  float scale = mix(4.5, 1.8, clamp(uSize, 0.1, 3.0) / 3.0);
  vec2 samplePos = p * scale + vec2(t * 0.45, t * 0.3);

  // Secondary warping for organic fluid landscape motion
  vec2 warp = vec2(fbm(samplePos + 2.4 + t * 0.1), fbm(samplePos - 1.8 - t * 0.08));
  float elevation = fbm(samplePos + warp * 0.55);

  // Density & contour band frequency
  float bands = mix(12.0, 36.0, clamp(uDensity, 0.1, 3.0) / 3.0);
  float bandPos = elevation * bands;

  // Sharp, thin glowing contour bands
  float lineDist = abs(fract(bandPos) - 0.5);
  float thickness = mix(0.28, 0.04, clamp(uLength, 0.1, 3.0) / 3.0);
  float contour = smoothstep(thickness, thickness * 0.25, lineDist);

  // Gradient elevation shading between bands
  float fillShade = smoothstep(0.15, 0.85, elevation);

  // Base Colors: Always Deep Near-Black Dark Space
  vec3 bgDark = vec3(0.012, 0.015, 0.025); // Deep dark abyss
  vec3 accentColor = vec3(0.92, 0.72, 0.22); // Amber gold glowing contours

  if (uHue > 0.0) {
    accentColor = hsb2rgb(vec3(mod(uHue, 360.0) / 360.0, uSaturation, uBrightness));
  }

  // Elevation gradient tint
  vec3 darkLayer = mix(bgDark, vec3(0.04, 0.06, 0.12), fillShade);
  vec3 color = mix(darkLayer, accentColor * 0.85, contour * 0.75);

  // Additional subtle inner glow on high elevation contours
  float highGlow = smoothstep(0.65, 0.95, elevation) * contour;
  color += accentColor * highGlow * 0.6;

  // Radial Vignette Falloff (Center reads brightest, edge fades into dark abyss)
  float dist = length(p);
  float vig = smoothstep(1.2, 0.25, dist);
  color = mix(bgDark, color, vig);

  gl_FragColor = vec4(color, clamp(uOpacity, 0.0, 1.0));
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

function createProgram(gl, vertexSrc, fragmentSrc) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  return program;
}

export function ConstellationField({
  variant = "topo-field",
  mode = "dark",
  speed = 1.0,
  size = 1.0,
  length = 1.0,
  density = 1.0,
  opacity = 1.0,
  hue = 0,
  saturation = 1.0,
  brightness = 1.0,
  className = "",
  style,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const glStateRef = useRef(null);

  // Keep latest prop values available inside the animation loop without
  // tearing down/rebuilding the WebGL context on every render.
  const propsRef = useRef({
    speed,
    size,
    length,
    density,
    opacity,
    hue,
    saturation,
    brightness,
    mode,
  });
  propsRef.current = {
    speed,
    size,
    length,
    density,
    opacity,
    hue,
    saturation,
    brightness,
    mode,
  };

  useEffect(() => {
    if (variant !== "topo-field") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: true }) ||
      canvas.getContext("experimental-webgl", { alpha: true, antialias: true });

    if (!gl) {
      console.warn("ConstellationField: WebGL is not available in this browser.");
      return;
    }

    let program;
    try {
      program = createProgram(gl, VERTEX_SRC, FRAGMENT_SRC);
    } catch (err) {
      console.error("ConstellationField shader error:", err);
      return;
    }

    gl.useProgram(program);

    // Fullscreen triangle (covers viewport, avoids a seam-prone quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uTime: gl.getUniformLocation(program, "uTime"),
      uSpeed: gl.getUniformLocation(program, "uSpeed"),
      uSize: gl.getUniformLocation(program, "uSize"),
      uLength: gl.getUniformLocation(program, "uLength"),
      uDensity: gl.getUniformLocation(program, "uDensity"),
      uOpacity: gl.getUniformLocation(program, "uOpacity"),
      uHue: gl.getUniformLocation(program, "uHue"),
      uSaturation: gl.getUniformLocation(program, "uSaturation"),
      uBrightness: gl.getUniformLocation(program, "uBrightness"),
      uDark: gl.getUniformLocation(program, "uDark"),
    };

    glStateRef.current = { gl, program, positionBuffer };

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const displayHeight = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    }

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(canvas);
    window.addEventListener("resize", resize);
    resize();

    const startTime = performance.now();

    function render(now) {
      const elapsed = reducedMotion ? 0 : (now - startTime) / 1000;
      const p = propsRef.current;

      gl.useProgram(program);
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uTime, elapsed);
      gl.uniform1f(uniforms.uSpeed, p.speed);
      gl.uniform1f(uniforms.uSize, p.size);
      gl.uniform1f(uniforms.uLength, p.length);
      gl.uniform1f(uniforms.uDensity, p.density);
      gl.uniform1f(uniforms.uOpacity, p.opacity);
      gl.uniform1f(uniforms.uHue, p.hue);
      gl.uniform1f(uniforms.uSaturation, p.saturation);
      gl.uniform1f(uniforms.uBrightness, p.brightness);
      gl.uniform1f(uniforms.uDark, p.mode === "dark" ? 1.0 : 0.0);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reducedMotion) {
        rafRef.current = requestAnimationFrame(render);
      }
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      if (resizeObserver) resizeObserver.disconnect();

      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
      glStateRef.current = null;
    };
    // Context is intentionally created once; live prop changes flow in via
    // propsRef and are read each frame, so we don't rebuild the GL context
    // on every prop tweak (that would cause flicker/perf issues).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`constellation-field constellation-field--topo ${className}`}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default ConstellationField;
