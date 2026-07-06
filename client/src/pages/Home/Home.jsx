import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero3D from '../../components/three/Hero3D/Hero3D';
import useScrollProgress from '../../hooks/useScrollProgress';
import PageWrapper from '../../components/layout/PageWrapper';
import ProductCard from '../../components/ui/ProductCard';
import Button from '../../components/common/Button';
import productsData from '../../data/products.json';
import { ArrowRight, Cpu, Terminal, ShieldAlert } from 'lucide-react';

const Home = () => {
  const { progress } = useScrollProgress();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(productsData.slice(0, 4));
  }, []);

  return (
    <PageWrapper>
      {/* Hero Section — Split Layout: Text Left, 3D Fox Right */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          background: '#090a0f',
        }}
      >
        {/* Full-screen 3D Canvas (fox is positioned inside at right) */}
        <Hero3D scrollProgress={progress} />

        {/* HTML Text Content — Left Side */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)',
            maxWidth: '520px',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, var(--text-hero))',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            GEEK HARDWARE <br />
            <span className="text-gradient-cyan">FORGE</span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              borderLeft: '2px solid var(--neon-cyan)',
              paddingLeft: '14px',
              maxWidth: '440px',
            }}
          >
            Equipping cyber-space netrunners with advanced hardware tools. Load recovery systems, configure high-performance optical networking cards, or scale IoT nodes.
          </p>

          <div style={{ pointerEvents: 'auto', marginTop: 'var(--space-md)' }}>
            <Link to="/products">
              <Button variant="primary" size="lg">
                [ BROWSE_CATALOG ]
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-code)',
            fontSize: '9px',
            color: 'var(--text-muted)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <span>SCROLL_TO_EXPLORE_3D_VIEW</span>
          <div
            style={{
              width: '1px',
              height: '30px',
              background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
              animation: 'float 2s infinite',
            }}
          />
        </div>
      </section>

      {/* Feature coordinate specs section */}
      <section
        className="section grid-background"
        style={{
          background: 'var(--bg-deep)',
          borderTop: '1px solid var(--glass-border)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-2xl)',
            }}
          >
            {[
              {
                icon: <Cpu size={28} className="neon-text-green" />,
                title: 'PREMIUM_BOARDS',
                desc: 'Official micro-controllers and display shields with massive flash memories and optimized GPIO pins.',
              },
              {
                icon: <Terminal size={28} className="neon-text-cyan" />,
                title: 'OS_RECOVERY',
                desc: 'Multi-boot recovery systems preloaded with comprehensive diagnostics for system repair and testing.',
              },
              {
                icon: <ShieldAlert size={28} className="neon-text-pink" />,
                title: 'CYBER_SECURE',
                desc: 'End-to-end telemetry and network routing gear featuring high-speed 10Gbps SFP+ optic fibers.',
              },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="glass-card-static"
                style={{
                  padding: 'var(--space-xl)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-md)',
                }}
              >
                <div>{feat.icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-code)',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {feat.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="flex-between" style={{ marginBottom: 'var(--space-2xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-3xl)',
                  textTransform: 'uppercase',
                }}
              >
                FEATURED_ITEMS
              </h2>
              <p style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                CODENAME: HIGHEST_RATED_INVENTORY
              </p>
            </div>
            <Link
              to="/products"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                fontFamily: 'var(--font-code)',
                fontSize: 'var(--text-sm)',
                color: 'var(--neon-cyan)',
              }}
            >
              <span>VIEW_ALL</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'var(--space-xl)',
            }}
          >
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
