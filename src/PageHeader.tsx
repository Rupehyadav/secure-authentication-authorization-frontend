import React from "react";

interface PageHeaderProps {
  title: string; // Define a prop for the heading
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="bg-blue-600 w-full py-6 shadow-md">
      <h1 className="text-white text-4xl font-bold">{title}</h1>
    </div>
  );
};

export default PageHeader;
