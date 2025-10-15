"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string[];
  fallbackUrl?: string;
}

export default function AuthGuard({ 
  children, 
  requiredRole, 
  fallbackUrl = '/auth/login' 
}: AuthGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if user is authenticated
        const currentUser = localStorage.getItem('currentUser');
        
        if (!currentUser) {
          // No user data found, redirect to login
          router.push('/auth/login');
          return;
        }

        const userData = JSON.parse(currentUser);
        
        // Check if user role is authorized
        if (requiredRole && requiredRole.length > 0) {
          const userRole = userData.role;
          
          if (!requiredRole.includes(userRole)) {
            // User doesn't have required role
            router.push(fallbackUrl);
            return;
          }
        }

        // User is authenticated and authorized
        setIsAuthorized(true);
        
        // Sync cookies with localStorage (in case they got out of sync)
        document.cookie = `dakshin-auth-token=authenticated-${Date.now()}; path=/; max-age=86400`;
        document.cookie = `dakshin-user-role=${userData.role}; path=/; max-age=86400`;
        
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router, requiredRole, fallbackUrl]);

  // Show loading state while checking authentication
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-400 mt-2">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Render protected content if authorized
  if (isAuthorized) {
    return <>{children}</>;
  }

  // This shouldn't render as we redirect above, but just in case
  return null;
}

// Utility function to check if user has specific role
export function useUserRole(): string | null {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        setUserRole(userData.role);
      }
    } catch (error) {
      console.error('Error getting user role:', error);
    }
  }, []);

  return userRole;
}

// Utility function to check if user has permission
export function useHasPermission(requiredRoles: string[]): boolean {
  const userRole = useUserRole();
  return userRole ? requiredRoles.includes(userRole) : false;
}