'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiFolder, FiPlusSquare, FiActivity, FiSettings } from 'react-icons/fi';
// হিরো সেকশনে ব্যবহৃত পার্টিকেল কম্পোনেন্টটি ইমপোর্ট করুন
import Particles from '@/components/Particales';

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
      className="hidden md:flex bg-[#010714] border-white/10 z-50 overflow-hidden relative
      /* Tablet: Top Bar */
      md:w-full md:h-16 md:border-b md:flex-row md:items-center md:px-8 md:justify-center md:gap-6
      /* Desktop: Right Sidebar */
      lg:fixed lg:right-0 lg:top-0 lg:w-72 lg:h-screen lg:border-l lg:flex-col lg:p-8 lg:justify-start lg:gap-2"
    >
      {/* --- হিরো সেকশনের মতো পার্টিকেল ব্যাকগ্রাউন্ড --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
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
      </div>

      {/* --- কন্টেন্ট লেয়ার (z-10) --- */}
      <div className="relative z-10 w-full flex md:flex-row lg:flex-col items-center">
        {/* লোগো সেকশন */}
        <div className="mb-8 hidden lg:block w-full">
          <h2 className="text-cyan-400 font-black italic text-xl tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            Cyber-Kernel
          </h2>
          <p className="text-[10px] text-slate-600 font-bold uppercase">
            v1.0.2 Stable
          </p>
        </div>

        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 hidden lg:block text-left w-full">
          Management
        </p>

        {/* মেনু আইটেমসমূহ */}
        <div className="flex md:flex-row lg:flex-col gap-4 w-full">
          {menuItems.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-3 lg:py-4 rounded-2xl transition-all duration-300 group whitespace-nowrap backdrop-blur-sm border
              ${
                pathname === item.href
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                  : 'bg-white/5 border-transparent text-slate-500 hover:text-slate-200 hover:border-white/10'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="h-[1px] bg-white/5 my-6 hidden lg:block w-full" />

        {/* বটম বাটনগুলো */}
        <div className="flex md:flex-row lg:flex-col gap-2 w-full">
          <button className="hidden lg:flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all w-full backdrop-blur-sm">
            <FiActivity size={20} />
            <span className="text-[11px] font-black uppercase tracking-widest">
              Analytics
            </span>
          </button>

          <button className="hidden lg:flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all mt-auto w-full backdrop-blur-sm">
            <FiSettings size={20} />
            <span className="text-[11px] font-black uppercase tracking-widest">
              Settings
            </span>
          </button>
        </div>
      </div>

      {/* গ্লাস মাস্ক */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010714]/20 to-[#010714]/60 pointer-events-none" />
    </nav>
  );
};

export default DashboardNavbar;
