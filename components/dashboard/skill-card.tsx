"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";

interface Skill {
  id: string;
  name: string;
}

const SkillCard: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Fetch existing skills
  const fetchSkills = async () => {
  try {
    const response = await fetch("/api/skills");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetch API Response:", data);
    setSkills(data.skills); // Ensure `skills` matches your response structure
  } catch (error) {
    console.error("Error fetching skills with Fetch API:", error);
  }
};
  // Add a new skill
  const addSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const response = await axios.post("/api/skills", { name: newSkill });
      setSkills((prev) => [...prev, response.data.skill]);
      setNewSkill("");
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  // Delete a skill
  const deleteSkill = async (id: string) => {
    try {
      await axios.delete("/api/skills", { data: { id } });
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Skills</h2>

      {/* Add Skill Form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill"
          className="border rounded-md px-3 py-2 flex-1"
        />
        <button
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* List of Skills */}
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
          >
            <span>{skill.name}</span>
            <button
              onClick={() => deleteSkill(skill.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;
