// middleware.ts
import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookies = getSessionCookie(request);

  if (!cookies) {
    const loginUrl = new URL('/signup', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // if (cookies && pathname === '/dashboard') {
  //   return NextResponse.redirect(
  //     new URL('/dashboard/organization', request.url),
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding',
    '/teams/:path*',
    '/profile/:path*',
  ],
};
