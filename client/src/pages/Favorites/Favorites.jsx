import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import ProductCard from '../../components/ui/ProductCard';
import productsData from '../../data/products.json';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/favorites')
        .then((res) => {
          // Map favorite objects to catalog products
          const favProductIds = res.data.map((fav) => fav.product_id || fav.id);
          const matched = productsData.filter((p) => favProductIds.includes(p.id));
          setFavorites(matched);
          setLoading(false);
        })
        .catch(() => {
          // Empty mock fallback
          setFavorites([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <PageWrapper className="flex-center" style={{ minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          SYNC_FAVORITES_CACHE...
        </p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="section-sm">
      <div className="container">
        <h2 style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xl)' }}>FAVORITE_CACHED_ITEMS</h2>

        {!isAuthenticated ? (
          <div
            className="glass-card-static flex-center"
            style={{
              padding: 'var(--space-3xl)',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              border: '1px dashed var(--glass-border)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '32px' }}>🔒</span>
            <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0 }}>
              AUTHORIZATION_REQUIRED_TO_VIEW_FAVORITES
            </p>
          </div>
        ) : favorites.length === 0 ? (
          <div
            className="glass-card-static flex-center"
            style={{
              padding: 'var(--space-3xl)',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              border: '1px dashed var(--glass-border)',
            }}
          >
            <span style={{ fontSize: '32px' }}>💖</span>
            <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0 }}>
              FAVORITES_BUFFER_EMPTY
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'var(--space-xl)',
            }}
          >
            {favorites.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Favorites;
