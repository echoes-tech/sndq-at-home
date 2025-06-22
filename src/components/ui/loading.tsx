import React from "react";

export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    </div>
  );
}
