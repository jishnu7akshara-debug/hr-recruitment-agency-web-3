-- Talenty Consultancy Seed Data
-- 11 Sample Jobs, 3 Applications, 1 Requirement, 1 Candidate, 1 Admin Profile, 1 Placement

-- 1. Profiles (Admin & Lead Recruiter)
INSERT INTO profiles (id, email, name, role) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'admin@talenty.in', 'Vikramaditya Rao', 'admin'),
  ('a0000000-0000-0000-0000-000000000002', 'priya.nair@talenty.in', 'Priya Nair', 'recruiter')
ON CONFLICT (id) DO NOTHING;

-- 2. 11 Real-World Tech Jobs
INSERT INTO jobs (id, code, title, client_label, location, work_mode, type, exp_min, exp_max, lpa_min, lpa_max, notice_period, skills, description, responsibilities, must_have, good_to_have, interview_process, status, is_published) VALUES
(
  'b0000000-0000-0000-0000-000000000001',
  'TLT-2041',
  'Staff Full Stack Engineer (Next.js & Go)',
  'Series-B FinTech Unicorn (Bengaluru)',
  'Bengaluru, Karnataka',
  'Hybrid',
  'Full-time',
  6, 10,
  35.00, 52.00,
  'Immediate to 30 days',
  ARRAY['Next.js', 'React', 'TypeScript', 'Go', 'PostgreSQL', 'Kafka', 'Docker'],
  'Architect and scale the core lending orchestration platform processing INR 150Cr+ monthly disbursements. High-throughput distributed architecture with sub-100ms API response SLA.',
  ARRAY['Drive high-level system design and microservice boundaries in Go and Next.js', 'Mentor senior developers and spearhead architecture design reviews', 'Optimize SQL queries and Kafka streaming pipelines for high concurrency'],
  ARRAY['6+ years fullstack engineering with deep production Go or Node.js experience', 'Strong frontend architectural mastery with React/Next.js and state machines', 'Hands-on experience with Kafka or RabbitMQ event-driven topologies'],
  ARRAY['FinTech/Payments domain experience (NPCI, UPI or Core Banking integrations)', 'Kubernetes production cluster management experience'],
  ARRAY['Talenty Recruiter Technical Screening (30 mins)', 'System Architecture & Concurrency Deep Dive (60 mins)', 'Take-home Practical Pairing Session (90 mins)', 'Founders / Leadership Alignment (45 mins)'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000002',
  'TLT-2042',
  'Senior Backend Architect (Java 21 / Spring Boot 3)',
  'Global SaaS Leader in Supply Chain (Hyderabad)',
  'Hyderabad, Telangana',
  'Hybrid',
  'Full-time',
  8, 12,
  38.00, 58.00,
  '30 to 45 days',
  ARRAY['Java 21', 'Spring Boot 3', 'Microservices', 'Distributed Systems', 'AWS', 'Redis', 'PostgreSQL'],
  'Spearhead multi-tenant enterprise logistics platform backend servicing Fortune 500 retailers across North America and Europe. High focus on fault-tolerant caching and zero-downtime migrations.',
  ARRAY['Own microservice architecture and domain-driven design (DDD)', 'Define strict latency and fault-tolerance boundaries with Circuit Breakers', 'Guide database sharding and index strategy on Amazon RDS PostgreSQL'],
  ARRAY['8+ years in enterprise Java with deep modern Spring Boot 3 & Virtual Threads expertise', 'Proven experience designing systems handling 50k+ QPS with p99 < 50ms', 'Strong understanding of ACID guarantees and distributed transactions'],
  ARRAY['Experience with AWS DynamoDB or Cassandra', 'Prior work in supply chain or fleet telematics'],
  ARRAY['Talenty Recruiter Evaluation', 'Low Level Design & Concurrency Coding', 'High Level System Design', 'CTO Discussion'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000003',
  'TLT-2043',
  'Lead DevOps & Cloud Platform Engineer',
  'HealthTech Pioneer (Gurugram / Remote)',
  'Gurugram / Remote',
  'Remote',
  'Full-time',
  5, 9,
  28.00, 42.00,
  'Immediate or Serving Notice',
  ARRAY['Kubernetes', 'Terraform', 'AWS', 'ArgoCD', 'Prometheus', 'Datadog', 'Security Compliance'],
  'Own multi-region AWS cloud infrastructure, zero-trust network boundaries, GitOps deployment pipelines, and HIPAA/SOC2 continuous compliance automation.',
  ARRAY['Maintain multi-tenant EKS clusters with Terraform IaC', 'Build self-healing CI/CD pipelines using GitHub Actions and ArgoCD', 'Configure Datadog APM, Prometheus alerts, and incident response playbooks'],
  ARRAY['5+ years in production DevOps on AWS with EKS', 'Deep Terraform module authoring expertise', 'Security hardening, secret management (Vault), and compliance audits'],
  ARRAY['CKA / CKS certification', 'Cost optimization in AWS compute & egress'],
  ARRAY['Recruiter Screening (20 mins)', 'Live Terraform & Kubernetes Debugging (60 mins)', 'Infrastructure Architecture Review (45 mins)', 'Offer Negotiation & Culture Fit'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000004',
  'TLT-2044',
  'Principal Data Engineer (PySpark & Databricks)',
  'Top Tier E-Commerce Enterprise (Bengaluru)',
  'Bengaluru, Karnataka',
  'Hybrid',
  'Full-time',
  7, 11,
  40.00, 60.00,
  'Immediate to 30 days',
  ARRAY['PySpark', 'Databricks', 'Delta Lake', 'BigQuery', 'Airflow', 'Python', 'Data Modeling'],
  'Build and operate real-time streaming and medallion lakehouse data pipelines processing 8TB+ daily telemetry for customer recommendation engines and dynamic pricing algorithms.',
  ARRAY['Design scalable data ingestion pipelines with Delta Lake and Spark Structured Streaming', 'Optimize compute costs and pipeline runtimes in Databricks clusters', 'Implement automated data quality checks and Great Expectations suites'],
  ARRAY['7+ years in enterprise data engineering with heavy PySpark / Databricks usage', 'Deep SQL optimization, partition pruning, and Z-ordering knowledge', 'Hands-on orchestration with Apache Airflow or Dagster'],
  ARRAY['Experience with Iceberg or ClickHouse', 'Machine learning feature store architecture (Feast)'],
  ARRAY['Talenty Tech Screen (25 mins)', 'Data Modeling & Complex SQL/Spark Pairing (60 mins)', 'System Architecture Interview (60 mins)', 'Director of Data Science Fit (30 mins)'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000005',
  'TLT-2045',
  'Senior Frontend Engineer (React 18 / Design Systems)',
  'Fast-Growing B2B Workflow SaaS (Pune / Remote)',
  'Pune / Remote',
  'Remote',
  'Full-time',
  4, 8,
  24.00, 36.00,
  '15 to 30 days',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Storybook', 'Framer Motion', 'Web Accessibility'],
  'Craft pixel-perfect, accessible, and ultra-fluid web applications for thousands of daily enterprise project planners. High emphasis on micro-interactions and performance budgets.',
  ARRAY['Build reusable, WCAG 2.1 AA compliant UI component library in Storybook', 'Optimize Core Web Vitals (LCP < 1.8s, INP < 150ms, CLS 0)', 'Implement real-time collaboration canvas with WebSockets'],
  ARRAY['4+ years crafting complex React/TypeScript SPAs', 'Deep mastery of modern CSS, Tailwind, responsive layouts, and animations', 'Solid grasp of AST, state management (Zustand/TanStack Query), and testing (Playwright/Jest)'],
  ARRAY['Experience with Canvas API or WebGL', 'Prior contributions to open source UI libraries'],
  ARRAY['Portfolio & Code Walkthrough (30 mins)', 'Live React Component Architecture Session (60 mins)', 'Cross-functional Collaboration with Product Designers (45 mins)'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000006',
  'TLT-2046',
  'Lead QA Automation Engineer (Playwright & Performance)',
  'FinTech Neobank (Mumbai)',
  'Mumbai, Maharashtra',
  'Hybrid',
  'Full-time',
  5, 9,
  22.00, 34.00,
  'Immediate to 30 days',
  ARRAY['Playwright', 'TypeScript', 'Cypress', 'k6', 'API Testing', 'CI/CD Pipelines', 'JMeter'],
  'Lead the quality assurance charter for high-stakes payment flows. Design test automation frameworks and conduct chaos/load testing before banking product releases.',
  ARRAY['Architect end-to-end regression frameworks in Playwright with TypeScript', 'Build automated performance test scripts using k6 integrated in GitHub Actions', 'Champion test pyramid best practices across 4 engineering squads'],
  ARRAY['5+ years in automated web and API testing', 'Production expertise with TypeScript and Playwright', 'Load testing and API contract testing (Pact / Postman Newman)'],
  ARRAY['Mobile automation using Appium or Maestro', 'Payment gateway testing experience'],
  ARRAY['Recruiter Screening', 'Automation Framework Live Coding', 'QA Strategy & Chaos Scenarios', 'Engineering Manager Chat'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000007',
  'TLT-2047',
  'AI/ML Systems Engineer (LLM Agents & RAG)',
  'GenAI Automation Enterprise (Bengaluru)',
  'Bengaluru, Karnataka',
  'On-site',
  'Full-time',
  3, 7,
  32.00, 48.00,
  'Immediate to 15 days',
  ARRAY['Python', 'LangChain', 'LlamaIndex', 'vLLM', 'Vector DBs', 'FastAPI', 'PyTorch'],
  'Deploy production-ready LLM agents, dynamic retrieval-augmented generation pipelines, and evaluation harnesses for automated document analysis and legal contracts.',
  ARRAY['Design low-latency RAG architectures with hybrid search (BM25 + Dense embeddings)', 'Serve fine-tuned open-source models using vLLM and TensorRT-LLM', 'Establish continuous evaluation benchmarks using Ragas and TruLens'],
  ARRAY['3+ years in production Python engineering with at least 1.5+ years building GenAI systems', 'Experience with Milvus, Qdrant, or Pinecone in production', 'Deep understanding of prompt engineering, token economy, and hallucination reduction'],
  ARRAY['Experience with model quantization (AWQ, GGUF)', 'Fine-tuning with LoRA/QLoRA on GPU clusters'],
  ARRAY['Technical Recruiter Alignment', 'System Design: Production RAG Pipeline', 'Live Machine Learning Code Challenge', 'Founder Interview'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000008',
  'TLT-2048',
  'Senior iOS Engineer (Swift & SwiftUI)',
  'Direct-to-Consumer Quick Commerce (Gurugram)',
  'Gurugram, Haryana',
  'Hybrid',
  'Full-time',
  4, 8,
  26.00, 38.00,
  'Immediate to 30 days',
  ARRAY['Swift', 'SwiftUI', 'Combine', 'Core Data', 'MapKit', 'Unit Testing', 'App Store Deployments'],
  'Build lightning-fast iOS consumer experience serving 500k+ daily delivery orders. Real-time order tracking, live activities, and buttery 120Hz ProMotion user interfaces.',
  ARRAY['Architect high-performance consumer app in Swift and SwiftUI', 'Implement Apple Live Activities and Dynamic Island order widgets', 'Optimize memory footprints, cold launch times (< 1.2s), and network caching'],
  ARRAY['4+ years native iOS development with production apps published on App Store', 'Mastery of Swift concurrency (async/await, actors) and Combine', 'Solid unit and UI testing discipline'],
  ARRAY['Experience with Core Location and MapKit route rendering', 'GraphQL client experience (Apollo iOS)'],
  ARRAY['Recruiter Screening (20 mins)', 'iOS Architecture & Concurrency Pairing (60 mins)', 'App Performance Walkthrough (45 mins)', 'Final Culture Discussion (30 mins)'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000009',
  'TLT-2049',
  'Staff Security Engineer (AppSec & Cloud Defense)',
  'Global WealthTech Firm (Hyderabad / Hybrid)',
  'Hyderabad, Telangana',
  'Hybrid',
  'Full-time',
  7, 12,
  42.00, 65.00,
  '30 to 60 days',
  ARRAY['Application Security', 'Threat Modeling', 'DAST/SAST', 'Cloud Security', 'OWASP Top 10', 'Penetration Testing'],
  'Lead security architecture, threat modeling for multi-tenant microservices, vulnerability management, and red team/blue team drills for enterprise wealth management software.',
  ARRAY['Perform thorough architecture reviews and threat modeling for financial features', 'Embed automated SAST/DAST/SCA security checks into developer pipelines', 'Conduct internal penetration tests and coordinate third-party bug bounty programs'],
  ARRAY['7+ years in application and cloud infrastructure security', 'Deep knowledge of web security fundamentals, cryptographic protocols, and identity standards (OIDC, SAML)', 'Certifications such as CISSP, OSCP, or AWS Security Specialty'],
  ARRAY['Experience with SOC 2 Type II, ISO 27001 audits', 'Python/Go scripting for automated security remediation'],
  ARRAY['Talenty Tech Screen', 'Threat Modeling Live Scenario', 'Application Security Deep Dive', 'CISO Alignment'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000010',
  'TLT-2050',
  'Contract Senior Golang Microservices Specialist',
  'Logistics Scaleup (Remote, India)',
  'Remote (India)',
  'Remote',
  'Contract',
  5, 9,
  24.00, 36.00,
  'Immediate (Available in 7 days)',
  ARRAY['Go', 'gRPC', 'Protobuf', 'PostgreSQL', 'Docker', 'Redis', 'RabbitMQ'],
  '6-month high-impact contract with extension potential. Refactor critical dispatch routing service to gRPC microservices and optimize memory leaks under high peak load.',
  ARRAY['Deconstruct legacy monolithic routing services into decoupled Go microservices', 'Write ultra-performant gRPC endpoints with automated protobuf generation', 'Execute benchmark profiling with pprof and optimize memory footprint'],
  ARRAY['5+ years in software engineering with 3+ years heavy Go in production', 'Deep knowledge of goroutines, channels, sync primitives, and race condition detection', 'Production experience with gRPC and PostgreSQL transactions'],
  ARRAY['Experience with Redis cluster pub/sub', 'Immediate availability'],
  ARRAY['Talenty Fast-Track Screening (20 mins)', 'Live Go Concurrency Coding (45 mins)', 'Client Tech Lead Decision (30 mins)'],
  'published', true
),
(
  'b0000000-0000-0000-0000-000000000011',
  'TLT-2051',
  'Technical Product Manager (Developer Platforms & APIs)',
  'Cloud Native Infrastructure Startup (Bengaluru)',
  'Bengaluru, Karnataka',
  'Hybrid',
  'Full-time',
  5, 9,
  30.00, 45.00,
  '15 to 30 days',
  ARRAY['API Design', 'Developer Experience', 'Product Strategy', 'OpenAPI', 'Telemetry', 'Agile Roadmapping'],
  'Lead product strategy for enterprise API gateways, CLI tooling, and SDKs used by 25,000+ developers globally. Drive customer discovery, specs, and telemetry metrics.',
  ARRAY['Define roadmaps, PRDs, and technical specs for API products and SDKs', 'Collaborate deeply with principal engineers and enterprise customer CTOs', 'Track activation funnels, developer documentation retention, and API latency SLAs'],
  ARRAY['5+ years overall experience with at least 3 years in Technical Product Management for developer-facing tools', 'Engineering background with comfort reading API docs and writing JSON specs', 'Proven track record taking technical products from 0 to 1'],
  ARRAY['Prior software developer background', 'Familiarity with GraphQL, REST, and gRPC standards'],
  ARRAY['Screening (30 mins)', 'Product Sense & System Tradeoffs (60 mins)', 'Technical PRD Defense (60 mins)', 'VP of Product Fit (30 mins)'],
  'published', true
);

-- 3. Sample Candidates
INSERT INTO candidates (id, code, name, email, phone, total_experience, current_ctc, expected_ctc, notice_period, location, skills, current_company, current_designation, consent_given, tags) VALUES
(
  'c0000000-0000-0000-0000-000000000001',
  'CAN-301',
  'Arjun Venkatraman',
  'arjun.v@example.com',
  '+91 98450 12345',
  7.5,
  24.00,
  36.00,
  '30 days',
  'Bengaluru',
  ARRAY['Next.js', 'React', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Docker'],
  'Swiggy India',
  'Senior Software Engineer II',
  true,
  ARRAY['Immediate Hire', 'Strong System Design', 'FinTech Background']
);

-- 4. Sample Applications
INSERT INTO applications (id, code, job_id, candidate_id, name, email, phone, total_experience, current_ctc, expected_ctc, notice_period, resume_path, status) VALUES
(
  'd0000000-0000-0000-0000-000000000001',
  'APP-1001',
  'b0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'Arjun Venkatraman',
  'arjun.v@example.com',
  '+91 98450 12345',
  7.5,
  24.00,
  36.00,
  '30 days',
  'resumes/CAN-301-Arjun-Venkatraman-Resume.pdf',
  'Screening'
),
(
  'd0000000-0000-0000-0000-000000000002',
  'APP-1002',
  'b0000000-0000-0000-0000-000000000003',
  NULL,
  'Deepika Sundaram',
  'deepika.s@example.com',
  '+91 98765 43210',
  6.0,
  20.00,
  32.00,
  'Immediate (Serving Notice)',
  'resumes/APP-1002-Deepika-Sundaram.pdf',
  'Submitted to client'
),
(
  'd0000000-0000-0000-0000-000000000003',
  'APP-1003',
  'b0000000-0000-0000-0000-000000000005',
  NULL,
  'Rohan Mehta',
  'rohan.m@example.com',
  '+91 98200 98765',
  5.2,
  18.50,
  28.00,
  '15 days',
  'resumes/APP-1003-Rohan-Mehta.pdf',
  'Interview'
);

-- 5. Sample Company Requirement
INSERT INTO requirements (id, code, company_name, contact_person, work_email, phone, roles_needed, headcount, key_skills, exp_min, exp_max, budget_lpa_min, budget_lpa_max, engagement_model, urgency, notes, status) VALUES
(
  'e0000000-0000-0000-0000-000000000001',
  'REQ-501',
  'Nexura Capital Technologies',
  'Anand Deshmukh (VP of Engineering)',
  'anand.d@nexuracapital.com',
  '+91 99110 55443',
  'Staff Go Engineer & Senior DevOps Specialist',
  3,
  ARRAY['Go', 'Kafka', 'Kubernetes', 'PostgreSQL'],
  6, 10,
  35.00, 50.00,
  'Permanent',
  'Immediate (<15 days)',
  'Urgent expansion for our payment gateway team. Need candidates with high-volume transactional experience. Ready to roll offers within 48 hours of final round.',
  'Sourcing'
);

-- 6. Sample Placement (Commission Tracker)
INSERT INTO placements (id, code, application_id, requirement_id, client_name, candidate_name, role_title, annual_ctc, commission_percentage, commission_amount, invoice_status, invoice_date, joining_date, replacement_guarantee_end_date, notes) VALUES
(
  'f0000000-0000-0000-0000-000000000001',
  'PLC-101',
  'd0000000-0000-0000-0000-000000000001',
  'e0000000-0000-0000-0000-000000000001',
  'Nexura Capital Technologies',
  'Arjun Venkatraman',
  'Staff Full Stack Engineer',
  36.00,
  8.33,
  2.99,
  'Invoiced',
  CURRENT_DATE - INTERVAL '10 days',
  CURRENT_DATE + INTERVAL '20 days',
  CURRENT_DATE + INTERVAL '110 days',
  'Candidate accepted offer letter. 90-day replacement guarantee active from joining date.'
);

-- 7. Sample Notes
INSERT INTO notes (entity_type, entity_id, author_name, text) VALUES
('application', 'd0000000-0000-0000-0000-000000000001', 'Vikramaditya Rao', 'Candidate demonstrated exceptional clarity on Kafka partition keys and distributed tracing during initial phone screening.'),
('requirement', 'e0000000-0000-0000-0000-000000000001', 'Priya Nair', 'Met with Anand Deshmukh. Client has fast-tracked rounds: only 2 rounds before offer. Ideal candidate should have notice period <= 30 days.');

