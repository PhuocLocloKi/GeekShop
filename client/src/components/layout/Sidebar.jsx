import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Truck, Users, ArrowLeft } from 'lucide-react';

const Sidebar = () => {
  const adminLinks = [
    { path: '/admin', label: 'DASHBOARD', icon: <LayoutDashboard size={18} />, exact: true },
    { path: '/admin/products', label: 'PRODUCTS', icon: <ShoppingBag size={18} /> },
    { path: '/admin/orders', label: 'ORDERS', icon: <Truck size={18} /> },
    { path: '/admin/users', label: 'USERS', icon: <Users size={18} /> },
  ];

  return (
    <div
      style={{
        width: 'var(--sidebar-width)',
        background: 'var(--bg-deep)',
        borderRight: '1px solid var(--glass-border)',
        height: 'calc(100vh - var(--navbar-height))',
        position: 'sticky',
        top: 'var(--navbar-height)',
        padding: 'var(--space-xl) var(--space-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xl)',
        flexShrink: 0,
      }}
      className="hide-tablet"
    >
      <div style={{ padding: '0 var(--space-sm)' }}>
        <h3
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-md)',
          }}
        >
          SYS_CONTROL_PANEL
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {adminLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.exact}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              padding: '12px 16px',
              fontFamily: 'var(--font-code)',
              fontSize: 'var(--text-sm)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              background: isActive ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
              border: '1px solid',
              borderColor: isActive ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
              color: isActive ? 'var(--neon-cyan)' : 'var(--text-secondary)',
              textShadow: isActive ? '0 0 8px rgba(6, 182, 212, 0.4)' : 'none',
              boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
              transition: 'all var(--transition-base)',
            })}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <NavLink
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            padding: '12px 16px',
            fontFamily: 'var(--font-code)',
            fontSize: 'var(--text-sm)',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-green)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={18} />
          <span>VIEW_SHOP</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
