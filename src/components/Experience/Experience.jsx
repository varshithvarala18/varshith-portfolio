import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Building2, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { experience } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import TiltCard from '../common/TiltCard.jsx';
import './Experience.css';

/**
 * Vertical timeline whose line draws itself as the section scrolls into view.
 * Shared with the Education section.
 */
export function Timeline({ className = '', children }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={`timeline-wrap ${className}`.trim()}>
      <span className="timeline-track" aria-hidden="true">
        <motion.span className="timeline-progress" style={reduceMotion ? undefined : { scaleY: progress }} />
      </span>
      <ol className="timeline">{children}</ol>
    </div>
  );
}

export function TimelineItem({ index = 0, children }) {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32, rotateX: 12 },
        whileInView: { opacity: 1, y: 0, rotateX: 0 },
        viewport: { once: true, margin: '0px 0px -80px 0px' },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 },
      };

  return (
    <motion.li className="timeline-item" {...motionProps}>
      <span className="timeline-marker" aria-hidden="true">
        <span className="timeline-marker-core" />
      </span>
      {children}
    </motion.li>
  );
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I work">
      <Timeline>
        {experience.map((job, i) => (
          <TimelineItem key={`${job.company}-${job.role}`} index={i}>
            <TiltCard as="article" className="card experience-card" max={3}>
              <header className="experience-header">
                <div>
                  <h3 className="experience-role">{job.role}</h3>
                  <p className="experience-company">
                    <Building2 size={16} aria-hidden="true" />
                    {job.company}
                  </p>
                </div>
                <div className="experience-meta">
                  <span>
                    <Calendar size={15} aria-hidden="true" />
                    {job.duration}
                  </span>
                  <span>
                    <MapPin size={15} aria-hidden="true" />
                    {job.location}
                  </span>
                </div>
              </header>

              <p className="experience-summary">{job.summary}</p>

              <ul className="experience-points">
                {job.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul className="experience-tech" aria-label="Technologies used">
                {job.tech.map((t) => (
                  <li key={t} className="tag tag-accent">
                    {t}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
