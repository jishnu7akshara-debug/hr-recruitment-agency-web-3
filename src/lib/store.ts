import fs from 'fs';
import path from 'path';
import {
  Job,
  Candidate,
  Application,
  Requirement,
  Placement,
  Note,
  ActivityLog,
  ContactMessage,
  JobFilterParams,
  ApplicationStatus,
  RequirementStatus,
} from '@/types';
import {
  INITIAL_JOBS,
  INITIAL_CANDIDATES,
  INITIAL_APPLICATIONS,
  INITIAL_REQUIREMENTS,
  INITIAL_PLACEMENTS,
  INITIAL_NOTES,
  INITIAL_ACTIVITY_LOGS,
} from './data/mock-data';

interface DatabaseSchema {
  jobs: Job[];
  candidates: Candidate[];
  applications: Application[];
  requirements: Requirement[];
  placements: Placement[];
  notes: Note[];
  activity_logs: ActivityLog[];
  contact_messages: ContactMessage[];
  counters: {
    jobs: number;
    applications: number;
    requirements: number;
    candidates: number;
    placements: number;
  };
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function getInitialDB(): DatabaseSchema {
  return {
    jobs: [...INITIAL_JOBS],
    candidates: [...INITIAL_CANDIDATES],
    applications: [...INITIAL_APPLICATIONS],
    requirements: [...INITIAL_REQUIREMENTS],
    placements: [...INITIAL_PLACEMENTS],
    notes: [...INITIAL_NOTES],
    activity_logs: [...INITIAL_ACTIVITY_LOGS],
    contact_messages: [],
    counters: {
      jobs: 2052,
      applications: 1004,
      requirements: 502,
      candidates: 302,
      placements: 103,
    },
  };
}

// In-memory cache for ultra-fast queries
let memoryDB: DatabaseSchema | null = null;

function loadDB(): DatabaseSchema {
  if (memoryDB) return memoryDB;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDB = JSON.parse(raw);
      return memoryDB!;
    }
  } catch (err) {
    console.error('Failed reading DB file, using initial data:', err);
  }

  memoryDB = getInitialDB();
  saveDB(memoryDB);
  return memoryDB;
}

function saveDB(db: DatabaseSchema) {
  memoryDB = db;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed saving DB file:', err);
  }
}

export const DataStore = {
  // JOBS
  getJobs(filters?: JobFilterParams): { jobs: Job[]; total: number; totalPages: number } {
    const db = loadDB();
    let list = db.jobs.filter((j) => j.is_published && j.status === 'published');

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.code.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.client_label.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }

    if (filters?.skill) {
      const sk = filters.skill.toLowerCase();
      list = list.filter((j) => j.skills.some((s) => s.toLowerCase().includes(sk)));
    }

    if (filters?.location) {
      const loc = filters.location.toLowerCase();
      list = list.filter((j) => j.location.toLowerCase().includes(loc));
    }

    if (filters?.work_mode && filters.work_mode !== 'all') {
      list = list.filter((j) => j.work_mode.toLowerCase() === filters.work_mode?.toLowerCase());
    }

    if (filters?.type && filters.type !== 'all') {
      list = list.filter((j) => j.type.toLowerCase() === filters.type?.toLowerCase());
    }

    if (filters?.exp_min !== undefined) {
      list = list.filter((j) => j.exp_max >= (filters.exp_min || 0));
    }

    if (filters?.exp_max !== undefined) {
      list = list.filter((j) => j.exp_min <= (filters.exp_max || 99));
    }

    if (filters?.lpa_min !== undefined) {
      list = list.filter((j) => j.lpa_max >= (filters.lpa_min || 0));
    }

    const total = list.length;
    const limit = filters?.limit || 9;
    const page = filters?.page || 1;
    const start = (page - 1) * limit;
    const paginated = list.slice(start, start + limit);
    const totalPages = Math.ceil(total / limit) || 1;

    return { jobs: paginated, total, totalPages };
  },

  getAllJobsForAdmin(): Job[] {
    const db = loadDB();
    return [...db.jobs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getJobById(idOrCode: string): Job | null {
    const db = loadDB();
    const found = db.jobs.find(
      (j) => j.id === idOrCode || j.code.toLowerCase() === idOrCode.toLowerCase()
    );
    return found || null;
  },

  createJob(jobData: Omit<Job, 'id' | 'code' | 'created_at' | 'updated_at'>): Job {
    const db = loadDB();
    const nextCode = `TLT-${db.counters.jobs++}`;
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      code: nextCode,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.jobs.unshift(newJob);
    saveDB(db);

    this.logActivity('job', newJob.id, `Created job ${newJob.code}: ${newJob.title}`, 'Recruiter Admin');
    return newJob;
  },

  updateJob(id: string, updates: Partial<Job>): Job | null {
    const db = loadDB();
    const index = db.jobs.findIndex((j) => j.id === id || j.code === id);
    if (index === -1) return null;

    db.jobs[index] = {
      ...db.jobs[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    saveDB(db);
    return db.jobs[index];
  },

  // APPLICATIONS
  getApplications(): Application[] {
    const db = loadDB();
    return [...db.applications].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  getApplicationById(idOrCode: string): Application | null {
    const db = loadDB();
    return db.applications.find((a) => a.id === idOrCode || a.code === idOrCode) || null;
  },

  createApplication(
    appData: Omit<Application, 'id' | 'code' | 'status' | 'created_at' | 'updated_at'>
  ): Application {
    const db = loadDB();
    const nextCode = `APP-${db.counters.applications++}`;
    const job = db.jobs.find((j) => j.id === appData.job_id);

    const newApp: Application = {
      ...appData,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      code: nextCode,
      job_title: job?.title || 'General IT Requisition',
      job_code: job?.code || 'TLT-OPEN',
      status: 'New',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.applications.unshift(newApp);

    // Also auto-index into candidates database if candidate doesn't exist
    const existingCandidate = db.candidates.find(
      (c) => c.email.toLowerCase() === appData.email.toLowerCase()
    );
    if (!existingCandidate) {
      const candidateCode = `CAN-${db.counters.candidates++}`;
      const newCandidate: Candidate = {
        id: `can-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        code: candidateCode,
        name: appData.name,
        email: appData.email,
        phone: appData.phone,
        total_experience: appData.total_experience,
        current_ctc: appData.current_ctc,
        expected_ctc: appData.expected_ctc,
        notice_period: appData.notice_period,
        location: 'India',
        skills: job ? job.skills.slice(0, 4) : ['Fullstack'],
        resume_path: appData.resume_path,
        resume_url: appData.resume_url,
        consent_given: true,
        consent_timestamp: new Date().toISOString(),
        tags: ['New Applicant'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      db.candidates.unshift(newCandidate);
      newApp.candidate_id = newCandidate.id;
    } else {
      newApp.candidate_id = existingCandidate.id;
    }

    saveDB(db);

    this.logActivity(
      'application',
      newApp.id,
      `New application received from ${newApp.name} for ${newApp.job_title} (${newApp.code})`,
      'Public Portal'
    );

    return newApp;
  },

  updateApplicationStatus(id: string, status: ApplicationStatus, authorName: string = 'Recruiter'): Application | null {
    const db = loadDB();
    const app = db.applications.find((a) => a.id === id || a.code === id);
    if (!app) return null;

    const previousStatus = app.status;
    app.status = status;
    app.updated_at = new Date().toISOString();
    saveDB(db);

    this.logActivity(
      'application',
      app.id,
      `Pipeline moved: ${previousStatus} -> ${status} for ${app.name} (${app.code})`,
      authorName,
      { previous: previousStatus, current: status }
    );

    return app;
  },

  // REQUIREMENTS (Client Companies)
  getRequirements(): Requirement[] {
    const db = loadDB();
    return [...db.requirements].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  getRequirementById(idOrCode: string): Requirement | null {
    const db = loadDB();
    return db.requirements.find((r) => r.id === idOrCode || r.code === idOrCode) || null;
  },

  createRequirement(
    reqData: Omit<Requirement, 'id' | 'code' | 'status' | 'created_at' | 'updated_at'>
  ): Requirement {
    const db = loadDB();
    const nextCode = `REQ-${db.counters.requirements++}`;
    const newReq: Requirement = {
      ...reqData,
      id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      code: nextCode,
      status: 'Open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.requirements.unshift(newReq);
    saveDB(db);

    this.logActivity(
      'requirement',
      newReq.id,
      `New requirement logged: ${newReq.company_name} - ${newReq.roles_needed} (${newReq.code})`,
      'Company Portal'
    );

    return newReq;
  },

  updateRequirementStatus(id: string, status: RequirementStatus): Requirement | null {
    const db = loadDB();
    const req = db.requirements.find((r) => r.id === id || r.code === id);
    if (!req) return null;

    const prev = req.status;
    req.status = status;
    req.updated_at = new Date().toISOString();
    saveDB(db);

    this.logActivity('requirement', req.id, `Requirement status changed: ${prev} -> ${status}`, 'Staff');
    return req;
  },

  convertRequirementToJob(reqId: string): Job | null {
    const db = loadDB();
    const req = db.requirements.find((r) => r.id === reqId || r.code === reqId);
    if (!req) return null;

    const newJob = this.createJob({
      title: req.roles_needed.split('&')[0]?.trim() || req.roles_needed,
      client_label: `${req.company_name.split(' ')[0]} Enterprise Partner`,
      location: 'Pan-India / Hybrid',
      work_mode: 'Hybrid',
      type: req.engagement_model === 'Permanent' ? 'Full-time' : 'Contract',
      exp_min: req.exp_min,
      exp_max: req.exp_max,
      lpa_min: req.budget_lpa_min,
      lpa_max: req.budget_lpa_max,
      notice_period: req.urgency.includes('Immediate') ? 'Immediate to 15 days' : '30 days',
      skills: req.key_skills.length > 0 ? req.key_skills : ['Tech Stack Specialist'],
      description: `Immediate requirement for ${req.company_name}. ${req.notes || 'Looking for top tier software engineers to join mission-critical engineering initiatives.'}`,
      responsibilities: [
        'Deliver high-reliability software modules and scalable system components',
        'Partner with client product leaders to architect features and meet delivery deadlines',
        'Maintain exceptional code standards, automated test suites, and documentation',
      ],
      must_have: req.key_skills.map((s) => `Deep hands-on experience in ${s}`),
      good_to_have: ['Microservices architecture experience', 'CI/CD pipeline and cloud deployment familiarity'],
      interview_process: [
        'Talenty Recruiter Technical Evaluation (30 mins)',
        'Client Engineering Deep Dive & Live Pairing (60 mins)',
        'Leadership & Cultural Fit Discussion (45 mins)',
      ],
      status: 'published',
      is_published: true,
    });

    this.updateRequirementStatus(req.id, 'Sourcing');
    this.addNote('requirement', req.id, 'Recruiter Admin', `Converted requirement to public job listing ${newJob.code}`);

    return newJob;
  },

  // CANDIDATES
  getCandidates(): Candidate[] {
    const db = loadDB();
    return [...db.candidates].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  getCandidateById(idOrCode: string): Candidate | null {
    const db = loadDB();
    return db.candidates.find((c) => c.id === idOrCode || c.code === idOrCode) || null;
  },

  createCandidate(
    candidateData: Omit<Candidate, 'id' | 'code' | 'created_at' | 'updated_at'>
  ): Candidate {
    const db = loadDB();
    const nextCode = `CAN-${db.counters.candidates++}`;
    const newCandidate: Candidate = {
      ...candidateData,
      id: `can-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      code: nextCode,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.candidates.unshift(newCandidate);
    saveDB(db);

    this.logActivity(
      'candidate',
      newCandidate.id,
      `New candidate registered: ${newCandidate.name} (${newCandidate.code})`,
      'Candidate Portal'
    );

    return newCandidate;
  },

  updateCandidate(id: string, updates: Partial<Candidate>): Candidate | null {
    const db = loadDB();
    const idx = db.candidates.findIndex((c) => c.id === id || c.code === id);
    if (idx === -1) return null;

    db.candidates[idx] = {
      ...db.candidates[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    saveDB(db);
    return db.candidates[idx];
  },

  // PLACEMENTS & COMMISSIONS
  getPlacements(): Placement[] {
    const db = loadDB();
    return [...db.placements].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  createPlacement(
    placementData: Omit<Placement, 'id' | 'code' | 'created_at' | 'updated_at'>
  ): Placement {
    const db = loadDB();
    const nextCode = `PLC-${db.counters.placements++}`;
    const newPlacement: Placement = {
      ...placementData,
      id: `plc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      code: nextCode,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.placements.unshift(newPlacement);
    saveDB(db);

    this.logActivity(
      'placement',
      newPlacement.id,
      `New placement tracked: ${newPlacement.candidate_name} @ ${newPlacement.client_name} (₹${newPlacement.commission_amount.toFixed(2)}L commission)`,
      'Finance & Admin'
    );

    return newPlacement;
  },

  updatePlacement(id: string, updates: Partial<Placement>): Placement | null {
    const db = loadDB();
    const idx = db.placements.findIndex((p) => p.id === id || p.code === id);
    if (idx === -1) return null;

    db.placements[idx] = {
      ...db.placements[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    saveDB(db);
    return db.placements[idx];
  },

  // NOTES
  getNotes(entityType: string, entityId: string): Note[] {
    const db = loadDB();
    return db.notes
      .filter((n) => n.entity_type === entityType && n.entity_id === entityId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  addNote(entityType: Note['entity_type'], entityId: string, authorName: string, text: string): Note {
    const db = loadDB();
    const newNote: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      entity_type: entityType,
      entity_id: entityId,
      author_name: authorName,
      text,
      created_at: new Date().toISOString(),
    };
    db.notes.unshift(newNote);
    saveDB(db);
    return newNote;
  },

  // ACTIVITY LOGS
  getActivityLogs(limit: number = 20): ActivityLog[] {
    const db = loadDB();
    return [...db.activity_logs]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  },

  logActivity(
    entity_type: string,
    entity_id: string,
    action: string,
    performed_by: string = 'System',
    details: Record<string, any> = {}
  ): ActivityLog {
    const db = loadDB();
    const log: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      entity_type,
      entity_id,
      action,
      performed_by,
      details,
      created_at: new Date().toISOString(),
    };
    db.activity_logs.unshift(log);
    // Keep max 100 entries
    if (db.activity_logs.length > 100) {
      db.activity_logs.pop();
    }
    saveDB(db);
    return log;
  },

  // CONTACT MESSAGES
  saveContactMessage(data: Omit<ContactMessage, 'id' | 'status' | 'created_at'>): ContactMessage {
    const db = loadDB();
    const msg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'unread',
      created_at: new Date().toISOString(),
    };
    db.contact_messages.unshift(msg);
    saveDB(db);
    return msg;
  },

  getContactMessages(): ContactMessage[] {
    const db = loadDB();
    return [...db.contact_messages].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  // DASHBOARD AGGREGATES
  getDashboardStats() {
    const db = loadDB();
    const liveJobs = db.jobs.filter((j) => j.is_published && j.status === 'published').length;
    const activeApplications = db.applications.filter((a) => a.status !== 'Rejected').length;
    const openRequirements = db.requirements.filter((r) => r.status !== 'Closed').length;
    const candidateProfiles = db.candidates.length;

    // Pipeline counts by status
    const pipelineCounts: Record<ApplicationStatus, number> = {
      New: 0,
      Screening: 0,
      'Submitted to client': 0,
      Interview: 0,
      Offered: 0,
      Joined: 0,
      Rejected: 0,
    };
    db.applications.forEach((a) => {
      if (pipelineCounts[a.status] !== undefined) {
        pipelineCounts[a.status]++;
      }
    });

    // Commission totals
    let expectedRevenueLPA = 0;
    let receivedRevenueLPA = 0;
    db.placements.forEach((p) => {
      expectedRevenueLPA += p.commission_amount;
      if (p.invoice_status === 'Paid') {
        receivedRevenueLPA += p.commission_amount;
      }
    });

    return {
      liveJobs,
      activeApplications,
      openRequirements,
      candidateProfiles,
      pipelineCounts,
      expectedRevenueLPA,
      receivedRevenueLPA,
      recentActivity: db.activity_logs.slice(0, 8),
    };
  },
};

