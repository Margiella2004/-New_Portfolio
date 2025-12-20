import './NumberGrid.css';

function CornerBracket({ className }) {
  return (
    <svg
      viewBox="0 0 71 70"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      style={{ width: '70px', height: '70px' }}
    >
      <path
        d="M1.77123 0V50.7754C1.77123 60.2316 9.43698 67.8973 18.8932 67.8973H70.8493"
        stroke="white"
        strokeWidth="3.5"
      />
    </svg>
  );
}

export default function NumberGrid({ image }) {
  const numbers = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="number-grid-container">
      <img
        src={image}
        alt="Grid Background"
        className="number-grid-image"
      />

      <div className="number-grid-overlay" />

      <div className="number-grid-brackets">
        <div className="number-grid-brackets-inner">
          <CornerBracket className="number-grid-bracket number-grid-bracket-top-left" />
          <CornerBracket className="number-grid-bracket number-grid-bracket-top-right" />
          <CornerBracket className="number-grid-bracket number-grid-bracket-bottom-right" />
          <CornerBracket className="number-grid-bracket number-grid-bracket-bottom-left" />
        </div>
      </div>

      <div className="number-grid-content">
        <div className="number-grid">
          {numbers.map((num) => (
            <div key={num} className="number-grid-cell">
              <span className="number-grid-cell-number">{num}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
