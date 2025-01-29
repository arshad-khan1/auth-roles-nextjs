"use client";

import { useEffect, useState } from "react";

export function SkillsComponent({ userId }: { userId: string | undefined }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`/api/skills?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch skills");

      const data = await response.json();
      console.log(data);
      setSkills(data || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) fetchSkills();
  }, [userId]);

  // Handle delete skill
  const handleDelete = async (skillId: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`/api/skills/${skillId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete skill");
      }

      // setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
      alert("Skill deleted successfully");
      if (userId) fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Failed to delete skill");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-lg font-bold mb-4">Your Skills</h2>
      {loading ? (
        <p>Loading...</p>
      ) : skills.length > 0 ? (
        <ul className="flex gap-10 items-center justify-center">
          {skills.map((skill: { id: string; name: string }) => (
            <li key={skill.id} className="bg-gray-100 p-4 mb-2 rounded shadow-sm flex justify-between items-center gap-4">
              <span>{skill.name}</span>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(skill.id)}
                className="text-red-500 hover:text-red-700 font-bold text-[10px]"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">You have no skills added yet.</p>
      )}
    </div>
  );
}
