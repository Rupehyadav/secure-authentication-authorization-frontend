import React from "react";
import Card from "./Card";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card title="User Management" description="Manage users securely." />
        <Card title="Settings" description="Configure your system settings." />
        <Card title="Reports" description="View security reports and logs." />
      </div>
    </div>
  );
};

export default Dashboard;
