'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, ApplicationInput } from '@/lib/validations';
import { Job } from '@/types';
import { X, Upload, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyModal({ job, isOpen, onClose }: ApplyModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successCode, setSuccessCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      job_id: job.id,
      notice_period: 'Immediate (Serving Notice)',
      total_experience: job.exp_min,
      expected_ctc: job.lpa_min,
      honeypot: '',
    },
  });

  if (!isOpen) return null;

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

  const onSubmit = async (data: ApplicationInput) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('job_id', job.id);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('total_experience', data.total_experience.toString());
      formData.append('current_ctc', data.current_ctc.toString());
      formData.append('expected_ctc', data.expected_ctc.toString());
      formData.append('notice_period', data.notice_period);
      formData.append('honeypot', data.honeypot || '');

      if (selectedFile) {
        formData.append('resume', selectedFile);
      }

      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit application');
      }

      setSuccessCode(json.tracking_code || 'APP-SUCCESS');
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#E7E2D9] rounded-sm shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 border-b border-[#E7E2D9] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-luxury text-[#9E7E4F] block font-semibold">
              APPLICATION // {job.code}
            </span>
            <h3 className="font-serif text-2xl text-stone-900 mt-1">
              {job.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {successCode ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#9E7E4F]/10 border border-[#9E7E4F] flex items-center justify-center mx-auto text-[#9E7E4F]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-stone-900 font-light">
                Application Successfully Received
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto font-sans font-normal">
                Your credentials have been securely registered under tracking code:
              </p>

              <div className="bg-[#FAF8F5] border border-[#E7E2D9] p-4 max-w-xs mx-auto rounded-sm">
                <span className="font-mono text-2xl text-[#9E7E4F] font-semibold">{successCode}</span>
              </div>

              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                A confirmation has been sent to your email. Our search partner will review your technical profile against client architectural requirements.
              </p>

              <div className="pt-4">
                <button onClick={onClose} className="btn-dark">
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-sans">
              <input type="hidden" {...register('job_id')} value={job.id} />
              <div className="hidden">
                <input type="text" {...register('honeypot')} tabIndex={-1} autoComplete="off" />
              </div>

              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-600 mb-1.5 font-semibold">
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
                  <label className="block text-xs uppercase tracking-luxury text-stone-600 mb-1.5 font-semibold">
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
                  <label className="block text-xs uppercase tracking-luxury text-stone-600 mb-1.5 font-semibold">
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
                  <label className="block text-xs uppercase tracking-luxury text-stone-600 mb-1.5 font-semibold">
                    Total Experience (Years) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="7.5"
                    {...register('total_experience')}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-4 py-2.5 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-600 mb-1.5 font-semibold">
                    Current CTC (LPA) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="24"
                    {...register('current_ctc')}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-600 mb-1.5 font-semibold">
                    Expected CTC (LPA) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="36"
                    {...register('expected_ctc')}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-stone-600 mb-1.5 font-semibold">
                    Notice Period *
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

              {/* Upload file box */}
              <div>
                <label className="block text-xs uppercase tracking-luxury text-stone-600 mb-1.5 font-semibold">
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
                      <p className="text-xs text-stone-700 font-medium">Click or drag &amp; drop your CV</p>
                      <p className="text-[10px] text-stone-500">PDF, DOC, DOCX up to 5MB</p>
                    </div>
                  )}
                </div>
                {fileError && <p className="text-red-600 text-xs mt-1">{fileError}</p>}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E7E2D9]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-dark py-2.5 px-6">
                  {isSubmitting ? 'Submitting...' : 'Submit Credentials'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
