"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiHeart, FiShoppingBag, FiStar, FiCheck, FiArrowLeft, FiArrowRight, FiShare2, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useLang } from "../../../context/LangContext";
import { useCurrency } from "../../../context/CurrencyContext";
import { getProductById, getRelatedProducts } from "../../../data/products";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const { lang } = useLang();
  const { convertPrice, sign } = useCurrency();
  const isAR = lang === "ar";

  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const [qty,    setQty]    = useState(1);
  const [wished, setWished] = useState(false);
  const [tab,    setTab]    = useState("desc");
  const [added,  setAdded]  = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const nBg  = "bg-white dark:bg-[#13112a]";
  const br   = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ── BREADCRUMB ── */}
        <nav className={`flex items-center gap-1.5 text-xs ${muted} mb-6`}>
          <Link href="/" className="hover:text-[#f0a500] transition-colors">{isAR ? "الرئيسية" : "Home"}</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#f0a500] transition-colors">{isAR ? "المنتجات" : "Products"}</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-white/70 truncate max-w-[140px]">
            {isAR ? product.nameAR : product.name}
          </span>
        </nav>

        {/* ── MAIN PRODUCT CARD ── */}
        <div className={`${nBg} rounded-2xl border ${br} overflow-hidden mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* Image Panel */}
            <div className="relative bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center min-h-64 md:min-h-80 p-8">
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {discount && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e05c5c] text-white text-xs font-bold">
                    <BsLightningChargeFill size={10} /> -{discount}%
                  </span>
                )}
                {product.isNew && (
                  <span className="px-2.5 py-1 rounded-full bg-[#22c55e] text-white text-xs font-bold">
                    {isAR ? "جديد" : "New"}
                  </span>
                )}
              </div>
              {/* Wishlist + Share */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setWished(!wished)}
                  className={`w-9 h-9 rounded-full bg-white dark:bg-[#13112a] border ${br} flex items-center justify-center hover:border-[#f0a500]/50 transition-all shadow-sm cursor-pointer`}
                >
                  <FiHeart size={15} className={wished ? "fill-[#e05c5c] text-[#e05c5c]" : "text-gray-400 dark:text-white/40"} />
                </button>
                <button className={`w-9 h-9 rounded-full bg-white dark:bg-[#13112a] border ${br} flex items-center justify-center hover:border-[#f0a500]/50 transition-all shadow-sm cursor-pointer ${muted} hover:text-[#f0a500]`}>
                  <FiShare2 size={15} />
                </button>
              </div>
              {/* Emoji product image */}
              <span className="text-[120px] sm:text-[150px] leading-none select-none drop-shadow-lg">
                {product.emoji}
              </span>
            </div>

            {/* Info Panel */}
            <div className="flex flex-col gap-4 p-6 md:p-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#f0a500] mb-1">{product.brand}</p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-white leading-tight">
                  {isAR ? product.nameAR : product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={14} className={i < Math.floor(product.rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/20"} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-white/80">{product.rating}.0</span>
                <span className={`text-sm ${muted}`}>({product.reviews} {isAR ? "تقييم" : "reviews"})</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white">
                  {sign}{convertPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className={`text-base ${muted} line-through`}>
                    {sign}{convertPrice(product.originalPrice)}
                  </span>
                )}
                {discount && (
                  <span className="text-sm font-bold text-[#22c55e]">
                    {isAR ? `وفر ${discount}%` : `Save ${discount}%`}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] shrink-0" />
                <span className="text-sm text-[#22c55e] font-medium">
                  {isAR ? `متوفر (${product.stock} قطعة)` : `In Stock (${product.stock} units)`}
                </span>
              </div>

              {/* Qty + Add to cart */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className={`flex items-center rounded-xl border ${br} ${nBg} overflow-hidden`}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className={`px-4 py-3 text-lg font-bold ${muted} hover:text-[#f0a500] hover:bg-[#f0a500]/5 transition-colors cursor-pointer`}
                  >−</button>
                  <span className="w-10 text-center font-semibold text-gray-800 dark:text-white text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                    className={`px-4 py-3 text-lg font-bold ${muted} hover:text-[#f0a500] hover:bg-[#f0a500]/5 transition-colors cursor-pointer`}
                  >+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                    added
                      ? "bg-[#22c55e] border border-[#22c55e] text-white"
                      : "bg-[#f0a500] hover:bg-[#c97000] border border-[#f0a500] text-white"
                  }`}
                >
                  {added ? <FiCheck size={16} /> : <FiShoppingBag size={16} />}
                  {added
                    ? (isAR ? "تمت الإضافة!" : "Added!")
                    : (isAR ? "أضف إلى السلة" : "Add to Cart")}
                </button>
              </div>

              {/* Trust badges */}
              <div className={`grid grid-cols-3 gap-2 pt-2 border-t ${br}`}>
                {[
                  { icon: <FiTruck size={16} />,     en: "Free Shipping",  ar: "شحن مجاني"      },
                  { icon: <FiShield size={16} />,    en: "2-Year Warranty",ar: "ضمان سنتين"      },
                  { icon: <FiRefreshCw size={16} />, en: "Easy Returns",   ar: "إرجاع سهل"      },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 text-center">
                    <span className="text-[#f0a500]">{b.icon}</span>
                    <span className={`text-[10px] font-medium ${muted}`}>{isAR ? b.ar : b.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── TABS: Description / Specs ── */}
          <div className={`border-t ${br}`}>
            <div className="flex border-b border-gray-100 dark:border-white/5 px-4">
              {[
                { key: "desc",  en: "Description", ar: "الوصف"  },
                { key: "specs", en: "Specs",        ar: "المواصفات" },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors cursor-pointer -mb-px ${
                    tab === t.key
                      ? "border-[#f0a500] text-[#f0a500]"
                      : `border-transparent ${muted} hover:text-[#f0a500]`
                  }`}
                >
                  {isAR ? t.ar : t.en}
                </button>
              ))}
            </div>
            <div className="p-6">
              {tab === "desc" ? (
                <p className={`text-sm leading-relaxed ${muted}`}>
                  {isAR ? product.descAR : product.descEN}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specs.map((s, i) => (
                    <div key={i} className={`flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0f0f1a] border ${br}`}>
                      <span className={`text-sm ${muted}`}>{isAR ? s.ar : s.en}</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">{s.val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-gray-800 dark:text-white">
                {isAR ? "منتجات مشابهة" : "Related Products"}
              </h2>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#f0a500] hover:underline"
              >
                {isAR ? "عرض الكل" : "View All"}
                {isAR ? <FiArrowLeft size={12} /> : <FiArrowRight size={12} />}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {related.map(p => {
                const d = p.originalPrice
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                  : null;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className={`group flex flex-col ${nBg} rounded-2xl border ${br} overflow-hidden hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40 hover:border-[#f0a500]/30 transition-all duration-300`}
                  >
                    <div className="relative h-32 sm:h-40 bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center overflow-hidden">
                      {d && (
                        <span className="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#e05c5c] text-white text-[10px] font-bold">
                          <BsLightningChargeFill size={8} /> -{d}%
                        </span>
                      )}
                      <span className="text-5xl sm:text-6xl select-none group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                    </div>
                    <div className="flex flex-col gap-1 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f0a500]">{p.brand}</p>
                      <p className="text-xs font-semibold text-gray-800 dark:text-white line-clamp-2 group-hover:text-[#f0a500] transition-colors">
                        {isAR ? p.nameAR : p.name}
                      </p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-sm font-extrabold text-gray-800 dark:text-white">{sign}{convertPrice(p.price)}</span>
                        {p.originalPrice && (
                          <span className={`text-[10px] ${muted} line-through`}>{sign}{convertPrice(p.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
