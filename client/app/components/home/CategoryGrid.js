"use client";
import Link from "next/link";
import { MdDevices, MdOutlineCheckroom, MdOutlineShoppingCart, MdOutlineSpa, MdOutlineChair, MdOutlineDiamond } from "react-icons/md";
import { useLang } from "../../context/LangContext";

const categories = [
  { cat: "electronics", icon: <MdDevices size={28} />,            en: "Electronics",  ar: "الإلكترونيات",       color: "#3b82f6", bg: "#3b82f615" },
  { cat: "fashion",     icon: <MdOutlineCheckroom size={28} />,   en: "Fashion",      ar: "الأزياء",            color: "#ec4899", bg: "#ec489915" },
  { cat: "groceries",   icon: <MdOutlineShoppingCart size={28} />, en: "Groceries",   ar: "البقالة",            color: "#22c55e", bg: "#22c55e15" },
  { cat: "beauty",      icon: <MdOutlineSpa size={28} />,          en: "Beauty",      ar: "التجميل",            color: "#a855f7", bg: "#a855f715" },
  { cat: "household",   icon: <MdOutlineChair size={28} />,        en: "Household",   ar: "المستلزمات المنزلية", color: "#f0a500", bg: "#f0a50015" },
  { cat: "accessories", icon: <MdOutlineDiamond size={28} />,      en: "Accessories", ar: "الإكسسوارات",        color: "#14b8a6", bg: "#14b8a615" },
];

export default function CategoryGrid() {
  const { lang } = useLang();
  const isAR = lang === "ar";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 mt-6 sm:mt-8 md:mt-10" dir={isAR ? "rtl" : "ltr"}>

      {/* Header */}
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#f0a500] mb-1.5">
            {isAR ? "استكشف" : "Explore"}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight">
            {isAR ? "تسوق حسب الفئة" : "Shop by Category"}
          </h2>
        </div>
        <Link href="/products" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#f0a500]/40 text-xs sm:text-sm font-semibold text-[#f0a500] hover:bg-[#f0a500] hover:text-white hover:border-[#f0a500] transition-all shrink-0">
          {isAR ? "عرض الكل" : "View All"}
        </Link>
      </div>

      {/* Grid — 3 cols on mobile, 6 on lg */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.en}
            href={`/products?cat=${cat.cat}`}
            className="group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#13112a] hover:border-[#f0a500]/40 hover:shadow-lg hover:shadow-[#f0a500]/5 transition-all duration-200"
          >
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ color: cat.color, backgroundColor: cat.bg }}
            >
              {cat.icon}
            </div>
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 dark:text-white/80 text-center group-hover:text-[#f0a500] transition-colors leading-tight">
              {isAR ? cat.ar : cat.en}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
