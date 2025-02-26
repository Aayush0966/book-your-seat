import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
    // Skip auth check for /api/admin and /api/auth routes
    if (request.nextUrl.pathname.startsWith('/api/admin') || 
        request.nextUrl.pathname.startsWith('/api/auth')) {
      return NextResponse.next()
    }
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
    }
  }

  if (!token) {
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth') ||
                      request.nextUrl.pathname.startsWith('/api/auth')
    
    if (!isAuthPage) {
      const redirectUrl = new URL('/auth', request.url)
      redirectUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|admin).*)',
  ],
}