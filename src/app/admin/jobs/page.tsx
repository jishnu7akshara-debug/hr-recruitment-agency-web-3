'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Job, WorkMode, JobType, JobStatus } from '@/types';
import {
  Plus,
  Search,
  Download,
  Eye,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    client_label: 'Series-B FinTech Unicorn (Bengaluru)',
    location: 'Bengaluru, Karnataka',
    work_mode: 'Hybrid' as WorkMode,
    type: 'Full-time' as JobType,
    exp_min: 5,
    exp_max: 9,
    lpa_min: 30,
    lpa_max: 48,
    notice_period: 'Immediate to 30 days',
    skills: 'Go, PostgreSQL, Kafka, Kubernetes, Microservices',
    description: 'Lead high-throughput backend services powering mission-critical transaction workloads with sub-100ms SLA.',
    responsibilities: 'Architect distributed backend components\nMentor senior engineers and conduct system design reviews\nLead production deployments with zero downtime',
    must_have: '5+ years experience building scalable backend microservices\nDeep mastery of PostgreSQL or distributed databases\nKafka or event-driven architecture experience',
    good_to_have: 'Kubernetes cluster experience\nFinTech payments experience',
    interview_process: 'Talenty Technical Screening (30 mins)\nLive Concurrency & Architecture Pairing (60 mins)\nSystem Design Review (60 mins)\nCTO Alignment (45 mins)',
    status: 'published' as JobStatus,
    is_published: true,
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/admin/jobs');
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error('Failed fetching jobs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (job: Job) => {
    const nextPublished = !job.is_published;
    const nextStatus: JobStatus = nextPublished ? 'published' : 'draft';

    setJobs((prev) =>
      prev.map((j) =>
        j.id === job.id ? { ...j, is_published: nextPublished, status: nextStatus } : j
      )
    );

    try {
      await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: nextPublished, status: nextStatus }),
      });
    } catch (e) {
      console.error('Failed toggling job status', e);
      fetchJobs();
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSubmitting(true);

    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create job');

      setJobs((prev) => [data.job, ...prev]);
      setIsCreateOpen(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (err: any) {
      setFormError(err.message || 'Error creating job');
    } finally {
      setFormSubmitting(false);
    }
  };

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    return (
      q === '' ||
      j.title.toLowerCase().includes(q) ||
      j.code.toLowerCase().includes(q) ||
      j.client_label.toLowerCase().includes(q) ||
      j.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
            Mandate Management // Curated Catalog
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide mt-1">
            Engineering Job Postings
          </h1>
          <p className="font-mono text-xs text-stone-500 mt-1">
            {jobs.length} Total positions ({jobs.filter((j) => j.is_published).length} live on public portal).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="btn-dark text-xs font-mono tracking-wider py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Requisition</span>
          </button>
          <a
            href="/api/admin/export?type=jobs"
            download="talenty-jobs.csv"
            className="btn-luxury-outline text-xs font-mono tracking-wider py-2.5 px-4 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-[#9E7E4F]" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-[#E7E2D9] p-4 rounded-sm shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search jobs by code (TLT-XXXX), title, client label, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E7E2D9] text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors rounded-sm"
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white border border-[#E7E2D9] rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] text-stone-600 font-mono text-[11px] uppercase tracking-wider border-b border-[#E7E2D9]">
              <th className="py-3.5 px-4 font-semibold">Code / Title</th>
              <th className="py-3.5 px-4 font-semibold">Client Label</th>
              <th className="py-3.5 px-4 font-semibold">Compensation & Exp</th>
              <th className="py-3.5 px-4 font-semibold">Work Mode</th>
              <th className="py-3.5 px-4 font-semibold">Public Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs font-mono">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-400">
                  Loading jobs...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-400">
                  No jobs found matching criteria.
                </td>
              </tr>
            ) : (
              filtered.map((job) => (
                <tr key={job.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-serif text-base text-stone-900 font-medium">
                      {job.title}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span className="bg-[#FAF8F5] border border-[#E7E2D9] text-[#83673C] px-1.5 py-0.2 text-[10px] font-semibold rounded-xs">
                        {job.code}
                      </span>
                      <span>{job.location}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-900 max-w-xs font-medium">{job.client_label}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-900 font-medium">
                      ₹{job.lpa_min} - {job.lpa_max} LPA
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {job.exp_min} - {job.exp_max} Yrs Exp
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-0.5 text-stone-700 rounded-sm">
                      {job.work_mode} · {job.type}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(job)}
                      className={`px-2 py-0.5 border text-xs font-medium transition-all rounded-xs ${
                        job.is_published
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      {job.is_published ? 'LIVE / PUBLISHED' : 'DRAFT / HIDDEN'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/jobs/${job.code}`}
                      target="_blank"
                      className="btn-luxury-outline text-[11px] font-mono tracking-wider py-1.5 px-3 inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3 h-3 text-[#9E7E4F]" /> View Public
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Job Drawer / Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border-l border-[#E7E2D9] shadow-2xl min-h-screen p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D9]">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
                  Requisition Authoring
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-light mt-0.5">
                  Publish New Requisition
                </h3>
              </div>
              <button onClick={() => setIsCreateOpen(false)} className="p-1 hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors rounded-sm">
                <X className="w-6 h-6" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono rounded-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateJob} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Staff Full Stack Engineer (Next.js & Go)"
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                    Anonymous Client Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client_label}
                    onChange={(e) => setFormData({ ...formData, client_label: e.target.value })}
                    placeholder="Series-B FinTech Unicorn (Bengaluru)"
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Bengaluru, Karnataka"
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">Work Mode</label>
                  <select
                    value={formData.work_mode}
                    onChange={(e) =>
                      setFormData({ ...formData, work_mode: e.target.value as WorkMode })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as JobType })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Contract-to-Hire">Contract-to-Hire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">Min LPA</label>
                  <input
                    type="number"
                    value={formData.lpa_min}
                    onChange={(e) =>
                      setFormData({ ...formData, lpa_min: parseFloat(e.target.value) })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">Max LPA</label>
                  <input
                    type="number"
                    value={formData.lpa_max}
                    onChange={(e) =>
                      setFormData({ ...formData, lpa_max: parseFloat(e.target.value) })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">Min Exp (Yrs)</label>
                  <input
                    type="number"
                    value={formData.exp_min}
                    onChange={(e) =>
                      setFormData({ ...formData, exp_min: parseInt(e.target.value, 10) })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">Max Exp (Yrs)</label>
                  <input
                    type="number"
                    value={formData.exp_max}
                    onChange={(e) =>
                      setFormData({ ...formData, exp_max: parseInt(e.target.value, 10) })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">Notice Period</label>
                  <input
                    type="text"
                    value={formData.notice_period}
                    onChange={(e) => setFormData({ ...formData, notice_period: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                  Skills (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Next.js, React, TypeScript, Go, PostgreSQL, Kafka, Docker"
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                />
              </div>

              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                  Description &amp; Architectural Context *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] p-2.5 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                  Responsibilities (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] p-2.5 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                  Must-Have Requirements (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.must_have}
                  onChange={(e) => setFormData({ ...formData, must_have: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] p-2.5 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                  Interview Process Stages (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.interview_process}
                  onChange={(e) => setFormData({ ...formData, interview_process: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] p-2.5 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                ></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="btn-luxury-outline py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="btn-dark py-2 px-6 shadow-sm"
                >
                  {formSubmitting ? 'Publishing...' : 'Publish to /jobs'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
