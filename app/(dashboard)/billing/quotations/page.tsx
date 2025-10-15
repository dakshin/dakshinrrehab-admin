"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download, 
  Eye, 
  FileText, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Receipt, 
  Search, 
  Send, 
  X,
  IndianRupee,
  Edit,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

// Sample quotations data for Firebase setup
const sampleQuotations = [
  {
    id: "sample-quotation-1",
    quotationNumber: "DRC-QUO-001",
    patient: {
      name: "Sample Patient",
      image: "/user-3.png",
      id: "sample-patient-1",
    },
    doctor: {
      name: "Dr. Swapna Gandhi",
      id: "doctor-1"
    },
    createdDate: "2024-01-15",
    validUntil: "2024-02-14",
    totalAmount: 1600.0,
    status: "Draft",
    items: [
      { description: "Physical Therapist Consultation", amount: 500.0 },
      { description: "Back Pain Treatment", amount: 600.0 },
      { description: "Wellness Check-up Package", amount: 500.0 }
    ],
  },
  {
    id: "sample-quotation-2", 
    quotationNumber: "DRC-QUO-002",
    patient: {
      name: "Sample Patient 2",
      image: "/user-3.png",
      id: "sample-patient-2",
    },
    doctor: {
      name: "Dr. Swapna Gandhi",
      id: "doctor-1"
    },
    createdDate: "2024-01-12",
    validUntil: "2024-02-11",
    totalAmount: 25500.0,
    status: "Sent",
    items: [
      { description: "Below Knee Prosthetic Limb", amount: 25000.0 },
      { description: "Consultation", amount: 500.0 }
    ],
  }
];

export default function QuotationsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    }
  }, []);

  // Check if user has access to quotations module
  const hasQuotationAccess = () => {
    if (!currentUser) return false;
    const allowedRoles = ['frontdesk_staff', 'admin', 'superadmin'];
    return allowedRoles.includes(currentUser.role);
  };

  // Show access denied for unauthorized users
  if (currentUser && !hasQuotationAccess()) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/billing">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Billing</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access quotations.</p>
          </div>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-red-100 p-3 mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quotations Module Access Restricted</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              This module is only available for Front Desk Staff, Admin, and Super Admin users. 
              Your current role ({currentUser.role}) doesn't have access to quotations.
            </p>
            <Button variant="outline" asChild>
              <Link href="/billing">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Billing
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter quotations based on current user role and filters
  const getFilteredQuotations = () => {
    let filtered = [...sampleQuotations];

    // Role-based filtering - staff can see all quotations
    // No additional filtering needed for staff, admin, superadmin

    // Filter by tab (status)
    if (activeTab !== "all") {
      const statusMap: Record<string, string> = {
        draft: "Draft",
        sent: "Sent", 
        accepted: "Accepted",
        expired: "Expired",
        converted: "Converted"
      };
      filtered = filtered.filter(quotation => quotation.status === statusMap[activeTab]);
    }

    // Filter by search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(quotation =>
        quotation.quotationNumber.toLowerCase().includes(searchLower) ||
        quotation.patient.name.toLowerCase().includes(searchLower) ||
        quotation.doctor.name.toLowerCase().includes(searchLower)
      );
    }

    // Sort quotations
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case "oldest":
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        case "amount-high":
          return b.totalAmount - a.totalAmount;
        case "amount-low":
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredQuotations = getFilteredQuotations();

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft":
        return <Badge variant="secondary">{status}</Badge>;
      case "Sent":
        return <Badge variant="outline">{status}</Badge>;
      case "Accepted":
        return <Badge variant="default" className="bg-green-600">{status}</Badge>;
      case "Rejected":
        return <Badge variant="destructive">{status}</Badge>;
      case "Expired":
        return <Badge variant="secondary" className="bg-orange-500">{status}</Badge>;
      case "Converted":
        return <Badge variant="default" className="bg-blue-600">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Calculate counts for tabs
  const statusCounts = {
    all: filteredQuotations.length,
    draft: sampleQuotations.filter(q => q.status === "Draft").length,
    sent: sampleQuotations.filter(q => q.status === "Sent").length, 
    accepted: sampleQuotations.filter(q => q.status === "Accepted").length,
    expired: sampleQuotations.filter(q => q.status === "Expired").length,
    converted: sampleQuotations.filter(q => q.status === "Converted").length,
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="outline" size="icon" asChild>
          <Link href="/billing">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Billing</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Quotations
          </h1>
          <p className="text-muted-foreground">
            Create and manage patient quotations.
          </p>
        </div>
      </div>


      {/* Action Bar */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search quotations..."
              className="pl-8 w-full md:w-[300px]"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px]" align="start">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort by</label>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="amount-high">Amount (High to Low)</SelectItem>
                      <SelectItem value="amount-low">Amount (Low to High)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Export</span>
          </Button>
          <Button asChild>
            <Link href="/billing/quotations/create">
              <Plus className="h-4 w-4 mr-2" />
              New Quotation
            </Link>
          </Button>
        </div>
      </div>

      {/* Quotations Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quotations</CardTitle>
              <CardDescription>
                Manage patient quotations and convert approved ones to invoices
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Status Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
              <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
              <TabsTrigger value="draft">Draft ({statusCounts.draft})</TabsTrigger>
              <TabsTrigger value="sent">Sent ({statusCounts.sent})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({statusCounts.accepted})</TabsTrigger>
              <TabsTrigger value="expired">Expired ({statusCounts.expired})</TabsTrigger>
              <TabsTrigger value="converted">Converted ({statusCounts.converted})</TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredQuotations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No quotations found</h3>
              <p className="text-muted-foreground mt-1 mb-4 max-w-md">
                {searchText || activeTab !== 'all' 
                  ? 'No quotations match your current filters. Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first quotation.'}
              </p>
              <Button asChild>
                <Link href="/billing/quotations/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quotation
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quotation</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotations.map((quotation) => (
                  <TableRow key={quotation.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{quotation.quotationNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {quotation.items.length} item{quotation.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={quotation.patient.image} alt={quotation.patient.name} />
                          <AvatarFallback>{quotation.patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{quotation.patient.name}</p>
                          <p className="text-sm text-muted-foreground">{quotation.patient.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{quotation.doctor.name}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{format(new Date(quotation.createdDate), 'MMM dd, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(quotation.createdDate), 'h:mm a')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{format(new Date(quotation.validUntil), 'MMM dd, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(quotation.validUntil) < new Date() 
                            ? 'Expired' 
                            : `${Math.ceil((new Date(quotation.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left`
                          }
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        <span className="font-medium">{quotation.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(quotation.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/billing/quotations/${quotation.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          {quotation.status === "Draft" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/billing/quotations/${quotation.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Quotation
                              </Link>
                            </DropdownMenuItem>
                          )}
                          {quotation.status === "Draft" && (
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Send to Patient
                            </DropdownMenuItem>
                          )}
                          {quotation.status === "Accepted" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/billing/quotations/${quotation.id}/convert`}>
                                <Receipt className="h-4 w-4 mr-2" />
                                Convert to Invoice
                              </Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}