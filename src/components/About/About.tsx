'use client';

import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import CurvedLoop from "./CurvedLoop";
import ScrollStack from "./ScrollStack";
  import type { Variants } from "framer-motion";

const ParticleBackground = () => {
  const COLORS = ["#5D5FEF", "#EFA6BE", "#F96A6A"];

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 8,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.4 + 0.4,
        color: COLORS[i % COLORS.length],
      })),
    []
  );

  interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
    color: string;
  }


  const particleVariants: Variants & { [key: string]: any } = {
    animate: (i: number) => ({
      x: [
        particles[i].x,
        particles[i].x + (Math.random() * 80 - 40),
        particles[i].x,
      ],
      y: [
        particles[i].y,
        particles[i].y + (Math.random() * 80 - 40),
        particles[i].y,
      ],
      opacity: [0, particles[i].opacity, 0],
      scale: [0, 1.5, 0],
      rotate: [0, 360, 720],
      transition: {
        duration: particles[i].duration,
        delay: particles[i].delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    }),
    pulse: {
      scale: [1, 1.4, 1],
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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
    </div>
  );
};

const Card = ({ title, description, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut",
        type: "spring",
        stiffness: 80,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5D5FEF] to-[#EFA6BE] mb-2">
        {title}
      </h2>
      <p className="text-gray-300 text-base sm:text-lg leading-relaxed pl-10">
        {description}
      </p>
    </motion.div>
  );
};

const About = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const scrollStackRef = useRef(null);

  const cards = [
    {
      title: "Stunning UI That Speaks Design",
      description:
        "I design clean, modern, and mobile-friendly interfaces using Tailwind CSS. With smooth animations from Framer Motion, every interaction feels fast, natural, and professional.",
    },
    {
      title: "Fast, Clean & Scalable Code",
      description:
        "I build high-performance websites using React, Next.js, and TypeScript —with clean code that’s made to scale and last.",
    },
    {
      title: "Full-Stack Power You Can Trust",
      description:
        "I build complete web apps with secure backends, fast APIs, and seamless payment & auth integrations — using Prisma, PostgreSQL, Stripe, and NextAuth.",
    },
  ];

  interface Sparkle {
    id: number;
    x: number;
    y: number;
  }

  const createSparkle = (x: number, y: number): void => {
    const id = Date.now();
    setSparkles((prev: Sparkle[]) => [...prev, { id, x, y }]);
    setTimeout(() => setSparkles((prev: Sparkle[]) => prev.filter((s) => s.id !== id)), 600);
  };

  return (
    <section className="relative bg-black min-h-screen text-white overflow-hidden px-4 sm:px-6 lg:px-12 xl:px-24 py-16" id="Expertise">
      <ParticleBackground />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <CurvedLoop
          marqueeText="Clean Code ✦ Fast Delivery ✦ Modern UI ✦ Scalable Apps ✦ High Performance ✦ Real Results"
          speed={1.8}
          curveAmount={300}
          direction="left"
          interactive
          className="py-16"
        />

        <ScrollStack
          ref={scrollStackRef}
          className="custom-scrollbar max-h-[600px] w-full overflow-y-auto"
        >
          {cards.map((card, index) => (
            <Card key={card.title} title={card.title} description={card.description} index={index} />
          ))}
        </ScrollStack>
      </motion.div>

      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: 10,
            height: 10,
            background: "linear-gradient(135deg, #5D5FEF, #EFA6BE)",
          }}
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={{ scale: 2, opacity: 0, rotate: 270 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </section>
  );
};

export default About;
