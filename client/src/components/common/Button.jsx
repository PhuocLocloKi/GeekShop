import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}, ref) => {
  const variantClass = {
    primary: 'cyber-btn-primary',
    secondary: 'cyber-btn-secondary',
    danger: 'cyber-btn-danger',
    ghost: 'cyber-btn-ghost',
  }[variant] || 'cyber-btn-primary';

  const sizeClass = {
    sm: 'cyber-btn-sm',
    md: '',
    lg: 'cyber-btn-lg',
  }[size] || '';

  return (
    <button
      ref={ref}
      type={type}
      className={`cyber-btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
