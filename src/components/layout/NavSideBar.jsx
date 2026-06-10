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
  FiPlusSquare,
  FiFolder,
} from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

// মেইন সাইট নেভিগেশন আইটেম
const navItems = [
  { id: '01', label: 'HOME', href: '/', icon: FiHome },
  { id: '02', label: 'ABOUT', href: '/about', icon: FiUser },
  { id: '03', label: 'SKILLS', href: '/all-skills', icon: FiCode },
  { id: '04', label: 'PROJECTS', href: '/all-projects', icon: FiBriefcase },
  { id: '05', label: 'RESUME', href: '/resume', icon: FiFileText },
  { id: '06', label: 'CONTACT', href: '/contact', icon: FiMail },
];

const NavSideBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // নামের প্রথম অক্ষর বের করার লজিক
  const getInitials = name => {
    if (!name) return 'RH';
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = e => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // প্রোফাইল ড্রপডাউন মেনু (মোবাইলের জন্য বাড়তি লিঙ্কসহ)
  const DropdownMenu = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="absolute top-14 left-0 md:top-0 md:left-20 w-60 bg-[#0a101f]/95 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-[120]"
    >
      {user ? (
        <div className="flex flex-col gap-1">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-[10px] text-cyan-500 font-black uppercase mb-1">
              Authenticated User
            </p>
            <p className="text-sm text-white font-bold truncate">{user.name}</p>
          </div>

          {/* মোবাইল ভিউতে ড্যাশবোর্ড ম্যানেজমেন্ট লিঙ্কসমূহ */}
          <div className="md:hidden py-1 border-b border-white/5">
            <p className="px-4 py-1 text-[8px] text-slate-500 font-bold uppercase tracking-widest">
              Dashboard Nav
            </p>
            <Link
              href="/dashboard"
              onClick={() => setShowUserMenu(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 rounded-xl text-slate-300 text-[10px] font-black uppercase"
            >
              <FiFolder className="text-cyan-400 text-lg" /> All Projects
            </Link>
            <Link
              href="/dashboard/add-projects"
              onClick={() => setShowUserMenu(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 rounded-xl text-slate-300 text-[10px] font-black uppercase"
            >
              <FiPlusSquare className="text-cyan-400 text-lg" /> Add Project
            </Link>
          </div>

          {/* জেনারেল লিঙ্ক */}
          <Link
            href="/dashboard"
            onClick={() => setShowUserMenu(false)}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 rounded-xl text-slate-300 text-[10px] font-black uppercase"
          >
            <FiLayout className="text-lg" /> Admin Panel
          </Link>

          <button
            onClick={() => {
              authClient.signOut();
              setShowUserMenu(false);
            }}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-500/10 rounded-xl text-red-400 text-[10px] font-black uppercase w-full text-left"
          >
            <FiLogOut className="text-lg" /> Logout System
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          onClick={() => setShowUserMenu(false)}
          className="flex items-center gap-3 px-4 py-4 bg-cyan-500/10 rounded-xl text-cyan-400 text-[10px] font-black uppercase justify-center transition-all"
        >
          <FiLogIn className="text-lg" /> Sign In / Join
        </Link>
      )}
    </motion.div>
  );

  // ইউজার অবতার কম্পোনেন্ট
  const UserAvatar = ({ sizeClass }) => (
    <div
      className={`${sizeClass} rounded-full border-2 border-cyan-500/30 flex items-center justify-center overflow-hidden bg-black/20 hover:border-cyan-400 transition-all shadow-glow`}
    >
      {user?.image ? (
        <img
          src={user.image}
          alt={user.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="text-cyan-400 font-black italic">
          {getInitials(user?.name)}
        </span>
      )}
    </div>
  );

  return (
    <>
      {/* --- ১. মোবাইল ও ট্যাবলেট টপ বার (md:hidden) --- */}
      <header className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#010714]/90 backdrop-blur-md border-b border-white/5 z-[100] flex items-center px-6 justify-between">
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="focus:outline-none active:scale-90 transition-transform"
          >
            <UserAvatar sizeClass="w-10 h-10 text-xs" />
          </button>
          <AnimatePresence>{showUserMenu && <DropdownMenu />}</AnimatePresence>
        </div>

        <nav className="flex items-center gap-4">
          {navItems.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className={`text-xl transition-all ${pathname === item.href ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <item.icon />
            </Link>
          ))}
        </nav>
      </header>

      {/* --- ২. ডেক্সটপ সাইডবার (hidden md:flex) --- */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 lg:w-28 bg-[#010714] border-r border-white/5 z-[100] flex-col items-center py-10">
        {/* লোগো এবং প্রোফাইল সেকশন */}
        <div className="mb-14 relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="focus:outline-none group"
          >
            <UserAvatar sizeClass="w-12 lg:w-14 h-12 lg:h-14 text-lg" />
          </button>
          <AnimatePresence>{showUserMenu && <DropdownMenu />}</AnimatePresence>
        </div>

        {/* নেভিগেশন আইটেমস */}
        <nav className="flex flex-col gap-8 w-full">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative flex flex-col items-center"
              >
                {/* সিরিয়াল নাম্বার */}
                <span
                  className={`text-[10px] mb-1 font-mono transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`}
                >
                  {item.id}
                </span>

                {/* আইকন বক্স */}
                <div
                  className={`text-xl lg:text-2xl p-2.5 rounded-xl transition-all duration-300 
                  ${isActive ? 'text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'text-slate-500 group-hover:text-cyan-400 group-hover:bg-white/5'}`}
                >
                  <item.icon />
                </div>

                {/* ডেক্সটপ লেবেল (শুধুমাত্র বড় স্ক্রিনে - lg) */}
                <span
                  className={`hidden lg:block text-[8px] font-black tracking-widest mt-1.5 uppercase transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}
                >
                  {item.label}
                </span>

                {/* টুলটিপ হোভার (ট্যাবলেটের জন্য - md) */}
                <div className="absolute left-full ml-4 px-3 py-1 bg-cyan-500 text-black text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none lg:hidden whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-[4px] border-y-transparent border-r-[4px] border-r-cyan-500"></div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* ভার্সন টেক্সট */}
        <div className="mt-auto rotate-180 text-[10px] text-slate-700 font-bold tracking-[0.3em] [writing-mode:vertical-lr] opacity-30 select-none">
          V 3.0.2 - {user ? 'AUTH' : 'GUEST'}
        </div>
      </aside>
    </>
  );
};

export default NavSideBar;
