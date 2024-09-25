import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  path: string;
}

const Card: React.FC<CardProps> = ({ title, description, path }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    navigate(path); // Navigate to the specified path when the card is clicked
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
