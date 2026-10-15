import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { NormalBlending } from 'three';
import { additive } from './shared.js';

/**
 * Sparse drifting dust. Positions are generated once; motion is a single
 * group rotation per frame, so the cost stays flat regardless of count.
 */
export default function ParticleField({ count = 160, radius = 6, size = 0.035, color = '#8fd3ff', speed = 0.02, opacity = 0.7, glow = true }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Uniform-ish distribution inside a flattened sphere.
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.7;
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={glow ? additive : NormalBlending}
        sizeAttenuation
      />
    </points>
  );
}
