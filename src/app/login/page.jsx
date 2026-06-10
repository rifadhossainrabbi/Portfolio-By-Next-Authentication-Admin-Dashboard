'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc'; // গুগল আইকন
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ইমেইল দিয়ে লগইন
  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/',
      },
      {
        onSuccess: () => router.push('/'),
        onError: ctx => alert(ctx.error.message),
      },
    );
    setLoading(false);
  };

  // গুগল দিয়ে লগইন
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <div className="min-h-screen bg-[#010714] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-[#0a101f]/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[30px] z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white uppercase italic">
            LOGIN TO <span className="text-blue-500 text-4xl">SYSTEM</span>
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 text-xs text-white outline-none focus:border-blue-500"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 text-xs text-white outline-none focus:border-blue-500"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 py-4 rounded-xl text-xs font-black uppercase text-white hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Login Now'} <FiLogIn />
          </button>
        </form>

        <div className="relative my-8 text-center">
          <span className="bg-[#0a101f] px-4 text-slate-500 text-[10px] font-bold uppercase relative z-10">
            Or Continue With
          </span>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
        </div>

        {/* গুগল বাটন */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-4 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-3 hover:bg-slate-200 transition-all"
        >
          <FcGoogle size={20} /> Sign in with Google
        </button>

        <div className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-400">
            Create One
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
