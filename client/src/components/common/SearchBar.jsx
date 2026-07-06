import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Search products...', className = '' }) => {
  const [value, setValue] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutId) clearTimeout(timeoutId);

    const newTimeout = setTimeout(() => {
      onSearch?.(newValue);
    }, 300);

    setTimeoutId(newTimeout);
  }, [onSearch, timeoutId]);

  const handleClear = () => {
    setValue('');
    onSearch?.('');
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <span style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-code)',
        fontSize: 'var(--text-sm)',
        color: 'var(--neon-green)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        &gt;
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="cyber-input"
        style={{
          paddingLeft: '28px',
          paddingRight: value ? '64px' : '36px',
        }}
      />
      <div style={{
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        {value && (
          <button
            onClick={handleClear}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
            }}
          >
            <X size={14} />
          </button>
        )}
        <Search size={16} style={{ color: 'var(--text-dim)' }} />
      </div>
    </div>
  );
};

export default SearchBar;
