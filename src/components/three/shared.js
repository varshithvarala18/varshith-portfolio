import { AdditiveBlending, CanvasTexture, SRGBColorSpace } from 'three';

/*
 * Small helpers shared by the 3D scenes. Text is drawn once onto canvas textures
 * instead of loading font files, which keeps the scenes light.
 */

export const palette = (isDark) =>
  isDark
    ? {
        accent: '#4fb8ff',
        accent2: '#22d3ee',
        node: '#0f1a2b',
        line: '#4fb8ff',
        text: '#e8eef8',
        labelBg: 'rgba(9, 15, 26, 0.86)',
        labelBorder: 'rgba(79, 184, 255, 0.45)',
        particle: '#8fd3ff',
      }
    : {
        accent: '#2563eb',
        accent2: '#0e7490',
        node: '#dbe7fb',
        line: '#2563eb',
        text: '#0b1324',
        labelBg: 'rgba(255, 255, 255, 0.92)',
        labelBorder: 'rgba(37, 99, 235, 0.4)',
        particle: '#2563eb',
      };

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export { roundRect };

export function finishTexture(canvas) {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Pill-shaped text label. Returns the texture and its width/height ratio. */
export function createLabelTexture(text, colors, { fontSize = 40, mono = false } = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const font = `600 ${fontSize}px ${mono ? "'JetBrains Mono', ui-monospace, monospace" : "Inter, system-ui, sans-serif"}`;
  ctx.font = font;
  const padX = fontSize * 0.7;
  const height = Math.round(fontSize * 2);
  const width = Math.ceil(ctx.measureText(text).width + padX * 2);
  canvas.width = width + 8;
  canvas.height = height + 8;

  ctx.font = font;
  roundRect(ctx, 4, 4, width, height, height / 2);
  ctx.fillStyle = colors.labelBg;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = colors.labelBorder;
  ctx.stroke();
  ctx.fillStyle = colors.text;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);

  return { texture: finishTexture(canvas), aspect: canvas.width / canvas.height };
}

/** Soft radial glow used for halos behind glowing nodes. */
let glowTexture;
export function getGlowTexture() {
  if (!glowTexture) {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.45)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    glowTexture = finishTexture(canvas);
  }
  return glowTexture;
}

export const additive = AdditiveBlending;

/*
 * Window-level pointer position in normalised device coordinates (-1..1).
 * One passive listener serves every scene, so parallax works even when the
 * pointer is over the page text rather than the canvas.
 */
export const pointer = { x: 0, y: 0 };
let listening = false;
export function trackPointer() {
  if (listening || typeof window === 'undefined') return;
  listening = true;
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}

/** Frame-rate independent exponential smoothing. */
export const damp = (current, target, lambda, delta) =>
  current + (target - current) * (1 - Math.exp(-lambda * delta));
