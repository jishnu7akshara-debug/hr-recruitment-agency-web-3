import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F4EFE6] text-stone-800 border-t border-[#E7E2D9] relative overflow-hidden">
      {/* Top Subtle Gold Hairline */}
      <div className="hairline-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E7E2D9]">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.16em] font-light text-stone-900 block uppercase">
                TREO CONSULTANCY<span className="text-[#9E7E4F]">.</span>
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#9E7E4F] font-semibold block mt-1">
                Executive IT &amp; Engineering Recruitment
              </span>
            </Link>

            <p className="text-sm text-stone-600 leading-relaxed max-w-md font-sans">
              Curating India’s most exceptional software engineering leaders, cloud architects, and data practitioners for venture-backed unicorns and tier-1 enterprise technology centers.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-700 hover:text-[#9E7E4F] hover:border-[#9E7E4F] shadow-sm transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-700 hover:text-[#9E7E4F] hover:border-[#9E7E4F] shadow-sm transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918041238900"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-stone-700 hover:text-[#9E7E4F] hover:border-[#9E7E4F] shadow-sm transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-luxury text-[#9E7E4F] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider font-sans text-stone-600">
              <li>
                <Link href="/jobs" className="hover:text-stone-900 transition-colors">
                  Open Roles
                </Link>
              </li>
              <li>
                <Link href="/jobs?work_mode=Remote" className="hover:text-stone-900 transition-colors">
                  Remote Openings
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-stone-900 transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-stone-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Mandates & Vault (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-luxury text-[#9E7E4F] font-semibold">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider font-sans text-stone-600">
              <li>
                <Link href="/companies" className="hover:text-stone-900 transition-colors">
                  Share Mandate
                </Link>
              </li>
              <li>
                <Link href="/candidates" className="hover:text-stone-900 transition-colors">
                  Candidate Vault
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-stone-900 transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-stone-900 transition-colors">
                  Fee Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio HQ (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-luxury text-[#9E7E4F] font-semibold">
              Bengaluru Studio
            </h4>
            <div className="space-y-3 text-xs text-stone-600 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9E7E4F] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  The Millenia, Level 4, Tower B, Ulsoor / Koramangala, Bengaluru, Karnataka 560008
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9E7E4F] shrink-0" />
                <a href="tel:+918041238900" className="hover:text-stone-900">
                  +91 (080) 4123-8900
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#9E7E4F] shrink-0" />
                <a href="mailto:contact@talenty.in" className="hover:text-stone-900">
                  contact@talenty.in
                </a>
              </div>
              <div className="p-3 bg-white border border-[#E7E2D9] rounded-sm font-sans text-[11px] text-stone-600 shadow-sm">
                <span className="text-[#9E7E4F] font-semibold">Guaranteed Terms:</span> 90-Day Unconditional Replacement · 8.33% - 12.5% Annual CTC.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans gap-4">
          <p className="tracking-wide">
            &copy; {new Date().getFullYear()} Treo Consultancy LLP. All rights reserved. Artful Talent Search.
          </p>
          <div className="flex items-center gap-6 uppercase tracking-widest text-[11px]">
            <Link href="/privacy" className="hover:text-[#9E7E4F] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#9E7E4F] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
