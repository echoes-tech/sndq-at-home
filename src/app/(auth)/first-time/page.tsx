"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/components/forms";
import { Button } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  code: z
    .string()
    .min(6, "Access code must be at least 6 characters")
    .max(32, "Access code is too long"),
});

type FormValues = z.infer<typeof formSchema>;

export default function FirstTime() {
  const [language, setLanguage] = useState("EN");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  const languages = [
    { code: "EN", label: "English" },
    { code: "VI", label: "Tiếng Việt" },
  ];

  function onSubmit(values: FormValues) {
    alert("Access code: " + values.code);
  }

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Header with back button and language selector */}
      <div className="flex items-center justify-between mb-12">
        <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        {/* Language Select */}
        <div className="w-32">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full bg-gray-100 rounded-lg text-sm font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Main content - centered vertically */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          {/* Title and description */}
          <div className="mb-10">
            <h1 className="text-2xl font-semibold mb-1 text-left">
              First time logging in
            </h1>
            <p className="text-gray-600 text-left">
              SNDQ at Home is an invite-only platform for co-owners and tenants.
            </p>
          </div>
          {/* Form */}
          <form
            className="space-y-10"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="on"
          >
            <div>
              <label
                htmlFor="access-code"
                className="block text-base font-medium mb-1"
              >
                Access code
              </label>
              <TextInput
                id="access-code"
                placeholder="IABC-123-XYZ"
                className="w-full"
                {...register("code")}
                autoComplete="off"
              />
              {errors.code && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.code.message}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Access codes are sent by your syndic or steward.
              </p>
            </div>
            <Button type="submit" className="w-full py-3">
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
