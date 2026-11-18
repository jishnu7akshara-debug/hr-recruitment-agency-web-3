'use client';

import React, { useState, useEffect } from 'react';
import { Placement, InvoiceStatus } from '@/types';
import {
  Plus,
  Download,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INVOICE_STATUS_OPTIONS: InvoiceStatus[] = ['Draft', 'Invoiced', 'Paid', 'Overdue'];

const INVOICE_STATUS_BADGES: Record<InvoiceStatus, string> = {
  Draft: 'bg-stone-100 text-stone-600 border-stone-200',
  Invoiced: 'bg-blue-50 text-blue-800 border-blue-200',
  Paid: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Overdue: 'bg-rose-50 text-rose-800 border-rose-200',
};

export default function CommissionsAdminPage() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Placement Form State
  const [formData, setFormData] = useState({
    client_name: '',
    candidate_name: '',
    role_title: '',
    annual_ctc: 32,
    commission_percentage: 8.33,
    invoice_status: 'Invoiced' as InvoiceStatus,
    joining_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString().split('T')[0],
    replacement_guarantee_end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 105).toISOString().split('T')[0],
    notes: '90-day replacement warranty active from joining date.',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const res = await fetch('/api/admin/placements');
      const data = await res.json();
      if (data.placements) {
        setPlacements(data.placements);
      }
    } catch (err) {
      console.error('Failed fetching placements', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvoiceStatusChange = async (id: string, newStatus: InvoiceStatus) => {
    setPlacements((prev) =>
      prev.map((p) => (p.id === id ? { ...p, invoice_status: newStatus } : p))
    );

    try {
      await fetch(`/api/admin/placements/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice_status: newStatus }),
      });
    } catch (e) {
      console.error('Failed status change', e);
      fetchPlacements();
    }
  };

  const handleCreatePlacement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/placements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to record placement');

      setPlacements((prev) => [data.placement, ...prev]);
      setIsModalOpen(false);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (err: any) {
      alert(err.message || 'Error recording placement');
    } finally {
      setSubmitting(false);
    }
  };

  // Aggregates
  const totalExpectedLPA = placements.reduce((acc, p) => acc + p.commission_amount, 0);
  const totalReceivedLPA = placements
    .filter((p) => p.invoice_status === 'Paid')
    .reduce((acc, p) => acc + p.commission_amount, 0);
  const pendingInvoicedLPA = placements
    .filter((p) => p.invoice_status === 'Invoiced')
    .reduce((acc, p) => acc + p.commission_amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
            Financial Settlement // Fee Ledger
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide mt-1">
            Placement &amp; Commission Tracker
          </h1>
          <p className="font-mono text-xs text-stone-500 mt-1">
            Track first-year CTC fees, invoice collection states, and 90-day replacement warranty windows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-dark text-xs font-mono tracking-wider py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Record Placement</span>
          </button>
          <a
            href="/api/admin/export?type=placements"
            download="talenty-commissions.csv"
            className="btn-luxury-outline text-xs font-mono tracking-wider py-2.5 px-4 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-[#9E7E4F]" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* 3 Summary Revenue Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
        <div className="bg-white border border-[#E7E2D9] p-6 rounded-sm shadow-sm">
          <div className="text-xs uppercase text-stone-500 tracking-wider font-semibold">Total Expected Revenue</div>
          <div className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-2">
            ₹{totalExpectedLPA.toFixed(2)} <span className="font-mono text-sm text-[#9E7E4F] font-semibold">LPA</span>
          </div>
          <div className="text-[10px] text-stone-500 mt-1.5">{placements.length} Total Placements Logged</div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-sm shadow-sm">
          <div className="text-xs uppercase text-emerald-800 font-bold tracking-wider">Received (Settled Invoices)</div>
          <div className="font-serif text-3xl sm:text-4xl font-light text-emerald-900 mt-2">
            ₹{totalReceivedLPA.toFixed(2)} <span className="font-mono text-sm text-emerald-700 font-semibold">LPA</span>
          </div>
          <div className="text-[10px] text-emerald-700 mt-1.5 font-medium">Paid in full with bank confirmation</div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-6 rounded-sm shadow-sm">
          <div className="text-xs uppercase text-amber-800 font-bold tracking-wider">Invoiced / Pending Collection</div>
          <div className="font-serif text-3xl sm:text-4xl font-light text-amber-900 mt-2">
            ₹{pendingInvoicedLPA.toFixed(2)} <span className="font-mono text-sm text-amber-700 font-semibold">LPA</span>
          </div>
          <div className="text-[10px] text-amber-700 mt-1.5 font-medium">Payment due within 30 days of joining</div>
        </div>
      </div>

      {/* Placements Table */}
      <div className="bg-white border border-[#E7E2D9] rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] text-stone-600 font-mono text-[11px] uppercase tracking-wider border-b border-[#E7E2D9]">
              <th className="py-3.5 px-4 font-semibold">Placement Code / Client</th>
              <th className="py-3.5 px-4 font-semibold">Placed Candidate &amp; Role</th>
              <th className="py-3.5 px-4 font-semibold">Annual CTC</th>
              <th className="py-3.5 px-4 font-semibold">Commission Fee</th>
              <th className="py-3.5 px-4 font-semibold">Joining Date</th>
              <th className="py-3.5 px-4 font-semibold">90-Day Guarantee End</th>
              <th className="py-3.5 px-4 font-semibold text-right">Invoice Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs font-mono">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-stone-400">
                  Loading placement ledger...
                </td>
              </tr>
            ) : placements.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-stone-400">
                  No placements recorded yet.
                </td>
              </tr>
            ) : (
              placements.map((plc) => (
                <tr key={plc.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-serif text-base text-stone-900 font-medium">
                      {plc.client_name}
                    </div>
                    <span className="bg-[#FAF8F5] border border-[#E7E2D9] text-[#83673C] text-[10px] px-1.5 py-0.2 mt-0.5 inline-block font-semibold rounded-xs">
                      {plc.code}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-900 font-medium">{plc.candidate_name}</div>
                    <div className="text-[11px] text-stone-500">{plc.role_title}</div>
                  </td>

                  <td className="py-3.5 px-4 text-stone-900">
                    ₹{plc.annual_ctc.toFixed(2)} LPA
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-[#9E7E4F] font-semibold">
                      ₹{plc.commission_amount.toFixed(2)} LPA
                    </div>
                    <div className="text-[10px] text-stone-500">{plc.commission_percentage}% CTC</div>
                  </td>

                  <td className="py-3.5 px-4 text-stone-700">
                    {new Date(plc.joining_date).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-0.5 text-stone-700 rounded-sm">
                      {new Date(plc.replacement_guarantee_end_date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={plc.invoice_status}
                      onChange={(e) =>
                        handleInvoiceStatusChange(plc.id, e.target.value as InvoiceStatus)
                      }
                      className={`text-xs font-mono font-medium px-2 py-1 border cursor-pointer rounded-sm focus:outline-none ${
                        INVOICE_STATUS_BADGES[plc.invoice_status]
                      }`}
                    >
                      {INVOICE_STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st} className="bg-white text-stone-900">
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Record Placement Drawer / Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white border-l border-[#E7E2D9] shadow-2xl min-h-screen p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D9]">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
                  Monetization Ledger
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-light mt-0.5">
                  Record Confirmed Placement
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors rounded-sm">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreatePlacement} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                  Client Company *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="e.g. Swiggy, Razorpay, Nexura Capital"
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                />
              </div>

              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                  Candidate Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.candidate_name}
                  onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
                  placeholder="e.g. Arjun Venkatraman"
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                />
              </div>

              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">Role Title *</label>
                <input
                  type="text"
                  required
                  value={formData.role_title}
                  onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
                  placeholder="e.g. Staff Full Stack Engineer"
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                    Annual CTC (LPA) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={formData.annual_ctc}
                    onChange={(e) =>
                      setFormData({ ...formData, annual_ctc: parseFloat(e.target.value) })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                    Commission % *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.commission_percentage}
                    onChange={(e) =>
                      setFormData({ ...formData, commission_percentage: parseFloat(e.target.value) })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-sm text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#E7E2D9] flex items-center justify-between rounded-sm">
                <span className="text-stone-600">Calculated Placement Fee:</span>
                <span className="font-serif text-lg text-[#9E7E4F] font-semibold">
                  ₹{((formData.annual_ctc * formData.commission_percentage) / 100).toFixed(2)} LPA
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                    Joining Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.joining_date}
                    onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                    90-Day Guarantee End *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.replacement_guarantee_end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, replacement_guarantee_end_date: e.target.value })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 uppercase tracking-wider mb-1 font-semibold">
                  Initial Invoice Status
                </label>
                <select
                  value={formData.invoice_status}
                  onChange={(e) =>
                    setFormData({ ...formData, invoice_status: e.target.value as InvoiceStatus })
                  }
                  className="w-full bg-[#FAF8F5] border border-[#E7E2D9] px-3 py-2 text-xs text-stone-900 focus:border-[#9E7E4F] focus:bg-white focus:outline-none rounded-sm"
                >
                  {INVOICE_STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-luxury-outline py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-dark py-2 px-6 shadow-sm"
                >
                  {submitting ? 'Recording...' : 'Save Placement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
