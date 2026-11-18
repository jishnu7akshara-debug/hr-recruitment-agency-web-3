import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    quote:
      'Talenty transformed our engineering hiring trajectory. Instead of sifting through 100 random resumes, they presented three deeply vetted staff engineers. All three passed our architectural round, and we made our lead hire in 12 days.',
    author: 'Anand Deshmukh',
    role: 'VP of Engineering',
    company: 'Nexura Capital (Series-B FinTech)',
    rating: 5,
  },
  {
    quote:
      'As a senior architect who doesn’t keep a public profile on job boards, Talenty connected me to a high-concurrency role that matched my expectations exactly. The confidentiality and technical depth of their team was unmatched.',
    author: 'Arjun Venkatraman',
    role: 'Staff Full Stack Engineer (Placed)',
    company: 'Leading Quick Commerce Scaleup',
    rating: 5,
  },
  {
    quote:
      'Their 90-day replacement guarantee gave our executive board total peace of mind. But more importantly, we haven’t needed to invoke it once across 8 critical engineering placements.',
    author: 'Meera Chidambaram',
    role: 'Chief Technology Officer',
    company: 'Global Enterprise Logistics SaaS',
    rating: 5,
  },
];

export default function ClientTestimonials() {
  return (
    <section className="py-24 sm:py-32 bg-white text-stone-900 border-b border-[#E7E2D9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Client &amp; Candidate <span className="font-editorial-italic text-[#9E7E4F]">Praise</span>
          </h2>
          <p className="text-sm text-stone-600 font-sans font-normal">
            Endorsements from engineering leaders and practitioners who value precision search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] border border-[#E7E2D9] p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#9E7E4F]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif text-lg text-stone-800 leading-relaxed italic font-light">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7E2D9]">
                <div className="font-sans font-semibold text-sm text-stone-900">
                  {rev.author}
                </div>
                <div className="font-sans text-xs text-stone-500 mt-0.5">
                  {rev.role} · <span className="text-[#9E7E4F] font-medium">{rev.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
