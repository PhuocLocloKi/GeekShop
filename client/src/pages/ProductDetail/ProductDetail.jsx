import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import ImageGallery from '../../components/ui/ImageGallery';
import ProductViewer3D from '../../components/three/ProductViewer3D/ProductViewer3D';
import SpecsTable from '../../components/ui/SpecsTable';
import ReviewForm from '../../components/ui/ReviewForm';
import StarRating from '../../components/common/StarRating';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { showSuccess, showError, showInfo } from '../../components/common/Toast';
import productsData from '../../data/products.json';
import api from '../../services/api';
import { Heart, Plus, Minus, Shield, HelpCircle, CornerDownRight } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews'

  useEffect(() => {
    setLoading(true);
    // Fetch product details from server
    api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to offline catalog JSON
        const found = productsData.find((p) => p.id === Number(id));
        setProduct(found || null);
        setLoading(false);
      });

    // Fetch reviews
    api.get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch(() => {
        // Sample fallback reviews
        setReviews([
          { id: 1, user_name: 'NETRUNNER_X', rating: 5, comment: 'Flawless recovery speeds. Fully boots Ubuntu/Arch instances instantly.', created_at: new Date().toISOString() },
          { id: 2, user_name: 'CYBER_MAKER_99', rating: 4, comment: 'Extremely clean build. Fits correctly inside standard chassis brackets.', created_at: new Date().toISOString() }
        ]);
      });

    // Check favorites
    if (isAuthenticated) {
      api.get('/favorites')
        .then((res) => {
          const isFav = res.data.some((fav) => fav.product_id === Number(id) || fav.id === Number(id));
          setIsFavorite(isFav);
        })
        .catch(() => {});
    }
  }, [id, isAuthenticated]);

  const handleQtyChange = (val) => {
    if (val < 1) return;
    if (product && val > product.stock) {
      showError(`Only ${product.stock} units available in inventory.`);
      return;
    }
    setQuantity(val);
  };

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;
    addToCart(product, quantity);
    showSuccess(`[${quantity}x ${product.name.substring(0, 15)}...] sync_to_cart successful.`);
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      showInfo('Authorization required: Please login to save favorites.');
      return;
    }
    try {
      await api.post(`/favorites/${product.id}`);
      setIsFavorite(!isFavorite);
      if (!isFavorite) {
        showSuccess('Item cached in favorites.');
      } else {
        showInfo('Item removed from favorites.');
      }
    } catch (err) {
      showError('Failed to update favorites.');
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    setSubmittingReview(true);
    try {
      const res = await api.post('/reviews', {
        productId: product.id,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      // Append new review with dummy username
      setReviews((prev) => [
        ...prev,
        {
          id: res.data.id || Date.now(),
          user_name: 'CURRENT_USER',
          rating: reviewData.rating,
          comment: reviewData.comment,
          created_at: new Date().toISOString(),
        },
      ]);
      showSuccess('Review submitted successfully.');
    } catch (err) {
      showError('Failed to post review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper className="flex-center" style={{ minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          DECRYPTING_PRODUCT_MANIFEST...
        </p>
      </PageWrapper>
    );
  }

  if (!product) {
    return (
      <PageWrapper className="flex-center" style={{ minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--neon-pink)' }}>
          ERROR: PRODUCT_NOT_FOUND
        </p>
        <Link to="/products" style={{ marginTop: 'var(--space-md)' }}>
          <Button variant="secondary" size="sm">RETURN_TO_INVENTORY</Button>
        </Link>
      </PageWrapper>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <PageWrapper className="section-sm">
      <div className="container">
        {/* Breadcrumb link */}
        <div style={{ marginBottom: 'var(--space-xl)', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)' }}>
          <Link to="/products" style={{ color: 'var(--text-muted)' }}>INVENTORY</Link>
          <span style={{ color: 'var(--text-dim)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--neon-cyan)' }}>{product.category.toUpperCase()}</span>
        </div>

        {/* 2 Column Details Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-3xl)', alignItems: 'start' }}>
          
          {/* LEFT COLUMN: Visual Media (Gallery + 3D Viewer) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {/* Image Gallery */}
            <ImageGallery images={[product.image_url]} />

            {/* 3D Interactive Viewer Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CornerDownRight size={14} style={{ color: 'var(--neon-cyan)' }} />
                <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-cyan)', letterSpacing: '0.1em' }}>
                  DECRYPTED_3D_SCHEMATIC
                </span>
              </div>
              <ProductViewer3D productId={product.id} category={product.category} />
            </div>
          </div>

          {/* RIGHT COLUMN: Specifications, Buying, and Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                CODENAME: {product.brand.toUpperCase()}
              </span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 700, margin: '4px 0 8px 0' }}>
                {product.name}
              </h1>

              {/* Star ratings */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <StarRating rating={product.rating_avg} size={16} />
                <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  {product.rating_avg}★ // ({reviews.length} SYSTEM_REVIEWS)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div
              className="glass-card-static"
              style={{
                padding: 'var(--space-md) var(--space-lg)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'block' }}>
                  UNIT_PRICE
                </span>
                <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--neon-green)', textShadow: '0 0 10px rgba(16,185,129,0.3)' }}>
                  {formatCurrency(product.price)}
                </span>
              </div>

              <div>
                {isOutOfStock ? (
                  <Badge type="sold out" />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="status-dot status-dot-green" />
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-green)' }}>
                      IN_STOCK ({product.stock} units)
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {product.description}
            </p>

            {/* Quantity Selector and Cart CTAs */}
            {!isOutOfStock && (
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Quantity box */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(9, 10, 15, 0.4)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => handleQtyChange(quantity - 1)}
                    style={{ padding: '10px 14px', borderRight: '1px solid var(--glass-border)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '0 16px', fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', minWidth: '40px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(quantity + 1)}
                    style={{ padding: '10px 14px', borderLeft: '1px solid var(--glass-border)', color: 'var(--text-secondary)', cursor: 'pointer' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="md"
                  style={{ flexGrow: 1 }}
                >
                  [ CONNECT_TO_CART ]
                </Button>

                {/* Add to favorites heart toggle */}
                <button
                  onClick={handleToggleFavorite}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--glass-border)',
                    background: isFavorite ? 'rgba(244, 114, 182, 0.1)' : 'rgba(9, 10, 15, 0.4)',
                    color: isFavorite ? 'var(--neon-pink)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <Heart size={20} fill={isFavorite ? 'var(--neon-pink)' : 'transparent'} />
                </button>
              </div>
            )}

            {/* Specs & Reviews Tabs */}
            <div style={{ marginTop: 'var(--space-lg)' }}>
              {/* Tabs buttons */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', marginBottom: 'var(--space-md)' }}>
                <button
                  onClick={() => setActiveTab('specs')}
                  style={{
                    padding: '10px 20px',
                    fontFamily: 'var(--font-code)',
                    fontSize: 'var(--text-xs)',
                    color: activeTab === 'specs' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                    borderBottom: '2px solid',
                    borderColor: activeTab === 'specs' ? 'var(--neon-cyan)' : 'transparent',
                    cursor: 'pointer',
                    background: 'none',
                  }}
                >
                  SPECIFICATIONS
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  style={{
                    padding: '10px 20px',
                    fontFamily: 'var(--font-code)',
                    fontSize: 'var(--text-xs)',
                    color: activeTab === 'reviews' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                    borderBottom: '2px solid',
                    borderColor: activeTab === 'reviews' ? 'var(--neon-cyan)' : 'transparent',
                    cursor: 'pointer',
                    background: 'none',
                  }}
                >
                  REVIEWS ({reviews.length})
                </button>
              </div>

              {/* Tab views */}
              {activeTab === 'specs' ? (
                <SpecsTable specs={product.specs} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  {/* Reviews List */}
                  {reviews.length === 0 ? (
                    <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      [NO_FEEDBACK_ENTRIES_FOUND]
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                      {reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="glass-card-static"
                          style={{
                            padding: '12px 16px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-cyan)' }}>
                              {rev.user_name}
                            </span>
                            <StarRating rating={rev.rating} size={12} />
                          </div>
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', margin: 0 }}>
                            {rev.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Review input */}
                  {isAuthenticated ? (
                    <ReviewForm onSubmit={handleReviewSubmit} submitting={submittingReview} />
                  ) : (
                    <div
                      className="glass-card-static flex-center"
                      style={{
                        padding: 'var(--space-md)',
                        border: '1px dashed var(--glass-border)',
                        textAlign: 'center',
                      }}
                    >
                      <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0 }}>
                        [AUTHENTICATION_REQUIRED_TO_POST_FEEDBACK]
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetail;
