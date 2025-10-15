# DakshinRehab Dashboard Components - Development PRD

## Project Overview
**System:** DakshinRehab Administration Dashboard  
**Focus:** Core Components Development for Physiotherapy Clinic Management  
**Priority:** Dashboard Components, Appointment System, Service Management  

---

## 1. Core Dashboard Components

### 1.1 Services & Specialties Management
**Priority: HIGH**

#### 1.1.1 Specialty Categories
```typescript
interface Specialty {
  id: string;
  name: string;
  reasons: string[];
  timeSlots: TimeSlot[];
  active: boolean;
}
```

**Physiotherapy**
- **Reasons:** Back Pain, Knee Pain, Sciatica, Post-Surgery Rehab, Frozen Shoulder, ACL Injury, Stroke Rehab, Plantar Fasciitis
- **Time Slots:** 09:00–09:45, 10:00–10:45, 11:00–11:45, 12:00–12:45, 03:30–04:15, 04:30–05:15, 06:00–06:45, 07:00–07:45

**Prosthetics & Orthotics**
- **Reasons:** Amputee Rehab, Limb Fitting, Prosthetic Adjustment
- **Time Slots:** 10:00–10:45, 11:00–11:45, 12:00–12:45, 04:30–05:15, 06:00–06:45

**Pediatrician**
- **Reasons:** Well Baby Check, Vaccination
- **Time Slots:** 04:30–05:30

**Vascular**
- **Reasons:** Consultation Required
- **Time Slots:** 06:00–06:45, 07:00–07:45

**Wellness**
- **Reasons:** InBody Analysis, Muscle Strength Test, Foot Scan, Gait Analysis, Clinical Pilates, Infrared Sauna, Body Assessment
- **Time Slots:** 09:00–09:45, 10:00–10:45, 11:00–11:45, 12:00–12:45, 03:30–04:15, 04:30–05:15, 06:00–06:45, 07:00–07:45

#### 1.1.2 Service Management Dashboard Component
```typescript
// components/services/service-manager.tsx
interface ServiceManagerProps {
  specialties: Specialty[];
  onUpdateService: (specialty: Specialty) => void;
  onToggleService: (id: string) => void;
}
```

**Features:**
- Add/Edit specialty services
- Manage consultation reasons
- Configure time slots per specialty
- Toggle service availability
- Bulk operations for time slots

---

## 2. Appointment Management System

### 2.1 Appointment Form Component
**Priority: HIGH**

#### 2.1.1 Form Field Configuration
```typescript
interface AppointmentFormData {
  fullName: string;        // Required
  age: number;            // Required
  sex: 'Male' | 'Female' | 'Other';  // Required
  phoneNumber: string;    // Required
  emailAddress?: string;  // Optional
  medicalHistory?: string; // Optional
  specialty: string;      // Required - Controls reason & time slots
  reasonForConsultation: string; // Auto-populated based on specialty
  preferredDate: Date;    // Required - Disable past dates
  preferredTime: string;  // Auto-populated based on specialty
  additionalInformation?: string; // Optional
}
```

#### 2.1.2 Dynamic Form Logic
```typescript
// components/appointments/appointment-form.tsx
const AppointmentForm = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [availableReasons, setAvailableReasons] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  
  // Auto-populate reasons and time slots based on specialty selection
  const handleSpecialtyChange = (specialty: string) => {
    const specialtyConfig = getSpecialtyConfig(specialty);
    setAvailableReasons(specialtyConfig.reasons);
    setAvailableTimeSlots(specialtyConfig.timeSlots);
  };
};
```

### 2.2 Appointment Calendar Component
**Priority: HIGH**

#### 2.2.1 Calendar View Features
- **Daily View:** Show appointments by time slots
- **Weekly View:** Multi-doctor scheduling
- **Monthly View:** Availability overview
- **Specialty Filtering:** Filter by service type
- **Time Slot Management:** Real-time availability

#### 2.2.2 Appointment Status Management
```typescript
enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RESCHEDULED = 'rescheduled'
}
```

---

## 3. Doctor Management Dashboard

### 3.1 Doctor Profile Component
**Priority: MEDIUM**

#### 3.1.1 Doctor Data Structure
```typescript
interface Doctor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  workingHours: WorkingHours;
  consultationRates: ConsultationRate[];
  experience: number;
  qualifications: string[];
  avatar?: string;
  isActive: boolean;
}

interface WorkingHours {
  [key: string]: { // day of week
    morning: { start: string; end: string; };
    evening: { start: string; end: string; };
    isWorking: boolean;
  };
}
```

#### 3.1.2 DakshinRehab Medical Staff
```typescript
const DAKSHIN_REHAB_DOCTORS = [
  {
    name: "Dr. Swapna Gandhi",
    title: "Physical Therapist",
    experience: 20,
    specialties: ["Physiotherapy", "Sports Injuries", "Wellness"],
    workingHours: {
      morning: "09:00-13:30",
      evening: "17:00-20:00"
    }
  },
  {
    name: "Mohan Gandhi",
    title: "Founder, Prosthetist & Orthotist",
    experience: 25,
    specialties: ["Prosthetics & Orthotics", "Limb Fitting"],
    workingHours: {
      morning: "09:00-13:30",
      evening: "17:00-20:00"
    }
  },
  {
    name: "Dr. Bhavin Ram",
    title: "Vascular Surgeon",
    specialties: ["Vascular Surgery", "Consultation"],
    workingHours: {
      evening: "18:00-20:00"
    }
  },
  {
    name: "Dr. Sujith Omkaram",
    title: "Paediatric Orthopaedician",
    specialties: ["Pediatric Care", "Orthopedics"],
    workingHours: {
      evening: "18:00-20:00"
    }
  },
  {
    name: "Tanisha Mohanty, BPT",
    title: "Physiotherapist",
    specialties: ["Physiotherapy", "Rehabilitation"],
    workingHours: {
      // To be configured
    }
  }
];
```

### 3.2 Doctor Schedule Management
**Priority: MEDIUM**

#### 3.2.1 Schedule Configuration Component
- Weekly schedule setup
- Holiday management
- Time slot customization per doctor
- Specialty-specific scheduling
- Break time management

---

## 4. Treatment Modalities Dashboard

### 4.1 Modality Management Component
**Priority: MEDIUM**

#### 4.1.1 Treatment Categories
```typescript
interface TreatmentModality {
  id: string;
  category: 'physiotherapy' | 'prosthetics' | 'wellness' | 'assessment';
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  equipmentRequired?: string[];
  isActive: boolean;
}
```

**Physiotherapy Modalities:**
- Electro Magnetic Therapy
- Spine Decompression/Traction
- Tecar Therapy
- Shockwave Therapy
- ACL/TKR Rehab
- Ultrasound/IFT/TENS
- Dry Needling/Cupping
- Infrared Sauna

**Assessment Modalities:**
- Posture/Gait Analysis
- Functional Movement Assessment
- InBody Analysis
- Muscle Strength Testing

**Prosthetics & Orthotics:**
- Bionic Hand Fitting
- Prosthetic Leg Adjustment
- Orthotic Insole Casting
- Fracture Bracing

### 4.2 Equipment Management
**Priority: LOW**

#### 4.2.1 Equipment Tracking
- Equipment availability
- Maintenance schedules
- Usage tracking
- Room allocation

---

## 5. Dashboard Analytics Components

### 5.1 Key Performance Indicators (KPIs)
**Priority: MEDIUM**

#### 5.1.1 Clinic Metrics Dashboard
```typescript
interface ClinicMetrics {
  dailyAppointments: number;
  weeklyRevenue: number;
  patientSatisfaction: number;
  equipmentUtilization: number;
  doctorAvailability: number;
  packageSales: PackageSale[];
}
```

**Metrics to Track:**
- Appointments by specialty
- Revenue by service type
- Patient demographics
- Popular time slots
- Treatment outcomes
- Equipment utilization rates

### 5.2 Reporting Components
**Priority: LOW**

#### 5.2.1 Report Types
- Daily appointment summary
- Weekly revenue reports
- Monthly patient analytics
- Service popularity reports
- Doctor performance metrics

---

## 6. Component Architecture

### 6.1 Shared Components
**Priority: HIGH**

#### 6.1.1 Form Components
```typescript
// components/ui/specialty-selector.tsx
// components/ui/time-slot-picker.tsx
// components/ui/date-picker-with-restrictions.tsx
// components/ui/consultation-reason-selector.tsx
```

#### 6.1.2 Data Display Components
```typescript
// components/ui/appointment-card.tsx
// components/ui/doctor-card.tsx
// components/ui/service-card.tsx
// components/ui/patient-summary.tsx
```

### 6.2 Page-Level Components
```typescript
// components/dashboard/appointments-dashboard.tsx
// components/dashboard/services-dashboard.tsx
// components/dashboard/doctors-dashboard.tsx
// components/dashboard/analytics-dashboard.tsx
```

---

## 7. Data Models & State Management

### 7.1 Core Data Structures
```typescript
// types/appointment.ts
// types/doctor.ts
// types/service.ts
// types/patient.ts
// types/analytics.ts
```

### 7.2 State Management Strategy
- **Form State:** React Hook Form + Zod validation
- **Global State:** React Context or Zustand
- **Server State:** TanStack Query (React Query)
- **Local Storage:** Persist user preferences

---

## 8. Implementation Priority

### Phase 1 (Week 1-2): Core Components
1. ✅ Appointment form with dynamic specialty logic
2. ✅ Service/specialty management component
3. ✅ Basic doctor profile display
4. ✅ Time slot management system

### Phase 2 (Week 3-4): Enhanced Features
1. 🔄 Calendar integration
2. 🔄 Advanced appointment management
3. 🔄 Treatment modality tracking
4. 🔄 Basic analytics dashboard

### Phase 3 (Week 5-6): Advanced Features
1. 📅 Equipment management
2. 📅 Comprehensive reporting
3. 📅 Performance metrics
4. 📅 Integration with external systems

---

## 9. Technical Requirements

### 9.1 Form Validation Rules
```typescript
const appointmentSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(1).max(120),
  sex: z.enum(["Male", "Female", "Other"]),
  phoneNumber: z.string().regex(/^\+?[\d\s-()]{10,}$/, "Invalid phone format"),
  emailAddress: z.string().email().optional().or(z.literal("")),
  specialty: z.string().min(1, "Please select a specialty"),
  reasonForConsultation: z.string().min(1, "Please select a reason"),
  preferredDate: z.date().min(new Date(), "Date cannot be in the past"),
  preferredTime: z.string().min(1, "Please select a time slot"),
  medicalHistory: z.string().optional(),
  additionalInformation: z.string().optional()
});
```

### 9.2 API Endpoints Structure
```typescript
// /api/appointments
// /api/doctors
// /api/services
// /api/specialties
// /api/time-slots
// /api/analytics
```

---

## 10. Success Criteria

### 10.1 Functional Requirements
- ✅ Dynamic appointment form with specialty-based logic
- ✅ Real-time time slot availability
- ✅ Comprehensive service management
- ✅ Doctor schedule coordination
- ✅ Treatment modality tracking

### 10.2 Performance Requirements
- Form submission < 2 seconds
- Calendar loading < 1 second
- Real-time availability updates
- Mobile-responsive design
- Offline capability for critical functions

---

**Document Version:** 2.0 - Dashboard Components Focus  
**Last Updated:** October 15, 2024  
**Implementation Status:** Planning Phase  
**Next Milestone:** Core Components Development