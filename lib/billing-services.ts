// Billing Services - Firebase CRUD operations for DakshinRehab
// Contains service functions for all billing-related Firebase operations

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp,
  writeBatch,
  increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  Patient,
  Service,
  Quotation,
  Invoice,
  Payment,
  InsuranceClaim,
  PaymentPlan,
  BillingSummary,
  BillingEntityType,
  NumberSequence,
  GSTBreakdown
} from './billing-types';

// Collection references
const COLLECTIONS = {
  patients: 'patients',
  services: 'services',
  quotations: 'quotations',
  invoices: 'invoices',
  payments: 'payments',
  insuranceClaims: 'insurance-claims',
  paymentPlans: 'payment-plans',
  numberSequences: 'number-sequences'
} as const;

// Utility function to convert Firestore timestamps
const convertTimestamp = (data: any) => {
  const converted = { ...data };
  Object.keys(converted).forEach(key => {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate();
    }
  });
  return converted;
};

// Number sequence management
export async function getNextNumber(entityType: BillingEntityType): Promise<string> {
  const prefixMap = {
    quotation: 'DRC-QUO',
    invoice: 'DRC-INV',
    payment: 'DRC-PMT',
    claim: 'DRC-CLM'
  };

  const sequenceRef = doc(db, COLLECTIONS.numberSequences, entityType);
  
  try {
    const sequenceDoc = await getDoc(sequenceRef);
    
    if (!sequenceDoc.exists()) {
      // Create initial sequence
      const initialSequence: NumberSequence = {
        entityType,
        prefix: prefixMap[entityType],
        currentNumber: 1,
        lastUpdated: new Date()
      };
      await updateDoc(sequenceRef, initialSequence as any);
      return `${prefixMap[entityType]}-001`;
    }

    const data = sequenceDoc.data() as NumberSequence;
    const nextNumber = data.currentNumber + 1;
    
    // Update sequence
    await updateDoc(sequenceRef, {
      currentNumber: nextNumber,
      lastUpdated: new Date()
    });

    return `${prefixMap[entityType]}-${nextNumber.toString().padStart(3, '0')}`;
  } catch (error) {
    console.error('Error generating number sequence:', error);
    throw new Error('Failed to generate document number');
  }
}

// GST Calculation Utility
export function calculateGST(amount: number, gstRate: number, isInterState = false): GSTBreakdown {
  const gstAmount = (amount * gstRate) / 100;
  
  if (isInterState) {
    return {
      cgst: 0,
      sgst: 0,
      igst: gstAmount,
      totalGst: gstAmount,
      isInterState: true
    };
  } else {
    return {
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
      igst: 0,
      totalGst: gstAmount,
      isInterState: false
    };
  }
}

// ==================== SERVICE OPERATIONS ====================

export async function createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const serviceData = {
      ...service,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, COLLECTIONS.services), serviceData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating service:', error);
    throw new Error('Failed to create service');
  }
}

export async function getServices(isActive = true): Promise<Service[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.services),
      where('isActive', '==', isActive),
      orderBy('category'),
      orderBy('name')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamp(doc.data())
    })) as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function updateService(serviceId: string, updates: Partial<Service>): Promise<void> {
  try {
    const serviceRef = doc(db, COLLECTIONS.services, serviceId);
    await updateDoc(serviceRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating service:', error);
    throw new Error('Failed to update service');
  }
}

// ==================== QUOTATION OPERATIONS ====================

export async function createQuotation(quotation: Omit<Quotation, 'id' | 'quotationNumber' | 'createdDate' | 'updatedAt'>): Promise<string> {
  try {
    const quotationNumber = await getNextNumber('quotation');
    
    const quotationData = {
      ...quotation,
      quotationNumber,
      createdDate: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, COLLECTIONS.quotations), quotationData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating quotation:', error);
    throw new Error('Failed to create quotation');
  }
}

export async function getQuotations(doctorId?: string): Promise<Quotation[]> {
  try {
    let q = query(
      collection(db, COLLECTIONS.quotations),
      orderBy('createdDate', 'desc')
    );

    if (doctorId) {
      q = query(
        collection(db, COLLECTIONS.quotations),
        where('doctorId', '==', doctorId),
        orderBy('createdDate', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamp(doc.data())
    })) as Quotation[];
  } catch (error) {
    console.error('Error fetching quotations:', error);
    return [];
  }
}

export async function getQuotationById(quotationId: string): Promise<Quotation | null> {
  try {
    const docRef = doc(db, COLLECTIONS.quotations, quotationId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...convertTimestamp(docSnap.data())
    } as Quotation;
  } catch (error) {
    console.error('Error fetching quotation:', error);
    return null;
  }
}

export async function updateQuotation(quotationId: string, updates: Partial<Quotation>): Promise<void> {
  try {
    const quotationRef = doc(db, COLLECTIONS.quotations, quotationId);
    await updateDoc(quotationRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating quotation:', error);
    throw new Error('Failed to update quotation');
  }
}

// Convert quotation to invoice
export async function convertQuotationToInvoice(quotationId: string): Promise<string> {
  try {
    const quotation = await getQuotationById(quotationId);
    if (!quotation) {
      throw new Error('Quotation not found');
    }

    if (quotation.status !== 'Accepted') {
      throw new Error('Only accepted quotations can be converted to invoices');
    }

    const invoiceNumber = await getNextNumber('invoice');
    
    const invoiceData: Omit<Invoice, 'id'> = {
      invoiceNumber,
      patientId: quotation.patientId,
      patientName: quotation.patientName,
      doctorId: quotation.doctorId,
      doctorName: quotation.doctorName,
      quotationId: quotation.id,
      items: quotation.items.map(item => ({
        id: item.id,
        serviceId: item.serviceId,
        serviceName: item.serviceName,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        hsnCode: item.hsnCode,
        gstRate: item.gstRate,
        total: item.total,
        gstAmount: item.gstAmount
      })),
      subtotal: quotation.subtotal,
      cgst: quotation.cgst,
      sgst: quotation.sgst,
      igst: quotation.igst,
      totalGst: quotation.totalGst,
      totalAmount: quotation.totalAmount,
      paidAmount: 0,
      balanceAmount: quotation.totalAmount,
      status: 'Draft',
      invoiceDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      notes: quotation.notes,
      terms: quotation.terms,
      createdBy: quotation.createdBy,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Use batch to update quotation and create invoice atomically
    const batch = writeBatch(db);
    
    // Create invoice
    const invoiceRef = doc(collection(db, COLLECTIONS.invoices));
    batch.set(invoiceRef, invoiceData);
    
    // Update quotation status
    const quotationRef = doc(db, COLLECTIONS.quotations, quotationId);
    batch.update(quotationRef, {
      status: 'Converted',
      convertedToInvoiceId: invoiceRef.id,
      updatedAt: new Date()
    });

    await batch.commit();
    return invoiceRef.id;
  } catch (error) {
    console.error('Error converting quotation to invoice:', error);
    throw new Error('Failed to convert quotation to invoice');
  }
}

// ==================== INVOICE OPERATIONS ====================

export async function createInvoice(invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const invoiceNumber = await getNextNumber('invoice');
    
    const invoiceData = {
      ...invoice,
      invoiceNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, COLLECTIONS.invoices), invoiceData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw new Error('Failed to create invoice');
  }
}

export async function getInvoices(doctorId?: string): Promise<Invoice[]> {
  try {
    let q = query(
      collection(db, COLLECTIONS.invoices),
      orderBy('invoiceDate', 'desc')
    );

    if (doctorId) {
      q = query(
        collection(db, COLLECTIONS.invoices),
        where('doctorId', '==', doctorId),
        orderBy('invoiceDate', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamp(doc.data())
    })) as Invoice[];
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
}

export async function getInvoiceById(invoiceId: string): Promise<Invoice | null> {
  try {
    const docRef = doc(db, COLLECTIONS.invoices, invoiceId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...convertTimestamp(docSnap.data())
    } as Invoice;
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return null;
  }
}

// ==================== PAYMENT OPERATIONS ====================

export async function createPayment(payment: Omit<Payment, 'id' | 'paymentNumber' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const paymentNumber = await getNextNumber('payment');
    
    // Start batch transaction
    const batch = writeBatch(db);
    
    // Create payment
    const paymentRef = doc(collection(db, COLLECTIONS.payments));
    const paymentData = {
      ...payment,
      paymentNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    batch.set(paymentRef, paymentData);
    
    // Update invoice paid amount and status
    const invoiceRef = doc(db, COLLECTIONS.invoices, payment.invoiceId);
    batch.update(invoiceRef, {
      paidAmount: increment(payment.amount),
      balanceAmount: increment(-payment.amount),
      updatedAt: new Date()
    });
    
    await batch.commit();
    return paymentRef.id;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw new Error('Failed to create payment');
  }
}

export async function getPayments(invoiceId?: string): Promise<Payment[]> {
  try {
    let q = query(
      collection(db, COLLECTIONS.payments),
      orderBy('paymentDate', 'desc')
    );

    if (invoiceId) {
      q = query(
        collection(db, COLLECTIONS.payments),
        where('invoiceId', '==', invoiceId),
        orderBy('paymentDate', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamp(doc.data())
    })) as Payment[];
  } catch (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
}

// ==================== INSURANCE CLAIM OPERATIONS ====================

export async function createInsuranceClaim(claim: Omit<InsuranceClaim, 'id' | 'claimNumber' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const claimNumber = await getNextNumber('claim');
    
    const claimData = {
      ...claim,
      claimNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, COLLECTIONS.insuranceClaims), claimData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating insurance claim:', error);
    throw new Error('Failed to create insurance claim');
  }
}

export async function getInsuranceClaims(): Promise<InsuranceClaim[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.insuranceClaims),
      orderBy('submittedDate', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamp(doc.data())
    })) as InsuranceClaim[];
  } catch (error) {
    console.error('Error fetching insurance claims:', error);
    return [];
  }
}

// ==================== PATIENT OPERATIONS ====================

export async function getPatients(): Promise<Patient[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.patients),
      orderBy('name')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamp(doc.data())
    })) as Patient[];
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
}

// ==================== BILLING SUMMARY & ANALYTICS ====================

export async function getBillingSummary(doctorId?: string): Promise<BillingSummary> {
  try {
    const defaultSummary: BillingSummary = {
      totalRevenue: 0,
      pendingAmount: 0,
      paidAmount: 0,
      overdueAmount: 0,
      totalInvoices: 0,
      paidInvoices: 0,
      pendingInvoices: 0,
      overdueInvoices: 0,
      totalQuotations: 0,
      acceptedQuotations: 0,
      expiredQuotations: 0,
      conversionRate: 0
    };

    // Get invoices
    let invoiceQuery = collection(db, COLLECTIONS.invoices);
    if (doctorId) {
      invoiceQuery = query(collection(db, COLLECTIONS.invoices), where('doctorId', '==', doctorId));
    }
    
    const invoiceSnapshot = await getDocs(invoiceQuery);
    const invoices = invoiceSnapshot.docs.map(doc => convertTimestamp(doc.data())) as Invoice[];
    
    // Calculate invoice stats
    defaultSummary.totalInvoices = invoices.length;
    defaultSummary.totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    defaultSummary.paidAmount = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    defaultSummary.pendingAmount = invoices.reduce((sum, inv) => sum + inv.balanceAmount, 0);
    
    invoices.forEach(invoice => {
      if (invoice.status === 'Paid') defaultSummary.paidInvoices++;
      else if (invoice.status === 'Overdue') {
        defaultSummary.overdueInvoices++;
        defaultSummary.overdueAmount += invoice.balanceAmount;
      } else {
        defaultSummary.pendingInvoices++;
      }
    });

    // Get quotations
    let quotationQuery = collection(db, COLLECTIONS.quotations);
    if (doctorId) {
      quotationQuery = query(collection(db, COLLECTIONS.quotations), where('doctorId', '==', doctorId));
    }
    
    const quotationSnapshot = await getDocs(quotationQuery);
    const quotations = quotationSnapshot.docs.map(doc => convertTimestamp(doc.data())) as Quotation[];
    
    defaultSummary.totalQuotations = quotations.length;
    defaultSummary.acceptedQuotations = quotations.filter(q => q.status === 'Accepted' || q.status === 'Converted').length;
    defaultSummary.expiredQuotations = quotations.filter(q => q.status === 'Expired').length;
    defaultSummary.conversionRate = defaultSummary.totalQuotations > 0 
      ? (defaultSummary.acceptedQuotations / defaultSummary.totalQuotations) * 100 
      : 0;

    return defaultSummary;
  } catch (error) {
    console.error('Error calculating billing summary:', error);
    throw new Error('Failed to calculate billing summary');
  }
}