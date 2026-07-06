import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/common/Button';

const NotFound = () => {
  return (
    <PageWrapper className="flex-center" style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}>
      <div
        className="glass-card-static"
        style={{
          width: '90%',
          maxWidth: '500px',
          padding: 'var(--space-2xl) var(--space-xl)',
          border: '1px solid var(--neon-pink)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)',
          boxShadow: 'var(--glow-pink-intense)',
          background: 'rgba(9, 10, 15, 0.9)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-lg)', color: 'var(--neon-pink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚠️</span>
          <span>FATAL_SYS_CRASH: 404_PAGE_NOT_FOUND</span>
        </div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(244, 114, 182, 0.2)',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-code)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          <div>&gt; ACCESS_VIOLATION: REQUESTED_URI_NOT_DECRYPTABLE</div>
          <div>&gt; LOCATION: ROUTE_BUFFER_FAULT</div>
          <div>&gt; STACK_TRACE: PageRouter.jsx @ lines: 404</div>
          <div style={{ color: 'var(--neon-pink)', marginTop: '8px' }}>&gt; ACTION: Redirecting payload to root directory is recommended.</div>
        </div>

        <Link to="/" style={{ alignSelf: 'center', marginTop: 'var(--space-sm)' }}>
          <Button variant="danger" size="md">
            [ FLUSH_BUFFER_GO_HOME ]
          </Button>
        </Link>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
