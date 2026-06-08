'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onFinished }) => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('REQUESTING_ACCESS...');

  useEffect(() => {
    let start = 0;
    const duration = 2000; // ২ সেকেন্ড সময় নিবে

    const updateCount = () => {
      const increment = Math.floor(Math.random() * 6) + 2;
      start += increment;

      if (start >= 100) {
        setCount(100);
        setStatus('WELCOME_TO_RABBI_V3.0');
        setTimeout(() => {
          if (onFinished) onFinished();
        }, 500);
      } else {
        setCount(start);

        // আপনার ব্র্যান্ডিং অনুযায়ী লেখা পরিবর্তন
        if (start < 20) setStatus('LOCATING_RIFAD_HOSSAIN_DOMAIN...');
        else if (start < 45) setStatus('SYNCING_MERN_STACK_RESOURCES...');
        else if (start < 70) setStatus('AUTHORIZING_SYSTEM_ARCHITECT_LOGS...');
        else if (start < 90) setStatus('PREPARING_DIGITAL_EXPERIENCE...');

        setTimeout(updateCount, 60);
      }
    };

    updateCount();
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#010714] overflow-hidden"
    >
      {/* ব্যাকগ্রাউন্ড নিওন গ্লো */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />

      <div className="relative flex flex-col items-center max-w-xl text-center px-6">
        {/* ব্র্যান্ড লোগো ইন্ডিকেটর */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 w-12 h-12 border border-cyan-500/30 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          <span className="text-cyan-400 font-black tracking-tighter italic">
            RH
          </span>
        </motion.div>

        {/* মেইন টাইটেল */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-xs md:text-sm font-black uppercase tracking-[0.5em] text-slate-500 mb-2">
            Entering Digital Ecosystem
          </h1>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-white">
            RIFAD HOSSAIN <span className="text-cyan-500">RABBI</span>
          </h2>
        </motion.div>

        {/* কাউন্টার এলিমেন্ট */}
        <div className="relative mb-12 flex items-center justify-center h-20">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-8xl font-black italic text-white leading-none tracking-tighter"
            >
              {count}
              <span className="text-cyan-500 text-2xl font-bold ml-1">%</span>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ডাইনামিক স্ট্যাটাস টেক্সট (ইন্টেলিজেন্ট মেসেজিং) */}
        <div className="h-4 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[9px] md:text-[10px] font-mono font-black uppercase tracking-[0.6em] text-cyan-400 drop-shadow-[0_0_5px_#22d3ee]"
            >
              {status}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* প্রোগ্রেস লাইন */}
        <div className="mt-12 w-64 h-[1px] bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"
            animate={{ width: `${count}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>

      {/* সাইড ডেকোরেশন (Cyber Corners) */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-cyan-500/20" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-cyan-500/20" />

      {/* নিচের ফুটার ডেকোরেশন */}
      <div className="absolute bottom-6 flex gap-8 opacity-20 font-mono text-[7px] text-slate-500 uppercase tracking-widest">
        <span>Build: V3.0.24</span>
        <span>Role: Full_Stack_Architect</span>
        <span>Status: Operational</span>
      </div>
    </motion.div>
  );
};

export default Loader;
