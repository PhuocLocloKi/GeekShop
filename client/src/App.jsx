import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import CustomCursor from './components/three/CursorEffect/CustomCursor';
import LoadingScreen from './components/three/LoadingScreen/LoadingScreen';
import ChatBot from './components/ui/ChatBot';
import { ToastProvider } from './components/common/Toast';
import { Helmet } from 'react-helmet-async';

function App() {
  const location = useLocation();

  // Determine if current route is an admin page to hide standard layout headers/footers
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Dynamic SEO Meta header tags */}
      <Helmet>
        <title>GEEKSHOP — Tech-Noir Cyberpunk Hardware Forge</title>
        <meta name="description" content="Premium tech-noir terminal e-commerce gear. Equipping netrunners with recovery USBs, networking, displays, and microcontroller development boards." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      </Helmet>

      {/* Retro Sci-fi terminal monitor overlays */}
      <div className="crt-overlay" />
      <div className="noise-overlay" />

      {/* Floating Interactive cursor effects */}
      <CustomCursor />

      {/* 3D Preloading page loader */}
      <LoadingScreen />

      {/* Toast Alert popups notifier */}
      <ToastProvider />

      {/* Standard Header Layout (Hidden for admin dashboards) */}
      {!isAdminRoute && <Navbar />}

      {/* Routed SPA viewport pages */}
      <main className="page-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, paddingTop: isAdminRoute ? '0' : 'var(--navbar-height)' }}>
        <AppRoutes />
      </main>

      {/* Standard Footer Layout (Hidden for admin dashboards) */}
      {!isAdminRoute && <Footer />}

      {/* Floating AI Chatbot Assistant widget */}
      <ChatBot />
    </>
  );
}

export default App;
