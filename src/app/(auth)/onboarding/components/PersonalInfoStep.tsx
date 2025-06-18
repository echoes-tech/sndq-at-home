"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";
import { PasswordInput, TextInput } from "@/components/forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password too short")
    .max(20, "Password too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character"
    ),
  language: z.string().nonempty("Required"),
});

type FormValues = z.infer<typeof formSchema>;

const languages = [
  { code: "EN", label: "English" },
  { code: "VI", label: "Tiếng Việt" },
];

interface PersonalInfoStepProps {
  onContinue: () => void;
}

export function PersonalInfoStep({ onContinue }: PersonalInfoStepProps) {
  const [shareEmail, setShareEmail] = useState(true);
  const [sharePhone, setSharePhone] = useState(true);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      language: "EN",
    },
  });

  function onSubmit(data: FormValues) {
    // Xử lý submit, có thể truyền data ra ngoài nếu muốn
    console.log(data);
    onContinue();
  }

  return (
    <form
      className="w-full max-w-md mx-auto flex flex-col gap-6 p-4"
      onSubmit={form.handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">First name</label>
          <div className="text-base text-gray-900">Benjamin</div>
        </div>
        <div>
          <label className="block text-sm mb-1">Last name</label>
          <div className="text-base text-gray-900">Esposito</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {/* Email row */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium">Email</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Share with co-owners
              </span>
              <Switch checked={shareEmail} onCheckedChange={setShareEmail} />
            </div>
          </div>
          <TextInput value="benjaminesposito@example.com" disabled />
        </div>
        {/* Phone row */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium">Phone</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Share with co-owners
              </span>
              <Switch checked={sharePhone} onCheckedChange={setSharePhone} />
            </div>
          </div>
          <TextInput value="+32 493 00 00 00" disabled />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Set password</label>
        <PasswordInput
          {...form.register("password")}
          className="w-full"
          placeholder="********"
        />
        {form.formState.errors.password && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Preferred language
        </label>
        <Select
          value={form.watch("language")}
          onValueChange={(val) => form.setValue("language", val)}
        >
          <SelectTrigger className="w-full bg-gray-100">
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
        {form.formState.errors.language && (
          <p className="text-xs text-red-500 mt-1">
            {form.formState.errors.language.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Avatar <span className="text-gray-400 font-normal">Optional</span>
        </label>
        <div className="flex items-center gap-4 bg-gray-50 border rounded-lg p-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-lg">
            B
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Upload image</div>
            <div className="text-xs text-gray-500">
              Min 256×256, PNG or JPG, max 5mb
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="bg-white border-gray-300"
          >
            Upload
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Your avatar is only shared with your syndic and co-owners
        </div>
      </div>
      <Button type="submit">Continue</Button>
    </form>
  );
}
