"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Edit, Send, Receipt } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const sampleQuotations = [
  {
    id: "sample-quotation-1",
    quotationNumber: "DRC-QUO-001",
    patient: {
      name: "Sample Patient",
      image: "/user-3.png",
      id: "sample-patient-1",
      phone: "+91 98765 43210",
      email: "patient@example.com"
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
      { id: 1, description: "Physical Therapist Consultation", quantity: 1, unitPrice: 500.0, amount: 500.0 },
      { id: 2, description: "Back Pain Treatment", quantity: 2, unitPrice: 600.0, amount: 1200.0 },
      { id: 3, description: "Wellness Check-up Package", quantity: 1, unitPrice: 500.0, amount: 500.0 }
    ],
    subtotal: 2200.0,
    discount: 600.0,
    total: 1600.0,
    notes: "Follow-up required after initial treatment sessions.",
    terms: "This quotation is valid for 30 days from the date of issue."
  },
];

export default function QuotationDetailPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [quotation, setQuotation] = useState<any>(null);
  const params = useParams();
  const quotationId = params.id;

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    }

    // Find quotation by ID
    const foundQuotation = sampleQuotations.find(q => q.id === quotationId);
    setQuotation(foundQuotation);
  }, [quotationId]);

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

  if (!quotation) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/billing/quotations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Quotation Not Found</h1>
            <p className="text-muted-foreground">The requested quotation could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/billing/quotations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{quotation.quotationNumber}</h1>
            <p className="text-muted-foreground">Quotation Details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(quotation.status)}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={quotation.patient.image} alt={quotation.patient.name} />
                  <AvatarFallback>{quotation.patient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">{quotation.patient.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {quotation.patient.id}</p>
                  <p className="text-sm text-muted-foreground">{quotation.patient.phone}</p>
                  <p className="text-sm text-muted-foreground">{quotation.patient.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services & Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotation.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>₹{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">₹{item.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{quotation.subtotal.toFixed(2)}</span>
                </div>
                {quotation.discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount:</span>
                    <span>-₹{quotation.discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>₹{quotation.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {quotation.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{quotation.notes}</p>
              </CardContent>
            </Card>
          )}

          {quotation.terms && (
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{quotation.terms}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quotation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Created Date</p>
                <p className="text-sm text-muted-foreground">{new Date(quotation.createdDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Valid Until</p>
                <p className="text-sm text-muted-foreground">{new Date(quotation.validUntil).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Created By</p>
                <p className="text-sm text-muted-foreground">{quotation.doctor.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <div className="mt-1">{getStatusBadge(quotation.status)}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quotation.status === "Draft" && (
                <>
                  <Button asChild className="w-full">
                    <Link href={`/billing/quotations/${quotation.id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Quotation
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send to Patient
                  </Button>
                </>
              )}
              
              {quotation.status === "Accepted" && (
                <Button asChild className="w-full">
                  <Link href={`/billing/quotations/${quotation.id}/convert`}>
                    <Receipt className="h-4 w-4 mr-2" />
                    Convert to Invoice
                  </Link>
                </Button>
              )}

              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}