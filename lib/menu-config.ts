import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  Calendar, 
  Pill, 
  Receipt, 
  Building2, 
  Package, 
  UserCog, 
  FileText, 
  Bed, 
  Star, 
  MessageSquare, 
  BarChart3, 
  Settings,
  ShieldCheck,
  HelpCircle,
  Stethoscope
} from "lucide-react";
import type React from "react";

export interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: { title: string; href: string }[];
  roles: string[]; // Which roles can see this menu item
}

export const menuItems: MenuItem[] = [
  // Dashboard - All roles can see dashboard
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["superadmin", "admin", "doctor", "frontdesk_staff"]
  },

  // SuperAdmin Only
  {
    title: "User Management",
    href: "/settings/user-roles",
    icon: ShieldCheck,
    roles: ["superadmin"]
  },

  // Admin & SuperAdmin
  {
    title: "System Settings",
    href: "/settings",
    icon: Settings,
    submenu: [
      { title: "General Settings", href: "/settings" },
      { title: "User Roles", href: "/settings/user-roles" },
      { title: "System Configuration", href: "/settings/system" }
    ],
    roles: ["superadmin", "admin"]
  },

  // Doctors Management - Admin & SuperAdmin
  {
    title: "Doctors",
    href: "/doctors",
    icon: Users,
    submenu: [
      { title: "Doctors List", href: "/doctors" },
      { title: "Add Doctor", href: "/doctors/add" },
      { title: "Doctor Schedule", href: "/doctors/schedule" },
      { title: "Specializations", href: "/doctors/specializations" }
    ],
    roles: ["superadmin", "admin"]
  },

  // Patients - Doctor, Front Desk, Admin, SuperAdmin
  {
    title: "Patients",
    href: "/patients",
    icon: UserRound,
    submenu: [
      { title: "Patient List", href: "/patients" },
      { title: "Add Patient", href: "/patients/add" }
    ],
    roles: ["superadmin", "admin", "doctor", "frontdesk_staff"]
  },

  // Appointments - Doctor, Front Desk, Admin, SuperAdmin
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
    submenu: [
      { title: "All Appointments", href: "/appointments" },
      { title: "Book Appointment", href: "/appointments/add" },
      { title: "Calendar View", href: "/appointments/calendar" },
      { title: "Appointment Requests", href: "/appointments/requests" }
    ],
    roles: ["superadmin", "admin", "doctor", "frontdesk_staff"]
  },

  // Prescriptions - Doctor, Admin, SuperAdmin
  {
    title: "Prescriptions",
    href: "/prescriptions",
    icon: Pill,
    submenu: [
      { title: "All Prescriptions", href: "/prescriptions" },
      { title: "Create Prescription", href: "/prescriptions/create" },
      { title: "Medicine Templates", href: "/prescriptions/templates" }
    ],
    roles: ["superadmin", "admin", "doctor"]
  },

  // Medical Certificates - Doctor, Admin, SuperAdmin
  {
    title: "Medical Certificates",
    href: "/medical-certificates",
    icon: FileText,
    submenu: [
      { title: "Fitness Certificates", href: "/medical-certificates/fitness-certificates" },
      { title: "Disability Certificates", href: "/medical-certificates/disability-certificates" }
    ],
    roles: ["superadmin", "admin", "doctor"]
  },

  // Billing - Front Desk, Admin, SuperAdmin
  {
    title: "Billing",
    href: "/billing",
    icon: Receipt,
    submenu: [
      { title: "Invoices List", href: "/billing" },
      { title: "Create Invoice", href: "/billing/create" },
      { title: "Payments History", href: "/billing/payments" },
      { title: "Insurance Claims", href: "/billing/insurance" }
    ],
    roles: ["superadmin", "admin", "frontdesk_staff"]
  },

  // Inpatient Management - Front Desk, Admin, SuperAdmin
  {
    title: "Inpatient Management",
    href: "/rooms",
    icon: Bed,
    submenu: [
      { title: "Room Occupancy", href: "/rooms/alloted" },
      { title: "New Admission", href: "/rooms/new" },
      { title: "Discharge Planning", href: "/rooms/discharge" },
      { title: "Facility Management", href: "/rooms/add" }
    ],
    roles: ["superadmin", "admin", "frontdesk_staff"]
  },

  // Inventory - Front Desk, Admin, SuperAdmin
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    submenu: [
      { title: "Inventory List", href: "/inventory" },
      { title: "Add Item", href: "/inventory/add" },
      { title: "Stock Alerts", href: "/inventory/alerts" },
      { title: "Suppliers", href: "/inventory/suppliers" }
    ],
    roles: ["superadmin", "admin", "frontdesk_staff"]
  },

  // Departments - Admin, SuperAdmin
  {
    title: "Departments",
    href: "/departments",
    icon: Building2,
    submenu: [
      { title: "Physiotherapy", href: "/departments/physiotherapy" },
      { title: "Prosthetics & Orthotics", href: "/departments/prosthetics-orthotics" },
      { title: "Services Management", href: "/departments/services" }
    ],
    roles: ["superadmin", "admin"]
  },

  // Staff Management - Admin, SuperAdmin
  {
    title: "Staff",
    href: "/staff",
    icon: UserCog,
    submenu: [
      { title: "All Staff", href: "/staff" },
      { title: "Add Staff", href: "/staff/add" },
      { title: "Roles & Permissions", href: "/staff/roles" },
      { title: "Attendance", href: "/staff/attendance" }
    ],
    roles: ["superadmin", "admin"]
  },

  // Reports - Admin, SuperAdmin (limited for others)
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    submenu: [
      { title: "Overview", href: "/reports" },
      { title: "Patient Reports", href: "/reports/patients" },
      { title: "Financial Reports", href: "/reports/financial" },
      { title: "Inventory Reports", href: "/reports/inventory" }
    ],
    roles: ["superadmin", "admin"]
  },

  // Reviews - All roles can see
  {
    title: "Reviews & Feedback",
    href: "/feedback",
    icon: MessageSquare,
    roles: ["superadmin", "admin", "doctor", "frontdesk_staff"]
  },

  // Support - All roles
  {
    title: "Support",
    href: "/support",
    icon: HelpCircle,
    roles: ["superadmin", "admin", "doctor", "frontdesk_staff"]
  }
];

// Helper function to filter menu items by role
export function getMenuItemsForRole(userRole: string): MenuItem[] {
  return menuItems.filter(item => item.roles.includes(userRole));
}