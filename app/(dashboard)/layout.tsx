import { DashboardLayout } from "@/components/dashboard-layout";
import AuthGuard from "@/components/auth-guard";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>
        <Toaster richColors position="top-right" />
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
}
