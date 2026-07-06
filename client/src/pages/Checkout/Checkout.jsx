import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { validateForm, isRequired, isValidEmail, isValidPhone } from '../../utils/validators';
import Button from '../../components/common/Button';
import { showSuccess, showError } from '../../components/common/Toast';
import api from '../../services/api';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    paymentMethod: 'cod', // 'cod' | 'card_demo'
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Validation rules
    const rules = {
      name: [{ validate: isRequired, message: 'Name is required' }],
      email: [
        { validate: isRequired, message: 'Email is required' },
        { validate: isValidEmail, message: 'Invalid email address' }
      ],
      phone: [
        { validate: isRequired, message: 'Phone is required' },
        { validate: isValidPhone, message: 'Invalid phone number' }
      ],
      address: [{ validate: isRequired, message: 'Shipping address is required' }],
    };

    const validationErrors = validateForm(formData, rules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError('Please check form parameters for missing configuration.');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: cartTotal,
        address: formData.address,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
      };

      await api.post('/orders', orderPayload);
      showSuccess('Order synchronized with database. System dispatch starting.');
      clearCart();
      navigate('/orders');
    } catch (err) {
      showError('Transaction failed: Order routing connection error.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <PageWrapper className="flex-center" style={{ minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
          Checkout buffer empty. Add items to checkout.
        </p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="section-sm">
      <div className="container">
        <h2 style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xl)' }}>SECURE_TRANSACTION_GATEWAY</h2>

        <form
          onSubmit={handlePlaceOrder}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}
        >
          {/* LEFT: Shipping Form details */}
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
            <h3 style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--neon-cyan)', margin: 0 }}>
              SHIPPING_MANIFEST
            </h3>

            {/* Name */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">FULL_NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`cyber-input ${errors.name ? 'cyber-input-error' : ''}`}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">EMAIL_ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`cyber-input ${errors.email ? 'cyber-input-error' : ''}`}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">PHONE_NUMBER</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`cyber-input ${errors.phone ? 'cyber-input-error' : ''}`}
                placeholder="e.g. 0912345678"
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            {/* Address */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">SHIPPING_ADDRESS</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`cyber-input cyber-textarea ${errors.address ? 'cyber-input-error' : ''}`}
              />
              {errors.address && <span className="form-error">{errors.address}</span>}
            </div>
          </div>

          {/* RIGHT: Summary & Payment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            
            {/* Order summary display */}
            <div
              className="glass-card-static"
              style={{
                padding: 'var(--space-lg)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-cyan)', margin: '0 0 4px 0' }}>
                ORDER_MANIFEST
              </h4>

              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)' }}>
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                    {item.quantity}x {item.name}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}

              <hr style={{ border: 'none', height: '1px', background: 'var(--glass-border)', margin: '8px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-code)' }}>
                <span style={{ fontWeight: 'bold' }}>TOTAL_AMOUNT:</span>
                <span style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>
                  {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>

            {/* Payment Method selection */}
            <div
              className="glass-card-static"
              style={{
                padding: 'var(--space-lg)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-cyan)', margin: '0 0 4px 0' }}>
                PAYMENT_PROTOCOL
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {/* Cash on delivery */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <span>Cash on Delivery</span>
                </label>

                {/* Simulated Payment */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card_demo"
                    checked={formData.paymentMethod === 'card_demo'}
                    onChange={handleInputChange}
                  />
                  <span>Simulated stripe / paypal gateway (mock)</span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={submitting}
                style={{ width: '100%', marginTop: 'var(--space-sm)' }}
              >
                [ PLACE_ORDER ]
              </Button>
            </div>

          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
