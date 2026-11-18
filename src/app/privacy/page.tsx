import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Talenty Consultancy',
  description: 'Digital Personal Data Protection and Candidate Confidentiality Policy for Talenty Consultancy.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-[#E7E2D9] p-8 sm:p-14 rounded-sm shadow-sm">
        <div className="border-b border-[#E7E2D9] pb-6 mb-8 space-y-2">
          <span className="text-[10px] uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            LEGAL COMPLIANCE // DPDP ACT 2023
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Privacy Policy &amp; Confidentiality
          </h1>
          <p className="text-xs text-stone-500 font-sans">
            Effective Date: January 1, 2024 · Governing Law: Republic of India
          </p>
        </div>

        <div className="space-y-6 text-sm text-stone-600 font-sans font-normal leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-2xl text-stone-900 font-normal">1. Introduction &amp; Scope</h2>
            <p>
              Talenty Consultancy LLP (&ldquo;Talenty&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is an executive IT search and talent architecture firm in India. This policy details how we handle personal and professional data from job applicants and client companies in strict compliance with the Digital Personal Data Protection (DPDP) Act, 2023.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl text-stone-900 font-normal">2. Confidentiality Charter</h2>
            <p>We operate under an absolute non-disclosure guarantee:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>We never disclose your active job search or CV to your current employer.</li>
              <li>We never submit your profile or identity to any company without your prior verbal or written consent.</li>
              <li>We never sell or distribute candidate data to third-party marketing brokers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-2xl text-stone-900 font-normal">3. Data Retention &amp; Rights</h2>
            <p>
              Credentials and resumes are encrypted and stored in secure Postgres databases with temporary cryptographic access URLs. Under the DPDP Act 2023, you retain the complete right to request access, rectification, or immediate permanent erasure of your data by emailing <a href="mailto:privacy@talenty.in" className="text-[#9E7E4F] underline font-medium">privacy@talenty.in</a>.
            </p>
          </section>

          <div className="pt-8 border-t border-[#E7E2D9] flex items-center justify-between text-xs font-sans uppercase tracking-luxury text-[#9E7E4F] font-semibold">
            <Link href="/" className="hover:underline">&larr; Return to Studio</Link>
            <Link href="/terms" className="hover:underline">Terms of Engagement &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
