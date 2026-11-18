'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, AlertCircle, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@talenty.in');
  const [password, setPassword] = useState('talenty@2024');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (role: 'admin' | 'recruiter') => {
    if (role === 'admin') {
      setEmail('admin@talenty.in');
      setPassword('talenty@2024');
    } else {
      setEmail('priya.nair@talenty.in');
      setPassword('recruiter@2024');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col justify-center py-16 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2 relative z-10">
        <Link href="/" className="inline-block">
          <span className="font-serif text-3xl sm:text-4xl tracking-luxury font-light text-stone-900 block uppercase">
            TALENTY<span className="text-[#9E7E4F]">.</span>
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-[#9E7E4F] font-semibold block mt-0.5">
            Staff Recruiter Console
          </span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white border border-[#E7E2D9] p-8 sm:p-10 rounded-sm shadow-xl space-y-6">
          <div className="border-b border-[#E7E2D9] pb-4">
            <span className="text-[10px] uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
              AUTHENTICATION GATEWAY
            </span>
            <h2 className="font-serif text-2xl text-stone-900 mt-1">Staff Access</h2>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@talenty.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E7E2D9] text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E7E2D9] text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-dark w-full py-3 text-xs tracking-wider uppercase font-semibold"
            >
              {loading ? 'Authenticating...' : 'Sign In to Console'}
            </button>
          </form>

          {/* Quick autofill demo cards */}
          <div className="pt-4 border-t border-[#E7E2D9] space-y-2.5">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block font-semibold">
              PRESET CREDENTIALS:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => setDemoCredentials('admin')}
                className="p-2.5 bg-[#FAF8F5] hover:bg-stone-100 border border-[#E7E2D9] text-left transition-colors rounded-sm"
              >
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <KeyRound className="w-3 h-3 text-[#9E7E4F]" />
                  <span>Admin</span>
                </div>
                <div className="text-[10px] text-stone-500 truncate">admin@talenty.in</div>
              </button>

              <button
                type="button"
                onClick={() => setDemoCredentials('recruiter')}
                className="p-2.5 bg-[#FAF8F5] hover:bg-stone-100 border border-[#E7E2D9] text-left transition-colors rounded-sm"
              >
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <KeyRound className="w-3 h-3 text-[#9E7E4F]" />
                  <span>Recruiter</span>
                </div>
                <div className="text-[10px] text-stone-500 truncate">priya.nair@talenty.in</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
