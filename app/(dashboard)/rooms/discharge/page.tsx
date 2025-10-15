"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  FileText, 
  Search, 
  UserCheck, 
  Home, 
  AlertTriangle,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

// Sample data for patients ready for discharge
const dischargePatients = [
  {
    id: "PAT001",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    image: "/user-3.png",
    admissionDate: "2024-01-10",
    room: "R201",
    bed: "B1",
    condition: "Stroke Rehabilitation",
    doctor: "Dr. Swapna Gandhi",
    status: "Ready for Discharge",
    dischargeDate: "2024-01-20",
    estimatedTime: "10:00 AM",
    followUpRequired: true,
    medications: ["Aspirin", "Physiotherapy exercises"],
    priority: "Normal"
  },
  {
    id: "PAT002", 
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    image: "/user-3.png",
    admissionDate: "2024-01-12",
    room: "R105",
    bed: "B2",
    condition: "Post-Surgery Recovery",
    doctor: "Dr. Bhavin Ram",
    status: "Discharge Planned",
    dischargeDate: "2024-01-21",
    estimatedTime: "2:00 PM",
    followUpRequired: true,
    medications: ["Antibiotics", "Pain management"],
    priority: "High"
  },
  {
    id: "PAT003",
    name: "Mohammed Ali",
    age: 28,
    gender: "Male", 
    image: "/user-3.png",
    admissionDate: "2024-01-15",
    room: "R308",
    bed: "B1",
    condition: "ACL Injury Recovery",
    doctor: "Dr. Sujith Omkaram",
    status: "Discharge Pending",
    dischargeDate: "2024-01-22",
    estimatedTime: "11:30 AM",
    followUpRequired: true,
    medications: ["Physiotherapy", "Anti-inflammatory"],
    priority: "Normal"
  },
  {
    id: "PAT004",
    name: "Lakshmi Devi",
    age: 58,
    gender: "Female",
    image: "/user-3.png", 
    admissionDate: "2024-01-08",
    room: "R102",
    bed: "B3",
    condition: "Parkinson's Therapy",
    doctor: "Dr. Swapna Gandhi",
    status: "Ready for Discharge",
    dischargeDate: "2024-01-20",
    estimatedTime: "3:30 PM",
    followUpRequired: true,
    medications: ["Levodopa", "Physiotherapy plan"],
    priority: "High"
  }
];

export default function DischargePlanningPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Filter patients based on search and filters
  const filteredPatients = dischargePatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.room.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || patient.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesPriority = priorityFilter === "all" || patient.priority.toLowerCase() === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ready for Discharge":
        return <Badge className="bg-green-600">{status}</Badge>;
      case "Discharge Planned":
        return <Badge className="bg-blue-600">{status}</Badge>;
      case "Discharge Pending":
        return <Badge className="bg-orange-500">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">{priority}</Badge>;
      case "Normal":
        return <Badge variant="outline">{priority}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Calculate summary stats
  const readyForDischarge = dischargePatients.filter(p => p.status === "Ready for Discharge").length;
  const plannedDischarges = dischargePatients.filter(p => p.status === "Discharge Planned").length;
  const pendingDischarges = dischargePatients.filter(p => p.status === "Discharge Pending").length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/rooms">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Discharge Planning</h1>
            <p className="text-muted-foreground">Manage patient discharges and follow-up care</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready for Discharge</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{readyForDischarge}</div>
            <p className="text-xs text-muted-foreground">Patients ready to go home</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned Discharges</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{plannedDischarges}</div>
            <p className="text-xs text-muted-foreground">Scheduled for discharge</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Discharges</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{pendingDischarges}</div>
            <p className="text-xs text-muted-foreground">Awaiting clearance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Required</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {dischargePatients.filter(p => p.followUpRequired).length}
            </div>
            <p className="text-xs text-muted-foreground">Patients need follow-up</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-8 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ready">Ready for Discharge</SelectItem>
              <SelectItem value="planned">Discharge Planned</SelectItem>
              <SelectItem value="pending">Discharge Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Discharge Planning Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patients for Discharge</CardTitle>
          <CardDescription>
            Showing {filteredPatients.length} of {dischargePatients.length} patients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Room/Bed</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Discharge Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={patient.image} alt={patient.name} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.id} • {patient.age}y • {patient.gender}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{patient.room}</p>
                      <p className="text-sm text-muted-foreground">{patient.bed}</p>
                    </div>
                  </TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.doctor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(patient.dischargeDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {patient.estimatedTime}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>{getPriorityBadge(patient.priority)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Summary
                      </Button>
                      <Button size="sm">
                        <Home className="h-4 w-4 mr-1" />
                        Discharge
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPatients.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No patients found</h3>
              <p className="text-muted-foreground">
                No patients match your current search criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}