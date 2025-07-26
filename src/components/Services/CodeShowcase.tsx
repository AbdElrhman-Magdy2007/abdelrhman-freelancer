"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const frontendCode = `// Frontend - React Component
import React from 'react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold">Hi, I'm Abdo 👋</h1>
      <p className="mt-4 text-lg text-gray-300">Full-Stack Web Developer</p>
      <Button className="mt-6">View Projects</Button>
    </section>
  );
}
`;

const backendCode = `// Backend - Express.js API
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/books', (req, res) => {
  res.json([{ title: 'Inkspire', author: 'Abdo' }]);
});

app.listen(3000, () => console.log('Server running on port 3000'));
`;

export default function CodeShowcase() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-black px-4 py-16 flex flex-col items-center">
      <motion.h2
        className="text-indigo-400 text-4xl md:text-5xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Full-Stack Code Showcase
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Frontend Code */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gray-800 text-white text-sm px-4 py-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span>frontend.tsx</span>
          </div>
          <pre className="p-4 overflow-auto text-green-200 whitespace-pre-wrap text-xs leading-relaxed">
            <code>{frontendCode}</code>
          </pre>
        </motion.div>

        {/* Backend Code */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gray-800 text-white text-sm px-4 py-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-yellow-400" />
            <span>backend.ts</span>
          </div>
          <pre className="p-4 overflow-auto text-yellow-100 whitespace-pre-wrap text-xs leading-relaxed">
            <code>{backendCode}</code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
