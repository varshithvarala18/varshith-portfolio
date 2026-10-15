import { skillGroups } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
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
          <Reveal key={group.title} className="card card-hover skill-card" delay={(i % 3) * 0.05}>
            <div className="skill-card-header">
              <span className="icon-box">
                <Icon name={group.icon} size={20} />
              </span>
              <h3>{group.title}</h3>
            </div>
            <ul className="skill-tags" aria-label={`${group.title} skills`}>
              {group.skills.map((skill) => (
                <li key={skill} className="tag">
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
