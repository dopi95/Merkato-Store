"use client";
import { useState } from "react";
import Link from "next/link";
import { FiHeart, FiShoppingBag, FiCheck, FiTrash2, FiStar } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";
import { useLang } from "../../../context/LangContext";
import { useCurrency } from "../../../context/CurrencyContext";
import { products } from "../../../data/products";

export default function DashboardWishlistPage() {
  const { ids, toggle } = useWishlist();
  const { addToCart }   = useCart();
  const { lang }        = useLang();
  const { sign, convertPrice } = useCurrency();
  const isAR = lang === "ar";

  const [added, setAdded] = useState({});
  const wishedProducts = products.filter(p => ids.includes(p.id));

  function handleAdd(product) {
    addToCart(product, 1);
    setAdded(a => ({ ...a, [product.id]: true }));
    setTimeout(() => setAdded(a => ({ ...a, [product.id]: false })), 2000);
  }

  const nBg   = "bg-white dark:bg-[#13112a]";
  const br    = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-lg font-extrabold text-gray-800 dark:text-white flex items-center gap-2">
            <FiHeart className="fill-[#e05c5c] text-[#e05c5c]" size={18} />
            {isAR ? "المفضلة" : "Wishlist"}
          </h1>
          <p className={`text-xs ${muted} mt-0.5`}>
            {wishedProducts.length} {isAR ? "منتج محفوظ" : "saved items"}
          </p>
        </div>
        {wishedProducts.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => wishedProducts.forEach(p => toggle(p.id))}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border ${br} ${muted} hover:text-[#e05c5c] hover:border-[#e05c5c]/30 transition-colors cursor-pointer`}
            >
              <FiTrash2 size={12} /> {isAR ? "مسح الكل" : "Clear all"}
            </button>
            <button
              onClick={() => wishedProducts.forEach(p => addToCart(p, 1))}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#f0a500] hover:bg-[#c97000] text-white transition-colors cursor-pointer"
            >
              <FiShoppingBag size={12} /> {isAR ? "إضافة الكل للسلة" : "Add all to cart"}
            </button>
          </div>
        )}
      </div>

      {wishedProducts.length === 0 ? (
        <div className={`${nBg} rounded-2xl border ${br} flex flex-col items-center justify-center py-16 gap-4`}>
          <span className="text-6xl">🤍</span>
          <p className="font-semibold text-gray-700 dark:text-white/70">{isAR ? "قائمة المفضلة فارغة" : "Your wishlist is empty"}</p>
          <Link href="/products" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white text-sm font-bold transition-colors">
            <FiShoppingBag size={14} /> {isAR ? "تصفح المنتجات" : "Browse Products"}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
          {wishedProducts.map(product => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;
            return (
              <div key={product.id} className={`relative flex flex-col ${nBg} rounded-2xl border ${br} overflow-hidden hover:border-[#f0a500]/30 hover:shadow-lg transition-all group`}>
                <button onClick={() => toggle(product.id)} className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-[#0d0d1a]/90 backdrop-blur-sm flex items-center justify-center border border-gray-100 dark:border-white/10 hover:border-[#e05c5c]/50 hover:bg-[#e05c5c]/10 transition-all cursor-pointer shadow-sm">
                  <FiHeart size={12} className="fill-[#e05c5c] text-[#e05c5c]" />
                </button>
                {discount && (
                  <div className="absolute top-2 left-2 z-10 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#e05c5c] text-white text-[10px] font-bold">
                    <BsLightningChargeFill size={8} /> -{discount}%
                  </div>
                )}
                <Link href={`/products/${product.id}`} className="h-32 sm:h-36 bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center overflow-hidden">
                  <span className="text-5xl sm:text-6xl select-none group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
                </Link>
                <div className="flex flex-col gap-1.5 p-3 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f0a500]">{product.brand}</p>
                  <Link href={`/products/${product.id}`} className="text-xs font-semibold text-gray-800 dark:text-white line-clamp-2 hover:text-[#f0a500] transition-colors leading-snug">
                    {isAR ? product.nameAR : product.name}
                  </Link>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={9} className={i < Math.floor(product.rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/20"} />
                    ))}
                  </div>
                  <div className="flex items-baseline gap-1 mt-auto pt-1">
                    <span className="text-sm font-extrabold text-gray-800 dark:text-white">{sign}{convertPrice(product.price)}</span>
                    {product.originalPrice && <span className={`text-[10px] ${muted} line-through`}>{sign}{convertPrice(product.originalPrice)}</span>}
                  </div>
                  <button
                    onClick={() => handleAdd(product)}
                    className={`mt-1 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      added[product.id]
                        ? "bg-[#22c55e] text-white border border-[#22c55e]"
                        : "bg-[#f0a500]/10 hover:bg-[#f0a500] border border-[#f0a500]/30 hover:border-[#f0a500] text-[#f0a500] hover:text-white"
                    }`}
                  >
                    {added[product.id] ? <FiCheck size={12} /> : <FiShoppingBag size={12} />}
                    {added[product.id] ? "✓" : (isAR ? "أضف للسلة" : "Add to Cart")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
