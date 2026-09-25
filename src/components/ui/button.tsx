import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "outline" | "soft";
  size?: "icon" | "default";
};

export function Button({ className, variant = "ghost", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "outline" && "border border-border bg-card hover:bg-accent",
        variant === "soft" && "bg-accent hover:bg-secondary",
        variant === "ghost" && "hover:bg-accent",
        size === "icon" ? "size-9 rounded-md" : "h-10 rounded-md px-4",
        className,
      )}
      {...props}
    />
  );
}