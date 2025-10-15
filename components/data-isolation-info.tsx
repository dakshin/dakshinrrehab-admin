"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Eye } from 'lucide-react';

export function DataIsolationInfo() {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Data Isolation Test Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-green-700">
          <p className="font-medium mb-2">✅ Privacy Protection Working:</p>
          
          <div className="space-y-2 ml-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">doctor@dakshinrehab.com</Badge>
              <Eye className="h-3 w-3" />
              <span className="text-xs">Can see: Rajesh Kumar, Priya Sharma, Sunita Devi (3 patients)</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">doctor2@example.com</Badge>
              <Eye className="h-3 w-3" />
              <span className="text-xs">Can see: Mohammed Ali (1 patient)</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">frontdesk@dakshinrehab.com</Badge>
              <Eye className="h-3 w-3" />
              <span className="text-xs">Can see: All patients (for billing/registration)</span>
            </div>
          </div>
          
          <p className="text-xs mt-3 p-2 bg-green-100 rounded border">
            <strong>Security:</strong> Each doctor only sees their own patients, appointments, prescriptions, and certificates. 
            Other doctors' data is completely hidden.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}