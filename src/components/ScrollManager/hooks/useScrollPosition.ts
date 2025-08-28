'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollPosition } from '../types';

export const useScrollPosition = (throttleMs: number = 16): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollPercentage: 0,
    isScrollingDown: false,
  });

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollPosition = useCallback(() => {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollableHeight = documentHeight - windowHeight;
    
    const scrollPercentage = scrollableHeight > 0 
      ? Math.min(100, Math.max(0, (scrollY / scrollableHeight) * 100))
      : 0;

    const isScrollingDown = scrollY > lastScrollY.current;
    lastScrollY.current = scrollY;

    setScrollPosition({
      scrollY,
      scrollPercentage,
      isScrollingDown,
    });

    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollPosition);
      ticking.current = true;
    }
  }, [updateScrollPosition]);

  useEffect(() => {
    // Initial calculation
    updateScrollPosition();

    // Add scroll listener with passive option for better performance
    const options = { passive: true };
    window.addEventListener('scroll', handleScroll, options);
    window.addEventListener('resize', updateScrollPosition, options);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollPosition);
    };
  }, [handleScroll, updateScrollPosition]);

  return scrollPosition;
};