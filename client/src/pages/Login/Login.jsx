import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { showSuccess, showError } from '../../components/common/Toast';
import { Shield, Eye, EyeOff, Terminal, Cpu, Lock, User } from 'lucide-react';
import { authService } from '../../services/authService';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle OAuth Redirect Callback Token
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oauthToken = params.get('token');
    if (oauthToken) {
      try {
        localStorage.setItem('token', oauthToken);
        showSuccess('OAuth authorization granted. Session active.');
        // Refresh application state by redirecting to Home page
        window.location.href = '/';
      } catch (err) {
        showError('Access Denied: OAuth token compilation error.');
      }
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      showError('Please configure email and password parameters.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      showSuccess('Terminal authorization granted. Session active.');
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Access Denied: Invalid credentials.';
      setErrorMsg(errMsg);
      showError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    const oauthUrl = provider === 'google' 
      ? authService.getGoogleAuthUrl() 
      : authService.getFacebookAuthUrl();
    window.location.href = oauthUrl;
  };

  return (
    <PageWrapper 
      style={{ 
        minHeight: 'calc(100vh - var(--navbar-height))', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
      }}
    >
      {/* Decorative cyber grid or ambient light background */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '25%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(80px)',
        }}
      />

      <div
        className="glass-card-static"
        style={{
          width: '90%',
          maxWidth: '450px',
          padding: 'var(--space-2xl) var(--space-xl)',
          border: '1px solid rgba(6, 182, 212, 0.25)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-lg)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(6, 182, 212, 0.15)',
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.8) 0%, rgba(11, 13, 20, 0.9) 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Futuristic Card Corner Borders */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '15px', height: '15px', borderLeft: '3px solid var(--neon-cyan)', borderTop: '3px solid var(--neon-cyan)', borderTopLeftRadius: '8px' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '15px', height: '15px', borderRight: '3px solid var(--neon-cyan)', borderTop: '3px solid var(--neon-cyan)', borderTopRightRadius: '8px' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '15px', height: '15px', borderLeft: '3px solid var(--neon-cyan)', borderBottom: '3px solid var(--neon-cyan)', borderBottomLeftRadius: '8px' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '15px', height: '15px', borderRight: '3px solid var(--neon-cyan)', borderBottom: '3px solid var(--neon-cyan)', borderBottomRightRadius: '8px' }} />

        {/* Scanning Light Line Effect */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
            animation: 'scanlineScroll 6s linear infinite',
            opacity: 0.6
          }}
        />

        {/* Terminal Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1.5px solid var(--neon-cyan)',
              color: 'var(--neon-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.25)',
              position: 'relative',
            }}
          >
            <Shield size={24} style={{ filter: 'drop-shadow(0 0 5px var(--neon-cyan))' }} />
            <span style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--neon-green)', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid var(--bg-void)', boxShadow: '0 0 5px var(--neon-green)' }} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.05em',
                margin: '8px 0 2px 0',
                textShadow: '0 0 10px rgba(255,255,255,0.1)'
              }}
            >
              AUTHORIZE ACCESS
            </h3>
            <span style={{ fontFamily: 'var(--font-code)', fontSize: '10px', color: 'var(--neon-cyan)', opacity: 0.85, letterSpacing: '1px' }}>
              SECURE PROTOCOL NODE // GEEKSHOP.TERM
            </span>
          </div>
        </div>

        {/* Error banner */}
        {errorMsg && (
          <div
            style={{
              background: 'rgba(239, 68, 110, 0.12)',
              border: '1.5px solid var(--neon-red)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              fontFamily: 'var(--font-code)',
              fontSize: 'var(--text-xs)',
              color: '#fca5a5',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Terminal size={14} className="neon-text-pink" />
            <span>SYSTEM_ERROR: {errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '1px' }}>
              <User size={12} className="neon-text-cyan" /> USER_EMAIL
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. netrunner@geekshop.net"
                className="cyber-input"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(9, 10, 15, 0.65)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  color: '#fff',
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '1px' }}>
              <Lock size={12} className="neon-text-pink" /> PASS_CODE
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="cyber-input"
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 16px',
                  background: 'rgba(9, 10, 15, 0.65)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  color: '#fff',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={18} className="neon-text-pink" /> : <Eye size={18} className="neon-text-cyan" />}
              </button>
            </div>
          </div>

          <div style={{ pointerEvents: 'auto', marginTop: '4px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)',
                border: '1px solid var(--neon-green)',
                borderRadius: '10px',
                color: 'var(--neon-green)',
                fontFamily: 'var(--font-code)',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.1)',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.5) 100%)';
                e.target.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)';
                e.target.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.1)';
              }}
            >
              {loading ? (
                <>
                  <Cpu size={16} className="animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                '[ RUN AUTHORIZATION ]'
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '8px 0' }}>
          <div style={{ flexGrow: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent)' }} />
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>OAUTH ALTERNATIVES</span>
          <div style={{ flexGrow: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent)' }} />
        </div>

        {/* Beautiful Google & Facebook OAuth Buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <button
            onClick={() => handleOAuth('google')}
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              color: '#e2e8f0',
              fontFamily: 'var(--font-code)',
              fontSize: '11px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Google Colorful Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.6-4.53-2.6-4.53z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            GOOGLE
          </button>

          <button
            onClick={() => handleOAuth('facebook')}
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              color: '#e2e8f0',
              fontFamily: 'var(--font-code)',
              fontSize: '11px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.5)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(244, 114, 182, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Facebook Clean Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
            </svg>
            FACEBOOK
          </button>
        </div>

        {/* Link to Register */}
        <span
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginTop: '8px',
          }}
        >
          New node connection?{' '}
          <Link to="/register" style={{ color: 'var(--neon-green)', textShadow: '0 0 6px rgba(16,185,129,0.25)', fontWeight: 'bold' }}>
            [ CONNECT_NODE ]
          </Link>
        </span>
      </div>
    </PageWrapper>
  );
};

export default Login;
