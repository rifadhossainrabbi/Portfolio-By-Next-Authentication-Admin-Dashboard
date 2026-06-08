'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaFacebookF,
} from 'react-icons/fa';
import {
  LuUser,
  LuBriefcase,
  LuGraduationCap,
  LuBook,
  LuHeart,
  LuCode,
  LuLayers,
} from 'react-icons/lu';
import Image from 'next/image';

// --- ১. High-Visibility Particles Background ---
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
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.opacity = Math.random() * 0.8 + 0.2;
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
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#22d3ee';
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
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

const ResumePage = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const skills = [
    { name: 'React / Next.js', level: '90%' },
    { name: 'Tailwind CSS', level: '95%' },
    { name: 'Node.js / Express', level: '75%' },
    { name: 'MongoDB', level: '80%' },
  ];

  return (
    <div className="relative min-h-screen bg-[#010714] text-slate-300 p-6 lg:p-20 overflow-x-hidden font-sans selection:bg-cyan-500/30">
      <ParticlesBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        {/* --- LEFT SIDEBAR: IDENTITY & CONTACT --- */}
        <aside className="lg:col-span-4 space-y-10">
          <motion.div
            variants={itemVariants}
            className="text-center lg:text-left"
          >
            <div className="relative w-44 h-44 mx-auto lg:mx-0 mb-8 p-1 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_40px_rgba(34,211,238,0.3)] rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full rounded-3xl bg-[#0a101f] overflow-hidden">
                <Image
                  width={180}
                  height={180}
                  src="/images/WhatsApp_Image_2026-06-04_at_10.08.23_AM-removebg-preview.png"
                  alt="Rifad"
                  className="w-full h-full object-cover object-top scale-110"
                />
              </div>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              Rifad <br />{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Hossain Rabbi
              </span>
            </h1>
            <p className="mt-4 text-cyan-400 font-black tracking-[0.4em] text-[10px] uppercase border-l-2 border-cyan-500 pl-4">
              System_Architect.v3
            </p>
          </motion.div>

          {/* Contact Logs */}
          <motion.section
            variants={itemVariants}
            className="bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl group hover:border-cyan-500/50 transition-all duration-500"
          >
            <h3 className="text-white flex items-center gap-3 font-black mb-6 uppercase tracking-widest text-[11px]">
              <LuUser className="text-cyan-400" /> [ Contact_Logs ]
            </h3>
            <ul className="space-y-5 text-sm">
              {[
                { icon: FaEnvelope, text: 'hossainmrifad@gmail.com' },
                {
                  icon: FaGithub,
                  text: 'https://github.com/rifadhossainrabbi',
                },
                {
                  icon: FaFacebookF,
                  text: 'https://www.facebook.com/rifad.hossain.7796',
                },
                {
                  icon: FaLinkedinIn,
                  text: 'https://www.linkedin.com/in/rifad-hossain-rabbi-6b51443b6',
                },
                { icon: FaMapMarkerAlt, text: 'Dhaka, Bangladesh' },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 group/item cursor-pointer"
                >
                  <item.icon className="text-cyan-500 group-hover/item:scale-125 transition-transform" />
                  <span className="group-hover/item:text-cyan-400 transition-colors">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Skills Gauges */}
          <motion.section
            variants={itemVariants}
            className="bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl"
          >
            <h3 className="text-white flex items-center gap-3 font-black mb-6 uppercase tracking-widest text-[11px]">
              <LuLayers className="text-cyan-400" /> [ Skill_Metrics ]
            </h3>
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-2 tracking-tighter">
                    <span>{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_#22d3ee]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </aside>

        {/* --- RIGHT COLUMN: MAIN CONTENT --- */}
        <main className="lg:col-span-8 space-y-12">
          {/* Professional Summary */}
          <motion.section variants={itemVariants} className="relative group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <LuCode size={24} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                Core_Protocol
              </h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed border-l-4 border-cyan-500/30 pl-8 font-medium">
              Motivated <span className="text-white">Frontend Developer</span>{' '}
              with growing full-stack skills, specializing in React and Next.js.
              I architect clean, scalable, and user-centric digital experiences
              with 100% responsiveness and high performance.
            </p>
          </motion.section>

          {/* Deployments (Projects) */}
          <motion.section variants={itemVariants} className="space-y-8">
            <h3 className="text-white flex items-center gap-3 font-black uppercase tracking-[0.3em] text-xs">
              <LuBriefcase className="text-cyan-400" /> Active_Deployments
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: 'Book Borrowing System',
                  stack: 'Next.js + MongoDB + Node',
                  desc: 'Developed a robust system for managing inventory and user borrowing limits.',
                  icon: LuBook,
                  link: 'https://book-borrowing-platform-next-js-por.vercel.app/',
                },
                {
                  title: 'Pet Adoption Platform',
                  stack: 'React + Firebase + Tailwind',
                  desc: 'A high-performance marketplace for pet adoption with real-time tracking.',
                  icon: LuHeart,
                  link: 'https://pet-adoption-next-project.vercel.app/',
                },
              ].map((proj, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex gap-8 items-center group/card hover:bg-cyan-500/[0.03] hover:border-cyan-500/30 transition-all duration-500"
                >
                  <div className="hidden md:flex p-5 rounded-2xl bg-cyan-900/20 text-cyan-400 border border-cyan-500/10 shadow-lg">
                    <proj.icon size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-bold text-white mb-1">
                        {proj.title}
                      </h4>
                      <a
                        href={proj.link}
                        target="_blank"
                        className="text-cyan-500 hover:scale-110 transition-transform"
                      >
                        <FaExternalLinkAlt size={16} />
                      </a>
                    </div>
                    <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4 italic">
                      Tech: {proj.stack}
                    </p>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Academic Log */}
          <motion.section
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <LuGraduationCap size={80} />
              </div>
              <h3 className="text-white font-black mb-6 uppercase tracking-widest text-[11px]">
                Academic_Database
              </h3>
              <h4 className="text-lg font-bold text-white leading-tight">
                B.Sc. in Mathematics
              </h4>
              <p className="text-cyan-500 font-bold text-[10px] mt-2 mb-4 uppercase">
                2024 - Present
              </p>
              <p className="text-xs text-slate-500 font-semibold tracking-wide">
                National University, Bangladesh
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-8 rounded-[2rem] border border-cyan-500/20 flex flex-col justify-center items-center text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping mb-4" />
              <p className="text-sm font-black text-white uppercase tracking-widest">
                Status: Ready_to_Deploy
              </p>
              <p className="text-[10px] text-slate-500 mt-2">
                Available for Full-time & Contract roles
              </p>
            </div>
          </motion.section>
        </main>
      </motion.div>
    </div>
  );
};

export default ResumePage;
