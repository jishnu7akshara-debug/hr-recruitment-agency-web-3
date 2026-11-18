import { z } from 'zod';

// Phone number regex for Indian standard and international formats
const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

export const applicationSchema = z.object({
  job_id: z.string().min(1, 'Target job is required'),
  name: z.string().min(2, 'Full name must be at least 2 characters').max(80),
  email: z.string().email('Please provide a valid work or personal email address'),
  phone: z.string().min(10, 'Valid 10-digit mobile number required'),
  total_experience: z.coerce.number().min(0, 'Experience cannot be negative').max(40, 'Please enter realistic experience in years'),
  current_ctc: z.coerce.number().min(0, 'Current CTC in LPA is required'),
  expected_ctc: z.coerce.number().min(0.5, 'Expected CTC in LPA is required'),
  notice_period: z.string().min(2, 'Please select or enter your notice period'),
  honeypot: z.string().max(0, 'Bot submission rejected').optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const companyRequirementSchema = z.object({
  company_name: z.string().min(2, 'Company name is required').max(100),
  contact_person: z.string().min(2, 'Contact person name is required').max(80),
  work_email: z.string().email('Please enter a valid official work email address'),
  phone: z.string().min(10, 'Contact phone number is required'),
  roles_needed: z.string().min(3, 'Specify the engineering roles required'),
  headcount: z.coerce.number().int().min(1, 'Headcount must be at least 1').max(100),
  key_skills: z.string().min(2, 'Specify key tech stack requirements (comma separated)'),
  exp_min: z.coerce.number().min(0).max(30),
  exp_max: z.coerce.number().min(1).max(35),
  budget_lpa_min: z.coerce.number().min(3, 'Minimum budget in LPA is required'),
  budget_lpa_max: z.coerce.number().min(4, 'Maximum budget in LPA is required'),
  engagement_model: z.enum(['Permanent', 'Contract', 'Contract-to-hire'], {
    errorMap: () => ({ message: 'Please select an engagement model' }),
  }),
  urgency: z.enum(['Immediate (<15 days)', 'Standard (30 days)', 'Pipeline building'], {
    errorMap: () => ({ message: 'Please select hiring urgency' }),
  }),
  notes: z.string().max(1000).optional(),
  honeypot: z.string().max(0, 'Bot submission rejected').optional(),
});

export type CompanyRequirementInput = z.infer<typeof companyRequirementSchema>;

export const candidateProfileSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(10, 'Valid 10-digit mobile number is required'),
  total_experience: z.coerce.number().min(0).max(40),
  current_ctc: z.coerce.number().min(0, 'Current CTC in LPA'),
  expected_ctc: z.coerce.number().min(0.5, 'Expected CTC in LPA'),
  notice_period: z.string().min(2, 'Notice period is required'),
  location: z.string().min(2, 'Current location is required'),
  skills: z.string().min(2, 'Please list your primary skills (comma separated)'),
  current_company: z.string().optional(),
  current_designation: z.string().optional(),
  consent_given: z.boolean().refine((val) => val === true, {
    message: 'You must consent to Talenty storing your profile for confidential matchmaking',
  }),
  honeypot: z.string().max(0, 'Bot submission rejected').optional(),
});

export type CandidateProfileInput = z.infer<typeof candidateProfileSchema>;

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  honeypot: z.string().max(0, 'Bot submission rejected').optional(),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const jobFormSchema = z.object({
  title: z.string().min(3, 'Job title is required'),
  client_label: z.string().min(2, 'Anonymous client label is required (e.g. Series-B FinTech Unicorn)'),
  location: z.string().min(2, 'Location is required'),
  work_mode: z.enum(['Remote', 'Hybrid', 'On-site']),
  type: z.enum(['Full-time', 'Contract', 'Contract-to-Hire']),
  exp_min: z.coerce.number().min(0).max(30),
  exp_max: z.coerce.number().min(1).max(35),
  lpa_min: z.coerce.number().min(1),
  lpa_max: z.coerce.number().min(1),
  notice_period: z.string().min(2),
  skills: z.string().min(2, 'Skills comma-separated'),
  description: z.string().min(20, 'Job description must be descriptive'),
  responsibilities: z.string().min(10, 'One responsibility per line'),
  must_have: z.string().min(10, 'One must-have requirement per line'),
  good_to_have: z.string().optional(),
  interview_process: z.string().min(10, 'One interview stage per line'),
  status: z.enum(['draft', 'published', 'closed']),
  is_published: z.boolean().default(true),
});

export type JobFormInput = z.infer<typeof jobFormSchema>;

export const placementSchema = z.object({
  client_name: z.string().min(2, 'Client name is required'),
  candidate_name: z.string().min(2, 'Candidate name is required'),
  role_title: z.string().min(2, 'Role title is required'),
  annual_ctc: z.coerce.number().min(1, 'Annual CTC in LPA is required'),
  commission_percentage: z.coerce.number().min(1).max(50).default(8.33),
  invoice_status: z.enum(['Draft', 'Invoiced', 'Paid', 'Overdue']),
  joining_date: z.string().min(4, 'Joining date is required'),
  replacement_guarantee_end_date: z.string().min(4, 'Guarantee end date is required'),
  notes: z.string().optional(),
});

export type PlacementInput = z.infer<typeof placementSchema>;

