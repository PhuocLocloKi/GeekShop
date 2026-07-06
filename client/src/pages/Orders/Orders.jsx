import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '../../utils/constants';
import api from '../../services/api';
import Badge from '../../components/common/Badge';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    api.get('/orders')
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo orders
        setOrders([
          {
            id: 2049,
            created_at: new Date().toISOString(),
            status: 'pending',
            total_amount: 1551464,
            address: 'District 1, Ho Chi Minh City',
            phone: '0901234567',
            details: [
              { id: 1, name: 'Arduino® UNO™ Q 4GB [ABX00173]', quantity: 1, unit_price: 1551464 }
            ]
          }
        ]);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <PageWrapper className="flex-center" style={{ minHeight: '60vh' }}>
        <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          SYNCHRONIZING_TRANSACTION_HISTORY...
        </p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="section-sm">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xl)' }}>TRANSACTION_LOGS</h2>

        {orders.length === 0 ? (
          <div
            className="glass-card-static flex-center"
            style={{
              padding: 'var(--space-3xl)',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              border: '1px dashed var(--glass-border)',
            }}
          >
            <span style={{ fontSize: '32px' }}>📊</span>
            <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0 }}>
              NO_TRANSACTION_LOGS_FOUND_IN_BUFFER
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {orders.map((order) => {
              const isExpanded = expandedId === order.id;
              const statusColor = ORDER_STATUS_COLORS[order.status] || 'gray';
              const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status.toUpperCase();

              return (
                <div
                  key={order.id}
                  className="glass-card-static"
                  style={{
                    border: '1px solid var(--glass-border)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Order main row summary */}
                  <div
                    onClick={() => toggleExpand(order.id)}
                    style={{
                      padding: 'var(--space-md) var(--space-lg)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      flexWrap: 'wrap',
                      gap: 'var(--space-md)',
                      background: isExpanded ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
                        ORDER_ID: #{order.id}
                      </span>
                      <span style={{ fontFamily: 'var(--font-code)', fontSize: '10px', color: 'var(--text-muted)' }}>
                        TIMESTAMP: {formatDate(order.created_at)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '9px', fontFamily: 'var(--font-code)', color: 'var(--text-muted)' }}>
                          TOTAL_COST
                        </span>
                        <span style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--neon-green)', fontWeight: 'bold' }}>
                          {formatCurrency(order.total_amount)}
                        </span>
                      </div>

                      <Badge type={statusColor} label={statusLabel} />
                    </div>
                  </div>

                  {/* Expanded Items view detail */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: 'var(--space-lg)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        background: 'rgba(9, 10, 15, 0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-md)',
                      }}
                    >
                      <h4 style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--neon-cyan)', margin: 0 }}>
                        METADATA_MANIFEST
                      </h4>

                      {/* Items details table */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                        {(order.details || []).map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontFamily: 'var(--font-code)',
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>{formatCurrency(item.unit_price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <hr style={{ border: 'none', height: '1px', background: 'rgba(255, 255, 255, 0.05)' }} />

                      {/* Shipping details */}
                      <div style={{ fontFamily: 'var(--font-code)', fontSize: '10px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div>
                          <span>SHIPPING_ADDRESS: </span>
                          <span style={{ color: 'var(--text-secondary)' }}>{order.address}</span>
                        </div>
                        <div>
                          <span>CONTACT_PHONE: </span>
                          <span style={{ color: 'var(--text-secondary)' }}>{order.phone}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Orders;
