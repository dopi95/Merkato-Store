"use client";
import { useState } from "react";
import Link from "next/link";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useCurrency } from "../../context/CurrencyContext";

export default function ProductCard({ product, isAR }) {
  const [wished, setWished] = useState(false);
  const { convertPrice, sign } = useCurrency();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/products/${product.id}`} className="group relative flex flex-col bg-white dark:bg-[#13112a] rounded-xl sm:rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40 hover:border-[#f0a500]/30 transition-all duration-300">

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
        onClick={(e) => { e.preventDefault(); setWished(!wished); }}
        className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-[#0d0d1a]/90 backdrop-blur-sm flex items-center justify-center border border-gray-100 dark:border-white/10 hover:border-[#f0a500]/50 transition-all cursor-pointer shadow-sm"
      >
        <FiHeart size={13} className={wished ? "fill-[#e05c5c] text-[#e05c5c]" : "text-gray-400 dark:text-white/40"} />
      </button>

      {/* Image area */}
      <div className="relative h-36 sm:h-44 md:h-48 bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center overflow-hidden">
        <span className="text-5xl sm:text-6xl md:text-7xl select-none group-hover:scale-110 transition-transform duration-300">
          {product.emoji}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-4 flex-1">
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#f0a500]">
          {product.brand}
        </p>
        <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 group-hover:text-[#f0a500] transition-colors leading-snug">
          {isAR ? product.nameAR : product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={11}
              className={i < Math.floor(product.rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/20"}
            />
          ))}
          <span className="text-[10px] sm:text-[11px] text-gray-400 dark:text-white/40 ml-1">({product.reviews})</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-sm sm:text-base md:text-lg font-extrabold text-gray-800 dark:text-white">
              {sign}{convertPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 dark:text-white/30 line-through">
                {sign}{convertPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button onClick={(e) => e.preventDefault()} className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#f0a500]/10 hover:bg-[#f0a500] border border-[#f0a500]/30 hover:border-[#f0a500] text-[#f0a500] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0">
            <FiShoppingBag size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}
