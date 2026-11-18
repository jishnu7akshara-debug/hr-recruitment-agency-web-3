import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function LuxuryEngagement() {
  const models = [
    {
      name: 'Permanent Search',
      badge: 'CORE SQUAD EXPANSION',
      fee: '8.33% - 12.5%',
      basis: 'of First Year Fixed Gross Annual CTC',
      warranty: '90-Day Unconditional Replacement',
      speed: 'Shortlists in 7-14 Days',
      features: [
        'Pay only on successful candidate reporting',
        'Senior technologist screening included',
        'Direct payroll placement with your entity',
        'Full 90-day replacement warranty',
      ],
      popular: true,
    },
    {
      name: 'Contract Staffing',
      badge: 'AGILE DEPLOYMENT',
      fee: 'Monthly / Milestone',
      basis: 'Transparent retainer with GST invoicing',
      warranty: 'Immediate 48h Resource Swap',
      speed: 'Deploy in 3-7 Days',
      features: [
        'Zero long-term payroll liability',
        'Immediate deployability (serving notice / bench)',
        'Full monthly timesheet reconciliation',
        'Smooth milestone completions & renewals',
      ],
      popular: false,
    },
    {
      name: 'Contract-to-Hire',
      badge: 'EVALUATION PILOT',
      fee: 'Pro-Rated Transition',
      basis: 'Trial contract with payroll transition option',
      warranty: 'Live sprint & cultural trial',
      speed: 'Deploy in 5-10 Days',
      features: [
        '3 to 6-month trial before equity commitment',
        'Seamless transition to full-time payroll',
        'Reduced permanent placement conversion fee',
        'Complete de-risking of strategic hires',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5] text-stone-900 border-b border-[#E7E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            TERMS &amp; ENGAGEMENT
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Transparent Engagement <span className="font-editorial-italic text-[#9E7E4F]">Models</span>
          </h2>
          <p className="text-sm text-stone-600 font-sans font-normal">
            Uncompromising quality backed by transparent contracts and zero upfront retainer fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((m) => (
            <div
              key={m.name}
              className={`bg-white p-8 rounded-sm flex flex-col justify-between border transition-all duration-300 relative shadow-sm hover:shadow-xl ${
                m.popular
                  ? 'border-[#9E7E4F] ring-1 ring-[#9E7E4F]/20'
                  : 'border-[#E7E2D9] hover:border-stone-400'
              }`}
            >
              {m.popular && (
                <div className="absolute -top-3.5 left-8 bg-[#9E7E4F] text-white text-[10px] font-sans font-semibold uppercase tracking-luxury px-3 py-1 rounded-sm shadow-sm">
                  MOST REQUESTED
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D9]">
                  <h3 className="font-serif text-2xl text-stone-900">{m.name}</h3>
                  <span className="text-[10px] uppercase font-sans tracking-luxury text-stone-500 bg-stone-100 px-2.5 py-1 rounded-sm font-medium">
                    {m.badge}
                  </span>
                </div>

                <div>
                  <div className="font-serif text-3xl sm:text-4xl text-[#9E7E4F] font-light">
                    {m.fee}
                  </div>
                  <div className="text-xs text-stone-500 font-sans mt-1">{m.basis}</div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E7E2D9] rounded-sm font-sans text-xs space-y-1.5 text-stone-600">
                  <div>
                    <span className="text-stone-900 font-medium">Warranty:</span> {m.warranty}
                  </div>
                  <div>
                    <span className="text-stone-900 font-medium">Speed:</span> {m.speed}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {m.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700 font-sans">
                      <Check className="w-4 h-4 text-[#9E7E4F] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/companies"
                  className={m.popular ? 'btn-dark w-full text-center' : 'btn-luxury-outline w-full text-center'}
                >
                  <span>Select Model</span>
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
