"use client";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentAppointments } from "@/components/recent-appointments";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Ban,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  IndianRupee,
  Download,
  Filter,
  UserRound,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ---------- Notifications ----------
const unread = [
  {
    icon: <AlertCircle className="h-4 w-4 text-red-500" />,
    title: "Equipment Maintenance Alert",
    message: "Shockwave Therapy unit requires preventive maintenance check.",
    time: "10 minutes ago",
  },
  {
    icon: <Calendar className="h-4 w-4 text-blue-500" />,
    title: "New Session Booking",
    message: "A patient booked a physiotherapy session for knee rehab tomorrow.",
    time: "30 minutes ago",
  },
  {
    icon: <UserRound className="h-4 w-4 text-green-500" />,
    title: "New Case Registered",
    message: "Front Office (Miss Lavanya) added a new patient under Neuro Rehab.",
    time: "1 hour ago",
  },
  {
    icon: <Clock className="h-4 w-4 text-orange-500" />,
    title: "Therapist Schedule Update",
    message: "Dr. Swapna Gandhi adjusted the afternoon Pilates session slots.",
    time: "2 hours ago",
  },
  {
    icon: <IndianRupee className="h-4 w-4 text-purple-500" />,
    title: "Payment Received",
    message: "₹1,500 received for a spine decompression package session.",
    time: "3 hours ago",
  },
];

const today = [
  {
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    title: "Session Confirmed",
    message: "Physiotherapy session confirmed for patient under Dr. Swapna Gandhi.",
    time: "4 hours ago",
  },
  {
    icon: <Users className="h-4 w-4 text-blue-500" />,
    title: "Team Huddle Reminder",
    message: "Morning team briefing with front office and therapists at 9:15 AM.",
    time: "5 hours ago",
  },
  {
    icon: <Calendar className="h-4 w-4 text-purple-500" />,
    title: "Schedule Change",
    message: "Prosthetic fitting session rescheduled to 4:30 PM.",
    time: "6 hours ago",
  },
  {
    icon: <IndianRupee className="h-4 w-4 text-green-500" />,
    title: "Invoice Paid",
    message: "₹2,300 received for gait analysis and posture correction session.",
    time: "8 hours ago",
  },
];

const earlier = [
  {
    icon: <Ban className="h-4 w-4 text-red-500" />,
    title: "Session Cancelled",
    message: "One wellness appointment cancelled by patient (rebooked next week).",
    time: "Yesterday",
  },
  {
    icon: <AlertCircle className="h-4 w-4 text-orange-500" />,
    title: "System Maintenance",
    message: "DakshinRehab Dashboard successfully updated to latest release.",
    time: "Yesterday",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    title: "Report Ready",
    message: "Weekly therapy outcome reports generated for physiotherapy department.",
    time: "2 days ago",
  },
  {
    icon: <Users className="h-4 w-4 text-blue-500" />,
    title: "New Team Member",
    message: "Please welcome Tanisha Mohanty (BPT) – Physiotherapist – to DakshinRehab.",
    time: "3 days ago",
  },
];

// ---------- Settings ----------
const categories = [
  {
    category: "Session Alerts",
    description: "New, cancelled, and rescheduled therapy sessions",
    enabled: true,
  },
  {
    category: "Patient Updates",
    description: "New case registrations and discharge updates",
    enabled: true,
  },
  {
    category: "Team Announcements",
    description: "Staff schedules and clinic news",
    enabled: true,
  },
  {
    category: "Equipment Notices",
    description: "Maintenance and device usage notifications",
    enabled: true,
  },
];

const deliveryMethods = [
  {
    method: "In-app Notifications",
    description: "Receive updates inside the DakshinRehab dashboard",
    enabled: true,
  },
  {
    method: "Email Notifications",
    description: "Get daily summaries via email",
    enabled: true,
  },
  {
    method: "SMS Notifications",
    description: "Receive text reminders for sessions",
    enabled: false,
  },
  {
    method: "Push Notifications",
    description: "Instant alerts on your mobile device",
    enabled: false,
  },
];

// ---------- Charts ----------
const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const demographicsData = [
  { ageGroup: "0-17", male: 30, female: 25 },
  { ageGroup: "18-30", male: 60, female: 70 },
  { ageGroup: "31-45", male: 55, female: 65 },
  { ageGroup: "46-60", male: 40, female: 45 },
  { ageGroup: "60+", male: 20, female: 30 },
];

const appointmentTypesData = [
  { name: "Physiotherapy", value: 45 },
  { name: "Prosthetics & Orthotics", value: 20 },
  { name: "Neuro Rehab", value: 15 },
  { name: "Pediatric Rehab", value: 10 },
  { name: "Wellness", value: 10 },
];

const revenueDepartmentsData = [
  { name: "Physiotherapy", revenue: 652000 },
  { name: "Prosthetics & Orthotics", revenue: 498000 },
  { name: "Wellness", revenue: 285000 },
  { name: "Pediatric", revenue: 172000 },
  { name: "Vascular", revenue: 98000 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
            DakshinRehab Dashboard
          </h2>
          <p className="text-muted-foreground">
            Welcome back! Empowering recovery every day through compassionate rehabilitation.
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <CalendarDateRangePicker />
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 xl:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border bg-white dark:bg-background shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-col items-start gap-1">
            <IndianRupee className="h-6 w-6 text-green-600" />
            <CardTitle className="text-base font-semibold text-foreground">Total Clinic Revenue</CardTitle>
            <p className="text-muted-foreground text-sm">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 mt-2 !pt-0">
            <h3 className="text-4xl font-bold">₹ 12,45,800</h3>
          </CardContent>
        </Card>

        <Card className="border bg-white dark:bg-background shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-col items-start gap-1">
            <Calendar className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-base font-semibold text-foreground">Rehab Sessions</CardTitle>
            <p className="text-muted-foreground text-sm">
              <span className="text-blue-600">+8%</span> from last month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 mt-2 !pt-0">
            <h3 className="text-4xl font-bold">+1,245</h3>
          </CardContent>
        </Card>

        <Card className="border bg-white dark:bg-background shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-col items-start gap-1">
            <UserRound className="h-6 w-6 text-amber-500" />
            <CardTitle className="text-base font-semibold text-foreground">Active Rehab Cases</CardTitle>
            <p className="text-muted-foreground text-sm">
              <span className="text-amber-600">+12%</span> this week
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 mt-2 !pt-0">
            <h3 className="text-4xl font-bold">+385</h3>
          </CardContent>
        </Card>

        <Card className="border bg-white dark:bg-background shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-col items-start gap-1">
            <Users className="h-6 w-6 text-purple-500" />
            <CardTitle className="text-base font-semibold text-foreground">Team Members</CardTitle>
            <p className="text-muted-foreground text-sm">
              <span className="text-purple-600">+2</span> joined this month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 mt-2 !pt-0">
            <h3 className="text-4xl font-bold">+27</h3>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="max-md:space-y-4 md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Rehab sessions and revenue for current period</CardDescription>
              </CardHeader>
              <CardContent>
                <Overview />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>You have {12} sessions today.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentAppointments />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-xl font-semibold">DakshinRehab Analytics</h2>
              <p className="text-sm text-muted-foreground">Insights and performance across rehabilitation departments</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Age and gender distribution of active cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demographicsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ageGroup" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" fill="#2563eb" name="Male" />
                      <Bar dataKey="female" fill="#ec4899" name="Female" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treatment Categories</CardTitle>
                <CardDescription>Distribution by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={appointmentTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {appointmentTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Department</CardTitle>
                <CardDescription>Monthly service-wise revenue split (₹)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={revenueDepartmentsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Patient Satisfaction</CardTitle>
                <CardDescription>Based on feedback surveys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="space-y-1 w-full flex justify-between mb-2">
                      <p className="text-sm font-medium">Overall Experience</p>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2 [&>*]:bg-green-500" />
                  </div>
                  <div>
                    <div className="space-y-1 w-full flex justify-between mb-2">
                      <p className="text-sm font-medium">Wait Times</p>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2 [&>*]:bg-green-500" />
                  </div>
                  <div>
                    <div className="space-y-1 w-full flex justify-between mb-2">
                      <p className="text-sm font-medium">Staff Friendliness</p>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2 [&>*]:bg-green-500" />
                  </div>
                  <div>
                    <div className="space-y-1 w-full flex justify-between mb-2">
                      <p className="text-sm font-medium">Treatment Effectiveness</p>
                      <span className="text-sm font-medium">89%</span>
                    </div>
                    <Progress value={89} className="h-2 [&>*]:bg-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Staff Performance</CardTitle>
                <CardDescription>Top performing team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Dr. Swapna Gandhi", role: "Physical Therapist", patients: 42, rating: 4.9 },
                    { name: "Mohan Gandhi", role: "Founder, Prosthetist & Orthotist", patients: 28, rating: 4.8 },
                    { name: "Dr. Bhavin Ram", role: "Vascular Surgeon", patients: 18, rating: 4.7 },
                    { name: "Dr. Sujith Omkaram", role: "Pediatric Orthopaedician", patients: 22, rating: 4.8 },
                    { name: "Miss Lavanya", role: "Front Office Coordinator", patients: 65, rating: 4.9 },
                  ].map((staff, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {staff.name
                              .split(" ")
                              .map((n, idx) => (idx === 1 ? n[0] : ""))
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">{staff.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{staff.patients} patients</p>
                        <p className="text-xs text-muted-foreground">Rating: {staff.rating}/5</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-semibold mb-2">Clinic Reports</h2>
              <p className="text-sm text-muted-foreground">Access therapy, patient, and billing reports</p>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Revenue, packages, and billing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { name: "Monthly Revenue Summary (₹)", updated: "Today" },
                    { name: "Quarterly Service-wise Analysis", updated: "Last week" },
                    { name: "Package Sales & Discounts", updated: "2 days ago" },
                    { name: "Outstanding Payments", updated: "Yesterday" },
                  ].map((report, i) => (
                    <li key={i} className="flex items-center justify-between py-1 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{report.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Updated: {report.updated}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="link" href="/reports/appointments" className="mt-2 px-0">
                  View all financial reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Patient Reports</CardTitle>
                <CardDescription>Outcomes, attendance, demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { name: "New Case Registrations", updated: "Today" },
                    { name: "Patient Demographics", updated: "3 days ago" },
                    { name: "Therapy Attendance & No-shows", updated: "Last week" },
                    { name: "Treatment Outcomes Summary", updated: "Yesterday" },
                  ].map((report, i) => (
                    <li key={i} className="flex items-center justify-between py-1 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{report.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Updated: {report.updated}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="link" href="/reports/patients" className="mt-2 px-0">
                  View all patient reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Operational Reports</CardTitle>
                <CardDescription>Staff, rooms, and equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { name: "Therapist Performance Metrics", updated: "Yesterday" },
                    { name: "Equipment Status & Usage", updated: "Today" },
                    { name: "Room Utilization", updated: "2 days ago" },
                    { name: "Wait Time Analysis", updated: "Last week" },
                  ].map((report, i) => (
                    <li key={i} className="flex items-center justify-between py-1 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{report.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Updated: {report.updated}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="link" href="/reports/inventory" className="mt-2 px-0">
                  View all operational reports
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Report Activity</CardTitle>
              <CardDescription>Reports generated or viewed recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "Mohan Gandhi", report: "Monthly Revenue Summary", time: "2 hours ago", action: "Generated" },
                  { user: "Miss Lavanya", report: "Therapy Attendance & No-shows", time: "Yesterday, 4:30 PM", action: "Viewed" },
                  { user: "Dr. Swapna Gandhi", report: "Treatment Outcomes Summary", time: "Yesterday, 2:15 PM", action: "Generated" },
                  { user: "Tanisha Mohanty", report: "Equipment Status & Usage", time: "2 days ago", action: "Viewed" },
                  { user: "Dr. Bhavin Ram", report: "Wait Time Analysis", time: "3 days ago", action: "Generated" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between flex-wrap gap-2 border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{activity.user.split(" ")[1]?.[0] || activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium mb-1 line-clamp-2">
                          {activity.user} {activity.action.toLowerCase()} <span className="font-semibold">{activity.report}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-semibold mb-2">Notifications</h2>
              <p className="text-sm text-muted-foreground">Updates from DakshinRehab team, therapists, and front office</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Mark All as Read
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Unread */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Unread</CardTitle>
                  <Badge>5</Badge>
                </div>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-auto">
                <div className="space-y-4">
                  {unread.map((notification, i) => (
                    <div key={i} className="flex gap-3 border-b pb-3 last:border-0 last:pb-0">
                      <div className="mt-0.5">{notification.icon}</div>
                      <div>
                        <p className="text-sm font-medium mb-1 line-clamp-1">{notification.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Today</CardTitle>
                  <Badge variant="outline">4</Badge>
                </div>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-auto">
                <div className="space-y-4">
                  {today.map((notification, i) => (
                    <div key={i} className="flex gap-3 border-b pb-3 last:border-0 last:pb-0">
                      <div className="mt-0.5">{notification.icon}</div>
                      <div>
                        <p className="text-sm font-medium mb-1">{notification.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Earlier */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Earlier</CardTitle>
                  <Badge variant="outline">4</Badge>
                </div>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-auto">
                <div className="space-y-4">
                  {earlier.map((notification, i) => (
                    <div key={i} className="flex gap-3 border-b pb-3 last:border-0 last:pb-0">
                      <div className="mt-0.5">{notification.icon}</div>
                      <div>
                        <p className="text-sm font-medium mb-1">{notification.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Categories</h3>
                  {categories.map((setting, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium mb-1">{setting.category}</p>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Delivery Methods</h3>
                  {deliveryMethods.map((setting, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium mb-1">{setting.method}</p>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}