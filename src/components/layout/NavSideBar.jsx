'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiFileText,
  FiMail,
  FiLogOut,
  FiLayout,
  FiLogIn,
} from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const navItems = [
  { id: '01', label: 'HOME', href: '/', icon: <FiHome /> },
  { id: '02', label: 'ABOUT', href: '/about', icon: <FiUser /> },
  { id: '03', label: 'SKILLS', href: '/all-skills', icon: <FiCode /> },
  { id: '04', label: 'PROJECTS', href: '/all-projects', icon: <FiBriefcase /> },
  { id: '05', label: 'RESUME', href: '/resume', icon: <FiFileText /> },
  { id: '06', label: 'CONTACT', href: '/contact', icon: <FiMail /> },
];

const NavSideBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const getInitials = name => {
    if (!name) return 'RH';
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const DropdownMenu = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="absolute top-14 left-0 md:top-0 md:left-20 w-52 bg-[#0a101f]/95 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-[120]"
    >
      {user ? (
        <div className="flex flex-col gap-1">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-[10px] text-cyan-500 font-black uppercase mb-1">
              User Profile
            </p>
            <p className="text-sm text-white font-bold truncate">{user.name}</p>
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 rounded-xl text-slate-300 text-[10px] font-black uppercase"
          >
            <FiUser /> My Profile
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 rounded-xl text-slate-300 text-[10px] font-black uppercase"
          >
            <FiLayout /> Dashboard
          </Link>
          <button
            onClick={() => authClient.signOut()}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 rounded-xl text-red-400 text-[10px] font-black uppercase w-full text-left"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 bg-cyan-500/10 rounded-xl text-cyan-400 text-[10px] font-black uppercase justify-center transition-all"
        >
          <FiLogIn /> Sign In / Join
        </Link>
      )}
    </motion.div>
  );

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#010714]/90 backdrop-blur-md border-b border-white/5 z-[100] flex items-center px-6 justify-between">
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-10 h-10 rounded-full border-2 border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black italic text-sm"
          >
            {user ? getInitials(user.name) : 'RH'}
          </button>
          <AnimatePresence>{showUserMenu && <DropdownMenu />}</AnimatePresence>
        </div>
        <nav className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {navItems.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className={`text-xl transition-all ${pathname === item.href ? 'text-cyan-400' : 'text-slate-500'}`}
            >
              {item.icon}
            </Link>
          ))}
        </nav>
      </header>

      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 lg:w-28 bg-[#010714] border-r border-white/5 z-[100] flex-col items-center py-10">
        <div className="mb-14 relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-12 lg:w-14 h-12 lg:h-14 rounded-full border-2 border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black italic text-lg shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            {user ? getInitials(user.name) : 'RH'}
          </button>
          <AnimatePresence>{showUserMenu && <DropdownMenu />}</AnimatePresence>
        </div>
        <nav className="flex flex-col gap-8 w-full">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative flex flex-col items-center"
              >
                <span
                  className={`text-[10px] mb-1 font-mono transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}
                >
                  {item.id}
                </span>
                <div
                  className={`text-xl lg:text-2xl p-2.5 rounded-xl transition-all ${isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 group-hover:text-cyan-400'}`}
                >
                  {item.icon}
                </div>
                <span
                  className={`hidden lg:block text-[8px] font-black tracking-widest mt-1.5 uppercase transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}
                >
                  {item.label}
                </span>
                <div className="absolute left-full ml-4 px-3 py-1 bg-cyan-500 text-black text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none lg:hidden whitespace-nowrap">
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rotate-180 text-[10px] text-slate-700 font-bold tracking-[0.3em] [writing-mode:vertical-lr] opacity-30">
          V 3.0.2
        </div>
      </aside>
    </>
  );
};

export default NavSideBar;
