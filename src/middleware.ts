import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  console.log('Middleware invoked:', request.nextUrl.pathname)
  
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log('Token:', token)

  if (request.nextUrl.pathname === '/') {
    console.log('Redirecting to /home')
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
    console.log('API request:', request.nextUrl.pathname)
    if (request.nextUrl.pathname.startsWith('/api/admin') ||
        request.nextUrl.pathname.startsWith('/api/auth')) {
      console.log('Admin or Auth API request, allowing through')
      return NextResponse.next()
    }
    if (!token) {
      console.log('No token, returning 401 for API request')
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
    }
  }

  if (!token) {
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth') ||
                       request.nextUrl.pathname.startsWith('/api/auth')
    console.log('No token, isAuthPage:', isAuthPage)
    if (!isAuthPage) {
      const redirectUrl = new URL('/auth', request.url)
      redirectUrl.searchParams.set('callbackUrl', request.url)
      console.log('Redirecting to /auth with callbackUrl:', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  console.log('Allowing request through')
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|admin).*)',
  ],
}
