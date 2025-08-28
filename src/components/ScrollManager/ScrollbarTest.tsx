'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SimpleScrollbar from './SimpleScrollbar';

const ScrollbarTest: React.FC = () => {
  return (
    <>
      <SimpleScrollbar />
      <div className="min-h-[300vh] bg-gradient-to-b from-gray-900 via-purple-900 to-blue-900 p-8">
        <div className="max-w-4xl mx-auto text-white">
          <motion.div
            className="text-center mb-16 mt-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              اختبار شريط التمرير
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              مرر لأسفل لرؤية شريط التمرير المخصص الاحترافي
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>

          {/* Content sections to create scroll */}
          {[...Array(20)].map((_, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                🎨 قسم رقم {index + 1}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                هذا نص تجريبي لإنشاء محتوى طويل يتطلب التمرير. شريط التمرير المخصص يجب أن يظهر 
                على الجانب الأيمن من الشاشة مع تأثيرات الإضاءة والألوان المتدرجة الجميلة.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-500/20 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">✨ ميزة 1</h3>
                  <p className="text-sm text-gray-300">
                    شريط تمرير بألوان متدرجة احترافية
                  </p>
                </div>
                <div className="bg-pink-500/20 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">🚀 ميزة 2</h3>
                  <p className="text-sm text-gray-300">
                    تأثيرات الإضاءة والرسوم المتحركة
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-6">🎉 نهاية الاختبار!</h2>
            <p className="text-xl text-gray-300 mb-8">
              إذا رأيت شريط التمرير المخصص، فقد نجح الاختبار!
            </p>
            <motion.div
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✅ شريط التمرير يعمل!
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ScrollbarTest;