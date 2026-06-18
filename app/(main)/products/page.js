"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiHeart, FiShoppingBag, FiStar, FiSliders, FiX, FiChevronDown } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useLang } from "../../context/LangContext";
import { useCurrency } from "../../context/CurrencyContext";
import { products } from "../../data/products";

const categories = [
  { key: "all",         en: "All Products",  ar: "جميع المنتجات" },
  { key: "electronics", en: "Electronics",   ar: "الإلكترونيات"  },
  { key: "fashion",     en: "Fashion",       ar: "الأزياء"        },
  { key: "beauty",      en: "Beauty",        ar: "التجميل"        },
  { key: "household",   en: "Household",     ar: "المنزل"         },
  { key: "groceries",   en: "Groceries",     ar: "البقالة"         },
  { key: "accessories", en: "Accessories",   ar: "الإكسسوارات"    },
];

const sortOptions = [
  { key: "featured",   en: "Featured",      ar: "مميز"           },
  { key: "price_asc",  en: "Price: Low–High",ar: "السعر: الأقل أولاً" },
  { key: "price_desc", en: "Price: High–Low",ar: "السعر: الأعلى أولاً" },
  { key: "rating",     en: "Top Rated",     ar: "الأعلى تقييماً" },
  { key: "newest",     en: "Newest",        ar: "الأحدث"         },
];

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" />}>
      <ShopPageInner />
    </Suspense>
  );
}

function ShopPageInner() {
  const { lang } = useLang();
  const { convertPrice, sign } = useCurrency();
  const isAR = lang === "ar";

  const searchParams = useSearchParams();

  const [search,   setSearch]   = useState("");
  const [cat,      setCat]      = useState("all");
  const [sort,     setSort]     = useState("featured");
  const [maxPrice, setMaxPrice] = useState(500);
  const [showFilters, setShowFilters] = useState(false);
  const [wished,   setWished]   = useState({});

  useEffect(() => {
    const c = searchParams.get("cat");
    const s = searchParams.get("search");
    if (c) setCat(c);
    if (s) setSearch(s);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== "all") list = list.filter(p => p.cat === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.includes(q))
      );
    }
    list = list.filter(p => p.price <= maxPrice);
    if (sort === "price_asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")     list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return list;
  }, [cat, search, sort, maxPrice]);

  const toggleWish = (id) => setWished(w => ({ ...w, [id]: !w[id] }));

  const nBg  = "bg-white dark:bg-[#13112a]";
  const br   = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ── TOOLBAR ── */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <p className={`text-sm ${muted}`}>
            {isAR
              ? `${filtered.length} منتج`
              : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
          </p>
          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className={`appearance-none pl-3 pr-7 py-2 rounded-xl border ${br} ${nBg} text-sm ${muted} focus:border-[#f0a500] outline-none cursor-pointer`}
              >
                {sortOptions.map(o => (
                  <option key={o.key} value={o.key}>{isAR ? o.ar : o.en}</option>
                ))}
              </select>
              <FiChevronDown size={13} className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${muted}`} />
            </div>
            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border ${br} ${nBg} text-sm ${muted} hover:border-[#f0a500]/50 hover:text-[#f0a500] transition-colors lg:hidden`}
            >
              <FiSliders size={14} />
              {isAR ? "تصفية" : "Filter"}
            </button>
          </div>
        </div>

        <div className="flex gap-5">
          {/* ── SIDEBAR FILTERS ── */}
          <aside className={`shrink-0 w-56 hidden lg:block`}>
            <Filters isAR={isAR} cat={cat} setCat={setCat} maxPrice={maxPrice} setMaxPrice={setMaxPrice} nBg={nBg} br={br} muted={muted} />
          </aside>

          {/* Mobile filters drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className={`absolute bottom-0 left-0 right-0 ${nBg} rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 dark:text-white">{isAR ? "تصفية" : "Filters"}</h3>
                  <button onClick={() => setShowFilters(false)} className={muted}><FiX size={20} /></button>
                </div>
                <Filters isAR={isAR} cat={cat} setCat={setCat} maxPrice={maxPrice} setMaxPrice={setMaxPrice} nBg={nBg} br={br} muted={muted} />
              </div>
            </div>
          )}

          {/* ── PRODUCT GRID ── */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-3">🔍</p>
                <p className="font-semibold text-gray-700 dark:text-white/70">
                  {isAR ? "لا توجد منتجات مطابقة" : "No products found"}
                </p>
                <p className={`text-sm ${muted} mt-1`}>
                  {isAR ? "جرب تغيير المرشحات أو مصطلح البحث" : "Try adjusting filters or search term"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map(product => {
                  const discount = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : null;
                  return (
                    <Link key={product.id} href={`/products/${product.id}`} className={`group relative flex flex-col ${nBg} rounded-2xl border ${br} overflow-hidden hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40 hover:border-[#f0a500]/30 transition-all duration-300`}>
                      {/* Badges */}
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                        {discount && (
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#e05c5c] text-white text-[10px] font-bold">
                            <BsLightningChargeFill size={8} /> -{discount}%
                          </span>
                        )}
                        {product.isNew && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#22c55e] text-white text-[10px] font-bold">
                            {isAR ? "جديد" : "New"}
                          </span>
                        )}
                      </div>
                      {/* Wishlist */}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWish(product.id); }}
                        className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-[#0d0d1a]/90 backdrop-blur-sm flex items-center justify-center border ${br} hover:border-[#f0a500]/50 transition-all cursor-pointer shadow-sm`}
                      >
                        <FiHeart size={13} className={wished[product.id] ? "fill-[#e05c5c] text-[#e05c5c]" : "text-gray-400 dark:text-white/40"} />
                      </button>
                      {/* Image */}
                      <div className="relative h-36 sm:h-44 bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center overflow-hidden">
                        <span className="text-6xl sm:text-7xl select-none group-hover:scale-110 transition-transform duration-300">
                          {product.emoji}
                        </span>
                      </div>
                      {/* Info */}
                      <div className="flex flex-col gap-1.5 p-3 sm:p-4 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f0a500]">{product.brand}</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 group-hover:text-[#f0a500] transition-colors leading-snug">
                          {isAR ? product.nameAR : product.name}
                        </p>
                        {/* Rating */}
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} size={11} className={i < Math.floor(product.rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/20"} />
                          ))}
                          <span className={`text-[10px] ${muted} ml-1`}>({product.reviews})</span>
                        </div>
                        {/* Price + Cart */}
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-sm sm:text-base font-extrabold text-gray-800 dark:text-white">
                              {sign}{convertPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className={`text-[10px] ${muted} line-through`}>
                                {sign}{convertPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <button onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-xl bg-[#f0a500]/10 hover:bg-[#f0a500] border border-[#f0a500]/30 hover:border-[#f0a500] text-[#f0a500] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0">
                            <FiShoppingBag size={14} />
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Filters({ isAR, cat, setCat, maxPrice, setMaxPrice, nBg, br, muted }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Categories */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#f0a500] mb-3">
          {isAR ? "الفئات" : "Categories"}
        </p>
        <div className="flex flex-col gap-1">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                cat === c.key
                  ? "bg-[#f0a500]/10 text-[#f0a500] border border-[#f0a500]/30"
                  : `border border-transparent ${muted} hover:text-[#f0a500] hover:bg-[#f0a500]/5`
              }`}
            >
              {isAR ? c.ar : c.en}
            </button>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#f0a500] mb-3">
          {isAR ? "الحد الأقصى للسعر" : "Max Price"}
        </p>
        <input
          type="range" min={10} max={500} step={5}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#f0a500]"
        />
        <div className="flex justify-between mt-1">
          <span className={`text-xs ${muted}`}>$10</span>
          <span className="text-xs font-semibold text-[#f0a500]">${maxPrice}</span>
        </div>
      </div>
      {/* Reset */}
      <button
        onClick={() => { setCat("all"); setMaxPrice(500); }}
        className={`text-xs ${muted} hover:text-[#f0a500] underline underline-offset-2 transition-colors text-left`}
      >
        {isAR ? "إعادة تعيين الفلاتر" : "Reset filters"}
      </button>
    </div>
  );
}
