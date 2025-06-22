"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { TextInput, PasswordInput } from "@/components/forms";
import { useLogin } from "@/lib/api/auth/useAuth";
import { ACCESS_TOKEN_KEY, routePaths } from "@/lib/constants/system";
import { useAuthStore } from "@/lib/stores/authStore";

const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const { setIsAuthenticated } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  async function onSubmit(values: FormValues) {
    try {
      const data = await loginMutation.mutateAsync(values);
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
      setIsAuthenticated(true);
      toast.success("Login successful!");
      // AuthGuard will handle the redirect to /overview
    } catch (error) {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "An error occurred during login."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/icons/logo.svg"
            alt="SNDQ Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">
            Log in to your account
          </h1>
          <p className="text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <TextInput
              {...register("email")}
              type="email"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <PasswordInput {...register("password")} placeholder="********" />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-3"
            disabled={!isValid || loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push(routePaths.firstTime)}
            className="text-sm text-primary-blue hover:underline cursor-pointer"
          >
            First time logging in?
          </button>
        </div>
      </div>
    </div>
  );
}
