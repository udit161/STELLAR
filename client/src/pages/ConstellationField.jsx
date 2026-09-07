/**
 * ConstellationField — Interface Lines & Topographic Field Canvas Animation
 * Renders faint interface line-fields or organic contour bands.
 */

import { useEffect, useRef } from "react";

// Simple seeded noise implementation for topo-field
function createNoise() {
  const perm = new Uint8Array(512);
  const grad = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];

  for (let i = 0; i < 256; i++) perm[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a, b, t) { return a + t * (b - a); }
  function dot2(g, x, y) { return g[0] * x + g[1] * y; }

  return function noise2D(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);

    const aa = perm[perm[X] + Y] % 8;
    const ab = perm[perm[X] + Y + 1] % 8;
    const ba = perm[perm[X + 1] + Y] % 8;
    const bb = perm[perm[X + 1] + Y + 1] % 8;

    return lerp(
      lerp(dot2(grad[aa], xf, yf), dot2(grad[ba], xf - 1, yf), u),
      lerp(dot2(grad[ab], xf, yf - 1), dot2(grad[bb], xf - 1, yf - 1), u),
      v
    );
  };
}

function fbm(noise, x, y, octaves = 4) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1.0;
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise(x * frequency, y * frequency);
    frequency *= 2.04;
    amplitude *= 0.52;
  }
  return value;
}

export function ConstellationField({
  variant = "interface-lines",
  mode = "dark",
  speed = 1.0,
  size = 1.0,
  length = 1.0,
  density = 1.0,
  opacity = 1.0,
  hue = 0,
  saturation = 1.0,
  brightness = 1.0,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const noiseRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Interface lines particles state
    const particleCount = Math.floor(65 * density);
    const particles = [];

    function initParticles(w, h) {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4 * speed,
          vy: (Math.random() - 0.5) * 0.4 * speed,
          radius: (1.2 + Math.random() * 1.5) * size,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.floor(canvas.clientWidth * dpr);
      height = Math.floor(canvas.clientHeight * dpr);
      canvas.width = width;
      canvas.height = height;

      if (variant === "interface-lines") {
        initParticles(width, height);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    // Noise generator for topo-field
    if (variant === "topo-field" && !noiseRef.current) {
      noiseRef.current = createNoise();
    }

    let lastTime = performance.now();

    function renderInterfaceLines(now) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Background color base
      const isDark = mode === "dark";
      ctx.fillStyle = isDark ? "#02040a" : "#f8fafc";
      ctx.fillRect(0, 0, width, height);

      // Color hsl setup
      const baseHue = (210 + hue) % 360;
      const baseSat = Math.floor(70 * saturation);
      const baseLight = isDark ? Math.floor(65 * brightness) : Math.floor(35 * brightness);

      const maxDist = 140 * length;
      const maxDistSq = maxDist * maxDist;

      // Update particle positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * speed * (dt * 60);
        p.y += p.vy * speed * (dt * 60);
        p.pulse += dt * 1.5 * speed;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      // Draw faint interface connecting lines
      ctx.lineWidth = 1.0;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.35 * opacity;

            ctx.strokeStyle = `hsla(${baseHue}, ${baseSat}%, ${baseLight}%, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes/points with subtle glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulseAlpha = (0.5 + 0.5 * Math.sin(p.pulse)) * opacity;

        // Outer faint glow
        ctx.fillStyle = `hsla(${baseHue}, ${baseSat}%, ${baseLight}%, ${0.15 * pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Inner solid point
        ctx.fillStyle = `hsla(${baseHue}, ${baseSat}%, ${baseLight + 15}%, ${0.8 * pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(renderInterfaceLines);
    }

    // Render topographic variant if specified
    const startTime = performance.now();
    function renderTopoField() {
      const elapsed = (performance.now() - startTime) / 1000;
      const t = elapsed * speed * 0.05;
      const noise = noiseRef.current || createNoise();

      const RENDER_SCALE = 0.25;
      const renderW = Math.max(1, Math.floor(width * RENDER_SCALE));
      const renderH = Math.max(1, Math.floor(height * RENDER_SCALE));

      const offscreen = document.createElement("canvas");
      offscreen.width = renderW;
      offscreen.height = renderH;
      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        const imgData = offCtx.createImageData(renderW, renderH);
        const data = imgData.data;
        const aspect = renderW / renderH;
        const bands = 12 + density * 8;

        for (let py = 0; py < renderH; py++) {
          for (let px = 0; px < renderW; px++) {
            const u = px / renderW;
            const v = py / renderH;
            const cx = (u - 0.5) * aspect;
            const cy = v - 0.5;

            const scale = 3.0;
            const sx = cx * scale + t * 0.45;
            const sy = cy * scale + t * 0.3;

            const wx = fbm(noise, sx + 2.4 + t * 0.1, sy + 2.4 + t * 0.1, 3);
            const wy = fbm(noise, sx - 1.8 - t * 0.08, sy - 1.8 - t * 0.08, 3);
            const elevation = fbm(noise, sx + wx * 0.55, sy + wy * 0.55, 4);

            const bandPos = (elevation + 1) * 0.5 * bands;
            const lineDist = Math.abs((bandPos % 1) - 0.5);
            const contour = Math.max(0, 1 - lineDist / 0.12);
            const contourSmooth = contour * contour;

            const fillShade = (elevation + 1) * 0.5;
            const dist = Math.sqrt(cx * cx + cy * cy);
            const vig = Math.max(0, Math.min(1, 1 - (dist - 0.25) / 0.95));

            const bgR = 2, bgG = 4, bgB = 10;
            const r = (bgR + contourSmooth * 235) * vig;
            const g = (bgG + contourSmooth * 184) * vig;
            const b = (bgB + contourSmooth * 255) * vig;

            const idx = (py * renderW + px) * 4;
            data[idx] = Math.min(255, Math.max(0, r));
            data[idx + 1] = Math.min(255, Math.max(0, g));
            data[idx + 2] = Math.min(255, Math.max(0, b));
            data[idx + 3] = Math.floor(opacity * 255);
          }
        }

        offCtx.putImageData(imgData, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(offscreen, 0, 0, width, height);
      }

      rafRef.current = requestAnimationFrame(renderTopoField);
    }

    if (variant === "interface-lines") {
      rafRef.current = requestAnimationFrame(renderInterfaceLines);
    } else {
      rafRef.current = requestAnimationFrame(renderTopoField);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, [variant, mode, speed, size, length, density, opacity, hue, saturation, brightness]);

  return (
    <canvas
      ref={canvasRef}
      className="constellation-field"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    />
  );
}

export default ConstellationField;
