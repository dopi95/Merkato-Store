"use client";
import Link from "next/link";
import { FiShoppingBag, FiHeart, FiMapPin, FiArrowRight, FiArrowLeft, FiPackage, FiTruck, FiCheck, FiClock } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useLang } from "../../context/LangContext";
import { useCurrency } from "../../context/CurrencyContext";

const ORDERS = [
  { id: "MRK-001A2B", date: "Dec 12, 2024", status: "delivered", total: 168, items: 3, products: ["🎧", "👟", "🧴"] },
  { id: "MRK-003C4D", date: "Dec 28, 2024", status: "shipped",   total: 349, items: 1, products: ["📺"] },
  { id: "MRK-005E6F", date: "Jan 3, 2025",  status: "processing",total: 113, items: 2, products: ["💄", "🌙"] },
];

const STATUS_STYLE = {
  delivered:  { en: "Delivered",  ar: "تم التوصيل",  cls: "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20", icon: <FiCheck size={11} /> },
  shipped:    { en: "Shipped",    ar: "تم الشحن",    cls: "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20", icon: <FiTruck size={11} /> },
  processing: { en: "Processing", ar: "قيد المعالجة", cls: "bg-[#f0a500]/10 text-[#f0a500] border-[#f0a500]/20", icon: <FiClock size={11} /> },
};

export default function DashboardOverview() {
  const { user }   = useAuth();
  const { count: wishCount } = useWishlist();
  const { totalItems } = useCart();
  const { lang }   = useLang();
  const { sign, convertPrice } = useCurrency();
  const isAR = lang === "ar";

  const nBg  = "bg-white dark:bg-[#13112a]";
  const br   = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  const stats = [
    { icon: <FiShoppingBag size={18} />, en: "Total Orders",   ar: "إجمالي الطلبات", val: 12,          color: "text-[#f0a500] bg-[#f0a500]/10" },
    { icon: <FiPackage size={18} />,     en: "Delivered",       ar: "تم التوصيل",     val: 9,           color: "text-[#22c55e] bg-[#22c55e]/10" },
    { icon: <FiHeart size={18} />,       en: "Wishlist Items",  ar: "المفضلة",         val: wishCount,   color: "text-[#e05c5c] bg-[#e05c5c]/10" },
    { icon: <FiShoppingBag size={18} />, en: "Cart Items",      ar: "سلة التسوق",     val: totalItems,  color: "text-[#3b82f6] bg-[#3b82f6]/10" },
  ];

  const quickLinks = [
    { href: "/dashboard/orders",    icon: <FiShoppingBag size={16} />, en: "My Orders",    ar: "طلباتي"     },
    { href: "/dashboard/wishlist",  icon: <FiHeart size={16} />,       en: "Wishlist",     ar: "المفضلة"    },
    { href: "/dashboard/addresses", icon: <FiMapPin size={16} />,      en: "Addresses",    ar: "العناوين"   },
    { href: "/deals",               icon: <BsLightningChargeFill size={14} />, en: "Deals", ar: "العروض"   },
  ];

  return (
    <div className="flex flex-col gap-5">

      {/* Welcome */}
      <div className={`${nBg} rounded-2xl border ${br} p-6 flex items-center gap-4`}>
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f0a500] to-[#c97000] flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-lg shadow-[#f0a500]/30">
          {user.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <p className={`text-xs ${muted} mb-0.5`}>{isAR ? "مرحباً بك،" : "Welcome back,"}</p>
          <h1 className="text-xl font-extrabold text-gray-800 dark:text-white">{user.name} 👋</h1>
          <p className={`text-xs ${muted} mt-0.5`}>{isAR ? `عضو منذ ${user.joined}` : `Member since ${user.joined}`}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`${nBg} rounded-2xl border ${br} p-4 flex flex-col gap-2`}>
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</span>
            <p className="text-2xl font-extrabold text-gray-800 dark:text-white">{s.val}</p>
            <p className={`text-xs font-medium ${muted}`}>{isAR ? s.ar : s.en}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className={`${nBg} rounded-2xl border ${br} overflow-hidden`}>
        <div className={`flex items-center justify-between px-5 py-4 border-b ${br}`}>
          <h2 className="font-extrabold text-gray-800 dark:text-white text-sm">
            {isAR ? "أحدث الطلبات" : "Recent Orders"}
          </h2>
          <Link href="/dashboard/orders" className="flex items-center gap-1 text-xs font-semibold text-[#f0a500] hover:underline">
            {isAR ? "عرض الكل" : "View all"}
            {isAR ? <FiArrowLeft size={12} /> : <FiArrowRight size={12} />}
          </Link>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-white/5">
          {ORDERS.map(order => {
            const s = STATUS_STYLE[order.status];
            return (
              <div key={order.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors">
                <div className="flex -space-x-2 shrink-0">
                  {order.products.map((p, i) => (
                    <div key={i} className={`w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 border-2 border-white dark:border-[#13112a] flex items-center justify-center text-lg`}>{p}</div>
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 dark:text-white font-mono">{order.id}</p>
                  <p className={`text-xs ${muted}`}>{order.date} · {order.items} {isAR ? "منتجات" : "items"}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-sm font-extrabold text-gray-800 dark:text-white">{sign}{convertPrice(order.total)}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${s.cls}`}>
                    {s.icon} {isAR ? s.ar : s.en}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickLinks.map((l, i) => (
          <Link
            key={i}
            href={l.href}
            className={`${nBg} rounded-2xl border ${br} p-4 flex flex-col items-center gap-2 hover:border-[#f0a500]/30 hover:shadow-md transition-all text-center group`}
          >
            <span className="w-10 h-10 rounded-xl bg-[#f0a500]/10 flex items-center justify-center text-[#f0a500] group-hover:bg-[#f0a500] group-hover:text-white transition-all">
              {l.icon}
            </span>
            <span className={`text-xs font-semibold ${muted} group-hover:text-[#f0a500] transition-colors`}>
              {isAR ? l.ar : l.en}
            </span>
          </Link>
        ))}
      </div>

    </div>
  );
}
