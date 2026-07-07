"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FiGrid, FiUser, FiShoppingBag, FiHeart, FiMapPin,
  FiLogOut, FiChevronRight,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useLang } from "../../context/LangContext";

const NAV = [
  { href: "/dashboard",           icon: FiGrid,        en: "Overview",      ar: "نظرة عامة"        },
  { href: "/dashboard/profile",   icon: FiUser,        en: "Personal Info", ar: "المعلومات الشخصية" },
  { href: "/dashboard/orders",    icon: FiShoppingBag, en: "My Orders",     ar: "طلباتي"            },
  { href: "/dashboard/wishlist",  icon: FiHeart,       en: "Wishlist",      ar: "المفضلة"           },
  { href: "/dashboard/addresses", icon: FiMapPin,      en: "Addresses",     ar: "العناوين"          },
];

const BOTTOM_TABS = [
  { href: "/dashboard",           icon: FiGrid,        en: "Home",    ar: "الرئيسية" },
  { href: "/dashboard/orders",    icon: FiShoppingBag, en: "Orders",  ar: "الطلبات"  },
  { href: "/dashboard/wishlist",  icon: FiHeart,       en: "Wishlist",ar: "المفضلة"  },
  { href: "/dashboard/addresses", icon: FiMapPin,      en: "Address", ar: "العناوين" },
  { href: "/dashboard/profile",   icon: FiUser,        en: "Profile", ar: "حسابي"    },
];

export default function DashboardLayout({ children }) {
  const { user, logout, isLoggedIn } = useAuth();
  const { lang } = useLang();
  const router   = useRouter();
  const pathname = usePathname();
  const isAR     = lang === "ar";

  useEffect(() => {
    if (!isLoggedIn) router.replace("/signin");
  }, [isLoggedIn, router]);

  if (!user) return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#f0a500]/30 border-t-[#f0a500] animate-spin" />
    </div>
  );

  function handleLogout() { logout(); router.push("/"); }

  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase();
  const nBg  = "bg-white dark:bg-[#13112a]";
  const br   = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-5 items-start">

          <aside
            className={`flex flex-col w-64 shrink-0 ${nBg} rounded-2xl border ${br} overflow-hidden sticky top-24`}
            style={{ minHeight: "calc(100vh - 120px)" }}
          >
            <div className="flex flex-col h-full">
              <div className={`p-5 border-b ${br}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f0a500] to-[#c97000] flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-lg shadow-[#f0a500]/30">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 dark:text-white text-sm truncate">{user.name}</p>
                    <p className={`text-xs ${muted} truncate`}>{user.email}</p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
                {NAV.map(({ href, icon: Icon, en, ar }) => {
                  const active = pathname === href;
                  return (
                    <Link key={href} href={href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-[#f0a500]/10 text-[#f0a500] border border-[#f0a500]/20"
                          : `${muted} hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white border border-transparent`
                      }`}
                    >
                      <Icon size={16} className={active ? "text-[#f0a500]" : ""} />
                      <span className="flex-1">{isAR ? ar : en}</span>
                      {active && <FiChevronRight size={13} className="text-[#f0a500] opacity-60" />}
                    </Link>
                  );
                })}
              </nav>

              <div className={`p-3 border-t ${br}`}>
                <button onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${muted} hover:bg-[#e05c5c]/10 hover:text-[#e05c5c] border border-transparent transition-all cursor-pointer`}
                >
                  <FiLogOut size={16} />
                  {isAR ? "تسجيل الخروج" : "Log Out"}
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden flex flex-col min-h-screen">

        {/* Mobile top bar */}
        <div className={`${nBg} border-b ${br} px-4 py-3 flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f0a500] to-[#c97000] flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-800 dark:text-white text-sm leading-tight truncate">{user.name}</p>
              <p className={`text-[11px] ${muted} truncate`}>{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#e05c5c]/30 text-[#e05c5c] text-xs font-semibold hover:bg-[#e05c5c]/10 transition-colors cursor-pointer shrink-0 ml-3"
          >
            <FiLogOut size={13} />
            {isAR ? "خروج" : "Logout"}
          </button>
        </div>

        {/* Mobile main content */}
        <main className="flex-1 px-4 py-4 pb-28 overflow-y-auto">
          {children}
        </main>

        {/* Mobile bottom tab bar */}
        <nav className={`fixed bottom-0 left-0 right-0 z-50 ${nBg} border-t ${br}`}>
          <div className="flex items-stretch h-16">
            {BOTTOM_TABS.map(({ href, icon: Icon, en, ar }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                    active ? "text-[#f0a500]" : muted
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                    active ? "bg-[#f0a500]/10" : ""
                  }`}>
                    <Icon size={19} />
                  </div>
                  <span className="text-[10px] font-semibold leading-none">{isAR ? ar : en}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

    </div>
  );
}
