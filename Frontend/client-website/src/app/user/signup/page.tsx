"use client";

import { SignupForm } from "@/components/ui/signup-form";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { SignUpData } from "@/types";
export default function SignupPage() {
  const router = useRouter();
  const { signup, isSigningUp } = useAuthStore();

  const handleSignup = async (data: SignUpData) => {
    try {
      await signup({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      router.push("/user/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="bg-muted flex min-h-[calc(100vh-220px)] flex-col items-center justify-center gap-6 py-8 sm:py-10 lg:py-12 px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-24">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignupForm handleSignup={handleSignup} isLoading={isSigningUp} />
      </div>
    </div>
  );
}
