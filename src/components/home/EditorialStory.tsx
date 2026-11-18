import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function EditorialStory() {
  return (
    <section className="py-24 sm:py-32 bg-white text-stone-900 relative border-b border-[#E7E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait & Film Aesthetic (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[#E7E2D9] shadow-xl group bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
                alt="Talenty Search Partner in consultation"
                className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85" />

              {/* Discreet luxury caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-sans tracking-luxury text-[#EADCC9] block mb-1">
                  BENGALURU HEADQUARTERS
                </span>
                <p className="font-serif text-lg font-light italic">
                  &ldquo;Every engineer has a story. We make sure the world hears it with clarity.&rdquo;
                </p>
              </div>
            </div>

            {/* Ambient accent square */}
            <div className="absolute -bottom-6 -right-6 w-36 h-36 border border-[#9E7E4F]/20 -z-0 hidden sm:block pointer-events-none" />
          </div>

          {/* Right Column: Editorial Narrative & Metrics (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 leading-tight">
                Crafting Teams with{' '}
                <span className="font-editorial-italic text-[#9E7E4F]">
                  Rigor &amp; Discernment
                </span>
              </h2>
            </div>

            <p className="text-base text-stone-600 leading-relaxed font-sans font-normal">
              We founded Treo Consultancy with a singular conviction: technical recruitment should feel like executive curation, not an automated numbers game. In a market crowded with scrapers and generic InMails, we choose deep technical calibration.
            </p>

            <blockquote className="border-l-2 border-[#9E7E4F] pl-6 py-2 my-6 font-serif text-xl sm:text-2xl text-stone-900 italic font-light leading-snug bg-[#FAF8F5]/60">
              &ldquo;The difference between a standard developer and an engineering leader is not syntax; it is architectural foresight and the instinct for operational grace.&rdquo;
            </blockquote>

            <p className="text-sm text-stone-600 leading-relaxed font-sans font-normal">
              Every professional introduced by our studio has been vetted through live system design dialogues, peer referencing, and thorough alignment on cultural velocity.
            </p>

            {/* Three Pillar Metrics in Zerowatts Style */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E7E2D9]">
              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#9E7E4F] font-light">
                  14<span className="text-xl">d</span>
                </div>
                <div className="font-sans text-[11px] uppercase tracking-wider text-stone-500 mt-1 font-semibold">
                  Average Shortlist Delivery
                </div>
              </div>

              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#9E7E4F] font-light">
                  92.8<span className="text-xl">%</span>
                </div>
                <div className="font-sans text-[11px] uppercase tracking-wider text-stone-500 mt-1 font-semibold">
                  1st-Round Interview Pass Rate
                </div>
              </div>

              <div>
                <div className="font-serif text-3xl sm:text-4xl text-[#9E7E4F] font-light">
                  90<span className="text-xl">d</span>
                </div>
                <div className="font-sans text-[11px] uppercase tracking-wider text-stone-500 mt-1 font-semibold">
                  Unconditional Warranty
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase font-sans tracking-luxury text-stone-900 hover:text-[#9E7E4F] transition-colors border-b border-stone-300 pb-1"
              >
                <span>Read Studio Story &amp; Leadership</span>
                <ArrowUpRight className="w-4 h-4 text-[#9E7E4F]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
