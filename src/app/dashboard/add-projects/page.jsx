'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FiUploadCloud,
  FiGithub,
  FiGlobe,
  FiSend,
  FiChevronDown,
} from 'react-icons/fi';

const AddProjectsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto py-10 px-4 md:px-0"
    >
      {/* ১. হেডার সেকশন (Design from image) */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-5xl font-black text-cyan-400 tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            Initialize Project
          </h1>
          <p className="text-[11px] text-slate-500 mt-4 max-w-xl leading-relaxed font-bold uppercase tracking-widest">
            Provisioning new repository instance. Fill in the parameters to
            deploy your next high-performance digital asset to the Kernel
            ecosystem.
          </p>
        </div>

        {/* মেটা ইনফো (Region/Lat-Long) */}
        <div className="text-right hidden md:block">
          <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
            Region: US-EAST-1
          </p>
          <p className="text-[8px] font-mono text-slate-600 mt-1 uppercase">
            Lat: 37.7749° N, Long: 122.4194° W
          </p>
        </div>
      </div>

      <form className="space-y-10">
        {/* ২. ফটো আপলোড জোন (Circuit Backdrop Design) */}
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-blue-900/10 rounded-2xl overflow-hidden border border-white/5">
            {/* ইমেজের সার্কিট ব্যাকগ্রাউন্ড সিমুলেশন */}
            <div className="w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>

          <div className="relative border-2 border-dashed border-cyan-500/20 hover:border-cyan-500/50 rounded-2xl p-16 flex flex-col items-center justify-center transition-all bg-gradient-to-b from-transparent to-cyan-500/5">
            <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:scale-110 transition-transform">
              <FiUploadCloud size={32} />
            </div>
            <h3 className="text-sm font-black text-cyan-400 uppercase tracking-widest">
              Upload Project Photo
            </h3>
            <p className="text-[10px] text-slate-500 mt-2 uppercase font-bold">
              Drag and drop or click to browse (JPG, PNG, WEBP)
            </p>
          </div>
        </div>

        {/* ৩. ইনপুট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Title */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
              Project Title
            </label>
            <div className="bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 focus-within:border-cyan-500/50 transition-all">
              <input
                type="text"
                placeholder="e.g. Quantum Analytics Engine"
                className="w-full bg-transparent outline-none text-sm font-bold text-white placeholder:text-slate-700 uppercase"
              />
            </div>
          </div>

          {/* Tech Stack (Select) */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
              Tech Stack
            </label>
            <div className="bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between group cursor-pointer hover:border-cyan-500/30">
              <span className="text-sm font-bold text-slate-400 uppercase">
                Next.js / TypeScript / Tailwind
              </span>
              <FiChevronDown className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </div>
          </div>

          {/* GitHub Link */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
              GitHub Repository URL
            </label>
            <div className="bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4 focus-within:border-cyan-500/50 transition-all">
              <FiGithub className="text-slate-600" />
              <input
                type="text"
                placeholder="https://github.com/user/repo"
                className="w-full bg-transparent outline-none text-sm font-bold text-white placeholder:text-slate-700"
              />
            </div>
          </div>

          {/* Live Link */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
              Live Link
            </label>
            <div className="bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4 focus-within:border-cyan-500/50 transition-all">
              <FiGlobe className="text-slate-600" />
              <input
                type="text"
                placeholder="https://project-demo.live"
                className="w-full bg-transparent outline-none text-sm font-bold text-white placeholder:text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* ৪. ডেসক্রিপশন টেক্সট এরিয়া */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
            System Documentation (Description)
          </label>
          <div className="bg-[#0a101f] border border-white/10 rounded-2xl p-6 focus-within:border-cyan-500/50 transition-all">
            <textarea
              rows="5"
              placeholder="Briefly describe the architectural choices and core functionality..."
              className="w-full bg-transparent outline-none text-sm font-bold text-white placeholder:text-slate-700 no-scrollbar resize-none leading-relaxed"
            ></textarea>
          </div>
        </div>

        {/* ৫. ফুটার সেকশন (Buttons and Checkboxes) */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/10 bg-black checked:bg-cyan-500 transition-all appearance-none border"
              />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300">
                Make Public
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-white/10 bg-black checked:bg-cyan-500 transition-all appearance-none border"
              />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300">
                Enable Telemetry
              </span>
            </label>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              type="reset"
              className="flex-1 md:flex-none px-10 py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white/5 transition-all"
            >
              Reset
            </button>
            <button
              type="submit"
              className="flex-1 md:flex-none px-12 py-4 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <FiSend /> Publish Project
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProjectsPage;
