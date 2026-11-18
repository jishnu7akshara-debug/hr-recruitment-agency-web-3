import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/store';
import { getStaffSession } from '@/lib/auth';
import { jobFormSchema } from '@/lib/validations';

export async function GET() {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobs = DataStore.getAllJobsForAdmin();
  return NextResponse.json({ jobs });
}

export async function POST(req: NextRequest) {
  const staff = getStaffSession();
  if (!staff) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = jobFormSchema.parse(body);

    const skillsArray = validated.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const respArray = validated.responsibilities
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const mustHaveArray = validated.must_have
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const goodToHaveArray = validated.good_to_have
      ? validated.good_to_have
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const interviewArray = validated.interview_process
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const created = DataStore.createJob({
      title: validated.title,
      client_label: validated.client_label,
      location: validated.location,
      work_mode: validated.work_mode,
      type: validated.type,
      exp_min: validated.exp_min,
      exp_max: validated.exp_max,
      lpa_min: validated.lpa_min,
      lpa_max: validated.lpa_max,
      notice_period: validated.notice_period,
      skills: skillsArray,
      description: validated.description,
      responsibilities: respArray,
      must_have: mustHaveArray,
      good_to_have: goodToHaveArray,
      interview_process: interviewArray,
      status: validated.status,
      is_published: validated.is_published,
    });

    return NextResponse.json({ success: true, job: created });
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }
    console.error('Job create error:', error);
    return NextResponse.json({ error: 'Failed to create job posting' }, { status: 500 });
  }
}

