'use client';

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Floating WhatsApp pill button */}
      <a
        href="https://wa.me/918041238900?text=Hello%20Treo%20Consultancy,%20I%20would%20like%20to%20discuss%20our%20engineering%20hiring%20mandate."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation"
        className="group flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20BD5A] transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-sans text-xs font-semibold tracking-wide uppercase pr-1 hidden sm:inline-block">
          Direct WhatsApp
        </span>
      </a>
    </div>
  );
}

