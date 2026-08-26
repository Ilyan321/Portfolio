'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Access denied.');
        return;
      }
      router.push('/admin');
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#1A1918] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-[360px] sand-card-dark p-6 sm:p-8 rounded-[1.75rem] shadow-2xl border border-white/10"
      >
        <div className="mb-8">
          <h1 className="font-serif-display text-3xl sm:text-4xl text-[#F3EFEA] font-normal leading-tight tracking-tight">
            Admin Portal.
          </h1>
          <p className="text-xs font-sans-clean text-[#78746D] mt-1.5">
            Authenticate to manage the portfolio database and profile configuration.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono-code uppercase tracking-wider text-[#A39E95]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-3 bg-[#1A1918] border border-[rgba(255,255,255,0.08)] rounded-xl text-xs font-sans-clean text-[#F3EFEA] placeholder:text-[#78746D] focus:outline-none focus:border-emerald-500/50 focus:bg-[#1A1918] transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono-code uppercase tracking-wider text-[#A39E95]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-3 bg-[#1A1918] border border-[rgba(255,255,255,0.08)] rounded-xl text-xs font-sans-clean text-[#F3EFEA] placeholder:text-[#78746D] focus:outline-none focus:border-emerald-500/50 focus:bg-[#1A1918] transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans-clean rounded-xl"
            >
              {error}
            </motion.div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center p-3.5 rounded-xl bg-[#F3EFEA] text-[#1A1918] text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-white active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Authorize'}
            </button>
          </div>
          
          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-[10px] font-mono-code text-[#78746D] hover:text-[#A39E95] transition-colors cursor-pointer uppercase tracking-wider"
            >
              ← Return to public site
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
