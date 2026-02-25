import { cn } from "@/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const VARIANTS = {
  primary: "text-white shadow-sm",
  secondary: "bg-white hover:bg-blue-50 text-blue-700 border border-blue-200",
  danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
  ghost: "hover:bg-blue-50 text-blue-500 hover:text-blue-700",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      style={variant === "primary" ? { background: "linear-gradient(135deg, #4d8af0, #3b6fd4)" } : {}}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
