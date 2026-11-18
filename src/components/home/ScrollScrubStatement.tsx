'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollScrubStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 40%'],
  });

  const statement =
    "We reject resume spam. Every engineer is screened by practitioners, benchmarked against real distributed system challenges, and verified for immediate production delivery.";

  const words = statement.split(' ');

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 bg-[#ECEEF1] border-b-[1.5px] border-[#0B1A2C] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-xs uppercase tracking-widest text-[#4F6072] mb-6 flex items-center gap-2">
          <span className="text-[#0B1A2C] font-bold">[MISSION PROTOCOL]</span>
          <span>// SOURCING INTEGRITY BENCHMARK</span>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-2 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
          })}
        </div>

        <div className="mt-12 pt-8 border-t-[1.5px] border-[#0B1A2C]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#0B1A2C]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></span>
            <span className="font-bold">AVERAGE RESUME ACCEPTANCE RATIO: 6.4%</span>
          </div>
          <div className="text-[#4F6072]">
            94 out of 100 applications rejected at initial code & experience review.
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const isHighlighted = word.includes('reject') || word.includes('practitioners') || word.includes('immediate');

  return (
    <span className="relative">
      <motion.span
        style={{ opacity }}
        className={`inline-block transition-colors ${
          isHighlighted ? 'text-[#0B1A2C] underline decoration-[#FFB81C] decoration-4 underline-offset-4' : 'text-[#0B1A2C]'
        }`}
      >
        {word}
      </motion.span>
    </span>
  );
}

