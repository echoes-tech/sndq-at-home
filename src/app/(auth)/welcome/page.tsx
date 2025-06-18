"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { Loading } from "@/components/ui";

export default function WelcomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="flex flex-col items-start gap-10 w-full max-w-md">
        <Image
          src="/icons/logo.svg"
          alt="SNDQ at Home Logo"
          width={40}
          height={40}
        />
        <div className="text-left w-full">
          <h2 className="text-2xl font-semibold mb-1">
            Welcome to SNDQ at Home
          </h2>
          <p className="mb-10 leading-relaxed">
            SNDQ at Home is an invite only platform for co-owners and tenants.
            If this is your first time logging in you should use the access code
            that was emailed to you.
          </p>
          <div className="flex gap-3 w-full">
            <Button variant="outline" className="flex-1 py-3">
              I have an account
            </Button>
            <Button className="flex-1 py-3">First time logging in</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
