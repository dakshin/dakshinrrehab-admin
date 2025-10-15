"use client";

import { FrontDeskDashboard } from '@/components/frontdesk-dashboard';
import { DoctorDashboard } from '@/components/doctor-dashboard';
import { AdminDashboard } from '@/components/admin-dashboard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      router.push('/auth/login');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No user data available</p>
      </div>
    );
  }

  // Render role-specific dashboard
  switch (user.role) {
    case 'frontdesk_staff':
      return <FrontDeskDashboard />;
    
    case 'doctor':
      return <DoctorDashboard />;
    
    case 'admin':
      return <AdminDashboard />;
    
    case 'superadmin':
      return (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Complete system control, user management, and system settings
            </p>
          </div>
          {/* SuperAdmin-specific content will be added later */}
          <p className="text-muted-foreground">Super Admin dashboard coming soon...</p>
        </div>
      );
    
    default:
      return (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to DakshinRehab Admin</p>
          </div>
        </div>
      );
  }
}