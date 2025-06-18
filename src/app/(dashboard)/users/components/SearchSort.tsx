import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface SearchSortProps {
  search: string;
  setSearch: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function SearchSort({
  search,
  setSearch,
  sortBy,
  setSortBy,
}: SearchSortProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Find user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 border-gray-300"
        />
      </div>

      <div className="flex items-center gap-2">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-auto border border-gray-300 bg-transparent shadow-none text-sm font-medium text-gray-900 px-3 py-2 h-auto gap-1 rounded-md">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600"
            >
              <path d="m3 16 4 4 4-4" />
              <path d="m7 20V4" />
              <path d="m21 8-4-4-4 4" />
              <path d="m17 4v16" />
            </svg>
            <span className="text-sm text-gray-600">Sorted by</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastLogin">Last login</SelectItem>
            <SelectItem value="activation">Activation</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
