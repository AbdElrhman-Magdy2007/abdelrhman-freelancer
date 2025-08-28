'use client';

import React, { useEffect } from 'react';

const SimpleScrollbar: React.FC = () => {
  useEffect(() => {
    // Create and inject CSS for custom scrollbar
    const styleId = 'custom-scrollbar-styles';
    
    // Remove existing style if it exists
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      /* Force scrollbar to always be visible */
      html {
        overflow-y: scroll !important;
        scrollbar-width: auto !important;
        scrollbar-color: #7B61FF rgba(0, 0, 0, 0.2) !important;
      }

      body {
        overflow-x: hidden;
        min-height: 100vh;
      }

      /* Custom Webkit Scrollbar - Ultra Visible */
      ::-webkit-scrollbar {
        width: 20px !important;
        background: rgba(0, 0, 0, 0.1) !important;
      }

      ::-webkit-scrollbar-track {
        background: linear-gradient(180deg, 
          rgba(0, 0, 0, 0.1) 0%, 
          rgba(0, 0, 0, 0.2) 50%, 
          rgba(0, 0, 0, 0.1) 100%) !important;
        border-radius: 10px !important;
        margin: 10px !important;
        border: 2px solid rgba(255, 255, 255, 0.1) !important;
        box-shadow: 
          inset 0 0 10px rgba(0, 0, 0, 0.3),
          0 0 5px rgba(255, 255, 255, 0.1) !important;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, 
          #7B61FF 0%, 
          #FF6AC2 25%, 
          #38BDF8 50%, 
          #10B981 75%, 
          #F59E0B 100%) !important;
        border-radius: 10px !important;
        border: 3px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: 
          0 0 20px rgba(123, 97, 255, 0.8),
          0 0 40px rgba(255, 106, 194, 0.6),
          0 0 60px rgba(56, 189, 248, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3),
          inset 0 -2px 4px rgba(0, 0, 0, 0.2) !important;
        min-height: 80px !important;
        transition: all 0.3s ease !important;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, 
          #6B51E6 0%, 
          #E55AA9 25%, 
          #2BA3D9 50%, 
          #059669 75%, 
          #D97706 100%) !important;
        box-shadow: 
          0 0 30px rgba(123, 97, 255, 1),
          0 0 60px rgba(255, 106, 194, 0.8),
          0 0 90px rgba(56, 189, 248, 0.6),
          0 0 120px rgba(16, 185, 129, 0.4),
          inset 0 3px 6px rgba(255, 255, 255, 0.4),
          inset 0 -3px 6px rgba(0, 0, 0, 0.3) !important;
        transform: scale(1.1) !important;
        border-color: rgba(255, 255, 255, 0.3) !important;
      }

      ::-webkit-scrollbar-thumb:active {
        background: linear-gradient(135deg, 
          #5B41D6 0%, 
          #D54A99 25%, 
          #1B93C9 50%, 
          #047857 75%, 
          #B45309 100%) !important;
        transform: scale(0.95) !important;
        box-shadow: 
          0 0 40px rgba(123, 97, 255, 1),
          0 0 80px rgba(255, 106, 194, 1),
          inset 0 4px 8px rgba(0, 0, 0, 0.4) !important;
      }

      ::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0.2) !important;
        border-radius: 5px !important;
      }

      /* Enhanced Projects Page Scrollbar */
      .projects-scrollbar::-webkit-scrollbar {
        width: 22px !important;
      }

      .projects-scrollbar::-webkit-scrollbar-track {
        background: linear-gradient(180deg, 
          rgba(0, 0, 0, 0.15) 0%, 
          rgba(0, 0, 0, 0.25) 50%, 
          rgba(0, 0, 0, 0.15) 100%) !important;
        border-radius: 11px !important;
        margin: 12px !important;
        border: 3px solid rgba(255, 255, 255, 0.15) !important;
        box-shadow: 
          inset 0 0 15px rgba(0, 0, 0, 0.4),
          0 0 8px rgba(255, 255, 255, 0.1) !important;
      }

      .projects-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, 
          #7B61FF 0%, 
          #FF6AC2 20%, 
          #38BDF8 40%, 
          #10B981 60%, 
          #F59E0B 80%, 
          #EF4444 100%) !important;
        border-radius: 11px !important;
        border: 4px solid rgba(255, 255, 255, 0.25) !important;
        box-shadow: 
          0 0 25px rgba(123, 97, 255, 1),
          0 0 50px rgba(255, 106, 194, 0.8),
          0 0 75px rgba(56, 189, 248, 0.6),
          0 0 100px rgba(16, 185, 129, 0.4),
          inset 0 3px 6px rgba(255, 255, 255, 0.4),
          inset 0 -3px 6px rgba(0, 0, 0, 0.3) !important;
        min-height: 100px !important;
      }

      .projects-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, 
          #6B51E6 0%, 
          #E55AA9 20%, 
          #2BA3D9 40%, 
          #059669 60%, 
          #D97706 80%, 
          #DC2626 100%) !important;
        box-shadow: 
          0 0 35px rgba(123, 97, 255, 1),
          0 0 70px rgba(255, 106, 194, 1),
          0 0 105px rgba(56, 189, 248, 0.8),
          0 0 140px rgba(16, 185, 129, 0.6),
          0 0 175px rgba(245, 158, 11, 0.4),
          inset 0 4px 8px rgba(255, 255, 255, 0.5),
          inset 0 -4px 8px rgba(0, 0, 0, 0.4) !important;
        transform: scale(1.15) !important;
        border-color: rgba(255, 255, 255, 0.4) !important;
      }

      /* Animated Glow Effect */
      @keyframes rainbow-glow {
        0% { 
          box-shadow: 
            0 0 30px rgba(123, 97, 255, 1),
            0 0 60px rgba(255, 106, 194, 0.8);
        }
        25% { 
          box-shadow: 
            0 0 40px rgba(255, 106, 194, 1),
            0 0 80px rgba(56, 189, 248, 0.8);
        }
        50% { 
          box-shadow: 
            0 0 50px rgba(56, 189, 248, 1),
            0 0 100px rgba(16, 185, 129, 0.8);
        }
        75% { 
          box-shadow: 
            0 0 60px rgba(16, 185, 129, 1),
            0 0 120px rgba(245, 158, 11, 0.8);
        }
        100% { 
          box-shadow: 
            0 0 70px rgba(245, 158, 11, 1),
            0 0 140px rgba(123, 97, 255, 0.8);
        }
      }

      .projects-scrollbar::-webkit-scrollbar-thumb:active {
        animation: rainbow-glow 2s ease-in-out infinite !important;
      }

      /* Ensure scrollbar is visible on all screen sizes */
      @media (max-width: 768px) {
        ::-webkit-scrollbar {
          width: 18px !important;
        }
        
        .projects-scrollbar::-webkit-scrollbar {
          width: 20px !important;
        }
      }

      /* High contrast mode */
      @media (prefers-contrast: high) {
        ::-webkit-scrollbar-thumb {
          background: #000000 !important;
          border: 3px solid #ffffff !important;
        }
        
        ::-webkit-scrollbar-track {
          background: #ffffff !important;
          border: 2px solid #000000 !important;
        }
      }
    `;

    document.head.appendChild(style);

    // Cleanup function
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return null;
};

export default SimpleScrollbar;