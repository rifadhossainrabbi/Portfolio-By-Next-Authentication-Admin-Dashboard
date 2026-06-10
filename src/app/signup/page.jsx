'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async e => {
    e.preventDefault();
    setLoading(true);
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: '/',
      },
      {
        onSuccess: () => router.push('/'),
        onError: ctx => alert(ctx.error.message),
      },
    );
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#010714] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md bg-[#0a101f]/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[30px] z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white uppercase italic">
            CREATE <span className="text-cyan-500 text-4xl">ACCOUNT</span>
          </h2>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
            <input
              type="text"
              placeholder="FULL NAME"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 text-xs text-white outline-none focus:border-cyan-500"
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 text-xs text-white outline-none focus:border-cyan-500"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 text-xs text-white outline-none focus:border-cyan-500"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 py-4 rounded-xl text-xs font-black uppercase text-white hover:bg-cyan-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Creating...' : 'Create Account'} <FiArrowRight />
          </button>
        </form>

        {/* গুগল দিয়েও সাইন আপ করা যাবে */}
        <button
          onClick={() => authClient.signIn.social({ provider: 'google' })}
          className="mt-4 w-full bg-white text-black py-4 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-3 hover:bg-slate-200 transition-all"
        >
          <FcGoogle size={20} /> Sign up with Google
        </button>

        <div className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase">
          Already have an account?{' '}
          <Link href="/login" className="text-cyan-500">
            Log In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
