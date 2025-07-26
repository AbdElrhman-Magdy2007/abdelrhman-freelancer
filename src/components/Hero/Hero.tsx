"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Aurora from "./Aurora";
import SplitText from "./SplitText";

const Hero = () => {
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const handleSparkles = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const newSparkles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 40 - 20),
    }));

    setSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) =>
        prev.filter((s) => !newSparkles.some((n) => n.id === s.id))
      );
    }, 700);
  };

  const user = {
    name: "Abdelrahman Magdy",
    image: "/images/avatar.jpeg",
  };

  const splitFrom = useMemo(() => ({ opacity: 0, y: 40 }), []);
  const splitTo = useMemo(() => ({ opacity: 1, y: 0 }), []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-20 overflow-hidden bg-black"
    >
      {/* Background Aurora */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.8}
          amplitude={1.5}
          speed={0.8}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Text Header */}
      <div className="relative z-10 text-center mb-3">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Abdelrahman Magdy
          </span>
        </motion.h1>
      </div>

      {/* Profile Image */}
      <motion.div
        className="relative z-10 mb-3 cursor-pointer"
        animate={{ y: [0, -12, 0], rotate: [0, 1.5, -1.5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        onClick={handleSparkles}
      >
        <div className="w-40 h-40 md:w-60 md:h-60 rounded-full overflow-hidden  p-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_0_80px_rgba(123,97,255,0.4)] flex items-center justify-center">
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Sparkles effect */}
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 shadow-md"
              initial={{ opacity: 1, scale: 0, x: s.x, y: s.y }}
              animate={{ opacity: 0, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="relative z-10 mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/projects">
          <Button className="group bg-gradient-to-r from-indigo-700/30 to-purple-700/30 border border-indigo-800/50 text-white px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-lg shadow-xl hover:shadow-2xl transition duration-500">
            View All Projects
            <Sparkles className="ml-3 w-5 h-5 group-hover:rotate-12 transition duration-300" />
          </Button>
        </Link>
      </motion.div>

      {/* Footer Description */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-8 px-6">
        {/* Left */}
        <motion.div
          className="text-center md:text-left text-indigo-200 text-base md:text-lg font-semibold"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Full-Stack Web Developer
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Crafting beautiful & blazing-fast websites.
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="text-sm md:text-lg font-medium text-center md:text-right bg-gradient-to-l from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent max-w-sm md:max-w-md drop-shadow-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            I turn code into beautiful, lightning-fast experiences
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            that deliver real value and lasting impressions.

          </div>
   
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
