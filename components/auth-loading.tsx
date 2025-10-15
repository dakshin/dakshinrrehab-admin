"use client";

import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';

interface AuthLoadingProps {
  children: React.ReactNode;
}

export default function AuthLoading({ children }: AuthLoadingProps) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
          <div className="text-white">
            <h2 className="text-xl font-semibold">DakshinRehab</h2>
            <p className="text-gray-400 text-sm">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}