import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const SPOTLIGHTS = [
  {
    code: 'TLT-2041',
    role: 'Staff Full Stack Engineer (Next.js & Go)',
    client: 'Series-B FinTech Unicorn (Bengaluru)',
    ctc: '₹35 - 52 LPA',
    exp: '6 - 10 Years',
    mode: 'Hybrid · Bengaluru',
    skills: ['Next.js', 'Go', 'Kafka', 'PostgreSQL', 'Docker'],
    highlights: ['Lending platform processing INR 150Cr+ monthly', 'Sub-100ms API response SLA'],
  },
  {
    code: 'TLT-2042',
    role: 'Senior Backend Architect (Java 21 / Spring Boot 3)',
    client: 'Global SaaS Leader in Supply Chain (Hyderabad)',
    ctc: '₹38 - 58 LPA',
    exp: '8 - 12 Years',
    mode: 'Hybrid · Hyderabad',
    skills: ['Java 21', 'Spring Boot 3', 'Microservices', 'AWS', 'Redis'],
    highlights: ['50k+ QPS enterprise throughput', 'Domain-Driven Design across North America / Europe'],
  },
  {
    code: 'TLT-2043',
    role: 'Lead DevOps & Cloud Platform Engineer',
    client: 'HealthTech Pioneer (Gurugram / Remote)',
    ctc: '₹28 - 42 LPA',
    exp: '5 - 9 Years',
    mode: '100% Remote',
    skills: ['Kubernetes', 'Terraform', 'AWS EKS', 'ArgoCD', 'Prometheus'],
    highlights: ['Zero-trust network architecture', 'HIPAA/SOC2 automated compliance'],
  },
  {
    code: 'TLT-2044',
    role: 'Principal Data Engineer (PySpark & Databricks)',
    client: 'Top Tier E-Commerce Enterprise (Bengaluru)',
    ctc: '₹40 - 60 LPA',
    exp: '7 - 11 Years',
    mode: 'Hybrid · Bengaluru',
    skills: ['PySpark', 'Databricks', 'Delta Lake', 'BigQuery', 'Airflow'],
    highlights: ['8TB+ daily telemetry ingestion', 'Streaming lakehouse for dynamic pricing'],
  },
];

export default function SpotlightMandates() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] text-stone-900 border-b border-[#E7E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E7E2D9]">
          <div>
            <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
              FEATURED MANDATES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-light mt-1">
              Active Executive <span className="font-editorial-italic text-[#9E7E4F]">Searches</span>
            </h2>
          </div>
          <p className="text-sm text-stone-600 font-sans font-normal mt-3 md:mt-0 max-w-sm text-left md:text-right">
            Pre-approved budgets and direct founder/CTO interview loops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SPOTLIGHTS.map((item) => (
            <div
              key={item.code}
              className="bg-white border border-[#E7E2D9] hover:border-[#9E7E4F] p-8 rounded-sm transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#83673C] bg-[#9E7E4F]/10 px-2.5 py-1 rounded-sm border border-[#9E7E4F]/30 font-semibold">
                    {item.code}
                  </span>
                  <span className="text-xs font-sans text-stone-500 uppercase tracking-wider font-medium">
                    {item.mode}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-stone-900 group-hover:text-[#9E7E4F] transition-colors leading-snug">
                  {item.role}
                </h3>

                <p className="font-sans text-xs text-stone-600">
                  Client: <span className="text-stone-900 font-medium">{item.client}</span> · Experience: {item.exp}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-sans px-2.5 py-1 bg-[#FAF8F5] border border-[#E7E2D9] text-stone-700 rounded-sm font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E7E2D9] space-y-2 text-xs text-stone-600 font-sans">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E7E4F]"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#E7E2D9] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-luxury text-stone-500 block">
                    ANNUAL CTC
                  </span>
                  <span className="font-serif text-2xl text-[#9E7E4F] font-medium">
                    {item.ctc}
                  </span>
                </div>

                <Link
                  href={`/jobs/${item.code}`}
                  className="btn-dark text-xs py-2.5 px-5"
                >
                  <span>Requisition Spec</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
