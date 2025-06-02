import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'your-super-secret-admin-key';
const ADMIN_TOKEN_EXPIRY = '24h';

export interface AdminTokenPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const generateAdminToken = (userId: number, email: string, role: string): string => {
  const payload: AdminTokenPayload = {
    userId,
    email,
    role
  };
  return jwt.sign(payload, ADMIN_JWT_SECRET, { 
    expiresIn: ADMIN_TOKEN_EXPIRY 
  });
};

export const verifyAdminToken = (token: string): AdminTokenPayload | null => {
  try {
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET) as AdminTokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export const getAdminTokenFromCookies = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('adminToken');
    return tokenCookie?.value || null;
  } catch (error) {
    console.error('Error reading admin token from cookies:', error);
    return null;
  }
};

export const getAuthenticatedAdmin = async (): Promise<AdminTokenPayload | null> => {
  const token = await getAdminTokenFromCookies();
  if (!token) {
    return null;
  }
  return verifyAdminToken(token);
};

export const requireAdminAuth = async (): Promise<NextResponse | null> => {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: 'Admin authentication required. Please log in.' },
      { status: 401 }
    );
  }
  if (admin.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Admin privileges required.' },
      { status: 403 }
    );
  }
  return null;
};

export const setAdminTokenCookie = async (token: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set('adminToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60,
    path: '/'
  });
};

export const clearAdminTokenCookie = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete('adminToken');
};

export const getAdminFromRequest = async (): Promise<AdminTokenPayload | null> => {
  return await getAuthenticatedAdmin();
}; 