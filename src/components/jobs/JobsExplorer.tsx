'use client';

import React, { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Job } from '@/types';
import { Search, ArrowRight, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import ApplyModal from './ApplyModal';

interface JobsExplorerProps {
  initialJobs: Job[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// Photography mapping for roles
const JOB_IMAGES: Record<string, string> = {
  'TLT-2041': 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  'TLT-2042': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  'TLT-2043': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  'TLT-2044': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  'TLT-2045': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  'TLT-2046': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  'TLT-2047': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  'TLT-2048': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  'TLT-2049': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
  'TLT-2050': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  'TLT-2051': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
};

export default function JobsExplorer({
  initialJobs,
  total,
  totalPages,
  currentPage,
}: JobsExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [activeJobForApply, setActiveJobForApply] = useState<Job | null>(null);

  const search = searchParams.get('search') || '';
  const skill = searchParams.get('skill') || '';
  const location = searchParams.get('location') || '';
  const workMode = searchParams.get('work_mode') || 'all';
  const jobType = searchParams.get('type') || 'all';

  const updateFilters = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === '' || val === 'all') {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });

    if (!('page' in newParams)) {
      params.delete('page');
    }

    startTransition(() => {
      router.push(`/jobs?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    startTransition(() => {
      router.push('/jobs');
    });
  };

  const activeFilterCount = [
    search,
    skill,
    location,
    workMode !== 'all' ? workMode : '',
    jobType !== 'all' ? jobType : '',
  ].filter(Boolean).length;

  return (
    <div className="space-y-10">
      {/* Search & Top Controls */}
      <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by role title, tech stack (Next.js, Go, Kubernetes), or requisition code..."
              defaultValue={search}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateFilters({ search: (e.target as HTMLInputElement).value });
                }
              }}
              onBlur={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#E7E2D9] text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors font-sans"
            />
          </div>

          {/* Quick Selects */}
          <div className="flex flex-wrap items-center gap-3 font-sans text-xs">
            <select
              value={workMode}
              onChange={(e) => updateFilters({ work_mode: e.target.value })}
              className="bg-[#FAF8F5] border border-[#E7E2D9] text-stone-700 px-3.5 py-3 focus:border-[#9E7E4F] focus:outline-none uppercase tracking-wider font-medium"
            >
              <option value="all">Work Mode: All</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            <select
              value={jobType}
              onChange={(e) => updateFilters({ type: e.target.value })}
              className="bg-[#FAF8F5] border border-[#E7E2D9] text-stone-700 px-3.5 py-3 focus:border-[#9E7E4F] focus:outline-none uppercase tracking-wider font-medium"
            >
              <option value="all">Engagement: All</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Contract-to-Hire">Contract-to-Hire</option>
            </select>

            <select
              value={location}
              onChange={(e) => updateFilters({ location: e.target.value })}
              className="bg-[#FAF8F5] border border-[#E7E2D9] text-stone-700 px-3.5 py-3 focus:border-[#9E7E4F] focus:outline-none uppercase tracking-wider font-medium"
            >
              <option value="">Location: All</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Gurugram">Gurugram / NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Remote">Remote</option>
            </select>

            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="px-3.5 py-3 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 flex items-center gap-1.5 uppercase tracking-wider font-semibold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Skill Badges */}
        <div className="mt-5 pt-5 border-t border-[#E7E2D9] flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase font-sans tracking-luxury text-stone-500 mr-2 font-semibold">
            STACKS:
          </span>
          {['Go', 'Next.js', 'Kubernetes', 'Java 21', 'PySpark', 'Python', 'AWS', 'Swift', 'TypeScript'].map(
            (s) => {
              const isSelected = skill.toLowerCase() === s.toLowerCase();
              return (
                <button
                  key={s}
                  onClick={() => updateFilters({ skill: isSelected ? null : s })}
                  className={`text-xs font-sans px-3.5 py-1 rounded-full transition-all tracking-wide ${
                    isSelected
                      ? 'bg-stone-900 text-white font-semibold shadow-xs'
                      : 'bg-[#FAF8F5] border border-[#E7E2D9] text-stone-600 hover:text-stone-900 hover:border-[#9E7E4F]'
                  }`}
                >
                  {s}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-sans uppercase tracking-luxury text-stone-500 border-b border-[#E7E2D9] pb-3">
        <div>
          Showing <span className="text-[#9E7E4F] font-semibold">{initialJobs.length}</span> of {total} Requisitions
        </div>
        {isPending && (
          <div className="flex items-center gap-2 text-[#9E7E4F]">
            <span className="w-2 h-2 rounded-full bg-[#9E7E4F] animate-ping"></span>
            <span>FILTERING REQUISITIONS...</span>
          </div>
        )}
      </div>

      {/* Empty State */}
      {initialJobs.length === 0 ? (
        <div className="bg-white border border-[#E7E2D9] p-16 text-center rounded-sm space-y-4 shadow-sm">
          <SlidersHorizontal className="w-10 h-10 text-[#9E7E4F] mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
            No Requisitions Match These Filters
          </h3>
          <p className="text-sm text-stone-600 max-w-md mx-auto font-sans font-normal">
            Try adjusting your search keywords, location, or tech stack filters to discover open roles.
          </p>
          <button onClick={handleClearFilters} className="btn-dark mt-2">
            Reset All Filters
          </button>
        </div>
      ) : (
        /* Curated Job Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialJobs.map((job) => {
            const image = JOB_IMAGES[job.code] || 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80';
            return (
              <div
                key={job.id}
                className="bg-white border border-[#E7E2D9] hover:border-[#9E7E4F] rounded-sm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Photo Top Frame */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                    <img
                      src={image}
                      alt={job.title}
                      className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-sans uppercase tracking-luxury px-2.5 py-0.5 rounded-sm border border-stone-200 font-semibold shadow-xs">
                        {job.work_mode} · {job.type}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 font-mono text-[11px] text-white bg-black/70 px-2 py-0.5 rounded-sm font-medium">
                      {job.code}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-stone-900 group-hover:text-[#9E7E4F] transition-colors leading-snug">
                      <Link href={`/jobs/${job.code}`}>{job.title}</Link>
                    </h3>

                    <p className="text-xs text-stone-600 font-sans">
                      Client: <span className="text-stone-900 font-medium">{job.client_label}</span>
                    </p>

                    <p className="text-xs text-stone-600 font-sans font-normal line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {job.skills.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-sans px-2.5 py-0.5 bg-[#FAF8F5] border border-[#E7E2D9] text-stone-700 rounded-sm font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="p-6 pt-4 border-t border-[#E7E2D9] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-luxury text-stone-500 block">
                      ANNUAL COMPENSATION
                    </span>
                    <span className="font-serif text-xl text-[#9E7E4F] font-medium">
                      ₹{job.lpa_min} - {job.lpa_max} LPA
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/jobs/${job.code}`}
                      className="btn-luxury-outline text-xs py-2 px-3.5"
                    >
                      Spec
                    </Link>
                    <button
                      onClick={() => setActiveJobForApply(job)}
                      className="btn-dark text-xs py-2 px-4 shadow-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white border border-[#E7E2D9] p-4 rounded-sm flex items-center justify-between text-xs font-sans uppercase tracking-luxury text-stone-600 shadow-sm">
          <button
            onClick={() => updateFilters({ page: Math.max(1, currentPage - 1) })}
            disabled={currentPage <= 1}
            className="btn-luxury-outline py-2 px-4 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>

          <div>
            Page <span className="text-[#9E7E4F] font-semibold">{currentPage}</span> of {totalPages}
          </div>

          <button
            onClick={() => updateFilters({ page: Math.min(totalPages, currentPage + 1) })}
            disabled={currentPage >= totalPages}
            className="btn-luxury-outline py-2 px-4 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Apply Modal */}
      {activeJobForApply && (
        <ApplyModal
          job={activeJobForApply}
          isOpen={!!activeJobForApply}
          onClose={() => setActiveJobForApply(null)}
        />
      )}
    </div>
  );
}
