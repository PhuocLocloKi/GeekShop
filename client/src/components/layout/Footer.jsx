import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Send, MessageSquare } from 'lucide-react';
import { showSuccess, showError } from '../common/Toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      showError('Please enter a valid email address.');
      return;
    }
    showSuccess('Subscription request received. Welcome to the terminal network.');
    setEmail('');
  };

  return (
    <footer
      className="grid-background"
      style={{
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--glass-border)',
        padding: 'var(--space-4xl) 0 var(--space-xl)',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-2xl)',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          {/* Column 1: About */}
          <div>
            <h4
              className="neon-text-green"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-lg)',
                marginBottom: 'var(--space-md)',
                letterSpacing: '0.1em',
              }}
            >
              GEEKSHOP
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Terminal-based, tech-noir cyberware hardware forge. Equipping netrunners, developers, and makers with premium recovery tools, boards, modules, and networking gears.
            </p>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-sm)',
                color: 'var(--neon-cyan)',
                marginBottom: 'var(--space-md)',
                letterSpacing: '0.05em',
              }}
            >
              CATEGORIES
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {[
                { name: 'OS & Recovery', path: '/products?category=OS%20%26%20Recovery' },
                { name: 'Networking', path: '/products?category=Networking' },
                { name: 'Development Boards', path: '/products?category=Development%20Boards' },
                { name: 'GPS & Navigation', path: '/products?category=GPS%20%26%20Navigation' },
              ].map((cat, idx) => (
                <li key={idx}>
                  <Link
                    to={cat.path}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-sm)',
                color: 'var(--neon-cyan)',
                marginBottom: 'var(--space-md)',
                letterSpacing: '0.05em',
              }}
            >
              QUICK_LINKS
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'Cart', path: '/cart' },
                { name: 'Favorites', path: '/favorites' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-sm)',
                color: 'var(--neon-cyan)',
                marginBottom: 'var(--space-md)',
                letterSpacing: '0.05em',
              }}
            >
              NEWSLETTER
            </h4>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
              Subscribe to decrypt core updates and early cyber-ware drops.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <input
                type="email"
                placeholder="USER_EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cyber-input"
                style={{
                  padding: '8px 12px',
                  fontSize: 'var(--text-xs)',
                  border: '1px solid var(--glass-border)',
                }}
              />
              <button
                type="submit"
                className="cyber-btn cyber-btn-primary cyber-btn-sm"
                style={{ whiteSpace: 'nowrap' }}
              >
                SUB
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: 'var(--space-xl)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
          }}
        >
          {/* Monospace copyright */}
          <span
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
            }}
          >
            © {new Date().getFullYear()} GEEKSHOP. ALL RIGHTS RESERVED. SYS_VER: 3.0.0
          </span>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            {[
              { icon: <Globe size={18} />, href: 'https://github.com' },
              { icon: <Send size={18} />, href: 'https://twitter.com' },
              { icon: <MessageSquare size={18} />, href: 'https://discord.com' },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-muted)',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-green)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
