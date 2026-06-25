import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin dashboard | pretigious",
  description: "A private operating cockpit for approvals, publishing, and automation health.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
