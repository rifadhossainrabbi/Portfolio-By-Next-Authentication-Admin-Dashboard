'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiLoader,
  FiGithub,
  FiExternalLink,
  FiArrowUpRight,
} from 'react-icons/fi';
import Particles from '@/components/Particales';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/projects');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#010714] overflow-hidden">
      {/* --- PARTICLES BACKGROUND --- */}
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 lg:p-12 space-y-10 text-white"
      >
        {/* 1. Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 max-w-7xl mx-auto">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none">
              Active{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                Projects
              </span>
            </h1>
            <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-[0.3em] font-bold border-l-2 border-cyan-500 pl-4">
              System Kernel Repository
            </p>
          </div>

          <div className="bg-[#0a101f]/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl min-w-[150px] shadow-2xl">
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">
              Total Builds
            </p>
            <p className="text-4xl font-black text-white italic">
              {projects.length.toString().padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* 2. Content Section - 3 Grid Layout */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-60 gap-4">
            <FiLoader className="text-cyan-400 animate-spin" size={40} />
            <p className="text-cyan-400/50 text-[10px] font-bold uppercase tracking-widest">
              Projects are loading...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto pb-20">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative bg-[#0a101f]/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
              >
                {/* --- IMAGE SECTION WITH INTERACTION --- */}
                <div className="relative h-64 w-full overflow-hidden bg-[#0d1526]">
                  <img
                    src={proj.imageUrl || 'https://via.placeholder.com/600x400'}
                    alt={proj.title}
                    className="w-full h-full object-cover object-top transition-all duration-1000 ease-out grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-1"
                  />
                  {/* Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent opacity-80" />

                  {/* "Open" Badge on Hover */}
                  <div className="absolute top-5 right-5 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="flex items-center gap-1.5 bg-cyan-500 text-black text-[9px] font-black px-4 py-2 rounded-full shadow-2xl uppercase">
                      Expand <FiArrowUpRight size={12} />
                    </span>
                  </div>
                </div>

                {/* --- CARD CONTENT --- */}
                <div className="p-8 flex-1 flex flex-col space-y-5">
                  <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter truncate group-hover:text-cyan-400 transition-colors">
                    {proj.title}
                  </h3>
                  {/* Dynamic Tech Badges */}
                  <div className="flex flex-wrap gap-2">
                    {proj.techStack?.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-bold text-slate-400 border border-white/5 px-2.5 py-1 rounded-lg uppercase bg-white/5 backdrop-blur-sm group-hover:border-cyan-500/20 group-hover:text-cyan-300 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] text-slate-400 line-clamp-2 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                    {proj.description}
                  </p>
                  <div className="flex-1" /> {/* Spacer */}
                  {/* --- CARD FOOTER --- */}
                  <div className="pt-6 flex items-center justify-between border-t border-white/5">
                    <div className="flex gap-6">
                      <a
                        href={proj.githubUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-500 hover:text-white transition-all transform hover:-translate-y-0.5"
                      >
                        <FiGithub size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                          Source
                        </span>
                      </a>
                      <a
                        href={proj.liveLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-all transform hover:-translate-y-0.5"
                      >
                        <FiExternalLink size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                          Live
                        </span>
                      </a>
                    </div>

                    {/* Status Indicator Pill */}
                    <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">
                        Running
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
