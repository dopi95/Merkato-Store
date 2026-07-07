"use client";
import { useState } from "react";
import { useLang } from "../../context/LangContext";
import { FiSearch, FiPackage, FiTruck, FiCheck, FiClock } from "react-icons/fi";

const MOCK = {
  "MRK-123456": {
    en: { status: "Out for Delivery", eta: "Today by 8 PM", items: "Samsung Galaxy S24 Ultra × 1", steps: ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"] },
    ar: { status: "في الطريق إليك", eta: "اليوم قبل 8 مساءً", items: "سامسونج جالاكسي S24 Ultra × 1", steps: ["تم الطلب", "قيد المعالجة", "تم الشحن", "في الطريق", "تم التسليم"] },
    step: 3,
  },
};

const t = {
  en: {
    badge: "Order Tracking",
    title: "Track your",
    titleAccent: "order",
    sub: "Enter your order number to get real-time updates on your delivery.",
    placeholder: "e.g. MRK-123456",
    label: "Order Number",
    btn: "Track Order",
    notFound: "No order found with that number. Please check and try again.",
    eta: "Estimated Delivery",
    items: "Items",
    hint: "Try: MRK-123456",
  },
  ar: {
    badge: "تتبع الطلب",
    title: "تتبع",
    titleAccent: "طلبك",
    sub: "أدخل رقم طلبك للحصول على تحديثات فورية حول توصيلك.",
    placeholder: "مثال: MRK-123456",
    label: "رقم الطلب",
    btn: "تتبع الطلب",
    notFound: "لم يُعثر على طلب بهذا الرقم. يرجى التحقق والمحاولة مجدداً.",
    eta: "التسليم المتوقع",
    items: "المنتجات",
    hint: "جرّب: MRK-123456",
  },
};

export default function TrackPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = t[isAR ? "ar" : "en"];
  const br = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  function handleTrack(e) {
    e.preventDefault();
    const found = MOCK[query.trim().toUpperCase()];
    if (found) { setResult(found); setNotFound(false); }
    else { setResult(null); setNotFound(true); }
  }

  const stepIcons = [FiPackage, FiClock, FiTruck, FiTruck, FiCheck];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0a500]/15 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold uppercase tracking-widest">{c.badge}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            {c.title} <span className="text-[#f0a500]">{c.titleAccent}</span>
          </h1>
          <p className={`text-sm sm:text-base max-w-md ${muted}`}>{c.sub}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-6">

        {/* Search form */}
        <form onSubmit={handleTrack} className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6 flex flex-col gap-4`}>
          <label className={`text-xs font-bold uppercase tracking-widest ${muted}`}>{c.label}</label>
          <div className="flex gap-2">
            <div className={`flex items-center flex-1 rounded-xl border ${br} bg-gray-50 dark:bg-[#0f0f1a] focus-within:border-[#f0a500] transition-all overflow-hidden`}>
              <span className="px-3 text-[#f0a500]"><FiSearch size={15} /></span>
              <input
                type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder={c.placeholder} dir="ltr"
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30 py-3 outline-none"
              />
            </div>
            <button type="submit" className="shrink-0 bg-[#f0a500] hover:bg-[#c97000] active:scale-[0.98] transition-all rounded-xl px-5 py-3 text-white text-sm font-bold cursor-pointer shadow-sm shadow-[#f0a500]/30">
              {c.btn}
            </button>
          </div>
          <p className={`text-xs ${muted}`}>{c.hint}</p>
        </form>

        {/* Not found */}
        {notFound && (
          <div className={`rounded-2xl bg-white dark:bg-[#13112a] border border-[#e05c5c]/30 p-6 text-center`}>
            <p className="text-2xl mb-2">📦</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-white/70">{c.notFound}</p>
          </div>
        )}

        {/* Result */}
        {result && (() => {
          const d = result[isAR ? "ar" : "en"];
          return (
            <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6 flex flex-col gap-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest ${muted}`}>{c.items}</p>
                  <p className="font-bold text-gray-800 dark:text-white text-sm mt-1">{d.items}</p>
                </div>
                <div className="text-right sm:text-left">
                  <p className={`text-xs font-bold uppercase tracking-widest ${muted}`}>{c.eta}</p>
                  <p className="font-bold text-[#f0a500] text-sm mt-1">{d.eta}</p>
                </div>
              </div>

              {/* Steps */}
              <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
                {d.steps.map((step, i) => {
                  const Icon = stepIcons[i];
                  const done = i <= result.step;
                  const active = i === result.step;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${active ? "bg-[#f0a500] border-[#f0a500] text-white" : done ? "bg-[#f0a500]/20 border-[#f0a500]/40 text-[#f0a500]" : `border-gray-200 dark:border-white/10 ${muted}`}`}>
                        <Icon size={14} />
                      </div>
                      <p className={`text-[10px] font-semibold text-center leading-tight ${active ? "text-[#f0a500]" : done ? "text-gray-600 dark:text-white/60" : muted}`}>{step}</p>
                      {i < d.steps.length - 1 && (
                        <div className={`absolute hidden`} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-[#f0a500]/10 border border-[#f0a500]/20`}>
                <FiTruck size={16} className="text-[#f0a500] shrink-0" />
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{d.status}</p>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
