import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useMediaQuery.js';
import './TiltCard.css';

const spring = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Card that tilts towards the pointer with a soft glow that follows the cursor.
 * Falls back to a static element on touch devices and for reduced motion.
 */
export default function TiltCard({ as = 'div', className = '', max = 6, children, ...props }) {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const rotateX = useSpring(rx, spring);
  const rotateY = useSpring(ry, spring);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, var(--glow), transparent 55%)`;

  const classes = `tilt-card ${className}`.trim();

  if (reduceMotion || !finePointer) {
    const Tag = as;
    return (
      <Tag className={classes} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as];

  const onPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <MotionTag
      className={`${classes} is-interactive`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...props}
    >
      <motion.span className="tilt-card-glow" style={{ background: glow }} aria-hidden="true" />
      {children}
    </MotionTag>
  );
}
