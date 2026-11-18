'use client';

import React from 'react';

export function SkillsMarquee() {
  const skills = [
    'Next.js 14',
    'Go / Golang',
    'Kubernetes (EKS/GKE)',
    'Java 21 / Spring Boot',
    'PySpark / Databricks',
    'PostgreSQL & CockroachDB',
    'Kafka & Event Streaming',
    'Python & GenAI / LLM Agents',
    'Terraform & GitOps',
    'React 18 & TypeScript',
    'AWS Cloud Architect',
    'FastAPI & vLLM',
    'Playwright & k6',
    'Redis Clusters',
    'Microservices & gRPC',
  ];

  return (
    <div className="bg-[#0B1A2C] border-y-[1.5px] border-[#0B1A2C] py-3.5 overflow-hidden select-none">
      <div className="flex w-[200%] animate-marquee">
        <div className="flex items-center gap-8 shrink-0 px-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#FFB81C] rounded-full"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#EEF1F5] font-semibold">
                {skill}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-8 shrink-0 px-4">
          {skills.map((skill, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#FFB81C] rounded-full"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#EEF1F5] font-semibold">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OutlineTextMarquee() {
  const phrases = [
    'PRECISION ENGINEERING SEARCH',
    'ZERO RESUME SPAM',
    'TOP 1% ARCHITECTS & TECH LEADS',
    '90-DAY UNCONDITIONAL GUARANTEE',
    '14-DAY AVERAGE TIME TO SHORTLIST',
    'CONFIDENTIAL CLIENT PROFILES',
    'DEEP TECHNICAL SCREENING',
  ];

  return (
    <div className="bg-[#ECEEF1] border-b-[1.5px] border-[#0B1A2C] py-2.5 overflow-hidden select-none">
      <div className="flex w-[200%] animate-marquee-fast">
        <div className="flex items-center gap-10 shrink-0 px-6">
          {phrases.map((phrase, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="font-heading font-black text-2xl tracking-tight text-transparent [-webkit-text-stroke:1.5px_#0B1A2C]">
                {phrase}
              </span>
              <span className="text-[#0B1A2C] font-mono text-sm font-bold">[+]</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-10 shrink-0 px-6">
          {phrases.map((phrase, i) => (
            <div key={`dup2-${i}`} className="flex items-center gap-6">
              <span className="font-heading font-black text-2xl tracking-tight text-transparent [-webkit-text-stroke:1.5px_#0B1A2C]">
                {phrase}
              </span>
              <span className="text-[#0B1A2C] font-mono text-sm font-bold">[+]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

