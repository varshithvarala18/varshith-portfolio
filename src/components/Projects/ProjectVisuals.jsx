/*
 * Decorative mini-visuals for the project cards. Built with SVG and CSS 3D
 * transforms rather than WebGL so three cards don't need three GPU contexts.
 */

function FinanceVisual() {
  const services = ['Loan', 'Plan', 'Payment', 'Txn'];
  return (
    <svg className="pv-svg" viewBox="0 0 320 150" role="presentation">
      <defs>
        <linearGradient id="pv-node" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Gateway → services → database */}
      {services.map((_, i) => {
        const x = 40 + i * 80;
        return (
          <g key={i}>
            <path className="pv-link" d={`M160 34 C160 52 ${x} 46 ${x} 62`} />
            <path className="pv-link pv-link-db" d={`M${x} 90 C${x} 108 160 104 160 118`} />
          </g>
        );
      })}

      <g className="pv-node pv-node-strong">
        <rect x="104" y="8" width="112" height="26" rx="8" />
        <text x="160" y="25">API Gateway</text>
      </g>

      {services.map((label, i) => (
        <g key={label} className="pv-node">
          <rect x={40 + i * 80 - 32} y="62" width="64" height="28" rx="8" style={{ fill: 'url(#pv-node)' }} />
          <text x={40 + i * 80} y="80">
            {label}
          </text>
        </g>
      ))}

      <g className="pv-db">
        <ellipse cx="160" cy="122" rx="34" ry="7" />
        <path d="M126 122 v14 a34 7 0 0 0 68 0 v-14" />
        <text x="202" y="134">PostgreSQL</text>
      </g>
    </svg>
  );
}

function CardVisual() {
  return (
    <div className="pv-card-scene">
      <div className="pv-card">
        <span className="pv-card-chip" />
        <span className="pv-card-number">•••• •••• •••• 4821</span>
        <span className="pv-card-meta">MERCHANT · POS</span>
      </div>
      <div className="pv-decisions">
        <span className="pv-decision is-approved">00 · Approved</span>
        <span className="pv-decision is-declined">51 · Declined</span>
      </div>
    </div>
  );
}

function TestingVisual() {
  const rows = [
    ['GET', '/employees', '200', 'pass'],
    ['POST', '/leave', '201', 'pass'],
    ['POST', '/leave', '400', 'neg'],
    ['PUT', '/roles', '200', 'pass'],
  ];
  return (
    <div className="pv-tests">
      <div className="pv-tests-bar">
        <span>Postman · Collection run</span>
        <span className="pv-tests-ok">Regression ✓</span>
      </div>
      <ul>
        {rows.map(([method, path, code, kind], i) => (
          <li key={i} style={{ '--i': i }}>
            <span className={`pv-method m-${method.toLowerCase()}`}>{method}</span>
            <span className="pv-path">{path}</span>
            <span className={`pv-code ${kind === 'neg' ? 'is-neg' : ''}`}>{code}</span>
            <span className="pv-check">✓</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const visuals = { finance: FinanceVisual, card: CardVisual, testing: TestingVisual };

export default function ProjectVisual({ type }) {
  const Visual = visuals[type];
  if (!Visual) return null;
  return (
    <div className={`project-visual project-visual--${type}`} aria-hidden="true">
      <Visual />
    </div>
  );
}
