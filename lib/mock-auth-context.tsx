"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// User roles enum
export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin', 
  DOCTOR = 'doctor',
  STAFF = 'staff',
  PATIENT = 'patient'
}

// Extended user interface
export interface ExtendedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  department?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLoginAt?: Date;
  permissions?: string[];
}

interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<ExtendedUser>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userData: Partial<ExtendedUser>) => Promise<ExtendedUser>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (userData: Partial<ExtendedUser>) => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  hasPermission: (permission: string) => boolean;
}

const MockAuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data (same as Firebase version but stored locally)
const MOCK_USERS = [
  {
    uid: 'superadmin-uid-123',
    email: 'superadmin@dakshinrehab.com',
    password: 'superadmin123',
    displayName: 'Super Admin',
    role: UserRole.SUPERADMIN,
    firstName: 'Super',
    lastName: 'Admin',
    department: 'Administration',
    phone: '+918019299888',
    status: 'active' as const,
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(),
    permissions: ['*'] // All permissions
  },
  {
    uid: 'admin-uid-456',
    email: 'admin@dakshinrehab.com',
    password: 'admin123',
    displayName: 'System Administrator',
    role: UserRole.ADMIN,
    firstName: 'System',
    lastName: 'Administrator',
    department: 'Administration',
    phone: '+918019299887',
    status: 'active' as const,
    createdAt: new Date('2024-01-02'),
    lastLoginAt: new Date(),
    permissions: ['users.create', 'users.read', 'users.update', 'billing.*', 'reports.*']
  },
  {
    uid: 'doctor-uid-789',
    email: 'doctor@dakshinrehab.com',
    password: 'doctor123',
    displayName: 'Dr. Swapna Gandhi',
    role: UserRole.DOCTOR,
    firstName: 'Dr. Swapna',
    lastName: 'Gandhi',
    department: 'Physiotherapy',
    phone: '+918019299886',
    status: 'active' as const,
    createdAt: new Date('2024-01-03'),
    lastLoginAt: new Date(),
    permissions: ['patients.*', 'appointments.*', 'billing.read']
  },
  {
    uid: 'staff-uid-101',
    email: 'staff@dakshinrehab.com',
    password: 'staff123',
    displayName: 'Front Desk Staff',
    role: UserRole.STAFF,
    firstName: 'Front Desk',
    lastName: 'Staff',
    department: 'Reception',
    phone: '+918019299885',
    status: 'active' as const,
    createdAt: new Date('2024-01-04'),
    lastLoginAt: new Date(),
    permissions: ['appointments.*', 'patients.read', 'patients.create']
  }
];

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('dakshin-mock-user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({
          ...userData,
          createdAt: new Date(userData.createdAt),
          lastLoginAt: userData.lastLoginAt ? new Date(userData.lastLoginAt) : undefined
        });
      } catch (error) {
        localStorage.removeItem('dakshin-mock-user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<ExtendedUser> => {
    setLoading(true);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (mockUser) {
          const userProfile: ExtendedUser = {
            uid: mockUser.uid,
            email: mockUser.email,
            displayName: mockUser.displayName,
            role: mockUser.role,
            department: mockUser.department,
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            phone: mockUser.phone,
            status: mockUser.status,
            createdAt: mockUser.createdAt,
            lastLoginAt: new Date(),
            permissions: mockUser.permissions
          };

          // Store in localStorage for persistence
          localStorage.setItem('dakshin-mock-user', JSON.stringify(userProfile));
          setUser(userProfile);
          setLoading(false);
          resolve(userProfile);
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Logout function
  const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('dakshin-mock-user');
        setUser(null);
        resolve();
      }, 500);
    });
  };

  // Register new user (mock implementation)
  const register = async (
    email: string, 
    password: string, 
    userData: Partial<ExtendedUser>
  ): Promise<ExtendedUser> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: ExtendedUser = {
          uid: `mock-uid-${Date.now()}`,
          email,
          displayName: userData.displayName || `${userData.firstName} ${userData.lastName}`,
          role: userData.role || UserRole.STAFF,
          department: userData.department,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          status: 'active',
          createdAt: new Date(),
          permissions: userData.permissions || []
        };
        resolve(newUser);
      }, 1000);
    });
  };

  // Reset password (mock implementation)
  const resetPassword = async (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userExists = MOCK_USERS.find(u => u.email === email);
        if (userExists) {
          resolve();
        } else {
          reject(new Error('User not found'));
        }
      }, 1000);
    });
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<ExtendedUser>): Promise<void> => {
    if (!user) return;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedProfile = { ...user, ...userData };
        localStorage.setItem('dakshin-mock-user', JSON.stringify(updatedProfile));
        setUser(updatedProfile);
        resolve();
      }, 500);
    });
  };

  // Role checking
  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  // Permission checking
  const hasPermission = (permission: string): boolean => {
    if (!user?.permissions) return false;
    
    // SuperAdmin has all permissions
    if (user.permissions.includes('*')) return true;
    
    // Check exact permission or wildcard
    return user.permissions.some(p => 
      p === permission || 
      (p.endsWith('*') && permission.startsWith(p.slice(0, -1)))
    );
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    register,
    resetPassword,
    updateUserProfile,
    hasRole,
    hasPermission
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
}

// Export with same interface as Firebase auth for easy switching
export const useAuth = useMockAuth;