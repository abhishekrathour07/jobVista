import React from "react";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  className?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
