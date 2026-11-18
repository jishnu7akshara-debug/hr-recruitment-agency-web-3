import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function EngagementTable() {
  const models = [
    {
      name: 'Permanent Hiring',
      badge: 'MOST POPULAR',
      fee: '8.33% - 12.5%',
      feeBasis: 'of First Year Fixed Annual CTC',
      guarantee: '90-Day Unconditional Replacement',
      speed: 'Shortlists in 7-14 Days',
      ideal: 'Core engineering squads, Staff/Principal architects, Engineering managers, long-term product roadmaps.',
      features: [
        'Pay only on successful candidate onboarding',
        'In-depth background & technical vetting',
        'Comprehensive 90-day replacement warranty',
        'Direct payroll placement with your entity',
      ],
      ctaText: 'Engage Permanent Search',
      highlight: true,
    },
    {
      name: 'Contract Staffing',
      badge: 'HIGH AGILITY',
      fee: 'Monthly Retainer / Hourly',
      feeBasis: 'Transparent margin or fixed milestone billing',
      guarantee: 'Immediate 48h Resource Swap',
      speed: 'Deploy in 3-7 Days',
      ideal: 'Immediate cloud migrations, deadline spikes, legacy microservice refactoring, temporary skill deficits.',
      features: [
        'Zero long-term headcount liability',
        'Immediate deployability (serving notice/ready)',
        'Full timesheet tracking and monthly GST billing',
        'Seamless contract renewals or phase exits',
      ],
      ctaText: 'Deploy Contract Specialists',
      highlight: false,
    },
    {
      name: 'Contract-to-Hire',
      badge: 'LOW RISK EVALUATION',
      fee: 'Conversion Fee Pro-rated',
      feeBasis: 'Monthly contract with transition buyout option',
      guarantee: 'Pre-vetted cultural & performance trial',
      speed: 'Deploy in 5-10 Days',
      ideal: 'High-stakes architectural roles where live code delivery and sprint velocity must be evaluated first.',
      features: [
        '3 to 6-month trial on vendor contract',
        'Seamless conversion to full-time payroll',
        'Reduced permanent placement fee on transition',
        'Complete risk mitigation before equity grant',
      ],
      ctaText: 'Start C2H Pilot',
      highlight: false,
    },
  ];

  return (
    <section id="engagement-models" className="py-20 bg-[#ECEEF1] border-b-[1.5px] border-[#0B1A2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block font-mono text-xs uppercase tracking-wider bg-white border border-[#0B1A2C] px-3 py-1 shadow-hard-sm font-bold text-[#0B1A2C] mb-3">
            [FEE MATRIX & SLA SPECIFICATION]
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1A2C] tracking-tight">
            Transparent Engagement Models
          </h2>
          <p className="mt-3 text-base text-[#4F6072] font-sans">
            Clear contractual terms. No hidden retainer fees. You pay only when we successfully land the engineering talent your business demands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((m) => (
            <div
              key={m.name}
              className={`bg-white border-[1.5px] border-[#0B1A2C] p-6 sm:p-8 flex flex-col justify-between relative ${
                m.highlight ? 'shadow-hard-lg ring-2 ring-[#FFB81C]' : 'shadow-hard'
              }`}
            >
              {m.highlight && (
                <div className="absolute -top-3.5 left-6 bg-[#FFB81C] text-[#0B1A2C] border-[1.5px] border-[#0B1A2C] px-3 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider">
                  RECOMMENDED FOR TECH TEAMS
                </div>
              )}

              <div>
                <div className="flex items-center justify-between pb-3 border-b-[1.5px] border-[#0B1A2C]">
                  <h3 className="font-heading font-black text-xl text-[#0B1A2C]">{m.name}</h3>
                  <span className="font-mono text-[10px] bg-[#ECEEF1] border border-[#0B1A2C] px-2 py-0.5 text-[#0B1A2C] font-bold">
                    {m.badge}
                  </span>
                </div>

                <div className="py-5">
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#0B1A2C]">
                    {m.fee}
                  </div>
                  <div className="font-mono text-xs text-[#4F6072] mt-0.5">{m.feeBasis}</div>
                </div>

                <div className="p-3 bg-[#ECEEF1] border border-[#0B1A2C] mb-6 font-mono text-xs space-y-1">
                  <div>
                    <span className="font-bold text-[#0B1A2C]">Warranty:</span> {m.guarantee}
                  </div>
                  <div>
                    <span className="font-bold text-[#0B1A2C]">Deployment:</span> {m.speed}
                  </div>
                </div>

                <p className="text-xs text-[#0B1A2C]/80 leading-relaxed mb-6 font-sans">
                  <strong>Ideal For:</strong> {m.ideal}
                </p>

                <div className="space-y-2.5 mb-8">
                  {m.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#0B1A2C]">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/companies"
                className={`${
                  m.highlight ? 'btn-amber' : 'btn-outline'
                } w-full text-xs font-mono uppercase tracking-wider py-3`}
              >
                <span>{m.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

