"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiCheck, FiX } from "react-icons/fi";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

function VerifyEmailContent() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) { setStatus("error"); setMessage("No token provided."); return; }
    axios.get(`${API}/auth/verify-email?token=${token}`)
      .then((r) => { setStatus("success"); setMessage(r.data.message); })
      .catch((err) => { setStatus("error"); setMessage(err.response?.data?.message || "Verification failed."); });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#07070f] p-4">
      <div className="bg-white dark:bg-[#111120] rounded-2xl p-10 max-w-sm w-full text-center shadow-2xl border border-gray-200 dark:border-white/8">
        {status === "loading" && (
          <span className="w-10 h-10 rounded-full border-4 border-[#f0a500]/30 border-t-[#f0a500] animate-spin inline-block" />
        )}
        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/15 border border-green-300 dark:border-green-500/30 flex items-center justify-center mb-5 mx-auto">
              <FiCheck size={28} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Verified!</h2>
            <p className="text-sm text-gray-400 dark:text-white/40 mb-6">{message}</p>
            <Link href="/signin" className="w-full inline-flex items-center justify-center bg-[#f0a500] hover:bg-[#c97000] transition-all rounded-xl py-3 text-white text-sm font-bold">
              Sign In
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/15 border border-red-300 dark:border-red-500/30 flex items-center justify-center mb-5 mx-auto">
              <FiX size={28} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Verification Failed</h2>
            <p className="text-sm text-gray-400 dark:text-white/40 mb-6">{message}</p>
            <Link href="/signin" className="text-sm text-[#f0a500] hover:underline">Back to Sign In</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
