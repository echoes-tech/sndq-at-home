"use client";
import { useState } from "react";
import Header from "./components/Header";
import SearchSort from "./components/SearchSort";
import UserTable from "./components/UserTable";
import { USERS } from "./mock/users";
import { User } from "@/lib/types/user";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("lastLogin");
  const [users, setUsers] = useState<User[]>(USERS);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCouncilChange = (userId: string, value: boolean) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, is_council_member: value } : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto py-6 px-4">
        <Header />
        <SearchSort
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <UserTable users={filtered} onCouncilChange={handleCouncilChange} />
      </div>
    </div>
  );
}
