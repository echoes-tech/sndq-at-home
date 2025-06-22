"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LoginData } from "@/lib/types/auth";

interface LinkedPropertiesStepProps {
  onContinue: (data: LoginData) => void;
  loginData: LoginData;
}

export function LinkedPropertiesStep({
  onContinue,
  loginData,
}: LinkedPropertiesStepProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-3 p-4">
      {/* First Property Group */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">
            Residentie d&apos;Urville
          </h3>
          <p className="text-sm text-gray-500">Zuidstraat 31, 8820 Torhout</p>
        </div>

        <div className="space-y-3">
          {/* Apartment */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image
                src="/icons/apartment.svg"
                alt="apartment"
                width={24}
                height={24}
              />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Apartment 101</div>
              <div className="text-sm text-gray-500">Owner</div>
            </div>
          </div>

          {/* Storage */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image
                src="/icons/storage.svg"
                alt="storage"
                width={24}
                height={24}
              />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Storage unit 1</div>
              <div className="text-sm text-gray-500">Owner</div>
            </div>
          </div>

          {/* Garage */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image
                src="/icons/garage.svg"
                alt="garage"
                width={24}
                height={24}
              />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Garagebox 1</div>
              <div className="text-sm text-gray-500">Owner</div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Property Group */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">CommLease_Meir1_2024</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>01/01/2024</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6_3509)">
                <path
                  d="M1 7.00009H8.586L6.293 9.29309C6.19749 9.38534 6.12131 9.49568 6.0689 9.61769C6.01649 9.73969 5.9889 9.87091 5.98775 10.0037C5.9866 10.1365 6.0119 10.2681 6.06218 10.391C6.11246 10.5139 6.18671 10.6256 6.2806 10.7195C6.3745 10.8134 6.48615 10.8876 6.60905 10.9379C6.73194 10.9882 6.86362 11.0135 6.9964 11.0123C7.12918 11.0112 7.2604 10.9836 7.3824 10.9312C7.50441 10.8788 7.61475 10.8026 7.707 10.7071L11.707 6.70709C11.8001 6.6142 11.874 6.50385 11.9244 6.38236C11.9748 6.26087 12.0008 6.13063 12.0008 5.99909C12.0008 5.86756 11.9748 5.73731 11.9244 5.61582C11.874 5.49433 11.8001 5.38398 11.707 5.29109L7.707 1.29109C7.51923 1.10358 7.26466 0.998348 6.99929 0.998535C6.73393 0.998723 6.47951 1.10432 6.292 1.29209C6.10449 1.47986 5.99926 1.73443 5.99944 1.9998C5.99963 2.26516 6.10523 2.51958 6.293 2.70709L8.586 5.00009H1C0.734784 5.00009 0.48043 5.10545 0.292893 5.29298C0.105357 5.48052 0 5.73488 0 6.00009C0 6.26531 0.105357 6.51966 0.292893 6.7072C0.48043 6.89473 0.734784 7.00009 1 7.00009Z"
                  fill="#414141"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_3509">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span>31/12/2024</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* Commercial Property */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image
                src="/icons/commercial.svg"
                alt="commercial"
                width={24}
                height={24}
              />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                Commercial property 1
              </div>
              <div className="text-sm text-gray-500">Tenant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="text-sm text-gray-500">
        Missing one or more properties? If you have a syndic or steward for
        another property who also uses SNDQ you can ask them for an access code.
        Enter the access code in your personal settings to gain access to these
        properties.
      </div>

      {/* Continue Button */}
      <Button onClick={() => onContinue(loginData)}>Continue</Button>
    </div>
  );
}
