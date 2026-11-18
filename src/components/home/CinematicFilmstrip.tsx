'use client';

import React from 'react';

const FRAMES = [
  {
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80',
    caption: 'ENGINEERING POD // WHITEBOARDING ARCHITECTURE',
    location: 'Bengaluru Campus',
  },
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
    caption: 'INTERVIEW CONSULTATION // CANDIDATE CALIBRATION',
    location: 'Studio Ulsoor',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80&q=80',
    caption: 'CAMPUS SPACES // TECH LEADERSHIP HUBS',
    location: 'Ulsoor / Koramangala',
  },
  {
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=700&q=80',
    caption: 'DEEP SCREENING // HIGH CONCURRENCY DIALOGUE',
    location: 'Hyderabad Pod',
  },
  {
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=700&q=80',
    caption: 'EXECUTIVE OFFER // CLIENT ADVISORY',
    location: 'Gurugram Center',
  },
];

export default function CinematicFilmstrip() {
  return (
    <section className="py-20 bg-white border-b border-[#E7E2D9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            VISUAL JOURNAL
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-stone-900 font-light">
            Moments from the <span className="font-editorial-italic text-[#9E7E4F]">Studio Floor</span>
          </h2>
        </div>
        <p className="font-sans text-xs uppercase tracking-luxury text-stone-500 hidden sm:block font-medium">
          Candid Search &amp; Placement Operations
        </p>
      </div>

      {/* Infinite Horizontal Filmstrip */}
      <div className="flex w-[200%] animate-marquee">
        <div className="flex items-center gap-6 shrink-0 px-3">
          {FRAMES.map((f, i) => (
            <div
              key={i}
              className="w-72 sm:w-80 group relative overflow-hidden rounded-sm border border-[#E7E2D9] shrink-0 bg-white shadow-sm"
            >
              <div className="aspect-[16/11] overflow-hidden bg-stone-100">
                <img
                  src={f.image}
                  alt={f.caption}
                  className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <div className="p-3.5 bg-white border-t border-[#E7E2D9] flex items-center justify-between font-sans text-[11px]">
                <span className="text-stone-900 tracking-wide font-semibold truncate max-w-[200px]">
                  {f.caption}
                </span>
                <span className="text-[#9E7E4F] text-[10px] uppercase tracking-wider shrink-0 font-medium">
                  {f.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 shrink-0 px-3">
          {FRAMES.map((f, i) => (
            <div
              key={`dup-${i}`}
              className="w-72 sm:w-80 group relative overflow-hidden rounded-sm border border-[#E7E2D9] shrink-0 bg-white shadow-sm"
            >
              <div className="aspect-[16/11] overflow-hidden bg-stone-100">
                <img
                  src={f.image}
                  alt={f.caption}
                  className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <div className="p-3.5 bg-white border-t border-[#E7E2D9] flex items-center justify-between font-sans text-[11px]">
                <span className="text-stone-900 tracking-wide font-semibold truncate max-w-[200px]">
                  {f.caption}
                </span>
                <span className="text-[#9E7E4F] text-[10px] uppercase tracking-wider shrink-0 font-medium">
                  {f.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
