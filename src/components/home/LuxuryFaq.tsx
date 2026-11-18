'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: 'Companies' | 'Candidates';
}

const FAQS: FaqItem[] = [
  {
    category: 'Companies',
    q: 'How does the 90-day replacement guarantee work?',
    a: 'If a placed candidate departs your organization or is separated for performance within 90 calendar days of joining, Talenty initiates an immediate priority search to provide a calibrated replacement at zero additional placement fee.',
  },
  {
    category: 'Companies',
    q: 'What is the average turnaround time for the first shortlist?',
    a: 'For calibrated engineering roles (Staff Backend, DevOps, Data Platform), our first shortlist of 3-5 pre-screened, interview-ready candidate profiles is delivered within 7 to 10 business days.',
  },
  {
    category: 'Companies',
    q: 'How do you evaluate candidates before client introduction?',
    a: 'Every engineer undertakes a mandatory technical evaluation conducted by an experienced technologist. We probe distributed concurrency, schema design, fault tolerance, and communication before sharing credentials.',
  },
  {
    category: 'Candidates',
    q: 'Is my candidate profile kept strictly confidential?',
    a: 'Yes, absolutely. We operate under strict privacy protocols. We never submit your resume or reveal your identity to any company without your explicit, recorded approval.',
  },
  {
    category: 'Candidates',
    q: 'Do candidates pay any service fee to Talenty?',
    a: 'No. Talenty is 100% free for candidates. Our professional search fees are settled directly by the hiring client company upon successful placement.',
  },
  {
    category: 'Companies',
    q: 'Can you facilitate notice buyouts or immediate joiners?',
    a: 'Yes. We actively track engineers serving notice (0-30 days) and assist in structuring transparent notice buyout discussions directly with hiring decision-makers during offer finalization.',
  },
];

export default function LuxuryFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 sm:py-32 bg-white text-stone-900 border-b border-[#E7E2D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            COMMON INQUIRIES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Frequently Asked <span className="font-editorial-italic text-[#9E7E4F]">Questions</span>
          </h2>
          <p className="text-sm text-stone-600 font-sans font-normal">
            Clarity on our process, fee structure, and confidentiality assurances.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-sm overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-sans tracking-luxury text-[#83673C] bg-[#9E7E4F]/10 px-2 py-0.5 rounded-sm font-semibold">
                      {faq.category}
                    </span>
                    <span className="font-serif text-lg sm:text-xl text-stone-900 font-normal">
                      {faq.q}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-[#9E7E4F] shrink-0 bg-white shadow-xs">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-sm text-stone-600 font-sans font-normal leading-relaxed border-t border-[#E7E2D9]">
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
