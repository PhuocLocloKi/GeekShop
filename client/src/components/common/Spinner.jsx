const Spinner = ({ size = 40, color = 'var(--neon-green)', className = '' }) => (
  <div
    className={className}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `2px solid rgba(6, 182, 212, 0.15)`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  </div>
);

export const SpinnerOverlay = ({ message = 'Loading...' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-3xl)',
    width: '100%',
    minHeight: '200px',
  }}>
    <Spinner size={48} />
    <p style={{
      fontFamily: 'var(--font-code)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
    }}>
      {message}
    </p>
  </div>
);

export default Spinner;
