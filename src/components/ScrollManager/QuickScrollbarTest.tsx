'use client';

import React, { useEffect } from 'react';

const QuickScrollbarTest: React.FC = () => {
  useEffect(() => {
    // Inject ultra-visible scrollbar styles immediately
    const style = document.createElement('style');
    style.innerHTML = `
      /* ULTRA VISIBLE SCROLLBAR - IMMEDIATE EFFECT */
      html {
        overflow-y: scroll !important;
        scrollbar-width: auto !important;
      }

      body {
        min-height: 200vh !important;
        background: linear-gradient(45deg, #1a1a2e, #16213e, #0f3460) !important;
      }

      ::-webkit-scrollbar {
        width: 24px !important;
        background: rgba(0, 0, 0, 0.3) !important;
      }

      ::-webkit-scrollbar-track {
        background: linear-gradient(180deg, 
          rgba(0, 0, 0, 0.2) 0%, 
          rgba(0, 0, 0, 0.4) 50%, 
          rgba(0, 0, 0, 0.2) 100%) !important;
        border-radius: 12px !important;
        margin: 12px !important;
        border: 3px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: 
          inset 0 0 15px rgba(0, 0, 0, 0.5),
          0 0 10px rgba(255, 255, 255, 0.1) !important;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, 
          #FF0080 0%,   /* Hot Pink */
          #7928CA 20%,  /* Purple */
          #0070F3 40%,  /* Blue */
          #00DFD8 60%,  /* Cyan */
          #7928CA 80%,  /* Purple */
          #FF0080 100%  /* Hot Pink */
        ) !important;
        border-radius: 12px !important;
        border: 4px solid rgba(255, 255, 255, 0.3) !important;
        box-shadow: 
          0 0 30px rgba(255, 0, 128, 1),
          0 0 60px rgba(121, 40, 202, 0.8),
          0 0 90px rgba(0, 112, 243, 0.6),
          0 0 120px rgba(0, 223, 216, 0.4),
          inset 0 4px 8px rgba(255, 255, 255, 0.4),
          inset 0 -4px 8px rgba(0, 0, 0, 0.3) !important;
        min-height: 120px !important;
        transition: all 0.3s ease !important;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, 
          #FF1493 0%,   /* Deep Pink */
          #8A2BE2 20%,  /* Blue Violet */
          #1E90FF 40%,  /* Dodger Blue */
          #00CED1 60%,  /* Dark Turquoise */
          #9370DB 80%,  /* Medium Purple */
          #FF1493 100%  /* Deep Pink */
        ) !important;
        box-shadow: 
          0 0 40px rgba(255, 20, 147, 1),
          0 0 80px rgba(138, 43, 226, 1),
          0 0 120px rgba(30, 144, 255, 0.8),
          0 0 160px rgba(0, 206, 209, 0.6),
          0 0 200px rgba(147, 112, 219, 0.4),
          inset 0 5px 10px rgba(255, 255, 255, 0.5),
          inset 0 -5px 10px rgba(0, 0, 0, 0.4) !important;
        transform: scale(1.2) !important;
        border-color: rgba(255, 255, 255, 0.5) !important;
      }

      ::-webkit-scrollbar-thumb:active {
        background: linear-gradient(135deg, 
          #DC143C 0%,   /* Crimson */
          #4B0082 20%,  /* Indigo */
          #0000FF 40%,  /* Blue */
          #008B8B 60%,  /* Dark Cyan */
          #663399 80%,  /* Rebecca Purple */
          #DC143C 100%  /* Crimson */
        ) !important;
        transform: scale(0.9) !important;
        box-shadow: 
          0 0 50px rgba(220, 20, 60, 1),
          0 0 100px rgba(75, 0, 130, 1),
          inset 0 6px 12px rgba(0, 0, 0, 0.5) !important;
      }

      /* Pulsing Animation */
      @keyframes mega-glow {
        0% { 
          box-shadow: 
            0 0 30px rgba(255, 0, 128, 1),
            0 0 60px rgba(121, 40, 202, 0.8);
        }
        20% { 
          box-shadow: 
            0 0 50px rgba(121, 40, 202, 1),
            0 0 100px rgba(0, 112, 243, 0.8);
        }
        40% { 
          box-shadow: 
            0 0 70px rgba(0, 112, 243, 1),
            0 0 140px rgba(0, 223, 216, 0.8);
        }
        60% { 
          box-shadow: 
            0 0 90px rgba(0, 223, 216, 1),
            0 0 180px rgba(121, 40, 202, 0.8);
        }
        80% { 
          box-shadow: 
            0 0 110px rgba(121, 40, 202, 1),
            0 0 220px rgba(255, 0, 128, 0.8);
        }
        100% { 
          box-shadow: 
            0 0 130px rgba(255, 0, 128, 1),
            0 0 260px rgba(121, 40, 202, 0.8);
        }
      }

      ::-webkit-scrollbar-thumb {
        animation: mega-glow 3s ease-in-out infinite !important;
      }

      /* Projects page enhanced */
      .projects-scrollbar::-webkit-scrollbar {
        width: 26px !important;
      }

      .projects-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, 
          #FF0080 0%, #7928CA 16%, #0070F3 32%, 
          #00DFD8 48%, #7928CA 64%, #FF0080 80%, 
          #FF6B35 100%) !important;
        animation: mega-glow 2s ease-in-out infinite !important;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-[300vh] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 mt-32">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            🌈 اختبار الـ Scrollbar الفائق
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            شريط التمرير يجب أن يكون مرئي الآن مع ألوان قوس قزح متحركة!
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mx-auto rounded-full animate-pulse" />
        </div>

        <div className="grid gap-8">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold mb-4 text-center">
                ✨ قسم رقم {i + 1} ✨
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                هذا محتوى تجريبي لإنشاء صفحة طويلة تتطلب التمرير. شريط التمرير المخصص يجب أن يظهر 
                على الجانب الأيمن مع ألوان قوس قزح متحركة ومؤثرات الإضاءة المذهلة. إذا كنت ترى شريط 
                التمرير بألوان زاهية ومتحركة، فهذا يعني أن كل شيء يعمل بشكل مثالي!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-pink-500/20 p-6 rounded-xl text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <h3 className="font-bold mb-2">ألوان متدرجة</h3>
                  <p className="text-sm">6 ألوان مختلفة في تدرج واحد</p>
                </div>
                <div className="bg-purple-500/20 p-6 rounded-xl text-center">
                  <div className="text-4xl mb-2">✨</div>
                  <h3 className="font-bold mb-2">تأثيرات الإضاءة</h3>
                  <p className="text-sm">إضاءة متحركة ومؤثرات بصرية</p>
                </div>
                <div className="bg-cyan-500/20 p-6 rounded-xl text-center">
                  <div className="text-4xl mb-2">🚀</div>
                  <h3 className="font-bold mb-2">رسوم متحركة</h3>
                  <p className="text-sm">حركات سلسة وتفاعلية</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-16">
          <h2 className="text-5xl font-bold mb-6">🎉 مبروك!</h2>
          <p className="text-2xl text-gray-300 mb-8">
            إذا رأيت شريط التمرير الملون، فقد نجح الاختبار بنسبة 100%!
          </p>
          <div className="inline-block px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full text-white font-bold text-xl animate-bounce">
            ✅ شريط التمرير يعمل بشكل مثالي! ✅
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickScrollbarTest;