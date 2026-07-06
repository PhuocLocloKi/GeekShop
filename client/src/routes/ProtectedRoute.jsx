import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#090a0f',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-code)',
        fontSize: 'var(--text-sm)',
      }}>
        VERIFYING_CREDENTIALS_SECURE_NODE...
      </div>
    );
  }

  if (!isAuthenticated) {
    // Intercept navigation target to redirect user back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    // Non-admin trying to view admin page -> send back to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
