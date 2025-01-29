// AddSkillsPage.jsx
import { getCurrentUser } from "@/lib/session";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import AddSkillsComponent from "@/components/dashboard/add-skills";
import AddCompanyComponent from "@/components/dashboard/add-company";

export default async function AddSkillsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <EmptyPlaceholder>
        <p className="text-lg font-medium">Please log in to add your Company.</p>
      </EmptyPlaceholder>
    );
  }

  return (
    <EmptyPlaceholder>
      <AddCompanyComponent userId={user.id} />
    </EmptyPlaceholder>
  );
}