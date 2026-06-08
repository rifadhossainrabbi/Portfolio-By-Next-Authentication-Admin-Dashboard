'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import MyNavLinks from '../MyNavLinks';

const navItems = [
  { id: '01', label: 'HOME', href: '/' },
  { id: '02', label: 'ABOUT', href: '/about' },
  { id: '03', label: 'SKILLS', href: '/all-skills' },
  { id: '04', label: 'PROJECTS', href: '/all-projects' },
  { id: '05', label: 'RESUME', href: '/resume' },
  { id: '06', label: 'CONTACT', href: '/contact' },
];

const NavSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- ডেক্সটপ সাইডবার (lg স্ক্রিনে আগের মতোই থাকবে) --- */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-50 h-screen w-24 lg:w-28 border-r border-white/5 bg-[#010714]/80 backdrop-blur-md flex flex-col items-center py-12">
        <div className="mb-20">
          <div className="w-14 h-14 rounded-full border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)] group cursor-pointer hover:border-cyan-400 transition-all">
            <span className="text-cyan-400 font-serif text-xl tracking-tighter group-hover:scale-110 transition-transform">
              RH
            </span>
          </div>
        </div>

        <nav className="flex flex-col items-center w-full">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <MyNavLinks item={item} />
              {index !== navItems.length - 1 && (
                <div className="w-8 h-[1px] bg-white/5 my-2" />
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className="mt-auto text-[9px] text-slate-700 rotate-90 whitespace-nowrap tracking-[0.3em] font-bold uppercase">
          V 1.0.4 - ACTIVE
        </div>
      </aside>

      {/* --- মোবাইল টপ বার --- */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-20 z-[60] px-6 bg-[#010714]/90 backdrop-blur-lg border-b border-white/5 flex items-center justify-between">
        <div className="text-cyan-400 font-serif text-xl font-bold tracking-tighter border border-cyan-500/30 w-10 h-10 rounded-full flex items-center justify-center">
          RH
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 focus:outline-none"
        >
          <FiMenu size={28} />
        </button>
      </header>

      {/* --- মোবাইল ড্রয়ার মেনু --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* ১. ব্যাকড্রপ/ওভারলে (মেনুর বাইরের অন্ধকার অংশ) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)} // বাইরে ক্লিক করলে বন্ধ হবে
              className="lg:hidden fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            />

            {/* ২. ড্রয়ার কন্টেন্ট (ডান দিক থেকে স্লাইড করবে) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 z-[80] h-screen w-[280px] bg-[#010714] border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* ড্রয়ার ক্লোজ বাটন */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-cyan-400"
                >
                  <FiX size={32} />
                </button>
              </div>

              {/* ড্রয়ার লিঙ্কসমূহ */}
              <nav className="flex flex-col space-y-2 mt-10">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  >
                    <MyNavLinks item={item} isMobile={true} />
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto p-10 text-center text-[10px] text-slate-700 tracking-[0.3em] font-bold uppercase">
                V 1.0.4 - ACTIVE
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavSideBar;
