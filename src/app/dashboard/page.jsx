'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';

const DashboardPage = () => {
  const projects = [
    { id: 1, name: 'AI Portfolio', tech: 'Next.js, Tailwind', status: 'Live' },
    { id: 2, name: 'E-commerce App', tech: 'MERN Stack', status: 'Dev' },
    { id: 3, name: 'Task Manager', tech: 'React, Firebase', status: 'Live' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* ১. টাইটেল এবং স্ট্যাটস */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">
            All <span className="text-cyan-400 text-glow">Projects</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-3 uppercase tracking-[0.3em] font-bold border-l-2 border-cyan-500 pl-4">
            Manage system kernel nodes
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-[#0a101f] border border-white/5 p-6 rounded-3xl min-w-[150px] shadow-2xl">
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-2">
              Active Nodes
            </p>
            <p className="text-3xl font-black text-cyan-400 italic">32</p>
          </div>
          <div className="bg-[#0a101f] border border-white/5 p-6 rounded-3xl min-w-[150px] shadow-2xl">
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-2">
              System Load
            </p>
            <p className="text-3xl font-black text-blue-500 italic">14.2%</p>
          </div>
        </div>
      </div>

      {/* ২. প্রজেক্ট টেবিল (Design from image) */}
      <div className="bg-[#0a101f]/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/[0.02] text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/5">
            <tr>
              <th className="px-10 py-6">Node Name</th>
              <th className="px-10 py-6">Core Tech</th>
              <th className="px-10 py-6">Uptime Status</th>
              <th className="px-10 py-6 text-right uppercase">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {projects.map(proj => (
              <tr
                key={proj.id}
                className="hover:bg-cyan-500/[0.03] transition-all group"
              >
                <td className="px-10 py-6 font-bold text-white italic tracking-tight">
                  {proj.name}
                </td>
                <td className="px-10 py-6 font-mono text-xs text-slate-500 uppercase">
                  {proj.tech}
                </td>
                <td className="px-10 py-6">
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[9px] font-black rounded-full border border-cyan-500/20 uppercase">
                    {proj.status}
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
                    <button className="p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-2xl text-blue-400 border border-blue-500/10 transition-all">
                      <FiEdit3 size={16} />
                    </button>
                    <button className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-2xl text-red-500 border border-red-500/10 transition-all">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
