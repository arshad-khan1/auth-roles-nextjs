"use client";

import { useEffect, useState } from "react";
import EditModal from "./edit-company-modal";


// Define a type for the company structure
interface Company {
  id: string;
  name: string;
  location: string;
  requiredSkills: string[];
  salary: number;
}

export function CompaniesComponent({ managerId }: { managerId: string | undefined }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch(`/api/companies?managerId=${managerId}`);
        if (!response.ok) throw new Error("Failed to fetch companies");

        const data = await response.json();
        setCompanies(data.companies || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    }
    if (managerId) fetchCompanies();
  }, [managerId]);

  const handleDelete = async (companyId: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return;

    try {
      const response = await fetch(`/api/companies/${companyId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete company");

      setCompanies((prevCompanies) =>
        prevCompanies.filter((c) => c.id !== companyId)
      );
      alert("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Failed to delete company");
    }
  };

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleSaveCompany = async (updatedCompany: Company) => {
    try {
      const response = await fetch(`/api/companies/${updatedCompany.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCompany),
      });

      if (!response.ok) throw new Error("Failed to update company");

      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === updatedCompany.id ? updatedCompany : company
        )
      );
      alert("Company updated successfully");
      handleModalClose(); // Close modal after save
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Failed to update company");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-[25px] font-bold mb-8">Companies You Manage</h2>
      {loading ? (
        <p>Loading...</p>
      ) : companies.length > 0 ? (
        <ul className="flex gap-10 items-center justify-center">
          {companies.map((company) => (
            <li
              key={company.id}
              className="bg-gray-100 p-4 mb-2 rounded shadow-sm flex flex-col items-center justify-center gap-2"
            >
              <p className="font-bold text-[20px]">{company.name}</p>
              <div className="flex flex-col items-start px-4">
                <p className="text-nowrap">Location: {company.location}</p>
                <p className="text-nowrap">Skills: {company.requiredSkills.join(", ")}</p>
                <p className="text-nowrap">Salary: ₹{company.salary}/-</p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-500 text-sm text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(company)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-sm text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(company.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No companies found under your management.</p>
      )}

      {/* Edit Modal */}
      {selectedCompany && (
        <EditModal
          company={selectedCompany}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSaveCompany}
        />
      )}
    </div>
  );
}
