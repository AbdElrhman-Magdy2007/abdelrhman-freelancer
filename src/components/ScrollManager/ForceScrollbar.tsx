'use client';

import React, { useEffect } from 'react';

const ForceScrollbar: React.FC = () => {
  useEffect(() => {
    // Force scrollbar to be visible
    const style = document.createElement('style');
    style.textContent = `
      /* Force scrollbar visibility */
      html {
        overflow-y: scroll !important;
        scrollbar-width: auto !important;
      }
      
      body {
        overflow-x: hidden;
      }

      /* Ultra visible scrollbar */
      ::-webkit-scrollbar {
        width: 18px !important;
        background: rgba(0, 0, 0, 0.1) !important;
      }

      ::-webkit-scrollbar-track {
        background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%) !important;
        border-radius: 9px !important;
        margin: 8px !important;
        border: 2px solid rgba(255, 255, 255, 0.1) !important;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3) !important;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #7B61FF 0%, #FF6AC2 50%, #38BDF8 100%) !important;
        border-radius: 9px !important;
        border: 3px solid rgba(255, 255, 255, 0.15) !important;
        box-shadow: 
          0 0 25px rgba(123, 97, 255, 0.8) !important,
          0 0 45px rgba(255, 106, 194, 0.6) !important,
          inset 0 2px 4px rgba(255, 255, 255, 0.3) !important,
          inset 0 -2px 4px rgba(0, 0, 0, 0.2) !important;
        min-height: 60px !important;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #6B51E6 0%, #E55AA9 50%, #2BA3D9 100%) !important;
        box-shadow: 
          0 0 35px rgba(123, 97, 255, 1) !important,
          0 0 60px rgba(255, 106, 194, 0.8) !important,
          0 0 80px rgba(56, 189, 248, 0.6) !important,
          inset 0 3px 6px rgba(255, 255, 255, 0.4) !important,
          inset 0 -3px 6px rgba(0, 0, 0, 0.3) !important;
        transform: scale(1.1) !important;
        border-color: rgba(255, 255, 255, 0.3) !important;
      }

      ::-webkit-scrollbar-thumb:active {
        background: linear-gradient(135deg, #5B41D6 0%, #D54A99 50%, #1B93C9 100%) !important;
        transform: scale(0.95) !important;
        box-shadow: 
          0 0 40px rgba(123, 97, 255, 1) !important,
          0 0 70px rgba(255, 106, 194, 1) !important,
          inset 0 4px 8px rgba(0, 0, 0, 0.4) !important;
      }

      ::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0.2) !important;
        border-radius: 4px !important;
      }

      /* Enhanced for projects page */
      .projects-scrollbar::-webkit-scrollbar {
        width: 20px !important;
      }

      .projects-scrollbar::-webkit-scrollbar-track {
        background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 100%) !important;
        border-radius: 10px !important;
        margin: 10px !important;
        border: 3px solid rgba(255, 255, 255, 0.1) !important;
        box-shadow: 
          inset 0 0 15px rgba(0, 0, 0, 0.4) !important,
          0 0 10px rgba(255, 255, 255, 0.05) !important;
      }

      .projects-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #7B61FF 0%, #FF6AC2 30%, #38BDF8 60%, #10B981 100%) !important;
        border-radius: 10px !important;
        border: 4px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: 
          0 0 30px rgba(123, 97, 255, 1) !important,
          0 0 50px rgba(255, 106, 194, 0.8) !important,
          0 0 70px rgba(56, 189, 248, 0.6) !important,
          inset 0 3px 6px rgba(255, 255, 255, 0.4) !important,
          inset 0 -3px 6px rgba(0, 0, 0, 0.3) !important;
        min-height: 80px !important;
      }

      .projects-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #6B51E6 0%, #E55AA9 30%, #2BA3D9 60%, #059669 100%) !important;
        box-shadow: 
          0 0 40px rgba(123, 97, 255, 1) !important,
          0 0 70px rgba(255, 106, 194, 1) !important,
          0 0 100px rgba(56, 189, 248, 0.8) !important,
          0 0 120px rgba(16, 185, 129, 0.6) !important,
          inset 0 4px 8px rgba(255, 255, 255, 0.5) !important,
          inset 0 -4px 8px rgba(0, 0, 0, 0.4) !important;
        transform: scale(1.15) !important;
        border-color: rgba(255, 255, 255, 0.4) !important;
      }

      /* Pulsing animation */
      @keyframes scrollbar-glow {
        0%, 100% { 
          box-shadow: 
            0 0 30px rgba(123, 97, 255, 1),
            0 0 50px rgba(255, 106, 194, 0.8);
        }
        50% { 
          box-shadow: 
            0 0 50px rgba(123, 97, 255, 1),
            0 0 80px rgba(255, 106, 194, 1),
            0 0 100px rgba(56, 189, 248, 0.8);
        }
      }

      .projects-scrollbar::-webkit-scrollbar-thumb:active {
        animation: scrollbar-glow 1s ease-in-out infinite !important;
      }

      /* Firefox scrollbar */
      html {
        scrollbar-width: auto !important;
        scrollbar-color: #7B61FF rgba(0, 0, 0, 0.2) !important;
      }

      /* Ensure minimum content height to show scrollbar */
      body {
        min-height: 101vh !important;
      }

      /* Force scrollbar on all containers */
      .projects-scrollbar, 
      .enhanced-scrollbar,
      .scroll-container {
        overflow-y: scroll !important;
      }

      /* Additional visibility enhancements */
      ::-webkit-scrollbar-track:hover {
        background: linear-gradient(180deg, rgba(123,97,255,0.1) 0%, rgba(0,0,0,0.3) 100%) !important;
      }

      /* Ensure scrollbar is always on top */
      ::-webkit-scrollbar {
        z-index: 9999 !important;
      }
    `;
    
    document.head.appendChild(style);
    
    // Cleanup
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default ForceScrollbar;