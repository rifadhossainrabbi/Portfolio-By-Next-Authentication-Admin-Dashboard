'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiTrash2,
  FiEdit3,
  FiGithub,
  FiExternalLink,
  FiLoader,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ডাটাবেজ থেকে প্রজেক্ট নিয়ে আসা
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER;
        const res = await fetch(`${baseUrl}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load system nodes.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* ১. হেডার সেকশন */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">
            Active <span className="text-cyan-400 text-glow">Nodes</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-3 uppercase tracking-[0.3em] font-bold border-l-2 border-cyan-500 pl-4">
            System Kernel Repository
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-[#0a101f] border border-white/5 p-6 rounded-3xl min-w-[150px] shadow-2xl">
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-2">
              Total Project Count
            </p>
            <p className="text-3xl font-black text-cyan-400 italic">
              {projects.length}
            </p>
          </div>
        </div>
      </div>

      {/* ২. কার্ড গ্রিড সেকশন */}
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <FiLoader className="text-cyan-400 animate-spin" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(proj => (
            <motion.div
              key={proj._id}
              whileHover={{ y: -5 }}
              className="bg-[#0a101f] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-cyan-500/30 transition-all shadow-2xl"
            >
              {/* প্রজেক্ট ইমেজ */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={proj.imageUrl || 'https://via.placeholder.com/400x200'}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] to-transparent" />

                {/* স্ট্যাটাস ব্যাজ */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 backdrop-blur-md text-cyan-400 text-[8px] font-black px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
                    {proj.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>

              {/* কন্টেন্ট */}
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tight truncate">
                  {proj.title}
                </h3>

                {/* টেক স্ট্যাক */}
                <div className="flex flex-wrap gap-2">
                  {proj.techStack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-bold text-slate-500 border border-white/5 px-2 py-1 rounded uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* একশন বাটন এবং লিঙ্ক */}
                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <div className="flex gap-4">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      className="text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      <FiGithub size={18} />
                    </a>
                    <a
                      href={proj.liveLink}
                      target="_blank"
                      className="text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/10 transition-all">
                      <FiEdit3 size={14} />
                    </button>
                    <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 border border-red-500/10 transition-all">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* যদি কোনো প্রজেক্ট না থাকে */}
      {!isLoading && projects.length === 0 && (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-[3rem]">
          <p className="text-slate-600 font-black uppercase tracking-widest text-xs">
            No active nodes found in kernel
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardPage;
