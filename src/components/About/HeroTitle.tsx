"use client";

import React from "react";
import { motion } from "framer-motion";

// مكون لتلوين الكلمات بتدرج لوني وتأثير Hover
const HighlightWord = ({
  children,
  gradient,
}: {
  children: React.ReactNode;
  gradient: string;
}) => {
  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-clip-text text-transparent font-extrabold ${gradient}`}
    >
      {children}
    </motion.span>
  );
};

// مكون العنوان الكامل
const HeroTitle = () => {
  return (
    <div className="text-center py-16 px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
        <HighlightWord gradient="bg-gradient-to-r from-indigo-500 to-purple-600">
          Be{" "}
        </HighlightWord>
        <HighlightWord gradient="bg-gradient-to-r from-pink-400 to-red-500">
          Creative{" "}
        </HighlightWord>
        <HighlightWord gradient="bg-gradient-to-r from-yellow-400 to-orange-500">
          With{" "}
        </HighlightWord>
        <HighlightWord gradient="bg-gradient-to-r from-blue-400 to-cyan-500">
          React{" "}
        </HighlightWord>
        <HighlightWord gradient="bg-gradient-to-r from-green-400 to-emerald-500">
          Bits
        </HighlightWord>
      </h1>
    </div>
  );
};

export default HeroTitle;
