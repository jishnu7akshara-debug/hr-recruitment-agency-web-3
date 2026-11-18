'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Search, Code2, Users, ShieldCheck } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  slotTag?: string;
  highlights: string[];
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Architectural Brief',
    subtitle: 'Mandate Calibration',
    description:
      'We run an engineering discovery call with your CTO or Tech Leads to calibrate system requirements, microservice dependencies, exact tech stack, and CTC parameters. Zero generic job descriptions.',
    highlights: ['Tech Stack Audit', 'CTC & Notice Bandwidth Calibration', 'Confidentiality Agreement'],
  },
  {
    num: '02',
    title: 'Passive Sourcing',
    subtitle: 'Direct Talent Hunting',
    description:
      'We map talent from top product companies, high-throughput consumer apps, and tier-1 SaaS engineering centers. We tap engineers who are not active on public job boards.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    slotTag: 'SLOT-02 // SOURCING_POD',
    highlights: ['Zero InMail Spam', 'Peer-to-Peer Technical Pitch', 'Compensation Pre-Negotiation'],
  },
  {
    num: '03',
    title: 'Practitioner Screening',
    subtitle: 'Technical Vetting',
    description:
      'Every engineer is interviewed by an experienced technologist on our panel. We probe concurrency, database indexing, distributed state, and clean coding standards before your team sees the resume.',
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=800&q=80',
    slotTag: 'SLOT-03 // TECH_SCREEN',
    highlights: ['Live Architecture Discussion', 'Notice Period Reality Check', 'System Design Scorecard'],
  },
  {
    num: '04',
    title: 'Interview & Offer',
    subtitle: 'Fast-Track Loops',
    description:
      'We orchestrate high-velocity interview schedules. We manage feedback loops within 24 hours, counter-offer risks, and salary negotiations to achieve a 92% offer acceptance rate.',
    highlights: ['Fast-track 48h Feedback Loops', 'Counter-offer Insulation', 'Transparent Notice Tracking'],
  },
  {
    num: '05',
    title: 'Joining & 90-Day Guarantee',
    subtitle: 'Placement Assurance',
    description:
      'Our commitment extends beyond offer signing. We monitor onboarding until day 90. If an employee departs within 90 days for any reason, we provide an immediate, free replacement.',
    highlights: ['90-Day Unconditional Replacement', 'Day-1 Joining Assistance', 'Post-hire Retention Checkins'],
  },
];

export default function ProcessReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className={`relative bg-[#0B1A2C] text-[#EEF1F5] border-b-[1.5px] border-[#0B1A2C] ${
        isReducedMotion ? 'py-16' : 'h-[300vh]'
      }`}
    >
      <div className={`${isReducedMotion ? '' : 'sticky top-0 h-screen overflow-hidden'} flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8`}>
        {/* Top Header & Amber Progress Bar */}
        <div className="max-w-7xl w-full mx-auto pb-6 border-b border-[#EEF1F5]/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#FFB81C] font-bold flex items-center gap-2">
                <span>[PROCESS SPECIFICATION // V2.4]</span>
                <span className="text-[#EEF1F5]/50">5-STEP HIGH CONVICTION PIPELINE</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mt-1">
                How Talenty Ships Engineers in 14 Days
              </h2>
            </div>
            <div className="font-mono text-xs text-[#EEF1F5]/70 text-left sm:text-right">
              SCROLL DOWN TO TRAVERSE THE BLUEPRINT PIPELINE &rarr;
            </div>
          </div>

          {/* Amber progress bar */}
          <div className="w-full h-1.5 bg-[#10233A] border border-[#EEF1F5]/10 overflow-hidden">
            <motion.div
              style={{ width: isReducedMotion ? '100%' : progressWidth }}
              className="h-full bg-[#FFB81C]"
            />
          </div>
        </div>

        {/* Horizontal Reel Container */}
        <div className="relative flex-1 flex items-center overflow-x-auto sm:overflow-visible my-auto py-6">
          <motion.div
            style={isReducedMotion ? {} : { x: xTransform }}
            className="flex gap-6 sm:gap-8 px-4"
          >
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="w-[320px] sm:w-[420px] bg-[#10233A] border-[1.5px] border-[#EEF1F5]/20 p-6 sm:p-7 shrink-0 shadow-hard flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#EEF1F5]/15 pb-3 mb-4">
                    <span className="font-mono font-black text-2xl text-[#FFB81C]">
                      {step.num}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#EEF1F5]/60 bg-[#0B1A2C] px-2 py-0.5 border border-[#EEF1F5]/20">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#EEF1F5]/80 leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Optional Licensed Image */}
                  {step.image && (
                    <div className="relative aspect-[16/10] mb-5 border border-[#EEF1F5]/20 overflow-hidden bg-black">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover grayscale contrast-125"
                      />
                      <div className="absolute bottom-1 right-1 bg-[#0B1A2C]/90 text-[#FFB81C] font-mono text-[9px] px-1.5 py-0.5">
                        {step.slotTag}
                      </div>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                <div className="pt-4 border-t border-[#EEF1F5]/10 space-y-2">
                  {step.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 font-mono text-xs text-[#FFB81C]">
                      <span className="w-1.5 h-1.5 bg-[#FFB81C] rounded-full"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Reel Footer Footnote */}
        <div className="max-w-7xl w-full mx-auto pt-4 border-t border-[#EEF1F5]/10 flex items-center justify-between text-xs font-mono text-[#EEF1F5]/60">
          <span>PRECISION TALENT PROTOCOL // ISO-COMPLIANT WORKFLOW</span>
          <span className="text-[#FFB81C]">ZERO CANDIDATE POACHING AMONG SIGNED CLIENTS</span>
        </div>
      </div>
    </section>
  );
}

