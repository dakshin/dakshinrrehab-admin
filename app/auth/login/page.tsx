"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, Shield, UserCheck, Stethoscope, Users, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Simple hardcoded authentication - no Firebase needed
export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin', 
  DOCTOR = 'doctor',
  FRONTDESK_STAFF = 'frontdesk_staff',
  PATIENT = 'patient'
}

// Sample user credentials for quick testing
const SAMPLE_CREDENTIALS = [
  { email: 'superadmin@dakshinrehab.com', password: 'superadmin123', role: UserRole.SUPERADMIN },
  { email: 'admin@dakshinrehab.com', password: 'admin123', role: UserRole.ADMIN },
  { email: 'doctor@dakshinrehab.com', password: 'doctor123', role: UserRole.DOCTOR },
  { email: 'frontdesk@dakshinrehab.com', password: 'frontdesk123', role: UserRole.FRONTDESK_STAFF }
];

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Auto-fill credentials when role is selected
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    const credential = SAMPLE_CREDENTIALS.find(cred => cred.role === role)
    if (credential) {
      setEmail(credential.email)
      setPassword(credential.password)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Simple hardcoded login check
    setTimeout(() => {
      const validUsers = {
        'superadmin@dakshinrehab.com': { password: 'superadmin123', role: UserRole.SUPERADMIN, name: 'Super Admin' },
        'admin@dakshinrehab.com': { password: 'admin123', role: UserRole.ADMIN, name: 'Admin' },
        'doctor@dakshinrehab.com': { password: 'doctor123', role: UserRole.DOCTOR, name: 'Dr. Swapna Gandhi' },
        'frontdesk@dakshinrehab.com': { password: 'frontdesk123', role: UserRole.FRONTDESK_STAFF, name: 'Front Desk Staff' }
      }

      const user = validUsers[email as keyof typeof validUsers]
      
      if (user && user.password === password) {
        setSuccess(`Welcome back, ${user.name}!`)
        
        // Store user data in localStorage
        const userData = { email, role: user.role, name: user.name };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Set authentication cookies for middleware
        document.cookie = `dakshin-auth-token=authenticated-${Date.now()}; path=/; max-age=86400`; // 24 hours
        document.cookie = `dakshin-user-role=${user.role}; path=/; max-age=86400`; // 24 hours
        
        // Redirect based on role
        setTimeout(() => {
          switch (user.role) {
            case UserRole.SUPERADMIN:
            case UserRole.ADMIN:
              router.push('/settings/user-roles')
              break
            case UserRole.DOCTOR:
              router.push('/dashboard')
              break
            case UserRole.FRONTDESK_STAFF:
              router.push('/dashboard')
              break
            default:
              router.push('/dashboard')
          }
        }, 1000)
      } else {
        setError('Invalid email or password')
      }
      
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">DakshinRehab</h2>
          <p className="mt-2 text-gray-400">Admin System - Optimizing Your Health</p>
        </div>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-xl text-white">Sign in to your account</CardTitle>
            <CardDescription className="text-gray-400">Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert className="border-red-800 bg-red-900/20">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="border-green-800 bg-green-900/20">
                  <AlertDescription className="text-green-400">{success}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">
                  Quick Login (Development)
                </Label>
                <Select value={selectedRole} onValueChange={handleRoleSelect}>
                  <SelectTrigger className="border-gray-800 bg-gray-800 text-white">
                    <SelectValue placeholder="Select a role to auto-fill credentials" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.SUPERADMIN}>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-400" />
                        Super Admin
                      </div>
                    </SelectItem>
                    <SelectItem value={UserRole.ADMIN}>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-orange-400" />
                        Admin
                      </div>
                    </SelectItem>
                    <SelectItem value={UserRole.DOCTOR}>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-blue-400" />
                        Doctor
                      </div>
                    </SelectItem>
                    <SelectItem value={UserRole.FRONTDESK_STAFF}>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-400" />
                        Front Desk Staff
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@dakshinrehab.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-800 bg-gray-800 pl-10 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <Link href="/auth/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border-gray-800 bg-gray-800 pl-10 text-white placeholder:text-gray-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-gray-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="remember" className="text-sm text-gray-300">
                  Remember me for 30 days
                </Label>
              </div>
              
              {/* Development Only - Login Credentials Display */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Development Login Credentials
                  </h3>
                  <div className="space-y-2 text-xs">
                    {SAMPLE_CREDENTIALS.map((cred, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-900 rounded border border-gray-600">
                        <div className="flex items-center gap-2">
                          {cred.role === UserRole.SUPERADMIN && <Shield className="h-3 w-3 text-red-400" />}
                          {cred.role === UserRole.ADMIN && <UserCheck className="h-3 w-3 text-orange-400" />}
                          {cred.role === UserRole.DOCTOR && <Stethoscope className="h-3 w-3 text-blue-400" />}
                          {cred.role === UserRole.FRONTDESK_STAFF && <Users className="h-3 w-3 text-green-400" />}
                          <span className="text-gray-300 font-medium">{cred.role.toUpperCase()}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400">{cred.email}</div>
                          <div className="text-gray-500 font-mono">{cred.password}</div>
                        </div>
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-xs text-blue-400 hover:text-blue-300"
                          onClick={() => handleRoleSelect(cred.role)}
                        >
                          Use
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Click "Use" or select role from dropdown above to auto-fill
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-blue-400 hover:text-blue-300">
                  Create an account
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
