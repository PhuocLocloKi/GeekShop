import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../../components/common/Button';
import { Trash2, Plus, Minus, CornerDownRight } from 'lucide-react';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <PageWrapper className="flex-center" style={{ minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)' }}>
          <span style={{ fontSize: '48px' }}>🛒</span>
          <h3 style={{ fontFamily: 'var(--font-code)' }}>[CART_EMPTY_NODE]</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            No hardware items detected in local buffer.
          </p>
          <Link to="/products" style={{ marginTop: 'var(--space-sm)' }}>
            <Button variant="secondary" size="md">
              [ BROWSE_INVENTORY ]
            </Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="section-sm">
      <div className="container">
        <h2 style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xl)' }}>SHOPPING_CART_MANIFEST</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
          {/* Cart items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="glass-card-static"
                style={{
                  padding: 'var(--space-md)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  gap: 'var(--space-md)',
                  alignItems: 'center',
                }}
              >
                {/* Thumbnail */}
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'contain',
                    background: 'rgba(9, 10, 15, 0.4)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                />

                {/* Info */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <h4 style={{ fontSize: 'var(--text-sm)', margin: 0, fontWeight: 600 }}>{item.name}</h4>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-green)' }}>
                    {formatCurrency(item.price)}
                  </span>
                </div>

                {/* Qty Selector */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(9, 10, 15, 0.4)',
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ padding: '6px 10px', color: 'var(--text-secondary)', cursor: 'pointer' }}
                  >
                    <Minus size={12} />
                  </button>
                  <span style={{ padding: '0 10px', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', minWidth: '24px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ padding: '6px 10px', color: 'var(--text-secondary)', cursor: 'pointer' }}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Remove item button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-dim)',
                    cursor: 'pointer',
                    padding: '6px',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-pink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Pricing summary */}
          <div
            className="glass-card-static"
            style={{
              padding: 'var(--space-xl)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-sm)',
                color: 'var(--neon-cyan)',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-sm)',
              }}
            >
              PRICING_SUMMARY
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>SUBTOTAL:</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>SHIPPING:</span>
              <span style={{ color: 'var(--neon-green)' }}>FREE_SHIPPING</span>
            </div>

            <hr style={{ border: 'none', height: '1px', background: 'var(--glass-border)', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-code)' }}>
              <span style={{ fontWeight: 'bold' }}>TOTAL_AMOUNT:</span>
              <span style={{ color: 'var(--neon-green)', fontWeight: 'bold', textShadow: '0 0 8px rgba(16,185,129,0.3)' }}>
                {formatCurrency(cartTotal)}
              </span>
            </div>

            <Button
              onClick={() => navigate('/checkout')}
              variant="primary"
              size="md"
              style={{ marginTop: 'var(--space-md)' }}
            >
              [ PROCEED_TO_CHECKOUT ]
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Cart;
