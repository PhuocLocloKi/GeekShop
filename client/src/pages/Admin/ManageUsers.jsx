import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Sidebar from '../../components/layout/Sidebar';
import { formatDate } from '../../utils/formatDate';
import { showSuccess, showError } from '../../components/common/Toast';
import api from '../../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    api.get('/admin/users')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback user mock db table list
        setUsers([
          { id: 1, name: 'ADMIN_NODE', email: 'admin@geekshop.net', role: 'admin', created_at: new Date().toISOString() },
          { id: 2, name: 'REGULAR_USER', email: 'user@geekshop.net', role: 'user', created_at: new Date().toISOString() }
        ]);
        setLoading(false);
      });
  };

  const handleToggleRole = async (userId, currentRole) => {
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await api.put(`/admin/users/${userId}/role`, { role: nextRole });
      showSuccess(`User role modified successfully to ${nextRole.toUpperCase()}.`);
      fetchUsers();
    } catch (err) {
      showError('Failed to alter user privileges.');
    }
  };

  return (
    <PageWrapper style={{ flexDirection: 'row' }}>
      <Sidebar />

      <div style={{ flexGrow: 1, padding: 'var(--space-xl)' }}>
        <h2 style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xl)' }}>PRIVILEGES_CONTROL</h2>

        <div className="glass-card-static responsive-table" style={{ border: '1px solid var(--glass-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '12px' }}>USER_ID</th>
                <th style={{ padding: '12px' }}>ALIAS</th>
                <th style={{ padding: '12px' }}>EMAIL</th>
                <th style={{ padding: '12px' }}>ROLE</th>
                <th style={{ padding: '12px' }}>CREATION_DATE</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px dotted rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px', color: 'var(--neon-cyan)', fontWeight: 'bold' }}>#{u.id}</td>
                  <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{u.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      className={`cyber-tag ${u.role === 'admin' ? 'cyber-tag-green' : 'cyber-tag-gray'}`}
                    >
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{formatDate(u.created_at)}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleToggleRole(u.id, u.role)}
                      className="cyber-btn cyber-btn-secondary cyber-btn-sm"
                      style={{ fontSize: '9px', padding: '4px 8px' }}
                    >
                      TOGGLE_ROLE
                    </button>
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

export default ManageUsers;
