'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiLayout,
  FiServer,
  FiTool,
  FiCloud,
  FiActivity,
} from 'react-icons/fi';
import Image from 'next/image';
import Particles from '@/components/Particales';
// Import the high-performance particles
// import Particles from './Particales';

// --- Category Card ---
const CategoryCard = ({
  title,
  icon: Icon,
  tags,
  side = 'left',
  isLearning = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`relative p-5 lg:p-6 rounded-2xl bg-[#0a101f]/60 border backdrop-blur-xl group overflow-hidden w-full
      ${isLearning ? 'border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.05)]' : 'border-white/10 hover:border-cyan-500/40'}`}
  >
    {isLearning && (
      <motion.div
        animate={{ left: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent z-20"
      />
    )}
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon
            className={isLearning ? 'text-amber-400' : 'text-cyan-400'}
            size={20}
          />
          <motion.h3
            animate={
              isLearning
                ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                : {}
            }
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className={`text-xs lg:text-sm font-black tracking-[0.2em] uppercase 
              ${isLearning ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-amber-400 to-blue-500 bg-[length:200%_auto]' : 'text-white'}`}
          >
            {title}
          </motion.h3>
        </div>
        {isLearning && (
          <FiActivity className="text-amber-500/60 animate-pulse" size={14} />
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`px-2.5 py-1 text-[9px] lg:text-[10px] font-bold tracking-widest uppercase rounded-lg border transition-all 
            ${isLearning ? 'bg-amber-500/5 border-amber-500/20 text-amber-200/80' : 'bg-white/5 border-white/10 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30'}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div
      className={`absolute top-0 ${side === 'left' ? 'right-0' : 'left-0'} w-8 h-8 border-t-2 ${isLearning ? 'border-amber-400/30' : 'border-cyan-500/20'} rounded-tr-xl`}
    />
  </motion.div>
);

// --- Realistic Blue & Amber 3D Engine ---
const CenterEngine3D = () => {
  const [radius, setRadius] = useState(250);
  useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 768 ? 140 : 250);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills = [
    {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      angle: 0,
      color: 'blue',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7S33Oq2FeRbyBBA6l1q8PwLVa3SzaONO-9Q&s',
      angle: 72,
      color: 'amber',
    },
    {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      angle: 144,
      color: 'blue',
    },
    {
      img: 'https://www.clipartmax.com/png/middle/70-701332_hire-node-js-developer-node-logo.png',
      angle: 216,
      color: 'amber',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV9uzErWz9EXqZDxZ5lP9aYpMz8eK6rr5X3w&s',
      angle: 288,
      color: 'blue',
    },
  ];

  return (
    <div className="relative h-[450px] md:h-[600px] flex items-center justify-center [perspective:1200px]">
      <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-blue-500/5 rotate-X-75" />
      <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-amber-500/5 rotate-X-75 animate-reverse-spin" />

      <motion.div
        animate={{ rotateY: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d', rotateX: -10 }}
        className="relative w-32 h-32 md:w-64 md:h-64 flex items-center justify-center"
      >
        {skills.map((skill, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              transform: `rotateY(${skill.angle}deg) translateZ(${radius}px)`,
            }}
          >
            <motion.div
              animate={{
                rotateY: 360,
                y: [0, -20, 0],
              }}
              transition={{
                rotateY: { duration: 30, repeat: Infinity, ease: 'linear' },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                },
              }}
              className={`relative w-16 h-16 md:w-28 md:h-28 rounded-2xl p-4 backdrop-blur-xl border-2 flex items-center justify-center transition-all duration-500
                ${
                  skill.color === 'blue'
                    ? 'bg-blue-500/10 border-blue-400/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                    : 'bg-amber-500/10 border-amber-400/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                }`}
            >
              <div
                className={`absolute inset-0 rounded-2xl opacity-20 ${skill.color === 'blue' ? 'bg-blue-400' : 'bg-amber-400'} blur-md`}
              />
              <Image
                width={80}
                height={80}
                src={skill.img}
                alt="skill"
                className="w-full h-full object-contain relative z-10"
              />
            </motion.div>
          </div>
        ))}

        <div className="absolute w-32 h-32 bg-blue-500/10 blur-[80px] rounded-full" />
        <div className="absolute w-24 h-24 bg-amber-500/5 blur-[60px] rounded-full" />
      </motion.div>

      <div className="absolute bottom-5 text-center">
        <p className="text-[10px] font-black tracking-[0.5em] text-blue-400 uppercase opacity-60">
          Active_Infrastructure
        </p>
        <h2 className="text-3xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
          MERN <span className="text-amber-500">STACK</span>
        </h2>
      </div>
    </div>
  );
};

const SkillsPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#010714] text-white px-6 lg:px-20 py-20 overflow-x-hidden font-sans">
      {/* --- NEW HIGH-PERFORMANCE PARTICLES (Matches Hero) --- */}
      <Particles
        particleColors={['#0ea5e9', '#22d3ee', '#3b82f6', '#1d4ed8']}
        particleCount={3500}
        particleSpread={18}
        speed={0.5}
        particleBaseSize={200}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={true}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-12">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase"
          >
            TECH_
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-600">
              SYSTEMS
            </span>
          </motion.h1>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 items-center">
          <div className="w-full lg:col-span-6 lg:order-2">
            <CenterEngine3D />
          </div>

          <div className="w-full lg:col-span-3 lg:order-1 space-y-8">
            <CategoryCard
              title="Frontend"
              icon={FiLayout}
              tags={['React', 'Next.js', 'Tailwind', 'Framer']}
              side="left"
            />
            <CategoryCard
              title="LEARNING"
              icon={FiCloud}
              isLearning={true}
              tags={['TypeScript', 'Redis', 'Docker', 'Testing', 'PostgreSQL']}
              side="left"
            />
          </div>

          <div className="w-full lg:col-span-3 lg:order-3 space-y-8">
            <CategoryCard
              title="Backend"
              icon={FiServer}
              tags={['Node.js', 'Express', 'MongoDB', 'SQL']}
              side="right"
            />
            <CategoryCard
              title="Tools"
              icon={FiTool}
              tags={['Git', 'Figma', 'Postman', 'Vercel']}
              side="right"
            />
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex justify-between text-[10px] font-bold text-slate-600 tracking-[0.3em] uppercase relative z-10">
          <span>Systems v3.0 // 2024</span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />{' '}
            Status: Online
          </span>
        </footer>
      </div>
    </div>
  );
};

export default SkillsPage;
