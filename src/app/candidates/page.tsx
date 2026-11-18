'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { candidateProfileSchema, CandidateProfileInput } from '@/lib/validations';
import { CheckCircle2, Upload, FileText, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CandidatesPage() {
  const [successCanCode, setSuccessCanCode] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CandidateProfileInput>({
    resolver: zodResolver(candidateProfileSchema),
    defaultValues: {
      location: 'Bengaluru',
      notice_period: 'Immediate (Serving Notice)',
      consent_given: true,
      honeypot: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File exceeds 5MB size limit.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: CandidateProfileInput) => {
    setServerError(null);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('location', data.location);
      formData.append('total_experience', data.total_experience.toString());
      formData.append('current_ctc', data.current_ctc.toString());
      formData.append('expected_ctc', data.expected_ctc.toString());
      formData.append('notice_period', data.notice_period);
      formData.append('skills', data.skills);
      formData.append('current_company', data.current_company || '');
      formData.append('current_designation', data.current_designation || '');
      formData.append('consent_given', data.consent_given ? 'true' : 'false');
      formData.append('honeypot', data.honeypot || '');

      if (selectedFile) {
        formData.append('resume', selectedFile);
      }

      const res = await fetch('/api/candidates/profile', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit candidate profile');
      }

      setSuccessCanCode(json.tracking_code || 'CAN-SUCCESS');
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong. Please check your inputs.');
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 pb-8 border-b border-[#E7E2D9] space-y-3">
          <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
            CANDIDATE VAULT
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-stone-900 tracking-tight">
            Join the Confidential <span className="font-editorial-italic text-[#9E7E4F]">Vault</span>
          </h1>
          <p className="text-base text-stone-600 max-w-3xl font-sans font-normal leading-relaxed">
            Direct access to unlisted CTO mandates and leadership positions. We never blast your resume on public boards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#E7E2D9] p-8 sm:p-12 rounded-sm shadow-sm">
              {successCanCode ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#9E7E4F]/10 border border-[#9E7E4F] flex items-center justify-center mx-auto text-[#9E7E4F]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light">
                    Candidate Profile Registered
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto font-sans font-normal">
                    Your profile has been indexed into our confidential talent vault under reference:
                  </p>

                  <div className="bg-[#FAF8F5] border border-[#E7E2D9] p-4 max-w-xs mx-auto rounded-sm">
                    <span className="font-mono text-3xl text-[#9E7E4F] font-semibold">{successCanCode}</span>
                  </div>

                  <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                    A confirmation email has been dispatched. Our search partner will reach out whenever an unlisted executive mandate aligns with your compensation and architectural preferences.
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSuccessCanCode(null);
                        reset();
                      }}
                      className="btn-dark"
                    >
                      Register Another Profile
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
                      01 // PERSONAL CREDENTIALS
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Arjun Venkatraman"
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
                          placeholder="arjun.v@example.com"
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
                          Mobile Phone *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98450 12345"
                          {...register('phone')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Base Location *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Bengaluru, Hyderabad"
                          {...register('location')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block pb-2 border-b border-[#E7E2D9] font-semibold">
                      02 // TECHNICAL EXPERIENCE &amp; CTC
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Current Organization (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Swiggy, Razorpay"
                          {...register('current_company')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Current Designation (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Staff Software Engineer"
                          {...register('current_designation')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Total Exp (Yrs)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="7.5"
                          {...register('total_experience')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Current CTC (LPA)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="24"
                          {...register('current_ctc')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Expected CTC (LPA)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="36"
                          {...register('expected_ctc')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                          Notice Period
                        </label>
                        <select
                          {...register('notice_period')}
                          className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none"
                        >
                          <option value="Immediate (Serving Notice)">Immediate (Serving Notice)</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="45 Days">45 Days</option>
                          <option value="60 to 90 Days">60 to 90 Days</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                        Core Tech Stack * (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next.js, Go, Kubernetes, Kafka, PostgreSQL, Docker"
                        {...register('skills')}
                        className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-stone-700 mb-1.5 font-semibold">
                        Upload Résumé (PDF / DOCX, Max 5MB)
                      </label>
                      <div className="border border-dashed border-stone-300 bg-[#FAF8F5] p-5 text-center cursor-pointer hover:border-[#9E7E4F] transition-colors relative rounded-sm">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {selectedFile ? (
                          <div className="flex items-center justify-center gap-2 text-xs text-[#9E7E4F]">
                            <FileText className="w-5 h-5" />
                            <span className="font-medium text-stone-900">{selectedFile.name}</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-5 h-5 text-stone-400 mx-auto" />
                            <p className="text-xs text-stone-700 font-medium">Click or drag &amp; drop your CV file</p>
                            <p className="text-[10px] text-stone-500">PDF, DOC, DOCX up to 5MB</p>
                          </div>
                        )}
                      </div>
                      {fileError && <p className="text-red-600 text-xs mt-1">{fileError}</p>}
                    </div>
                  </div>

                  {/* DPDP Consent */}
                  <div className="pt-2 border-t border-[#E7E2D9]">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('consent_given')}
                        className="mt-1 w-4 h-4 text-[#9E7E4F] bg-white border-stone-300 rounded-sm focus:ring-[#9E7E4F]"
                      />
                      <span className="text-xs text-stone-600 leading-relaxed font-normal">
                        I hereby grant consent to Talenty Consultancy to securely retain my credentials in compliance with the Digital Personal Data Protection (DPDP) Act 2023 for confidential talent matchmaking. I understand that Talenty will never submit my profile or identify me to any employer without my explicit approval. *
                      </span>
                    </label>
                    {errors.consent_given && (
                      <p className="text-red-600 text-xs mt-1">{errors.consent_given.message}</p>
                    )}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-dark w-full py-3.5 shadow-sm">
                    {isSubmitting ? 'Registering Credentials...' : 'Submit Profile to Vault'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E7E2D9] p-8 rounded-sm shadow-sm space-y-4">
              <span className="text-xs uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
                CONFIDENTIALITY CHARTER
              </span>
              <h3 className="font-serif text-2xl text-stone-900 font-light">Zero Exposure</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans font-normal">
                We represent senior technologists like literary or executive agents. We never broadcast your CV, never contact current employers, and disclose salary bands transparently.
              </p>
              <div className="pt-3 border-t border-[#E7E2D9] font-sans text-xs text-[#9E7E4F] space-y-1 font-medium">
                <div>&bull; 100% Free for candidates</div>
                <div>&bull; Instant right to data erasure</div>
                <div>&bull; Direct CTO pairing loops</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
