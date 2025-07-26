"use client";

import React, { useRef, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import projectsData from "../data/projects.json";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface ProjectsData {
  projects: Project[];
}

// Letter-by-letter animation for the heading
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const Projects: React.FC = () => {
  useLanguage();
  const featuredProjects = (projectsData as ProjectsData).projects.filter(
    (project) => project.featured
  );
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, rotateX: 10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.7,
      },
    },
    hover: {
      scale: 1.03,
      rotateY: 5,
      rotateX: -5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.15,
      boxShadow: "0 0 20px rgba(58, 41, 255, 0.4)",
      brightness: 1.1, // إضافة تأثير إضاءة عند الـ hover
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.9 },
  };

  // Particle effect state
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newParticle = { id: Date.now(), x, y };
      setParticles((prev) => [...prev, newParticle].slice(-8));

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 800);
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden py-24  text-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#7B61FF] via-[#FF6AC2] to-[#38BDF8] bg-clip-text text-transparent mb-6 tracking-tight">
              {"Featured Projects".split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {char}
                </motion.span>
              ))}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore a curated selection of modern web apps showcasing
              performance, design & interactivity.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-[#7B61FF] to-[#FF6AC2] mx-auto mt-6 rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20"
          >
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover="hover"
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 shadow-lg hover:shadow-2xl"
              >
                <Card className="bg-transparent border-0 h-full flex flex-col">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={`Screenshot of ${project.title} project`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  <CardContent className="flex flex-col p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#7B61FF] to-[#38BDF8] bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-gradient-to-r from-[#FF6AC2] to-[#7B61FF] text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 mt-auto">
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="w-full min-w-[120px] flex items-center justify-center gap-2 px-6 py-2 text-base font-medium rounded-full bg-gradient-to-r from-[#7B61FF] to-[#38BDF8] text-white hover:brightness-110 shadow-md transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="w-full min-w-[120px] flex items-center justify-center gap-2 px-6 py-2 text-base font-medium rounded-full bg-gradient-to-r from-[#FF6AC2] to-[#FF3B80] text-white hover:brightness-110 shadow-md transition"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </motion.a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="relative" ref={buttonRef} onMouseMove={handleMouseMove}>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 bg-[#7B61FF] rounded-full"
                  style={{ left: particle.x, top: particle.y }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.8 }}
                />
              ))}
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="w-full max-w-md px-10 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-[#7B61FF]/20 to-[#38BDF8]/20 border border-white/10 text-white backdrop-blur-md hover:brightness-110 transition duration-300 shadow-md"
                >
                  View All Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div> 
    </section>
  );
};

export default Projects;