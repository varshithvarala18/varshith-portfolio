import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { NormalBlending } from 'three';
import useIsDark from '../../hooks/useIsDark.js';
import { useIsCompact } from '../../hooks/useMediaQuery.js';
import ParticleField from './ParticleField.jsx';
import {
  additive,
  createLabelTexture,
  damp,
  finishTexture,
  getGlowTexture,
  palette,
  pointer,
  roundRect,
  trackPointer,
} from './shared.js';

const TECH = ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'PostgreSQL', 'Cloud / API'];
const ORBIT_RADIUS = 2.15;

// Snippets for the floating panels, echoing the code shown in the original hero card.
const PANELS = [
  {
    title: 'LoanController.java',
    lines: [
      [['#f5b84f', '@RestController']],
      [['#f5b84f', '@RequestMapping'], ['#a5b0c4', '('], ['#86efac', '"/api/loans"'], ['#a5b0c4', ')']],
      [['#e879f9', 'public class '], ['#7cc8ff', 'LoanController'], ['#a5b0c4', ' {']],
      [['#a5b0c4', '  '], ['#f5b84f', '@PostMapping']],
      [['#a5b0c4', '  '], ['#7cc8ff', 'ResponseEntity'], ['#a5b0c4', ' create(…)']],
    ],
    position: [-2.25, 1.95, -1.4],
    rotation: [0, 0.38, 0],
  },
  {
    title: 'POST /api/loans',
    lines: [
      [['#86efac', '201 Created'], ['#8290a8', '  · 48 ms']],
      [['#a5b0c4', '{']],
      [['#7cc8ff', '  "loanId"'], ['#a5b0c4', ': '], ['#f5b84f', '1042'], ['#a5b0c4', ',']],
      [['#7cc8ff', '  "status"'], ['#a5b0c4', ': '], ['#86efac', '"ACTIVE"']],
      [['#a5b0c4', '}']],
    ],
    position: [2.15, -1.8, -0.8],
    rotation: [0, -0.4, 0],
  },
  {
    title: 'PostgreSQL',
    lines: [
      [['#e879f9', 'SELECT '], ['#a5b0c4', 'id, amount']],
      [['#e879f9', 'FROM '], ['#7cc8ff', 'loans']],
      [['#e879f9', 'WHERE '], ['#a5b0c4', 'status = '], ['#86efac', "'ACTIVE'"]],
    ],
    position: [1.9, 1.75, -2.4],
    rotation: [0, -0.3, 0],
  },
];

function createPanelTexture({ title, lines }, isDark) {
  const w = 560;
  const h = 300;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  roundRect(ctx, 4, 4, w - 8, h - 8, 22);
  ctx.fillStyle = isDark ? 'rgba(10, 17, 30, 0.82)' : 'rgba(255, 255, 255, 0.9)';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = isDark ? 'rgba(79, 184, 255, 0.35)' : 'rgba(37, 99, 235, 0.3)';
  ctx.stroke();

  ['#f87171', '#fbbf24', '#4ade80'].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(32 + i * 22, 34, 6, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.globalAlpha = 0.8;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  ctx.font = "500 20px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillStyle = isDark ? '#8290a8' : '#5c6a82';
  ctx.fillText(title, 108, 41);
  ctx.fillRect(20, 62, w - 40, 1);

  ctx.font = "500 23px 'JetBrains Mono', ui-monospace, monospace";
  lines.forEach((tokens, row) => {
    let x = 30;
    tokens.forEach(([color, text]) => {
      ctx.fillStyle = isDark ? color : '#1e3a8a';
      ctx.fillText(text, x, 104 + row * 38);
      x += ctx.measureText(text).width;
    });
  });

  return finishTexture(canvas);
}

function CodePanel({ panel, isDark, animate }) {
  const texture = useMemo(() => createPanelTexture(panel, isDark), [panel, isDark]);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <Float enabled={animate} speed={1.1} floatIntensity={0.35} rotationIntensity={0.12}>
      <mesh position={panel.position} rotation={panel.rotation}>
        <planeGeometry args={[1.95, 1.045]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </Float>
  );
}

function TechNode({ label, angle, colors }) {
  const { texture, aspect } = useMemo(() => createLabelTexture(label, colors, { fontSize: 38 }), [label, colors]);
  useEffect(() => () => texture.dispose(), [texture]);

  const x = Math.cos(angle) * ORBIT_RADIUS;
  const z = Math.sin(angle) * ORBIT_RADIUS;
  const labelHeight = 0.25;

  return (
    <group position={[x, 0, z]}>
      <mesh>
        <octahedronGeometry args={[0.11, 0]} />
        <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.6} flatShading />
      </mesh>
      <sprite position={[0, 0.34, 0]} scale={[labelHeight * aspect, labelHeight, 1]}>
        <spriteMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
      </sprite>
    </group>
  );
}

function Architecture({ colors, isDark, compact, animate }) {
  const rig = useRef();
  const orbit = useRef();
  const core = useRef();
  const pulses = useRef([]);
  const intro = useRef(animate ? 0 : 1);

  const angles = useMemo(() => TECH.map((_, i) => (i / TECH.length) * Math.PI * 2), []);
  const linePositions = useMemo(() => {
    const arr = new Float32Array(TECH.length * 6);
    angles.forEach((a, i) => {
      arr.set([0, 0, 0, Math.cos(a) * ORBIT_RADIUS, 0, Math.sin(a) * ORBIT_RADIUS], i * 6);
    });
    return arr;
  }, [angles]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    intro.current = damp(intro.current, 1, 2.2, delta);
    const s = 0.82 + 0.18 * intro.current;
    rig.current.scale.setScalar(s);

    // Gentle parallax towards the pointer plus a slow camera drift.
    rig.current.rotation.x = damp(rig.current.rotation.x, 0.32 - pointer.y * 0.12, 3, delta);
    rig.current.rotation.y = damp(rig.current.rotation.y, pointer.x * 0.22, 3, delta);
    state.camera.position.x = damp(state.camera.position.x, pointer.x * 0.35 + Math.sin(t * 0.15) * 0.15, 2, delta);
    state.camera.position.y = damp(state.camera.position.y, 0.35 + pointer.y * 0.2, 2, delta);
    state.camera.lookAt(0, 0, 0);

    orbit.current.rotation.y += delta * 0.12;
    core.current.rotation.y += delta * 0.2;
    core.current.rotation.x = Math.sin(t * 0.3) * 0.15;

    // Requests travel from each technology node into the core.
    pulses.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = (t * 0.32 + i / TECH.length) % 1;
      const a = angles[i];
      mesh.position.set(Math.cos(a) * ORBIT_RADIUS * (1 - p), 0, Math.sin(a) * ORBIT_RADIUS * (1 - p));
      mesh.scale.setScalar(Math.sin(p * Math.PI) * 1 + 0.2);
    });
  });

  const blending = isDark ? additive : NormalBlending;

  return (
    <group ref={rig} rotation={[0.32, 0, 0]}>
      {/* Core service node */}
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshStandardMaterial
            color={colors.node}
            metalness={0.45}
            roughness={0.35}
            emissive={colors.accent}
            emissiveIntensity={isDark ? 0.18 : 0.05}
            flatShading
          />
        </mesh>
        <mesh scale={1.38}>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshBasicMaterial color={colors.accent2} wireframe transparent opacity={isDark ? 0.22 : 0.3} />
        </mesh>
      </group>
      <sprite scale={3.2}>
        <spriteMaterial
          map={getGlowTexture()}
          color={colors.accent}
          transparent
          opacity={isDark ? 0.55 : 0.25}
          depthWrite={false}
          blending={blending}
        />
      </sprite>

      <group ref={orbit}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[ORBIT_RADIUS, 0.006, 6, 120]} />
          <meshBasicMaterial color={colors.accent} transparent opacity={0.35} />
        </mesh>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={colors.line} transparent opacity={isDark ? 0.28 : 0.35} />
        </lineSegments>

        {TECH.map((label, i) => (
          <TechNode key={label} label={label} angle={angles[i]} colors={colors} />
        ))}

        {TECH.map((label, i) => (
          <mesh key={`pulse-${label}`} ref={(el) => (pulses.current[i] = el)}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={colors.accent2} toneMapped={false} />
          </mesh>
        ))}
      </group>

      <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[2.85, 0.004, 6, 120]} />
        <meshBasicMaterial color={colors.accent2} transparent opacity={0.18} />
      </mesh>

      {!compact && <ParticleField count={180} radius={5.5} color={colors.particle} glow={isDark} opacity={isDark ? 0.6 : 0.35} />}
      {compact && <ParticleField count={60} radius={4.5} color={colors.particle} glow={isDark} opacity={isDark ? 0.6 : 0.35} />}
    </group>
  );
}

export default function HeroScene({ animate }) {
  const isDark = useIsDark();
  const compact = useIsCompact();
  const colors = useMemo(() => palette(isDark), [isDark]);

  useEffect(trackPointer, []);

  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={compact ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.35, 8.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <ambientLight intensity={isDark ? 0.45 : 0.9} />
      <directionalLight position={[-3, 3, 4]} intensity={isDark ? 0.9 : 1.2} />
      <pointLight position={[3, 2, 3]} intensity={25} color={colors.accent} />

      <Architecture colors={colors} isDark={isDark} compact={compact} animate={animate} />
      {(compact ? PANELS.slice(0, 1) : PANELS).map((panel) => (
        <CodePanel key={panel.title} panel={panel} isDark={isDark} animate={animate} />
      ))}
    </Canvas>
  );
}
