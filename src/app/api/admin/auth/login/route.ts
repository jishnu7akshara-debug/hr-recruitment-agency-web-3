import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { DEMO_ADMIN } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Support standard admin credentials
    // Default admin: admin@talenty.in / talenty@2024
    // Recruiter: priya.nair@talenty.in / recruiter@2024
    let user = null;

    if (
      (email === 'admin@talenty.in' && (password === 'talenty@2024' || password === 'admin123')) ||
      (email === 'admin' && password === 'admin')
    ) {
      user = {
        id: 'a0000000-0000-0000-0000-000000000001',
        email: 'admin@talenty.in',
        name: 'Vikramaditya Rao (Lead Admin)',
        role: 'admin',
      };
    } else if (
      email === 'priya.nair@talenty.in' &&
      (password === 'recruiter@2024' || password === 'recruiter123')
    ) {
      user = {
        id: 'a0000000-0000-0000-0000-000000000002',
        email: 'priya.nair@talenty.in',
        name: 'Priya Nair (Senior Recruiter)',
        role: 'recruiter',
      };
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid staff email or password. Use demo: admin@talenty.in / talenty@2024' },
        { status: 401 }
      );
    }

    // Set secure HTTP-only session cookie
    const token = Buffer.from(JSON.stringify(user)).toString('base64');
    const cookieStore = cookies();
    cookieStore.set('talenty_staff_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server authentication error' }, { status: 500 });
  }
}

