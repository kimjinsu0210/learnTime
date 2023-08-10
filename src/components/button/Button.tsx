import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="px-4 py-2 m-1 rounded-3xl transition duration-300 shadow-md text-white text-sm bg-primary hover:bg-opacity-70 w-auto"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
