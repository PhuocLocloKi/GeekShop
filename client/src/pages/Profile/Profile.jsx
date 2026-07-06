import React, { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { showSuccess, showError } from '../../components/common/Toast';
import api from '../../services/api';
import { User, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();

  // Profile data states
  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [loading, setLoading] = useState(false);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name) {
      showError('Alias name parameter cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.put('/auth/profile', { name, avatarUrl });
      updateUser(res.data.user || { name, avatar_url: avatarUrl });
      showSuccess('Node parameters updated successfully.');
    } catch (err) {
      showError('Failed to synchronize profile changes.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showError('Please configure all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showError('Verification error: Passwords do not match.');
      return;
    }

    setPassLoading(true);
    try {
      await api.put('/auth/password', { currentPassword, newPassword });
      showSuccess('Security keys updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      showError(err.response?.data?.message || 'Access Denied: Current password mismatch.');
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <PageWrapper className="section-sm">
      <div className="container">
        <h2 style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xl)' }}>NODE_PROFILE_CONTROL</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
          {/* Column 1: Profile specs */}
          <form
            onSubmit={handleUpdateProfile}
            className="glass-card-static"
            style={{
              padding: 'var(--space-xl)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--neon-cyan)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} />
              <span>IDENTITY_ATTRIBUTES</span>
            </h3>

            {/* Avatar display with pulse glow */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--space-md) 0' }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '2px solid var(--neon-cyan)',
                  boxShadow: 'var(--glow-cyan)',
                  overflow: 'hidden',
                  background: 'rgba(9, 10, 15, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <User size={48} style={{ color: 'var(--text-dim)' }} />
                )}
              </div>
            </div>

            {/* Email (Readonly) */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>NODE_EMAIL (LOCKED)</label>
              <input type="email" value={user?.email || ''} readOnly className="cyber-input" style={{ opacity: 0.5, cursor: 'not-allowed' }} />
            </div>

            {/* Name */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">ALIAS_NAME</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="cyber-input" />
            </div>

            {/* Avatar URL */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">AVATAR_URL</label>
              <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="cyber-input" placeholder="HTTPS://IMAGE_LINK" />
            </div>

            <Button type="submit" variant="primary" size="sm" loading={loading} style={{ width: '100%' }}>
              [ SYNCHRONIZE_PROFILE ]
            </Button>
          </form>

          {/* Column 2: Password modifier */}
          <form
            onSubmit={handleUpdatePassword}
            className="glass-card-static"
            style={{
              padding: 'var(--space-xl)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', color: 'var(--neon-pink)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} />
              <span>SECURITY_CREDENTIALS</span>
            </h3>

            {/* Current password */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">CURRENT_PASS_CODE</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="cyber-input" />
            </div>

            {/* New password */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">NEW_PASS_CODE</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="cyber-input" />
            </div>

            {/* Confirm password */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">VERIFY_NEW_PASS_CODE</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="cyber-input" />
            </div>

            <Button type="submit" variant="danger" size="sm" loading={passLoading} style={{ width: '100%' }}>
              [ SYNC_NEW_SECURITY_KEYS ]
            </Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Profile;
