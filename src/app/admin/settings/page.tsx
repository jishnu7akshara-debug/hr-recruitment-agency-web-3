import React from 'react';
import { redirect } from 'next/navigation';
import { getStaffSession } from '@/lib/auth';
import { Mail, Users2, Building2 } from 'lucide-react';

export const revalidate = 0;

export default function SettingsAdminPage() {
  const staff = getStaffSession();
  if (!staff || staff.role !== 'admin') {
    redirect('/admin');
  }

  const staffMembers = [
    {
      name: 'Vikramaditya Rao',
      email: 'admin@talenty.in',
      role: 'admin',
      lastActive: 'Just now',
      status: 'Active',
    },
    {
      name: 'Priya Nair',
      email: 'priya.nair@talenty.in',
      role: 'recruiter',
      lastActive: '2 hours ago',
      status: 'Active',
    },
  ];

  const emailTemplates = [
    {
      id: 'app-conf',
      title: 'Candidate Application Confirmation',
      subject: 'Application Received: [Job Title] ([APP-Code]) - Talenty Consultancy',
      trigger: 'Fires immediately when candidate applies for any public job posting',
    },
    {
      id: 'rec-alert',
      title: 'Recruiter Ingestion Alert',
      subject: '[NEW APPLICATION] [APP-Code] - [Candidate Name] for [Job Title]',
      trigger: 'Fires immediately to recruiting@talenty.in upon candidate application',
    },
    {
      id: 'req-ack',
      title: 'Company Requirement Acknowledgment',
      subject: 'Hiring Requirement Logged ([REQ-Code]) - Talenty Consultancy',
      trigger: 'Fires immediately when client company submits a mandate on /companies',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 shadow-subtle">
        <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
          Governance // Studio Controls
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide mt-1">
          Console Settings & Protocols
        </h1>
        <p className="font-mono text-xs text-stone-500 mt-1">
          Restricted access for Administrator ({staff.name}).
        </p>
      </div>

      {/* 1. Staff Users */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 space-y-5 shadow-subtle">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D9]">
          <div className="flex items-center gap-2.5">
            <Users2 className="w-5 h-5 text-[#9E7E4F]" />
            <h2 className="font-serif text-2xl text-stone-900 font-light">
              Authorized Staff Members
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-500 tracking-wider">RBAC ENFORCED</span>
        </div>

        <div className="divide-y divide-[#E7E2D9] font-mono text-xs">
          {staffMembers.map((m) => (
            <div key={m.email} className="py-3.5 flex items-center justify-between">
              <div>
                <div className="font-serif text-base text-stone-900 font-medium">{m.name}</div>
                <div className="text-[11px] text-stone-500">{m.email}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-[#FAF8F5] border border-[#E7E2D9] text-[#9E7E4F] font-semibold px-2.5 py-0.5 uppercase text-[10px] tracking-wider">
                  {m.role}
                </span>
                <span className="text-emerald-700 font-medium flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Automated Transaction Email Templates */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 space-y-5 shadow-subtle">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D9]">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-[#9E7E4F]" />
            <h2 className="font-serif text-2xl text-stone-900 font-light">
              Transactional Dispatch Templates
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-500 tracking-wider">RESEND / SMTP ENGINE</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {emailTemplates.map((t) => (
            <div key={t.id} className="p-4 bg-[#FAF8F5] border border-[#E7E2D9] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-stone-900 text-sm font-semibold">{t.title}</span>
                <span className="bg-white border border-[#E7E2D9] px-2 py-0.5 text-[10px] text-[#9E7E4F] font-semibold tracking-wider">
                  ACTIVE
                </span>
              </div>
              <div className="text-stone-700">
                <span className="text-stone-500 font-semibold">Subject:</span> {t.subject}
              </div>
              <div className="text-[11px] text-stone-500">
                <span className="text-stone-600 font-semibold">Trigger:</span> {t.trigger}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Company & Agency Contact Parameters */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 space-y-5 shadow-subtle">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D9]">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-[#9E7E4F]" />
            <h2 className="font-serif text-2xl text-stone-900 font-light">
              Corporate Registry & Terms
            </h2>
          </div>
          <span className="font-mono text-xs text-stone-500 tracking-wider">CORPORATE RECORD</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#FAF8F5] border border-[#E7E2D9]">
            <span className="text-stone-500 block text-[10px] uppercase tracking-wider">Legal Entity</span>
            <span className="text-stone-900 font-medium mt-1 block">Treo Consultancy LLP</span>
          </div>
          <div className="p-4 bg-[#FAF8F5] border border-[#E7E2D9]">
            <span className="text-stone-500 block text-[10px] uppercase tracking-wider">Recruitment License</span>
            <span className="text-[#9E7E4F] font-semibold mt-1 block">TLT/HR-KAR/2024/0981</span>
          </div>
          <div className="p-4 bg-[#FAF8F5] border border-[#E7E2D9]">
            <span className="text-stone-500 block text-[10px] uppercase tracking-wider">Standard Permanent Fee</span>
            <span className="text-stone-900 font-medium mt-1 block">8.33% - 12.5% First Year CTC</span>
          </div>
          <div className="p-4 bg-[#FAF8F5] border border-[#E7E2D9]">
            <span className="text-stone-500 block text-[10px] uppercase tracking-wider">Warranty Duration</span>
            <span className="text-stone-900 font-medium mt-1 block">90-Day Free Replacement Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
