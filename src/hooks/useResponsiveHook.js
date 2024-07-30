'use client'

import { useState, useEffect } from 'react';

const useResponsiveHook = (maxWidth) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);
      const handleResize = () => setIsMobile(mediaQuery.matches);

      handleResize(); // Set the initial state
      mediaQuery.addEventListener('change', handleResize);

      return () => mediaQuery.removeEventListener('change', handleResize);
    }
  }, [maxWidth]);

  return isMobile;
};

export default useResponsiveHook;