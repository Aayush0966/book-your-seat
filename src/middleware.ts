import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token') ? true : false;
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
    '/((?!_next/static|_next/image|favicon.ico|public|admin).*)',
  ],
}
