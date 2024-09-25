import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Mark Wilson", email: "mark@example.com", role: "Moderator" },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  // Handle delete user
  const handleDelete = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Handle edit user (this is a basic example, expand to form input in real cases)
  const handleEdit = (id: number) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, name: user.name + " (Edited)" } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 text-left font-semibold text-gray-600">
              Name
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600">
              Email
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600">
              Role
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add new user section (placeholder functionality for now) */}
      <div className="mt-6">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Add New User
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
