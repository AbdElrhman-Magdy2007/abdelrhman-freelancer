'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressBarProps {
  progress: number;
  height?: number;
  className?: string;
  showPercentage?: boolean;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  progress,
  height = 3,
  className = '',
  showPercentage = false,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Progress Bar Container */}
      <div 
        className={`w-full bg-gray-200/20 backdrop-blur-sm ${className}`}
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`صفحة التمرير: ${Math.round(progress)}%`}
      >
        {/* Animated Progress Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#7B61FF] via-[#FF6AC2] to-[#38BDF8] shadow-lg"
          style={{
            background: 'linear-gradient(90deg, #7B61FF 0%, #FF6AC2 50%, #38BDF8 100%)',
            boxShadow: '0 0 10px rgba(123, 97, 255, 0.5)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40,
            mass: 0.8,
          }}
        />
        
        {/* Glowing Effect */}
        <motion.div
          className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white/30 to-transparent"
          style={{ right: `${100 - progress}%` }}
          animate={{
            opacity: progress > 0 ? [0.3, 0.8, 0.3] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Optional Percentage Display */}
      {showPercentage && progress > 0 && (
        <motion.div
          className="absolute top-2 right-4 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  );
};

export default ScrollProgressBar;