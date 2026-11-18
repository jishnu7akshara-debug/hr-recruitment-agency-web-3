import { NextRequest, NextResponse } from 'next/server';
import { contactMessageSchema } from '@/lib/validations';
import { DataStore } from '@/lib/store';
import { checkRateLimit } from '@/lib/rate-limit';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rate = checkRateLimit(`contact-${ip}`, 5, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before sending another message.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Check honeypot
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' });
    }

    const validated = contactMessageSchema.parse(body);

    const msg = DataStore.saveContactMessage({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      subject: validated.subject,
      message: validated.message,
    });

    // Alert staff
    await sendEmail({
      to: process.env.STAFF_NOTIFICATION_EMAIL || 'contact@talenty.in',
      subject: `[CONTACT INQUIRY] ${validated.subject} from ${validated.name}`,
      html: `
        <div style="font-family: sans-serif; padding: 16px;">
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${validated.name}</p>
          <p><strong>Email:</strong> ${validated.email}</p>
          <p><strong>Phone:</strong> ${validated.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${validated.subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #ECEEF1; padding: 12px; border: 1px solid #0B1A2C;">${validated.message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data: msg });
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation error' }, { status: 400 });
    }
    console.error('Contact submit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

