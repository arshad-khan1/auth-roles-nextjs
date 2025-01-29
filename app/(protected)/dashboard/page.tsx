import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { UsersComponent } from "@/components/dashboard/fetch-users";
import { CompaniesComponent } from "@/components/dashboard/fetch-companies";
import { SkillsComponent } from "@/components/dashboard/fetch-skills";

export default async function DashboardPage() {
  const user = await getCurrentUser(); // Server-side logic

  let content: JSX.Element | null = null;

  // Pass the user data to the appropriate client-side component
  if (user?.role === "USER") {
    content = <SkillsComponent userId={user.id} />;
  } else if (user?.role === "MANAGER") {
    content = <CompaniesComponent managerId={user.id} />;
  } else if (user?.role === "ADMIN") {
    content = <UsersComponent />;
  } else {
    content = (
      <div className="container mx-auto p-6">
        <p className="text-gray-600">Unauthorized access.</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text={`Current Role : ${user?.role} — Change your role in settings.`}
      />
      <EmptyPlaceholder>{content}</EmptyPlaceholder>
    </>
  );
}
