'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiLayout, FiServer, FiCpu, FiTool, FiCloud } from 'react-icons/fi';
import Image from 'next/image';

// --- ১. Enhanced Particles Background ---
const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.6 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#22d3ee';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const init = () => {
      particles = [];
      const count =
        Math.floor((window.innerWidth * window.innerHeight) / 15000) + 80;
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };
    window.addEventListener('resize', () => {
      resize();
      init();
    });
    resize();
    init();
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);
  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

// --- ২. Category Card (Responsive) ---
const CategoryCard = ({ title, icon: Icon, tags, side = 'left' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative p-5 lg:p-6 rounded-2xl bg-[#0a101f]/60 border border-white/10 backdrop-blur-xl group overflow-hidden w-full"
  >
    <div className="relative z-10">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="text-cyan-400" size={20} />
        <h3 className="text-xs lg:text-sm font-black tracking-[0.2em] uppercase text-white">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 text-[9px] lg:text-[10px] font-bold tracking-widest uppercase rounded-lg bg-white/5 border border-white/10 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div
      className={`absolute top-0 ${side === 'left' ? 'right-0' : 'left-0'} w-10 h-10 border-t border-cyan-500/20 rounded-tr-2xl`}
    />
  </motion.div>
);

// --- ৩. Angled 3D Rotating Skill Engine (Responsive Radius) ---
const CenterEngine3D = () => {
  const [radius, setRadius] = useState(250);

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 140 : 250); // মোবাইলে রেডিয়াস কমানো হয়েছে
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills = [
    {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      angle: 0,
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7S33Oq2FeRbyBBA6l1q8PwLVa3SzaONO-9Q&s',
      angle: 72,
    },
    {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      angle: 144,
    },
    {
      img: 'https://www.clipartmax.com/png/middle/70-701332_hire-node-js-developer-node-logo.png',
      angle: 216,
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV9uzErWz9EXqZDxZ5lP9aYpMz8eK6rr5X3w&s',
      angle: 288,
    },
  ];

  return (
    <div className="relative h-[400px] md:h-[550px] flex items-center justify-center [perspective:1000px] overflow-visible">
      <motion.div
        animate={{ rotateY: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d', rotateX: -15 }}
        className="relative w-32 h-32 md:w-64 md:h-64 flex items-center justify-center"
      >
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 md:w-24 md:h-24 bg-[#0a101f]/90 border border-white/10 rounded-2xl flex items-center justify-center p-3 md:p-4 backdrop-blur-md shadow-2xl"
            style={{
              transform: `rotateY(${skill.angle}deg) translateZ(${radius}px)`,
            }}
          >
            <motion.div
              animate={{ rotateY: 360, rotateX: 15 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full"
            >
              <Image
                width={29}
                height={39}
                src={skill.img}
                alt="skill"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        ))}
        <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-cyan-500/10 blur-[80px] md:blur-[100px] rounded-full animate-pulse" />
      </motion.div>

      <div className="absolute bottom-0 md:bottom-10 text-center z-10">
        <p className="text-[8px] md:text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase mb-1">
          Core_Infrastructure
        </p>
        <h2 className="text-2xl md:text-6xl font-black italic tracking-tighter uppercase text-white">
          TECH STACK
        </h2>
      </div>
    </div>
  );
};

const SkillsPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#010714] text-white px-4 md:px-10 lg:px-20 py-10 md:py-20 overflow-x-hidden font-sans">
      <ParticlesBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 md:mb-24 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl lg:text-9xl font-black italic tracking-tighter uppercase leading-[1.1] lg:leading-[0.8]"
          >
            TECH_
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              ARSENAL
            </span>
          </motion.h1>
          <p className="mt-4 md:mt-8 max-w-2xl mx-auto lg:mx-0 text-slate-400 text-xs md:text-lg font-medium border-l-0 lg:border-l-4 border-cyan-500/50 lg:pl-6 leading-relaxed">
            Scalable architectures and high-performance technologies for the
            modern web ecosystem.
          </p>
        </header>

        {/* Main Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Engine - মোবাইলে এটি আগে দেখাবে */}
          <div className="w-full lg:col-span-6 lg:order-2 order-1">
            <CenterEngine3D />
          </div>

          {/* Left Categories */}
          <div className="w-full lg:col-span-3 lg:order-1 order-2 space-y-6 md:space-y-8">
            <CategoryCard
              title="Frontend"
              icon={FiLayout}
              tags={['React', 'Next.js', 'Tailwind', 'Framer Motion']}
              side="left"
            />
            <CategoryCard
              title="DevOps"
              icon={FiCloud}
              tags={['AWS', 'Docker', 'Vercel']}
              side="left"
            />
          </div>

          {/* Right Categories */}
          <div className="w-full lg:col-span-3 lg:order-3 order-3 space-y-6 md:space-y-8">
            <CategoryCard
              title="Backend"
              icon={FiServer}
              tags={['Node.js', 'Express', 'MongoDB', 'Mongoose']}
              side="right"
            />
            <CategoryCard
              title="Tools"
              icon={FiTool}
              tags={['Git', 'Figma', 'Postman']}
              side="right"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[10px] text-slate-700 font-bold uppercase tracking-[0.4em] mt-16 md:mt-24 pt-10 border-t border-white/5 gap-4">
          <span>© 2024 ARCH_SYSTEMS_V3</span>
          <div className="flex items-center space-x-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span>Environment: Active</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SkillsPage;
