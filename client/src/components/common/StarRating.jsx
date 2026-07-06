import { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({
  rating = 0,
  maxStars = 5,
  size = 18,
  interactive = false,
  onChange,
  className = '',
}) => {
  const [hovered, setHovered] = useState(0);

  const displayRating = interactive && hovered > 0 ? hovered : rating;

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        cursor: interactive ? 'pointer' : 'default',
      }}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= Math.floor(displayRating);
        const isHalf = !isFilled && starValue - 0.5 <= displayRating;

        return (
          <span
            key={i}
            onClick={() => interactive && onChange?.(starValue)}
            onMouseEnter={() => interactive && setHovered(starValue)}
            onMouseLeave={() => interactive && setHovered(0)}
            style={{
              position: 'relative',
              display: 'inline-flex',
              transition: 'transform 150ms ease',
              transform: interactive && hovered === starValue ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            {/* Background star (empty) */}
            <Star
              size={size}
              fill="transparent"
              stroke="var(--text-dim)"
              strokeWidth={1.5}
            />
            {/* Filled overlay */}
            {(isFilled || isHalf) && (
              <Star
                size={size}
                fill="var(--neon-gold)"
                stroke="var(--neon-gold)"
                strokeWidth={1.5}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  clipPath: isHalf ? 'inset(0 50% 0 0)' : 'none',
                  filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.4))',
                }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
