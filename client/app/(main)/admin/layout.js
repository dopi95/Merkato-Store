"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut, FiShield } from "react-icons/fi";

export default function AdminLayout({ children }) {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/signin");
    else if (user?.role !== "admin") router.replace("/dashboard");
  }, [isLoggedIn, user, router]);

  if (!user || user.role !== "admin") return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#f0a500]/30 border-t-[#f0a500] animate-spin" />
    </div>
  );

  function handleLogout() { logout(); router.push("/"); }

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">
      <header className="bg-[#13112a] border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiShield size={20} className="text-[#f0a500]" />
          <span className="font-extrabold text-lg tracking-tight">Merkato <span className="text-[#f0a500]">Admin</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/50">{user.email}</span>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#e05c5c]/30 text-[#e05c5c] text-xs font-semibold hover:bg-[#e05c5c]/10 transition-colors cursor-pointer">
            <FiLogOut size={13} /> Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
