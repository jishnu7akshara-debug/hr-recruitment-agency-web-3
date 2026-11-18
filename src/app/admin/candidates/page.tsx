'use client';

import React, { useState, useEffect } from 'react';
import { Candidate } from '@/types';
import { Search, Download, FileText } from 'lucide-react';

export default function CandidatesAdminPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [noticeFilter, setNoticeFilter] = useState('all');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch('/api/admin/candidates');
      const data = await res.json();
      if (data.candidates) {
        setCandidates(data.candidates);
      }
    } catch (err) {
      console.error('Failed fetching candidates', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = candidates.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      q === '' ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      (c.current_company && c.current_company.toLowerCase().includes(q)) ||
      c.skills.some((s) => s.toLowerCase().includes(q));

    const matchesSkill =
      !skillFilter || c.skills.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()));

    const matchesNotice =
      noticeFilter === 'all' || c.notice_period.toLowerCase().includes(noticeFilter.toLowerCase());

    return matchesSearch && matchesSkill && matchesNotice;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
            Talent Repository // Curated Vault
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide mt-1">
            Candidate Vault
          </h1>
          <p className="font-mono text-xs text-stone-500 mt-1">
            {candidates.length} Profiles indexed with verified compensation, architectural skills, and DPDP consent.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/export?type=candidates"
            download="talenty-candidates.csv"
            className="btn-luxury-outline text-xs font-mono tracking-wider py-2.5 px-4 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-[#9E7E4F]" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-[#E7E2D9] p-4 rounded-sm shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search candidate by skill, name, code (CAN-XXX), company, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E7E2D9] text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors rounded-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Filter by Skill..."
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="bg-[#FAF8F5] border border-[#E7E2D9] px-3.5 py-2 text-xs font-mono text-stone-700 placeholder-stone-400 focus:border-[#9E7E4F] focus:outline-none w-36 rounded-sm font-medium"
          />

          <select
            value={noticeFilter}
            onChange={(e) => setNoticeFilter(e.target.value)}
            className="bg-[#FAF8F5] border border-[#E7E2D9] px-3.5 py-2 text-xs font-mono text-stone-700 focus:border-[#9E7E4F] focus:outline-none rounded-sm font-medium"
          >
            <option value="all">Notice: All</option>
            <option value="immediate">Immediate</option>
            <option value="15">15 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60+ Days</option>
          </select>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white border border-[#E7E2D9] rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] text-stone-600 font-mono text-[11px] uppercase tracking-wider border-b border-[#E7E2D9]">
              <th className="py-3.5 px-4 font-semibold">Code / Candidate</th>
              <th className="py-3.5 px-4 font-semibold">Current Org & Role</th>
              <th className="py-3.5 px-4 font-semibold">Experience & CTC</th>
              <th className="py-3.5 px-4 font-semibold">Core Skills</th>
              <th className="py-3.5 px-4 font-semibold">Notice & Location</th>
              <th className="py-3.5 px-4 font-semibold text-right">Dossier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs font-mono">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-400">
                  Loading candidate vault...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-400">
                  No candidates match the specified criteria.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-serif text-base text-stone-900 font-medium">{c.name}</div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                      <span className="bg-[#FAF8F5] border border-[#E7E2D9] text-[#83673C] px-1.5 py-0.2 text-[10px] font-semibold rounded-xs">
                        {c.code}
                      </span>
                      <span>{c.email}</span>
                      <span>·</span>
                      <span>{c.phone}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-900 font-medium">
                      {c.current_company || 'Undisclosed Firm'}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {c.current_designation || 'Engineer'}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-800">{c.total_experience} Years</div>
                    <div className="text-[11px] text-stone-500">
                      Cur: ₹{c.current_ctc}L &rarr; <span className="text-[#9E7E4F] font-semibold">Exp: ₹{c.expected_ctc}L</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {c.skills.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="bg-[#FAF8F5] border border-[#E7E2D9] px-1.5 py-0.5 text-[10px] text-stone-700 rounded-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-800">{c.notice_period}</div>
                    <div className="text-[10px] text-stone-500">{c.location}</div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {c.resume_url ? (
                      <a
                        href={c.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-luxury-outline text-[11px] font-mono tracking-wider py-1.5 px-3 inline-flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-[#9E7E4F]" /> CV
                      </a>
                    ) : (
                      <span className="text-stone-300 font-mono text-xs">No file</span>
                    )}
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
