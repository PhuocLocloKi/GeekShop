import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { showSuccess, showError, showInfo } from '../common/Toast';
import api from '../../services/api';
import Badge from '../common/Badge';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  // Check if product is in favorites (if logged in)
  useEffect(() => {
    if (isAuthenticated) {
      api.get(`/favorites`)
        .then((res) => {
          const isFav = res.data.some((fav) => fav.product_id === product.id || fav.id === product.id);
          setIsFavorite(isFav);
        })
        .catch(() => {});
    }
  }, [isAuthenticated, product.id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) {
      showError('System Error: Item is out of stock.');
      return;
    }
    addToCart(product, 1);
    showSuccess(`[${product.name.substring(0, 15)}...] sync_to_cart successful.`);
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      showInfo('Authorization required: Please login to save favorites.');
      return;
    }

    setLoadingFav(true);
    try {
      await api.post(`/favorites/${product.id}`);
      setIsFavorite(!isFavorite);
      if (!isFavorite) {
        showSuccess('Item cached in favorites.');
      } else {
        showInfo('Item removed from favorites.');
      }
    } catch (err) {
      showError('Failed to toggle favorites.');
    } finally {
      setLoadingFav(false);
    }
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Link
      to={`/products/${product.id}`}
      style={{ display: 'block', textDecoration: 'none', position: 'relative' }}
    >
      <div className="glass-card" style={{ padding: 'var(--space-md)', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Badge & Favorites Container */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
          <div>
            {isOutOfStock ? (
              <Badge type="sold out" />
            ) : isLowStock ? (
              <Badge type="sale" label="LOW STOCK" />
            ) : product.rating_avg >= 4.7 ? (
              <Badge type="hot" />
            ) : product.id <= 3 ? (
              <Badge type="new" />
            ) : (
              <span className="cyber-tag cyber-tag-cyan" style={{ border: 'none', background: 'transparent' }}>
                {product.category}
              </span>
            )}
          </div>

          <button
            onClick={handleToggleFavorite}
            disabled={loadingFav}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isFavorite ? 'var(--neon-pink)' : 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              if (!isFavorite) e.currentTarget.style.color = 'var(--neon-pink)';
            }}
            onMouseLeave={(e) => {
              if (!isFavorite) e.currentTarget.style.color = 'var(--text-dim)';
            }}
          >
            <Heart size={18} fill={isFavorite ? 'var(--neon-pink)' : 'transparent'} />
          </button>
        </div>

        {/* Product Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '80%',
            background: 'rgba(9, 10, 15, 0.4)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-md)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Procedural background SVG icon representing hardware */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', opacity: 0.2 }}>
            📟
          </div>
          {/* Static placeholder image to simulate visual asset */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <img
            src={product.image_url}
            alt={product.name}
            onError={(e) => {
              // Fail-safe if image file not loaded: show custom procedural card detail
              e.target.style.display = 'none';
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '12px',
              transition: 'transform 0.5s ease',
              imageRendering: 'pixelated',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>

        {/* Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', flexGrow: 1 }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
            {product.brand.toUpperCase()}
          </span>
          <h4
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.4,
              height: '40px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </h4>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginTop: '2px' }}>
            <Star size={12} fill="var(--neon-gold)" stroke="var(--neon-gold)" />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', fontFamily: 'var(--font-code)' }}>
              {product.rating_avg}
            </span>
          </div>

          {/* Price & Cart CTA Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'var(--space-md)',
              paddingTop: 'var(--space-sm)',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: 'var(--neon-green)',
                textShadow: '0 0 8px rgba(16, 185, 129, 0.25)',
              }}
            >
              {formatCurrency(product.price)}
            </span>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-md)',
                background: isOutOfStock ? 'rgba(148, 163, 184, 0.05)' : 'rgba(16, 185, 129, 0.1)',
                border: '1px solid',
                borderColor: isOutOfStock ? 'var(--text-dim)' : 'var(--neon-green)',
                color: isOutOfStock ? 'var(--text-muted)' : 'var(--neon-green)',
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                if (!isOutOfStock) {
                  e.currentTarget.style.background = 'var(--neon-green)';
                  e.currentTarget.style.color = 'var(--bg-void)';
                  e.currentTarget.style.boxShadow = 'var(--glow-green)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isOutOfStock) {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                  e.currentTarget.style.color = 'var(--neon-green)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
