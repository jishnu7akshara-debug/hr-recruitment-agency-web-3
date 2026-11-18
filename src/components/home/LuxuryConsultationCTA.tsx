'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone, Mail } from 'lucide-react';

export default function LuxuryConsultationCTA() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#F4EFE6] text-stone-900 overflow-hidden border-b border-[#E7E2D9]">
      {/* Background Subtle Gradient & Light Tone */}
      <div className="absolute inset-0 bg-[radial-gradient(#E7E2D9_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9E7E4F]/30 bg-white shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E7E4F]"></span>
          <span className="text-[11px] font-sans tracking-luxury uppercase text-[#83673C] font-semibold">
            COMMISSION AN EXECUTIVE SEARCH
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl text-stone-900 font-light tracking-tight leading-tight max-w-3xl mx-auto">
          Ready to Elevate Your Engineering{' '}
          <span className="font-editorial-italic text-[#9E7E4F]">Leadership?</span>
        </h2>

        <p className="max-w-xl mx-auto text-base text-stone-600 font-sans font-normal leading-relaxed">
          Whether you need a Staff Distributed Systems Architect or a Lead Cloud Infrastructure Engineer, experience what happens when technical depth leads talent search.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <Link href="/companies" className="btn-dark">
            <span>Commission a Search</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/918041238900?text=Hello%20Treo%20Consultancy,%20we%20want%20to%20hire%20engineers."
            target="_blank"
            rel="noreferrer"
            className="btn-luxury-outline inline-flex items-center gap-2 hover:border-[#25D366] hover:text-[#25D366]"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Direct WhatsApp</span>
          </a>
        </div>

        <div className="pt-10 border-t border-[#E7E2D9] flex flex-wrap items-center justify-center gap-8 text-xs font-sans text-stone-600 tracking-luxury uppercase font-medium">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#9E7E4F]" />
            <span>+91 (080) 4123-8900</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#9E7E4F]" />
            <span>contact@talenty.in</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#9E7E4F]">Bengaluru Studio HQ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
