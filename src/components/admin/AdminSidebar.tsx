'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StaffUser } from '@/lib/auth';
import {
  LayoutDashboard,
  Inbox,
  Building2,
  Users2,
  Briefcase,
  DollarSign,
  Settings,
  ArrowUpRight,
} from 'lucide-react';

export default function AdminSidebar({ staff }: { staff: StaffUser }) {
  const pathname = usePathname();

  // If on login page, don't show sidebar
  if (pathname === '/admin/login') return null;

  const links = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Applications', href: '/admin/applications', icon: Inbox },
    { label: 'Requirements', href: '/admin/requirements', icon: Building2 },
    { label: 'Candidate Vault', href: '/admin/candidates', icon: Users2 },
    { label: 'Job Postings', href: '/admin/jobs', icon: Briefcase },
    { label: 'Commissions', href: '/admin/commissions', icon: DollarSign },
    ...(staff.role === 'admin'
      ? [{ label: 'Settings', href: '/admin/settings', icon: Settings }]
      : []),
  ];

  return (
    <aside className="w-full md:w-64 bg-white text-stone-900 border-r border-[#E7E2D9] flex flex-col shrink-0 shadow-xs">
      {/* Brand header */}
      <div className="p-5 border-b border-[#E7E2D9] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#9E7E4F] text-white flex items-center justify-center font-mono font-bold text-xs tracking-wider rounded-sm shadow-xs">
            TR
          </div>
          <div>
            <div className="font-serif text-lg tracking-wider text-stone-900 font-light">
              TREO<span className="text-[#9E7E4F]">.</span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#9E7E4F] font-semibold">
              Studio Admin Console
            </div>
          </div>
        </div>
      </div>

      {/* Staff profile summary */}
      <div className="p-4 bg-[#FAF8F5] border-b border-[#E7E2D9] font-mono text-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-stone-900 font-semibold truncate">{staff.name}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-stone-500">
          <span className="uppercase text-[#83673C] tracking-wider font-medium">{staff.role} access</span>
          <span className="tracking-widest font-semibold text-emerald-600">ONLINE</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1">
        {links.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono tracking-wider transition-all rounded-sm ${
                isActive
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Live Site Link */}
      <div className="p-4 border-t border-[#E7E2D9] font-mono text-xs">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-stone-700 hover:text-[#9E7E4F] p-2 bg-[#FAF8F5] border border-[#E7E2D9] hover:border-[#9E7E4F]/50 transition-colors rounded-sm"
        >
          <span>View Public Portal</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
