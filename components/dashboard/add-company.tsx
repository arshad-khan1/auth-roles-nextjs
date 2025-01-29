"use client";

import { useState } from "react";

export default function AddCompanyComponent({ userId }) {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to the API to add the company
    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: companyName,
            location,
            requiredSkills: requiredSkills.split(",").map((skill) => skill.trim()),
            salary: parseFloat(salary),
            managerId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add company");
      }

      const data = await response.json();
      if (data.success) {
        setMessage("Company added successfully!");
        setCompanyName("");
        setLocation("");
        setRequiredSkills("");
        setSalary("");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error adding company:", error);
      setMessage("Error adding company");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Add New Company</h2>

      {/* Success/Error message */}
      {message && (
        <p className={`text-lg ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      {/* Company Input Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter company name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter location"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700">
            Required Skills (comma-separated)
          </label>
          <input
            type="text"
            id="requiredSkills"
            value={requiredSkills}
            onChange={(e) => setRequiredSkills(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter required skills, e.g., JavaScript, React"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter salary"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
        >
          Add Company
        </button>
      </form>
    </div>
  );
}
