"use client";
import { useEffect, useState } from "react";
import { PersonalInfoStep } from "./components/PersonalInfoStep";
import { LinkedPropertiesStep } from "./components/LinkedPropertiesStep";
import { ACCESS_TOKEN_KEY, routePaths } from "@/lib/constants/system";
import { useLogin } from "@/lib/api/auth/useAuth";
import { LoginData } from "@/lib/types/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/userStore";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const login = useLogin();
  const router = useRouter();
  const { user } = useUserStore();

  const handleComplete = async (data: LoginData) => {
    await login.mutateAsync(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
          toast.success("Login successful");
          router.push(routePaths.overview);
        },
        onError: (error) => {
          console.error(error);
          toast.error("Login failed");
        },
      }
    );
  };

  useEffect(() => {
    if (!user) {
      router.push(routePaths.firstTime);
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setStep((s) => (s === 1 ? 1 : s - 1))}
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.70711 0.292893C7.09763 0.683417 7.09763 1.31658 6.70711 1.70711L2.41421 6L6.70711 10.2929C7.09763 10.6834 7.09763 11.3166 6.70711 11.7071C6.31658 12.0976 5.68342 12.0976 5.29289 11.7071L0.292893 6.70711C-0.0976311 6.31658 -0.0976311 5.68342 0.292893 5.29289L5.29289 0.292893C5.68342 -0.0976311 6.31658 -0.0976311 6.70711 0.292893Z"
              fill="#242424"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.49012e-08 6C1.49012e-08 5.44772 0.447715 5 1 5H15C15.5523 5 16 5.44772 16 6C16 6.55228 15.5523 7 15 7H1C0.447715 7 1.49012e-08 6.55228 1.49012e-08 6Z"
              fill="#242424"
            />
          </svg>
        </button>
        <div>
          <div className="font-semibold text-base">
            {step === 1 ? "Personal information" : "Linked properties"}
          </div>
          <div className="text-xs text-gray-500">Step {step} of 2</div>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 flex justify-center items-center">
        {/* Step 1: Personal information */}
        {step === 1 && (
          <PersonalInfoStep
            onContinue={(data) => {
              setLoginData(data);
              setStep(2);
              console.log(data);
            }}
          />
        )}
        {/* Step 2: Linked properties */}
        {step === 2 && loginData && (
          <LinkedPropertiesStep
            onContinue={(data) => handleComplete(data)}
            loginData={loginData}
          />
        )}
      </div>
    </div>
  );
}
