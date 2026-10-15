import { Component, Suspense } from 'react';
import { useReducedMotion } from 'framer-motion';
import useInView from '../../hooks/useInView.js';

let webglSupport;
function supportsWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement('canvas');
      webglSupport = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Hosts a lazily loaded WebGL scene. The scene module is only requested once the
 * slot nears the viewport, renders `fallback` when WebGL is unavailable or fails,
 * and receives `animate` so it can stop its render loop while off-screen or when
 * the visitor prefers reduced motion.
 *
 *   <SceneSlot className="hero-scene" fallback={<CodeCard />}>
 *     {(animate) => <HeroScene animate={animate} />}
 *   </SceneSlot>
 */
export default function SceneSlot({ children, fallback = null, className = '', rootMargin }) {
  const reduceMotion = useReducedMotion();
  const { ref, inView, hasEntered } = useInView({ rootMargin });
  const canRender = hasEntered && supportsWebGL();

  return (
    <div ref={ref} className={`scene-holder ${className}`.trim()}>
      {hasEntered && !canRender && fallback}
      {canRender && (
        <SceneBoundary fallback={fallback}>
          <Suspense fallback={null}>{children(inView && !reduceMotion)}</Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
