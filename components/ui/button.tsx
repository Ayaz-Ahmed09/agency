"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  const variantClass =
    variant === "outline"
      ? "border bg-transparent"
      : variant === "ghost"
        ? "bg-transparent"
        : "";

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center disabled:pointer-events-none disabled:opacity-50",
        variantClass,
        className,
      )}
      {...props}
    />
  );
}
