'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Particles from '@/components/Particales';
// Import the same Particles component used in HeroSection
// import Particles from './Particales';

const AboutPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#010714] text-white px-6 lg:px-20 py-16 overflow-hidden font-sans">
      {/* --- HIGH-PERFORMANCE PARTICLES (Same as Hero) --- */}
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
              Logic-Driven
            </span>{' '}
            Solutions
          </motion.h1>
          <div className="flex items-center space-x-2 mt-4">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase">
              Merging Math with Code
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group perspective-1000">
              {/* Glow effect behind image */}
              <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/30 to-blue-600/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />

              <div className="relative aspect-[4/5] bg-[#0a101f]/80 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden transform lg:rotate-[-2deg] group-hover:rotate-0 transition-all duration-700 shadow-2xl">
                <Image
                  src="/images/WhatsApp_Image_2026-06-04_at_10.08.23_AM-removebg-preview.png"
                  alt="Rifad Hossain Rabbi"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 brightness-90 group-hover:brightness-110"
                />

                <div className="absolute bottom-10 left-10 z-20">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white drop-shadow-lg">
                    Rifad Hossain
                  </h2>
                  <p className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase">
                    MERN Stack Developer
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#010714] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Information */}
          <div className="lg:col-span-7 space-y-12">
            {/* 1. Origin Story */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold italic uppercase tracking-widest text-white border-l-4 border-cyan-500 pl-4">
                Academic Journey
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                I am currently pursuing my graduation in{' '}
                <span className="text-white font-bold">
                  Mathematics at National University
                </span>
                . My academic background in Math has deeply influenced how I
                approach programming—viewing every project as a set of logical
                patterns waiting to be optimized. This foundation allows me to
                transition seamlessly into the world of{' '}
                <span className="text-white font-bold">
                  Full Stack Development
                </span>
                , where precision and problem-solving are paramount.
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
                Development Philosophy
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                For me, coding is more than just building websites; it’s about{' '}
                <span className="text-cyan-400 italic">
                  "Algorithmic Excellence"
                </span>
                . I specialize in the MERN stack, creating practical solutions
                like{' '}
                <span className="text-white">Product Borrowing Systems</span>{' '}
                and <span className="text-white">Pet Adoption Platforms</span>.
                I focus on clean code and efficient data structures, ensuring
                that my applications are as robust as a mathematical proof.
              </p>
            </motion.section>

            {/* 3. Future Outlook */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold italic uppercase tracking-widest text-white border-l-4 border-cyan-500 pl-4">
                Current Focus
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                While completing my graduation, I am actively honing my skills
                in <span className="text-white">Next.js</span>,{' '}
                <span className="text-white">Framer Motion</span>, and{' '}
                <span className="text-white">Scalable System Architecture</span>
                . My goal is to bridge the gap between complex mathematical
                logic and modern web technology to deliver high-performance,
                user-centric digital experiences.
              </p>
            </motion.section>

            {/* Progress Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-6"
            >
              <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                View My Progress
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer Credit Layer */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="rotate-90 text-[100px] font-black text-white/[0.02] select-none tracking-tighter uppercase">
            Rifad_Dev_2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
