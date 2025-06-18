import { DataTable } from "@/components/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/user";
import { Column } from "@/lib/types/table";
import { formatDate } from "@/lib/utils/helper";
import { useMemo } from "react";
import { getInitials, getRandomAvatarColor } from "@/lib/utils/color";

interface UserTableProps {
  users: User[];
  onCouncilChange: (userId: string, value: boolean) => void;
}

export default function UserTable({ users, onCouncilChange }: UserTableProps) {
  const userColors = useMemo(() => {
    const colors: Record<string, { bgColor: string; textColor: string }> = {};
    users.forEach((user) => {
      colors[user.id] = getRandomAvatarColor();
    });
    return colors;
  }, [users]);

  const columns: Column<User>[] = [
    {
      header: "User",
      cell: (user) => {
        const colors = userColors[user.id];
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center ${colors.bgColor} ${colors.textColor}`}
                >
                  {getInitials(user?.name)}
                </div>
              )}
            </div>
            <div>
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500">{user.info}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "",
      cell: (user) => (
        <div className="flex justify-center">
          <span className="text-base mr-2">Co-owner council</span>
          <Switch
            checked={user.council}
            onCheckedChange={(checked) => onCouncilChange(user.id, checked)}
            className="data-[state=checked]:bg-blue-800 data-[state=unchecked]:bg-gray-300"
          />
        </div>
      ),
      className: "text-center",
    },
    {
      header: "Activation",
      accessorKey: "activation" as keyof User,
      cell: (user) => (
        <div className="">
          <div className="text-base">
            {formatDate(user.activation, "MMM d, yyyy")}
          </div>
          <div className="text-sm text-gray-500">
            {formatDate(user.activation, "hh:mm")}
          </div>
        </div>
      ),
    },
    {
      header: "Last login",
      accessorKey: "lastLogin" as keyof User,
      cell: (user) => (
        <div className="">
          <div className="text-base">
            {formatDate(user.lastLogin, "MMM d, yyyy")}
          </div>
          <div className="text-sm text-gray-500">
            {formatDate(user.lastLogin, "hh:mm")}
          </div>
        </div>
      ),
    },
    {
      header: "",
      cell: (user) => (
        <div className="flex items-center">
          {user.status === "Active" && (
            <div className="text-green-700 bg-green-50 font-medium px-4 py-1.5 rounded-sm">
              Active
            </div>
          )}
          {user.status === "Disabled" && (
            <div className="text-red-700 bg-red-50 font-medium px-4 py-1.5 rounded-sm">
              Disabled
            </div>
          )}
          {user.status === "Inactive" && (
            <div className="text-gray-600 bg-gray-50 font-medium px-4 py-1.5 rounded-sm">
              Inactive
            </div>
          )}
        </div>
      ),
    },
    {
      header: "",
      cell: () => (
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <svg
            width="4"
            height="16"
            viewBox="0 0 4 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4ZM2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 0 6.89543 0 8C0 9.10457 0.89543 10 2 10ZM4 14C4 15.1046 3.10457 16 2 16C0.89543 16 0 15.1046 0 14C0 12.8954 0.89543 12 2 12C3.10457 12 4 12.8954 4 14Z"
              fill="#242424"
            />
          </svg>
        </Button>
      ),
      className: "w-10",
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      className="bg-white border-gray-200 overflow-hidden"
    />
  );
}
