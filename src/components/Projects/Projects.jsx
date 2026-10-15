import { ChevronRight, Check } from 'lucide-react';
import { projects } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import Icon from '../common/Icon.jsx';
import './Projects.css';

function ProjectCard({ project }) {
  return (
    <article className="card card-hover project-card">
      <header className="project-header">
        <span className="icon-box">
          <Icon name={project.icon} size={20} />
        </span>
        <p className="project-type">{project.type}</p>
      </header>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>

      {project.flow && (
        <ol className="project-flow" aria-label="Authorization flow">
          {project.flow.map((step, i) => (
            <li key={step}>
              <span>{step}</span>
              {i < project.flow.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      )}

      <div className="project-contribution">
        <h4>{project.contributionTitle}</h4>
        <ul className={project.compactPoints ? 'project-points is-compact' : 'project-points'}>
          {project.points.map((point) => (
            <li key={point}>
              <Check size={16} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="project-tech" aria-label="Technologies used">
        {project.tech.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      intro="Backend systems I have built or contributed to, from loan management to payment authorization."
      alt
    >
      <div className="projects-grid">
        {projects.map((project, i) => (
          <Reveal key={project.title} className="projects-grid-item" delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
