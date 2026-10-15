import { skillGroups } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import TiltCard from '../common/TiltCard.jsx';
import Icon from '../common/Icon.jsx';
import './Skills.css';

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technical toolkit"
      intro="The languages, frameworks and domain knowledge I use to build and test backend systems."
      alt
    >
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} className="skills-grid-item" delay={(i % 3) * 0.06}>
            <TiltCard className="card skill-card">
              <div className="skill-card-header tilt-pop">
                <span className="icon-box">
                  <Icon name={group.icon} size={20} />
                </span>
                <h3>{group.title}</h3>
                <span className="skill-card-count" aria-hidden="true">
                  {String(group.skills.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="skill-tags" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
