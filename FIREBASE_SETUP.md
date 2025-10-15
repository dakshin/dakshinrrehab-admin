# Firebase Setup Instructions

## Current Status: Using Mock Authentication

The system is currently using mock authentication (`mock-auth-context.tsx`) instead of Firebase due to API key issues.

## To Switch Back to Firebase:

### 1. Get Firebase Web API Key
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `dakshinrehab-fc8c9`
3. Go to **Project Settings** → **General** tab
4. Scroll to **Your apps** section
5. Click on your web app or create one
6. Copy the **API Key** from the config

### 2. Update Environment Variables
Update these values in `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_ACTUAL_WEB_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_ACTUAL_SENDER_ID_HERE
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_ACTUAL_APP_ID_HERE
```

### 3. Switch Back to Firebase Auth
In `lib/provider.tsx`, change:
```tsx
// FROM:
import { MockAuthProvider } from "./mock-auth-context";
<MockAuthProvider>

// TO:
import { AuthProvider } from "./auth-context";
<AuthProvider>
```

### 4. Update Import Statements
In these files, change the import:
- `app/auth/login/page.tsx`
- `app/(dashboard)/dashboard/page.tsx`

FROM:
```tsx
import { useAuth, UserRole } from "@/lib/mock-auth-context"
```

TO:
```tsx
import { useAuth, UserRole } from "@/lib/auth-context"
```

## Mock Authentication Features (Current)

✅ **Working Features:**
- Login with sample credentials
- Role-based authentication (SuperAdmin, Admin, Doctor, Staff)
- Persistent sessions (localStorage)
- User profile management
- Permission checking
- Logout functionality
- Same interface as Firebase auth

✅ **Sample Credentials:**
- SuperAdmin: `superadmin@dakshinrehab.com` / `superadmin123`
- Admin: `admin@dakshinrehab.com` / `admin123`
- Doctor: `doctor@dakshinrehab.com` / `doctor123`
- Staff: `staff@dakshinrehab.com` / `staff123`

## Benefits of Mock Auth (for Development)

- ✅ No API key requirements
- ✅ Works offline
- ✅ Fast development testing
- ✅ Same interface as Firebase
- ✅ Easy to switch back to Firebase
- ✅ Stores data in localStorage (persistent across sessions)

The mock authentication system provides all the same functionality as Firebase Auth but works locally without any external dependencies.