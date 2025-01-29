"use client";

import { useState } from "react";

export default function AddSkillsComponent({ userId }) {
  const [skillName, setSkillName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Make a POST request to the API to add the skill
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name: skillName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add skill");
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setMessage("Skill added successfully!");
        setSkillName(""); // Reset the input field
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      setMessage("Error adding skill");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Add New Skill</h2>

      {/* Success/Error message */}
      {message && (
        <p className={`text-lg ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      {/* Skill Input Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="skillName" className="block text-sm font-medium text-gray-700">
            Skill Name
          </label>
          <input
            type="text"
            id="skillName"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter your skill"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
}
