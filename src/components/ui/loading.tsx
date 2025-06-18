import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <span className="inline-block w-12 h-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
    </div>
  );
}
