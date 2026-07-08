"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    if (!token) { router.replace("/signin?error=google"); return; }
    loginWithToken(token).then(() => router.replace("/dashboard"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#07070f]">
      <span className="w-8 h-8 rounded-full border-2 border-[#f0a500]/30 border-t-[#f0a500] animate-spin" />
    </div>
  );
}
