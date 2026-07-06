import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const Navbar = ({ onSearchToggle }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/products', label: 'PRODUCTS' },
    ...(user?.role === 'admin' ? [{ path: '/admin', label: 'ADMIN' }] : []),
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: isScrolled ? '60px' : 'var(--navbar-height)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        borderBottom: '1px solid var(--glass-border)',
        zIndex: 'var(--z-sticky)',
        transition: 'all var(--transition-base)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container flex-between" style={{ width: '100%' }}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
          className="neon-text-green"
        >
          GEEKSHOP
        </Link>

        {/* Desktop Navigation Links */}
        <div
          className="hide-tablet"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xl)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: location.pathname === link.path ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                textShadow: location.pathname === link.path ? '0 0 8px rgba(6, 182, 212, 0.4)' : 'none',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== link.path) e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== link.path) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
          }}
        >
          {onSearchToggle && (
            <button
              onClick={onSearchToggle}
              style={{
                color: 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Search size={20} />
            </button>
          )}

          {/* Cart Icon */}
          <Link
            to="/cart"
            style={{
              position: 'relative',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-green)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span
                className="flex-center"
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  background: 'var(--neon-pink)',
                  color: 'var(--bg-void)',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  boxShadow: 'var(--glow-pink)',
                  fontFamily: 'var(--font-code)',
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Section */}
          <div className="hide-tablet" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <Link
                  to="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-code)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="avatar"
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1px solid var(--neon-cyan)',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <User size={16} style={{ color: 'var(--neon-cyan)' }} />
                  )}
                  <span style={{ color: 'var(--text-secondary)' }}>{user.name.toUpperCase()}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    color: 'var(--text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-pink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link 
                  to="/login"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-code)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--neon-cyan)',
                    padding: '6px 12px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(6, 182, 212, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                  }}
                >
                  <LogIn size={13} />
                  <span>LOGIN</span>
                </Link>
                <Link 
                  to="/register"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-code)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--neon-green)',
                    padding: '6px 12px',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(16, 185, 129, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.2)';
                    e.currentTarget.style.borderColor = 'var(--neon-green)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                  }}
                >
                  <UserPlus size={13} />
                  <span>REGISTER</span>
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="show-tablet"
            style={{
              color: 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="show-tablet"
          style={{
            position: 'fixed',
            top: isScrolled ? '60px' : 'var(--navbar-height)',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(9, 10, 15, 0.95)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--glass-border)',
            zIndex: 'var(--z-dropdown)',
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--space-xl)',
            gap: 'var(--space-lg)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-lg)',
                color: location.pathname === link.path ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                paddingBottom: 'var(--space-sm)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile User Section */}
          <div style={{ marginTop: 'auto', paddingBottom: 'var(--space-xl)' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <Link
                  to="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-code)',
                  }}
                >
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="avatar"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid var(--neon-cyan)',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <User size={20} style={{ color: 'var(--neon-cyan)' }} />
                  )}
                  <span>{user.name.toUpperCase()}</span>
                </Link>
                <Button variant="danger" size="sm" onClick={handleLogout} style={{ width: '100%' }}>
                  LOGOUT
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <Link to="/login" style={{ width: '100%' }}>
                  <Button variant="primary" size="md" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <LogIn size={16} /> [ LOGIN ]
                  </Button>
                </Link>
                <Link to="/register" style={{ width: '100%' }}>
                  <Button variant="secondary" size="md" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <UserPlus size={16} /> [ REGISTER ]
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
