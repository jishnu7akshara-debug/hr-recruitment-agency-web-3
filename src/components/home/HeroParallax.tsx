'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Building2, Users2, Shield, Sparkles, Terminal } from 'lucide-react';

export default function HeroParallax() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative pt-8 pb-16 md:pt-14 md:pb-24 blueprint-grid border-b-[1.5px] border-[#0B1A2C] overflow-hidden"
    >
      {/* Corner Blueprint Registration Marks */}
      <div className="absolute top-4 left-4 font-mono text-sm font-bold text-[#0B1A2C]/40 select-none">+0.0</div>
      <div className="absolute top-4 right-4 font-mono text-sm font-bold text-[#0B1A2C]/40 select-none">+1.0</div>
      <div className="absolute bottom-4 left-4 font-mono text-sm font-bold text-[#0B1A2C]/40 select-none">+0.0_BASE</div>
      <div className="absolute bottom-4 right-4 font-mono text-sm font-bold text-[#0B1A2C]/40 select-none">+1.0_BASE</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Annotation Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-[1.5px] border-[#0B1A2C] shadow-hard-sm">
              <span className="w-2 h-2 bg-[#FFB81C] rounded-full"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1A2C]">
                SPEC: IT TALENT SEARCH ARCHITECTURE // PAN-INDIA
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1A2C] tracking-tight leading-[1.08]">
              We Bridge High-Growth Tech Companies with{' '}
              <span className="relative inline-block px-2 bg-[#FFB81C] text-[#0B1A2C] border-[1.5px] border-[#0B1A2C] shadow-hard-sm">
                Vetted Engineers.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#0B1A2C]/80 leading-relaxed font-sans max-w-2xl">
              Talenty Consultancy operates as the confidential talent middleman for India’s top venture-backed startups and multinational enterprise engineering centers. No automated resume flood. Only pre-screened Staff Engineers, Architects, and Tech Leads.
            </p>

            {/* Two Main CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/companies"
                className="btn-amber text-sm font-mono uppercase tracking-wider py-3.5 px-6"
              >
                <span>Share a Requirement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/jobs"
                className="btn-outline text-sm font-mono uppercase tracking-wider py-3.5 px-6"
              >
                <span>Browse Open Roles</span>
                <Terminal className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Metrics Pill */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t-[1.5px] border-[#0B1A2C]/20 max-w-xl">
              <div className="bg-white p-3 border-[1.5px] border-[#0B1A2C] shadow-hard-sm">
                <div className="font-mono text-xl sm:text-2xl font-black text-[#0B1A2C]">14 Days</div>
                <div className="font-mono text-[10px] uppercase text-[#4F6072] font-semibold mt-0.5">
                  Avg. Shortlist Delivery
                </div>
              </div>
              <div className="bg-white p-3 border-[1.5px] border-[#0B1A2C] shadow-hard-sm">
                <div className="font-mono text-xl sm:text-2xl font-black text-[#0B1A2C]">92.8%</div>
                <div className="font-mono text-[10px] uppercase text-[#4F6072] font-semibold mt-0.5">
                  1st-Round Pass Rate
                </div>
              </div>
              <div className="bg-white p-3 border-[1.5px] border-[#0B1A2C] shadow-hard-sm">
                <div className="font-mono text-xl sm:text-2xl font-black text-[#0B1A2C]">90 Days</div>
                <div className="font-mono text-[10px] uppercase text-[#4F6072] font-semibold mt-0.5">
                  Replacement Guarantee
                </div>
              </div>
            </div>

            {/* Two Audience Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 border-[1.5px] border-[#0B1A2C] shadow-hard relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-[#0B1A2C] text-[#FFB81C]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h2 className="font-heading font-bold text-base text-[#0B1A2C]">For Client Companies</h2>
                </div>
                <p className="text-xs text-[#0B1A2C]/80 leading-relaxed mb-3">
                  Scale your squads with pre-evaluated backend, DevOps, and data talent ready for immediate interview rounds.
                </p>
                <Link
                  href="/companies"
                  className="font-mono text-xs font-bold text-[#0B1A2C] hover:text-[#FFB81C] flex items-center gap-1 group"
                >
                  <span>Post Hiring Mandate</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="bg-white p-4 border-[1.5px] border-[#0B1A2C] shadow-hard relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-[#FFB81C] text-[#0B1A2C]">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <h2 className="font-heading font-bold text-base text-[#0B1A2C]">For Candidates</h2>
                </div>
                <p className="text-xs text-[#0B1A2C]/80 leading-relaxed mb-3">
                  Direct access to unlisted CTO mandates with transparent LPA benchmarks and fast-tracked interview loops.
                </p>
                <Link
                  href="/candidates"
                  className="font-mono text-xs font-bold text-[#0B1A2C] hover:text-[#FFB81C] flex items-center gap-1 group"
                >
                  <span>Join Candidate Vault</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Parallax Interactive Canvas (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[520px] flex items-center justify-center">
            {/* Layer 1: Licensed Editorial Candid Photo (Slot 1: Recruiter & Tech Specialist at Work, 4:5 crop) */}
            <motion.div
              style={{
                x: mousePosition.x * 20,
                y: mousePosition.y * 20,
              }}
              className="relative w-full max-w-[380px] aspect-[4/5] bg-[#0B1A2C] border-[2px] border-[#0B1A2C] shadow-hard-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="Talenty Senior Technical Recruiter in an engineering consultation call"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2C] via-transparent to-transparent opacity-80" />
              
              {/* Photo technical stamp */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#EEF1F5] font-mono text-[10px]">
                <span className="bg-[#0B1A2C]/90 px-2 py-0.5 border border-[#EEF1F5]/20">
                  SLOT-01 // REC_CONSULTATION
                </span>
                <span className="text-[#FFB81C]">BENGALURU HUB</span>
              </div>
            </motion.div>

            {/* Layer 2: Live Requisition Card (Offset Top-Right) */}
            <motion.div
              style={{
                x: mousePosition.x * -25,
                y: mousePosition.y * -25,
              }}
              className="absolute -top-4 -right-2 sm:-right-6 w-72 sm:w-80 bg-white border-[1.5px] border-[#0B1A2C] p-4 shadow-hard-lg z-20"
            >
              <div className="flex items-center justify-between border-b-[1.5px] border-[#0B1A2C] pb-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#0B1A2C] bg-[#FFB81C] px-1.5 py-0.5">
                  REQUISITION: TLT-2041
                </span>
                <span className="font-mono text-[11px] text-[#4F6072] font-semibold">HYBRID</span>
              </div>
              <h3 className="font-heading font-bold text-sm text-[#0B1A2C] leading-tight">
                Staff Full Stack Engineer (Go & Next.js)
              </h3>
              <p className="font-mono text-xs text-[#4F6072] mt-0.5">
                Series-B FinTech Unicorn (Bengaluru)
              </p>
              <div className="mt-3 flex items-center justify-between font-mono text-xs">
                <span className="font-extrabold text-[#0B1A2C] bg-[#ECEEF1] px-2 py-1 border border-[#0B1A2C]">
                  ₹35 - 52 LPA
                </span>
                <span className="text-[#0B1A2C] text-[11px]">Notice: &lt; 30d</span>
              </div>
            </motion.div>

            {/* Layer 3: Candidate Verification Card (Offset Bottom-Left) */}
            <motion.div
              style={{
                x: mousePosition.x * 35,
                y: mousePosition.y * 35,
              }}
              className="absolute -bottom-6 -left-2 sm:-left-6 w-64 sm:w-72 bg-[#0B1A2C] text-[#EEF1F5] border-[1.5px] border-[#0B1A2C] p-3.5 shadow-hard-lg z-30"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 bg-[#FFB81C] rounded-full animate-ping"></span>
                <span className="font-mono text-[10px] text-[#FFB81C] uppercase font-bold tracking-wider">
                  MATCH READY // CAN-301
                </span>
              </div>
              <div className="font-heading font-bold text-sm">Arjun Venkatraman</div>
              <div className="font-mono text-[11px] text-[#EEF1F5]/70">
                Staff Engineer · 7.5y Exp · Swiggy
              </div>
              <div className="mt-2 pt-2 border-t border-[#EEF1F5]/20 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#FFB81C]">Verified System Design</span>
                <span className="text-emerald-400 font-bold">100% Match</span>
              </div>
            </motion.div>

            {/* Layer 4: Blueprint Technical Stamp */}
            <motion.div
              style={{
                rotate: -6,
                x: mousePosition.x * -10,
                y: mousePosition.y * -10,
              }}
              className="absolute bottom-20 -right-4 bg-[#FFB81C] text-[#0B1A2C] border-[1.5px] border-[#0B1A2C] px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-widest shadow-hard z-30"
            >
              PRE-SCREENED CANDIDATE
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

