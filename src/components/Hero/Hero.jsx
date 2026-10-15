import { lazy } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { contact, profile } from '../../data/portfolio.js';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons.jsx';
import SceneSlot from '../common/SceneSlot.jsx';
import CodeCard from './CodeCard.jsx';
import './Hero.css';

const HeroScene = lazy(() => import('../three/HeroScene.jsx'));

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const fade = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: 'easeOut', delay },
        };

  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-content">
          <motion.p className="hero-status" {...fade(0)}>
            <span className="hero-status-dot" aria-hidden="true" />
            Open to backend engineering opportunities
          </motion.p>

          <motion.h1 id="hero-heading" className="hero-title" {...fade(0.05)}>
            Hi, I&apos;m <span className="hero-name">{profile.name}</span>
          </motion.h1>

          <motion.p className="hero-role" {...fade(0.1)}>
            {profile.role}
          </motion.p>
          <motion.p className="hero-stack" {...fade(0.12)}>
            {profile.stack}
          </motion.p>

          <motion.p className="hero-summary" {...fade(0.16)}>
            {profile.summary}
          </motion.p>

          <motion.div className="hero-actions" {...fade(0.2)}>
            <a href="#projects" className="btn btn-primary">
              View Projects
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={profile.resume} download="Varshith_Varala_Resume.pdf" className="btn btn-secondary">
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Mail size={16} aria-hidden="true" />
              Contact Me
            </a>
          </motion.div>

          <motion.div className="hero-meta" {...fade(0.24)}>
            <span className="hero-location">
              <MapPin size={16} aria-hidden="true" />
              {profile.location}
            </span>
            <span className="hero-divider" aria-hidden="true" />
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <GithubIcon size={18} />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <LinkedinIcon size={18} />
            </a>
            <a href={`mailto:${contact.email}`} aria-label="Send an email">
              <Mail size={18} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
              })}
        >
          <div className="hero-visual-glow" aria-hidden="true" />
          <SceneSlot className="hero-scene" rootMargin="0px" fallback={<CodeCard />}>
            {(animate) => <HeroScene animate={animate} />}
          </SceneSlot>
        </motion.div>
      </div>
    </section>
  );
}
