import { NextRequest, NextResponse } from 'next/server';
import { companyRequirementSchema } from '@/lib/validations';
import { DataStore } from '@/lib/store';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendCompanyRequirementEmails } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rate = checkRateLimit(`req-${ip}`, 5, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Requirement registered' });
    }

    const validated = companyRequirementSchema.parse(body);

    const skillsArray = validated.key_skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const requirement = DataStore.createRequirement({
      company_name: validated.company_name,
      contact_person: validated.contact_person,
      work_email: validated.work_email,
      phone: validated.phone,
      roles_needed: validated.roles_needed,
      headcount: validated.headcount,
      key_skills: skillsArray,
      exp_min: validated.exp_min,
      exp_max: validated.exp_max,
      budget_lpa_min: validated.budget_lpa_min,
      budget_lpa_max: validated.budget_lpa_max,
      engagement_model: validated.engagement_model,
      urgency: validated.urgency,
      notes: validated.notes,
    });

    // Send transaction emails
    try {
      await sendCompanyRequirementEmails(
        requirement.company_name,
        requirement.contact_person,
        requirement.work_email,
        requirement.roles_needed,
        requirement.code
      );
    } catch (e) {
      console.warn('Requirement email dispatch notice:', e);
    }

    return NextResponse.json({
      success: true,
      requirement,
      tracking_code: requirement.code,
    });
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }
    console.error('Requirement submission error:', error);
    return NextResponse.json(
      { error: 'Failed to record hiring requirement.' },
      { status: 500 }
    );
  }
}

