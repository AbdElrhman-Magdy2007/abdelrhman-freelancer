'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { ArrowUp, MousePointer2, Zap, Sparkles, Target } from 'lucide-react';

interface ScrollManagerProProps {
  showProgressBar?: boolean;
  showScrollToTop?: boolean;
  showScrollIndicator?: boolean;
  showVelocityIndicator?: boolean;
  scrollToTopOffset?: number;
  progressBarHeight?: number;
  theme?: 'gradient' | 'neon' | 'glass' | 'minimal';
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  progressBarClassName?: string;
  scrollToTopClassName?: string;
}

const ScrollManagerPro: React.FC<ScrollManagerProProps> = ({
  showProgressBar = true,
  showScrollToTop = true,
  showScrollIndicator = true,
  showVelocityIndicator = false,
  scrollToTopOffset = 300,
  progressBarHeight = 4,
  theme = 'gradient',
  position = 'top',
  className = '',
  progressBarClassName = '',
  scrollToTopClassName = ''
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'idle'>('idle');
  
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const velocityHistory = useRef<number[]>([]);

  // Framer Motion springs for smooth animations
  const progressSpring = useSpring(scrollProgress, { 
    stiffness: 400, 
    damping: 40, 
    mass: 0.8 
  });
  
  const velocitySpring = useSpring(scrollVelocity, { 
    stiffness: 300, 
    damping: 30 
  });

  // Theme configurations
  const themes = useMemo(() => ({
    gradient: {
      progressBg: 'linear-gradient(90deg, #7B61FF 0%, #FF6AC2 30%, #38BDF8 60%, #10B981 100%)',
      buttonBg: 'linear-gradient(135deg, #7B61FF 0%, #FF6AC2 50%, #38BDF8 100%)',
      glowColor: 'rgba(123, 97, 255, 0.6)',
      shadowColor: 'rgba(255, 106, 194, 0.4)'
    },
    neon: {
      progressBg: 'linear-gradient(90deg, #00F5FF 0%, #FF1493 50%, #9400D3 100%)',
      buttonBg: 'linear-gradient(135deg, #00F5FF 0%, #FF1493 50%, #9400D3 100%)',
      glowColor: 'rgba(0, 245, 255, 0.8)',
      shadowColor: 'rgba(255, 20, 147, 0.6)'
    },
    glass: {
      progressBg: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
      buttonBg: 'rgba(255, 255, 255, 0.1)',
      glowColor: 'rgba(255, 255, 255, 0.3)',
      shadowColor: 'rgba(0, 0, 0, 0.2)'
    },
    minimal: {
      progressBg: 'linear-gradient(90deg, #374151 0%, #6B7280 100%)',
      buttonBg: 'linear-gradient(135deg, #374151 0%, #6B7280 100%)',
      glowColor: 'rgba(107, 114, 128, 0.5)',
      shadowColor: 'rgba(55, 65, 81, 0.3)'
    }
  }), []);

  const currentTheme = themes[theme];

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0;
    
    // Calculate scroll velocity and direction
    const now = Date.now();
    const timeDiff = now - lastScrollTime.current;
    const scrollDiff = scrollTop - lastScrollY.current;
    const velocity = timeDiff > 0 ? Math.abs(scrollDiff / timeDiff) : 0;
    
    // Update velocity history for smoothing
    velocityHistory.current.push(velocity);
    if (velocityHistory.current.length > 10) {
      velocityHistory.current.shift();
    }
    
    const avgVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
    
    // Determine scroll direction
    let direction: 'up' | 'down' | 'idle' = 'idle';
    if (Math.abs(scrollDiff) > 1) {
      direction = scrollDiff > 0 ? 'down' : 'up';
    }
    
    setScrollProgress(progress);
    setShowButton(scrollTop > scrollToTopOffset);
    setIsScrollingUp(scrollDiff < 0);
    setScrollVelocity(avgVelocity);
    setScrollDirection(direction);
    setIsScrolling(true);
    
    // Clear scrolling state after inactivity
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
      setScrollDirection('idle');
    }, 150);
    
    lastScrollY.current = scrollTop;
    lastScrollTime.current = now;
  }, [scrollToTopOffset]);

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [updateScrollProgress]);

  const scrollToTop = useCallback(() => {
    const startY = window.scrollY;
    const startTime = performance.now();
    const duration = Math.min(1500, Math.max(500, startY / 3)); // Dynamic duration

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentY = startY * (1 - easeOutCubic);
      
      window.scrollTo(0, currentY);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  // Position classes for progress bar
  const positionClasses = {
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full'
  };

  return (
    <div className={`scroll-manager-pro ${className}`}>
      {/* Enhanced Progress Bar */}
      {showProgressBar && (
        <div className={`fixed ${positionClasses[position]} z-50`}>
          {/* Background Track */}
          <div 
            className={`bg-black/5 backdrop-blur-sm border-white/10 ${
              position === 'left' || position === 'right' 
                ? `w-${progressBarHeight} h-full border-r` 
                : `h-${progressBarHeight} w-full border-b`
            } ${progressBarClassName}`}
          >
            {/* Animated Progress Fill */}
            <motion.div
              className="relative overflow-hidden"
              style={{
                [position === 'left' || position === 'right' ? 'height' : 'width']: `${scrollProgress}%`,
                background: currentTheme.progressBg,
                boxShadow: scrollProgress > 0 
                  ? `0 0 ${20 + scrollVelocity * 5}px ${currentTheme.glowColor}, 0 0 ${40 + scrollVelocity * 10}px ${currentTheme.shadowColor}`
                  : 'none'
              }}
              initial={{ 
                [position === 'left' || position === 'right' ? 'height' : 'width']: 0 
              }}
              animate={{ 
                [position === 'left' || position === 'right' ? 'height' : 'width']: `${scrollProgress}%`,
              }}
              transition={{ 
                type: 'spring',
                stiffness: 400,
                damping: 40,
                mass: 0.8
              }}
            >
              {/* Dynamic Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  [position === 'left' || position === 'right' ? 'y' : 'x']: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2 - (scrollVelocity * 0.5),
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ 
                  [position === 'left' || position === 'right' ? 'height' : 'width']: '50%' 
                }}
              />
              
              {/* Velocity Pulse */}
              <motion.div
                className="absolute bg-white/50"
                style={{
                  [position === 'left' || position === 'right' ? 'bottom' : 'right']: 0,
                  [position === 'left' || position === 'right' ? 'left' : 'top']: 0,
                  [position === 'left' || position === 'right' ? 'width' : 'height']: '100%',
                  [position === 'left' || position === 'right' ? 'height' : 'width']: `${Math.min(8, scrollVelocity * 2)}px`
                }}
                animate={{
                  opacity: isScrolling ? [0.3, 0.8, 0.3] : 0,
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>

          {/* Progress Percentage & Velocity Indicator */}
          {(scrollProgress > 2 || showVelocityIndicator) && (
            <motion.div
              className="absolute flex items-center gap-2 text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/20"
              style={{
                [position === 'top' ? 'top' : position === 'bottom' ? 'bottom' : position === 'left' ? 'left' : 'right']: 
                  position === 'top' || position === 'bottom' ? '8px' : '16px',
                [position === 'top' || position === 'bottom' ? 'right' : 'top']: 
                  position === 'top' || position === 'bottom' ? '16px' : '8px'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Target className="w-3 h-3" />
              <span>{Math.round(scrollProgress)}%</span>
              
              {showVelocityIndicator && (
                <>
                  <Zap className="w-3 h-3" />
                  <span>{scrollVelocity.toFixed(1)}</span>
                </>
              )}
              
              {scrollDirection !== 'idle' && (
                <motion.div
                  animate={{ rotate: scrollDirection === 'up' ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUp className="w-3 h-3" />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Scroll Indicator */}
      {showScrollIndicator && scrollProgress < 10 && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <motion.div
            className="flex flex-col items-center text-white/70 text-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MousePointer2 className="w-5 h-5 mb-2" />
            <span className="text-xs">مرر للأسفل</span>
            <motion.div
              className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent mt-2"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Ultra Enhanced Scroll to Top Button */}
      {showScrollToTop && (
        <AnimatePresence>
          {showButton && (
            <motion.button
              onClick={scrollToTop}
              onKeyDown={handleKeyDown}
              className={`
                fixed bottom-8 right-8 z-40 p-4 rounded-2xl
                text-white shadow-2xl backdrop-blur-md
                border border-white/20 overflow-hidden
                focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
                ${scrollToTopClassName}
              `}
              style={{
                background: currentTheme.buttonBg,
                boxShadow: `0 8px 32px ${currentTheme.shadowColor}, 0 0 20px ${currentTheme.glowColor}`
              }}
              initial={{ 
                opacity: 0, 
                scale: 0.3, 
                y: 40,
                rotate: -180,
                borderRadius: '50%'
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotate: 0,
                borderRadius: '16px',
                boxShadow: [
                  `0 8px 32px ${currentTheme.shadowColor}`,
                  `0 16px 48px ${currentTheme.glowColor}`,
                  `0 8px 32px ${currentTheme.shadowColor}`
                ]
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.3, 
                y: 40,
                rotate: 180,
                borderRadius: '50%'
              }}
              whileHover={{
                scale: 1.1,
                rotate: [0, -3, 3, 0],
                borderRadius: '20px',
                boxShadow: `0 20px 60px ${currentTheme.glowColor}, 0 0 40px ${currentTheme.shadowColor}`,
              }}
              whileTap={{ 
                scale: 0.95,
                borderRadius: '12px'
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.8,
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              aria-label="العودة إلى أعلى الصفحة"
              title="العودة إلى أعلى الصفحة"
              tabIndex={0}
            >
              {/* Background Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${20 + (i % 3) * 20}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Main Icon with Advanced Animation */}
              <motion.div
                className="relative z-10"
                animate={{
                  y: isScrollingUp ? [0, -4, 0] : [0, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
                
                {/* Icon Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      `0 0 0px ${currentTheme.glowColor}`,
                      `0 0 20px ${currentTheme.glowColor}`,
                      `0 0 0px ${currentTheme.glowColor}`
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              {/* Multiple Ripple Effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-2xl border border-white/20"
                  animate={{
                    scale: [1, 1.5 + i * 0.3, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.4,
                  }}
                />
              ))}

              {/* Velocity Indicator */}
              {scrollVelocity > 0.5 && (
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="w-2 h-2 text-white" />
                </motion.div>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      )}

      {/* Enhanced Global Scrollbar Styling */}
      <style jsx global>{`
        /* Ultra Enhanced Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 16px;
          height: 16px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.03);
          border-radius: 8px;
          margin: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: ${currentTheme.progressBg};
          border-radius: 8px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 0 15px ${currentTheme.glowColor},
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          position: relative;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.progressBg};
          box-shadow: 
            0 0 30px ${currentTheme.glowColor},
            0 0 50px ${currentTheme.shadowColor},
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        ::-webkit-scrollbar-thumb:active {
          background: ${currentTheme.progressBg};
          box-shadow: 
            0 0 40px ${currentTheme.glowColor},
            0 0 60px ${currentTheme.shadowColor},
            inset 0 2px 4px rgba(0, 0, 0, 0.2);
          transform: scale(0.95);
        }

        ::-webkit-scrollbar-corner {
          background: transparent;
        }

        /* Firefox Ultra Enhanced Scrollbar */
        html {
          scrollbar-width: auto;
          scrollbar-color: ${theme === 'gradient' ? '#7B61FF' : theme === 'neon' ? '#00F5FF' : theme === 'glass' ? 'rgba(255,255,255,0.3)' : '#374151'} rgba(0, 0, 0, 0.03);
        }

        /* Smooth scrolling with enhanced easing */
        html {
          scroll-behavior: smooth;
        }

        /* Projects page ultra enhanced scrollbar */
        .projects-scrollbar::-webkit-scrollbar {
          width: 18px;
        }

        .projects-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 9px;
          margin: 10px;
          border: 2px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .projects-scrollbar::-webkit-scrollbar-thumb {
          background: ${currentTheme.progressBg};
          border-radius: 9px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 0 20px ${currentTheme.glowColor},
            0 0 40px ${currentTheme.shadowColor},
            inset 0 2px 4px rgba(255, 255, 255, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .projects-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.progressBg};
          box-shadow: 
            0 0 35px ${currentTheme.glowColor},
            0 0 60px ${currentTheme.shadowColor},
            0 0 80px ${currentTheme.glowColor},
            inset 0 2px 6px rgba(255, 255, 255, 0.3),
            inset 0 -2px 6px rgba(0, 0, 0, 0.2);
          transform: scale(1.15);
          border-color: rgba(255, 255, 255, 0.25);
        }

        /* Advanced scrollbar animations */
        @keyframes scrollbar-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px ${currentTheme.glowColor};
          }
          50% { 
            box-shadow: 0 0 40px ${currentTheme.glowColor}, 0 0 60px ${currentTheme.shadowColor};
          }
        }

        @keyframes scrollbar-rainbow {
          0% { background: ${currentTheme.progressBg}; }
          25% { background: linear-gradient(135deg, #FF6AC2 0%, #38BDF8 100%); }
          50% { background: linear-gradient(135deg, #38BDF8 0%, #10B981 100%); }
          75% { background: linear-gradient(135deg, #10B981 0%, #7B61FF 100%); }
          100% { background: ${currentTheme.progressBg}; }
        }

        .projects-scrollbar::-webkit-scrollbar-thumb:active {
          animation: scrollbar-pulse 0.8s ease-in-out, scrollbar-rainbow 2s ease-in-out;
        }

        /* Scrollbar track hover effect */
        .projects-scrollbar::-webkit-scrollbar-track:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default ScrollManagerPro;