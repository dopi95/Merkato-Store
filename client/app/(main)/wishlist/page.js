"use client";
import { useState } from "react";
import Link from "next/link";
import { FiHeart, FiShoppingBag, FiTrash2, FiStar, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useLang } from "../../context/LangContext";
import { useCurrency } from "../../context/CurrencyContext";
import { products } from "../../data/products";

export default function WishlistPage() {
  const { ids, toggle } = useWishlist();
  const { addToCart } = useCart();
  const { lang } = useLang();
  const { convertPrice, sign } = useCurrency();
  const isAR = lang === "ar";

  const [added, setAdded] = useState({});

  const wishedProducts = products.filter(p => ids.includes(p.id));

  function handleAddToCart(e, product) {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(a => ({ ...a, [product.id]: true }));
    setTimeout(() => setAdded(a => ({ ...a, [product.id]: false })), 2000);
  }

  function handleAddAll() {
    wishedProducts.forEach(p => addToCart(p, 1));
  }

  const nBg   = "bg-white dark:bg-[#13112a]";
  const br    = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  if (wishedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a] flex flex-col items-center justify-center px-4 gap-6" dir={isAR ? "rtl" : "ltr"}>
        <div className="relative">
          <span className="text-8xl">🤍</span>
          <span className="absolute -bottom-1 -right-1 text-3xl">✨</span>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-2">
            {isAR ? "قائمة المفضلة فارغة" : "Your wishlist is empty"}
          </h1>
          <p className={`text-sm ${muted} max-w-xs`}>
            {isAR
              ? "لم تضف أي منتجات لمفضلتك بعد. اضغط على أيقونة القلب على أي منتج لحفظه هنا."
              : "You haven't saved any products yet. Tap the heart icon on any product to save it here."}
          </p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white font-bold transition-colors"
        >
          <FiShoppingBag size={16} />
          {isAR ? "تصفح المنتجات" : "Browse Products"}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
              <FiHeart className="fill-[#e05c5c] text-[#e05c5c]" size={22} />
              {isAR ? "المفضلة" : "Wishlist"}
            </h1>
            <p className={`text-sm ${muted} mt-0.5`}>
              {wishedProducts.length} {isAR ? "منتج محفوظ" : `saved item${wishedProducts.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => wishedProducts.forEach(p => toggle(p.id))}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border ${br} ${muted} hover:text-[#e05c5c] hover:border-[#e05c5c]/30 transition-colors cursor-pointer`}
            >
              <FiTrash2 size={13} />
              {isAR ? "مسح الكل" : "Clear all"}
            </button>
            <button
              onClick={handleAddAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#f0a500] hover:bg-[#c97000] text-white transition-colors cursor-pointer"
            >
              <FiShoppingBag size={13} />
              {isAR ? "إضافة الكل للسلة" : "Add all to cart"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {wishedProducts.map(product => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;
            const isAdded = added[product.id];

            return (
              <div
                key={product.id}
                className={`group relative flex flex-col ${nBg} rounded-2xl border ${br} overflow-hidden hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40 hover:border-[#f0a500]/30 transition-all duration-300`}
              >
                {/* Remove from wishlist */}
                <button
                  onClick={() => toggle(product.id)}
                  title={isAR ? "إزالة من المفضلة" : "Remove from wishlist"}
                  className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-[#0d0d1a]/90 backdrop-blur-sm flex items-center justify-center border border-gray-100 dark:border-white/10 hover:border-[#e05c5c]/50 hover:bg-[#e05c5c]/10 transition-all cursor-pointer shadow-sm"
                >
                  <FiHeart size={13} className="fill-[#e05c5c] text-[#e05c5c]" />
                </button>

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

                {/* Image */}
                <Link href={`/products/${product.id}`} className="relative h-36 sm:h-44 bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center overflow-hidden">
                  <span className="text-5xl sm:text-6xl select-none group-hover:scale-110 transition-transform duration-300">
                    {product.emoji}
                  </span>
                </Link>

                {/* Info */}
                <div className="flex flex-col gap-1.5 p-3 sm:p-4 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f0a500]">{product.brand}</p>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 hover:text-[#f0a500] transition-colors leading-snug"
                  >
                    {isAR ? product.nameAR : product.name}
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={10} className={i < Math.floor(product.rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/20"} />
                    ))}
                    <span className={`text-[10px] ${muted} ml-1`}>({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 flex-wrap mt-auto pt-1">
                    <span className="text-sm sm:text-base font-extrabold text-gray-800 dark:text-white">
                      {sign}{convertPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className={`text-[10px] ${muted} line-through`}>
                        {sign}{convertPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isAdded
                        ? "bg-[#22c55e] text-white border border-[#22c55e]"
                        : "bg-[#f0a500]/10 hover:bg-[#f0a500] border border-[#f0a500]/30 hover:border-[#f0a500] text-[#f0a500] hover:text-white"
                    }`}
                  >
                    {isAdded ? <FiCheck size={13} /> : <FiShoppingBag size={13} />}
                    {isAdded
                      ? (isAR ? "تمت الإضافة!" : "Added!")
                      : (isAR ? "أضف للسلة" : "Add to Cart")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue shopping */}
        <div className="mt-8 flex justify-center">
          <Link href="/products" className="flex items-center gap-2 text-sm font-semibold text-[#f0a500] hover:underline">
            {isAR ? <FiArrowRight size={14} /> : <FiArrowLeft size={14} />}
            {isAR ? "مواصلة التسوق" : "Continue Shopping"}
          </Link>
        </div>

      </div>
    </div>
  );
}
