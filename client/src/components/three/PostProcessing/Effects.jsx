import React from 'react';

const Effects = ({ quality = 'high' }) => {
  // Temporarily disabled postprocessing to fix alpha context error
  // The Canvas needs proper gl context configuration for EffectComposer
  return null;
};

export default Effects;
