import React from 'react';

const SpecsTable = ({ specs }) => {
  if (!specs) return <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>[NO_SPECIFICATIONS_FOUND]</p>;

  // Convert specs object or string to list
  let specsList = [];
  try {
    const parsed = typeof specs === 'string' ? JSON.parse(specs) : specs;
    specsList = Object.entries(parsed);
  } catch (e) {
    specsList = [];
  }

  if (specsList.length === 0) {
    return <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>[NO_SPECIFICATIONS_FOUND]</p>;
  }

  return (
    <div
      className="glass-card-static"
      style={{
        padding: 'var(--space-md)',
        overflow: 'hidden',
        border: '1px solid var(--glass-border)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-code)',
          fontSize: 'var(--text-xs)',
          color: 'var(--neon-green)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 'var(--space-md)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>SPECIFICATIONS_MANIFEST</span>
        <span>SYS_OK</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {specsList.map(([key, value], idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              padding: '10px 14px',
              background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
              borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
              fontFamily: 'var(--font-code)',
              fontSize: 'var(--text-xs)',
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'var(--neon-cyan)', fontWeight: 500 }}>
              {key.toUpperCase()}
            </span>
            <span style={{ color: 'var(--text-primary)', textAlign: 'right', wordBreak: 'break-all' }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecsTable;
