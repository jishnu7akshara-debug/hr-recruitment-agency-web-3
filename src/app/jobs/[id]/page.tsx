import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { DataStore } from '@/lib/store';
import JobDetailClient from '@/components/jobs/JobDetailClient';
import {
  ArrowLeft,
  CheckCircle2,
  Award,
} from 'lucide-react';

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = DataStore.getJobById(params.id);
  if (!job) {
    return { title: 'Job Not Found | Talenty Consultancy' };
  }

  return {
    title: `${job.title} (${job.code}) | Talenty Consultancy`,
    description: `${job.title} at ${job.client_label}. CTC: ₹${job.lpa_min} - ${job.lpa_max} LPA. Location: ${job.location}. Apply through Talenty.`,
  };
}

export default function JobDetailPage({ params }: Props) {
  const job = DataStore.getJobById(params.id);

  if (!job) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Talenty Consultancy',
      value: job.code,
    },
    datePosted: job.created_at,
    employmentType: job.type === 'Full-time' ? 'FULL_TIME' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.client_label,
      sameAs: 'https://talenty.in',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'IN',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.lpa_min * 100000,
        maxValue: job.lpa_max * 100000,
        unitText: 'YEAR',
      },
    },
    skills: job.skills.join(', '),
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between font-sans text-xs uppercase tracking-luxury text-stone-500">
          <Link href="/jobs" className="flex items-center gap-2 hover:text-[#9E7E4F] transition-colors font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Requisitions
          </Link>
          <span className="font-mono text-[11px] text-[#9E7E4F] bg-[#9E7E4F]/10 px-2.5 py-0.5 rounded-sm font-semibold">
            {job.code}
          </span>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-[#E7E2D9] p-8 sm:p-12 rounded-sm shadow-sm space-y-8 relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#9E7E4F]/10 text-[#83673C] border border-[#9E7E4F]/30 text-xs font-sans uppercase tracking-luxury px-3 py-1 rounded-sm font-semibold">
                {job.work_mode} · {job.type}
              </span>
              <span className="text-xs font-sans text-stone-500">
                Posted {new Date(job.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 tracking-tight leading-tight">
              {job.title}
            </h1>

            <p className="text-sm font-sans text-stone-600">
              Client: <span className="text-stone-900 font-medium">{job.client_label}</span> · Location:{' '}
              <span className="text-stone-900 font-medium">{job.location}</span>
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#FAF8F5] border border-[#E7E2D9] rounded-sm font-sans">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-stone-500 block">
                ANNUAL COMPENSATION
              </span>
              <span className="font-serif text-2xl text-[#9E7E4F] font-medium">
                ₹{job.lpa_min} - {job.lpa_max} LPA
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-luxury text-stone-500 block">
                EXPERIENCE
              </span>
              <span className="font-serif text-2xl text-stone-900">
                {job.exp_min} - {job.exp_max} Yrs
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-luxury text-stone-500 block">
                NOTICE PERIOD
              </span>
              <span className="font-serif text-xl text-stone-900">
                {job.notice_period}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-luxury text-stone-500 block">
                ENGAGEMENT
              </span>
              <span className="font-serif text-xl text-stone-900">
                {job.type}
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase font-sans tracking-luxury text-stone-500 block font-semibold">
              PRIMARY TECH STACK:
            </span>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs font-sans px-3 py-1 bg-[#FAF8F5] border border-[#E7E2D9] text-stone-700 rounded-sm font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <JobDetailClient job={job} />
        </div>

        {/* Context & Description */}
        <div className="bg-white border border-[#E7E2D9] p-8 sm:p-12 rounded-sm shadow-sm space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-light pb-4 border-b border-[#E7E2D9]">
            Role &amp; Architectural Context
          </h2>
          <p className="text-base text-stone-600 leading-relaxed font-sans font-normal">
            {job.description}
          </p>
        </div>

        {/* Deliverables */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="bg-white border border-[#E7E2D9] p-8 sm:p-12 rounded-sm shadow-sm space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-light pb-4 border-b border-[#E7E2D9]">
              Core Deliverables &amp; Responsibilities
            </h2>
            <ul className="space-y-3 text-base text-stone-600 font-sans font-normal">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E7E4F] mt-2.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#E7E2D9] p-8 rounded-sm shadow-sm space-y-4">
            <span className="text-[10px] uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
              PREREQUISITES
            </span>
            <h3 className="font-serif text-2xl text-stone-900">Must-Have Competencies</h3>
            <ul className="space-y-2.5 text-sm text-stone-600 font-sans font-normal">
              {job.must_have.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9E7E4F] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[#E7E2D9] p-8 rounded-sm shadow-sm space-y-4">
            <span className="text-[10px] uppercase font-sans tracking-luxury text-stone-500 block font-semibold">
              DESIRABLE
            </span>
            <h3 className="font-serif text-2xl text-stone-900">Good-to-Have Background</h3>
            <ul className="space-y-2.5 text-sm text-stone-600 font-sans font-normal">
              {job.good_to_have.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interview Sequence */}
        {job.interview_process && job.interview_process.length > 0 && (
          <div className="bg-white border border-[#E7E2D9] p-8 sm:p-12 rounded-sm shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D9]">
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-light">
                Evaluation Sequence
              </h2>
              <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] font-semibold">
                Avg. SLA: 10 - 14 Days
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {job.interview_process.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#FAF8F5] border border-[#E7E2D9] rounded-sm space-y-2"
                >
                  <span className="text-[10px] font-sans uppercase tracking-luxury text-[#9E7E4F] font-semibold">
                    STAGE 0{idx + 1}
                  </span>
                  <p className="font-serif text-lg text-stone-900 font-light">{stage}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
