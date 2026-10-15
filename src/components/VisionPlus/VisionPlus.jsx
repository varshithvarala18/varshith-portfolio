import { lazy, useState } from 'react';
import { visionPlusModules } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import SceneSlot from '../common/SceneSlot.jsx';
import TiltCard from '../common/TiltCard.jsx';
import './VisionPlus.css';

const NetworkScene = lazy(() => import('../three/NetworkScene.jsx'));

const coreModules = visionPlusModules.filter((mod) => mod.core);

function ArchitectureExplorer() {
  const [selected, setSelected] = useState(coreModules[0].code);
  const [hovered, setHovered] = useState(null);
  const activeCode = hovered ?? selected;
  const active = coreModules.find((mod) => mod.code === activeCode);

  return (
    <Reveal className="card vp-explorer">
      <div className="vp-stage">
        <SceneSlot className="vp-scene">
          {(animate) => (
            <NetworkScene
              animate={animate}
              modules={coreModules}
              activeCode={activeCode}
              spinPaused={hovered !== null}
              onHover={setHovered}
              onSelect={setSelected}
            />
          )}
        </SceneSlot>
      </div>

      <div className="vp-panel">
        <p className="vp-panel-label">Module architecture</p>
        <div className="vp-modules" role="group" aria-label="VisionPLUS modules">
          {coreModules.map((mod) => (
            <button
              key={mod.code}
              type="button"
              className="vp-module-btn"
              aria-pressed={mod.code === activeCode}
              onClick={() => setSelected(mod.code)}
              onMouseEnter={() => setHovered(mod.code)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setSelected(mod.code)}
            >
              {mod.code}
            </button>
          ))}
        </div>

        <div className="vp-active" aria-live="polite">
          <span className="vp-code">{active.code}</span>
          {active.name && <h3 className="vp-active-name">{active.name}</h3>}
          <p className="vp-active-text">{active.text}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function VisionPlus() {
  return (
    <Section
      id="visionplus"
      eyebrow="Card management platform"
      title="VisionPLUS"
      intro="VisionPLUS is a card management platform used by banks and issuers. These are the modules I have studied and what each one is responsible for."
      alt
    >
      <ArchitectureExplorer />

      <ul className="vp-grid">
        {visionPlusModules.map((mod, i) => (
          <Reveal as="li" key={mod.code} className="vp-grid-item" delay={(i % 4) * 0.04}>
            <TiltCard className="card vp-card" max={5}>
              <span className="vp-code">{mod.code}</span>
              {mod.name && <h3 className="vp-name">{mod.name}</h3>}
              <p className="vp-text">{mod.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
