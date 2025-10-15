"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  FileText, 
  Pill, 
  Clock,
  Plus,
  Eye,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Stethoscope,
  Activity,
  ClipboardList
} from 'lucide-react';
import Link from 'next/link';
import { useDoctorDataFilter, SAMPLE_PATIENTS, SAMPLE_APPOINTMENTS } from '@/lib/doctor-data-filter';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { DataIsolationInfo } from '@/components/data-isolation-info';

export function DoctorDashboard() {
  const { filterPatients, filterAppointments } = useDoctorDataFilter();
  const [myPatients, setMyPatients] = useState<any[]>([]);
  const [myAppointments, setMyAppointments] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Get current user data
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      
      // Filter data to show only this doctor's patients and appointments
      const filteredPatients = filterPatients(SAMPLE_PATIENTS);
      const filteredAppointments = filterAppointments(SAMPLE_APPOINTMENTS);
      
      setMyPatients(filteredPatients);
      setMyAppointments(filteredAppointments);
    }
  }, [filterPatients, filterAppointments]);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome Dr. {currentUser?.name?.replace('Dr. ', '') || 'Doctor'} - Manage your patients and appointments
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
          <p className="text-sm text-blue-800">
            🔒 <strong>Privacy Protected:</strong> You can only see patients assigned to you. 
            Currently showing <strong>{myPatients.length}</strong> of your patients.
            {myPatients.length === 0 && ' No patients assigned yet.'}
            {myPatients.length > 0 && ` (${myPatients.map(p => p.name).join(', ')}).`}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myPatients.length}</div>
            <p className="text-xs text-muted-foreground">Your assigned patients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Your appointments today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions Issued</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Loading prescriptions...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.max(0, myPatients.length - 2)}</div>
            <p className="text-xs text-red-600">Your pending reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Patients
            </CardTitle>
            <CardDescription>Patient records & management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/patients">
                  <Eye className="h-4 w-4 mr-2" />
                  My Patients ({myPatients.length})
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/patients/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Appointments
            </CardTitle>
            <CardDescription>Schedule & manage appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/appointments">
                  <Eye className="h-4 w-4 mr-2" />
                  My Schedule ({myAppointments.length})
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/appointments/calendar">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-orange-600" />
              Prescriptions
            </CardTitle>
            <CardDescription>Create & manage prescriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/prescriptions/create">
                  <Plus className="h-4 w-4 mr-2" />
                  New Prescription
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/prescriptions">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/prescriptions/templates">Medicine Templates</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Medical Certificates
            </CardTitle>
            <CardDescription>Issue medical certificates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/medical-certificates/fitness-certificates/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Fitness Cert
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/medical-certificates/disability-certificates/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Disability Cert
                </Link>
              </Button>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/medical-certificates">View All Certificates</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-600" />
              Treatment Plans
            </CardTitle>
            <CardDescription>Patient treatment & therapy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/patients">Create Treatment Plan</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/patients">Review Progress</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              Support & Resources
            </CardTitle>
            <CardDescription>Get help & provide feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/support">Medical Support</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/feedback">Submit Feedback</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule & Patient Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>Your scheduled patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myAppointments.length > 0 ? (
                myAppointments.map((appointment, index) => {
                  const patient = myPatients.find(p => p.id === appointment.patientId);
                  const time = appointment.appointmentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                  
                  return (
                    <div key={appointment.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{patient?.name || 'Unknown Patient'}</p>
                          <p className="text-sm text-muted-foreground">{time} - Consultation</p>
                        </div>
                      </div>
                      <Badge variant={appointment.status === 'confirmed' ? 'secondary' : 'outline'}>
                        {appointment.status}
                      </Badge>
                    </div>
                  );
                })
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No appointments scheduled for today</p>
                  <p className="text-sm">Your appointment schedule will appear here</p>
                </div>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/appointments">View Full Schedule</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Alerts & Updates</CardTitle>
            <CardDescription>Important patient information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center p-6 text-muted-foreground">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Patient alerts will appear here</p>
                <p className="text-sm">Important patient updates and notifications will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Data Isolation Test Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <DataIsolationInfo />
      )}
    </div>
  );
}