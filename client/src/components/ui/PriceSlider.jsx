import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { PRICE_RANGE } from '../../utils/constants';

const PriceSlider = ({ priceRange, onChange }) => {
  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), priceRange[1] - PRICE_RANGE.STEP);
    onChange([val, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), priceRange[0] + PRICE_RANGE.STEP);
    onChange([priceRange[0], val]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      <h4
        style={{
          fontFamily: 'var(--font-code)',
          fontSize: 'var(--text-sm)',
          color: 'var(--neon-cyan)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-sm)',
          borderBottom: '1px solid var(--glass-border)',
          paddingBottom: 'var(--space-xs)',
        }}
      >
        FILTER_PRICE
      </h4>

      {/* Dual sliders container */}
      <div style={{ position: 'relative', width: '100%', height: '30px', marginTop: 'var(--space-sm)' }}>
        {/* Track */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '4px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--glass-border)',
            borderRadius: '2px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        />

        {/* Input sliders */}
        <input
          type="range"
          min={PRICE_RANGE.MIN}
          max={PRICE_RANGE.MAX}
          step={PRICE_RANGE.STEP}
          value={priceRange[0]}
          onChange={handleMinChange}
          style={{
            position: 'absolute',
            width: '100%',
            height: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            outline: 'none',
            background: 'none',
            WebkitAppearance: 'none',
            pointerEvents: 'auto',
          }}
        />
        <input
          type="range"
          min={PRICE_RANGE.MIN}
          max={PRICE_RANGE.MAX}
          step={PRICE_RANGE.STEP}
          value={priceRange[1]}
          onChange={handleMaxChange}
          style={{
            position: 'absolute',
            width: '100%',
            height: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            outline: 'none',
            background: 'none',
            WebkitAppearance: 'none',
            pointerEvents: 'auto',
          }}
        />
      </div>

      {/* Price output labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-code)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)',
        }}
      >
        <div>
          <span style={{ color: 'var(--text-muted)' }}>MIN:</span>{' '}
          <span style={{ color: 'var(--neon-green)' }}>{formatCurrency(priceRange[0])}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>MAX:</span>{' '}
          <span style={{ color: 'var(--neon-green)' }}>{formatCurrency(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
