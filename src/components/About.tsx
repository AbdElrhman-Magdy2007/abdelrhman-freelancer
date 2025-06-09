
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const About = () => {
  // const stats = [
  //   { label: 'Years of Expertise', value: '5+' },
  //   { label: 'Successful Projects', value: '25+' },
  //   { label: 'Delighted Clients', value: '12+' }
  // ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <div className="h-1 w-24 bg-secondary mx-auto"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8 mb-12">
            <p className="text-lg leading-relaxed mb-6">
            Looking for a web developer who can build fast, reliable, and high-performing websites?
I'm Abdurrahman — a web developer with 2+ years of experience, having worked with over 15 satisfied clients on successful projects.
I specialize in React.js, Next.js, TypeScript, Tailwind CSS, Stripe, and PayPal integrations.
Whether you need an e-commerce platform, admin dashboard, or a sleek service website — I’ve got you covered.
I focus on user experience, clean design, fast loading, and delivering practical, scalable solutions.
Let’s turn your idea into a powerful digital product that drives results and impresses your users.


            </p>
            {/* <p className="text-lg leading-relaxed">
              Having worked with startups and global brands, I deliver projects that combine stunning design with robust performance. My mission? To create digital experiences that inspire and drive results. Let's build something extraordinary together!
            </p> */}
          </motion.div>

          {/* <motion.div 
            variants={containerVariants} 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
