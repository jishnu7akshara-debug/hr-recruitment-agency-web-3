import React from 'react';
import { Metadata } from 'next';
import { DataStore } from '@/lib/store';
import JobsExplorer from '@/components/jobs/JobsExplorer';
import { JobFilterParams } from '@/types';

export const metadata: Metadata = {
  title: 'Curated Open Roles | Talenty Consultancy',
  description:
    'Browse verified Staff Engineer, Backend Architect, DevOps, and Data Leadership requisitions across Bengaluru, Hyderabad, and Gurugram.',
};

export const revalidate = 0;

interface JobsPageProps {
  searchParams: {
    search?: string;
    skill?: string;
    location?: string;
    work_mode?: string;
    type?: string;
    exp_min?: string;
    page?: string;
  };
}

export default function JobsPage({ searchParams }: JobsPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 9;

  const filters: JobFilterParams = {
    search: searchParams.search,
    skill: searchParams.skill,
    location: searchParams.location,
    work_mode: searchParams.work_mode,
    type: searchParams.type,
    exp_min: searchParams.exp_min ? parseFloat(searchParams.exp_min) : undefined,
    page,
    limit,
  };

  const { jobs, total, totalPages } = DataStore.getJobs(filters);

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-14 pb-8 border-b border-[#E7E2D9] space-y-3">
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            CURATED POSITIONS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-stone-900 tracking-tight">
            Open Engineering <span className="font-editorial-italic text-[#9E7E4F]">Requisitions</span>
          </h1>
          <p className="text-base text-stone-600 max-w-3xl font-sans font-normal leading-relaxed">
            Every opening represents a direct, pre-budgeted corporate mandate from venture-backed unicorns and global enterprise engineering hubs. Transparent compensation, real distributed scale, fast-tracked loops.
          </p>
        </div>

        {/* Interactive Jobs Explorer */}
        <JobsExplorer
          initialJobs={jobs}
          total={total}
          totalPages={totalPages}
          currentPage={page}
        />
      </div>
    </div>
  );
}
