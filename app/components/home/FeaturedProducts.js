"use client";
import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useLang } from "../../context/LangContext";
import ProductCard from "./ProductCard";
import { products } from "../../data/products";

const tabs = [
  { key: "all",         en: "All",         ar: "الكل"          },
  { key: "electronics", en: "Electronics", ar: "الإلكترونيات"  },
  { key: "fashion",     en: "Fashion",     ar: "الأزياء"        },
  { key: "beauty",      en: "Beauty",      ar: "التجميل"        },
  { key: "household",   en: "Household",   ar: "المنزل"         },
  { key: "groceries",   en: "Groceries",   ar: "البقالة"         },
  { key: "accessories", en: "Accessories", ar: "الإكسسوارات"    },
];

export default function FeaturedProducts() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? products : products.filter((p) => p.cat === activeTab);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12" dir={isAR ? "rtl" : "ltr"}>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 flex-wrap gap-3">
        <div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-0.5 sm:mb-1">
            {isAR ? "مختارات" : "Handpicked"}
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-white">
            {isAR ? "المنتجات المميزة" : "Featured Products"}
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#f0a500] hover:underline shrink-0"
        >
          {isAR ? "عرض الكل" : "View All"}
          {isAR ? <FiArrowLeft size={13} /> : <FiArrowRight size={13} />}
        </Link>
      </div>

      {/* Tabs — scrollable on mobile */}
      <div className="flex items-center gap-2 mb-5 sm:mb-6 overflow-x-auto scrollbar-none pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeTab === tab.key
                ? "bg-[#f0a500] border-[#f0a500] text-white"
                : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:border-[#f0a500]/50 hover:text-[#f0a500]"
            }`}
          >
            {isAR ? tab.ar : tab.en}
          </button>
        ))}
      </div>

      {/* Grid — 2 cols mobile, 3 sm, 4 lg */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} isAR={isAR} />
        ))}
      </div>
    </section>
  );
}
