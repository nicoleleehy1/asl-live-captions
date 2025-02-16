import React from "react";
import { cn } from "@/utils/cn"; // Ensure you have a utility for class names

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline"; // Add "outline" here
  size?: "default" | "icon"; // Ensure "icon" is included
}

const Button = ({ variant = "default", size = "default", className = "", ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 font-medium rounded";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100", // Added "outline"
  };
  const sizeStyles = {
    default: "text-base",
    icon: "p-2", // Ensures icon buttons are smaller
  };

  return (
    <button className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props} />
  );
};

export { Button };


