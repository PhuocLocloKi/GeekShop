import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Sidebar from '../../components/layout/Sidebar';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { ORDER_STATUS_LABELS } from '../../utils/constants';
import { showSuccess, showError } from '../../components/common/Toast';
import api from '../../services/api';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    api.get('/admin/orders')
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback dummy database orders list
        setOrders([
          { id: 2049, user_name: 'NETRUNNER_X', created_at: new Date().toISOString(), total_amount: 1551464, status: 'pending' }
        ]);
        setLoading(false);
      });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/orders/${id}/status`, { status: newStatus });
      showSuccess(`Order #${id} status updated to ${newStatus.toUpperCase()}.`);
      fetchOrders();
    } catch (err) {
      showError('Failed to synchronize status update.');
    }
  };

  return (
    <PageWrapper style={{ flexDirection: 'row' }}>
      <Sidebar />

      <div style={{ flexGrow: 1, padding: 'var(--space-xl)' }}>
        <h2 style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xl)' }}>SYSTEM_ORDERS_MANIFEST</h2>

        <div className="glass-card-static responsive-table" style={{ border: '1px solid var(--glass-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '12px' }}>ORDER_ID</th>
                <th style={{ padding: '12px' }}>CUSTOMER</th>
                <th style={{ padding: '12px' }}>TIMESTAMP</th>
                <th style={{ padding: '12px' }}>TOTAL_COST</th>
                <th style={{ padding: '12px' }}>STATUS_PROTOCOL</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px dotted rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px', color: 'var(--neon-cyan)', fontWeight: 'bold' }}>#{o.id}</td>
                  <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{o.user_name || 'SYSTEM_NODE'}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{formatDate(o.created_at)}</td>
                  <td style={{ padding: '12px', color: 'var(--neon-green)' }}>{formatCurrency(o.total_amount)}</td>
                  <td style={{ padding: '12px' }}>
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className="cyber-input cyber-select"
                      style={{ padding: '4px 28px 4px 12px', fontSize: 'var(--text-xs)', width: '130px' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ManageOrders;
