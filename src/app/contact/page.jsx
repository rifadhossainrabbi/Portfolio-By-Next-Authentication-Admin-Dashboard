'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiArrowRight, FiTerminal } from 'react-icons/fi';

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
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.6;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
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
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

const ContactPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#010714] text-white px-6 lg:px-20 py-20 overflow-hidden font-sans">
      <ParticlesBackground />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Side: Text & Info */}
        <div className="w-full lg:w-1/2">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8"
          >
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="text-[10px] tracking-[0.2em] font-bold text-cyan-400 uppercase">
              AVAILABLE FOR HIRE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic"
          >
            Let's Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Legendary
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-md text-slate-400 text-sm md:text-base leading-relaxed font-medium"
          >
            Looking for a technical partner to architect your next deep-tech
            solution? Drop a message and let's discuss your engineering
            challenges.
          </motion.p>

          {/* Contact Details */}
          <div className="mt-12 space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                <FiMail size={20} />
              </div>
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">
                  SECURE_COMM_CHANNEL
                </p>
                <p className="text-sm font-bold text-slate-200">
                  hossainmrrifad@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                <FiMapPin size={20} />
              </div>
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">
                  NODE_LOCATION
                </p>
                <p className="text-sm font-bold text-slate-200">
                  Natore, Bangladesh / Remote
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Technical Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full lg:w-[500px] p-8 md:p-10 rounded-[32px] bg-[#0a101f]/60 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Form Background Grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />

          <form className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                  IDENTIFIER
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-slate-200"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                  RETURN_PATH
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                PROTOCOL_SUBJECT
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-slate-400 appearance-none">
                <option>Full Stack Development</option>
                <option>System Architecture</option>
                <option>UI/UX Engineering</option>
                <option>Consultation</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                PAYLOAD_CONTENT
              </label>
              <textarea
                rows="4"
                placeholder="Briefly describe the mission parameters..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-slate-200 resize-none"
              ></textarea>
            </div>

            <button className="w-full group relative py-4 bg-blue-600 hover:bg-blue-500 rounded-xl overflow-hidden transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              <div className="flex items-center justify-center space-x-3 text-xs font-black tracking-[0.2em] uppercase text-white">
                <span>EXECUTE_TRANSMISSION</span>
                <FiArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>

            <div className="pt-4 text-center">
              <p className="text-[8px] text-slate-600 font-bold uppercase tracking-[0.3em]">
                ESTABLISHED END-TO-END ENCRYPTED SESSION V2.4.0
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer System Bar */}
      <footer className="absolute bottom-10 left-6 lg:left-20 right-6 lg:right-20 flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-700 font-bold uppercase tracking-[0.4em]">
        <div className="mb-4 md:mb-0">© 2024 NEXUS_CORE_TERMINAL</div>
        <div className="flex space-x-10">
          <span>LAT: 23.8103° N</span>
          <span>LNG: 90.4125° E</span>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
