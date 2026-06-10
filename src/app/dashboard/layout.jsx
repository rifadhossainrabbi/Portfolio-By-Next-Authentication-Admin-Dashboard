'use client';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#010714] flex flex-col lg:flex-row overflow-hidden">
      {/* নেভিগেশন বার */}
      <DashboardNavbar />

      {/* মেইন কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col overflow-hidden lg:mr-72">
        <main className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
