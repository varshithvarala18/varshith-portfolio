import { Building2, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { experience } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import './Experience.css';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I work">
      <ol className="timeline">
        {experience.map((job) => (
          <Reveal as="li" key={`${job.company}-${job.role}`} className="timeline-item">
            <span className="timeline-marker" aria-hidden="true" />
            <article className="card experience-card">
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
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
