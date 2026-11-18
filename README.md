# Talenty Consultancy — IT Talent Architecture & Search Platform

A complete, production-ready website and recruiting console built for **Talenty Consultancy**, an elite HR and IT hiring consultancy in India that acts as a confidential middleman between **client companies** (venture-backed unicorns and enterprise engineering hubs) and **high-impact candidates** (Staff Engineers, Tech Leads, Cloud Architects, and Data Leaders).

---

## 1. Architectural Highlights

- **Next.js 14+ (App Router)** with TypeScript and Tailwind CSS.
- **Design System: Modern Blueprint / Technical Wireframe**
  - **60-30-10 Palette:** 60% Paper (`#ECEEF1`), 30% Ink (`#0B1A2C`), 10% Amber (`#FFB81C`).
  - **Technical Blueprint Details:** Visible 72px grid lines (`.blueprint-grid`), registration (`+`) marks at corners, mono-font annotation tags (`[SPEC // V4.2]`), 1.5px ink borders with hard offset shadows (`shadow-hard`).
  - **Typography:** Bricolage Grotesque (headings), DM Sans (body), JetBrains Mono (requisitions, LPA, codes).
  - **Motion & Parallax:** Multi-layer hero depth parallax with pointer tilt, scroll-scrubbed statement illuminator, 4 stacking sticky role cards, pinned horizontal 5-step process reel with amber progress bar, dual velocity marquees.
  - **Licensed Photography:** Candid shots of engineering recruiters and tech leads at work (4:5 hero crop, 16:10 step/team/office crops).
- **Public Experience:**
  - **Home:** Interactive hero, marquees, mission illuminator, 4 stacking role cards, 5-step process reel, engagement models table, 3 latest database jobs, FAQ accordion, CTA band.
  - **Jobs (`/jobs`):** Full-text search, skill badges, location filter, work mode, engagement type, server-side filtering, pagination, and shareable URLs.
  - **Job Detail (`/jobs/[id]`):** Architectural context, deliverables, prerequisites, interview sequence, JSON-LD `JobPosting` schema for Google Jobs, and direct apply trigger.
  - **Apply Flow:** Client and server validation with Zod, honeypot protection, file upload (PDF/DOC/DOCX max 5MB), tracking code generator (`APP-XXXX`), email confirmation.
  - **Companies (`/companies`):** Enterprise hiring mandate form, urgency, SLA breakdown, automatic requirement code generator (`REQ-XXXX`).
  - **Candidates (`/candidates`):** Candidate vault intake, DPDP Act 2023 consent checkbox, resume indexing (`CAN-XXXX`).
  - **About, Contact, Privacy Policy, Terms of Engagement.**
- **Staff Recruiter Console (`/admin`):**
  - **Authentication:** Protected session gate. Logged-out visitors cannot access staff data.
  - **Dashboard:** Real-time counters for live jobs, active applications, open requirements, candidates; 7-stage pipeline breakdown; audit activity log.
  - **Applications Pipeline:** Search, filters, inline status transitions (`New`, `Screening`, `Submitted to client`, `Interview`, `Offered`, `Joined`, `Rejected`), recruiter internal notes drawer, signed résumé downloads.
  - **Requirements:** Company mandates with one-click **"Convert to Public Job"** feature that immediately creates a live job on `/jobs`.
  - **Candidates Database:** Searchable by skill, experience, notice period, location.
  - **Jobs Management:** Requisition authoring, live publish/unpublish toggle, edit details.
  - **Commission Tracker:** Placement revenue tracking, CTC fees, invoice states (`Draft`, `Invoiced`, `Paid`, `Overdue`), 90-day replacement warranty tracker.
  - **CSV Exports:** One-click CSV exports for Applications, Requirements, Candidates, Jobs, and Placements.

---

## 2. Default Staff Credentials

Access the staff portal at `/admin/login` (or `/admin`):

| Role | Email | Password |
|---|---|---|
| **Lead Admin** | `admin@talenty.in` | `talenty@2024` |
| **Senior Recruiter** | `priya.nair@talenty.in` | `recruiter@2024` |

*(Note: The login page also provides one-click demo credential autofill buttons).*

---

## 3. Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 22)
- npm 9+

### Installation & Run

1. Clone or navigate to the directory:
   ```bash
   cd c:/TC1
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the automated test suite:
   ```bash
   npm test
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Database Setup (Supabase / Postgres)

The project includes SQL migration scripts located in `supabase/`:
- `supabase/schema.sql`: Contains PostgreSQL schema, UUID extensions, human-friendly sequences (`seq_jobs`, `seq_applications`, `seq_requirements`, `seq_candidates`, `seq_placements`), and Row Level Security (RLS) policies.
- `supabase/seed.sql`: Seeds the initial 11 tech jobs, 3 applications, 1 requirement, 1 candidate, 1 placement, and admin staff profiles.

### Running with Remote Supabase
1. Create a project in [Supabase](https://supabase.com).
2. Run the queries from `supabase/schema.sql` in the Supabase SQL Editor.
3. Run `supabase/seed.sql`.
4. Copy your project URL and service keys into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

*(Note: When remote Supabase keys are not provided, Talenty runs in resilient local file/memory store mode so all features work immediately out of the box).*

---

## 5. Automated Verification & Tests

To execute unit tests for Zod validation, filter logic, and the end-to-end apply-to-pipeline test:
```bash
npm test
```

---

## 6. Deployment to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the project into [Vercel](https://vercel.com).
3. In the Environment Variables settings, configure:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY` (optional)
   - `STAFF_NOTIFICATION_EMAIL`
4. Click **Deploy**.

