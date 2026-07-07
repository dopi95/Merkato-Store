"use client";
import { useState } from "react";
import Link from "next/link";
import { FiPackage, FiTruck, FiCheck, FiClock, FiChevronDown, FiChevronUp, FiShoppingBag } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useLang } from "../../../context/LangContext";
import { useCurrency } from "../../../context/CurrencyContext";

const ORDERS = [
  {
    id: "MRK-001A2B", date: "Dec 12, 2024", status: "delivered",
    total: 168, shipping: 0,
    items: [
      { name: "Wireless Noise-Cancelling Headphones", nameAR: "سماعات لاسلكية بإلغاء الضوضاء", emoji: "🎧", price: 79, qty: 1 },
      { name: "Premium Running Sneakers", nameAR: "حذاء رياضي فاخر للجري", emoji: "👟", price: 89, qty: 1 },
    ],
    address: "123 Main St, New York, US",
    payment: "Visa •••• 4242",
  },
  {
    id: "MRK-003C4D", date: "Dec 28, 2024", status: "shipped",
    total: 349, shipping: 0,
    items: [
      { name: '4K Ultra Smart TV 55"', nameAR: 'تلفاز ذكي 4K 55"', emoji: "📺", price: 349, qty: 1 },
    ],
    address: "456 Oak Ave, Dubai, UAE",
    payment: "Mastercard •••• 8888",
  },
  {
    id: "MRK-005E6F", date: "Jan 3, 2025", status: "processing",
    total: 113, shipping: 9.99,
    items: [
      { name: "Matte Lipstick Collection", nameAR: "مجموعة أحمر الشفاه المطفي", emoji: "💄", price: 18, qty: 2 },
      { name: "Retinol Night Cream",       nameAR: "كريم ليلي بالريتينول",       emoji: "🌙", price: 42, qty: 1 },
      { name: "Vitamin C Brightening Serum", nameAR: "سيروم فيتامين C المضيء",  emoji: "💆", price: 35, qty: 1 },
    ],
    address: "789 Nile Rd, Cairo, EG",
    payment: "PayPal",
  },
  {
    id: "MRK-007G8H", date: "Nov 5, 2024", status: "delivered",
    total: 55, shipping: 0,
    items: [
      { name: "Canvas Backpack 25L", nameAR: "حقيبة ظهر قماشية 25 لتر", emoji: "🎒", price: 55, qty: 1 },
    ],
    address: "321 Green St, Nairobi, KE",
    payment: "M-Pesa",
  },
  {
    id: "MRK-009I0J", date: "Oct 18, 2024", status: "delivered",
    total: 199, shipping: 0,
    items: [
      { name: "Smart Robot Vacuum Cleaner", nameAR: "مكنسة روبوتية ذكية", emoji: "🤖", price: 199, qty: 1 },
    ],
    address: "123 Main St, New York, US",
    payment: "Visa •••• 4242",
  },
];

const STATUS = {
  delivered:  { en: "Delivered",  ar: "تم التوصيل",  cls: "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20", icon: <FiCheck size={11} /> },
  shipped:    { en: "Shipped",    ar: "تم الشحن",    cls: "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20", icon: <FiTruck size={11} /> },
  processing: { en: "Processing", ar: "قيد المعالجة", cls: "bg-[#f0a500]/10 text-[#f0a500] border-[#f0a500]/20", icon: <FiClock size={11} /> },
};

const FILTERS = [
  { key: "all",        en: "All Orders", ar: "كل الطلبات" },
  { key: "processing", en: "Processing", ar: "قيد المعالجة" },
  { key: "shipped",    en: "Shipped",    ar: "تم الشحن" },
  { key: "delivered",  en: "Delivered",  ar: "تم التوصيل" },
];

export default function OrdersPage() {
  const { lang } = useLang();
  const { sign, convertPrice } = useCurrency();
  const isAR = lang === "ar";

  const [filter,   setFilter]   = useState("all");
  const [expanded, setExpanded] = useState(null);

  const shown = filter === "all" ? ORDERS : ORDERS.filter(o => o.status === filter);

  const nBg  = "bg-white dark:bg-[#13112a]";
  const br   = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  return (
    <div className="flex flex-col gap-5">

      <div>
        <h1 className="text-lg font-extrabold text-gray-800 dark:text-white">
          {isAR ? "طلباتي" : "My Orders"}
        </h1>
        <p className={`text-xs ${muted} mt-0.5`}>
          {ORDERS.length} {isAR ? "طلب" : "orders"} {isAR ? "في حسابك" : "in your account"}
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              filter === f.key
                ? "bg-[#f0a500] border-[#f0a500] text-white"
                : `${br} ${muted} hover:border-[#f0a500]/50 hover:text-[#f0a500]`
            }`}
          >
            {isAR ? f.ar : f.en}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {shown.length === 0 ? (
        <div className={`${nBg} rounded-2xl border ${br} flex flex-col items-center justify-center py-16 gap-4`}>
          <FiPackage size={40} className={muted} />
          <p className="font-semibold text-gray-700 dark:text-white/70">{isAR ? "لا توجد طلبات" : "No orders found"}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {shown.map(order => {
            const s = STATUS[order.status];
            const isOpen = expanded === order.id;
            return (
              <div key={order.id} className={`${nBg} rounded-2xl border ${br} overflow-hidden`}>
                {/* Order header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : order.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors cursor-pointer"
                >
                  {/* Emoji cluster */}
                  <div className="flex -space-x-2 shrink-0">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 border-2 border-white dark:border-[#13112a] flex items-center justify-center text-xl">
                        {item.emoji}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-gray-800 dark:text-white font-mono">{order.id}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${s.cls}`}>
                        {s.icon} {isAR ? s.ar : s.en}
                      </span>
                    </div>
                    <p className={`text-xs ${muted} mt-0.5`}>
                      {order.date} · {order.items.length} {isAR ? "منتجات" : "items"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="text-sm font-extrabold text-gray-800 dark:text-white">{sign}{convertPrice(order.total)}</p>
                    {isOpen ? <FiChevronUp size={15} className={muted} /> : <FiChevronDown size={15} className={muted} />}
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className={`border-t ${br} px-5 py-4 flex flex-col gap-4`}>
                    {/* Items */}
                    <div className="flex flex-col gap-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center text-xl shrink-0">{item.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{isAR ? item.nameAR : item.name}</p>
                            <p className={`text-[10px] ${muted}`}>× {item.qty}</p>
                          </div>
                          <p className="text-sm font-bold text-gray-800 dark:text-white shrink-0">{sign}{convertPrice(item.price * item.qty)}</p>
                        </div>
                      ))}
                    </div>

                    <div className={`border-t ${br}`} />

                    {/* Meta */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {[
                        { label: isAR ? "عنوان الشحن" : "Ship to",    val: order.address },
                        { label: isAR ? "طريقة الدفع" : "Payment",    val: order.payment },
                        { label: isAR ? "الشحن" : "Shipping",         val: order.shipping === 0 ? (isAR ? "مجاني" : "Free") : `${sign}${convertPrice(order.shipping)}` },
                      ].map((m, i) => (
                        <div key={i} className="flex flex-col gap-0.5">
                          <p className={`font-bold uppercase tracking-widest text-[#f0a500] text-[9px]`}>{m.label}</p>
                          <p className="text-gray-700 dark:text-white/70 font-medium">{m.val}</p>
                        </div>
                      ))}
                    </div>

                    <div className={`border-t ${br} flex items-center justify-between pt-2`}>
                      <span className="text-xs font-bold text-gray-800 dark:text-white">{isAR ? "الإجمالي المدفوع" : "Total Paid"}</span>
                      <span className="text-base font-extrabold text-[#f0a500]">{sign}{convertPrice(order.total)}</span>
                    </div>

                    {order.status === "delivered" && (
                      <Link
                        href="/products"
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#f0a500]/10 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold hover:bg-[#f0a500] hover:text-white transition-all"
                      >
                        <FiShoppingBag size={13} />
                        {isAR ? "إعادة الطلب" : "Buy Again"}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
