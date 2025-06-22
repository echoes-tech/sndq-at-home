"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { routePaths } from "@/lib/constants/system";

export default function WelcomePage() {
  const router = useRouter();

  const handleFirstTime = () => {
    router.push(routePaths.firstTime);
  };

  const handleExistingAccount = () => {
    router.push(routePaths.login);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-4">
      <div className="w-20 h-20 mb-6">
        <img src="/icons/logo.svg" alt="SNDQ Logo" className="w-full h-full" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to SNDQ</h1>
      <p className="max-w-md text-gray-600 mb-8">
        The all-in-one platform for co-owners and tenants to manage their
        property, connect with their syndic and stay up to date.
      </p>
      <div className="w-full max-w-sm flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={handleExistingAccount}
          className="flex-1 py-3"
        >
          I have an account
        </Button>
        <Button onClick={handleFirstTime} className="flex-1 py-3">
          First time logging in
        </Button>
      </div>
    </div>
  );
}
