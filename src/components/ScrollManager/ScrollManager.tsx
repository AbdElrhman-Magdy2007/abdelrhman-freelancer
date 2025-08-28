'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import FinalScrollbar from './FinalScrollbar';

interface ScrollManagerProps {
  showProgressBar?: boolean;
  showScrollToTop?: boolean;
  scrollToTopOffset?: number;
  progressBarHeight?: number;
  className?: string;
  progressBarClassName?: string;
  scrollToTopClassName?: string;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({
  showProgressBar = true,
  showScrollToTop = true,
  scrollToTopOffset = 300,
  progressBarHeight = 3,
  className = '',
  progressBarClassName = '',
  scrollToTopClassName = ''
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0;
    
    // Calculate scroll velocity and direction
    const now = Date.now();
    const timeDiff = now - lastScrollTime.current;
    const scrollDiff = scrollTop - lastScrollY.current;
    const velocity = timeDiff > 0 ? Math.abs(scrollDiff / timeDiff) : 0;
    
    setScrollProgress(progress);
    setShowButton(scrollTop > scrollToTopOffset);
    setIsScrollingUp(scrollDiff < 0);
    setScrollVelocity(velocity);
    
    lastScrollY.current = scrollTop;
    lastScrollTime.current = now;
  }, [scrollToTopOffset]);

  useEffect(() => {
    // Throttled scroll handler with requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateScrollProgress]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <div className={`scroll-manager ${className}`}>
      <FinalScrollbar />
      {/* Enhanced Progress Bar */}
      {showProgressBar && (
        <div className="fixed top-0 left-0 w-full z-50">
          {/* Background Track */}
          <div 
            className={`w-full bg-black/10 backdrop-blur-sm ${progressBarClassName}`}
            style={{ height: `${progressBarHeight}px` }}
          >
            {/* Animated Progress Fill */}
            <motion.div
              className="h-full relative overflow-hidden"
              style={{
                width: `${scrollProgress}%`,
                background: 'linear-gradient(90deg, #7B61FF 0%, #FF6AC2 50%, #38BDF8 100%)',
                boxShadow: scrollProgress > 0 
                  ? '0 0 20px rgba(123, 97, 255, 0.8), 0 0 40px rgba(255, 106, 194, 0.5)'
                  : 'none'
              }}
              initial={{ width: 0 }}
              animate={{ 
                width: `${scrollProgress}%`,
                boxShadow: scrollProgress > 0 
                  ? `0 0 ${20 + scrollVelocity * 10}px rgba(123, 97, 255, 0.8), 0 0 ${40 + scrollVelocity * 20}px rgba(255, 106, 194, 0.5)`
                  : 'none'
              }}
              transition={{ 
                type: 'spring',
                stiffness: 400,
                damping: 40,
                mass: 0.8
              }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ width: '50%' }}
              />
              
              {/* Pulse Effect */}
              <motion.div
                className="absolute right-0 top-0 h-full w-4 bg-white/40"
                animate={{
                  opacity: scrollProgress > 0 ? [0.4, 1, 0.4] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>

          {/* Progress Percentage Indicator */}
          {scrollProgress > 5 && (
            <motion.div
              className="absolute top-1 right-4 text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {Math.round(scrollProgress)}%
            </motion.div>
          )}
        </div>
      )}

      {/* Enhanced Scroll to Top Button */}
      {showScrollToTop && (
        <AnimatePresence>
          {showButton && (
            <motion.button
              onClick={scrollToTop}
              onKeyDown={handleKeyDown}
              className={`
                fixed bottom-8 right-8 z-40 p-4 rounded-full
                bg-gradient-to-br from-[#7B61FF] via-[#FF6AC2] to-[#38BDF8]
                text-white shadow-2xl backdrop-blur-sm
                border border-white/20
                focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
                ${scrollToTopClassName}
              `}
              initial={{ 
                opacity: 0, 
                scale: 0.5, 
                y: 20,
                rotate: -180 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotate: 0,
                boxShadow: [
                  '0 8px 32px rgba(123, 97, 255, 0.4)',
                  '0 12px 40px rgba(255, 106, 194, 0.5)',
                  '0 8px 32px rgba(123, 97, 255, 0.4)'
                ]
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.5, 
                y: 20,
                rotate: 180 
              }}
              whileHover={{
                scale: 1.15,
                rotate: [0, -5, 5, 0],
                boxShadow: '0 16px 48px rgba(123, 97, 255, 0.6), 0 0 30px rgba(255, 106, 194, 0.8)',
                background: 'linear-gradient(135deg, #6B51E6 0%, #E55AA9 50%, #2BA3D9 100%)',
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.8,
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              aria-label="العودة إلى أعلى الصفحة"
              title="العودة إلى أعلى الصفحة"
              tabIndex={0}
            >
              {/* Animated Icon */}
              <motion.div
                animate={{
                  y: isScrollingUp ? [0, -3, 0] : [0, 2, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
              </motion.div>

              {/* Ripple Effects */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full border border-white/20"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      )}


    </div>
  );
};

export default ScrollManager;