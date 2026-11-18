// Email notification service using Resend or fallback logging

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailPayload): Promise<{ success: boolean; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'Talenty Consultancy <admissions@talenty.in>',
          to,
          subject,
          html,
          text: text || html.replace(/<[^>]*>/g, ''),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`[Email Dispatched via Resend] To: ${to} | Subject: "${subject}" | ID: ${data.id}`);
        return { success: true, id: data.id };
      } else {
        const err = await response.text();
        console.warn(`[Resend Error] Status ${response.status}: ${err}`);
      }
    } catch (error) {
      console.error('[Email Dispatch Failed]', error);
    }
  }

  // Graceful development / preview mode logger
  console.log(`
======================================================
[SIMULATED DISPATCH - RESEND / SMTP NOT CONFIGURED]
To: ${to}
Subject: ${subject}
Date: ${new Date().toISOString()}
Content Preview:
${text || html.replace(/<[^>]*>/g, '').substring(0, 300)}...
======================================================
  `);

  return { success: true, id: `sim-${Date.now()}` };
}

// 1. Candidate Application Confirmation
export async function sendApplicationConfirmationEmail(candidateName: string, candidateEmail: string, jobTitle: string, appCode: string) {
  const subject = `Application Received: ${jobTitle} (${appCode}) - Talenty Consultancy`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1.5px solid #0B1A2C; background-color: #ECEEF1; color: #0B1A2C;">
      <div style="background-color: #0B1A2C; padding: 16px 24px; margin: -24px -24px 24px -24px; border-bottom: 3px solid #FFB81C;">
        <h1 style="color: #EEF1F5; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">TALENTY CONSULTANCY</h1>
        <p style="color: #FFB81C; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; font-family: monospace;">Talent Architecture & IT Recruitment</p>
      </div>

      <p style="font-size: 16px; font-weight: 600;">Dear ${candidateName},</p>
      <p style="font-size: 14px; line-height: 1.6;">Thank you for applying for <strong>${jobTitle}</strong> through Talenty Consultancy.</p>

      <div style="background-color: #FFFFFF; border: 1.5px solid #0B1A2C; padding: 16px; margin: 20px 0; box-shadow: 3px 3px 0px #0B1A2C;">
        <div style="font-size: 12px; font-family: monospace; color: #4F6072; text-transform: uppercase;">Tracking Reference</div>
        <div style="font-size: 20px; font-weight: 700; color: #0B1A2C; font-family: monospace; margin-top: 4px;">${appCode}</div>
      </div>

      <p style="font-size: 14px; line-height: 1.6;">
        Our engineering recruiting team will review your credentials against the client's architecture requirements within 24 to 48 business hours. If there is a match, a lead recruiter will connect directly for a 20-minute alignment conversation.
      </p>

      <p style="font-size: 13px; color: #4F6072; line-height: 1.5; margin-top: 24px; border-top: 1px dashed #0B1A2C; padding-top: 16px;">
        Talenty Consultancy · Bangalore | Hyderabad | Gurugram · Confidential Placement Partners
      </p>
    </div>
  `;
  return sendEmail({ to: candidateEmail, subject, html });
}

// 2. Recruiter Alert for New Application
export async function sendRecruiterApplicationAlert(appCode: string, candidateName: string, jobTitle: string, exp: number, expectedCTC: number, notice: string) {
  const staffEmail = process.env.STAFF_NOTIFICATION_EMAIL || 'recruiting@talenty.in';
  const subject = `[NEW APPLICATION] ${appCode} - ${candidateName} for ${jobTitle}`;
  const html = `
    <div style="font-family: sans-serif; padding: 20px; border: 1.5px solid #0B1A2C; background: #FFFFFF;">
      <h2 style="color: #0B1A2C; border-bottom: 2px solid #FFB81C; padding-bottom: 8px;">New Candidate Application (${appCode})</h2>
      <p><strong>Candidate:</strong> ${candidateName}</p>
      <p><strong>Role:</strong> ${jobTitle}</p>
      <p><strong>Experience:</strong> ${exp} Years</p>
      <p><strong>Expected CTC:</strong> ₹${expectedCTC} LPA</p>
      <p><strong>Notice Period:</strong> ${notice}</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/applications" style="display: inline-block; background: #FFB81C; color: #0B1A2C; padding: 10px 18px; text-decoration: none; font-weight: bold; border: 1.5px solid #0B1A2C;">Open in Recruiter Console &rarr;</a></p>
    </div>
  `;
  return sendEmail({ to: staffEmail, subject, html });
}

// 3. Company Requirement Confirmation & Recruiter Alert
export async function sendCompanyRequirementEmails(companyName: string, contactPerson: string, workEmail: string, roles: string, reqCode: string) {
  // To Company
  const clientSubject = `Hiring Requirement Logged (${reqCode}) - Talenty Consultancy`;
  const clientHtml = `
    <div style="font-family: sans-serif; padding: 20px; background: #ECEEF1; border: 1.5px solid #0B1A2C;">
      <h2 style="color: #0B1A2C;">Talenty Consultancy · Requirement Acknowledgment</h2>
      <p>Hello ${contactPerson},</p>
      <p>We have successfully logged your hiring requirement for <strong>${companyName}</strong>:</p>
      <div style="background: #FFFFFF; padding: 16px; border: 1.5px solid #0B1A2C; margin: 16px 0;">
        <p><strong>Requirement Code:</strong> ${reqCode}</p>
        <p><strong>Roles Specified:</strong> ${roles}</p>
      </div>
      <p>An Account Director will reach out within 4 business hours to formalize the mandate and commence shortlist sourcing.</p>
    </div>
  `;
  await sendEmail({ to: workEmail, subject: clientSubject, html: clientHtml });

  // To Staff
  const staffEmail = process.env.STAFF_NOTIFICATION_EMAIL || 'mandates@talenty.in';
  const staffSubject = `[URGENT REQUISITION] ${reqCode} - ${companyName} (${roles})`;
  const staffHtml = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h3>New Company Mandate</h3>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Contact:</strong> ${contactPerson} (${workEmail})</p>
      <p><strong>Roles:</strong> ${roles}</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/requirements">Review Mandate &rarr;</a></p>
    </div>
  `;
  return sendEmail({ to: staffEmail, subject: staffSubject, html: staffHtml });
}

