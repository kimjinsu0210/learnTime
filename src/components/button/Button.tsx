import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const combinedStyles =
    "px-4 py-2 rounded-lg transition duration-300 shadow-md text-white text-sm bg-primary hover:bg-opacity-70";

  return (
    <button
      className={combinedStyles}
      style={{ borderRadius: "20px", minWidth: "fit-content" }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
