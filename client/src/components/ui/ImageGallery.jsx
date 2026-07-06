import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../common/Modal';

const ImageGallery = ({ images = [] }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {/* Main Display Image */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '85%',
          background: 'rgba(9, 10, 15, 0.4)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          cursor: 'zoom-in',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={images[activeIdx]}
          alt={`product image ${activeIdx}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: 'var(--space-lg)',
            imageRendering: 'pixelated',
          }}
        />
        {/* Zoom Overlay Button */}
        <div
          className="flex-center"
          style={{
            position: 'absolute',
            right: '16px',
            bottom: '16px',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(9, 10, 15, 0.8)',
            border: '1px solid var(--glass-border)',
            color: 'var(--neon-cyan)',
            boxShadow: 'var(--glow-cyan)',
          }}
        >
          <ZoomIn size={18} />
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: 'var(--space-sm)', overflowX: 'auto', paddingBottom: '4px' }}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                position: 'relative',
                width: '70px',
                height: '70px',
                flexShrink: 0,
                background: 'rgba(9, 10, 15, 0.4)',
                border: '1px solid',
                borderColor: idx === activeIdx ? 'var(--neon-cyan)' : 'var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <img
                src={img}
                alt={`thumbnail ${idx}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', imageRendering: 'pixelated' }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Modal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title="IMAGE_LIGHTBOX"
        size="lg"
      >
        <div
          className="flex-center"
          style={{
            position: 'relative',
            width: '100%',
            height: '60vh',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          <img
            src={images[activeIdx]}
            alt="zoomed product view"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />

          {/* Navigation Controls inside Lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '16px',
                  background: 'rgba(9, 10, 15, 0.8)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--neon-cyan)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '16px',
                  background: 'rgba(9, 10, 15, 0.8)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--neon-cyan)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ImageGallery;
