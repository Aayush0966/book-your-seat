import { NextRequest, NextResponse } from "next/server"
import {getToken} from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Skip middleware for service worker and static files
  if (request.nextUrl.pathname === '/sw.js' || 
      request.nextUrl.pathname.startsWith('/_next/static') ||
      request.nextUrl.pathname.startsWith('/static/') ||
      request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|js|css|woff|woff2)$/)) {
    return NextResponse.next()
  }

  const token = await getToken({ req: request, secureCookie: process.env.APP_ENV == 'production', secret: process.env.NEXTAUTH_SECRET })
  
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
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
  runtime: 'nodejs',
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|admin|sw.js|manifest.json).*)',
  ],
}
