import React, { useState } from "react";

interface Report {
  id: number;
  title: string;
  description: string;
  date: string;
}

const initialReports: Report[] = [
  {
    id: 1,
    title: "Security Alert",
    description: "A security breach was detected at 3:15 PM.",
    date: "2024-09-01",
  },
  {
    id: 2,
    title: "System Update",
    description: "System update completed successfully.",
    date: "2024-09-02",
  },
  {
    id: 3,
    title: "User Login Activity",
    description: "User John logged in from a new device.",
    date: "2024-09-03",
  },
];

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);

  // Delete report handler
  const handleDelete = (id: number) => {
    const updatedReports = reports.filter((report) => report.id !== id);
    setReports(updatedReports);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      {reports.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="w-full bg-gray-200">
              <th className="py-2 px-4 text-left font-semibold text-gray-600">
                Title
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">
                Description
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">
                Date
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="py-2 px-4">{report.title}</td>
                <td className="py-2 px-4">{report.description}</td>
                <td className="py-2 px-4">{report.date}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No reports available.</p>
      )}

      {/* Placeholder for adding new reports */}
      <div className="mt-6">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Add New Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
