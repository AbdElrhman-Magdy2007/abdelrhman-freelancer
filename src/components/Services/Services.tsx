"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContainerScroll } from "@/components/Services/container-scroll-animation";
import GlitchText from "./GlitchText";
import CodeShowcase from "./CodeShowcase";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";

// Particle Background Component
const ParticleBackground = () => {
  const COLORS = ["#5D5FEF", "#EFA6BE", "#F96A6A", "#7EE7D2", "#FFD700"];

  const particles = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 12 + 6,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.6 + 0.4,
        color: COLORS[i % COLORS.length],
      })),
    []
  );

  const particleVariants = {
    animate: (i) => ({
      x: [
        particles[i].x,
        particles[i].x + (Math.sin(i) * 120 + Math.random() * 60 - 30),
        particles[i].x,
      ],
      y: [
        particles[i].y,
        particles[i].y + (Math.cos(i) * 120 + Math.random() * 60 - 30),
        particles[i].y,
      ],
      opacity: [0.2, particles[i].opacity, 0.2],
      scale: [0.5, 1.8, 0.5],
      rotate: [0, 360, 0],
      transition: {
        duration: particles[i].duration,
        delay: particles[i].delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    }),
    pulse: {
      scale: [1, 1.5, 1],
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    glow: (custom: number) => ({
      boxShadow: [
        `0 0 8px ${particles[custom].color}44`,
        `0 0 24px ${particles[custom].color}88`,
        `0 0 8px ${particles[custom].color}44`,
      ],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            filter: "blur(2px)",
          }}
          variants={particleVariants}
          animate={["animate", "pulse", "glow"]}
          custom={p.id}
        />
      ))}

      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`pulse-circle-${i}`}
          className="absolute rounded-full border-[2px] shadow-2xl"
          style={{
            width: 200 + i * 150,
            height: 200 + i * 150,
            top: `${25 + i * 10}%`,
            left: `${30 + i * 15}%`,
            transform: "translate(-50%, -50%)",
            borderColor: COLORS[i % COLORS.length],
            boxShadow: `0 0 50px ${COLORS[i % COLORS.length]}55`,
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.15, 0.3],
            rotate: [0, 180],
          }}
          transition={{
            duration: 7 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${COLORS[0]}1A, transparent 60%), radial-gradient(circle at 80% 80%, ${COLORS[2]}1A, transparent 60%)`,
        }}
        animate={{
          opacity: [0.15, 0.3, 0.15],
          x: [-50, 50, -50],
          y: [-30, 30, -30],
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

const Services = () => {
  const [showCode, setShowCode] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const createSparkle = (x: number, y: number) => {
    const id = Date.now();
    setSparkles((prev) => [
      ...prev,
      { id, x: x + Math.random() * 10 - 5, y: y + Math.random() * 10 - 5 },
    ]);
    setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 600);
  };

  const handleToggleCode = () => {
    setShowCode((prev) => !prev);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 70 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 90,
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="Code"
      className="relative min-h-screen bg-black py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <ParticleBackground />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ContainerScroll
          titleComponent={
            <motion.div variants={childVariants}>
              <GlitchText
                speed={0.6}
                enableShadows
                className="text-center text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-xl"
              >
                Elite Code Showcase
              </GlitchText>
            </motion.div>
          }
        >
          <motion.img
            src="/images/carbon.png"
            alt="Code Snippet"
            variants={childVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(255,255,255,0.25)" }}
            transition={{ duration: 1.3, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto mt-20 object-contain rounded-3xl shadow-2xl border border-white/15"
            draggable={false}
          />
        </ContainerScroll>

        <motion.div
          className="flex justify-center mt-20"
          variants={childVariants}
        >
          <button
            onClick={handleToggleCode}
            onMouseEnter={(e) => {
              setHovered(true);
              createSparkle(e.clientX, e.clientY);
            }}
            onMouseLeave={() => setHovered(false)}
            className={clsx(
              buttonVariants({ variant: "default", size: "lg" }),
              "px-12 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-2xl shadow-2xl transform transition-all duration-300",
              hovered && "scale-105 shadow-[0_0_30px_rgba(94,95,239,0.5)]"
            )}
          >
            {showCode ? "Hide Code Preview" : "Explore Live Code"}
            <motion.span
              className="inline-block ml-3"
              animate={{ x: hovered ? 6 : 0, rotate: hovered ? 360 : 0 }}
              transition={{ duration: 0.4 }}
            >
              →
            </motion.span>
          </button>
        </motion.div>

        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 70 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="mt-20 max-w-6xl mx-auto"
            >
              <CodeShowcase />
            </motion.div>
          )}
        </AnimatePresence>

        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute rounded-full"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: 10,
              height: 10,
              background: "linear-gradient(135deg, #5D5FEF, #EFA6BE)",
              filter: "blur(1px)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Services;