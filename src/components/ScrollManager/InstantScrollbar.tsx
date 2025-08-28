'use client';

import { useEffect } from 'react';

const InstantScrollbar = () => {
  useEffect(() => {
    // Apply styles immediately when component mounts
    const applyScrollbarStyles = () => {
      const existingStyle = document.querySelector('#instant-scrollbar');
      if (existingStyle) existingStyle.remove();

      const style = document.createElement('style');
      style.id = 'instant-scrollbar';
      style.textContent = `
        /* INSTANT SCROLLBAR - MAXIMUM VISIBILITY */
        html {
          overflow-y: scroll !important;
          scrollbar-width: auto !important;
          scrollbar-color: #FF0080 rgba(0,0,0,0.3) !important;
        }

        body {
          min-height: 101vh !important;
        }

        ::-webkit-scrollbar {
          width: 20px !important;
          background: rgba(0,0,0,0.2) !important;
        }

        ::-webkit-scrollbar-track {
          background: linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3), rgba(0,0,0,0.1)) !important;
          border-radius: 10px !important;
          margin: 8px !important;
          border: 2px solid rgba(255,255,255,0.1) !important;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #FF0080, #7928CA, #0070F3, #00DFD8, #FF6B35) !important;
          border-radius: 10px !important;
          border: 3px solid rgba(255,255,255,0.2) !important;
          box-shadow: 0 0 20px rgba(255,0,128,0.8), 0 0 40px rgba(121,40,202,0.6) !important;
          min-height: 60px !important;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #FF1493, #8A2BE2, #1E90FF, #00CED1, #FF7F50) !important;
          box-shadow: 0 0 30px rgba(255,20,147,1), 0 0 60px rgba(138,43,226,0.8) !important;
          transform: scale(1.1) !important;
        }

        .projects-scrollbar::-webkit-scrollbar {
          width: 22px !important;
        }

        .projects-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #7B61FF, #FF6AC2, #38BDF8, #10B981, #F59E0B, #EF4444) !important;
          box-shadow: 0 0 25px rgba(123,97,255,1), 0 0 50px rgba(255,106,194,0.8) !important;
        }
      `;
      
      document.head.appendChild(style);
    };

    // Apply immediately
    applyScrollbarStyles();

    // Also apply after a short delay to ensure it overrides other styles
    const timeout = setTimeout(applyScrollbarStyles, 100);

    return () => {
      clearTimeout(timeout);
      const style = document.querySelector('#instant-scrollbar');
      if (style) style.remove();
    };
  }, []);

  return null;
};

export default InstantScrollbar;