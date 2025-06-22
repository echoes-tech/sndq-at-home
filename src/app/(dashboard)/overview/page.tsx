"use client";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/stores/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function DashboardOverviewPage() {
  const { user, logout } = useAuthStore();
  const data = {
    owner: {
      name: "Residentie d'Urville",
      address: "Zuidstraat 31, 8820 Torhout",
      units: [
        {
          type: "apartment",
          name: "Apartment 101",
          role: "Owner",
          // paymentsDue: 2,
          href: "/(dashboard)/apartment-101",
        },
        {
          type: "storage",
          name: "Storage unit 1",
          role: "Owner",
          href: "/(dashboard)/storage-1",
        },
        {
          type: "garage",
          name: "Garagebox 1",
          role: "Owner",
          href: "/(dashboard)/garagebox-1",
        },
      ],
    },
    lease: {
      name: "CommLease_Meir1_2024",
      startDate: "01/01/2024",
      endDate: "31/12/2024",
      units: [
        {
          type: "commercial",
          name: "Commercial property 1",
          role: "Tenant",
          href: "/(dashboard)/commercial-1",
        },
      ],
    },
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/icons/logo.svg"
                alt="SNDQ Logo"
                width={32}
                height={32}
              />
            </div>

            {/* User Avatar and Logout */}
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
              <div className="flex items-center cursor-pointer">
                <Avatar>
                  <AvatarFallback className="bg-green-100 text-green-900 font-medium text-sm">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 flex justify-start items-center px-8">
        <div className="py-4">
          <div className="text-lg font-semibold text-gray-900">
            Welcome back {user?.name}
          </div>
          <div className="text-sm text-gray-500">
            Select a building or lease to continue
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[720px] mx-auto py-8 px-4">
        {/* Building cards */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4">
          <div className="p-3 border-b border-gray-200">
            <div className="font-semibold text-gray-900">
              {data?.owner?.name}
            </div>
            <div className="text-sm text-gray-500">{data?.owner?.address}</div>
          </div>
          <div className="space-y-1">
            {data?.owner?.units?.map((u) => (
              <Link
                key={u?.name}
                href={u?.href}
                className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <Image
                      src={`/icons/${u?.type}.svg`}
                      alt={u?.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{u?.name}</div>
                    <div className="text-sm text-gray-500">{u?.role}</div>
                  </div>
                </div>
                {/* {u.paymentsDue && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-medium">
                        {u.paymentsDue} payments due
                        </span>
                    )} */}
              </Link>
            ))}
          </div>
        </div>

        {/* Lease cards */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4">
          <div className="p-3 border-b border-gray-200">
            <div className="font-semibold text-gray-900">
              {data?.lease?.name}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">{data?.lease?.startDate}</span>
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 6.00009H8.586L6.293 8.29309C6.19749 8.38534 6.12131 8.49568 6.0689 8.61769C6.01649 8.73969 5.9889 8.87091 5.98775 9.00369C5.9866 9.13647 6.0119 9.26815 6.06218 9.39105C6.11246 9.51394 6.18671 9.62559 6.2806 9.71949C6.3745 9.81338 6.48615 9.88763 6.60905 9.93791C6.73194 9.98819 6.86362 10.0135 6.9964 10.0123C7.12918 10.0112 7.2604 9.9836 7.3824 9.93119C7.50441 9.87878 7.61475 9.8026 7.707 9.70709L11.707 5.70709C11.8001 5.6142 11.874 5.50385 11.9244 5.38236C11.9748 5.26087 12.0008 5.13063 12.0008 4.99909C12.0008 4.86756 11.9748 4.73731 11.9244 4.61582C11.874 4.49433 11.8001 4.38398 11.707 4.29109L7.707 0.291092C7.51923 0.103583 7.26466 -0.00165213 6.99929 -0.00146459C6.73393 -0.00127706 6.47951 0.104318 6.292 0.292092C6.10449 0.479865 5.99926 0.734435 5.99944 0.999799C5.99963 1.26516 6.10523 1.51958 6.293 1.70709L8.586 4.00009H1C0.734784 4.00009 0.48043 4.10545 0.292893 4.29298C0.105357 4.48052 0 4.73488 0 5.00009C0 5.26531 0.105357 5.51966 0.292893 5.7072C0.48043 5.89473 0.734784 6.00009 1 6.00009Z"
                  fill="#414141"
                />
              </svg>
              <span className="font-medium">{data?.lease?.endDate}</span>
            </div>
          </div>
          <div className="space-y-1">
            {data?.lease?.units?.map((u) => (
              <Link
                key={u?.name}
                href={u?.href}
                className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <Image
                      src={`/icons/${u?.type}.svg`}
                      alt={u?.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{u?.name}</div>
                    <div className="text-sm text-gray-500">{u?.role}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
