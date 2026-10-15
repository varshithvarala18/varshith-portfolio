import { lazy } from 'react';
import { genAI } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import SceneSlot from '../common/SceneSlot.jsx';
import TiltCard from '../common/TiltCard.jsx';
import Icon from '../common/Icon.jsx';
import './GenerativeAI.css';

const AICore = lazy(() => import('../three/AICore.jsx'));

function OrbitRing({ items, className }) {
  return (
    <div className={`ai-ring ${className}`}>
      {items.map((item, i) => (
        <span key={item} className="ai-chip" style={{ '--angle': `${(360 / items.length) * i}deg` }}>
          <span className="ai-chip-inner">{item}</span>
        </span>
      ))}
    </div>
  );
}

export default function GenerativeAI() {
  return (
    <Section
      id="genai"
      eyebrow="Generative AI"
      title="Applied LLM engineering"
      intro="Building a practical understanding of Claude and LLM fundamentals, and how they can be applied responsibly in real engineering workflows."
    >
      <div className="ai-layout">
        <Reveal className="ai-orbit-wrap">
          {/* Decorative: the same topics are listed accessibly in the groups alongside. */}
          <div className="ai-orbit" aria-hidden="true">
            <span className="ai-orbit-line ai-orbit-line-inner" />
            <span className="ai-orbit-line ai-orbit-line-outer" />
            <OrbitRing items={genAI.inner} className="ai-ring-inner" />
            <OrbitRing items={genAI.outer} className="ai-ring-outer" />
            <div className="ai-core">
              <SceneSlot className="ai-core-scene">{(animate) => <AICore animate={animate} />}</SceneSlot>
              <span className="ai-core-label">{genAI.core}</span>
            </div>
          </div>
        </Reveal>

        <ul className="ai-groups">
          {genAI.groups.map((group, i) => (
            <Reveal as="li" key={group.title} className="ai-group-item" delay={i * 0.05}>
              <TiltCard className="card ai-group" max={4}>
                <div className="ai-group-head">
                  <span className="icon-box">
                    <Icon name={group.icon} size={18} />
                  </span>
                  <h3>{group.title}</h3>
                </div>
                <ul className="ai-group-tags" aria-label={`${group.title} topics`}>
                  {group.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
