import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookies = getSessionCookie(request);
  if (!cookies) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  if (cookies && pathname === '/dashboard') {
    return NextResponse.redirect(
      new URL('/dashboard/organization', request.url),
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding'],
};
