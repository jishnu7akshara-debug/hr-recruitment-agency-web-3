import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { candidateProfileSchema } from '@/lib/validations';
import { DataStore } from '@/lib/store';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rate = checkRateLimit(`candidate-${ip}`, 5, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a moment.' },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    const honeypot = (formData.get('honeypot') as string) || '';
    if (honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Profile registered' });
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const total_experience = parseFloat(formData.get('total_experience') as string);
    const current_ctc = parseFloat(formData.get('current_ctc') as string);
    const expected_ctc = parseFloat(formData.get('expected_ctc') as string);
    const notice_period = formData.get('notice_period') as string;
    const location = formData.get('location') as string;
    const skills = formData.get('skills') as string;
    const current_company = (formData.get('current_company') as string) || '';
    const current_designation = (formData.get('current_designation') as string) || '';
    const consent_given = formData.get('consent_given') === 'true';

    const validated = candidateProfileSchema.parse({
      name,
      email,
      phone,
      total_experience,
      current_ctc,
      expected_ctc,
      notice_period,
      location,
      skills,
      current_company,
      current_designation,
      consent_given,
      honeypot,
    });

    // Handle resume file
    const file = formData.get('resume') as File | null;
    let resumePath = '';
    let resumeUrl = '';

    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'Resume exceeds 5MB size limit' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const resumesDir = path.join(process.cwd(), '.data', 'resumes');
      if (!fs.existsSync(resumesDir)) {
        fs.mkdirSync(resumesDir, { recursive: true });
      }

      const safeName = `can-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(resumesDir, safeName);
      fs.writeFileSync(filePath, buffer);

      resumePath = safeName;
      resumeUrl = `/api/resumes/${safeName}`;
    }

    const skillsArray = validated.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const candidate = DataStore.createCandidate({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      total_experience: validated.total_experience,
      current_ctc: validated.current_ctc,
      expected_ctc: validated.expected_ctc,
      notice_period: validated.notice_period,
      location: validated.location,
      skills: skillsArray,
      current_company: validated.current_company,
      current_designation: validated.current_designation,
      resume_path: resumePath,
      resume_url: resumeUrl,
      consent_given: true,
      consent_timestamp: new Date().toISOString(),
      tags: ['General Ingestion', 'Direct Candidate Portal'],
    });

    // Send confirmation to candidate
    await sendEmail({
      to: candidate.email,
      subject: `Confidential Candidate Profile Registered (${candidate.code}) - Talenty Consultancy`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #ECEEF1; border: 1.5px solid #0B1A2C;">
          <h2 style="color: #0B1A2C;">Welcome to the Talenty Candidate Vault</h2>
          <p>Hello ${candidate.name},</p>
          <p>Your technical profile has been securely indexed in our talent architecture repository.</p>
          <div style="background: #FFFFFF; padding: 16px; border: 1.5px solid #0B1A2C; margin: 16px 0;">
            <p><strong>Candidate ID:</strong> ${candidate.code}</p>
            <p><strong>Experience:</strong> ${candidate.total_experience} Years</p>
            <p><strong>Status:</strong> Active / Confidential Review</p>
          </div>
          <p>We will never disclose your resume to any employer without your express permission.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      candidate,
      tracking_code: candidate.code,
    });
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }
    console.error('Candidate profile submission error:', error);
    return NextResponse.json(
      { error: 'Failed to record candidate profile.' },
      { status: 500 }
    );
  }
}

