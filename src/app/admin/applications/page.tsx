'use client';

import React, { useState, useEffect } from 'react';
import { Application, ApplicationStatus, Note } from '@/types';
import {
  Search,
  FileText,
  MessageSquare,
  Download,
  X,
  Send,
} from 'lucide-react';

const STATUS_OPTIONS: ApplicationStatus[] = [
  'New',
  'Screening',
  'Submitted to client',
  'Interview',
  'Offered',
  'Joined',
  'Rejected',
];

const STATUS_BADGE_STYLES: Record<ApplicationStatus, string> = {
  New: 'bg-blue-50 text-blue-800 border-blue-200',
  Screening: 'bg-amber-50 text-amber-800 border-amber-200',
  'Submitted to client': 'bg-purple-50 text-purple-800 border-purple-200',
  Interview: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  Offered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Joined: 'bg-green-100 text-green-900 border-green-300',
  Rejected: 'bg-stone-100 text-stone-600 border-stone-200',
};

export default function ApplicationsAdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Notes drawer state
  const [activeAppForNotes, setActiveAppForNotes] = useState<Application | null>(null);
  const [appNotes, setAppNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [noteLoading, setNoteLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error('Failed fetching applications', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      // Optimistic update
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );

      const res = await fetch(`/api/admin/applications/${appId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }
    } catch (err) {
      console.error('Error changing status', err);
      fetchApplications();
    }
  };

  const openNotesDrawer = async (app: Application) => {
    setActiveAppForNotes(app);
    setNoteLoading(true);
    try {
      const res = await fetch(`/api/admin/notes?entity_type=application&entity_id=${app.id}`);
      const data = await res.json();
      setAppNotes(data.notes || []);
    } catch (err) {
      console.error('Failed fetching notes', err);
    } finally {
      setNoteLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAppForNotes || !newNoteText.trim()) return;

    try {
      const res = await fetch('/api/admin/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity_type: 'application',
          entity_id: activeAppForNotes.id,
          text: newNoteText.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.note) {
        setAppNotes((prev) => [data.note, ...prev]);
        setNewNoteText('');
      }
    } catch (err) {
      console.error('Failed adding note', err);
    }
  };

  // Filter applications
  const filtered = applications.filter((app) => {
    const matchesSearch =
      search === '' ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.code.toLowerCase().includes(search.toLowerCase()) ||
      (app.job_title && app.job_title.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Export */}
      <div className="bg-white border border-[#E7E2D9] p-6 md:p-8 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#9E7E4F] font-semibold">
            Candidate Pipeline // Active Requisitions
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide mt-1">
            Applications Management
          </h1>
          <p className="font-mono text-xs text-stone-500 mt-1">
            Total Ingested: {applications.length} candidates across active requisitions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/export?type=applications"
            download="talenty-applications.csv"
            className="btn-luxury-outline text-xs font-mono tracking-wider py-2.5 px-4 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-[#9E7E4F]" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E7E2D9] p-4 rounded-sm shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search candidates by name, email, code (APP-XXXX), or job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E7E2D9] text-sm text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:bg-white focus:outline-none transition-colors rounded-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FAF8F5] border border-[#E7E2D9] px-3.5 py-2 text-xs font-mono text-stone-700 focus:border-[#9E7E4F] focus:outline-none rounded-sm font-medium"
          >
            <option value="all">Pipeline Status: All</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {(search || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
              }}
              className="text-xs font-mono text-[#9E7E4F] hover:underline tracking-wider font-semibold"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-[#E7E2D9] rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] text-stone-600 font-mono text-[11px] uppercase tracking-wider border-b border-[#E7E2D9]">
              <th className="py-3.5 px-4 font-semibold">Code / Candidate</th>
              <th className="py-3.5 px-4 font-semibold">Target Job</th>
              <th className="py-3.5 px-4 font-semibold">Experience & CTC</th>
              <th className="py-3.5 px-4 font-semibold">Notice Period</th>
              <th className="py-3.5 px-4 font-semibold">Pipeline Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs font-mono">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-400">
                  Loading candidate applications...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-400">
                  No applications found matching search criteria.
                </td>
              </tr>
            ) : (
              filtered.map((app) => (
                <tr key={app.id} className="hover:bg-[#FAF8F5] transition-colors">
                  {/* Candidate Name & Code */}
                  <td className="py-3.5 px-4">
                    <div className="font-serif text-base text-stone-900 font-medium">{app.name}</div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span className="bg-[#FAF8F5] border border-[#E7E2D9] text-[#83673C] px-1.5 py-0.2 font-mono text-[10px] font-semibold rounded-xs">
                        {app.code}
                      </span>
                      <span>{app.email}</span>
                      <span>·</span>
                      <span>{app.phone}</span>
                    </div>
                  </td>

                  {/* Job */}
                  <td className="py-3.5 px-4">
                    <div className="text-stone-900 max-w-xs truncate font-medium">
                      {app.job_title}
                    </div>
                    <div className="text-[10px] text-stone-400">{app.job_code}</div>
                  </td>

                  {/* Exp & CTC */}
                  <td className="py-3.5 px-4">
                    <div className="text-stone-800">{app.total_experience} Yrs</div>
                    <div className="text-[11px] text-stone-500">
                      Cur: ₹{app.current_ctc}L &rarr; <span className="text-[#9E7E4F] font-semibold">Exp: ₹{app.expected_ctc}L</span>
                    </div>
                  </td>

                  {/* Notice Period */}
                  <td className="py-3.5 px-4">
                    <span className="bg-[#FAF8F5] border border-[#E7E2D9] px-2 py-0.5 text-stone-700 rounded-sm">
                      {app.notice_period}
                    </span>
                  </td>

                  {/* Inline Status Dropdown */}
                  <td className="py-3.5 px-4">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value as ApplicationStatus)
                      }
                      className={`text-xs font-mono font-medium px-2 py-1 border cursor-pointer rounded-sm focus:outline-none ${
                        STATUS_BADGE_STYLES[app.status]
                      }`}
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st} className="bg-white text-stone-900">
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Resume link */}
                      {app.resume_url ? (
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          title="Open Résumé"
                          className="p-1.5 bg-[#FAF8F5] hover:bg-[#9E7E4F] hover:text-white border border-[#E7E2D9] text-stone-700 transition-colors rounded-sm"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="p-1.5 text-stone-300 border border-stone-200 rounded-sm">
                          <FileText className="w-3.5 h-3.5" />
                        </span>
                      )}

                      {/* Notes button */}
                      <button
                        onClick={() => openNotesDrawer(app)}
                        title="View & Add Recruiter Notes"
                        className="p-1.5 bg-[#FAF8F5] hover:bg-[#9E7E4F] hover:text-white border border-[#E7E2D9] text-stone-700 transition-colors rounded-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Recruiter Notes Side Drawer */}
      {activeAppForNotes && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border-l border-[#E7E2D9] shadow-2xl h-full flex flex-col justify-between">
            {/* Drawer Header */}
            <div className="p-5 bg-[#FAF8F5] border-b border-[#E7E2D9] flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#9E7E4F] uppercase tracking-widest font-semibold">
                  Internal Dossier // {activeAppForNotes.code}
                </span>
                <h3 className="font-serif text-xl text-stone-900 font-light mt-0.5">
                  {activeAppForNotes.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveAppForNotes(null)}
                className="p-1 hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notes List */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3 font-mono text-xs">
              {noteLoading ? (
                <div className="text-center py-8 text-stone-400">Loading dossier notes...</div>
              ) : appNotes.length === 0 ? (
                <div className="text-center py-8 text-stone-400">
                  No internal notes recorded yet for this candidate.
                </div>
              ) : (
                appNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-[#FAF8F5] border border-[#E7E2D9] space-y-1 rounded-sm">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="font-medium text-[#83673C]">{note.author_name}</span>
                      <span>
                        {new Date(note.created_at).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-stone-700 font-sans text-xs leading-relaxed">{note.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="p-4 bg-[#FAF8F5] border-t border-[#E7E2D9] space-y-3">
              <label className="block font-mono text-xs text-[#83673C] uppercase tracking-wider font-semibold">
                Add Screening / Interview Note:
              </label>
              <textarea
                rows={3}
                required
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Candidate feedback, architecture interview scoring, client reaction..."
                className="w-full bg-white border border-[#E7E2D9] p-2.5 text-xs text-stone-900 placeholder-stone-400 focus:border-[#9E7E4F] focus:outline-none rounded-sm"
              ></textarea>
              <button
                type="submit"
                className="btn-dark w-full text-xs font-mono tracking-wider py-2 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Dossier Note</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
