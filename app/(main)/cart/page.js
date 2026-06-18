"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiTrash2, FiShoppingBag, FiArrowRight, FiArrowLeft, FiTag, FiCheck, FiTruck } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import { useLang } from "../../context/LangContext";
import { useCurrency } from "../../context/CurrencyContext";

const PROMO_CODES = { MERKATO10: 10, SAVE20: 20, WELCOME15: 15 };
const FREE_SHIPPING_THRESHOLD = 100;

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart, totalUSD } = useCart();
  const { lang } = useLang();
  const { convertPrice, sign, currency } = useCurrency();
  const router = useRouter();
  const isAR = lang === "ar";

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const subtotalUSD = totalUSD;
  const discountPct = appliedPromo ? PROMO_CODES[appliedPromo] : 0;
  const discountUSD = (subtotalUSD * discountPct) / 100;
  const shippingUSD = subtotalUSD >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const totalFinalUSD = subtotalUSD - discountUSD + shippingUSD;

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError("");
    } else {
      setPromoError(isAR ? "كود غير صالح" : "Invalid promo code");
    }
  }

  const nBg  = "bg-white dark:bg-[#13112a]";
  const br   = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a] flex flex-col items-center justify-center px-4 gap-6" dir={isAR ? "rtl" : "ltr"}>
        <span className="text-8xl">🛒</span>
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">{isAR ? "سلتك فارغة" : "Your cart is empty"}</h1>
        <p className={`text-sm ${muted} text-center max-w-xs`}>
          {isAR ? "لم تضف أي منتجات بعد. ابدأ التسوق الآن!" : "You haven't added any items yet. Start shopping now!"}
        </p>
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">
              {isAR ? "سلة التسوق" : "Shopping Cart"}
            </h1>
            <p className={`text-sm ${muted} mt-0.5`}>
              {items.length} {isAR ? "منتج" : "item(s)"}
            </p>
          </div>
          <button
            onClick={clearCart}
            className={`flex items-center gap-1.5 text-xs ${muted} hover:text-[#e05c5c] transition-colors cursor-pointer`}
          >
            <FiTrash2 size={13} />
            {isAR ? "إفراغ السلة" : "Clear cart"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item) => {
              const { key, product, qty, options } = item;
              const disc = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : null;
              return (
                <div key={key} className={`${nBg} rounded-2xl border ${br} p-4 flex gap-4`}>
                  {/* Emoji image */}
                  <Link href={`/products/${product.id}`} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center shrink-0 text-4xl hover:scale-105 transition-transform">
                    {product.emoji}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#f0a500]">{product.brand}</p>
                        <Link href={`/products/${product.id}`} className="text-sm font-bold text-gray-800 dark:text-white hover:text-[#f0a500] transition-colors line-clamp-2">
                          {isAR ? product.nameAR : product.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFromCart(key)}
                        className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${muted} hover:text-[#e05c5c] hover:bg-[#e05c5c]/10 transition-all cursor-pointer`}
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>

                    {/* Variants */}
                    {(options.color || options.size) && (
                      <div className="flex flex-wrap gap-1.5">
                        {options.color && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-white/5 ${muted}`}>
                            {isAR ? "اللون:" : "Color:"} {options.color}
                          </span>
                        )}
                        {options.size && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-white/5 ${muted}`}>
                            {isAR ? "المقاس:" : "Size:"} {options.size}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Qty + Price row */}
                    <div className="flex items-center justify-between mt-auto pt-1">
                      <div className={`flex items-center rounded-lg border ${br} overflow-hidden`}>
                        <button
                          onClick={() => qty > 1 ? updateQty(key, qty - 1) : removeFromCart(key)}
                          className={`w-8 h-8 flex items-center justify-center text-lg font-bold ${muted} hover:text-[#f0a500] hover:bg-[#f0a500]/5 transition-colors cursor-pointer`}
                        >−</button>
                        <span className="w-8 text-center text-sm font-semibold text-gray-800 dark:text-white">{qty}</span>
                        <button
                          onClick={() => updateQty(key, Math.min(product.stock, qty + 1))}
                          className={`w-8 h-8 flex items-center justify-center text-lg font-bold ${muted} hover:text-[#f0a500] hover:bg-[#f0a500]/5 transition-colors cursor-pointer`}
                        >+</button>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-extrabold text-gray-800 dark:text-white">
                          {sign}{convertPrice(product.price * qty)}
                        </p>
                        {disc && (
                          <p className={`text-[10px] ${muted} line-through`}>
                            {sign}{convertPrice(product.originalPrice * qty)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue shopping */}
            <Link
              href="/products"
              className={`flex items-center gap-2 text-sm font-semibold text-[#f0a500] hover:underline mt-1 ${isAR ? "justify-end" : ""}`}
            >
              {isAR ? <FiArrowRight size={14} /> : <FiArrowLeft size={14} />}
              {isAR ? "مواصلة التسوق" : "Continue Shopping"}
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${nBg} rounded-2xl border ${br} p-5 sticky top-0 flex flex-col gap-4`}>
              <h2 className="text-base font-extrabold text-gray-800 dark:text-white">
                {isAR ? "ملخص الطلب" : "Order Summary"}
              </h2>

              {/* Promo code */}
              <div>
                <p className={`text-xs font-semibold ${muted} mb-2`}>{isAR ? "كود الخصم" : "Promo Code"}</p>
                {appliedPromo ? (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30">
                    <FiCheck size={14} className="text-[#22c55e] shrink-0" />
                    <span className="text-sm font-bold text-[#22c55e] flex-1">{appliedPromo}</span>
                    <span className="text-sm font-bold text-[#22c55e]">-{discountPct}%</span>
                    <button onClick={() => setAppliedPromo(null)} className={`text-xs ${muted} hover:text-[#e05c5c] cursor-pointer`}>✕</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={e => { setPromoInput(e.target.value); setPromoError(""); }}
                      onKeyDown={e => e.key === "Enter" && applyPromo()}
                      placeholder={isAR ? "أدخل الكود..." : "Enter code..."}
                      className={`flex-1 px-3 py-2 rounded-xl border ${br} bg-gray-50 dark:bg-[#0f0f1a] text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-[#f0a500] transition-colors`}
                    />
                    <button
                      onClick={applyPromo}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white text-sm font-bold transition-colors cursor-pointer"
                    >
                      <FiTag size={13} />
                    </button>
                  </div>
                )}
                {promoError && <p className="text-xs text-[#e05c5c] mt-1">{promoError}</p>}
                <p className={`text-[10px] ${muted} mt-1`}>
                  {isAR ? "جرب: MERKATO10 · SAVE20 · WELCOME15" : "Try: MERKATO10 · SAVE20 · WELCOME15"}
                </p>
              </div>

              <div className={`border-t ${br}`} />

              {/* Totals */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className={muted}>{isAR ? "المجموع الفرعي" : "Subtotal"}</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{sign}{convertPrice(subtotalUSD)}</span>
                </div>
                {discountPct > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#22c55e] font-medium">{isAR ? `خصم (${discountPct}%)` : `Discount (${discountPct}%)`}</span>
                    <span className="font-semibold text-[#22c55e]">-{sign}{convertPrice(discountUSD)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className={`flex items-center gap-1 ${muted}`}>
                    <FiTruck size={13} />
                    {isAR ? "الشحن" : "Shipping"}
                  </span>
                  {shippingUSD === 0
                    ? <span className="font-semibold text-[#22c55e]">{isAR ? "مجاني" : "Free"}</span>
                    : <span className="font-semibold text-gray-800 dark:text-white">{sign}{convertPrice(shippingUSD)}</span>
                  }
                </div>
                {shippingUSD > 0 && (
                  <p className={`text-[10px] ${muted}`}>
                    {isAR
                      ? `أضف ${sign}${convertPrice(FREE_SHIPPING_THRESHOLD - subtotalUSD)} للحصول على شحن مجاني`
                      : `Add ${sign}${convertPrice(FREE_SHIPPING_THRESHOLD - subtotalUSD)} for free shipping`}
                  </p>
                )}
              </div>

              <div className={`border-t ${br}`} />

              <div className="flex items-center justify-between">
                <span className="font-extrabold text-gray-800 dark:text-white">{isAR ? "الإجمالي" : "Total"}</span>
                <span className="text-xl font-extrabold text-[#f0a500]">{sign}{convertPrice(totalFinalUSD)}</span>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white font-bold transition-colors cursor-pointer"
              >
                {isAR ? "المتابعة للدفع" : "Proceed to Checkout"}
                {isAR ? <FiArrowLeft size={16} /> : <FiArrowRight size={16} />}
              </button>

              {/* Payment icons */}
              <div className="flex items-center justify-center gap-3 pt-1">
                {["visa", "mastercard", "paypal", "applepay", "googlepay"].map(m => (
                  <img key={m} src={`/assets/payment/${m}.svg`} alt={m} className="h-5 opacity-60 hover:opacity-100 transition-opacity" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
