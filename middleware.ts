import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/patients',
  '/appointments', 
  '/billing',
  '/settings',
  '/reports',
  '/superadmin'
];

// Define public routes that don't require authentication
const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/'
];

// Define SuperAdmin only routes
const superAdminRoutes = [
  '/superadmin',
  '/settings/user-roles'
];

// Define Admin routes (Admin + SuperAdmin)
const adminRoutes = [
  '/users',
  '/settings/system',
  '/reports/admin'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Check for authentication token (you might need to adjust this based on your auth implementation)
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // For now, we'll let authenticated users through
    // In a real implementation, you'd verify the token and check roles here
    
    // Check for SuperAdmin routes
    const isSuperAdminRoute = superAdminRoutes.some(route => pathname.startsWith(route));
    if (isSuperAdminRoute) {
      // You could add role checking logic here
      // For now, we'll allow access if authenticated
      return NextResponse.next();
    }

    // Check for Admin routes  
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    if (isAdminRoute) {
      // You could add role checking logic here
      return NextResponse.next();
    }

    return NextResponse.next();
  }

  // Redirect root to dashboard if authenticated, login if not
  if (pathname === '/') {
    const token = request.cookies.get('auth-token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};