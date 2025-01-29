import { useState, useEffect } from "react";

interface Company {
    id: string;
    name: string;
    location: string;
    requiredSkills: string[];
    salary: number;
}

interface EditModalProps {
    company: Company | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedCompany: Company) => void;
}

const EditModal: React.FC<EditModalProps> = ({ company, isOpen, onClose, onSave }) => {
    const [name, setName] = useState(company?.name || "");
    const [location, setLocation] = useState(company?.location || "");
    const [requiredSkills, setRequiredSkills] = useState(company?.requiredSkills.join(", ") || "");
    const [salary, setSalary] = useState(company?.salary || 0);

    useEffect(() => {
        if (company) {
            setName(company.name);
            setLocation(company.location);
            setRequiredSkills(company.requiredSkills.join(", "));
            setSalary(company.salary);
        }
    }, [company]);

    const handleSave = () => {
        if (!company) return;
        const updatedCompany = {
            ...company,
            name,
            location,
            requiredSkills: requiredSkills.split(", ").map(skill => skill.trim()),
            salary: Number(salary),
        };
        onSave(updatedCompany);
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                    <h2 className="text-xl font-bold mb-4">Edit Company</h2>
                    <label className="block mb-2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                    />
                    <label className="block mb-2">Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                    />
                    <label className="block mb-2">Required Skills:</label>
                    <input
                        type="text"
                        value={requiredSkills}
                        onChange={(e) => setRequiredSkills(e.target.value)}
                        className="border p-2 w-full mb-4 rounded"
                    />
                    <label className="block mb-2">Salary:</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="border p-2 w-full mb-4 rounded"
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default EditModal;
