"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import Link from "next/link";
import Form from "./_components/Form";
import clsx from "clsx";

const FallbackForm: React.FC = () => (
  <div className="text-center text-red-500 dark:text-red-400 p-4">
    ⚠️ Error loading form. Please try again later.
  </div>
);

const COLORS = ["#5D5FEF", "#EFA6BE", "#F96A6A"];

const ParticleBackground = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 6,
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
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    }),
    pulse: {
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="mt-12 absolute inset-0 z-0 pointer-events-none overflow-hidden">
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
          animate={["animate", "pulse"]}
          custom={p.id}
        />
      ))}

      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`pulse-circle-${i}`}
          className="absolute rounded-full border-[4px] md:border-[6px] shadow-lg"
          style={{
            width: 220 + i * 100,
            height: 220 + i * 100,
            top: `${30 + i * 12}%`,
            left: `${35 + i * 15}%`,
            transform: "translate(-50%, -50%)",
            borderColor: COLORS[i % COLORS.length],
            boxShadow: `0 0 40px ${COLORS[i % COLORS.length]}55`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.35, 0.15, 0.35],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

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
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default function SignUpPage() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const createSparkle = (x: number, y: number) => {
    const id = Date.now();
    setSparkles((prev) => [...prev, { id, x: x + Math.random() * 8 - 4, y: y + Math.random() * 8 - 4 }]);
    setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 500);
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-4">
      <ParticleBackground />

      <motion.div
        className="w-full max-w-md p-6 sm:p-8 mt-14 border border-white/10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02] z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-[#5D5FEF] mb-6"
          variants={childVariants}
        >
          Sign Up
        </motion.h2>

        <motion.div variants={childVariants} className="min-h-[200px]">
          {Form ? <Form /> : <FallbackForm />}
        </motion.div>

        <motion.p className="text-center text-slate-300 text-sm sm:text-base mt-6" variants={childVariants}>
          Already have an account?{' '}
          <span className="relative inline-block">
            <Link
              href={`/${Routes.AUTH}/${Pages.LOGIN}`}
              className={`${buttonVariants({ variant: 'link', size: 'sm' })} !text-[#EFA6BE] hover:underline transition-all`}
              onMouseEnter={(e) => createSparkle(e.clientX, e.clientY)}
              onClick={(e) => createSparkle(e.clientX, e.clientY)}
            >
              Sign In
            </Link>
          </span>
        </motion.p>
      </motion.div>

      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="sparkle absolute rounded-full"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: 8,
            height: 8,
            background: "linear-gradient(135deg, #5D5FEF, #EFA6BE)",
          }}
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={{ scale: 2, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </main>
  );
}