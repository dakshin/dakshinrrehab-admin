"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Specialty-based data from documentation
const specialtyData = {
  physiotherapy: {
    reasons: [
      "Back Pain",
      "Knee Pain", 
      "Sciatica",
      "Post-Surgery Rehab",
      "Frozen Shoulder",
      "ACL Injury",
      "Stroke Rehab",
      "Plantar Fasciitis"
    ],
    timeSlots: [
      "09:00–09:45",
      "10:00–10:45", 
      "11:00–11:45",
      "12:00–12:45",
      "03:30–04:15",
      "04:30–05:15",
      "06:00–06:45",
      "07:00–07:45"
    ]
  },
  "prosthetics-orthotics": {
    reasons: ["Amputee Rehab", "Limb Fitting", "Prosthetic Adjustment"],
    timeSlots: [
      "10:00–10:45",
      "11:00–11:45",
      "12:00–12:45", 
      "04:30–05:15",
      "06:00–06:45"
    ]
  },
  pediatrics: {
    reasons: ["Well Baby Check", "Vaccination"],
    timeSlots: ["04:30–05:30"]
  },
  vascular: {
    reasons: ["Consultation Required"],
    timeSlots: ["06:00–06:45", "07:00–07:45"]
  },
  wellness: {
    reasons: [
      "InBody Analysis",
      "Muscle Strength Test", 
      "Foot Scan",
      "Gait Analysis",
      "Clinical Pilates",
      "Infrared Sauna",
      "Body Assessment"
    ],
    timeSlots: [
      "09:00–09:45",
      "10:00–10:45",
      "11:00–11:45", 
      "12:00–12:45",
      "03:30–04:15",
      "04:30–05:15",
      "06:00–06:45",
      "07:00–07:45"
    ]
  },
  "free-health-camps": {
    reasons: ["General Screening", "Pain & Mobility Check", "InBody Assessment"],
    timeSlots: []
  }
};

export default function AddAppointmentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    sex: "",
    phoneNumber: "",
    email: "",
    medicalHistory: "",
    speciality: "",
    reason: "",
    preferredDate: undefined as Date | undefined,
    preferredTime: "",
    additionalInformation: "",
    // Referral doctor details
    referralDoctorName: "",
    referralDoctorPhone: "",
    referralDoctorSpeciality: "",
    referralHospital: "",
    prescriptionDetails: ""
  });

  const [availableReasons, setAvailableReasons] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isCampRegistration, setIsCampRegistration] = useState(false);

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Update reasons and time slots when specialty changes
  useEffect(() => {
    if (formData.speciality && specialtyData[formData.speciality as keyof typeof specialtyData]) {
      const data = specialtyData[formData.speciality as keyof typeof specialtyData];
      setAvailableReasons(data.reasons);
      setAvailableTimeSlots(data.timeSlots);
      setIsCampRegistration(formData.speciality === "free-health-camps");
      
      // Reset reason and time when specialty changes
      setFormData(prev => ({ ...prev, reason: "", preferredTime: "" }));
    }
  }, [formData.speciality]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment data:", formData);
    
    const message = isCampRegistration 
      ? "Camp registration recorded successfully!" 
      : "Appointment booked successfully!";
    alert(message);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center flex-wrap gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/appointments">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Add Appointment</h1>
          <p className="text-muted-foreground">Schedule a new appointment for a patient.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Details</CardTitle>
            <CardDescription>Enter patient information for the appointment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sex">Sex</Label>
                <Select value={formData.sex} onValueChange={(value) => handleInputChange("sex", value)}>
                  <SelectTrigger id="sex">
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
              <Textarea
                id="medicalHistory"
                placeholder="Enter relevant medical history"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>Select specialty, reason, and preferred time slot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="speciality">Speciality</Label>
              <Select value={formData.speciality} onValueChange={(value) => handleInputChange("speciality", value)}>
                <SelectTrigger id="speciality">
                  <SelectValue placeholder="Select speciality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
                  <SelectItem value="prosthetics-orthotics">Prosthetics & Orthotics</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="vascular">Vascular</SelectItem>
                  <SelectItem value="wellness">Wellness</SelectItem>
                  <SelectItem value="free-health-camps">Free Health Camps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Consultation</Label>
              <Select 
                value={formData.reason} 
                onValueChange={(value) => handleInputChange("reason", value)}
                disabled={!formData.speciality}
              >
                <SelectTrigger id="reason">
                  <SelectValue placeholder={formData.speciality ? "Select reason" : "Select speciality first"} />
                </SelectTrigger>
                <SelectContent>
                  {availableReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {formData.preferredDate ? formData.preferredDate.toDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.preferredDate}
                    onSelect={(date) => handleInputChange("preferredDate", date)}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Time</Label>
              {isCampRegistration ? (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700">Camp Registration Mode – Time slots not required.</p>
                </div>
              ) : (
                <Select 
                  value={formData.preferredTime} 
                  onValueChange={(value) => handleInputChange("preferredTime", value)}
                  disabled={!formData.speciality || isCampRegistration}
                >
                  <SelectTrigger id="preferredTime">
                    <SelectValue placeholder={formData.speciality ? "Select time slot" : "Select speciality first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Referral Doctor Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Doctor Details (Optional)</CardTitle>
            <CardDescription>If patient was referred by another doctor, enter details below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referralDoctorName">Doctor Name</Label>
                <Input
                  id="referralDoctorName"
                  placeholder="Dr. Name"
                  value={formData.referralDoctorName}
                  onChange={(e) => handleInputChange("referralDoctorName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referralDoctorPhone">Doctor Phone</Label>
                <Input
                  id="referralDoctorPhone"
                  placeholder="Enter phone number"
                  value={formData.referralDoctorPhone}
                  onChange={(e) => handleInputChange("referralDoctorPhone", e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referralDoctorSpeciality">Doctor Speciality</Label>
                <Input
                  id="referralDoctorSpeciality"
                  placeholder="e.g., Orthopedic, General Medicine"
                  value={formData.referralDoctorSpeciality}
                  onChange={(e) => handleInputChange("referralDoctorSpeciality", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referralHospital">Hospital/Clinic</Label>
                <Input
                  id="referralHospital"
                  placeholder="Hospital or clinic name"
                  value={formData.referralHospital}
                  onChange={(e) => handleInputChange("referralHospital", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prescriptionDetails">Prescription Details</Label>
              <Textarea
                id="prescriptionDetails"
                placeholder="Enter prescription details or recommendations"
                value={formData.prescriptionDetails}
                onChange={(e) => handleInputChange("prescriptionDetails", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="additionalInformation">Additional Information (Optional)</Label>
              <Textarea
                id="additionalInformation"
                placeholder="Enter any additional notes or special requirements"
                value={formData.additionalInformation}
                onChange={(e) => handleInputChange("additionalInformation", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/appointments">Cancel</Link>
          </Button>
          <Button type="submit">
            {isCampRegistration ? "Register for Camp" : "Book Appointment"}
          </Button>
        </div>
      </form>
    </div>
  );
}