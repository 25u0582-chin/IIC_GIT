import '../../styles/globals.css';

export function SectionLabel({ children, className = '' }) {
  return (
    <div className={`section-label reveal ${className}`}>
      {children}
    </div>
  );
}

export function SectionContainer({ children, className = '' }) {
  return (
    <div className={`section-container ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`section-title reveal ${className}`}>
      {children}
    </h2>
  );
}

export function GlowDivider() {
  return <div className="glow-divider"></div>;
}
