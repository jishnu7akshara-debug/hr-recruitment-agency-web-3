'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyRequirementSchema, CompanyRequirementInput } from '@/lib/validations';
import { CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CompaniesPage() {
  const [successReqCode, setSuccessReqCode] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompanyRequirementInput>({
    resolver: zodResolver(companyRequirementSchema),
    defaultValues: {
      headcount: 1,
      exp_min: 4,
      exp_max: 9,
      budget_lpa_min: 24,
      budget_lpa_max: 45,
      engagement_model: 'Permanent',
      urgency: 'Immediate (<15 days)',
      honeypot: '',
    },
  });

  const onSubmit = async (data: CompanyRequirementInput) => {
    setServerError(null);
    try {
      const res = await fetch('/api/companies/requirement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit requirement');
      }

      setSuccessReqCode(json.tracking_code || 'REQ-SUCCESS');
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong. Please check your inputs.');
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 pb-8 border-b border-[#E7E2D9] space-y-3">
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            CLIENT MANDATES
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-stone-900 tracking-tight">
            Commission a Strategic <span className="font-editorial-italic text-[#9E7E4F]">Search</span>
          </h1>
          <p className="text-base text-stone-600 max-w-3xl font-sans font-normal leading-relaxed">
            Detail your engineering hiring mandate. Our senior search partners will calibrate technical specifications and deliver pre-screened shortlists within 7 to 10 days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#E7E2D9] p-8 sm:p-12 rounded-sm shadow-sm">
              {successReqCode ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#9E7E4F]/10 border border-[#9E7E4F] flex items-center justify-center mx-auto text-[#9E7E4F]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light">
                    Hiring Mandate Logged
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto font-sans font-normal">
                    Your requisition has been assigned to our Lead Search Partner under tracking reference:
                  </p>

                  <div className="bg-[#FAF8F5] border border-[#E7E2D9] p-4 max-w-xs mx-auto rounded-sm">
                    <span className="font-mono text-3xl text-[#9E7E4F] font-semibold">{successReqCode}</span>
                  </div>

                  <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                    An acknowledgment email has been sent. An Account Director will connect via phone or WhatsApp within 4 business hours to finalize parameters.
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSuccessReqCode(null);
                        reset();
                      }}
                      className="btn-dark"
                    >
                      Post Another Mandate
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans">
                  {serverError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="hidden">
                    <input type="text" {...register('honeypot')} tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Section 1 */}
                  <div className="space-y-4">
                    <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block pb-2 border-b border-[#E7E2D9] font-semibold">
                      01 // COMPANY &amp; CONTACT INFORMATION
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Company Legal Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Nexura Capital Technologies"
                          {...register('company_name')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                        {errors.company_name && (
                          <p className="text-red-600 text-xs mt-1">{errors.company_name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Contact Person &amp; Role *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Anand Deshmukh (VP Engineering)"
                          {...register('contact_person')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Official Work Email *
                        </label>
                        <input
                          type="email"
                          placeholder="anand@company.com"
                          {...register('work_email')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                        {errors.work_email && (
                          <p className="text-red-600 text-xs mt-1">{errors.work_email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Direct Contact Phone *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 99110 55443"
                          {...register('phone')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="space-y-4 pt-4">
                    <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block pb-2 border-b border-[#E7E2D9] font-semibold">
                      02 // TECHNICAL PARAMETERS &amp; BUDGET
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Engineering Roles Needed *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Staff Go Engineer, Lead DevOps Specialist"
                          {...register('roles_needed')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Headcount (Hires)
                        </label>
                        <input
                          type="number"
                          min="1"
                          {...register('headcount')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                        Key Skills &amp; Stack * (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Go, Kafka, Kubernetes, PostgreSQL, AWS"
                        {...register('key_skills')}
                        className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Min Exp (Yrs)
                        </label>
                        <input
                          type="number"
                          {...register('exp_min')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Max Exp (Yrs)
                        </label>
                        <input
                          type="number"
                          {...register('exp_max')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Min Budget (LPA)
                        </label>
                        <input
                          type="number"
                          {...register('budget_lpa_min')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Max Budget (LPA)
                        </label>
                        <input
                          type="number"
                          {...register('budget_lpa_max')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Engagement Model
                        </label>
                        <select
                          {...register('engagement_model')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:outline-none"
                        >
                          <option value="Permanent">Permanent (Direct Payroll Search)</option>
                          <option value="Contract">Contract (Monthly Retainer)</option>
                          <option value="Contract-to-hire">Contract-to-hire (C2H Trial)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Hiring Urgency
                        </label>
                        <select
                          {...register('urgency')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:outline-none"
                        >
                          <option value="Immediate (<15 days)">Immediate (&lt;15 days)</option>
                          <option value="Standard (30 days)">Standard (30 days)</option>
                          <option value="Pipeline building">Pipeline building</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                        Architectural Notes &amp; Team Context
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Mention system scale, team composition, target previous companies..."
                        {...register('notes')}
                        className="w-full bg-[#FAF8F5] border border-[#E7E2D9] p-3 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none"
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-dark w-full py-3.5 shadow-sm">
                    {isSubmitting ? 'Submitting Mandate...' : 'Submit Requisition to Studio'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Guidance (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E7E2D9] p-8 rounded-sm shadow-sm space-y-4">
              <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
                SEARCH ASSURANCE
              </span>
              <h3 className="font-serif text-2xl text-stone-900 font-light">The 90-Day Guarantee</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans font-normal">
                Every permanent engineer placed through Talenty is backed by our full 90-day replacement warranty. If a hire does not work out, we provide an immediate, pre-vetted replacement at zero additional charge.
              </p>
              <div className="pt-3 border-t border-[#E7E2D9] font-sans text-xs text-[#9E7E4F] space-y-1 font-medium">
                <div>&bull; Success Fee: 8.33% - 12.5% of CTC</div>
                <div>&bull; Zero upfront retainers</div>
                <div>&bull; Payable only upon Day-1 joining</div>
              </div>
            </div>

            <div className="bg-white border border-[#E7E2D9] p-8 rounded-sm shadow-sm space-y-3 font-sans text-xs text-stone-600">
              <span className="text-[10px] uppercase tracking-luxury text-stone-900 block font-semibold">
                FAST WHATSAPP CONSULTATION
              </span>
              <p>Prefer an informal discussion regarding your hiring bandwidth?</p>
              <a
                href="https://wa.me/918041238900?text=Hello%20Talenty,%20we%20want%20to%20hire%20engineers."
                target="_blank"
                rel="noreferrer"
                className="btn-luxury-outline w-full py-2.5 flex items-center justify-center gap-2 text-xs hover:border-[#25D366] hover:text-[#25D366]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
