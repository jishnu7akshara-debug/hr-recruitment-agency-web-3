import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Engagement | Talenty Consultancy',
  description: 'Terms of Engagement, Placement Fees, and 90-Day Replacement Guarantee for Talenty Consultancy.',
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-[#E7E2D9] p-8 sm:p-14 rounded-sm shadow-sm">
        <div className="border-b border-[#E7E2D9] pb-6 mb-8 space-y-2">
          <span className="text-[10px] uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            CONTRACTUAL FRAMEWORK // IT RECRUITMENT TERMS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Terms of Engagement &amp; Guarantee
          </h1>
          <p className="text-xs text-stone-500 font-sans">
            Applicable to all Client Companies, Hiring Managers, and Placements
          </p>
        </div>

        <div className="space-y-6 text-sm text-stone-600 font-sans font-normal leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-2xl text-stone-900 font-normal">1. Professional Fee Structure</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Permanent Placements:</strong> Standard search fee is <strong>8.33% to 12.5%</strong> of the candidate’s First Year Gross Annual Fixed CTC.</li>
              <li><strong>Invoicing Milestone:</strong> Invoices are raised strictly on the date the candidate joins (Day 1).</li>
              <li><strong>Payment Schedule:</strong> Invoices are payable within 15 to 30 calendar days from invoice presentation.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl text-stone-900 font-normal">2. 90-Day Unconditional Replacement Guarantee</h2>
            <p>
              If a candidate placed by Talenty leaves voluntarily or is separated for performance within <strong>90 calendar days</strong> of their joining date, Talenty provides an expedited, free-of-cost replacement candidate for the identical role and specification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl text-stone-900 font-normal">3. Zero Candidate Fee Policy</h2>
            <p>
              Talenty strictly complies with Indian labor laws. No fee, commission, or deposit is ever charged to candidates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl text-stone-900 font-normal">4. Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India, subject to the exclusive jurisdiction of the courts in <strong>Bengaluru, Karnataka</strong>.
            </p>
          </section>

          <div className="pt-8 border-t border-[#E7E2D9] flex items-center justify-between text-xs font-sans uppercase tracking-luxury text-[#9E7E4F] font-semibold">
            <Link href="/" className="hover:underline">&larr; Return to Studio</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
