import { Award, Calendar, GraduationCap } from 'lucide-react';
import { education } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import TiltCard from '../common/TiltCard.jsx';
import { Timeline, TimelineItem } from '../Experience/Experience.jsx';
import './Education.css';

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <Timeline className="education-timeline">
        {education.map((entry, i) => (
          <TimelineItem key={entry.degree} index={i}>
            <TiltCard className="card education-card" max={4}>
              <span className="icon-box education-icon">
                <GraduationCap size={24} aria-hidden="true" />
              </span>
              <div className="education-body">
                <h3>{entry.degree}</h3>
                <p className="education-institution">{entry.institution}</p>
              </div>
              <div className="education-side">
                <p className="education-duration">
                  <Calendar size={15} aria-hidden="true" />
                  {entry.duration}
                </p>
                {entry.score && (
                  <p className="education-score">
                    <Award size={16} aria-hidden="true" />
                    {entry.score}
                  </p>
                )}
              </div>
            </TiltCard>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
