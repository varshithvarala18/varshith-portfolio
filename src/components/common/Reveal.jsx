import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fades content up once when it scrolls into view.
 * Renders statically for users who prefer reduced motion.
 */
export default function Reveal({ children, delay = 0, as = 'div', className, ...props }) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
