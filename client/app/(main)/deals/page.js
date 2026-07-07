"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingBag, FiHeart, FiStar, FiCheck, FiZap, FiClock, FiTag, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useLang } from "../../context/LangContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { products } from "../../data/products";

// Only products with a discount
const dealProducts = products
  .filter(p => p.originalPrice)
  .map(p => ({
    ...p,
    discount: Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100),
  }))
  .sort((a, b) => b.discount - a.discount);

const CATEGORIES = [
  { key: "all",         en: "All Deals",    ar: "كل العروض"       },
  { key: "electronics", en: "Electronics",  ar: "الإلكترونيات"    },
  { key: "fashion",     en: "Fashion",      ar: "الأزياء"          },
  { key: "beauty",      en: "Beauty",       ar: "التجميل"          },
  { key: "household",   en: "Household",    ar: "المنزل"           },
  { key: "groceries",   en: "Groceries",    ar: "البقالة"           },
  { key: "accessories", en: "Accessories",  ar: "الإكسسوارات"      },
];

// Flash sale ends 24h from now (session-stable via localStorage)
function getFlashEnd() {
  if (typeof window === "undefined") return Date.now() + 86400000;
  const saved = localStorage.getItem("merkato_flash_end");
  if (saved && Number(saved) > Date.now()) return Number(saved);
  const end = Date.now() + 86400000;
  localStorage.setItem("merkato_flash_end", String(end));
  return end;
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const end = getFlashEnd();
    function tick() {
      const diff = Math.max(0, end - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return timeLeft;
}

function Pad(n) { return String(n).padStart(2, "0"); }

export default function DealsPage() {
  const { lang } = useLang();
  const { convertPrice, sign } = useCurrency();
  const { addToCart } = useCart();
  const { toggle, isWished } = useWishlist();
  const isAR = lang === "ar";
  const countdown = useCountdown();

  const [cat,   setCat]   = useState("all");
  const [added, setAdded] = useState({});

  const filtered = cat === "all" ? dealProducts : dealProducts.filter(p => p.cat === cat);

  // Flash deals = top 4 highest discount
  const flashDeals = dealProducts.slice(0, 4);

  function handleAdd(e, product) {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(a => ({ ...a, [product.id]: true }));
    setTimeout(() => setAdded(a => ({ ...a, [product.id]: false })), 2000);
  }

  const nBg   = "bg-white dark:bg-[#13112a]";
  const br    = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#e05c5c]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0a500]/15 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold uppercase tracking-widest">
            <BsLightningChargeFill size={11} />
            {isAR ? "عروض حصرية" : "Exclusive Deals"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {isAR ? "عروض وتخفيضات" : "Deals & Offers"}
            <span className="block text-[#f0a500]">{isAR ? "لا تفوتك!" : "Don't Miss Out!"}</span>
          </h1>
          <p className="text-sm sm:text-base text-white/50 max-w-md">
            {isAR
              ? "خصومات تصل إلى 60% على منتجات مختارة. عروض محدودة الوقت."
              : "Up to 60% off on selected products. Limited time offers."}
          </p>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-2 mt-1">
            <div className="flex items-center gap-1.5 text-white/40 text-xs font-medium">
              <FiClock size={12} />
              {isAR ? "تنتهي العروض خلال:" : "Flash sale ends in:"}
            </div>
            <div className="flex items-center gap-2">
              {[
                { val: countdown.h, en: "HRS",  ar: "س" },
                { val: countdown.m, en: "MIN",  ar: "د" },
                { val: countdown.s, en: "SEC",  ar: "ث" },
              ].map((unit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <span className="w-14 h-14 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl font-extrabold text-white font-mono tabular-nums">
                      {Pad(unit.val)}
                    </span>
                    <span className="text-[10px] text-white/30 mt-1 font-semibold tracking-widest">
                      {isAR ? unit.ar : unit.en}
                    </span>
                  </div>
                  {i < 2 && <span className="text-[#f0a500] text-2xl font-bold mb-4 leading-none">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">

        {/* ── FLASH DEALS ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FiZap size={18} className="text-[#e05c5c]" />
              <h2 className="text-lg font-extrabold text-gray-800 dark:text-white">
                {isAR ? "أفضل الخصومات" : "Hottest Discounts"}
              </h2>
            </div>
            <Link
              href="#all-deals"
              className="text-xs font-semibold text-[#f0a500] hover:underline flex items-center gap-1"
            >
              {isAR ? "عرض الكل" : "See all"}
              {isAR ? <FiArrowLeft size={12} /> : <FiArrowRight size={12} />}
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {flashDeals.map(product => (
              <FlashCard
                key={product.id}
                product={product}
                isAR={isAR}
                sign={sign}
                convertPrice={convertPrice}
                onAdd={handleAdd}
                isAdded={added[product.id]}
                isWished={isWished(product.id)}
                onWish={() => toggle(product.id)}
                nBg={nBg}
                br={br}
                muted={muted}
              />
            ))}
          </div>
        </section>

        {/* ── PROMO BANNERS ── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { emoji: "⚡", en: "Flash Sale", ar: "بيع سريع", sub: { en: "Electronics up to 30% off", ar: "إلكترونيات بخصم 30%" }, color: "from-[#f0a500]/20 to-[#f0a500]/5", border: "border-[#f0a500]/20", href: "/products?cat=electronics" },
            { emoji: "👗", en: "Style Drop", ar: "موضة بخصم", sub: { en: "Fashion deals this week", ar: "عروض أزياء هذا الأسبوع" }, color: "from-[#a855f7]/20 to-[#a855f7]/5", border: "border-[#a855f7]/20", href: "/products?cat=fashion" },
            { emoji: "🌿", en: "Fresh Picks", ar: "طازج ورخيص", sub: { en: "Groceries & beauty offers", ar: "عروض بقالة وتجميل" }, color: "from-[#22c55e]/20 to-[#22c55e]/5", border: "border-[#22c55e]/20", href: "/products?cat=groceries" },
          ].map((b, i) => (
            <Link
              key={i}
              href={b.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-br ${b.color} border ${b.border} hover:scale-[1.02] transition-transform`}
            >
              <span className="text-4xl shrink-0">{b.emoji}</span>
              <div>
                <p className="font-extrabold text-gray-800 dark:text-white text-sm">{isAR ? b.ar : b.en}</p>
                <p className={`text-xs ${muted} mt-0.5`}>{isAR ? b.sub.ar : b.sub.en}</p>
              </div>
              <span className="ml-auto text-[#f0a500]">{isAR ? <FiArrowLeft size={16} /> : <FiArrowRight size={16} />}</span>
            </Link>
          ))}
        </section>

        {/* ── ALL DEALS ── */}
        <section id="all-deals">
          <div className="flex items-center gap-2 mb-5">
            <FiTag size={16} className="text-[#f0a500]" />
            <h2 className="text-lg font-extrabold text-gray-800 dark:text-white">
              {isAR ? "جميع العروض" : "All Deals"}
            </h2>
            <span className={`text-xs ${muted} font-medium`}>
              ({filtered.length} {isAR ? "منتج" : "products"})
            </span>
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                  cat === c.key
                    ? "bg-[#f0a500] border-[#f0a500] text-white shadow-md shadow-[#f0a500]/30"
                    : `${br} ${muted} hover:border-[#f0a500]/50 hover:text-[#f0a500]`
                }`}
              >
                {isAR ? c.ar : c.en}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🏷️</p>
              <p className={`font-semibold text-gray-700 dark:text-white/70`}>
                {isAR ? "لا توجد عروض في هذه الفئة حالياً" : "No deals in this category right now"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filtered.map(product => (
                <DealCard
                  key={product.id}
                  product={product}
                  isAR={isAR}
                  sign={sign}
                  convertPrice={convertPrice}
                  onAdd={handleAdd}
                  isAdded={added[product.id]}
                  isWished={isWished(product.id)}
                  onWish={() => toggle(product.id)}
                  nBg={nBg}
                  br={br}
                  muted={muted}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

/* ── Flash Deal Card (larger, horizontal on desktop) ── */
function FlashCard({ product, isAR, sign, convertPrice, onAdd, isAdded, isWished, onWish, nBg, br, muted }) {
  return (
    <div className={`relative flex flex-col ${nBg} rounded-2xl border ${br} overflow-hidden hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 hover:border-[#f0a500]/30 transition-all duration-300 group`}>
      {/* Discount badge */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-[#e05c5c] text-white text-[11px] font-extrabold shadow-lg">
        <BsLightningChargeFill size={9} /> -{product.discount}%
      </div>
      {/* Wishlist */}
      <button
        onClick={onWish}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-[#0d0d1a]/90 backdrop-blur-sm flex items-center justify-center border border-gray-100 dark:border-white/10 hover:border-[#e05c5c]/50 transition-all cursor-pointer shadow-sm"
      >
        <FiHeart size={13} className={isWished ? "fill-[#e05c5c] text-[#e05c5c]" : "text-gray-400 dark:text-white/40"} />
      </button>
      {/* Image */}
      <Link href={`/products/${product.id}`} className="h-36 sm:h-44 bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center overflow-hidden">
        <span className="text-6xl sm:text-7xl select-none group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
      </Link>
      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3 sm:p-4 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#f0a500]">{product.brand}</p>
        <Link href={`/products/${product.id}`} className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white line-clamp-2 hover:text-[#f0a500] transition-colors leading-snug">
          {isAR ? product.nameAR : product.name}
        </Link>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={10} className={i < Math.floor(product.rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/20"} />
          ))}
          <span className={`text-[10px] ${muted} ml-1`}>({product.reviews})</span>
        </div>
        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1 flex-wrap">
          <span className="text-base sm:text-lg font-extrabold text-gray-800 dark:text-white">
            {sign}{convertPrice(product.price)}
          </span>
          <span className={`text-xs ${muted} line-through`}>{sign}{convertPrice(product.originalPrice)}</span>
          <span className="text-xs font-bold text-[#22c55e]">
            {isAR ? `وفر ${sign}${convertPrice(product.originalPrice - product.price)}` : `Save ${sign}${convertPrice(product.originalPrice - product.price)}`}
          </span>
        </div>
        {/* Add to cart */}
        <button
          onClick={(e) => onAdd(e, product)}
          className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            isAdded
              ? "bg-[#22c55e] text-white border border-[#22c55e]"
              : "bg-[#f0a500]/10 hover:bg-[#f0a500] border border-[#f0a500]/30 hover:border-[#f0a500] text-[#f0a500] hover:text-white"
          }`}
        >
          {isAdded ? <FiCheck size={13} /> : <FiShoppingBag size={13} />}
          {isAdded ? (isAR ? "تمت الإضافة!" : "Added!") : (isAR ? "أضف للسلة" : "Add to Cart")}
        </button>
      </div>
    </div>
  );
}

/* ── Regular Deal Card ── */
function DealCard({ product, isAR, sign, convertPrice, onAdd, isAdded, isWished, onWish, nBg, br, muted }) {
  return (
    <div className={`relative flex flex-col ${nBg} rounded-2xl border ${br} overflow-hidden hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40 hover:border-[#f0a500]/30 transition-all duration-300 group`}>
      {/* Discount badge */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#e05c5c] text-white text-[10px] font-extrabold">
        <BsLightningChargeFill size={8} /> -{product.discount}%
      </div>
      {/* Wishlist */}
      <button
        onClick={onWish}
        className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-[#0d0d1a]/90 backdrop-blur-sm flex items-center justify-center border border-gray-100 dark:border-white/10 hover:border-[#e05c5c]/50 transition-all cursor-pointer shadow-sm"
      >
        <FiHeart size={12} className={isWished ? "fill-[#e05c5c] text-[#e05c5c]" : "text-gray-400 dark:text-white/40"} />
      </button>
      {/* Image */}
      <Link href={`/products/${product.id}`} className="h-32 sm:h-40 bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center overflow-hidden">
        <span className="text-5xl sm:text-6xl select-none group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
      </Link>
      {/* Info */}
      <div className="flex flex-col gap-1 p-3 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f0a500]">{product.brand}</p>
        <Link href={`/products/${product.id}`} className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 hover:text-[#f0a500] transition-colors leading-snug">
          {isAR ? product.nameAR : product.name}
        </Link>
        <div className="flex items-center gap-0.5 mt-0.5">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={9} className={i < Math.floor(product.rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/20"} />
          ))}
        </div>
        <div className="flex items-baseline gap-1.5 mt-auto pt-1 flex-wrap">
          <span className="text-sm sm:text-base font-extrabold text-gray-800 dark:text-white">{sign}{convertPrice(product.price)}</span>
          <span className={`text-[10px] ${muted} line-through`}>{sign}{convertPrice(product.originalPrice)}</span>
        </div>
        <button
          onClick={(e) => onAdd(e, product)}
          className={`mt-1.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold transition-all duration-200 cursor-pointer ${
            isAdded
              ? "bg-[#22c55e] text-white border border-[#22c55e]"
              : "bg-[#f0a500]/10 hover:bg-[#f0a500] border border-[#f0a500]/30 hover:border-[#f0a500] text-[#f0a500] hover:text-white"
          }`}
        >
          {isAdded ? <FiCheck size={12} /> : <FiShoppingBag size={12} />}
          {isAdded ? (isAR ? "✓" : "✓") : (isAR ? "أضف للسلة" : "Add to Cart")}
        </button>
      </div>
    </div>
  );
}
