import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.84, 0], // easeInExpo
    },
  },
};

const PageWrapper = ({ children, className = '', style = {} }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={`page-wrapper ${className}`}
      style={{
        width: '100%',
        minHeight: 'calc(100vh - var(--navbar-height))',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
