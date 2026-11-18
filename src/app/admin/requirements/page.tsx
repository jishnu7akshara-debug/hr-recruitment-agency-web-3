'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Requirement, RequirementStatus } from '@/types';
import {
  Search,
  Download,
  CheckCircle2,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STATUS_OPTIONS: RequirementStatus[] = ['Open', 'Sourcing', 'Shortlist sent', 'Closed'];

const STATUS_BADGES: Record<RequirementStatus, string> = {
  Open: 'bg-blue-50 text-blue-800 border-blue-200',
  Sourcing: 'bg-amber-50 text-amber-800 border-amber-200',
  'Shortlist sent': 'bg-purple-50 text-purple-800 border-purple-200',
  Closed: 'bg-stone-100 text-stone-600 border-stone-200',
};

export default function RequirementsAdminPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [convertedJobAlert, setConvertedJobAlert] = useState<{
    code: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const res = await fetch('/api/admin/requirements');
      const data = await res.json();
      if (data.requirements) {
        setRequirements(data.requirements);
      }
    } catch (err) {
      console.error('Failed fetching requirements', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reqId: string, newStatus: RequirementStatus) => {
    try {
      setRequirements((prev) =>
        prev.map((r) => (r.id === reqId ? { ...r, status: newStatus } : r))
      );

      await fetch(`/api/admin/requirements/${reqId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.error('Status change error', e);
      fetchRequirements();
    }
  };

  const handleConvertToJob = async (reqId: string) => {
    setConvertingId(reqId);
    try {
      const res = await fetch(`/api/admin/requirements/${reqId}/convert`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to convert');

      setConvertedJobAlert({ code: data.job.code, title: data.job.title });
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      fetchRequirements();
    } catch (err) {
      console.error('Error converting requirement', err);
      alert('Failed to convert requirement to job');
    } finally {
      setConvertingId(null);
    }
  };

  const filtered = requirements.filter((r) => {
    const matchesSearch =
      search === '' ||
      r.company_name.toLowerCase().includes(search.toLowerCase()) ||
      r.contact_person.toLowerCase().includes(search.toLowerCase()) ||
      r.roles_needed.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
            Corporate Mandates // Enterprise Intake
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide mt-1">
            Company Requirements
          </h1>
          <p className="font-mono text-xs text-stone-500 mt-1">
            {requirements.length} Active hiring mandates from venture-backed startups and enterprises.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/export?type=requirements"
            download="talenty-requirements.csv"
            className="btn-luxury-outline text-xs font-mono tracking-wider py-2.5 px-4 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-[#9E7E4F]" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Conversion Banner Alert */}
      {convertedJobAlert && (
        <div className="p-4 bg-[#FAF8F5] text-stone-900 border border-[#9E7E4F] shadow-sm rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-stone-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>
              CONVERTED TO PUBLIC JOB: {convertedJobAlert.code} &mdash; {convertedJobAlert.title}!
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/jobs/${convertedJobAlert.code}`}
              target="_blank"
              className="bg-stone-900 text-white px-3 py-1 font-bold hover:bg-black flex items-center gap-1 transition-colors rounded-xs"
            >
              <span>View On Public Site</span>
              <ExternalLink className="w-3 h-3 text-[#EADCC9]" />
            </Link>
            <button
              onClick={() => setConvertedJobAlert(null)}
              className="px-2 py-1 font-bold hover:underline text-stone-600"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E7E2D9] p-4 rounded-sm shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search company, contact person, roles needed, or code (REQ-XXX)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E7E2D9] text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors rounded-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FAF8F5] border border-[#E7E2D9] px-3.5 py-2 text-xs font-mono text-stone-700 focus:border-[#9E7E4F] focus:outline-none rounded-sm font-medium"
          >
            <option value="all">Status: All</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Requirements Table */}
      <div className="bg-white border border-[#E7E2D9] rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] text-stone-600 font-mono text-[11px] uppercase tracking-wider border-b border-[#E7E2D9]">
              <th className="py-3.5 px-4 font-semibold">Code / Company</th>
              <th className="py-3.5 px-4 font-semibold">Roles & Headcount</th>
              <th className="py-3.5 px-4 font-semibold">Budget & Model</th>
              <th className="py-3.5 px-4 font-semibold">Urgency</th>
              <th className="py-3.5 px-4 font-semibold">Mandate Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs font-mono">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-400">
                  Loading corporate requirements...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-400">
                  No requirements found matching filters.
                </td>
              </tr>
            ) : (
              filtered.map((req) => (
                <tr key={req.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-serif text-base text-stone-900 font-medium">
                      {req.company_name}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span className="bg-[#FAF8F5] border border-[#E7E2D9] text-[#83673C] px-1.5 py-0.2 text-[10px] font-semibold rounded-xs">
                        {req.code}
                      </span>
                      <span>{req.contact_person}</span>
                      <span>·</span>
                      <span>{req.work_email}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-900 max-w-xs font-medium">{req.roles_needed}</div>
                    <div className="text-[10px] text-stone-500">
                      Target Headcount: <span className="text-[#83673C] font-semibold">{req.headcount} Hires</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-900 font-medium">
                      ₹{req.budget_lpa_min} - {req.budget_lpa_max} LPA
                    </div>
                    <div className="text-[10px] text-stone-500 uppercase">{req.engagement_model}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-0.5 text-stone-700 rounded-sm">
                      {req.urgency}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req.id, e.target.value as RequirementStatus)
                      }
                      className={`text-xs font-mono font-medium px-2 py-1 border cursor-pointer rounded-sm focus:outline-none ${
                        STATUS_BADGES[req.status]
                      }`}
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st} className="bg-white text-stone-900">
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleConvertToJob(req.id)}
                      disabled={convertingId === req.id}
                      className="btn-dark text-[11px] font-mono tracking-wider py-1.5 px-3 rounded-xs"
                      title="Convert this requirement into a live public job posting"
                    >
                      {convertingId === req.id ? (
                        'Converting...'
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3 text-[#EADCC9]" /> Convert to Job
                        </span>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
