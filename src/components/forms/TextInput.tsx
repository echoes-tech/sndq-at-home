import * as React from "react";
import { Input } from "../ui/input";

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, disabled = false, ...props }, ref) => {
  const disabledClass = disabled
    ? "bg-gray-200 shadow-none cursor-not-allowed !border-gray-300 !border"
    : "";
  return (
    <Input
      ref={ref}
      type="text"
      disabled={disabled}
      className={`input-common rounded-lg text-base px-4 py-3 ${disabledClass} ${
        className ?? ""
      }`}
      {...props}
    />
  );
});
TextInput.displayName = "TextInput";
