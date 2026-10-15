import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { ExtrudeGeometry, NormalBlending, Shape } from 'three';
import useIsDark from '../../hooks/useIsDark.js';
import { useIsCompact } from '../../hooks/useMediaQuery.js';
import { additive, damp, finishTexture, getGlowTexture, roundRect } from './shared.js';

const CARD_W = 3.37;
const CARD_H = 2.125;
const TEX_W = 1024;
const TEX_H = Math.round((TEX_W * CARD_H) / CARD_W);
const CORNER = (44 / TEX_W) * CARD_W;
const THICKNESS = 0.036;

function createBodyGeometry() {
  const w = CARD_W / 2;
  const h = CARD_H / 2;
  const r = CORNER;
  const shape = new Shape();
  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);
  const geometry = new ExtrudeGeometry(shape, { depth: THICKNESS, bevelEnabled: false, curveSegments: 6 });
  geometry.translate(0, 0, -THICKNESS / 2);
  return geometry;
}

// Illustrative numbers only; the first six digits stand in for the BIN.
const PAN_GROUPS = ['4821', '7390', '1254', '0042'];
const TOKEN_GROUPS = ['4900', '1182', '7731', '5509'];

function drawHighlight(ctx, x, y, w, h, label) {
  ctx.save();
  ctx.shadowColor = 'rgba(34, 211, 238, 0.9)';
  ctx.shadowBlur = 24;
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#5eead4';
  roundRect(ctx, x, y, w, h, 14);
  ctx.stroke();
  ctx.restore();

  ctx.font = "600 26px 'JetBrains Mono', ui-monospace, monospace";
  const lw = ctx.measureText(label).width + 28;
  const ly = y - 46;
  roundRect(ctx, x, ly, lw, 36, 18);
  ctx.fillStyle = 'rgba(94, 234, 212, 0.95)';
  ctx.fill();
  ctx.fillStyle = '#04201f';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + 14, ly + 19);
  ctx.textBaseline = 'alphabetic';
}

function drawChip(ctx, x, y) {
  const g = ctx.createLinearGradient(x, y, x + 130, y + 100);
  g.addColorStop(0, '#f8dc9a');
  g.addColorStop(0.5, '#d6a84e');
  g.addColorStop(1, '#f1cf86');
  roundRect(ctx, x, y, 130, 100, 16);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = 'rgba(90, 60, 10, 0.55)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x + 44, y);
  ctx.lineTo(x + 44, y + 100);
  ctx.moveTo(x + 86, y);
  ctx.lineTo(x + 86, y + 100);
  ctx.moveTo(x, y + 34);
  ctx.lineTo(x + 44, y + 34);
  ctx.moveTo(x, y + 66);
  ctx.lineTo(x + 44, y + 66);
  ctx.moveTo(x + 86, y + 34);
  ctx.lineTo(x + 130, y + 34);
  ctx.moveTo(x + 86, y + 66);
  ctx.lineTo(x + 130, y + 66);
  ctx.stroke();
}

function cardBase(ctx) {
  roundRect(ctx, 0, 0, TEX_W, TEX_H, 44);
  ctx.save();
  ctx.clip();
  const g = ctx.createLinearGradient(0, 0, TEX_W, TEX_H);
  g.addColorStop(0, '#07162e');
  g.addColorStop(0.55, '#0f3b73');
  g.addColorStop(1, '#0b6a86');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  // Fine guilloche-style arcs.
  ctx.strokeStyle = 'rgba(160, 220, 255, 0.07)';
  ctx.lineWidth = 2;
  for (let r = 120; r < 900; r += 38) {
    ctx.beginPath();
    ctx.arc(TEX_W * 0.92, TEX_H * 1.05, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Diagonal sheen.
  const sheen = ctx.createLinearGradient(0, 0, TEX_W, TEX_H * 0.6);
  sheen.addColorStop(0, 'rgba(255,255,255,0.10)');
  sheen.addColorStop(0.4, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, TEX_W, TEX_H);
}

function createFrontTexture(highlight) {
  const canvas = document.createElement('canvas');
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext('2d');
  cardBase(ctx);

  ctx.fillStyle = '#e8f3ff';
  ctx.font = '700 40px Inter, system-ui, sans-serif';
  ctx.fillText('ISSUER BANK', 70, 100);
  ctx.font = "500 24px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillStyle = 'rgba(232, 243, 255, 0.65)';
  ctx.fillText('DEBIT', 70, 140);

  // Contactless symbol.
  ctx.strokeStyle = 'rgba(232, 243, 255, 0.85)';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  [18, 36, 54].forEach((r) => {
    ctx.beginPath();
    ctx.arc(TEX_W - 130, 92, r, -Math.PI / 4, Math.PI / 4);
    ctx.stroke();
  });

  drawChip(ctx, 80, 210);

  const tokenized = highlight === 'Tokenization';
  const groups = tokenized ? TOKEN_GROUPS : PAN_GROUPS;
  ctx.font = "500 64px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillStyle = tokenized ? '#99f6e4' : '#f1f7ff';
  const panY = 430;
  const groupGap = 36;
  let x = 80;
  const starts = [];
  groups.forEach((group) => {
    starts.push(x);
    ctx.fillText(group, x, panY);
    x += ctx.measureText(group).width + groupGap;
  });
  const panEnd = x - groupGap;
  const charW = ctx.measureText('0').width;

  ctx.font = "500 22px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillStyle = 'rgba(232, 243, 255, 0.6)';
  ctx.fillText('CARDHOLDER', 80, 510);
  ctx.fillText('VALID THRU', 640, 510);
  ctx.font = "600 34px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillStyle = '#e8f3ff';
  ctx.fillText('VARSHITH VARALA', 80, 556);
  ctx.fillText('12/29', 640, 556);

  if (highlight === 'PAN') drawHighlight(ctx, 64, panY - 62, panEnd - 64 + 16, 84, 'PAN · 16 digits');
  if (highlight === 'BIN') drawHighlight(ctx, 64, panY - 62, starts[1] + charW * 2 - 64 + 2, 84, 'BIN · issuer');
  if (highlight === 'EMV') drawHighlight(ctx, 66, 196, 158, 128, 'EMV chip');
  if (tokenized) drawHighlight(ctx, 64, panY - 62, panEnd - 64 + 16, 84, 'Token ≠ PAN');

  ctx.restore();
  return finishTexture(canvas);
}

function createBackTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext('2d');
  cardBase(ctx);

  ctx.fillStyle = '#05070c';
  ctx.fillRect(0, 70, TEX_W, 110);
  ctx.font = "500 20px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillStyle = 'rgba(232, 243, 255, 0.55)';
  ctx.fillText('MAGNETIC STRIPE', 70, 220);

  roundRect(ctx, 70, 250, 640, 80, 10);
  ctx.fillStyle = 'rgba(240, 246, 255, 0.92)';
  ctx.fill();
  roundRect(ctx, 730, 250, 150, 80, 10);
  ctx.fillStyle = '#f8fafc';
  ctx.fill();
  ctx.font = "600 34px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillStyle = '#0b1324';
  ctx.fillText('•••', 772, 302);
  ctx.font = "500 20px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillStyle = 'rgba(232, 243, 255, 0.6)';
  ctx.fillText('CVV', 778, 360);
  ctx.fillText('Illustrative card for the portfolio · not a real account', 70, 560);

  ctx.restore();
  return finishTexture(canvas);
}

function Card({ highlight, flipped, animate }) {
  const group = useRef();
  const [hovered, setHovered] = useState(false);
  const front = useMemo(() => createFrontTexture(highlight), [highlight]);
  const back = useMemo(() => createBackTexture(), []);
  const body = useMemo(() => createBodyGeometry(), []);
  useEffect(() => () => front.dispose(), [front]);
  useEffect(() => () => back.dispose(), [back]);
  useEffect(() => () => body.dispose(), [body]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    const baseY = flipped ? Math.PI : 0;
    const tiltY = hovered ? state.pointer.x * 0.35 : Math.sin(t * 0.5) * 0.18;
    const tiltX = hovered ? -state.pointer.y * 0.25 : Math.sin(t * 0.35) * 0.06 - 0.08;
    g.rotation.y = damp(g.rotation.y, baseY + tiltY, 4, delta);
    g.rotation.x = damp(g.rotation.x, tiltX, 4, delta);
  });

  return (
    <Float enabled={animate} speed={1.4} floatIntensity={0.4} rotationIntensity={0}>
      <group
        ref={group}
        rotation={[-0.08, flipped ? Math.PI : 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh geometry={body}>
          <meshStandardMaterial color="#0b2a52" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, THICKNESS / 2 + 0.001]}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshStandardMaterial map={front} transparent metalness={0.25} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0, -THICKNESS / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshStandardMaterial map={back} transparent metalness={0.25} roughness={0.45} />
        </mesh>
      </group>
    </Float>
  );
}

export default function PaymentCard3D({ animate, highlight, flipped }) {
  const isDark = useIsDark();
  const compact = useIsCompact();

  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={compact ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 4.9], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <ambientLight intensity={isDark ? 0.9 : 1.3} />
      <directionalLight position={[2, 3, 5]} intensity={1.6} />
      <pointLight position={[-3, -1, 3]} intensity={18} color="#22d3ee" />
      <sprite position={[0, 0, -1]} scale={[7, 5, 1]}>
        <spriteMaterial
          map={getGlowTexture()}
          color={isDark ? '#2b8cff' : '#93c5fd'}
          transparent
          opacity={isDark ? 0.35 : 0.5}
          depthWrite={false}
          blending={isDark ? additive : NormalBlending}
        />
      </sprite>
      <Card highlight={highlight} flipped={flipped} animate={animate} />
    </Canvas>
  );
}
