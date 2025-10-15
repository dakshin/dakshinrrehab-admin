"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCog, 
  Building2, 
  BarChart3, 
  Settings,
  TrendingUp,
  IndianRupee,
  FileText,
  Shield,
  Clock,
  Plus,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome {currentUser?.name || 'Administrator'} - Manage staff, departments, reports, and system configuration
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Loading staff count...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Loading departments...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹--</div>
            <p className="text-xs text-muted-foreground">Loading revenue...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Checking system status...</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-blue-600" />
              Staff Management
            </CardTitle>
            <CardDescription>Manage doctors, staff, and roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/staff/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Staff
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/staff">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/staff/roles">Roles & Permissions</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Doctor Management
            </CardTitle>
            <CardDescription>Manage doctors and schedules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/doctors/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Doctor
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/doctors">
                  <Eye className="h-4 w-4 mr-2" />
                  All Doctors
                </Link>
              </Button>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/doctors/schedule">Doctor Schedules</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-orange-600" />
              Departments
            </CardTitle>
            <CardDescription>Manage departments and services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/departments/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/departments">
                  <Eye className="h-4 w-4 mr-2" />
                  All Departments
                </Link>
              </Button>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/departments/services">Manage Services</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Reports & Analytics
            </CardTitle>
            <CardDescription>View comprehensive reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/reports/financial">Financial Reports</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/reports/appointments">Appointment Reports</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/reports/patients">Patient Analytics</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              System Settings
            </CardTitle>
            <CardDescription>Configure system and clinic settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/settings">General Settings</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/settings/notifications">Notifications</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/settings/hours">Working Hours</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Support & Help
            </CardTitle>
            <CardDescription>Support and system management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/support">System Support</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/feedback">View Feedback</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Management Overview & System Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Staff Activity</CardTitle>
            <CardDescription>Latest staff and system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 text-muted-foreground">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Staff activity will appear here</p>
              <p className="text-sm">Recent staff activities and system updates will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts & Notifications</CardTitle>
            <CardDescription>Important system and management updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 text-muted-foreground">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>System alerts will appear here</p>
              <p className="text-sm">Important notifications and system updates will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}