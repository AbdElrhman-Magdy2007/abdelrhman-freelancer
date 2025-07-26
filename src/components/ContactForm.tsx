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
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`pulse-circle-${i}`}
          className="absolute rounded-full border-4 md:border-6 shadow-2xl"
          style={{
            width: 200 + i * 120,
            height: 200 + i * 120,
            top: `${30 + i * 10}%`,
            left: `${35 + i * 12}%`,
            transform: "translate(-50%, -50%)",
            borderColor: COLORS[i % COLORS.length],
            boxShadow: `0 0 50px ${COLORS[i % COLORS.length]}44`,
          }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.3, 0.1, 0.3],
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
          background: `linear-gradient(45deg, transparent, ${COLORS[0]}22, transparent)`,
        }}
        animate={{
          opacity: [0.05, 0.2, 0.05],
          x: [-50, 50, -50],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "invalid" | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle form input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  // Create sparkle effect
  const createSparkle = useCallback((x: number, y: number) => {
    const id = Date.now();
    setSparkles((prev) => [
      ...prev,
      { id, x: x + Math.random() * 10 - 5, y: y + Math.random() * 10 - 5 },
    ]);
    setTimeout(() => setSparkles((prev) => prev.filter((s) => s.id !== id)), 600);
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      return;
    }

    if (!validateForm()) {
      setSubmitStatus("invalid");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

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
    <section id="contact" className="relative min-h-screen flex items-center justify-center bg-black py-20 overflow-hidden">
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
            Have a project in mind or want to collaborate? Let's connect and bring your ideas to life.
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-[#5D5FEF] to-[#EFA6BE] mx-auto mt-6 rounded"></div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-[0_0_20px_rgba(93,95,239,0.3)] transition-all duration-300">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"} text-white placeholder-gray-400 focus:border-[#5D5FEF] focus:ring-[#5D5FEF] transition-all duration-300`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="name-error"
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} text-white placeholder-gray-400 focus:border-[#5D5FEF] focus:ring-[#5D5FEF] transition-all duration-300`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="email-error"
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Share your thoughts..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`w-full bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"} text-white placeholder-gray-400 focus:border-[#5D5FEF] focus:ring-[#5D5FEF] transition-all duration-300 resize-y`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="message-error"
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <div className="hidden">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#5D5FEF] to-[#EFA6BE] hover:from-[#4B4CCB] hover:to-[#D68AA6] text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  onClick={(e) => createSparkle(e.clientX, e.clientY)}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center"
                  >
                    Message sent successfully! I'll respond soon.
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center"
                  >
                    Error sending message. Please try again later.
                  </motion.div>
                )}

                {submitStatus === "invalid" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center"
                  >
                    Please correct the form errors before submitting.
                  </motion.div>
                )}
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