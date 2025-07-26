import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import Image from "next/image";

// Components
// import Hero from "@/components/Hero/Hero";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import Skills from "../components/Skills/Skills";
import Projects from "../components/Projects";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../components/LanguageProvider";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  // Animate scroll progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Cursor trail state
  const [cursorTrail, setCursorTrail] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  useEffect(() => {
    document.title = "Abdelrahman Magdy | Web Developer & Designer";

    const timer = setTimeout(() => setIsLoading(false), 1500);

    const handleMouseMove = (e: MouseEvent) => {
      const hero = document.getElementById("home");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const newDot = {
            x: e.clientX,
            y: e.clientY,
            id: Date.now() + Math.random(),
          };

          setCursorTrail((prev) => [...prev, newDot]);

          setTimeout(() => {
            setCursorTrail((prev) => prev.filter((dot) => dot.id !== newDot.id));
          }, 1000);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Toaster />
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              key="loader"
              className="fixed inset-0 z-50 bg-background flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div className="relative w-20 h-20">
                  <motion.div
                    className="w-20 h-20 border-4 border-primary rounded-full"
                    animate={{
                      rotate: 360,
                      borderColor: [
                        "hsl(var(--primary))",
                        "hsl(var(--accent))",
                        "hsl(var(--primary))",
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Image
                      src="/images/AbdELrhman.png"
                      alt="Logo Icon"
                      width={75}
                      height={75}
                      className="object-contain"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="min-h-screen bg-background text-foreground font-inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Scroll Progress Bar */}
              <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50"
                style={{ scaleX }}
              />

              {/* Cursor Trail Effect */}
              {cursorTrail.map((dot) => (
                <motion.div
                  key={dot.id}
                  className="cursor-trail"
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ left: dot.x, top: dot.y }}
                />
              ))}

              {/* Main Sections */}
              <main>
                <Hero />
                <About />
                <Skills />
                <Services />
                <Projects />
                <ContactForm />
              </main>

              {/* Footer */}
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
