'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollManagerPro from './ScrollManagerPro';

const ScrollManagerDemo: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'gradient' | 'neon' | 'glass' | 'minimal'>('gradient');
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [showVelocity, setShowVelocity] = useState(false);

  const themes = [
    { name: 'gradient', label: 'متدرج', color: 'from-purple-500 to-pink-500' },
    { name: 'neon', label: 'نيون', color: 'from-cyan-400 to-purple-600' },
    { name: 'glass', label: 'زجاجي', color: 'from-white/30 to-white/10' },
    { name: 'minimal', label: 'بسيط', color: 'from-gray-600 to-gray-800' }
  ] as const;

  const positions = [
    { name: 'top', label: 'أعلى' },
    { name: 'bottom', label: 'أسفل' },
    { name: 'left', label: 'يسار' },
    { name: 'right', label: 'يمين' }
  ] as const;

  return (
    <>
      <ScrollManagerPro
        theme={currentTheme}
        position={position}
        showVelocityIndicator={showVelocity}
        showScrollIndicator={true}
        progressBarHeight={6}
      />
      
      {/* Control Panel */}
      <motion.div
        className="fixed top-20 left-4 z-50 bg-black/80 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg font-bold mb-4 text-center">🎨 لوحة التحكم</h3>
        
        {/* Theme Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">الثيم:</label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <motion.button
                key={theme.name}
                onClick={() => setCurrentTheme(theme.name)}
                className={`
                  px-3 py-2 rounded-lg text-xs font-medium transition-all
                  ${currentTheme === theme.name 
                    ? 'bg-white/20 border-2 border-white/40' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-full h-2 rounded mb-1 bg-gradient-to-r ${theme.color}`} />
                {theme.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Position Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">الموضع:</label>
          <div className="grid grid-cols-2 gap-2">
            {positions.map((pos) => (
              <motion.button
                key={pos.name}
                onClick={() => setPosition(pos.name)}
                className={`
                  px-3 py-2 rounded-lg text-xs font-medium transition-all
                  ${position === pos.name 
                    ? 'bg-blue-500/30 border-2 border-blue-400/50' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pos.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Velocity Indicator Toggle */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showVelocity}
              onChange={(e) => setShowVelocity(e.target.checked)}
              className="rounded"
            />
            مؤشر السرعة
          </label>
        </div>

        {/* Info */}
        <div className="text-xs text-gray-300 mt-4 p-3 bg-white/5 rounded-lg">
          <p className="mb-1">🚀 <strong>ميزات متقدمة:</strong></p>
          <ul className="text-xs space-y-1">
            <li>• شريط تقدم ديناميكي</li>
            <li>• تأثيرات الإضاءة</li>
            <li>• رسوم متحركة سلسة</li>
            <li>• مؤشر السرعة</li>
            <li>• دعم لوحة المفاتيح</li>
            <li>• شريط تمرير مخصص</li>
          </ul>
        </div>
      </motion.div>

      {/* Demo Content */}
      <div className="min-h-[300vh] bg-gradient-to-b from-gray-900 via-purple-900 to-blue-900 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center text-white mb-16 mt-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ScrollManager Pro
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              مدير التمرير الأكثر تقدماً واحترافية
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>

          {/* Feature Sections */}
          {[
            {
              title: "🎨 تصميم متقدم",
              content: "أربعة ثيمات مختلفة مع تأثيرات بصرية مذهلة وألوان متدرجة احترافية."
            },
            {
              title: "⚡ أداء محسن",
              content: "استخدام requestAnimationFrame وتحسينات الأداء لضمان تجربة سلسة."
            },
            {
              title: "🎯 مؤشرات ذكية",
              content: "مؤشر التقدم، مؤشر السرعة، واتجاه التمرير مع رسوم متحركة تفاعلية."
            },
            {
              title: "🌈 تأثيرات بصرية",
              content: "تأثيرات الوميض، النبض، والإضاءة التي تتفاعل مع سرعة التمرير."
            },
            {
              title: "♿ إمكانية الوصول",
              content: "دعم كامل للوحة المفاتيح وقارئات الشاشة مع تسميات عربية."
            },
            {
              title: "📱 تصميم متجاوب",
              content: "يعمل بشكل مثالي على جميع الأجهزة والشاشات المختلفة."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">{feature.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{feature.content}</p>
            </motion.div>
          ))}

          {/* Code Example */}
          <motion.div
            className="bg-black/50 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">💻 كيفية الاستخدام</h2>
            <pre className="text-green-400 text-sm overflow-x-auto">
{`import ScrollManagerPro from '@/components/ScrollManager';

<ScrollManagerPro
  theme="gradient"          // gradient | neon | glass | minimal
  position="top"           // top | bottom | left | right
  showVelocityIndicator    // إظهار مؤشر السرعة
  showScrollIndicator      // إظهار مؤشر التمرير
  progressBarHeight={6}    // ارتفاع شريط التقدم
/>`}
            </pre>
          </motion.div>

          {/* Final Section */}
          <motion.div
            className="text-center text-white py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-6">🎉 جاهز للاستخدام!</h2>
            <p className="text-xl text-gray-300 mb-8">
              ScrollManager Pro يوفر تجربة تمرير احترافية ومتقدمة
            </p>
            <motion.div
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ تجربة رائعة ✨
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ScrollManagerDemo;