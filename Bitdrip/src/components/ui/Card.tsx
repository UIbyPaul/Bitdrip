import { cn } from "@/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-2xl bg-white border border-blue-100 shadow-sm",
        hover && "hover:border-blue-300 hover:shadow-md transition-all",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-blue-500 mb-1">{children}</div>;
}

export function CardValue({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("text-2xl font-bold text-gray-800", className)}>{children}</div>
  );
}
