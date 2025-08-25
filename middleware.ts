import { NextRequest, NextResponse } from 'next/server';
import { SECURITY_HEADERS } from './lib/security';

export function middleware(request: NextRequest) {
  // Create response
  const response = NextResponse.next();
  
  // Add security headers to all responses
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Basic rate limiting (in production, use Redis or similar)
    // For now, we'll rely on client-side rate limiting
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Window', '60000');
  }
  
  // Admin route protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Add extra security headers for admin pages
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};