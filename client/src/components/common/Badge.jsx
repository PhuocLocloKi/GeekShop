const BADGE_STYLES = {
  new: 'cyber-tag-green',
  sale: 'cyber-tag-pink',
  hot: 'cyber-tag-gold',
  'sold out': 'cyber-tag-gray',
};

const BADGE_LABELS = {
  new: 'NEW',
  sale: 'SALE',
  hot: 'HOT',
  'sold out': 'SOLD OUT',
};

const Badge = ({ type = 'new', label, className = '' }) => {
  const styleClass = BADGE_STYLES[type] || BADGE_STYLES.new;
  const text = label || BADGE_LABELS[type] || type.toUpperCase();

  return (
    <span className={`cyber-tag ${styleClass} ${className}`}>
      {text}
    </span>
  );
};

export default Badge;
