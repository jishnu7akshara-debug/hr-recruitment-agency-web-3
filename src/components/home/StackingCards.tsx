'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Server, Cpu, Database, Check } from 'lucide-react';

interface StackingCardItem {
  id: string;
  code: string;
  title: string;
  discipline: string;
  lpa: string;
  client: string;
  exp: string;
  skills: string[];
  perks: string[];
  link: string;
}

const CARDS: StackingCardItem[] = [
  {
    id: '1',
    code: 'TLT-2041',
    discipline: 'FULL STACK ARCHITECTURE',
    title: 'Staff Full Stack Engineer (Next.js & Go)',
    lpa: '₹35 - 52 LPA',
    client: 'Series-B FinTech Unicorn (Bengaluru)',
    exp: '6 - 10 Years',
    skills: ['Next.js', 'Go', 'TypeScript', 'Kafka', 'PostgreSQL'],
    perks: ['Sub-100ms High Concurrency', 'Zero ESOP vesting cliff', 'Hybrid (2 days/wk)'],
    link: '/jobs/TLT-2041',
  },
  {
    id: '2',
    code: 'TLT-2042',
    discipline: 'DISTRIBUTED SYSTEMS',
    title: 'Senior Backend Architect (Java 21 / Spring Boot 3)',
    lpa: '₹38 - 58 LPA',
    client: 'Global SaaS Leader in Supply Chain (Hyderabad)',
    exp: '8 - 12 Years',
    skills: ['Java 21', 'Spring Boot 3', 'Microservices', 'AWS', 'Redis'],
    perks: ['50k+ QPS Infrastructure', 'Global Cloud Team', 'US Relocation Track'],
    link: '/jobs/TLT-2042',
  },
  {
    id: '3',
    code: 'TLT-2043',
    discipline: 'CLOUD & DEVOPS INFRASTRUCTURE',
    title: 'Lead DevOps & Cloud Platform Engineer',
    lpa: '₹28 - 42 LPA',
    client: 'HealthTech Pioneer (Gurugram / Remote)',
    exp: '5 - 9 Years',
    skills: ['Kubernetes', 'Terraform', 'AWS EKS', 'ArgoCD', 'Prometheus'],
    perks: ['100% Remote Flexibility', 'Annual Learning Grant', 'HIPAA/SOC2 Security Lead'],
    link: '/jobs/TLT-2043',
  },
  {
    id: '4',
    code: 'TLT-2044',
    discipline: 'DATA & ML PLATFORMS',
    title: 'Principal Data Engineer (PySpark & Databricks)',
    lpa: '₹40 - 60 LPA',
    client: 'Top Tier E-Commerce Enterprise (Bengaluru)',
    exp: '7 - 11 Years',
    skills: ['PySpark', 'Databricks', 'Delta Lake', 'BigQuery', 'Airflow'],
    perks: ['8TB+ Daily Lakehouse Telemetry', 'Quarterly Retention Bonus', 'Executive Mentorship'],
    link: '/jobs/TLT-2044',
  },
];

export default function StackingCards() {
  return (
    <section className="py-20 bg-[#ECEEF1] border-b-[1.5px] border-[#0B1A2C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-[1.5px] border-[#0B1A2C] pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#4F6072] font-bold">
              [ACTIVE REQUISITIONS // CURATED BATCH]
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0B1A2C] mt-1">
              High-Conviction Engineering Mandates
            </h2>
          </div>
          <p className="font-mono text-xs text-[#0B1A2C] mt-2 md:mt-0 max-w-sm text-right">
            Confidential mandates directly from Founders & Engineering VPs with pre-approved budgets.
          </p>
        </div>

        {/* Stacking sticky cards container */}
        <div className="space-y-8">
          {CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="sticky top-28 bg-white border-[1.5px] border-[#0B1A2C] shadow-hard-lg p-6 sm:p-8 transition-transform"
              style={{
                zIndex: idx + 10,
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-[#FFB81C] text-[#0B1A2C] px-2 py-0.5 border border-[#0B1A2C]">
                      {card.code}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#4F6072] uppercase tracking-wider">
                      // {card.discipline}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1A2C]">
                    {card.title}
                  </h3>

                  <p className="text-sm text-[#4F6072] font-mono">
                    Client: <span className="text-[#0B1A2C] font-semibold">{card.client}</span> · Experience: <span className="text-[#0B1A2C] font-semibold">{card.exp}</span>
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {card.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-2.5 py-1 bg-[#ECEEF1] border border-[#0B1A2C] text-[#0B1A2C] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Perks list */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono text-[#0B1A2C]">
                    {card.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="lg:w-64 flex lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 lg:border-l-[1.5px] border-[#0B1A2C]/20 pt-4 lg:pt-0 lg:pl-6 shrink-0 gap-3">
                  <div className="text-left lg:text-right">
                    <div className="font-mono text-[11px] uppercase text-[#4F6072]">Annual Compensation</div>
                    <div className="font-mono font-black text-2xl sm:text-3xl text-[#0B1A2C]">
                      {card.lpa}
                    </div>
                  </div>

                  <Link
                    href={card.link}
                    className="btn-amber text-xs font-mono uppercase tracking-wider py-3 px-5 w-auto lg:w-full text-center"
                  >
                    <span>View Requisition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/jobs"
            className="btn-ink text-sm font-mono uppercase tracking-wider py-3.5 px-8"
          >
            <span>View All 11 Verified Job Postings</span>
            <ArrowRight className="w-4 h-4 text-[#FFB81C]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

