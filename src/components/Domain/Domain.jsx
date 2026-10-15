import { lazy, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  Banknote,
  Building2,
  CreditCard,
  Landmark,
  Network,
  Repeat,
  RotateCw,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { paymentPipeline, paymentTopics } from '../../data/portfolio.js';
import useInView from '../../hooks/useInView.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import SceneSlot from '../common/SceneSlot.jsx';
import TiltCard from '../common/TiltCard.jsx';
import Icon from '../common/Icon.jsx';
import './Domain.css';

const PaymentCard3D = lazy(() => import('../three/PaymentCard3D.jsx'));

const topicText = Object.fromEntries(paymentTopics.flatMap((g) => g.items).map((item) => [item.title, item.text]));

// Card parts the 3D card can highlight; descriptions come from the topic data.
const cardParts = [
  { id: 'PAN', label: 'PAN' },
  { id: 'BIN', label: 'BIN' },
  { id: 'EMV', label: 'EMV chip' },
  { id: 'Tokenization', label: 'Tokenization' },
];

const pipelineIcons = {
  card: CreditCard,
  merchant: Store,
  acquirer: Landmark,
  network: Network,
  issuer: Building2,
  authorization: ShieldCheck,
  clearing: Repeat,
  settlement: Banknote,
};

function CardExplorer() {
  const [part, setPart] = useState('BIN');
  const [flipped, setFlipped] = useState(false);

  const selectPart = (id) => {
    setPart(id);
    setFlipped(false);
  };

  return (
    <Reveal className="card card-explorer">
      <div className="card-explorer-stage">
        <SceneSlot
          className="card-explorer-scene"
          fallback={<div className="card-explorer-fallback" aria-hidden="true" />}
        >
          {(animate) => <PaymentCard3D animate={animate} highlight={flipped ? null : part} flipped={flipped} />}
        </SceneSlot>
        <p className="card-explorer-hint" aria-hidden="true">
          Hover the card to tilt it
        </p>
      </div>

      <div className="card-explorer-panel">
        <p className="card-explorer-label">Anatomy of a payment card</p>
        <div className="card-explorer-parts" role="group" aria-label="Highlight a part of the card">
          {cardParts.map((p) => (
            <button
              key={p.id}
              type="button"
              className="card-part"
              aria-pressed={!flipped && part === p.id}
              onClick={() => selectPart(p.id)}
              onMouseEnter={() => selectPart(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="card-explorer-detail" aria-live="polite">
          {flipped ? (
            <>
              <h3>Card back</h3>
              <p>Magnetic stripe and CVV panel. The front carries the PAN, BIN and EMV chip.</p>
            </>
          ) : (
            <>
              <h3>{cardParts.find((p) => p.id === part).label}</h3>
              <p>{topicText[part]}</p>
            </>
          )}
        </div>

        <button type="button" className="btn btn-secondary card-flip" onClick={() => setFlipped((f) => !f)}>
          <RotateCw size={16} aria-hidden="true" />
          {flipped ? 'Show front' : 'Flip card'}
        </button>
      </div>
    </Reveal>
  );
}

function PaymentPipeline() {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInView({ rootMargin: '0px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplay = inView && !paused && !reduceMotion;

  // Walk a transaction through the pipeline while the section is visible.
  useEffect(() => {
    if (!autoplay) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % paymentPipeline.length), 1800);
    return () => clearInterval(id);
  }, [autoplay]);

  const current = paymentPipeline[active];

  return (
    <Reveal className="card pipeline">
      <div className="pipeline-head">
        <p className="pipeline-label">Life of a card transaction</p>
        <p className="pipeline-step-count" aria-hidden="true">
          {String(active + 1).padStart(2, '0')} / {String(paymentPipeline.length).padStart(2, '0')}
        </p>
      </div>

      <div
        ref={ref}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <ol className="pipeline-track">
          {paymentPipeline.map((node, i) => {
            const NodeIcon = pipelineIcons[node.id];
            const state = i === active ? 'is-active' : i < active ? 'is-done' : '';
            return (
              <li key={node.id} className={`pipeline-item ${state}`}>
                <button
                  type="button"
                  className="pipeline-node"
                  aria-current={i === active ? 'step' : undefined}
                  aria-controls="pipeline-detail"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="pipeline-dot">
                    <NodeIcon size={20} aria-hidden="true" />
                  </span>
                  <span className="pipeline-name">{node.label}</span>
                  <span className="pipeline-tip" role="tooltip">
                    {node.detail}
                  </span>
                </button>
                {i < paymentPipeline.length - 1 && (
                  <span className={`pipeline-link${i === active ? ' is-live' : ''}`} aria-hidden="true">
                    <span className="pipeline-packet" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div id="pipeline-detail" className="pipeline-detail">
        <span className="pipeline-detail-index">{String(active + 1).padStart(2, '0')}</span>
        <div>
          <h3>{current.label}</h3>
          <p>{current.detail}</p>
        </div>
      </div>

      <p className="pipeline-note">
        The response returns along the same path, then the approved transaction is cleared and settled in batch.
      </p>
    </Reveal>
  );
}

export default function Domain() {
  return (
    <Section
      id="domain"
      eyebrow="Domain knowledge"
      title="Cards & Payments"
      intro="How a card transaction is initiated, authorized, cleared and settled, and the concepts that keep it secure."
    >
      <CardExplorer />
      <PaymentPipeline />

      <div className="domain-groups">
        {paymentTopics.map((group) => (
          <div key={group.group} className="domain-group">
            <Reveal className="domain-group-header">
              <span className="icon-box">
                <Icon name={group.icon} size={18} />
              </span>
              <h3>{group.group}</h3>
            </Reveal>
            <div className="domain-grid">
              {group.items.map((item, i) => (
                <Reveal key={item.title} className="domain-grid-item" delay={(i % 3) * 0.05}>
                  <TiltCard className="card domain-card" max={5}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
