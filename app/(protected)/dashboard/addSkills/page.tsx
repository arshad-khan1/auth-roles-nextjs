// AddSkillsPage.jsx
import { getCurrentUser } from "@/lib/session";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import AddSkillsComponent from "@/components/dashboard/add-skills";

export default async function AddSkillsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <EmptyPlaceholder>
        <p className="text-lg font-medium">Please log in to add your skills.</p>
      </EmptyPlaceholder>
    );
  }

  return (
    <EmptyPlaceholder>
      <AddSkillsComponent userId={user.id} />
    </EmptyPlaceholder>
  );
}
