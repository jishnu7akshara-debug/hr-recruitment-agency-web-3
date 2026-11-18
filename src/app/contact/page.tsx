'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactMessageSchema, ContactMessageInput } from '@/lib/validations';
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactMessageInput) => {
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit message');
      }

      setSubmitted(true);
      reset();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 pb-8 border-b border-[#E7E2D9] space-y-3">
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-stone-900 tracking-tight">
            Connect With the <span className="font-editorial-italic text-[#9E7E4F]">Studio</span>
          </h1>
          <p className="text-base text-stone-600 max-w-3xl font-sans font-normal leading-relaxed">
            Whether you are expanding engineering capacity or seeking career trajectory guidance, our senior search partners respond within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Studio Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-[#E7E2D9] p-8 rounded-sm shadow-sm space-y-6">
              <div>
                <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold mb-2">
                  BENGALURU HEADQUARTERS
                </span>
                <h3 className="font-serif text-2xl text-stone-900">Talenty Consultancy LLP</h3>
                <div className="flex items-start gap-3 text-xs text-stone-600 mt-2 font-sans leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#9E7E4F] shrink-0 mt-0.5" />
                  <span>
                    The Millenia, Level 4, Tower B<br />
                    1 &amp; 2 Murphy Road, Ulsoor / Koramangala<br />
                    Bengaluru, Karnataka 560008, India
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E2D9] space-y-3 text-xs font-sans text-stone-600">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#9E7E4F] shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-luxury text-stone-400 font-semibold">
                      TELEPHONE
                    </span>
                    <a href="tel:+918041238900" className="text-stone-900 hover:text-[#9E7E4F] transition-colors font-medium">
                      +91 (080) 4123-8900
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#9E7E4F] shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-luxury text-stone-400 font-semibold">
                      CORRESPONDENCE
                    </span>
                    <a href="mailto:contact@talenty.in" className="text-stone-900 hover:text-[#9E7E4F] transition-colors font-medium">
                      contact@talenty.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#9E7E4F] shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-luxury text-stone-400 font-semibold">
                      OPERATING HOURS
                    </span>
                    <span className="text-stone-900 font-medium">Monday &ndash; Friday: 09:30 &ndash; 18:30 IST</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E2D9]">
                <a
                  href="https://wa.me/918041238900"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-luxury-outline w-full py-3 flex items-center justify-center gap-2 text-xs hover:border-[#25D366] hover:text-[#25D366]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Direct WhatsApp Conversation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E7E2D9] p-8 sm:p-12 rounded-sm shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#9E7E4F]/10 border border-[#9E7E4F] flex items-center justify-center mx-auto text-[#9E7E4F]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-stone-900 font-light">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto font-sans font-normal">
                    Your transmission has been assigned to an engineering search partner. We will respond within 4 business hours.
                  </p>
                  <div className="pt-4">
                    <button onClick={() => setSubmitted(false)} className="btn-dark">
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-sans">
                  <div className="hidden">
                    <input type="text" {...register('honeypot')} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Anand Deshmukh"
                        {...register('name')}
                        className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="anand@company.com"
                        {...register('email')}
                        className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98450 00000"
                        {...register('phone')}
                        className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                        Subject *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Staff Engineer Hiring Mandate"
                        {...register('subject')}
                        className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                      />
                      {errors.subject && (
                        <p className="text-red-600 text-xs mt-1">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                      Detailed Inquiry / Scope *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your engineering team, target roles, or inquiry..."
                      {...register('message')}
                      className="w-full bg-[#FAF8F5] border border-[#E7E2D9] p-4 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-dark w-full py-3.5 shadow-sm">
                    {isSubmitting ? 'Transmitting...' : 'Send Message to Studio'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
