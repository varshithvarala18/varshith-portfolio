import { ArrowRight } from 'lucide-react';
import { paymentFlow, paymentTopics } from '../../data/portfolio.js';
import Section from '../common/Section.jsx';
import Reveal from '../common/Reveal.jsx';
import Icon from '../common/Icon.jsx';
import './Domain.css';

function TransactionFlow() {
  return (
    <Reveal className="card payment-flow">
      <p className="payment-flow-label">Authorization path of a card transaction</p>
      <ol className="payment-flow-steps">
        {paymentFlow.map((item, i) => (
          <li key={item.step} className="payment-flow-step">
            <span className="payment-flow-index">{String(i + 1).padStart(2, '0')}</span>
            <p className="payment-flow-title">{item.step}</p>
            <p className="payment-flow-detail">{item.detail}</p>
            {i < paymentFlow.length - 1 && (
              <ArrowRight className="payment-flow-arrow" size={16} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <p className="payment-flow-note">
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
      <TransactionFlow />

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
                <Reveal key={item.title} className="card card-hover domain-card" delay={(i % 3) * 0.04}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
