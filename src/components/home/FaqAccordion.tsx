'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: 'Company' | 'Candidate';
}

const FAQS: FaqItem[] = [
  {
    category: 'Company',
    q: 'How does the 90-day replacement guarantee work?',
    a: 'If a placed candidate leaves your organization or is terminated for performance or cause within 90 calendar days of their joining date, Talenty initiates an immediate priority search to provide a qualified replacement at zero additional placement fee.',
  },
  {
    category: 'Company',
    q: 'What is the standard turnaround time for the first shortlist?',
    a: 'For calibrated mandates (e.g. Staff Backend, DevOps, Data Engineers), our first batch of 3-5 pre-screened, interview-ready candidate profiles is delivered within 7 to 10 business days.',
  },
  {
    category: 'Company',
    q: 'How do you prevent resume spam and ensure technical quality?',
    a: 'Every candidate undergoes a mandatory 30-minute technical evaluation conducted by an experienced engineer on our talent panel. We evaluate concurrency, system boundaries, code architecture, and compensation expectations before sharing their profile.',
  },
  {
    category: 'Candidate',
    q: 'Is my candidate profile kept strictly confidential from my current employer?',
    a: 'Yes, 100%. We never submit your resume or reveal your identity to any company without your explicit, recorded consent. You have full visibility into which client, role, and salary band is under discussion.',
  },
  {
    category: 'Candidate',
    q: 'Do candidates pay any fee to Talenty Consultancy?',
    a: 'No. Talenty is completely free for candidates. Our professional fees are settled directly by the hiring client company upon successful placement.',
  },
  {
    category: 'Company',
    q: 'Can you assist with immediate joiners or buyouts?',
    a: 'Yes. We actively track engineers serving notice (0-30 days) and candidates with buyout-friendly employment agreements. We facilitate notice buyout discussions directly with the hiring company during offer finalization.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#ECEEF1] border-b-[1.5px] border-[#0B1A2C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="font-mono text-xs uppercase tracking-wider text-[#4F6072] font-bold">
            [TRANSPARENCY PROTOCOL]
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#0B1A2C] mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#4F6072] mt-2">
            Clear guidelines for hiring partners and engineering candidates.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border-[1.5px] border-[#0B1A2C] shadow-hard transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] bg-[#ECEEF1] border border-[#0B1A2C] px-2 py-0.5 text-[#0B1A2C] font-bold">
                      {faq.category}
                    </span>
                    <span className="font-heading font-bold text-base sm:text-lg text-[#0B1A2C]">
                      {faq.q}
                    </span>
                  </div>
                  <div className="p-1 bg-[#ECEEF1] border border-[#0B1A2C] text-[#0B1A2C] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#0B1A2C]/80 leading-relaxed border-t border-[#0B1A2C]/10 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

