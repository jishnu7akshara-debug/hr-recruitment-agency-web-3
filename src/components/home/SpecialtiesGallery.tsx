'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  lpa: string;
  location: string;
  image: string;
  code: string;
  description: string;
}

const ITEMS: PortfolioItem[] = [
  {
    id: '1',
    category: 'DISTRIBUTED SYSTEMS',
    title: 'Staff Full Stack Engineer (Next.js & Go)',
    lpa: '₹35 - 52 LPA',
    location: 'Bengaluru · Hybrid',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    code: 'TLT-2041',
    description: 'High-throughput lending orchestration handling INR 150Cr+ monthly disbursements.',
  },
  {
    id: '2',
    category: 'DISTRIBUTED SYSTEMS',
    title: 'Senior Backend Architect (Java 21 / Spring 3)',
    lpa: '₹38 - 58 LPA',
    location: 'Hyderabad · Hybrid',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    code: 'TLT-2042',
    description: 'Multi-tenant enterprise logistics platform backend for Global Fortune 500 retailers.',
  },
  {
    id: '3',
    category: 'DEVOPS & CLOUD',
    title: 'Lead DevOps & Cloud Platform Engineer',
    lpa: '₹28 - 42 LPA',
    location: 'Gurugram · Remote',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    code: 'TLT-2043',
    description: 'Multi-region AWS infrastructure, GitOps pipelines, and zero-trust security perimeter.',
  },
  {
    id: '4',
    category: 'DATA PLATFORMS',
    title: 'Principal Data Engineer (PySpark & Databricks)',
    lpa: '₹40 - 60 LPA',
    location: 'Bengaluru · Hybrid',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    code: 'TLT-2044',
    description: 'Medallion lakehouse data pipelines processing 8TB+ daily telemetry for recommendation engines.',
  },
  {
    id: '5',
    category: 'GENAI & AGENTS',
    title: 'AI/ML Systems Engineer (LLM Agents & RAG)',
    lpa: '₹32 - 48 LPA',
    location: 'Bengaluru · On-site',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    code: 'TLT-2047',
    description: 'Deploying low-latency LLM agent pipelines, vector databases, and evaluation harnesses.',
  },
  {
    id: '6',
    category: 'CLIENT APPS',
    title: 'Senior Frontend Engineer (React 18 & Design Systems)',
    lpa: '₹24 - 36 LPA',
    location: 'Pune · Remote',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    code: 'TLT-2045',
    description: 'Pixel-perfect, accessible design systems and real-time collaborative workspace canvas.',
  },
];

const CATEGORIES = [
  'ALL DISCIPLINES',
  'DISTRIBUTED SYSTEMS',
  'DEVOPS & CLOUD',
  'DATA PLATFORMS',
  'GENAI & AGENTS',
  'CLIENT APPS',
];

export default function SpecialtiesGallery() {
  const [activeCategory, setActiveCategory] = useState('ALL DISCIPLINES');

  const filteredItems =
    activeCategory === 'ALL DISCIPLINES'
      ? ITEMS
      : ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] text-stone-900 border-b border-[#E7E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            CURATED PORTFOLIO
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Specialized Engineering{' '}
            <span className="font-editorial-italic text-[#9E7E4F]">Disciplines</span>
          </h2>
          <p className="text-sm text-stone-600 font-sans font-normal leading-relaxed">
            Explore our focus areas where we maintain deep candidate intimacy and vetted technical benches.
          </p>
        </div>

        {/* Minimalist Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-luxury transition-all rounded-full ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white font-semibold shadow-sm'
                  : 'bg-white border border-[#E7E2D9] text-stone-600 hover:text-stone-900 hover:border-[#9E7E4F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (Editorial Photo Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/jobs/${item.code}`}
              className="group relative bg-white rounded-sm overflow-hidden border border-[#E7E2D9] hover:border-[#9E7E4F] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
            >
              {/* Photo Canvas */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-sans uppercase tracking-luxury px-3 py-1 border border-stone-200 rounded-sm font-semibold shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Requisition Code Pill */}
                <div className="absolute top-4 right-4 font-mono text-[11px] text-white bg-black/70 px-2.5 py-0.5 rounded-sm">
                  {item.code}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-stone-900 group-hover:text-[#9E7E4F] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans font-normal leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7E2D9] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-luxury text-stone-500 block">
                      COMPENSATION
                    </span>
                    <span className="font-serif text-lg text-[#9E7E4F] font-medium">
                      {item.lpa}
                    </span>
                  </div>

                  <span className="w-9 h-9 rounded-full border border-stone-300 group-hover:border-[#9E7E4F] group-hover:bg-[#9E7E4F] group-hover:text-white text-stone-800 flex items-center justify-center transition-all bg-stone-50">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTAs */}
        <div className="mt-16 text-center">
          <Link href="/jobs" className="btn-luxury-outline">
            <span>View All Open Requisitions</span>
            <ArrowUpRight className="w-4 h-4 text-[#9E7E4F]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
