"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { LogOut, Shield, UserCheck, Stethoscope, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      router.push('/auth/login');
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('currentUser');
    
    // Clear authentication cookies
    document.cookie = 'dakshin-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'dakshin-user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    // Redirect to login
    router.push('/auth/login');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superadmin':
        return <Shield className="h-4 w-4 text-red-400" />;
      case 'admin':
        return <UserCheck className="h-4 w-4 text-orange-400" />;
      case 'doctor':
        return <Stethoscope className="h-4 w-4 text-blue-400" />;
      case 'frontdesk_staff':
        return <Users className="h-4 w-4 text-green-400" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-red-500';
      case 'admin':
        return 'bg-orange-500';
      case 'doctor':
        return 'bg-blue-500';
      case 'frontdesk_staff':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">No user data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome to DakshinRehab Admin</h1>
            <p className="text-gray-400 mt-2">Healthcare management system</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {getRoleIcon(user.role)}
                User Profile
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Role:</span>
                <Badge className={getRoleColor(user.role)}>
                  {user.role.toUpperCase()}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <Badge variant="default">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Access Level</CardTitle>
              <CardDescription className="text-gray-400">
                Based on your role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-white">
                {user.role === 'superadmin' && 'Full system access'}
                {user.role === 'admin' && 'Administrative access'}
                {user.role === 'doctor' && 'Patient and medical records access'}
                {user.role === 'frontdesk_staff' && 'Front desk operations, billing, inpatient & inventory management'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">
                Based on your role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {user.role === 'superadmin' && (
                <Button className="w-full" variant="outline" asChild>
                  <a href="/settings/user-roles">Manage Users</a>
                </Button>
              )}
              {(user.role === 'admin' || user.role === 'superadmin') && (
                <Button className="w-full" variant="outline" asChild>
                  <a href="/billing">View Billing</a>
                </Button>
              )}
              {user.role === 'doctor' && (
                <Button className="w-full" variant="outline" asChild>
                  <a href="/patients">View Patients</a>
                </Button>
              )}
              {user.role === 'frontdesk_staff' && (
                <>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/appointments">Manage Appointments</a>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/billing">Billing Management</a>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/inpatient">Inpatient Management</a>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="/inventory">Inventory Management</a>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Session Info</CardTitle>
              <CardDescription className="text-gray-400">
                Current login session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span className="text-gray-400">Logged in as:</span>
                <span className="text-white">{user.role.toUpperCase()}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-400">Session:</span>
                <span className="text-green-400 text-sm">Active</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}