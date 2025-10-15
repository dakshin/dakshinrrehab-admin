"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDoctorDataFilter, SAMPLE_PATIENTS, SAMPLE_APPOINTMENTS } from '@/lib/doctor-data-filter';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye } from 'lucide-react';

// Higher-order component to provide data isolation for all pages
export function withDataIsolation<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  dataTypes: ('patients' | 'appointments' | 'prescriptions' | 'certificates')[] = []
) {
  return function DataIsolatedComponent(props: P) {
    const { filter, filterPatients, filterAppointments } = useDoctorDataFilter();
    const [isolatedData, setIsolatedData] = useState<any>({});
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
      // Get current user data
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        
        // Apply data filtering based on user role
        const data: any = {};
        
        if (dataTypes.includes('patients')) {
          data.patients = filterPatients(SAMPLE_PATIENTS);
        }
        
        if (dataTypes.includes('appointments')) {
          data.appointments = filterAppointments(SAMPLE_APPOINTMENTS);
        }
        
        // TODO: Add prescriptions and certificates filtering when sample data is available
        if (dataTypes.includes('prescriptions')) {
          data.prescriptions = []; // Will be filtered when sample data is added
        }
        
        if (dataTypes.includes('certificates')) {
          data.certificates = []; // Will be filtered when sample data is added
        }
        
        setIsolatedData(data);
      }
    }, [filterPatients, filterAppointments]);

    // Show privacy notice for doctors
    const showPrivacyNotice = currentUser?.role === 'doctor' && dataTypes.length > 0;

    return (
      <div className="space-y-4">
        {showPrivacyNotice && (
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-blue-800">
              <strong>🔒 Privacy Protected:</strong> You can only see data for your assigned patients. 
              {dataTypes.includes('patients') && ` Currently showing ${isolatedData.patients?.length || 0} of your patients.`}
              {dataTypes.includes('appointments') && ` Currently showing ${isolatedData.appointments?.length || 0} of your appointments.`}
            </AlertDescription>
          </Alert>
        )}
        
        <WrappedComponent {...props} isolatedData={isolatedData} currentUser={currentUser} />
      </div>
    );
  };
}

// Hook to use isolated data in components
export function useIsolatedData() {
  const { filter, filterPatients, filterAppointments, filterPrescriptions, filterMedicalCertificates } = useDoctorDataFilter();
  
  // Memoize the filter functions to prevent infinite re-renders
  const getFilteredPatients = useCallback(() => filterPatients(SAMPLE_PATIENTS), [filterPatients]);
  const getFilteredAppointments = useCallback(() => filterAppointments(SAMPLE_APPOINTMENTS), [filterAppointments]);
  const getFilteredPrescriptions = useCallback(() => filterPrescriptions([]), [filterPrescriptions]); // TODO: Add sample prescription data
  const getFilteredCertificates = useCallback(() => filterMedicalCertificates([]), [filterMedicalCertificates]); // TODO: Add sample certificate data
  
  const canAccessData = useCallback((dataType: string, ownerId: string) => {
    if (!filter) return false;
    
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const doctorId = userData.email?.split('@')[0] || '';
    
    // SuperAdmin and Admin can access all data
    if (['superadmin', 'admin'].includes(userData.role)) return true;
    
    // Front desk can access all for billing/registration
    if (userData.role === 'frontdesk_staff') return true;
    
    // Doctors can only access their own data
    if (userData.role === 'doctor') return ownerId === doctorId;
    
    return false;
  }, [filter]);
  
  // Return memoized object to prevent recreation on every render
  return useMemo(() => ({
    getFilteredPatients,
    getFilteredAppointments,
    getFilteredPrescriptions,
    getFilteredCertificates,
    canAccessData
  }), [getFilteredPatients, getFilteredAppointments, getFilteredPrescriptions, getFilteredCertificates, canAccessData]);
}
