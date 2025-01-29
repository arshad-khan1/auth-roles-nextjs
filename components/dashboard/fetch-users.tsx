"use client";

import { useEffect, useState } from "react";

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "USER";
}

export function UsersComponent() {
  // Explicitly set the type of users as an array of User objects
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`/api/user`);
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        console.log(data);

        // Extracting name, email, and role from the data
        const extractedUsers: User[] = data.data.map((user: { name: any; email: any; role: any }) => ({
          name: user.name,
          email: user.email,
          role: user.role,
        }));

        setUsers(extractedUsers);

      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Group users by role
  const admins = users.filter(user => user.role === 'ADMIN');
  const managers = users.filter(user => user.role === 'MANAGER');
  const regularUsers = users.filter(user => user.role === 'USER');

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {/* Admin Users */}
          {admins.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Admins</h3>
              <ul>
                {admins.map((user) => (
                  <li key={user.email} className="bg-gray-100 p-4 mb-2 w-fit rounded shadow-sm flex items-center justify-center gap-20 ">
                    <p className="font-bold text-nowrap ">{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Manager Users */}
          {managers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Managers</h3>
              <ul>
                {managers.map((user) => (
                  <li key={user.email} className="bg-gray-100 p-4 mb-2 w-fit rounded shadow-sm flex items-center justify-center gap-20">
                    <p className="font-bold text-nowrap ">{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Regular Users */}
          {regularUsers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Users</h3>
              <ul>
                {regularUsers.map((user) => (
                  <li key={user.email} className="bg-gray-100 p-4 mb-2 w-fit rounded shadow-sm flex items-center justify-center gap-20">
                    <p className="font-bold text-nowrap ">{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* No users case */}
          {admins.length === 0 && managers.length === 0 && regularUsers.length === 0 && (
            <p className="text-gray-600">No users found in the system.</p>
          )}
        </div>
      )}
    </div>
  );
}
