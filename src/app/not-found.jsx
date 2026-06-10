'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NotFound() {
  const canvasRef = useRef(null);

  // --- Particle Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resize = () => {
      if (typeof window !== 'undefined') {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
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
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(34, 211, 238, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      particles = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 9000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] font-sans p-6 text-white">
      {/* পার্টিকেল ক্যানভাস */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* বাম দিকের ইলাস্ট্রেশন (404 + Astronaut) */}
        <div className="relative flex-1 flex items-center justify-center min-h-[350px]">
          {/* বড় 404 টেক্সট */}
          <h1 className="text-[140px] md:text-[280px] font-black leading-none text-blue-500/10 select-none absolute z-0 tracking-tighter">
            404
          </h1>

          {/* ভাসমান অ্যাস্ট্রোনাট */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-20 w-64 md:w-[450px]" // সাইজ বাড়ানো হয়েছে
          >
            <Image
              width={600} // এখানে সাইজ বাড়িয়ে দেওয়া হয়েছে যাতে ক্লিয়ার আসে
              height={600}
              priority // ইমেজটি দ্রুত লোড হওয়ার জন্য
              src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon.png"
              alt="Astronaut"
              className="w-full h-auto drop-shadow-[0_20px_60px_rgba(34,211,238,0.4)]"
            />
          </motion.div>

          {/* ভাসমান গ্রহ ১ */}
          <motion.div
            animate={{ x: [-10, 10, -10], y: [10, -10, 10] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-tr from-slate-700 to-slate-400 rounded-full blur-[1px] opacity-60 shadow-inner"
          />

          {/* ভাসমান গ্রহ ২ */}
          <motion.div
            animate={{ x: [10, -10, 10], y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-10 right-20 w-24 h-24 bg-gradient-to-br from-indigo-900 to-blue-500 rounded-full blur-[1px] opacity-40 shadow-xl"
          />
        </div>

        {/* ডান দিকের টেক্সট কন্টেন্ট */}
        <div className="flex-1 text-center lg:text-left z-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Oops! <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Page not found.
              </span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
              The page you are looking for doesn't exist or has been moved.
              Don't worry, even the best astronauts get lost sometimes.
            </p>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-12 py-4 text-sm font-black text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ডেকোরেটিভ গ্লো ইফেক্টস */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
}
