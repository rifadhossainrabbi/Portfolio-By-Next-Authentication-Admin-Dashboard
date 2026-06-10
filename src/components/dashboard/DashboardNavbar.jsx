'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiFolder, FiPlusSquare, FiActivity, FiSettings } from 'react-icons/fi';

const DashboardNavbar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      id: 'all',
      label: 'All Projects',
      href: '/dashboard',
      icon: <FiFolder />,
    },
    {
      id: 'add',
      label: 'Add Project',
      href: '/dashboard/add-projects',
      icon: <FiPlusSquare />,
    },
  ];

  return (
    <nav
      className="hidden md:flex bg-[#010714] border-white/5 z-50
      /* Tablet: Top Bar */
      md:w-full md:h-16 md:border-b md:flex-row md:items-center md:px-8 md:justify-center md:gap-6
      /* Desktop: Right Sidebar */
      lg:fixed lg:right-0 lg:top-0 lg:w-72 lg:h-screen lg:border-l lg:flex-col lg:p-8 lg:justify-start lg:gap-2"
    >
      <div className="mb-8 hidden lg:block">
        <h2 className="text-cyan-400 font-black italic text-xl tracking-tighter uppercase">
          Cyber-Kernel
        </h2>
        <p className="text-[10px] text-slate-600 font-bold uppercase">
          v1.0.2 Stable
        </p>
      </div>

      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 hidden lg:block text-left w-full">
        Management
      </p>

      <div className="flex md:flex-row lg:flex-col gap-4">
        {menuItems.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-4 px-5 py-3 lg:py-4 rounded-2xl transition-all duration-300 group whitespace-nowrap
            ${pathname === item.href ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'hover:bg-white/5 text-slate-500 hover:text-slate-300'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[11px] font-black uppercase tracking-widest">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="h-[1px] bg-white/5 my-6 hidden lg:block w-full" />

      <button className="hidden lg:flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all w-full">
        <FiActivity size={20} />
        <span className="text-[11px] font-black uppercase tracking-widest">
          Analytics
        </span>
      </button>

      <button className="hidden lg:flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all mt-auto w-full">
        <FiSettings size={20} />
        <span className="text-[11px] font-black uppercase tracking-widest">
          Settings
        </span>
      </button>
    </nav>
  );
};

export default DashboardNavbar;
