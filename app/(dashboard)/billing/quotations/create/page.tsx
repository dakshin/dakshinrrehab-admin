"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateQuotationPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/billing/quotations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create Quotation</h1>
          <p className="text-muted-foreground">Create a new quotation for your patient.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quotation Creation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center p-8 text-muted-foreground">
            Quotation creation form will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}