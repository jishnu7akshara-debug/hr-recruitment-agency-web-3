import { cookies } from 'next/headers';

export interface StaffUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'recruiter';
}

export const DEMO_ADMIN: StaffUser = {
  id: 'a0000000-0000-0000-0000-000000000001',
  email: 'admin@talenty.in',
  name: 'Vikramaditya Rao (Lead Admin)',
  role: 'admin',
};

export function getStaffSession(): StaffUser | null {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('talenty_staff_session')?.value;

  if (!sessionToken) return null;

  try {
    const parsed = JSON.parse(Buffer.from(sessionToken, 'base64').toString('utf-8'));
    if (parsed && parsed.email) {
      return parsed;
    }
  } catch (e) {
    // invalid token
  }

  return null;
}

