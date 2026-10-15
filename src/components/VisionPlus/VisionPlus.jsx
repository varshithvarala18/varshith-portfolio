import { visionPlusModules } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import './VisionPlus.css';

export default function VisionPlus() {
  return (
    <Section
      id="visionplus"
      eyebrow="Card management platform"
      title="VisionPLUS"
      intro="VisionPLUS is a card management platform used by banks and issuers. These are the modules I have studied and what each one is responsible for."
      alt
    >
      <ul className="vp-grid">
        {visionPlusModules.map((mod, i) => (
          <Reveal as="li" key={mod.code} className="card card-hover vp-card" delay={(i % 4) * 0.04}>
            <span className="vp-code">{mod.code}</span>
            <h3 className="vp-name">{mod.name}</h3>
            <p className="vp-text">{mod.text}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
