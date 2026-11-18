import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { applicationSchema } from '@/lib/validations';
import { DataStore } from '@/lib/store';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendApplicationConfirmationEmail, sendRecruiterApplicationAlert } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rate = checkRateLimit(`apply-${ip}`, 5, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    const honeypot = (formData.get('honeypot') as string) || '';
    if (honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Application logged' });
    }

    const job_id = formData.get('job_id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const total_experience = parseFloat(formData.get('total_experience') as string);
    const current_ctc = parseFloat(formData.get('current_ctc') as string);
    const expected_ctc = parseFloat(formData.get('expected_ctc') as string);
    const notice_period = formData.get('notice_period') as string;

    // Validate inputs
    const validated = applicationSchema.parse({
      job_id,
      name,
      email,
      phone,
      total_experience,
      current_ctc,
      expected_ctc,
      notice_period,
      honeypot,
    });

    // Handle resume file
    const file = formData.get('resume') as File | null;
    let resumePath = '';
    let resumeFilename = '';
    let resumeUrl = '';

    if (file && file.size > 0) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Resume file size exceeds maximum limit of 5 MB' },
          { status: 400 }
        );
      }

      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
        return NextResponse.json(
          { error: 'Only PDF, DOC, and DOCX resume formats are supported' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const resumesDir = path.join(process.cwd(), '.data', 'resumes');
      if (!fs.existsSync(resumesDir)) {
        fs.mkdirSync(resumesDir, { recursive: true });
      }

      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(resumesDir, safeName);
      fs.writeFileSync(filePath, buffer);

      resumePath = safeName;
      resumeFilename = file.name;
      resumeUrl = `/api/resumes/${safeName}`;
    }

    // Create Application in Store
    const app = DataStore.createApplication({
      job_id: validated.job_id,
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      total_experience: validated.total_experience,
      current_ctc: validated.current_ctc,
      expected_ctc: validated.expected_ctc,
      notice_period: validated.notice_period,
      resume_path: resumePath,
      resume_filename: resumeFilename,
      resume_url: resumeUrl,
    });

    // Send Emails (Non-blocking or awaited)
    try {
      await sendApplicationConfirmationEmail(
        app.name,
        app.email,
        app.job_title || 'Engineering Role',
        app.code
      );

      await sendRecruiterApplicationAlert(
        app.code,
        app.name,
        app.job_title || 'Engineering Role',
        app.total_experience,
        app.expected_ctc,
        app.notice_period
      );
    } catch (emailErr) {
      console.warn('Email dispatch notice:', emailErr);
    }

    return NextResponse.json({
      success: true,
      application: app,
      tracking_code: app.code,
    });
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process application. Please check your inputs.' },
      { status: 500 }
    );
  }
}

