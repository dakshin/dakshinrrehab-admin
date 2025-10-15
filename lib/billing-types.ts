// Billing System Data Types for DakshinRehab
// Contains TypeScript interfaces for all billing-related entities

export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone: string;
  dateOfBirth: Date;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  insurance?: InsuranceInfo;
  assignedDoctorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  coverageType: 'PPO' | 'HMO' | 'EPO' | 'POS';
  validUntil?: Date;
  coverageAmount?: number;
}

export interface Service {
  id: string;
  name: string;
  category: 'Consultation' | 'Physiotherapy' | 'Prosthetics' | 'Orthotics' | 'Mobility Aid' | 'Medical Device' | 'Medical Equipment' | 'Medical Supply' | 'Wellness';
  price: number;
  hsnCode: string;
  gstRate: number; // 0, 5, 12, 18, 28
  description?: string;
  isActive: boolean;
  doctorId?: string; // If service is doctor-specific
  createdAt: Date;
  updatedAt: Date;
}

export interface QuotationItem {
  id: string;
  serviceId: string;
  serviceName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  hsnCode: string;
  gstRate: number;
  total: number; // quantity * unitPrice
  gstAmount: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string; // DRC-QUO-001
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  items: QuotationItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalGst: number;
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Rejected' | 'Expired' | 'Converted';
  createdDate: Date;
  sentDate?: Date;
  validUntil: Date;
  acceptedDate?: Date;
  convertedToInvoiceId?: string;
  notes?: string;
  terms?: string;
  createdBy: string;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  serviceId: string;
  serviceName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  hsnCode: string;
  gstRate: number;
  total: number;
  gstAmount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // DRC-INV-001
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  quotationId?: string; // If converted from quotation
  items: InvoiceItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalGst: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Partially Paid' | 'Overdue' | 'Cancelled';
  invoiceDate: Date;
  dueDate: Date;
  paidDate?: Date;
  paymentMethod?: PaymentMethod;
  notes?: string;
  terms?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentMethod = 
  | 'Cash' 
  | 'Credit Card' 
  | 'Debit Card' 
  | 'UPI' 
  | 'Bank Transfer' 
  | 'Cheque' 
  | 'Insurance' 
  | 'Payment Plan';

export interface Payment {
  id: string;
  paymentNumber: string; // DRC-PMT-001
  invoiceId: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  amount: number;
  method: PaymentMethod;
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  paymentDate: Date;
  transactionId?: string;
  cardType?: 'Visa' | 'Mastercard' | 'RuPay' | 'American Express';
  cardLast4?: string;
  upiId?: string;
  chequeNumber?: string;
  bankName?: string;
  receiptNumber?: string;
  failureReason?: string;
  refundAmount?: number;
  refundDate?: Date;
  notes?: string;
  processedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsuranceClaim {
  id: string;
  claimNumber: string; // DRC-CLM-001
  invoiceId: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  provider: string;
  policyNumber: string;
  submittedAmount: number;
  approvedAmount?: number;
  status: 'Draft' | 'Submitted' | 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Paid';
  claimType: 'Medical' | 'Dental' | 'Vision' | 'Prosthetic' | 'Physiotherapy';
  submittedDate?: Date;
  reviewDate?: Date;
  approvedDate?: Date;
  paidDate?: Date;
  rejectionReason?: string;
  notes?: string;
  documents?: string[]; // URLs to uploaded documents
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentPlan {
  id: string;
  planNumber: string; // DRC-PLAN-001
  invoiceId: string;
  patientId: string;
  totalAmount: number;
  installments: PaymentInstallment[];
  status: 'Active' | 'Completed' | 'Defaulted' | 'Cancelled';
  startDate: Date;
  endDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentInstallment {
  id: string;
  installmentNumber: number;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  paidAmount?: number;
  status: 'Pending' | 'Paid' | 'Overdue' | 'Partial';
  paymentId?: string;
}

// Summary interfaces for dashboards
export interface BillingSummary {
  totalRevenue: number;
  pendingAmount: number;
  paidAmount: number;
  overdueAmount: number;
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
  totalQuotations: number;
  acceptedQuotations: number;
  expiredQuotations: number;
  conversionRate: number; // quotations to invoices
}

// Filter interfaces for list pages
export interface InvoiceFilters {
  status?: Invoice['status'][];
  dateRange?: { from: Date; to: Date };
  amountRange?: { min: number; max: number };
  patientId?: string;
  doctorId?: string;
  paymentMethod?: PaymentMethod[];
}

export interface PaymentFilters {
  status?: Payment['status'][];
  method?: PaymentMethod[];
  dateRange?: { from: Date; to: Date };
  amountRange?: { min: number; max: number };
  patientId?: string;
}

export interface QuotationFilters {
  status?: Quotation['status'][];
  dateRange?: { from: Date; to: Date };
  validityRange?: { from: Date; to: Date };
  amountRange?: { min: number; max: number };
  patientId?: string;
  doctorId?: string;
}

export interface ClaimFilters {
  status?: InsuranceClaim['status'][];
  claimType?: InsuranceClaim['claimType'][];
  provider?: string[];
  dateRange?: { from: Date; to: Date };
  amountRange?: { min: number; max: number };
}

// Utility types
export type BillingEntityType = 'quotation' | 'invoice' | 'payment' | 'claim';

export interface NumberSequence {
  entityType: BillingEntityType;
  prefix: string; // DRC-QUO, DRC-INV, DRC-PMT, DRC-CLM
  currentNumber: number;
  lastUpdated: Date;
}

// GST calculation helpers
export interface GSTBreakdown {
  cgst: number;
  sgst: number;
  igst: number;
  totalGst: number;
  isInterState: boolean;
}

export interface GSTReport {
  period: { from: Date; to: Date };
  totalSales: number;
  taxableAmount: number;
  totalGst: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  gstBreakdown: { [rate: string]: { amount: number; gst: number } };
}