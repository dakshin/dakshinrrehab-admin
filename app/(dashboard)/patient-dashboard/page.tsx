"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, ClipboardList, HeartPulse, Activity, Wallet } from "lucide-react";

export default function PatientDashboardPage() {
  const patientName = "Ananya"; // Dynamic binding placeholder for patient name

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-6">
        {/* Greeting Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Welcome back, {patientName}
          </h2>
          <p className="text-muted-foreground">
            DakshinRehab – Optimizing Your Health
          </p>
          <p className="text-muted-foreground">
            Your recovery journey is progressing beautifully. Keep moving forward!
          </p>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Therapy Sessions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Therapy Sessions
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                Upcoming physiotherapy sessions this week
              </p>
            </CardContent>
          </Card>

          {/* Assessment Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                Assessment Reports
              </CardTitle>
              <Button variant="outline" size="sm">
                View Reports
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Recent evaluations (Gait, InBody, Range of Motion)
              </p>
            </CardContent>
          </Card>

          {/* Progress Metrics */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Progress Metrics
              </CardTitle>
              <Button variant="outline" size="sm">
                Track
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                Overall recovery improvement this month
              </p>
              <Progress value={78} className="mt-2" />
            </CardContent>
          </Card>

          {/* Billing */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                Billing (₹)
              </CardTitle>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹3,750</div>
              <p className="text-xs text-muted-foreground">
                Outstanding therapy session balance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[400px]">
            <TabsTrigger value="overview">RxSummary</TabsTrigger>
            <TabsTrigger value="schedule">TxSchedule</TabsTrigger>
            <TabsTrigger value="sessions">TxSessions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Rehab Summary */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>RxSummary</CardTitle>
                <CardDescription>
                  Summary of your overall therapy improvements and milestones achieved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You’ve completed 24 sessions this month, focusing on posture correction, 
                  strength training, and flexibility. Your gait analysis shows 
                  steady improvement, and your physiotherapist has recommended 
                  advanced Redcord Neurac sessions for neuromuscular activation.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Therapy Schedule */}
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>TxSchedule</CardTitle>
                <CardDescription>
                  Your next scheduled physiotherapy sessions and timings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>🕘 Mon, 9:00 AM — Knee Strengthening (Dr. Swapna Gandhi)</li>
                  <li>🕓 Wed, 4:30 PM — Spine Decompression & Core Stability</li>
                  <li>🕕 Fri, 6:00 PM — Redcord Suspension Therapy</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Therapy Sessions */}
          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Therapy Sessions</CardTitle>
                <CardDescription>
                  List of therapies currently assigned to your recovery plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✅ Salus Talent Pro Electromagnetic Therapy – Pain Management</li>
                  <li>✅ Gait Analysis & Balance Training</li>
                  <li>✅ Clinical Pilates – Postural Control</li>
                  <li>✅ Redcord Neurac Suspension Therapy</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessment Reports */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Latest Reports</CardTitle>
                <CardDescription>
                  Review your recent analysis results and physiotherapist feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>📊 Gait Analysis Report — 05 Oct 2025</li>
                  <li>📈 InBody Composition Report — 03 Oct 2025</li>
                  <li>🦵 Range of Motion Test — 01 Oct 2025</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        {/* Motivation Footer */}
        <div className="text-center text-sm text-muted-foreground pb-8">
          <HeartPulse className="inline h-4 w-4 text-primary mr-1" />
          Every session brings you closer to strength and mobility. Stay consistent!
        </div>
      </main>
    </div>
  );
}