'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLoader, FiGithub, FiExternalLink } from 'react-icons/fi';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 lg:p-12 space-y-10 bg-[#020617] min-h-screen text-white"
    >
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">
            Active{' '}
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              Nodes
            </span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-3 uppercase tracking-[0.3em] font-bold border-l-2 border-cyan-500 pl-4">
            System Kernel Repository
          </p>
        </div>

        <div className="bg-[#0a101f] border border-white/5 p-6 rounded-3xl min-w-[150px] shadow-2xl">
          <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-2">
            Verified Deployments
          </p>
          <p className="text-3xl font-black text-cyan-400 italic">
            {projects.length.toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* 2. Content Section */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-60 gap-4">
          <FiLoader className="text-cyan-400 animate-spin" size={40} />
          <p className="text-cyan-400/50 text-[10px] font-bold uppercase tracking-widest">
            Syncing Kernel Data...
          </p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-[3rem]">
          <p className="text-slate-600 font-black uppercase tracking-widest text-xs">
            No active nodes found in kernel
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(proj => (
            <motion.div
              key={proj._id}
              whileHover={{ y: -8 }}
              className="bg-[#0a101f] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 shadow-2xl"
            >
              {/* IMAGE SECTION - CLEAR & SHARP */}
              <div className="relative h-64 w-full overflow-hidden bg-[#0d1526]">
                <img
                  src={proj.imageUrl || 'https://via.placeholder.com/600x400'}
                  alt={proj.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent z-10" />

                {/* Optional: Tag/Badge if needed */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-black/60 backdrop-blur-md text-cyan-400 text-[7px] font-black px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
                    Stable Build
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-5">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter truncate group-hover:text-cyan-400 transition-colors">
                  {proj.title}
                </h3>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {proj.techStack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[8px] font-bold text-slate-400 border border-white/10 px-2.5 py-1 rounded-lg uppercase bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium h-8">
                  {proj.description}
                </p>

                {/* Footer Actions - ONLY LINKS */}
                <div className="pt-5 flex items-center justify-between border-t border-white/5">
                  <div className="flex gap-6">
                    <a
                      href={proj.githubUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-all group/link"
                    >
                      <FiGithub size={20} />
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover/link:opacity-100 transition-opacity">
                        Source
                      </span>
                    </a>
                    <a
                      href={proj.liveLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-all group/link"
                    >
                      <FiExternalLink size={20} />
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover/link:opacity-100 transition-opacity">
                        Live Demo
                      </span>
                    </a>
                  </div>

                  {/* Decorative element to replace buttons */}
                  <div className="w-2 h-2 rounded-full bg-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)] animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsPage;
