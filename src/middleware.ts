import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  console.log("[middleware] Request Path:", request.nextUrl.pathname)

  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })
  console.log("[middleware] Token:", token ? "Present" : "Not present")

  if (request.nextUrl.pathname === '/') {
    console.log("[middleware] Redirecting '/' to '/home'")
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
    console.log("[middleware] API route:", request.nextUrl.pathname)
    if (request.nextUrl.pathname.startsWith('/api/admin') ||
        request.nextUrl.pathname.startsWith('/api/auth')) {
      console.log("[middleware] Skipping auth check for admin or auth")
      return NextResponse.next()
    }
    if (!token) {
      console.log("[middleware] Missing token for API call")
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
    }
  }

  if (!token) {
    console.log("[middleware] Checking if auth page is required")
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth') ||
                       request.nextUrl.pathname.startsWith('/api/auth')
    if (!isAuthPage) {
      console.log("[middleware] Redirecting to '/auth'")
      const redirectUrl = new URL('/auth', request.url)
      redirectUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  console.log("[middleware] Passing request to next handler")
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|admin).*)',
  ],
}