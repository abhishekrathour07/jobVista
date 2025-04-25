import React from "react";
import Loader from "../HashLoader/Loader";

interface CustomButtonProps {
  label: string ;
  onClick?: () => void;
  className?: string;
  isloading?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, className, isloading }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-800 min-w-36 cursor-pointer text-white font-semibold py-2 px-4 rounded-md shadow-md ${className}`}
    >
      {isloading ? <Loader /> : label}

    </button>
  );
};

export default CustomButton;
