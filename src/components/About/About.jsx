import { about } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import Icon from '../common/Icon.jsx';
import './About.css';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Backend engineer with a payments focus">
      <div className="about-grid">
        <Reveal className="about-text">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal as="ul" className="about-highlights" delay={0.1}>
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
      </div>
    </Section>
  );
}
