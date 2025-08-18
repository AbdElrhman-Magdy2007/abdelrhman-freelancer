"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// Interface for form data
interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

// Particle Background Component
const COLORS = ["#5D5FEF", "#EFA6BE", "#F96A6A"];

const ParticleBackground: React.FC = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 6,
        duration: Math.random() * 8 + 4,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.4 + 0.2,
        color: COLORS[i % COLORS.length],
      })),
    []
  );

  const particleVariants: Variants = {
    animate: (i: number) => ({
      x: [particles[i].x, particles[i].x + (Math.random() * 80 - 40), particles[i].x],
      y: [particles[i].y, particles[i].y + (Math.random() * 80 - 40), particles[i].y],
      opacity: [0, particles[i].opacity, 0],
      scale: [0, 1.3, 0],
      rotate: [0, 360],
      transition: {
        duration: particles[i].duration,
        delay: particles[i].delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
    pulse: {
      scale: [1, 1.4, 1],
      opacity: [0.2, 0.5, 0.2],
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

const ContactForm: React.FC = () => {
  const [formData] = useState<FormData>({
    name: "John Doe",
    email: "example@email.com",
    message: "This is a read-only message field",
    honeypot: "",
  });
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Create sparkle effect
  const createSparkle = useCallback((x: number, y: number) => {
    const id = Date.now();
    setSparkles((prev) => [
      ...prev,
      { id, x: x + Math.random() * 10 - 5, y: y + Math.random() * 10 - 5 },
    ]);
    setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 600);
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-black py-20 overflow-hidden"
    >
      <ParticleBackground />
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect and bring your ideas to
            life.
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-[#5D5FEF] to-[#EFA6BE] mx-auto mt-6 rounded"></div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-[0_0_20px_rgba(93,95,239,0.3)] transition-all duration-300">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
              <form className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    readOnly
                    className="w-full bg-white/5 border border-white/10 text-gray-400 placeholder-gray-500 cursor-not-allowed focus:ring-0 focus:border-white/10"
                    aria-readonly="true"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full bg-white/5 border border-white/10 text-gray-400 placeholder-gray-500 cursor-not-allowed focus:ring-0 focus:border-white/10"
                    aria-readonly="true"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    readOnly
                    className="w-full bg-white/5 border border-white/10 text-gray-400 placeholder-gray-500 cursor-not-allowed resize-none focus:ring-0 focus:border-white/10"
                    aria-readonly="true"
                  />
                </div>

                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-[#5D5FEF] to-[#EFA6BE] hover:from-[#4B4CCB] hover:to-[#D68AA6] text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  onClick={(e) => createSparkle(e.clientX, e.clientY)}
                >
                  Fields are read-only
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

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
            boxShadow: "0 0 15px rgba(93, 95, 239, 0.5)",
          }}
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={{ scale: 2.5, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </section>
  );
};

export default ContactForm;
