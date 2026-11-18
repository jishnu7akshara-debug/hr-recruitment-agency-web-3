'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null; // Admin has its own dedicated portal shell
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Curated Roles', href: '/jobs' },
    { label: 'For Companies', href: '/companies' },
    { label: 'Candidate Vault', href: '/candidates' },
    { label: 'About Studio', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        scrolled
          ? 'bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#E7E2D9] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] py-2.5 sm:py-3'
          : 'bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E7E2D9]/70 py-3.5 sm:py-4.5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* 1. Brand Logo: TREO CONSULTANCY */}
          <Link href="/" className="group flex flex-col shrink-0">
            <span className="font-serif text-xl sm:text-2xl lg:text-[25px] xl:text-[27px] tracking-[0.16em] font-light text-stone-900 group-hover:text-[#9E7E4F] transition-colors uppercase whitespace-nowrap">
              TREO CONSULTANCY<span className="text-[#9E7E4F] font-normal">.</span>
            </span>
            <span className="font-sans text-[8px] sm:text-[8.5px] uppercase tracking-[0.24em] text-[#9E7E4F] font-semibold -mt-0.5 whitespace-nowrap">
              Executive IT &amp; Engineering Recruitment
            </span>
          </Link>

          {/* 2. Desktop Navigation Links (Spacious, beautifully aligned) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-9 2xl:gap-11">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[12px] xl:text-[12.5px] font-sans uppercase tracking-[0.15em] transition-all relative py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-[#9E7E4F] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#9E7E4F]'
                      : 'text-stone-700 hover:text-[#9E7E4F] font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-900 border border-[#E7E2D9] bg-white hover:border-[#9E7E4F] transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E7E2D9] px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3 font-sans text-xs uppercase tracking-[0.14em]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-stone-200/60 ${
                  pathname === link.href ? 'text-[#9E7E4F] font-bold' : 'text-stone-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
