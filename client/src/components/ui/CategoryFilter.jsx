import React from 'react';
import { CATEGORIES } from '../../utils/constants';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
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
        SELECT_CATEGORY
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {/* 'All' option */}
        <button
          onClick={() => onSelectCategory(null)}
          style={{
            textAlign: 'left',
            padding: '10px 14px',
            fontFamily: 'var(--font-code)',
            fontSize: 'var(--text-xs)',
            background: selectedCategory === null ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
            border: '1px solid',
            borderColor: selectedCategory === null ? 'var(--neon-cyan)' : 'var(--glass-border)',
            color: selectedCategory === null ? 'var(--neon-cyan)' : 'var(--text-secondary)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'all var(--transition-base)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
          }}
          onMouseEnter={(e) => {
            if (selectedCategory !== null) e.currentTarget.style.borderColor = 'var(--neon-cyan)';
          }}
          onMouseLeave={(e) => {
            if (selectedCategory !== null) e.currentTarget.style.borderColor = 'var(--glass-border)';
          }}
        >
          <span>🌐</span>
          <span>ALL HARDWARE</span>
        </button>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-xs)',
                background: isSelected ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                border: '1px solid',
                borderColor: isSelected ? 'var(--neon-cyan)' : 'var(--glass-border)',
                color: isSelected ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'var(--neon-cyan)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'var(--glass-border)';
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.name.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
