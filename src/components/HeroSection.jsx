'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiFileText,
  FiMail,
} from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiExpress, SiMongodb } from 'react-icons/si';
import Image from 'next/image';

// --- Particles Background Component (আপনার অরিজিনাল নাম ও কোড) ---
const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count =
        Math.floor((window.innerWidth * window.innerHeight) / 10000) + 100;
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      resize();
      init();
    });
    resize();
    init();
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col bg-[#010714] text-white overflow-hidden font-sans selection:bg-cyan-500/30">
      {/* ১. পার্টিকেল ব্যাকগ্রাউন্ড */}
      <ParticlesBackground />

      {/* ২. সাইডবার (Sidebar copy from image) */}
      <aside className="fixed left-0 top-0 h-full w-20 border-r border-white/5 flex flex-col items-center py-8 z-50 bg-[#010714]/80 backdrop-blur-2xl">
        <div className="w-10 h-10 rounded-full border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold mb-12 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          RH
        </div>
        <nav className="flex flex-col gap-10 text-slate-500">
          {[
            { num: '01', icon: <FiHome />, label: 'HOME', active: true },
            { num: '02', icon: <FiUser />, label: 'ABOUT' },
            { num: '03', icon: <FiCode />, label: 'SKILLS' },
            { num: '04', icon: <FiBriefcase />, label: 'PROJECTS' },
            { num: '05', icon: <FiFileText />, label: 'RESUME' },
            { num: '06', icon: <FiMail />, label: 'CONTACT' },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${item.active ? 'text-cyan-400' : 'hover:text-white'}`}
            >
              <span className="text-[9px] font-bold opacity-40 uppercase">
                {item.num}
              </span>
              <span className="text-xl">{item.icon}</span>
              <span className="text-[7px] font-black tracking-widest opacity-0 hover:opacity-100 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-6 text-slate-600 pb-4">
          <FiGithub className="hover:text-white transition-colors cursor-pointer" />
          <FiLinkedin className="hover:text-white transition-colors cursor-pointer" />
          <FiFacebook className="hover:text-white transition-colors cursor-pointer" />
        </div>
      </aside>

      {/* মেইন কন্টেন্ট */}
      <div className="flex-1 ml-20 flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 py-12 lg:py-0 z-10">
        {/* টেক্সট সাইড (বাম পাশ) */}
        <div className="w-full lg:w-[55%] text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
            <span className="text-[10px] tracking-[0.25em] font-bold text-cyan-400 uppercase">
              ROLE: MERN_STACK_DEVELOPER_V3.0
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black leading-[0.9] tracking-tighter uppercase italic">
              <span className="block text-white mb-2">HI I'M RIFAD</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                HOSSAIN RABBI
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-lg text-slate-400 text-sm md:text-base leading-relaxed border-l-2 border-cyan-500/30 pl-6 italic font-medium"
          >
            Full Stack MERN Developer & System Architect specializing in
            high-performance digital experiences that drive real results.
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-5">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)] text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
              EXPLORE MY WORK <FiArrowRight />
            </button>
            <button className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest text-slate-300">
              VIEW RESUME
            </button>
          </div>
        </div>

        {/* ৩. ইমেজ পার্ট (ইমেজের হুবহু ডিজাইন) */}
        <div className="relative w-full lg:w-[45%] h-[500px] lg:h-[650px] flex items-center justify-center group">
          {/* উজ্জ্বল ব্লু হ্যালো রিং */}
          <div className="absolute w-[440px] h-[440px] rounded-full border-4 border-cyan-500/40 shadow-[0_0_100px_#22d3ee44] flex items-center justify-center">
            <div className="w-[360px] h-[360px] rounded-full border border-cyan-400/20 animate-[pulse_4s_infinite]" />
          </div>

          {/* ফ্লোটিং স্কিল আইকন বক্সসমূহ */}
          {/* React */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-10 left-20 z-30"
          >
            <div className="p-4 bg-[#0a101f]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
              <SiReact className="text-[#61DAFB] text-3xl" />
            </div>
          </motion.div>

          {/* Node */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute top-1/2 -translate-y-1/2 left-0 z-30"
          >
            <div className="p-4 bg-[#0a101f]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center">
              <SiNodedotjs className="text-[#339933] text-3xl" />
              <span className="text-[8px] font-black uppercase text-slate-400 mt-1">
                Node
              </span>
            </div>
          </motion.div>

          {/* Code Icon */}
          <div className="absolute top-10 right-20 z-30 text-blue-500 text-3xl opacity-50">
            {'</>'}
          </div>

          {/* Express */}
          <div className="absolute top-[40%] right-0 z-30 px-6 py-4 bg-[#0a101f]/60 backdrop-blur-xl border border-white/10 rounded-2xl text-lg font-light text-slate-400 shadow-2xl">
            express
          </div>

          {/* MongoDB */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5 }}
            className="absolute bottom-20 right-0 z-30 p-4 bg-[#0a101f]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
          >
            <SiMongodb className="text-[#47A248] text-4xl" />
          </motion.div>

          {/* মেইন ইমেজ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-[380px] h-[520px] overflow-hidden z-20"
          >
            <Image
              src="/images/WhatsApp_Image_2026-06-04_at_10.08.23_AM-removebg-preview.png"
              alt="Rifad"
              className="relative z-10 object-contain object-top grayscale-[15%] hover:grayscale-0 transition-all duration-1000 brightness-110"
              fill
              priority
            />
            {/* নিচের গ্রেডিয়েন্ট শ্যাডো */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#010714] via-[#010714]/40 to-transparent z-10" />
          </motion.div>

          {/* ফুল স্ট্যাক ডেভেলপার গ্লাস কার্ড */}
          <div className="absolute bottom-20 left-10 z-40 bg-[#0a101f]/40 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl max-w-[220px] shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[11px] font-black uppercase text-slate-200 tracking-wider">
                Full Stack Developer
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              Building the future with code and creativity.
            </p>
            <div className="absolute bottom-2 right-2 w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] border-b-cyan-500/50" />
          </div>

          {/* প্ল্যাটফর্ম গ্লো */}
          <div className="absolute bottom-4 z-10 w-[280px] h-1 bg-cyan-400/40 blur-md rounded-full shadow-[0_0_20px_#22d3ee]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
