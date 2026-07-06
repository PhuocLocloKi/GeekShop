import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { showSuccess, showError } from '../../components/common/Toast';
import { Shield, Eye, EyeOff, Terminal, Cpu, Lock, User, Mail, ShieldAlert } from 'lucide-react';
import { validatePassword } from '../../utils/validators';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password strength calculation
  const [strength, setStrength] = useState({ strength: 'weak', message: '' });

  useEffect(() => {
    if (password) {
      setStrength(validatePassword(password));
    } else {
      setStrength({ strength: 'weak', message: '' });
    }
  }, [password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !password || !confirmPassword) {
      showError('Please configure all authorization parameters.');
      return;
    }

    if (password !== confirmPassword) {
      showError('Authorization error: Passwords do not match.');
      return;
    }

    if (!strength.valid && password) {
      showError(strength.message);
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      showSuccess('Terminal authorization granted. Node initialized.');
      navigate('/');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Access Denied: Node compilation error.';
      setErrorMsg(errMsg);
      showError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (strength.strength === 'strong') return 'var(--neon-green)';
    if (strength.strength === 'medium') return 'var(--neon-gold)';
    return 'var(--neon-pink)';
  };

  const getStrengthWidth = () => {
    if (strength.strength === 'strong') return '100%';
    if (strength.strength === 'medium') return '66%';
    return '33%';
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
      {/* Ambient background glows */}
      <div 
        style={{
          position: 'absolute',
          top: '15%',
          right: '25%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(70px)',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.08) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      <div
        className="glass-card-static"
        style={{
          width: '90%',
          maxWidth: '460px',
          padding: 'var(--space-2xl) var(--space-xl)',
          border: '1px solid rgba(6, 182, 212, 0.25)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)',
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

        {/* Scanline Effect */}
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
            <span style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--neon-cyan)', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid var(--bg-void)', boxShadow: '0 0 5px var(--neon-cyan)' }} />
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
              INITIALIZE NODE
            </h3>
            <span style={{ fontFamily: 'var(--font-code)', fontSize: '10px', color: 'var(--neon-cyan)', opacity: 0.85, letterSpacing: '1px' }}>
              GATEWAY: HTTPS://GEEKSHOP.TERM/REGISTER
            </span>
          </div>
        </div>

        {errorMsg && (
          <div
            style={{
              background: 'rgba(239, 68, 110, 0.12)',
              border: '1.5px solid var(--neon-pink)',
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
            <span>COMPILE_ERROR: {errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Username */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '1px' }}>
              <User size={12} className="neon-text-cyan" /> ALIAS_NAME
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. NetrunnerX"
              className="cyber-input"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(9, 10, 15, 0.65)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '10px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                color: '#fff',
              }}
            />
          </div>

          {/* Email */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '1px' }}>
              <Mail size={12} className="neon-text-cyan" /> NODE_EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. netrunner@geekshop.net"
              className="cyber-input"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(9, 10, 15, 0.65)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '10px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                color: '#fff',
              }}
            />
          </div>

          {/* Password */}
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
                  padding: '12px 40px 12px 16px',
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
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={16} className="neon-text-pink" /> : <Eye size={16} className="neon-text-cyan" />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: getStrengthWidth(),
                      height: '100%',
                      background: getStrengthColor(),
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
                <span style={{ display: 'block', fontSize: '9px', fontFamily: 'var(--font-code)', color: getStrengthColor(), marginTop: '4px', textAlign: 'right' }}>
                  {strength.message.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', letterSpacing: '1px' }}>
              <ShieldAlert size={12} className="neon-text-pink" /> VERIFY_PASS_CODE
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="cyber-input"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(9, 10, 15, 0.65)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '10px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                color: '#fff',
              }}
            />
          </div>

          <div style={{ pointerEvents: 'auto', marginTop: '8px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.25) 100%)',
                border: '1px solid var(--neon-cyan)',
                borderRadius: '10px',
                color: 'var(--neon-cyan)',
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
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.1)',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(8, 145, 178, 0.4) 100%)';
                e.target.style.boxShadow = '0 0 25px rgba(6, 182, 212, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.25) 100%)';
                e.target.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.1)';
              }}
            >
              {loading ? (
                <>
                  <Cpu size={16} className="animate-spin" />
                  COMPILING NODE...
                </>
              ) : (
                '[ INITIALIZE CONNECTION ]'
              )}
            </button>
          </div>
        </form>

        <span
          style={{
            fontFamily: 'var(--font-code)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginTop: '8px',
          }}
        >
          Node connection active?{' '}
          <Link to="/login" style={{ color: 'var(--neon-cyan)', textShadow: '0 0 6px rgba(6,182,212,0.25)', fontWeight: 'bold' }}>
            [ LOGIN ]
          </Link>
        </span>
      </div>
    </PageWrapper>
  );
};

export default Register;
