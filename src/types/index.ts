export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type JobType = 'Full-time' | 'Contract' | 'Contract-to-Hire';
export type JobStatus = 'draft' | 'published' | 'closed';

export interface Job {
  id: string;
  code: string; // TLT-2041
  title: string;
  client_label: string; // e.g. "Series-B FinTech Unicorn (Bengaluru)"
  location: string;
  work_mode: WorkMode;
  type: JobType;
  exp_min: number;
  exp_max: number;
  lpa_min: number;
  lpa_max: number;
  notice_period: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  must_have: string[];
  good_to_have: string[];
  interview_process: string[];
  status: JobStatus;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type ApplicationStatus =
  | 'New'
  | 'Screening'
  | 'Submitted to client'
  | 'Interview'
  | 'Offered'
  | 'Joined'
  | 'Rejected';

export interface Application {
  id: string;
  code: string; // APP-1001
  job_id: string;
  job_title?: string;
  job_code?: string;
  candidate_id?: string;
  name: string;
  email: string;
  phone: string;
  total_experience: number;
  current_ctc: number;
  expected_ctc: number;
  notice_period: string;
  resume_path?: string;
  resume_url?: string;
  resume_filename?: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export type RequirementStatus = 'Open' | 'Sourcing' | 'Shortlist sent' | 'Closed';
export type EngagementModel = 'Permanent' | 'Contract' | 'Contract-to-hire';
export type RequirementUrgency = 'Immediate (<15 days)' | 'Standard (30 days)' | 'Pipeline building';

export interface Requirement {
  id: string;
  code: string; // REQ-501
  company_name: string;
  contact_person: string;
  work_email: string;
  phone: string;
  roles_needed: string;
  headcount: number;
  key_skills: string[];
  exp_min: number;
  exp_max: number;
  budget_lpa_min: number;
  budget_lpa_max: number;
  engagement_model: EngagementModel;
  urgency: RequirementUrgency;
  notes?: string;
  status: RequirementStatus;
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  id: string;
  code: string; // CAN-301
  name: string;
  email: string;
  phone: string;
  total_experience: number;
  current_ctc: number;
  expected_ctc: number;
  notice_period: string;
  location: string;
  skills: string[];
  current_company?: string;
  current_designation?: string;
  resume_path?: string;
  resume_url?: string;
  consent_given: boolean;
  consent_timestamp?: string;
  tags?: string[];
  linked_requirements?: string[];
  created_at: string;
  updated_at: string;
}

export type InvoiceStatus = 'Draft' | 'Invoiced' | 'Paid' | 'Overdue';

export interface Placement {
  id: string;
  code: string; // PLC-101
  application_id?: string;
  requirement_id?: string;
  client_name: string;
  candidate_name: string;
  role_title: string;
  annual_ctc: number;
  commission_percentage: number;
  commission_amount: number;
  invoice_status: InvoiceStatus;
  invoice_date?: string;
  joining_date: string;
  replacement_guarantee_end_date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  entity_type: 'application' | 'candidate' | 'requirement' | 'job' | 'placement';
  entity_id: string;
  author_name: string;
  author_id?: string;
  text: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  performed_by: string;
  details?: Record<string, any>;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'responded';
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  role: 'recruiter' | 'admin';
  created_at: string;
}

export interface JobFilterParams {
  search?: string;
  skill?: string;
  location?: string;
  work_mode?: string;
  type?: string;
  exp_min?: number;
  exp_max?: number;
  lpa_min?: number;
  page?: number;
  limit?: number;
}

