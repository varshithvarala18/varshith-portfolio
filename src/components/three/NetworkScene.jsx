import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { NormalBlending } from 'three';
import useIsDark from '../../hooks/useIsDark.js';
import { useIsCompact } from '../../hooks/useMediaQuery.js';
import ParticleField from './ParticleField.jsx';
import { additive, createLabelTexture, damp, getGlowTexture, palette, pointer, trackPointer } from './shared.js';

const RADIUS = 2.45;

function Label({ text, colors, y, height, mono = true }) {
  const { texture, aspect } = useMemo(() => createLabelTexture(text, colors, { fontSize: 40, mono }), [text, colors, mono]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <sprite position={[0, y, 0]} scale={[height * aspect, height, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

function ModuleNode({ code, position, active, colors, isDark, onHover, onSelect }) {
  const mesh = useRef();
  const halo = useRef();

  useFrame((_, delta) => {
    const target = active ? 1.45 : 1;
    mesh.current.scale.setScalar(damp(mesh.current.scale.x, target, 8, delta));
    halo.current.material.opacity = damp(halo.current.material.opacity, active ? 0.7 : 0.18, 6, delta);
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.15, 1]} />
        <meshStandardMaterial
          color={active ? colors.accent2 : colors.accent}
          emissive={active ? colors.accent2 : colors.accent}
          emissiveIntensity={active ? 0.9 : 0.35}
          flatShading
        />
      </mesh>
      <sprite ref={halo} scale={1.1}>
        <spriteMaterial
          map={getGlowTexture()}
          color={colors.accent}
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={isDark ? additive : NormalBlending}
        />
      </sprite>
      {/* Larger invisible hit area makes small nodes easy to hover. */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(code);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = '';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(code);
        }}
      >
        <sphereGeometry args={[0.38, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Label text={code} colors={colors} y={0.42} height={active ? 0.34 : 0.28} />
    </group>
  );
}

function Network({ modules, activeCode, spinPaused, onHover, onSelect, colors, isDark, compact }) {
  const rig = useRef();
  const spin = useRef();
  const pulses = useRef([]);

  const positions = useMemo(
    () =>
      modules.map((_, i) => {
        const a = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
        return [Math.cos(a) * RADIUS, Math.sin(i * 1.7) * 0.25, Math.sin(a) * RADIUS];
      }),
    [modules]
  );

  const lineGeometries = useMemo(
    () => positions.map((p) => new Float32Array([0, 0, 0, ...p])),
    [positions]
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Pause the slow spin while a module is hovered so it stays put.
    if (!spinPaused) spin.current.rotation.y += delta * 0.08;
    rig.current.rotation.x = damp(rig.current.rotation.x, -pointer.y * 0.08, 3, delta);
    rig.current.rotation.z = damp(rig.current.rotation.z, pointer.x * 0.05, 3, delta);

    pulses.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = (t * 0.28 + i / positions.length) % 1;
      const [x, y, z] = positions[i];
      mesh.position.set(x * p, y * p, z * p);
    });
  });

  return (
    <group ref={rig}>
      <group ref={spin}>
        {/* Hub */}
        <mesh>
          <icosahedronGeometry args={[0.46, 1]} />
          <meshStandardMaterial
            color={colors.node}
            metalness={0.45}
            roughness={0.35}
            emissive={colors.accent}
            emissiveIntensity={isDark ? 0.2 : 0.06}
            flatShading
          />
        </mesh>
        <mesh scale={1.45}>
          <icosahedronGeometry args={[0.46, 1]} />
          <meshBasicMaterial color={colors.accent2} wireframe transparent opacity={0.22} />
        </mesh>
        <sprite scale={2.6}>
          <spriteMaterial
            map={getGlowTexture()}
            color={colors.accent}
            transparent
            opacity={isDark ? 0.45 : 0.2}
            depthWrite={false}
            blending={isDark ? additive : NormalBlending}
          />
        </sprite>
        <Label text="VisionPLUS" colors={colors} y={-0.95} height={0.32} mono={false} />

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[RADIUS, 0.005, 6, 120]} />
          <meshBasicMaterial color={colors.accent} transparent opacity={0.2} />
        </mesh>

        {modules.map((mod, i) => {
          const active = mod.code === activeCode;
          return (
            <group key={mod.code}>
              <line>
                <bufferGeometry>
                  <bufferAttribute attach="attributes-position" args={[lineGeometries[i], 3]} />
                </bufferGeometry>
                <lineBasicMaterial color={active ? colors.accent2 : colors.line} transparent opacity={active ? 0.9 : 0.25} />
              </line>
              <mesh ref={(el) => (pulses.current[i] = el)}>
                <sphereGeometry args={[0.035, 8, 8]} />
                <meshBasicMaterial color={colors.accent2} toneMapped={false} />
              </mesh>
              <ModuleNode
                code={mod.code}
                position={positions[i]}
                active={active}
                colors={colors}
                isDark={isDark}
                onHover={onHover}
                onSelect={onSelect}
              />
            </group>
          );
        })}
      </group>
      <ParticleField
        count={compact ? 50 : 120}
        radius={5}
        color={colors.particle}
        glow={isDark}
        opacity={isDark ? 0.5 : 0.3}
        speed={0.015}
      />
    </group>
  );
}

export default function NetworkScene({ animate, modules, activeCode, spinPaused, onHover, onSelect }) {
  const isDark = useIsDark();
  const compact = useIsCompact();
  const colors = useMemo(() => palette(isDark), [isDark]);

  useEffect(trackPointer, []);
  useEffect(
    () => () => {
      document.body.style.cursor = '';
    },
    []
  );

  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={compact ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 2.6, 6.4], fov: compact ? 46 : 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onPointerMissed={() => onHover(null)}
      aria-hidden="true"
    >
      <ambientLight intensity={isDark ? 0.5 : 0.9} />
      <directionalLight position={[-3, 4, 4]} intensity={1} />
      <pointLight position={[0, 2, 0]} intensity={12} color={colors.accent} />
      <group position={[0, -0.25, 0]}>
        <Network
          modules={modules}
          activeCode={activeCode}
          spinPaused={spinPaused}
          onHover={onHover}
          onSelect={onSelect}
          colors={colors}
          isDark={isDark}
          compact={compact}
        />
      </group>
    </Canvas>
  );
}
