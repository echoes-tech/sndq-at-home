"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routePaths } from "@/lib/constants/system";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(routePaths.welcome);
  }, [router]);

  return null;
}
