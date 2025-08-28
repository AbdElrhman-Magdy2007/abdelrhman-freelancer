'use client';

import { useEffect } from 'react';

export default function FinalScrollbar() {
  useEffect(() => {
    // Create style element with maximum priority
    const style = document.createElement('style');
    style.setAttribute('data-scrollbar', 'final');
    
    // Ultra-high priority CSS with !important on everything
    style.textContent = `
      /* FINAL SCROLLBAR - GUARANTEED VISIBILITY */
      html {
        overflow-y: scroll !important;
        scrollbar-width: auto !important;
        scrollbar-color: #7B61FF #000 !important;
      }
      
      body {
        min-height: 100.1vh !important;
      }

      /* Webkit Scrollbar - Ultra Visible */
      ::-webkit-scrollbar {
        width: 18px !important;
        height: 18px !important;
        background-color: rgba(0, 0, 0, 0.2) !important;
      }

      ::-webkit-scrollbar-track {
        background: linear-gradient(
          180deg, 
          rgba(0, 0, 0, 0.1) 0%, 
          rgba(0, 0, 0, 0.25) 50%, 
          rgba(0, 0, 0, 0.1) 100%
        ) !important;
        border-radius: 9px !important;
        margin: 6px !important;
        border: 2px solid rgba(255, 255, 255, 0.1) !important;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(
          135deg, 
          #7B61FF 0%, 
          #FF6AC2 25%, 
          #38BDF8 50%, 
          #10B981 75%, 
          #F59E0B 100%
        ) !important;
        border-radius: 9px !important;
        border: 2px solid rgba(255, 255, 255, 0.15) !important;
        box-shadow: 
          0 0 15px rgba(123, 97, 255, 0.7),
          0 0 30px rgba(255, 106, 194, 0.5),
          inset 0 1px 2px rgba(255, 255, 255, 0.3) !important;
        min-height: 50px !important;
        transition: all 0.2s ease !important;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(
          135deg, 
          #6B51E6 0%, 
          #E55AA9 25%, 
          #2BA3D9 50%, 
          #059669 75%, 
          #D97706 100%
        ) !important;
        box-shadow: 
          0 0 20px rgba(123, 97, 255, 1),
          0 0 40px rgba(255, 106, 194, 0.8),
          0 0 60px rgba(56, 189, 248, 0.6),
          inset 0 2px 4px rgba(255, 255, 255, 0.4) !important;
        transform: scale(1.05) !important;
      }

      ::-webkit-scrollbar-thumb:active {
        background: linear-gradient(
          135deg, 
          #5B41D6 0%, 
          #D54A99 25%, 
          #1B93C9 50%, 
          #047857 75%, 
          #B45309 100%
        ) !important;
        transform: scale(0.98) !important;
      }

      ::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0.15) !important;
      }

      /* Enhanced for projects page */
      .projects-scrollbar::-webkit-scrollbar {
        width: 20px !important;
      }

      .projects-scrollbar::-webkit-scrollbar-track {
        background: linear-gradient(
          180deg, 
          rgba(0, 0, 0, 0.15) 0%, 
          rgba(0, 0, 0, 0.3) 50%, 
          rgba(0, 0, 0, 0.15) 100%
        ) !important;
        border-radius: 10px !important;
        margin: 8px !important;
        border: 3px solid rgba(255, 255, 255, 0.12) !important;
      }

      .projects-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(
          135deg, 
          #7B61FF 0%, 
          #FF6AC2 16%, 
          #38BDF8 32%, 
          #10B981 48%, 
          #F59E0B 64%, 
          #EF4444 80%, 
          #7B61FF 100%
        ) !important;
        border-radius: 10px !important;
        border: 3px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: 
          0 0 20px rgba(123, 97, 255, 0.8),
          0 0 40px rgba(255, 106, 194, 0.6),
          0 0 60px rgba(56, 189, 248, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3) !important;
        min-height: 80px !important;
      }

      .projects-scrollbar::-webkit-scrollbar-thumb:hover {
        box-shadow: 
          0 0 25px rgba(123, 97, 255, 1),
          0 0 50px rgba(255, 106, 194, 0.8),
          0 0 75px rgba(56, 189, 248, 0.6),
          0 0 100px rgba(16, 185, 129, 0.4),
          inset 0 3px 6px rgba(255, 255, 255, 0.4) !important;
        transform: scale(1.08) !important;
      }

      /* Glow animation */
      @keyframes scrollbar-glow {
        0%, 100% { 
          box-shadow: 
            0 0 20px rgba(123, 97, 255, 0.8),
            0 0 40px rgba(255, 106, 194, 0.6);
        }
        50% { 
          box-shadow: 
            0 0 30px rgba(123, 97, 255, 1),
            0 0 60px rgba(255, 106, 194, 0.8),
            0 0 90px rgba(56, 189, 248, 0.6);
        }
      }

      .projects-scrollbar::-webkit-scrollbar-thumb:active {
        animation: scrollbar-glow 1s ease-in-out !important;
      }
    `;

    // Insert at the very end of head to ensure highest priority
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.querySelector('[data-scrollbar="final"]');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
}