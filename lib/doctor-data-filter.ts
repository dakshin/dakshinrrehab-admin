// Doctor Data Isolation System
// Ensures doctors can only access their own patients' data

import { useMemo, useCallback } from 'react';

export interface DoctorUser {
  uid: string;
  email: string;
  name: string;
  role: string;
  doctorId?: string; // Unique doctor identifier
  specialization?: string;
  department?: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  assignedDoctorId: string; // Which doctor this patient belongs to
  primaryDoctorId?: string;
  consultingDoctors?: string[]; // Other doctors who can view (for referrals)
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentRecord {
  id: string;
  patientId: string;
  doctorId: string; // Primary doctor for this appointment
  consultingDoctorId?: string; // If referred to another doctor
  appointmentDate: Date;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface PrescriptionRecord {
  id: string;
  patientId: string;
  doctorId: string; // Doctor who issued the prescription
  medications: any[];
  issuedDate: Date;
  validUntil: Date;
  status: 'active' | 'expired' | 'cancelled';
}

export interface MedicalCertificateRecord {
  id: string;
  patientId: string;
  doctorId: string; // Doctor who issued the certificate
  certificateType: 'fitness' | 'disability' | 'medical_leave';
  issuedDate: Date;
  validUntil?: Date;
  status: 'active' | 'expired' | 'revoked';
}

// Utility class to filter data based on doctor permissions
export class DoctorDataFilter {
  private currentDoctorId: string;
  private currentUserRole: string;

  constructor(doctorId: string, userRole: string) {
    this.currentDoctorId = doctorId;
    this.currentUserRole = userRole;
  }

  // Check if current user can access patient data
  canAccessPatient(patient: PatientRecord): boolean {
    // SuperAdmin and Admin can see all patients
    if (['superadmin', 'admin'].includes(this.currentUserRole)) {
      return true;
    }

    // Front desk staff can see all patients (for registration, billing)
    if (this.currentUserRole === 'frontdesk_staff') {
      return true;
    }

    // Doctors can only see their assigned patients
    if (this.currentUserRole === 'doctor') {
      return patient.assignedDoctorId === this.currentDoctorId || 
             patient.primaryDoctorId === this.currentDoctorId ||
             (patient.consultingDoctors && patient.consultingDoctors.includes(this.currentDoctorId));
    }

    return false;
  }

  // Filter patients list for current doctor
  filterPatients(patients: PatientRecord[]): PatientRecord[] {
    return patients.filter(patient => this.canAccessPatient(patient));
  }

  // Check if current user can access appointment
  canAccessAppointment(appointment: AppointmentRecord): boolean {
    if (['superadmin', 'admin', 'frontdesk_staff'].includes(this.currentUserRole)) {
      return true;
    }

    if (this.currentUserRole === 'doctor') {
      return appointment.doctorId === this.currentDoctorId || 
             appointment.consultingDoctorId === this.currentDoctorId;
    }

    return false;
  }

  // Filter appointments for current doctor
  filterAppointments(appointments: AppointmentRecord[]): AppointmentRecord[] {
    return appointments.filter(appointment => this.canAccessAppointment(appointment));
  }

  // Check if current user can access prescription
  canAccessPrescription(prescription: PrescriptionRecord): boolean {
    if (['superadmin', 'admin'].includes(this.currentUserRole)) {
      return true;
    }

    // Front desk can view for billing purposes
    if (this.currentUserRole === 'frontdesk_staff') {
      return true;
    }

    if (this.currentUserRole === 'doctor') {
      return prescription.doctorId === this.currentDoctorId;
    }

    return false;
  }

  // Filter prescriptions for current doctor
  filterPrescriptions(prescriptions: PrescriptionRecord[]): PrescriptionRecord[] {
    return prescriptions.filter(prescription => this.canAccessPrescription(prescription));
  }

  // Check if current user can access medical certificate
  canAccessMedicalCertificate(certificate: MedicalCertificateRecord): boolean {
    if (['superadmin', 'admin'].includes(this.currentUserRole)) {
      return true;
    }

    if (this.currentUserRole === 'doctor') {
      return certificate.doctorId === this.currentDoctorId;
    }

    return false;
  }

  // Filter medical certificates for current doctor
  filterMedicalCertificates(certificates: MedicalCertificateRecord[]): MedicalCertificateRecord[] {
    return certificates.filter(certificate => this.canAccessMedicalCertificate(certificate));
  }
}

// Helper function to get current doctor's data filter
export function getCurrentDoctorFilter(): DoctorDataFilter | null {
  try {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return null;

    const userData = JSON.parse(currentUser);
    
    // Create doctor ID based on email (in real app, this would be from database)
    const doctorId = userData.email.split('@')[0]; // e.g., "doctor" from "doctor@dakshinrehab.com"
    
    return new DoctorDataFilter(doctorId, userData.role);
  } catch (error) {
    console.error('Error creating doctor filter:', error);
    return null;
  }
}

// Sample data for Firebase collection structure setup
// Keep minimal entries to help create proper collection schemas

export const SAMPLE_PATIENTS: PatientRecord[] = [
  {
    id: 'sample-patient-1',
    name: 'Sample Patient',
    email: 'patient@example.com',
    phone: '+91 98765 43210',
    assignedDoctorId: 'doctor', // Assigned to logged-in doctor
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  }
];

export const SAMPLE_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'sample-appointment-1',
    patientId: 'sample-patient-1',
    doctorId: 'doctor',
    appointmentDate: new Date('2024-12-15T14:30:00'),
    status: 'scheduled',
    createdAt: new Date('2024-12-10')
  }
];

export const SAMPLE_PRESCRIPTIONS: PrescriptionRecord[] = [
  {
    id: 'sample-prescription-1',
    patientId: 'sample-patient-1',
    doctorId: 'doctor',
    medications: [{ name: 'Sample Medicine', dosage: '500mg', frequency: 'Twice daily' }],
    issuedDate: new Date('2024-01-15'),
    validUntil: new Date('2024-02-15'),
    status: 'active'
  }
];

export const SAMPLE_CERTIFICATES: MedicalCertificateRecord[] = [
  {
    id: 'sample-certificate-1',
    patientId: 'sample-patient-1',
    doctorId: 'doctor',
    certificateType: 'fitness',
    issuedDate: new Date('2024-01-15'),
    validUntil: new Date('2024-07-15'),
    status: 'active'
  }
];

// Hook to use doctor data filtering in components
export function useDoctorDataFilter() {
  // Memoize the filter to prevent recreation on every render
  const filter = useMemo(() => getCurrentDoctorFilter(), []);
  
  // Memoize filter functions to prevent infinite re-renders
  const filterPatients = useCallback(
    (patients: PatientRecord[]) => filter ? filter.filterPatients(patients) : [],
    [filter]
  );
  
  const filterAppointments = useCallback(
    (appointments: AppointmentRecord[]) => filter ? filter.filterAppointments(appointments) : [],
    [filter]
  );
  
  const filterPrescriptions = useCallback(
    (prescriptions: PrescriptionRecord[]) => filter ? filter.filterPrescriptions(prescriptions) : [],
    [filter]
  );
  
  const filterMedicalCertificates = useCallback(
    (certificates: MedicalCertificateRecord[]) => filter ? filter.filterMedicalCertificates(certificates) : [],
    [filter]
  );
  
  // Memoize sample data getters
  const getSamplePatients = useCallback(() => SAMPLE_PATIENTS, []);
  const getSampleAppointments = useCallback(() => SAMPLE_APPOINTMENTS, []);
  const getSamplePrescriptions = useCallback(() => SAMPLE_PRESCRIPTIONS, []);
  const getSampleCertificates = useCallback(() => SAMPLE_CERTIFICATES, []);
  
  return {
    filter,
    filterPatients,
    filterAppointments,
    filterPrescriptions,
    filterMedicalCertificates,
    // Sample data access for development
    getSamplePatients,
    getSampleAppointments,
    getSamplePrescriptions,
    getSampleCertificates
  };
}
