'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { StaffUser } from '@/lib/auth';
import { LogOut } from 'lucide-react';

export default function AdminTopNav({ staff }: { staff: StaffUser }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-[#E7E2D9] px-6 flex items-center justify-between shrink-0 shadow-xs">
      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="tracking-widest uppercase text-stone-400 font-semibold">Environment:</span>
        <span className="bg-[#FAF8F5] border border-[#E7E2D9] px-2.5 py-0.5 text-[#83673C] tracking-wider text-[11px] font-semibold rounded-sm">
          TREO EXECUTIVE STUDIO // LIVE RECRUITMENT PIPELINE
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors rounded-sm font-semibold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Session</span>
        </button>
      </div>
    </header>
  );
}
