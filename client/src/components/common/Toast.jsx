import toast, { Toaster } from 'react-hot-toast';

// Cyberpunk-themed toast configuration
export const ToastProvider = () => (
  <Toaster
    position="top-right"
    gutter={8}
    toastOptions={{
      duration: 3000,
      style: {
        background: 'rgba(20, 24, 36, 0.95)',
        backdropFilter: 'blur(12px)',
        color: '#e2e8f0',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        borderRadius: '8px',
        fontFamily: "'Fira Code', monospace",
        fontSize: '0.875rem',
        padding: '12px 16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
      success: {
        iconTheme: {
          primary: '#10b981',
          secondary: '#090a0f',
        },
        style: {
          borderColor: 'rgba(16, 185, 129, 0.3)',
        },
      },
      error: {
        iconTheme: {
          primary: '#f472b6',
          secondary: '#090a0f',
        },
        style: {
          borderColor: 'rgba(244, 114, 182, 0.3)',
        },
      },
    }}
  />
);

// Helper functions
export const showSuccess = (message) => toast.success(message);
export const showError = (message) => toast.error(message);
export const showInfo = (message) => toast(message, {
  icon: '💡',
  style: {
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
});

export default ToastProvider;
