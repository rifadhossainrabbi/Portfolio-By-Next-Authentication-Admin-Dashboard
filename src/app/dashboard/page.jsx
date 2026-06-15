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
import DeleteModal from './DeleteModal';
import Link from 'next/link';

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER;

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load system nodes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [baseUrl]);

  const openDeleteModal = project => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProject) return;
    try {
      const res = await fetch(`${baseUrl}/projects/${selectedProject._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success('Node successfully purged');
        setProjects(projects.filter(p => p._id !== selectedProject._id));
      }
    } catch (error) {
      toast.error('System error during deletion.');
    } finally {
      setIsModalOpen(false);
      setSelectedProject(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      /* এখানে bg-[#050811] সরিয়ে bg-transparent করা হয়েছে যাতে লেআউটের পার্টিকেল দেখা যায় */
      className="p-6 lg:p-10 space-y-10 min-h-screen bg-transparent relative z-10"
    >
      {/* Header Section */}
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

        {/* গ্লাস ইফেক্ট কার্ড */}
        <div className="bg-[#0a101f]/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl min-w-[180px] shadow-2xl">
          <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-2">
            Total Projects
          </p>
          <p className="text-3xl font-black text-cyan-400 italic">
            {projects.length.toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-60 gap-4">
          <FiLoader className="text-cyan-400 animate-spin" size={40} />
          <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em]">
            Syncing Kernel...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(proj => (
            <motion.div
              key={proj._id}
              whileHover={{ y: -5 }}
              /* কার্ডগুলোতে গ্লাস-মর্ফিজম (backdrop-blur) যোগ করা হয়েছে */
              className="bg-[#0a101f]/60 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden group hover:border-cyan-500/30 transition-all shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={proj.imageUrl || 'https://via.placeholder.com/400x200'}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-transparent to-transparent" />
              </div>

              <div className="p-8 space-y-4">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tight truncate">
                  {proj.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {proj.techStack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[8px] font-bold text-slate-400 border border-white/5 px-2 py-1 rounded uppercase bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                <div className="pt-6 flex items-center justify-between border-t border-white/5">
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
                    <Link href={`/dashboard/edit-projects/${proj._id}`}>
                      <button className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/10 transition-all">
                        <FiEdit3 size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() => openDeleteModal(proj)}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 border border-red-500/10 transition-all"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedProject?.title}
      />
    </motion.div>
  );
};

export default DashboardPage;
