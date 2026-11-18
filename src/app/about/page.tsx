import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About the Studio | Talenty Consultancy',
  description:
    'Talenty Consultancy is an executive IT search and talent architecture firm in Bengaluru, India. We specialize in Staff Engineers, Architects, and Tech Leaders.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 sm:py-32 border-b border-[#E7E2D9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            STUDIO MONOGRAPH
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-stone-900 tracking-tight max-w-4xl leading-tight">
            Curating Technical Leadership for{' '}
            <span className="font-editorial-italic text-[#9E7E4F]">Visionary Enterprises</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl font-sans font-normal leading-relaxed pt-2">
            Founded by former engineering directors and veteran search partners to replace mass resume automation with artful, practitioner-grade talent calibration.
          </p>
        </div>
      </section>

      {/* Main Philosophy & Photo Gallery */}
      <section className="py-24 sm:py-32 border-b border-[#E7E2D9] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
                THE FOUNDING THESIS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-light">
                Why Traditional Staffing Fails Engineering Teams
              </h2>
              <p className="text-base text-stone-600 leading-relaxed font-sans font-normal">
                Generic recruiting agencies treat engineers like inventory units. They scrape portals, keyword-match acronyms, and blast 100 unqualified CVs into hiring managers’ inboxes.
              </p>
              <p className="text-base text-stone-600 leading-relaxed font-sans font-normal">
                Talenty was founded on the opposite premise: <strong>Discernment over volume</strong>. We never introduce a candidate without a practitioner having conducted a 30-minute system design dialogue probing concurrency, schema sharding, microservice boundaries, and failure resilience.
              </p>

              <blockquote className="border-l-2 border-[#9E7E4F] pl-6 py-2 my-6 font-serif text-xl sm:text-2xl text-stone-900 italic font-light bg-[#FAF8F5]">
                &ldquo;We don’t send 20 resumes hoping one sticks. We send three exceptional engineers, and our clients usually struggle to choose between them.&rdquo;
              </blockquote>
            </div>

            {/* Team Portrait */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#E7E2D9] shadow-xl group bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85"
                  alt="Talenty Search Team in Bengaluru Studio"
                  className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase font-sans tracking-luxury text-[#EADCC9] block mb-1">
                    BENGALURU HEADQUARTERS
                  </span>
                  <p className="font-serif text-lg font-light italic">
                    Search Directors &amp; Engineering Interviewers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus & Hubs */}
      <section className="py-24 sm:py-32 bg-[#FAF8F5] border-b border-[#E7E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[16/11] rounded-sm overflow-hidden border border-[#E7E2D9] shadow-lg bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85"
                  alt="Talenty Bengaluru Campus Office"
                  className="w-full h-full object-cover filter contrast-[1.03]"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 border border-stone-200 rounded-sm shadow-sm">
                  <span className="text-[10px] uppercase font-sans tracking-luxury text-stone-900 font-semibold">
                    The Millenia, Ulsoor / Koramangala
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
                CAMPUS &amp; HUBS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-light">
                Pan-India Delivery Corridors
              </h2>
              <p className="text-base text-stone-600 leading-relaxed font-sans font-normal">
                From Bengaluru, Hyderabad, and Gurugram, we maintain real-time relationships with senior developers across Global Capability Centers (GCCs), top unicorns, and high-growth engineering hubs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-white border border-[#E7E2D9] rounded-sm shadow-xs">
                  <div className="font-serif text-xl text-stone-900 font-medium">Bengaluru</div>
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider mt-1 font-sans">
                    HQ &amp; Core Studio
                  </div>
                </div>
                <div className="p-4 bg-white border border-[#E7E2D9] rounded-sm shadow-xs">
                  <div className="font-serif text-xl text-stone-900 font-medium">Hyderabad</div>
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider mt-1 font-sans">
                    Cloud &amp; Data Pod
                  </div>
                </div>
                <div className="p-4 bg-white border border-[#E7E2D9] rounded-sm shadow-xs">
                  <div className="font-serif text-xl text-stone-900 font-medium">Gurugram / NCR</div>
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider mt-1 font-sans">
                    FinTech &amp; AI Pod
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-light">
            Partner With Our <span className="font-editorial-italic text-[#9E7E4F]">Studio</span>
          </h2>
          <p className="text-sm text-stone-600 font-sans font-normal">
            Discover what happens when experienced technologists lead your technical talent search.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/companies" className="btn-dark">
              Share Hiring Mandate
            </Link>
            <Link href="/contact" className="btn-luxury-outline">
              Connect With Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
