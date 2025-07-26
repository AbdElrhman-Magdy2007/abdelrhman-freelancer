'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { Pages, Routes } from '@/constants/enums';
import Link from 'next/link';
import Form from './_components/Form';

const FallbackForm = () => (
  <div className="text-center text-red-500 dark:text-red-400 p-4">
    ⚠️ Error loading form. Please try again later.
  </div>
);

// ألوان هادئة ومريحة
const COLORS = ['#5D5FEF', '#EFA6BE', '#F96A6A'];

const ParticleBackground = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 4,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.3 + 0.3,
        color: COLORS[i % COLORS.length],
      })),
    []
  );

  const particleVariants = {
    animate: (i: number) => ({
      x: [particles[i].x, particles[i].x + (Math.random() * 60 - 30), particles[i].x],
      y: [particles[i].y, particles[i].y + (Math.random() * 60 - 30), particles[i].y],
      opacity: [0, particles[i].opacity, 0],
      scale: [0, 1.2, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: particles[i].duration,
        delay: particles[i].delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
      },
    }),
    pulse: {
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* الجزيئات الصغيرة المتحركة */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-sm"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
          }}
          variants={particleVariants}
          animate={['animate', 'pulse']}
          custom={p.id}
        />
      ))}

      {/* دوائر نابضة توسعية بتصميم عصري */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`pulse-circle-${i}`}
          className="absolute rounded-full border"
          style={{
            width: 200 + i * 60,
            height: 200 + i * 60,
            top: `${20 + i * 20}%`,
            left: `${30 + i * 20}%`,
            transform: 'translate(-50%, -50%)',
            borderColor: `${COLORS[i % COLORS.length]}33`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.15, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* لمعة خلفية متدرجة */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(60deg, transparent, ${COLORS[0]}22, transparent)`,
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05],
          x: [-40, 40, -40],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default function SignInPage() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 70,
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };
const COLORS = ['#00FFFF', '#FF00FF', '#FF5733']; // سماوي - فوشيا - برتقالي قوي

  const createSparkle = (x: number, y: number) => {
    const id = Date.now();
    setSparkles((prev) => [...prev, { id, x: x + Math.random() * 8 - 4, y: y + Math.random() * 8 - 4 }]);
    setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 500);
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-4">
      <ParticleBackground />

      <motion.div
        className="w-full max-w-md p-6 sm:p-8 border border-white/10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02] z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-[#5D5FEF] mb-6"
          variants={childVariants}
        >
          Sign In
        </motion.h2>

        <motion.div variants={childVariants}>
          {Form ? <Form /> : <FallbackForm />}
        </motion.div>

        <motion.p
          className="text-center text-slate-300 text-sm sm:text-base mt-6"
          variants={childVariants}
        >
          Don’t have an account?{' '}
          <span className="relative inline-block">
            <Link
              href={`/${Routes.AUTH}/${Pages.Register}`}
              className={`${buttonVariants({ variant: 'link', size: 'sm' })} !text-[#EFA6BE] hover:underline transition-all`}
              onMouseEnter={(e) => createSparkle(e.clientX, e.clientY)}
              onClick={(e) => createSparkle(e.clientX, e.clientY)}
            >
              Create an Account
            </Link>
          </span>
        </motion.p>
      </motion.div>

      {/* Sparkle Effects */}
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {/* دوائر نابضة بحدود سميكة ووهج واضح */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`pulse-circle-${i}`}
          className="absolute rounded-full border-[4px] md:border-[6px] shadow-lg shadow-white/10 transition-all duration-1000"
          style={{
            width: 240 + i * 100,
            height: 240 + i * 100,
            top: `${30 + i * 12}%`,
            left: `${35 + i * 15}%`,
            transform: 'translate(-50%, -50%)',
            borderColor: COLORS[i % COLORS.length],
            boxShadow: `0 0 40px ${COLORS[i % COLORS.length]}55`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.35, 0.15, 0.35],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
    </main>
  );
}
