'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- ১. Particles Background (পুরো পেজ জুড়ে থাকবে) ---
const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
        this.size = Math.random() * 1.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) particles.push(new Particle());
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resize);
    resize();
    init();
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
};

const AboutPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#010714] text-white px-6 lg:px-20 py-16 overflow-hidden font-sans">
      <ParticlesBackground />

      <div className="relative z-10 max-w-7xl mx-auto mt-10">
        {/* Header Section */}
        <header className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight"
          >
            Engineering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Human-Centric
            </span>{' '}
            Systems
          </motion.h1>
          <div className="flex items-center space-x-2 mt-4">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase">
              The Path To Innovation
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Portrait Image with Tilt effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group perspective-1000">
              {/* Image Glow Border */}
              <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/30 to-blue-600/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />

              {/* Main Image Wrapper */}
              <div className="relative aspect-[4/5] bg-[#0a101f] rounded-3xl border border-white/10 overflow-hidden transform lg:rotate-[-2deg] group-hover:rotate-0 transition-all duration-700 shadow-2xl">
                <Image
                  src="/images/WhatsApp_Image_2026-06-04_at_10.08.23_AM-removebg-preview.png"
                  alt="Rifad Hossain Rabbi"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 brightness-90 group-hover:brightness-110"
                />

                {/* Image Overlay Text */}
                <div className="absolute bottom-10 left-10 z-20">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white drop-shadow-lg">
                    Rifad Hossain
                  </h2>
                  <p className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase">
                    Full Stack Web Developer
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#010714] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Detailed Info (From Resume) */}
          <div className="lg:col-span-7 space-y-12">
            {/* 1. Origin Story */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold italic uppercase tracking-widest text-white border-l-4 border-cyan-500 pl-4">
                Origin Story
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                My journey into the world of systems engineering is rooted in
                logic and patterns. Transitioning from a background in{' '}
                <span className="text-white font-bold">
                  Mathematics at National University
                </span>{' '}
                to a high-precision career in{' '}
                <span className="text-white font-bold">
                  Frontend Development
                </span>
                , I quickly realized that the bridge between complex
                architecture and seamless user experiences was often neglected.
                My mission became clear: build robust, scalable systems that
                feel as intuitive as a physical tool.
              </p>
            </motion.section>

            {/* 2. Technical Philosophy */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold italic uppercase tracking-widest text-white border-l-4 border-cyan-500 pl-4">
                Technical Philosophy
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                I believe in{' '}
                <span className="text-cyan-400 italic">
                  "Precision Innovation"
                </span>
                . Coming from a Mathematical foundation, I see every line of
                code as a functional purpose contributing to a larger, elegant
                ecosystem. I specialize in building real-world projects like{' '}
                <span className="text-white">Borrowing Systems</span> and{' '}
                <span className="text-white">Adoption Platforms</span>, focusing
                on clean code architecture and optimized data schemes where
                design and performance coexist perfectly.
              </p>
            </motion.section>

            {/* 3. Present & Future */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold italic uppercase tracking-widest text-white border-l-4 border-cyan-500 pl-4">
                Present & Future
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                Currently, I am focused on the intersection of{' '}
                <span className="text-white">Next.js</span>,{' '}
                <span className="text-white">Framer Motion</span>, and{' '}
                <span className="text-white">Deep-Tech architectures</span>. By
                leveraging glassmorphism and high-contrast visual languages, I
                aim to demystify technical complexity for global enterprises and
                build applications that are not only responsive but also
                user-focused.
              </p>
            </motion.section>

            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-6"
            >
              <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                Download Resume
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer Credit Layer */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="rotate-90 text-[100px] font-black text-white/[0.02] select-none tracking-tighter uppercase">
            Portfolio_2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
