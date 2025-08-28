'use client';

import React from 'react';

interface ScrollbarStylesProps {
  theme?: 'gradient' | 'neon' | 'glass' | 'minimal';
  width?: number;
  forceVisible?: boolean;
}

const ScrollbarStyles: React.FC<ScrollbarStylesProps> = ({ 
  theme = 'gradient', 
  width = 16,
  forceVisible = true 
}) => {
  const themes = {
    gradient: {
      track: 'rgba(0, 0, 0, 0.1)',
      thumb: 'linear-gradient(135deg, #7B61FF 0%, #FF6AC2 50%, #38BDF8 100%)',
      thumbHover: 'linear-gradient(135deg, #6B51E6 0%, #E55AA9 50%, #2BA3D9 100%)',
      glow: 'rgba(123, 97, 255, 0.6)',
      glowHover: 'rgba(123, 97, 255, 0.8)'
    },
    neon: {
      track: 'rgba(0, 0, 0, 0.2)',
      thumb: 'linear-gradient(135deg, #00F5FF 0%, #FF1493 50%, #9400D3 100%)',
      thumbHover: 'linear-gradient(135deg, #00E5EF 0%, #EF1483 50%, #8400C3 100%)',
      glow: 'rgba(0, 245, 255, 0.8)',
      glowHover: 'rgba(255, 20, 147, 0.9)'
    },
    glass: {
      track: 'rgba(255, 255, 255, 0.05)',
      thumb: 'rgba(255, 255, 255, 0.2)',
      thumbHover: 'rgba(255, 255, 255, 0.3)',
      glow: 'rgba(255, 255, 255, 0.3)',
      glowHover: 'rgba(255, 255, 255, 0.5)'
    },
    minimal: {
      track: 'rgba(107, 114, 128, 0.2)',
      thumb: 'linear-gradient(135deg, #374151 0%, #6B7280 100%)',
      thumbHover: 'linear-gradient(135deg, #4B5563 0%, #9CA3AF 100%)',
      glow: 'rgba(107, 114, 128, 0.4)',
      glowHover: 'rgba(156, 163, 175, 0.6)'
    }
  };

  const currentTheme = themes[theme];

  return (
    <>
      <style jsx global>{`
        /* Force scrollbar to always be visible */
        html {
          overflow-y: ${forceVisible ? 'scroll' : 'auto'};
          scrollbar-width: auto;
          scrollbar-color: ${theme === 'gradient' ? '#7B61FF' : theme === 'neon' ? '#00F5FF' : theme === 'glass' ? 'rgba(255,255,255,0.3)' : '#6B7280'} ${currentTheme.track};
        }

        body {
          overflow-x: hidden;
        }

        /* Ultra Enhanced Webkit Scrollbar */
        ::-webkit-scrollbar {
          width: ${width}px;
          height: ${width}px;
          background: transparent;
        }

        ::-webkit-scrollbar-track {
          background: ${currentTheme.track};
          border-radius: ${Math.floor(width / 2)}px;
          margin: 4px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: ${currentTheme.thumb};
          border-radius: ${Math.floor(width / 2)}px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 0 15px ${currentTheme.glow},
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          min-height: 40px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.thumbHover};
          box-shadow: 
            0 0 25px ${currentTheme.glowHover},
            0 0 40px ${currentTheme.glow},
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        ::-webkit-scrollbar-thumb:active {
          background: ${currentTheme.thumbHover};
          box-shadow: 
            0 0 35px ${currentTheme.glowHover},
            0 0 50px ${currentTheme.glow},
            inset 0 2px 4px rgba(0, 0, 0, 0.3);
          transform: scale(0.95);
        }

        ::-webkit-scrollbar-corner {
          background: ${currentTheme.track};
          border-radius: ${Math.floor(width / 4)}px;
        }

        /* Enhanced scrollbar for specific containers */
        .enhanced-scrollbar::-webkit-scrollbar {
          width: ${width + 2}px;
        }

        .enhanced-scrollbar::-webkit-scrollbar-track {
          background: ${currentTheme.track};
          border-radius: ${Math.floor((width + 2) / 2)}px;
          margin: 6px;
          border: 2px solid rgba(255, 255, 255, 0.03);
          box-shadow: 
            inset 0 0 10px rgba(0, 0, 0, 0.2),
            0 0 5px rgba(255, 255, 255, 0.05);
        }

        .enhanced-scrollbar::-webkit-scrollbar-thumb {
          background: ${currentTheme.thumb};
          border-radius: ${Math.floor((width + 2) / 2)}px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 0 20px ${currentTheme.glow},
            0 0 35px ${currentTheme.glowHover},
            inset 0 2px 4px rgba(255, 255, 255, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.1);
          min-height: 50px;
        }

        .enhanced-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.thumbHover};
          box-shadow: 
            0 0 30px ${currentTheme.glowHover},
            0 0 50px ${currentTheme.glow},
            0 0 70px ${currentTheme.glowHover},
            inset 0 2px 6px rgba(255, 255, 255, 0.3),
            inset 0 -2px 6px rgba(0, 0, 0, 0.2);
          transform: scale(1.15);
          border-color: rgba(255, 255, 255, 0.25);
        }

        /* Projects page ultra enhanced scrollbar */
        .projects-scrollbar::-webkit-scrollbar {
          width: ${width + 4}px;
        }

        .projects-scrollbar::-webkit-scrollbar-track {
          background: linear-gradient(180deg, ${currentTheme.track} 0%, rgba(0,0,0,0.05) 100%);
          border-radius: ${Math.floor((width + 4) / 2)}px;
          margin: 8px;
          border: 2px solid rgba(255, 255, 255, 0.03);
          box-shadow: 
            inset 0 0 15px rgba(0, 0, 0, 0.3),
            0 0 8px rgba(255, 255, 255, 0.05);
        }

        .projects-scrollbar::-webkit-scrollbar-thumb {
          background: ${currentTheme.thumb};
          border-radius: ${Math.floor((width + 4) / 2)}px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 0 25px ${currentTheme.glow},
            0 0 45px ${currentTheme.glowHover},
            inset 0 3px 6px rgba(255, 255, 255, 0.25),
            inset 0 -3px 6px rgba(0, 0, 0, 0.15);
          min-height: 60px;
          position: relative;
        }

        .projects-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.thumbHover};
          box-shadow: 
            0 0 40px ${currentTheme.glowHover},
            0 0 60px ${currentTheme.glow},
            0 0 80px ${currentTheme.glowHover},
            inset 0 3px 8px rgba(255, 255, 255, 0.35),
            inset 0 -3px 8px rgba(0, 0, 0, 0.25);
          transform: scale(1.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Advanced scrollbar animations */
        @keyframes scrollbar-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px ${currentTheme.glow};
          }
          50% { 
            box-shadow: 0 0 40px ${currentTheme.glowHover}, 0 0 60px ${currentTheme.glow};
          }
        }

        @keyframes scrollbar-rainbow {
          0% { background: ${currentTheme.thumb}; }
          25% { background: linear-gradient(135deg, #FF6AC2 0%, #38BDF8 100%); }
          50% { background: linear-gradient(135deg, #38BDF8 0%, #10B981 100%); }
          75% { background: linear-gradient(135deg, #10B981 0%, #7B61FF 100%); }
          100% { background: ${currentTheme.thumb}; }
        }

        .projects-scrollbar::-webkit-scrollbar-thumb:active {
          animation: scrollbar-pulse 0.8s ease-in-out, scrollbar-rainbow 2s ease-in-out;
        }

        /* Scrollbar track hover effect */
        .projects-scrollbar::-webkit-scrollbar-track:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, ${currentTheme.track} 100%);
          border-color: rgba(255, 255, 255, 0.08);
        }

        /* Force visibility on all elements */
        * {
          scrollbar-width: auto;
        }

        /* Mobile scrollbar (for touch devices) */
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            width: ${Math.max(12, width - 4)}px;
          }
          
          .projects-scrollbar::-webkit-scrollbar {
            width: ${Math.max(14, width - 2)}px;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          ::-webkit-scrollbar-thumb {
            background: #000000 !important;
            border: 2px solid #ffffff !important;
          }
          
          ::-webkit-scrollbar-track {
            background: #ffffff !important;
            border: 1px solid #000000 !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          ::-webkit-scrollbar-thumb {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollbarStyles;