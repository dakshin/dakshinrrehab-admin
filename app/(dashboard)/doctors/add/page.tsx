"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AddDoctorPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/doctors">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Add Doctor</h1>
          <p className="text-muted-foreground">Add a new doctor to your clinic.</p>
        </div>
      </div>

      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Doctor Information</CardTitle>
          <CardDescription>Enter the doctor's details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Enter first name" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Enter last name" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Photo</h3>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 shrink-0 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <input type="file" id="profile-photo" className="hidden" />
                    <Button variant="outline" onClick={() => document.getElementById("profile-photo")?.click()}>Upload Photo</Button>
                    <p className="text-sm text-muted-foreground">Upload a profile photo. JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
              </div>

              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Professional Information</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="specialization">Primary Specialization</Label>
                    <Select>
                      <SelectTrigger id="specialization">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
                        <SelectItem value="orthotics">Prosthetist/Orthotist</SelectItem>
                        <SelectItem value="vascular">Vascular Surgeon</SelectItem>
                        <SelectItem value="pediatricortho">Pediatric Orthopedic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Input id="qualifications" placeholder="Enter qualifications (MD, PhD, etc.)" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" placeholder="Enter years of experience" />
                  </div>
                </div>
              </div>

              <Separator />

              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Consultation Hours</h3>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="morning-hours">Morning Hours</Label>
                      <Input id="morning-hours" placeholder="e.g., 9AM-12:45PM" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="evening-hours">Evening Hours</Label>
                      <Input id="evening-hours" placeholder="e.g., 3:30PM-7:45PM" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultation-days">Consultation Days</Label>
                    <Input id="consultation-days" placeholder="e.g., Monday to Saturday" />
                  </div>
                </div>
              </div>

              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Doctor</Button>
      </div>
    </div>
  );
}
