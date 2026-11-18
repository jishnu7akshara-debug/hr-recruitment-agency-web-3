-- Talenty Consultancy Postgres Schema
-- Production Database Setup with Sequences and RLS

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sequences for Human-Friendly Codes
CREATE SEQUENCE IF NOT EXISTS seq_jobs START WITH 2041;
CREATE SEQUENCE IF NOT EXISTS seq_applications START WITH 1001;
CREATE SEQUENCE IF NOT EXISTS seq_requirements START WITH 501;
CREATE SEQUENCE IF NOT EXISTS seq_candidates START WITH 301;
CREATE SEQUENCE IF NOT EXISTS seq_placements START WITH 101;

-- 1. Profiles Table (Staff Authentication & Roles)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'recruiter' CHECK (role IN ('recruiter', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL DEFAULT ('TLT-' || nextval('seq_jobs')::TEXT),
  title TEXT NOT NULL,
  client_label TEXT NOT NULL DEFAULT 'Confidential Enterprise Client',
  location TEXT NOT NULL,
  work_mode TEXT NOT NULL CHECK (work_mode IN ('Remote', 'Hybrid', 'On-site')),
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Contract', 'Contract-to-Hire')),
  exp_min INT NOT NULL DEFAULT 2,
  exp_max INT NOT NULL DEFAULT 8,
  lpa_min NUMERIC(6,2) NOT NULL,
  lpa_max NUMERIC(6,2) NOT NULL,
  notice_period TEXT NOT NULL DEFAULT 'Immediate to 30 days',
  skills TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  responsibilities TEXT[] DEFAULT '{}',
  must_have TEXT[] DEFAULT '{}',
  good_to_have TEXT[] DEFAULT '{}',
  interview_process TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'closed')),
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Candidates Database
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL DEFAULT ('CAN-' || nextval('seq_candidates')::TEXT),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  total_experience NUMERIC(4,1) NOT NULL DEFAULT 0,
  current_ctc NUMERIC(6,2) NOT NULL DEFAULT 0,
  expected_ctc NUMERIC(6,2) NOT NULL DEFAULT 0,
  notice_period TEXT NOT NULL,
  location TEXT DEFAULT 'India',
  skills TEXT[] NOT NULL DEFAULT '{}',
  current_company TEXT,
  current_designation TEXT,
  resume_path TEXT,
  resume_url TEXT,
  consent_given BOOLEAN NOT NULL DEFAULT true,
  consent_timestamp TIMESTAMPTZ DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Requirements (Company Inquiries)
CREATE TABLE IF NOT EXISTS requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL DEFAULT ('REQ-' || nextval('seq_requirements')::TEXT),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  work_email TEXT NOT NULL,
  phone TEXT NOT NULL,
  roles_needed TEXT NOT NULL,
  headcount INT NOT NULL DEFAULT 1,
  key_skills TEXT[] NOT NULL DEFAULT '{}',
  exp_min INT NOT NULL DEFAULT 2,
  exp_max INT NOT NULL DEFAULT 8,
  budget_lpa_min NUMERIC(6,2) NOT NULL DEFAULT 10,
  budget_lpa_max NUMERIC(6,2) NOT NULL DEFAULT 25,
  engagement_model TEXT NOT NULL CHECK (engagement_model IN ('Permanent', 'Contract', 'Contract-to-hire')),
  urgency TEXT NOT NULL CHECK (urgency IN ('Immediate (<15 days)', 'Standard (30 days)', 'Pipeline building')),
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'Sourcing', 'Shortlist sent', 'Closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL DEFAULT ('APP-' || nextval('seq_applications')::TEXT),
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  candidate_id UUID REFERENCES candidates(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  total_experience NUMERIC(4,1) NOT NULL,
  current_ctc NUMERIC(6,2) NOT NULL,
  expected_ctc NUMERIC(6,2) NOT NULL,
  notice_period TEXT NOT NULL,
  resume_path TEXT,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Screening', 'Submitted to client', 'Interview', 'Offered', 'Joined', 'Rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Placements (Commission & Revenue Tracker)
CREATE TABLE IF NOT EXISTS placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL DEFAULT ('PLC-' || nextval('seq_placements')::TEXT),
  application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
  requirement_id UUID REFERENCES requirements(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  candidate_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  annual_ctc NUMERIC(8,2) NOT NULL,
  commission_percentage NUMERIC(4,2) NOT NULL DEFAULT 8.33,
  commission_amount NUMERIC(8,2) NOT NULL,
  invoice_status TEXT NOT NULL DEFAULT 'Draft' CHECK (invoice_status IN ('Draft', 'Invoiced', 'Paid', 'Overdue')),
  invoice_date DATE,
  joining_date DATE NOT NULL,
  replacement_guarantee_end_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Internal Notes
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('application', 'candidate', 'requirement', 'job', 'placement')),
  entity_id UUID NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Recruiter',
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Activity Log
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  performed_by TEXT NOT NULL DEFAULT 'System',
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'responded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Public Read: Published jobs only
CREATE POLICY "Public can view published jobs"
ON jobs FOR SELECT
USING (is_published = true AND status = 'published');

-- Public Insert: Candidates, Applications, Requirements, Contact Messages
CREATE POLICY "Public can insert applications"
ON applications FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public can insert requirements"
ON requirements FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public can insert candidates"
ON candidates FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public can insert contact messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

-- Staff Access: Authenticated users can read/modify all
CREATE POLICY "Staff full access to profiles"
ON profiles FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Staff full access to jobs"
ON jobs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Staff full access to candidates"
ON candidates FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Staff full access to requirements"
ON requirements FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Staff full access to applications"
ON applications FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Staff full access to placements"
ON placements FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Staff full access to notes"
ON notes FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Staff full access to activity_log"
ON activity_log FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Staff full access to contact_messages"
ON contact_messages FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

