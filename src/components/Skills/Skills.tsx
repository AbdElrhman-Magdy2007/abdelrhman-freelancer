import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Skill from "./Skill";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        "React.js", "Next.js", "TypeScript", "JavaScript", 
        "Tailwind CSS", "Framer Motion", "Redux Toolkit", 
        "Zustand", "HTML5", "CSS3", "Bootstrap", "Angular"
      ]
    },
    {
      title: "Backend & Databases",
      skills: [
        "Node.js", "Express.js", "Prisma", 
        "PostgreSQL", "MySQL", "MongoDB", "Supabase",
        "RESTful APIs", "NextAuth.js", "Stripe", "PayPal"
      ]
    },
    {
      title: "Dev Tools & Deployment",
      skills: [
        "Git", "GitHub", "Vercel", "Netlify", 
        "Docker", "VS Code", "Cursor"
      ]
    },
    {
      title: "Design & Optimization",
      skills: [
        "Figma", "Responsive Design", "UI/UX", 
        "Accessibility", "SEO", "Performance Optimization"
      ]
    }
  ];





  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="py-24 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Skills & Tools
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A comprehensive toolkit of modern technologies to build exceptional web experiences.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-6 rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 220, damping: 15 }
                }}
              >
                <Card className="glass-card backdrop-blur-md border border-white/10 bg-white/5 shadow-xl transition-all h-full">
                  <div className="p-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-t-xl" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.skills.map((skill, idx) => (
                        <li key={idx} className="flex items-center text-gray-300 hover:text-white transition">
                          <span className="w-2 h-2 rounded-full bg-pink-400 mr-3" />
                          <span className="text-sm">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="mt-28">
          {/* <Skill /> */}
        </div>
      </div>
    </section>
  );
};

export default Skills;
