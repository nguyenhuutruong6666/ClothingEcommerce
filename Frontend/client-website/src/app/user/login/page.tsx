"use client";

import { LoginForm } from "@/components/ui/login-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";

export default function LoginPage() {
  const { authUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Nếu đã có user trong localStorage, redirect về /user
    // (trường hợp user đã login trước đó và localStorage còn data)
    if (authUser) {
      router.replace("/user");
    }
  }, [authUser, router]);

  // Nếu đã có user thì không render form
  if (authUser) {
    return null;
  }

  return (
    <div className="bg-muted flex min-h-[calc(100vh-220px)] flex-col items-center justify-center gap-6 py-8 sm:py-10 lg:py-12 px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
