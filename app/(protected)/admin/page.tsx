import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import TransactionsList from "@/components/dashboard/transactions-list";
import { AdminPageCount } from "@/components/admin-panel/admin-page-counts";

export const metadata = constructMetadata({
  title: "Admin – Next Template",
  description: "Admin page for only admin management.",
});

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader heading="Admin Panel" text="Access only for users with ADMIN role." />
      <div className="flex flex-col gap-5">
        <AdminPageCount />
      </div>

    </>
  );
}
