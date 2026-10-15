import { motion, useReducedMotion } from 'framer-motion';
import { about, developerCard, profile } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import TiltCard from '../common/TiltCard.jsx';
import Icon from '../common/Icon.jsx';
import './About.css';

function DeveloperCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="dev-card-float"
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
    >
      <TiltCard className="card dev-card" max={10}>
        <div className="dev-card-top tilt-pop">
          <span className="dev-card-avatar" aria-hidden="true">
            {profile.name.charAt(0)}
          </span>
          <div>
            <p className="dev-card-name">{profile.name}</p>
            <p className="dev-card-role">{developerCard.role}</p>
          </div>
        </div>

        <div className="dev-card-stat tilt-pop">
          <Icon name="Briefcase" size={16} />
          <span>{developerCard.experience}</span>
        </div>

        <ul className="dev-card-stack tilt-pop" aria-label="Core stack">
          {developerCard.stack.map((item) => (
            <li key={item} className="tag tag-accent">
              {item}
            </li>
          ))}
        </ul>

        <pre className="dev-card-code" aria-hidden="true">
          <code>
            <span className="tok-kw">class</span> <span className="tok-type">Engineer</span> {'{'}
            {'\n  '}focus = <span className="tok-str">&quot;backend&quot;</span>;{'\n'}
            {'}'}
          </code>
        </pre>
      </TiltCard>
      <div className="dev-card-shadow" aria-hidden="true" />
    </motion.div>
  );
}

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Backend engineer with a payments focus">
      <div className="about-grid">
        <Reveal className="about-text">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal className="about-visual" delay={0.1}>
          <DeveloperCard />
        </Reveal>
      </div>

      <Reveal as="ul" className="about-highlights" delay={0.05}>
        {about.highlights.map((item) => (
          <li key={item.label} className="card about-highlight">
            <span className="icon-box">
              <Icon name={item.icon} size={20} />
            </span>
            <div>
              <p className="about-highlight-label">{item.label}</p>
              <p className="about-highlight-value">{item.value}</p>
            </div>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
