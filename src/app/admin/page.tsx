import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getStaffSession } from '@/lib/auth';
import { DataStore } from '@/lib/store';
import {
  Inbox,
  Building2,
  Users2,
  Briefcase,
  PlusCircle,
  Activity,
} from 'lucide-react';

export const revalidate = 0;

export default function AdminDashboardPage() {
  const staff = getStaffSession();
  if (!staff) {
    redirect('/admin/login');
  }

  const stats = DataStore.getDashboardStats();

  const pipelineStages: { label: string; count: number; color: string }[] = [
    { label: 'New', count: stats.pipelineCounts.New, color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { label: 'Screening', count: stats.pipelineCounts.Screening, color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { label: 'Submitted to client', count: stats.pipelineCounts['Submitted to client'], color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { label: 'Interview', count: stats.pipelineCounts.Interview, color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { label: 'Offered', count: stats.pipelineCounts.Offered, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { label: 'Joined', count: stats.pipelineCounts.Joined, color: 'bg-green-100 text-green-900 border-green-300' },
    { label: 'Rejected', count: stats.pipelineCounts.Rejected, color: 'bg-stone-100 text-stone-600 border-stone-200' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Studio Banner */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
            Executive Studio // Talent Pipeline Overview
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide mt-1">
            Welcome back, <span className="font-editorial-italic text-[#9E7E4F]">{staff.name}</span>
          </h1>
          <p className="font-mono text-xs text-stone-500 mt-1">
            Database Cluster: Connected · Active Ingestion: 100% · Real-time Sync Active
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link
            href="/admin/jobs?create=true"
            className="btn-dark text-xs font-mono tracking-wider py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Requisition</span>
          </Link>
          <Link
            href="/admin/applications"
            className="btn-luxury-outline text-xs font-mono tracking-wider py-2.5 px-4"
          >
            Review Applications
          </Link>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Published Jobs */}
        <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-sm flex flex-col justify-between hover:border-[#9E7E4F] transition-colors group">
          <div className="flex items-center justify-between text-stone-500">
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">Published Roles</span>
            <Briefcase className="w-4 h-4 text-[#9E7E4F]" />
          </div>
          <div className="mt-5 flex items-baseline justify-between">
            <span className="font-serif text-4xl font-light text-stone-900 group-hover:text-[#9E7E4F] transition-colors">
              {stats.liveJobs}
            </span>
            <Link
              href="/admin/jobs"
              className="font-mono text-xs text-stone-500 hover:text-[#9E7E4F] flex items-center gap-1 transition-colors font-medium"
            >
              Manage &rarr;
            </Link>
          </div>
        </div>

        {/* Card 2: Active Applications */}
        <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-sm flex flex-col justify-between hover:border-[#9E7E4F] transition-colors group">
          <div className="flex items-center justify-between text-stone-500">
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">Active Applications</span>
            <Inbox className="w-4 h-4 text-[#9E7E4F]" />
          </div>
          <div className="mt-5 flex items-baseline justify-between">
            <span className="font-serif text-4xl font-light text-stone-900 group-hover:text-[#9E7E4F] transition-colors">
              {stats.activeApplications}
            </span>
            <Link
              href="/admin/applications"
              className="font-mono text-xs text-stone-500 hover:text-[#9E7E4F] flex items-center gap-1 transition-colors font-medium"
            >
              Pipeline &rarr;
            </Link>
          </div>
        </div>

        {/* Card 3: Open Mandates */}
        <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-sm flex flex-col justify-between hover:border-[#9E7E4F] transition-colors group">
          <div className="flex items-center justify-between text-stone-500">
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">Open Mandates</span>
            <Building2 className="w-4 h-4 text-[#9E7E4F]" />
          </div>
          <div className="mt-5 flex items-baseline justify-between">
            <span className="font-serif text-4xl font-light text-stone-900 group-hover:text-[#9E7E4F] transition-colors">
              {stats.openRequirements}
            </span>
            <Link
              href="/admin/requirements"
              className="font-mono text-xs text-stone-500 hover:text-[#9E7E4F] flex items-center gap-1 transition-colors font-medium"
            >
              Sourcing &rarr;
            </Link>
          </div>
        </div>

        {/* Card 4: Candidate Vault */}
        <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-sm flex flex-col justify-between hover:border-[#9E7E4F] transition-colors group">
          <div className="flex items-center justify-between text-stone-500">
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">Candidate Vault</span>
            <Users2 className="w-4 h-4 text-[#9E7E4F]" />
          </div>
          <div className="mt-5 flex items-baseline justify-between">
            <span className="font-serif text-4xl font-light text-stone-900 group-hover:text-[#9E7E4F] transition-colors">
              {stats.candidateProfiles}
            </span>
            <Link
              href="/admin/candidates"
              className="font-mono text-xs text-stone-500 hover:text-[#9E7E4F] flex items-center gap-1 transition-colors font-medium"
            >
              Database &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Pipeline Velocity Breakdown */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E2D9] mb-6 gap-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
              Talent Velocity // 7 Pipeline Stages
            </div>
            <h2 className="font-serif text-2xl text-stone-900 font-light mt-0.5">
              Live Applications by Stage
            </h2>
          </div>
          <Link
            href="/admin/applications"
            className="btn-luxury-outline text-xs font-mono tracking-wider py-1.5 px-3 self-start sm:self-auto"
          >
            Open Interactive Pipeline
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {pipelineStages.map((stage) => (
            <Link
              key={stage.label}
              href={`/admin/applications?status=${encodeURIComponent(stage.label)}`}
              className={`p-3.5 border rounded-sm ${stage.color} hover:shadow-sm transition-all`}
            >
              <div className="font-mono text-[10px] uppercase tracking-wider font-semibold truncate">
                {stage.label}
              </div>
              <div className="font-serif text-2xl font-light mt-1">
                {stage.count}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Columns: Revenue & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Commission Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D9] mb-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
                  Financial Performance
                </div>
                <h3 className="font-serif text-2xl text-stone-900 font-light mt-0.5">
                  Placement Commissions
                </h3>
              </div>
              <Link
                href="/admin/commissions"
                className="font-mono text-xs text-[#9E7E4F] hover:underline font-semibold"
              >
                Tracker &rarr;
              </Link>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-[#FAF8F5] border border-[#E7E2D9] rounded-sm">
                <div className="font-mono text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                  Expected Placement Revenue
                </div>
                <div className="font-serif text-3xl font-light text-stone-900 mt-1">
                  ₹{stats.expectedRevenueLPA.toFixed(2)} <span className="font-mono text-sm text-[#9E7E4F] font-semibold">LPA</span>
                </div>
                <div className="font-mono text-[10px] text-stone-500 mt-1">
                  Active placements awaiting joining or invoice clearance.
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm">
                <div className="font-mono text-[11px] text-emerald-800 uppercase tracking-wider font-bold">
                  Received Revenue (Settled)
                </div>
                <div className="font-serif text-3xl font-light text-emerald-900 mt-1">
                  ₹{stats.receivedRevenueLPA.toFixed(2)} <span className="font-mono text-sm text-emerald-700 font-semibold">LPA</span>
                </div>
                <div className="font-mono text-[10px] text-emerald-700 mt-1">
                  Verified payments cleared by accounts desk.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E7E2D9] mt-6 font-mono text-xs text-stone-500">
            Standard Mandate SLA: 8.33% - 12.5% CTC with 90-day replacement warranty.
          </div>
        </div>

        {/* Right: Activity Log Feed (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D9] mb-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
                System Audit Log
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-light mt-0.5">
                Recent Pipeline Activity
              </h3>
            </div>
            <Activity className="w-4 h-4 text-[#9E7E4F]" />
          </div>

          <div className="space-y-3">
            {stats.recentActivity.map((log) => (
              <div
                key={log.id}
                className="p-3.5 bg-[#FAF8F5] border border-[#E7E2D9] hover:border-stone-300 text-xs font-mono space-y-1 transition-colors rounded-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">{log.action}</span>
                  <span className="text-[10px] text-stone-400">
                    {new Date(log.created_at).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500">
                  By: <span className="text-[#83673C] font-semibold">{log.performed_by}</span> · Entity: {log.entity_type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
