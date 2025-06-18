import * as React from "react";
import { Input } from "../ui/input";

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      type="password"
      className={`input-common rounded-lg text-base px-4 py-3 ${
        className ?? ""
      }`}
      {...props}
    />
  );
});
PasswordInput.displayName = "PasswordInput";
