"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { auth, db } from './firebase';

// User roles enum
export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin', 
  DOCTOR = 'doctor',
  FRONTDESK_STAFF = 'frontdesk_staff',
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data for development
const SAMPLE_USERS = [
  {
    email: 'superadmin@dakshinrehab.com',
    password: 'superadmin123',
    userData: {
      role: UserRole.SUPERADMIN,
      firstName: 'Super',
      lastName: 'Admin',
      department: 'Administration',
      status: 'active' as const,
      permissions: ['*'] // All permissions
    }
  },
  {
    email: 'admin@dakshinrehab.com', 
    password: 'admin123',
    userData: {
      role: UserRole.ADMIN,
      firstName: 'System',
      lastName: 'Administrator',
      department: 'Administration', 
      status: 'active' as const,
      permissions: ['users.create', 'users.read', 'users.update', 'billing.*', 'reports.*']
    }
  },
  {
    email: 'doctor@dakshinrehab.com',
    password: 'doctor123', 
    userData: {
      role: UserRole.DOCTOR,
      firstName: 'Dr. Swapna',
      lastName: 'Gandhi',
      department: 'Physiotherapy',
      status: 'active' as const,
      permissions: ['patients.*', 'appointments.*', 'billing.read']
    }
  },
  {
    email: 'frontdesk@dakshinrehab.com',
    password: 'frontdesk123',
    userData: {
      role: UserRole.FRONTDESK_STAFF,
      firstName: 'Front Desk',
      lastName: 'Staff', 
      department: 'Reception',
      status: 'active' as const,
      permissions: [
        'appointments.*', 
        'patients.read', 
        'patients.create', 
        'patients.update',
        'billing.create',
        'billing.read',
        'billing.update',
        'inpatient.*',
        'inventory.read',
        'inventory.update',
        'inventory.create'
      ]
    }
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize sample users in Firestore (development only)
  const initializeSampleUsers = async () => {
    try {
      for (const sampleUser of SAMPLE_USERS) {
        const userQuery = query(
          collection(db, 'users'), 
          where('email', '==', sampleUser.email)
        );
        const userSnapshot = await getDocs(userQuery);
        
        if (userSnapshot.empty) {
          // Create the user account
          const userCredential = await createUserWithEmailAndPassword(
            auth, 
            sampleUser.email, 
            sampleUser.password
          );
          
          // Create user profile in Firestore
          const userProfile: ExtendedUser = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: `${sampleUser.userData.firstName} ${sampleUser.userData.lastName}`,
            role: sampleUser.userData.role,
            department: sampleUser.userData.department,
            firstName: sampleUser.userData.firstName,
            lastName: sampleUser.userData.lastName,
            status: sampleUser.userData.status,
            createdAt: new Date(),
            permissions: sampleUser.userData.permissions
          };

          await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
          console.log(`Created sample user: ${sampleUser.email}`);
        }
      }
    } catch (error) {
      console.log('Sample users may already exist or Firebase not configured:', error);
    }
  };

  // Get user profile from Firestore
  const getUserProfile = async (uid: string): Promise<ExtendedUser | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          uid,
          email: data.email,
          displayName: data.displayName,
          role: data.role,
          department: data.department,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          status: data.status,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate(),
          permissions: data.permissions || []
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<ExtendedUser> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await getUserProfile(userCredential.user.uid);
      
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      // Update last login time
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        ...userProfile,
        lastLoginAt: new Date()
      }, { merge: true });

      setUser(userProfile);
      return userProfile;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  };

  // Register new user (SuperAdmin only)
  const register = async (
    email: string, 
    password: string, 
    userData: Partial<ExtendedUser>
  ): Promise<ExtendedUser> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const userProfile: ExtendedUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userData.displayName || `${userData.firstName} ${userData.lastName}`,
      role: userData.role || UserRole.FRONTDESK_STAFF,
        department: userData.department,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        status: 'active',
        createdAt: new Date(),
        permissions: userData.permissions || []
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
      return userProfile;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message || 'Password reset failed');
    }
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<ExtendedUser>): Promise<void> => {
    if (!user) return;
    
    try {
      const updatedProfile = { ...user, ...userData };
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
      setUser(updatedProfile);
    } catch (error: any) {
      throw new Error(error.message || 'Profile update failed');
    }
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

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid);
        setUser(userProfile);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    // Initialize sample users in development
    if (process.env.NODE_ENV === 'development') {
      initializeSampleUsers();
    }

    return unsubscribe;
  }, []);

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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}