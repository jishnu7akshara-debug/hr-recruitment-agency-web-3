'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85',
    tag: 'EXECUTIVE TALENT ARCHITECTURE · PAN-INDIA',
    title: 'Precision in Engineering Leadership',
    italicWord: 'Curating the Exceptional',
    description: 'We connect India’s leading technology enterprises and high-growth scaleups with rigorously evaluated Staff Engineers, Distributed Architects, and Engineering Directors.',
    subcaption: 'Series-A to Pre-IPO Tech Curation // Bengaluru · Hyderabad · Gurugram · Remote',
  },
  {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=85',
    tag: 'CONFIDENTIAL EXECUTIVE SEARCH',
    title: 'The Art of Technical Matchmaking',
    italicWord: 'Without the Noise',
    description: 'Zero resume flooding. Every candidate is evaluated by experienced practitioners on distributed concurrency, system boundaries, and delivery velocity.',
    subcaption: 'Confidential Search Mandates // 90-Day Free Replacement Guarantee',
  },
  {
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=85',
    tag: 'PRE-VETTED ENGINEERING TALENT',
    title: 'Architecting High-Velocity Teams',
    italicWord: 'Engineered for Impact',
    description: 'From distributed high-throughput platforms to modern GenAI pipelines, we place elite technical talent calibrated to scale your roadmap from day one.',
    subcaption: 'Pan-India Delivery // 18-Day Average Sourcing Velocity',
  },
];

export default function CinematicHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#FAF8F5]">
      {/* 1. Full-Bleed Cinematic Background Slides with Weak Natural Tint */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-95 scale-100"
            />
          </div>
        ))}

        {/* Perfectly calibrated editorial tint: strengthened for richer contrast while keeping photography clearly visible */}
        <div className="absolute inset-0 bg-stone-900/20" />
        <div className="absolute inset-0 bg-[#FAF8F5]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,248,245,0.70)_0%,rgba(250,248,245,0.45)_55%,rgba(250,248,245,0.30)_100%)]" />

        {/* Soft bottom blend to transition smoothly into the next page section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/75 to-transparent" />
      </div>

      {/* 2. Unified Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center flex flex-col items-center">
        {/* Subtle Bronze Category Tag */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#9E7E4F]/40 bg-white/90 backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E7E4F] animate-pulse" />
          <span className="text-[11px] font-sans tracking-luxury uppercase text-[#83673C] font-semibold">
            {slide.tag}
          </span>
        </div>

        {/* Grand Editorial Serif Heading with Soft Text Backlight */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-stone-950 tracking-tight leading-[1.08] mb-6 max-w-4xl drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
          {slide.title} <br className="hidden sm:inline" />
          <span className="font-editorial-italic text-[#9E7E4F] font-normal inline-block mt-1">
            {slide.italicWord}
          </span>
        </h1>

        {/* Crisp Narrative Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-800 font-sans leading-relaxed mb-8 font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
          {slide.description}
        </p>

        {/* Dual Primary Call-To-Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link href="/jobs" className="btn-dark shadow-lg">
            <span>Explore Curated Roles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link href="/companies" className="btn-luxury-outline bg-white/95 backdrop-blur-sm shadow-md">
            <span>Commission a Search</span>
            <ArrowUpRight className="w-4 h-4 text-[#9E7E4F]" />
          </Link>
        </div>

        {/* 3. Discrete Luxury Trust Bar with Frosted Glass Protection */}
        <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/70 shadow-sm flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-stone-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9E7E4F]" />
            <span className="font-semibold text-stone-950">94.2%</span>
            <span>Placement Fill Rate</span>
          </div>

          <div className="hidden sm:inline-block w-1 h-1 rounded-full bg-stone-300" />

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9E7E4F]" />
            <span className="font-semibold text-stone-950">18 Days</span>
            <span>Avg Sourcing Velocity</span>
          </div>

          <div className="hidden sm:inline-block w-1 h-1 rounded-full bg-stone-300" />

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9E7E4F]" />
            <span className="font-semibold text-stone-950">90-Day</span>
            <span>Warranty Guarantee</span>
          </div>
        </div>

        {/* 4. Minimalist Slide Controls */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-1.5 rounded-full border border-white/80 bg-white/90 hover:bg-white text-stone-800 transition-colors shadow-sm backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  i === currentSlide ? 'w-8 bg-[#9E7E4F]' : 'w-2 bg-stone-400 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-1.5 rounded-full border border-white/80 bg-white/90 hover:bg-white text-stone-800 transition-colors shadow-sm backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
