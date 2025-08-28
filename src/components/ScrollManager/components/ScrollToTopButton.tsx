'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left';
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  isVisible,
  onClick,
  className = '',
  size = 'md',
  position = 'bottom-right',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-14 h-14 text-lg',
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`
            fixed ${positionClasses[position]} ${sizeClasses[size]}
            bg-gradient-to-r from-[#7B61FF] to-[#38BDF8]
            text-white rounded-full shadow-lg
            flex items-center justify-center
            hover:shadow-xl hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition-all duration-300 ease-out
            backdrop-blur-sm border border-white/10
            z-40 ${className}
          `}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
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
            rotate: 0 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.5, 
            y: 20,
            rotate: 180 
          }}
          whileHover={{
            scale: 1.15,
            boxShadow: '0 0 25px rgba(123, 97, 255, 0.6)',
            background: 'linear-gradient(135deg, #7B61FF 0%, #FF6AC2 50%, #38BDF8 100%)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.8,
          }}
          aria-label="العودة إلى أعلى الصفحة"
          title="العودة إلى أعلى الصفحة"
          tabIndex={0}
        >
          {/* Icon with Animation */}
          <motion.div
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronUp size={iconSizes[size]} strokeWidth={2.5} />
          </motion.div>

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;