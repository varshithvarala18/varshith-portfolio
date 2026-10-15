// Decorative snippet in the hero, reflecting the kind of code I write day to day.
const lines = [
  [['ann', '@RestController']],
  [['ann', '@RequestMapping'], ['txt', '('], ['str', '"/api/loans"'], ['txt', ')']],
  [['kw', 'public class '], ['type', 'LoanController'], ['txt', ' {']],
  [],
  [['txt', '  '], ['kw', 'private final '], ['type', 'LoanService'], ['txt', ' loanService;']],
  [],
  [['txt', '  '], ['ann', '@PostMapping']],
  [['txt', '  '], ['kw', 'public '], ['type', 'ResponseEntity'], ['txt', '<'], ['type', 'LoanResponse'], ['txt', '> create(']],
  [['txt', '      '], ['ann', '@Valid @RequestBody '], ['type', 'LoanRequest'], ['txt', ' request) {']],
  [['txt', '    '], ['kw', 'var'], ['txt', ' loan = loanService.createLoan(request);']],
  [['txt', '    '], ['kw', 'return '], ['type', 'ResponseEntity'], ['txt', '.status('], ['type', 'CREATED'], ['txt', ').body(loan);']],
  [['txt', '  }']],
  [['txt', '}']],
];

export default function CodeCard() {
  return (
    <figure className="code-card" aria-label="Example Spring Boot REST controller">
      <div className="code-card-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <p>LoanController.java</p>
      </div>
      <pre className="code-card-body" aria-hidden="true">
        <code>
          {lines.map((tokens, i) => (
            <span className="code-line" key={i}>
              <span className="code-ln">{i + 1}</span>
              {tokens.map(([kind, text], j) => (
                <span key={j} className={`tok-${kind}`}>
                  {text}
                </span>
              ))}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
