import { Award, GraduationCap } from 'lucide-react';
import { education } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import './Education.css';

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <Reveal className="card education-card">
        <span className="icon-box education-icon">
          <GraduationCap size={24} aria-hidden="true" />
        </span>
        <div className="education-body">
          <h3>{education.degree}</h3>
          <p className="education-institution">{education.institution}</p>
        </div>
        <p className="education-score">
          <Award size={16} aria-hidden="true" />
          {education.score}
        </p>
      </Reveal>
    </Section>
  );
}
