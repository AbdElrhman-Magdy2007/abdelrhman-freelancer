'use client';

import FinalScrollbar from '@/components/ScrollManager/FinalScrollbar';

export default function FinalTestPage() {
  return (
    <>
      <FinalScrollbar />
      <div className="min-h-[200vh] bg-gradient-to-b from-gray-900 via-purple-900 to-blue-900 p-8">
        <div className="max-w-4xl mx-auto text-white">
          <div className="text-center py-32">
            <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              🎯 اختبار نهائي للـ Scrollbar
            </h1>
            <p className="text-2xl text-gray-300 mb-12">
              إذا كنت ترى شريط التمرير الملون على الجانب الأيمن، فكل شيء يعمل بشكل مثالي!
            </p>
            <div className="w-40 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full animate-pulse" />
          </div>

          <div className="space-y-12">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl">
                <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  ✨ المحتوى رقم {i + 1} ✨
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed text-center mb-8">
                  هذا محتوى تجريبي طويل لإنشاء صفحة تتطلب التمرير. شريط التمرير المخصص يجب أن يظهر 
                  بألوان متدرجة جميلة وتأثيرات إضاءة رائعة. مرر لأعلى وأسفل لرؤية التأثيرات المختلفة!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-purple-500/30 p-6 rounded-2xl text-center transform hover:scale-105 transition-transform">
                    <div className="text-5xl mb-4">🎨</div>
                    <h3 className="font-bold text-lg mb-2">ألوان رائعة</h3>
                    <p className="text-sm text-gray-300">تدرج من 5 ألوان مختلفة</p>
                  </div>
                  <div className="bg-pink-500/30 p-6 rounded-2xl text-center transform hover:scale-105 transition-transform">
                    <div className="text-5xl mb-4">✨</div>
                    <h3 className="font-bold text-lg mb-2">تأثيرات مذهلة</h3>
                    <p className="text-sm text-gray-300">إضاءة وظلال متحركة</p>
                  </div>
                  <div className="bg-cyan-500/30 p-6 rounded-2xl text-center transform hover:scale-105 transition-transform">
                    <div className="text-5xl mb-4">🚀</div>
                    <h3 className="font-bold text-lg mb-2">أداء سريع</h3>
                    <p className="text-sm text-gray-300">تحميل فوري وسلس</p>
                  </div>
                  <div className="bg-orange-500/30 p-6 rounded-2xl text-center transform hover:scale-105 transition-transform">
                    <div className="text-5xl mb-4">🎯</div>
                    <h3 className="font-bold text-lg mb-2">دقة عالية</h3>
                    <p className="text-sm text-gray-300">تصميم احترافي ومتقن</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center py-20">
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🎉 تهانينا! 🎉
            </h2>
            <p className="text-2xl text-gray-300 mb-8">
              إذا وصلت إلى هنا ورأيت شريط التمرير الملون، فقد نجح كل شيء!
            </p>
            <div className="inline-block px-12 py-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full text-white font-bold text-2xl animate-bounce shadow-2xl">
              ✅ الـ Scrollbar يعمل بنجاح! ✅
            </div>
          </div>
        </div>
      </div>
    </>
  );
}