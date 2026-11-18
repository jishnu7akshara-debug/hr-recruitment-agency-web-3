'use client';

import React, { useState } from 'react';
import { Job } from '@/types';
import ApplyModal from './ApplyModal';
import { ArrowRight, Share2, Check } from 'lucide-react';

export default function JobDetailClient({ job }: { job: Job }) {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 pt-4">
        <button
          onClick={() => setIsApplyOpen(true)}
          className="btn-gold"
        >
          <span>Apply for this Role</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleShare}
          className="btn-luxury-outline inline-flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Link Copied' : 'Share Requisition'}</span>
        </button>
      </div>

      <ApplyModal job={job} isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </>
  );
}
