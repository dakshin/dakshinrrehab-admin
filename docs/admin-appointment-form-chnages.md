# 🩺 **DakshinRehab Admin Appointment Booking Form — Upgrade PRD**

## 🎯 **Objective**
Upgrade the existing admin dashboard appointment booking form to match the frontend’s advanced appointment logic and UI structure.  
The new form should allow both **regular bookings** and **Free Health Camp registrations**, with speciality-based dynamic options, slot logic, and patient metadata.

---

## 🧩 **Functional Overview**
- Admins and front-desk staff can **book appointments or register free camp attendees**.  
- Form captures the **same fields and logic** as the patient-facing booking interface.  
- Time slots and reasons are **auto-populated based on selected speciality**.  
- When “Free Health Camps” is chosen, slot selection is disabled and marked “Camp Registration Mode.”  

---

## 🧠 **Form Fields**

| Field | Type | Notes |
|--------|------|-------|
| Full Name | Text | Required |
| Age | Number | Required |
| Sex | Dropdown (Male / Female / Other) | Required |
| Phone Number | Text | Required |
| Email Address | Text | Optional |
| Medical History | Textarea | Optional |
| Speciality | Dropdown | Required; dynamic controls “Reason” and “Time Slot” |
| Reason for Consultation | Dropdown | Auto-populated based on speciality |
| Preferred Date | Date Picker | Required; disable past dates |
| Preferred Time | Dropdown | Auto-populated based on speciality slot logic |
| Additional Information | Textarea | Optional |

---

## 🩻 **Speciality Logic**

### Physiotherapy
- **Reasons:** Back Pain, Knee Pain, Sciatica, Post-Surgery Rehab, Frozen Shoulder, ACL Injury, Stroke Rehab, Plantar Fasciitis  
- **Time Slots:**  
  09:00–09:45  
  10:00–10:45  
  11:00–11:45  
  12:00–12:45  
  03:30–04:15  
  04:30–05:15  
  06:00–06:45  
  07:00–07:45  

---

### Prosthetics & Orthotics
- **Reasons:** Amputee Rehab, Limb Fitting, Prosthetic Adjustment  
- **Time Slots:**  
  10:00–10:45  
  11:00–11:45  
  12:00–12:45  
  04:30–05:15  
  06:00–06:45  

---

### Pediatrician
- **Reasons:** Well Baby Check, Vaccination  
- **Time Slots:**  
  04:30–05:30  

---

### Vascular
- **Reasons:** Consultation Required  
- **Time Slots:**  
  06:00–06:45  
  07:00–07:45  

---

### Wellness
- **Reasons:** InBody Analysis, Muscle Strength Test, Foot Scan, Gait Analysis, Clinical Pilates, Infrared Sauna, Body Assessment  
- **Time Slots:**  
  09:00–09:45  
  10:00–10:45  
  11:00–11:45  
  12:00–12:45  
  03:30–04:15  
  04:30–05:15  
  06:00–06:45  
  07:00–07:45  

---

### Free Health Camps
- **Reasons:** General Screening, Pain & Mobility Check, InBody Assessment  
- **Slots:** Disabled (Camp Registration Only)  
- **UI Message:** “Camp Registration Mode – Time slots not required.”

---

## 💾 **Form Behavior**

- Auto-populate reasons and slots dynamically after selecting speciality.  
- Disable slot dropdown when speciality = “Free Health Camps.”  
- Validate required fields before submission.  
- On submit:  
  - Save all fields including `age`, `sex`, `medicalHistory`, and `isCampRegistration`.  
  - Show success toast/snackbar:  
    > “Appointment booked successfully.”  
    or  
    > “Camp registration recorded successfully.”  

---

## 🧱 **Design & UX Notes**
- Follow the same Bootstrap/Tailwind structure as the existing admin form.  
- Keep label alignment and grid consistent across desktop and mobile.  
- Use clear headings and section dividers:  
  - “Patient Details”  
  - “Appointment Details”  
  - “Additional Information”  
- Add subtle highlight (light blue border or icon) when “Free Health Camps” is selected.  

---

## ✅ **Acceptance Criteria**

- [ ] All fields visible and functional  
- [ ] Speciality controls dynamically update reason & time slot  
- [ ] “Free Health Camps” disables slot selection  
- [ ] Submissions save correctly to Firestore with `isCampRegistration` flag  
- [ ] Works across all screen sizes  
- [ ] Shows success/error toast feedback  

---

## 📈 **Future Enhancements (Optional)**
- Add “Reschedule” and “Cancel” workflows for booked appointments.  
- Integrate WhatsApp message trigger for confirmed camp registrations.  
- Add CSV export for “Free Camp Registrations.”
