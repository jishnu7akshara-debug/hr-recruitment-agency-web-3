import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/store';
import { getStaffSession } from '@/lib/auth';

function escapeCSV(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(req: NextRequest) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'applications';

  let csvRows: string[] = [];
  let filename = `talenty-${type}-${new Date().toISOString().split('T')[0]}.csv`;

  if (type === 'applications') {
    const apps = DataStore.getApplications();
    csvRows.push(['Code', 'Candidate Name', 'Email', 'Phone', 'Job Title', 'Job Code', 'Exp (Yrs)', 'Current CTC', 'Expected CTC', 'Notice Period', 'Status', 'Date'].join(','));
    apps.forEach((a) => {
      csvRows.push([
        escapeCSV(a.code),
        escapeCSV(a.name),
        escapeCSV(a.email),
        escapeCSV(a.phone),
        escapeCSV(a.job_title),
        escapeCSV(a.job_code),
        escapeCSV(a.total_experience),
        escapeCSV(a.current_ctc),
        escapeCSV(a.expected_ctc),
        escapeCSV(a.notice_period),
        escapeCSV(a.status),
        escapeCSV(a.created_at),
      ].join(','));
    });
  } else if (type === 'requirements') {
    const reqs = DataStore.getRequirements();
    csvRows.push(['Code', 'Company', 'Contact Person', 'Email', 'Phone', 'Roles', 'Headcount', 'Min Exp', 'Max Exp', 'Budget Min LPA', 'Budget Max LPA', 'Model', 'Urgency', 'Status', 'Date'].join(','));
    reqs.forEach((r) => {
      csvRows.push([
        escapeCSV(r.code),
        escapeCSV(r.company_name),
        escapeCSV(r.contact_person),
        escapeCSV(r.work_email),
        escapeCSV(r.phone),
        escapeCSV(r.roles_needed),
        escapeCSV(r.headcount),
        escapeCSV(r.exp_min),
        escapeCSV(r.exp_max),
        escapeCSV(r.budget_lpa_min),
        escapeCSV(r.budget_lpa_max),
        escapeCSV(r.engagement_model),
        escapeCSV(r.urgency),
        escapeCSV(r.status),
        escapeCSV(r.created_at),
      ].join(','));
    });
  } else if (type === 'candidates') {
    const cans = DataStore.getCandidates();
    csvRows.push(['Code', 'Name', 'Email', 'Phone', 'Location', 'Total Exp', 'Current CTC', 'Expected CTC', 'Notice Period', 'Company', 'Designation', 'Skills', 'Date'].join(','));
    cans.forEach((c) => {
      csvRows.push([
        escapeCSV(c.code),
        escapeCSV(c.name),
        escapeCSV(c.email),
        escapeCSV(c.phone),
        escapeCSV(c.location),
        escapeCSV(c.total_experience),
        escapeCSV(c.current_ctc),
        escapeCSV(c.expected_ctc),
        escapeCSV(c.notice_period),
        escapeCSV(c.current_company),
        escapeCSV(c.current_designation),
        escapeCSV(c.skills.join('; ')),
        escapeCSV(c.created_at),
      ].join(','));
    });
  } else if (type === 'jobs') {
    const jobs = DataStore.getAllJobsForAdmin();
    csvRows.push(['Code', 'Title', 'Client Label', 'Location', 'Work Mode', 'Type', 'Min Exp', 'Max Exp', 'Min LPA', 'Max LPA', 'Notice', 'Status', 'Published', 'Date'].join(','));
    jobs.forEach((j) => {
      csvRows.push([
        escapeCSV(j.code),
        escapeCSV(j.title),
        escapeCSV(j.client_label),
        escapeCSV(j.location),
        escapeCSV(j.work_mode),
        escapeCSV(j.type),
        escapeCSV(j.exp_min),
        escapeCSV(j.exp_max),
        escapeCSV(j.lpa_min),
        escapeCSV(j.lpa_max),
        escapeCSV(j.notice_period),
        escapeCSV(j.status),
        escapeCSV(j.is_published),
        escapeCSV(j.created_at),
      ].join(','));
    });
  } else if (type === 'placements') {
    const plcs = DataStore.getPlacements();
    csvRows.push(['Code', 'Client', 'Candidate', 'Role', 'Annual CTC', 'Commission %', 'Commission Amount (LPA)', 'Invoice Status', 'Invoice Date', 'Joining Date', 'Guarantee End Date'].join(','));
    plcs.forEach((p) => {
      csvRows.push([
        escapeCSV(p.code),
        escapeCSV(p.client_name),
        escapeCSV(p.candidate_name),
        escapeCSV(p.role_title),
        escapeCSV(p.annual_ctc),
        escapeCSV(p.commission_percentage),
        escapeCSV(p.commission_amount),
        escapeCSV(p.invoice_status),
        escapeCSV(p.invoice_date || 'N/A'),
        escapeCSV(p.joining_date),
        escapeCSV(p.replacement_guarantee_end_date),
      ].join(','));
    });
  }

  const csvContent = csvRows.join('\r\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

