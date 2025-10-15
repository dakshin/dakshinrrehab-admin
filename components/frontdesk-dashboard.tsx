"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Receipt, 
  Bed, 
  Package, 
  Clock,
  Plus,
  Eye,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  IndianRupee
} from 'lucide-react';
import Link from 'next/link';

export function FrontDeskDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Front Desk Dashboard</h1>
        <p className="text-muted-foreground">
          Manage appointments, billing, admissions, and front desk operations
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Loading appointments...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Loading billing data...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied Beds</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--/--</div>
            <p className="text-xs text-muted-foreground">Loading room status...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Loading inventory...</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Appointments
            </CardTitle>
            <CardDescription>Manage patient appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/appointments/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Book Appointment
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/appointments">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/appointments/calendar">Calendar View</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Patients
            </CardTitle>
            <CardDescription>Patient registration & management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/patients/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Register Patient
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/patients">
                  <Eye className="h-4 w-4 mr-2" />
                  Patient List
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-orange-600" />
              Billing
            </CardTitle>
            <CardDescription>Invoicing & payment collection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/billing/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/billing">
                  <Eye className="h-4 w-4 mr-2" />
                  All Invoices
                </Link>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/billing/quotations">Quotations</Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/billing/payments">Payments</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-purple-600" />
              Inpatient Management
            </CardTitle>
            <CardDescription>Admissions & room management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/rooms/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Admission
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/rooms/alloted">
                  <Eye className="h-4 w-4 mr-2" />
                  Room Status
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-red-600" />
              Inventory
            </CardTitle>
            <CardDescription>Stock & supplies management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/inventory/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/inventory">
                  <Eye className="h-4 w-4 mr-2" />
                  View Stock
                </Link>
              </Button>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/inventory/alerts">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Stock Alerts
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Support & Help
            </CardTitle>
            <CardDescription>Get assistance & provide feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/support">Get Support</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/feedback">Submit Feedback</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule & Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 text-muted-foreground">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Today's schedule will appear here</p>
              <p className="text-sm">Appointment schedule and patient information will be displayed here</p>
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/appointments">View All Appointments</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Important updates requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 text-muted-foreground">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Alerts and notifications will appear here</p>
              <p className="text-sm">Important alerts and system notifications will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}