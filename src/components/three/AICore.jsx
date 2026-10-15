import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { NormalBlending } from 'three';
import useIsDark from '../../hooks/useIsDark.js';
import ParticleField from './ParticleField.jsx';
import { additive, getGlowTexture, palette } from './shared.js';

const RINGS = [
  { radius: 1.35, rotation: [Math.PI / 2.2, 0, 0], speed: 0.35 },
  { radius: 1.55, rotation: [Math.PI / 3, Math.PI / 4, 0], speed: -0.25 },
  { radius: 1.75, rotation: [Math.PI / 1.7, -Math.PI / 5, 0], speed: 0.18 },
];

function Core({ colors, isDark }) {
  const shell = useRef();
  const inner = useRef();
  const rings = useRef([]);

  useFrame((state, delta) => {
    shell.current.rotation.y += delta * 0.15;
    shell.current.rotation.x += delta * 0.05;
    inner.current.rotation.y -= delta * 0.25;
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
    inner.current.scale.setScalar(breathe);
    rings.current.forEach((ring, i) => {
      if (ring) ring.rotation.z += delta * RINGS[i].speed;
    });
  });

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial
          color={colors.node}
          metalness={0.4}
          roughness={0.3}
          emissive={colors.accent}
          emissiveIntensity={isDark ? 0.25 : 0.08}
          flatShading
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial color={colors.accent2} wireframe transparent opacity={isDark ? 0.16 : 0.22} />
      </mesh>
      <sprite scale={4}>
        <spriteMaterial
          map={getGlowTexture()}
          color={colors.accent}
          transparent
          opacity={isDark ? 0.5 : 0.22}
          depthWrite={false}
          blending={isDark ? additive : NormalBlending}
        />
      </sprite>
      {RINGS.map((ring, i) => (
        <mesh key={ring.radius} ref={(el) => (rings.current[i] = el)} rotation={ring.rotation}>
          <torusGeometry args={[ring.radius, 0.006, 6, 96]} />
          <meshBasicMaterial color={i === 1 ? colors.accent2 : colors.accent} transparent opacity={0.4} />
        </mesh>
      ))}
      <ParticleField count={90} radius={2.2} size={0.03} color={colors.particle} glow={isDark} speed={0.05} />
    </group>
  );
}

export default function AICore({ animate }) {
  const isDark = useIsDark();
  const colors = useMemo(() => palette(isDark), [isDark]);

  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <ambientLight intensity={isDark ? 0.5 : 0.9} />
      <directionalLight position={[-2, 3, 4]} intensity={1} />
      <pointLight position={[2, -1, 3]} intensity={14} color={colors.accent2} />
      <Core colors={colors} isDark={isDark} />
    </Canvas>
  );
}
