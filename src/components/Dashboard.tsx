import React from "react";
import Card from "./Card";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="User Management"
          description="Manage users securely."
          path="/user-management"
        />
        <Card
          title="Settings"
          description="Configure your system settings."
          path="/settings"
        />
        <Card
          title="Reports"
          description="View security reports and logs."
          path="/reports"
        />
      </div>
    </div>
  );
};

export default Dashboard;
