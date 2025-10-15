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
  '/doctors',
  '/inpatient',
  '/inventory',
  '/medical-certificates'
];

// Define public routes that don't require authentication
const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password'
];

// Define SuperAdmin only routes
const superAdminRoutes = [
  '/settings/user-roles',
  '/settings/system'
];

// Define Admin routes (Admin + SuperAdmin)
const adminRoutes = [
  '/settings/user-roles',
  '/reports/admin',
  '/settings/system'
];

// Define Doctor-specific routes
const doctorRoutes = [
  '/patients',
  '/appointments',
  '/medical-certificates'
];

// Define Front Desk Staff routes
const frontDeskRoutes = [
  '/patients',
  '/appointments',
  '/billing',
  '/inpatient',
  '/inventory'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Redirect root to login (we'll handle auth redirect in the component)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Check for authentication token in cookies
    const authToken = request.cookies.get('dakshin-auth-token')?.value;
    const userRole = request.cookies.get('dakshin-user-role')?.value;
    
    if (!authToken) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Role-based route protection
    try {
      // Check for SuperAdmin routes
      const isSuperAdminRoute = superAdminRoutes.some(route => pathname.startsWith(route));
      if (isSuperAdminRoute && userRole !== 'superadmin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Check for Admin routes (Admin + SuperAdmin)
      const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
      if (isAdminRoute && !['admin', 'superadmin'].includes(userRole || '')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Check for Doctor routes
      const isDoctorRoute = doctorRoutes.some(route => pathname.startsWith(route));
      if (isDoctorRoute && !['doctor', 'admin', 'superadmin'].includes(userRole || '')) {
        // Front desk staff can access some doctor routes
        if (userRole === 'frontdesk_staff' && (pathname.startsWith('/patients') || pathname.startsWith('/appointments'))) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Check for Front Desk routes
      const isFrontDeskRoute = frontDeskRoutes.some(route => pathname.startsWith(route));
      if (isFrontDeskRoute && !['frontdesk_staff', 'admin', 'superadmin'].includes(userRole || '')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      // If there's any error in role checking, redirect to login
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