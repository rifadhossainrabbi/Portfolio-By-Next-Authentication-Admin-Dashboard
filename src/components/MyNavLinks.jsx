'use client';
// ভুল ইম্পোর্টটি সরিয়ে শুধু 'next/link' রাখা হলো
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MyNavLinks = ({ item, isMobile = false }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`group relative flex ${
        isMobile ? 'flex-row space-x-4 px-10' : 'flex-col items-center py-4'
      } w-full transition-all`}
    >
      <div
        className={`${
          isMobile ? 'static' : 'absolute left-4 top-1/2 -translate-y-1/2'
        }`}
      >
        {isActive ? (
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />
        ) : (
          <div className="w-2 h-[1px] bg-white/10 group-hover:bg-cyan-500/40 transition-colors" />
        )}
      </div>

      <div
        className={`flex flex-col ${
          isMobile ? 'items-start' : 'items-center pl-4'
        } transition-transform duration-300 group-hover:translate-x-1`}
      >
        <span
          className={`text-[10px] tracking-widest transition-colors duration-300 ${
            isActive
              ? 'text-cyan-400 font-bold'
              : 'text-slate-500 group-hover:text-cyan-500/70'
          }`}
        >
          {item.id}
        </span>
        <span
          className={`text-[13px] lg:text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
            isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
          }`}
        >
          {item.label}
        </span>
      </div>
    </Link>
  );
};

export default MyNavLinks;
