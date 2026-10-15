import Reveal from './Reveal.jsx';
import './Section.css';

/**
 * Standard page section with an eyebrow label, heading and optional intro text.
 */
export default function Section({ id, eyebrow, title, intro, alt = false, children }) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} className={`section${alt ? ' section-alt' : ''}`} aria-labelledby={headingId}>
      <div className="container">
        <Reveal className="section-header">
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          <h2 id={headingId} className="section-title">
            {title}
          </h2>
          {intro && <p className="section-intro">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
