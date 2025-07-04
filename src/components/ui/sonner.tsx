"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

type ToasterContextProps = ToasterProps & {
  toastOptions?: {
    classNames?: {
      [key in "success" | "error" | "info" | "warning"]?: string;
    };
  };
};

const Toaster = ({ ...props }: ToasterContextProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group-[.toaster]:!bg-red-500 group-[.toaster]:!text-white",
          success:
            "group-[.toaster]:!bg-green-500 group-[.toaster]:!text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
