"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiLock, FiCheck, FiCreditCard } from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import { useCart } from "../../../context/CartContext";
import { useLang } from "../../../context/LangContext";
import { useCurrency } from "../../../context/CurrencyContext";

const PAYMENT_METHODS = [
  { id: "card",      en: "Credit / Debit Card",  ar: "بطاقة ائتمان / خصم",   icon: "💳" },
  { id: "paypal",    en: "PayPal",                ar: "باي بال",               icon: null, img: "/assets/payment/paypal.svg" },
  { id: "applepay",  en: "Apple Pay",             ar: "آبل باي",               icon: null, img: "/assets/payment/applepay.svg" },
  { id: "googlepay", en: "Google Pay",            ar: "جوجل باي",              icon: null, img: "/assets/payment/googlepay.svg" },
  { id: "mpesa",     en: "M-Pesa",                ar: "إم-بيسا",               icon: null, img: "/assets/payment/mpesa.svg" },
];

function formatCardNumber(val) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val) {
  const v = val.replace(/\D/g, "").slice(0, 4);
  if (v.length >= 3) return v.slice(0, 2) + "/" + v.slice(2);
  return v;
}

export default function PaymentPage() {
  const { items, totalUSD, clearCart } = useCart();
  const { lang } = useLang();
  const { convertPrice, sign } = useCurrency();
  const router = useRouter();
  const isAR = lang === "ar";

  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [flipped, setFlipped] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [shipping, setShipping] = useState(null);

  const shippingFee = totalUSD >= 100 ? 0 : 9.99;
  const total = totalUSD + shippingFee;

  useEffect(() => {
    try {
      const s = sessionStorage.getItem("merkato_shipping");
      if (s) setShipping(JSON.parse(s));
    } catch {}
  }, []);

  const nBg   = "bg-white dark:bg-[#13112a]";
  const br    = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";
  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-[#0f0f1a] placeholder-gray-400 dark:placeholder-white/30 outline-none transition-colors focus:border-[#f0a500]`;

  function setC(field, val) {
    setCard(c => ({ ...c, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: "" }));
  }

  function validate() {
    if (method !== "card") return {};
    const e = {};
    if (card.number.replace(/\s/g, "").length < 16) e.number = true;
    if (!card.name.trim()) e.name = true;
    if (card.expiry.length < 5) e.expiry = true;
    if (card.cvv.length < 3) e.cvv = true;
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setProcessing(true);
    const orderId = "MRK-" + Date.now().toString(36).toUpperCase();
    const orderData = {
      orderId,
      items,
      shipping,
      method,
      total: totalUSD,
      shippingFee,
      totalFinal: total,
      date: new Date().toISOString(),
    };
    sessionStorage.setItem("merkato_order", JSON.stringify(orderData));
    setTimeout(() => {
      clearCart();
      router.push("/checkout/confirmation");
    }, 1800);
  }

  if (items.length === 0 && !processing) {
    router.push("/cart");
    return null;
  }

  const cardNetworkIcon =
    card.number.replace(/\s/g, "").startsWith("4") ? "/assets/payment/visa.svg"
    : card.number.replace(/\s/g, "").startsWith("5") ? "/assets/payment/mastercard.svg"
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { n: 1, en: "Shipping", ar: "الشحن",  done: true },
            { n: 2, en: "Payment",  ar: "الدفع",   active: true },
            { n: 3, en: "Receipt",  ar: "الإيصال" },
          ].map((step, i, arr) => (
            <div key={step.n} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`flex items-center gap-2 ${step.active ? "text-[#f0a500]" : step.done ? "text-[#22c55e]" : muted}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                  step.active ? "bg-[#f0a500] text-white"
                  : step.done ? "bg-[#22c55e] text-white"
                  : "bg-gray-200 dark:bg-white/10"
                }`}>
                  {step.done ? <FiCheck size={12} /> : step.n}
                </span>
                <span className="text-sm font-semibold whitespace-nowrap">{isAR ? step.ar : step.en}</span>
              </div>
              {i < arr.length - 1 && <div className={`flex-1 h-px mx-2 ${br} border-t`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-5">

            {/* Payment Methods */}
            <div className={`${nBg} rounded-2xl border ${br} p-6`}>
              <h2 className="text-base font-extrabold text-gray-800 dark:text-white mb-4">
                {isAR ? "طريقة الدفع" : "Payment Method"}
              </h2>
              <div className="flex flex-col gap-2">
                {PAYMENT_METHODS.map(m => (
                  <label key={m.id} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    method === m.id
                      ? "border-[#f0a500] bg-[#f0a500]/5"
                      : `${br} hover:border-[#f0a500]/40`
                  }`}>
                    <input
                      type="radio" name="method" value={m.id}
                      checked={method === m.id}
                      onChange={() => setMethod(m.id)}
                      className="accent-[#f0a500]"
                    />
                    {m.img
                      ? <img src={m.img} alt={m.en} className="h-5 object-contain" />
                      : <span className="text-xl">{m.icon}</span>
                    }
                    <span className={`text-sm font-semibold ${method === m.id ? "text-[#f0a500]" : "text-gray-700 dark:text-white/80"}`}>
                      {isAR ? m.ar : m.en}
                    </span>
                    {method === m.id && <FiCheck size={14} className="ml-auto text-[#f0a500]" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Card Form */}
            {method === "card" && (
              <div className={`${nBg} rounded-2xl border ${br} p-6`}>
                <div className="flex items-center gap-2 mb-5">
                  <FiCreditCard size={16} className="text-[#f0a500]" />
                  <h2 className="text-base font-extrabold text-gray-800 dark:text-white">
                    {isAR ? "تفاصيل البطاقة" : "Card Details"}
                  </h2>
                </div>

                {/* Card Preview */}
                <div
                  className="relative mx-auto mb-6 w-full max-w-sm h-44 rounded-2xl overflow-hidden cursor-pointer select-none"
                  style={{ perspective: "1000px" }}
                  onClick={() => setFlipped(f => !f)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between"
                      style={{ backfaceVisibility: "hidden", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-7 rounded bg-[#f0a500]/80 flex items-center justify-center">
                          <div className="w-6 h-4 rounded bg-[#f0a500]" />
                        </div>
                        {cardNetworkIcon && (
                          <img src={cardNetworkIcon} alt="card" className="h-7 object-contain brightness-0 invert" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-mono text-lg tracking-widest">
                          {card.number || "•••• •••• •••• ••••"}
                        </p>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">{isAR ? "اسم الحامل" : "Card Holder"}</p>
                          <p className="text-white text-sm font-semibold uppercase truncate max-w-[180px]">
                            {card.name || (isAR ? "اسمك هنا" : "YOUR NAME")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">{isAR ? "صالح حتى" : "Expires"}</p>
                          <p className="text-white text-sm font-semibold">{card.expiry || "MM/YY"}</p>
                        </div>
                      </div>
                    </div>
                    {/* Back */}
                    <div
                      className="absolute inset-0 rounded-2xl flex flex-col justify-center"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
                    >
                      <div className="w-full h-10 bg-black/60 mb-4" />
                      <div className="mx-5">
                        <div className="bg-white/20 rounded px-4 py-2 flex items-center justify-end">
                          <p className="text-white font-mono text-sm tracking-widest">{card.cvv || "•••"}</p>
                        </div>
                        <p className="text-white/50 text-[10px] text-right mt-1">{isAR ? "CVV" : "CVV"}</p>
                      </div>
                    </div>
                  </div>
                  <p className="absolute bottom-1.5 right-3 text-white/30 text-[9px]">{isAR ? "اضغط للقلب" : "Click to flip"}</p>
                </div>

                {/* Card inputs */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "رقم البطاقة" : "Card Number"} *</label>
                    <div className="relative">
                      <input
                        value={card.number}
                        onChange={e => setC("number", formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className={`${inputCls} ${errors.number ? "border-[#e05c5c]" : "border-gray-200 dark:border-white/10"} font-mono pr-10`}
                        maxLength={19}
                      />
                      {cardNetworkIcon && (
                        <img src={cardNetworkIcon} alt="" className={`absolute top-1/2 -translate-y-1/2 right-3 h-5 object-contain`} />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "الاسم على البطاقة" : "Name on Card"} *</label>
                    <input
                      value={card.name}
                      onChange={e => setC("name", e.target.value.toUpperCase())}
                      placeholder={isAR ? "محمد العمر" : "JOHN DOE"}
                      className={`${inputCls} ${errors.name ? "border-[#e05c5c]" : "border-gray-200 dark:border-white/10"} uppercase`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "تاريخ الانتهاء" : "Expiry Date"} *</label>
                      <input
                        value={card.expiry}
                        onChange={e => setC("expiry", formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        className={`${inputCls} ${errors.expiry ? "border-[#e05c5c]" : "border-gray-200 dark:border-white/10"} font-mono`}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "رمز CVV" : "CVV"} *</label>
                      <input
                        value={card.cvv}
                        onChange={e => setC("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="•••"
                        type="password"
                        onFocus={() => setFlipped(true)}
                        onBlur={() => setFlipped(false)}
                        className={`${inputCls} ${errors.cvv ? "border-[#e05c5c]" : "border-gray-200 dark:border-white/10"} font-mono`}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 px-3 py-2.5 rounded-xl bg-[#22c55e]/5 border border-[#22c55e]/20">
                  <BsShieldCheck size={14} className="text-[#22c55e] shrink-0" />
                  <p className="text-xs text-[#22c55e]">
                    {isAR ? "بياناتك محمية بتشفير SSL 256-bit" : "Your information is secured with 256-bit SSL encryption"}
                  </p>
                </div>
              </div>
            )}

            {/* Wallet/alt method message */}
            {method !== "card" && (
              <div className={`${nBg} rounded-2xl border ${br} p-8 flex flex-col items-center gap-3`}>
                <img
                  src={PAYMENT_METHODS.find(m => m.id === method)?.img}
                  alt={method}
                  className="h-12 object-contain"
                />
                <p className="text-sm font-semibold text-gray-800 dark:text-white text-center">
                  {isAR
                    ? `ستُحوَّل إلى ${PAYMENT_METHODS.find(m => m.id === method)?.ar} لإتمام الدفع`
                    : `You'll be redirected to ${PAYMENT_METHODS.find(m => m.id === method)?.en} to complete payment`}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <Link href="/checkout" className={`flex items-center gap-2 text-sm font-semibold ${muted} hover:text-[#f0a500] transition-colors`}>
                {isAR ? <FiArrowRight size={14} /> : <FiArrowLeft size={14} />}
                {isAR ? "العودة للشحن" : "Back to Shipping"}
              </Link>
              <button
                type="submit"
                disabled={processing}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all cursor-pointer ${
                  processing ? "bg-[#22c55e] cursor-not-allowed" : "bg-[#f0a500] hover:bg-[#c97000]"
                }`}
              >
                {processing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {isAR ? "جاري المعالجة..." : "Processing..."}
                  </>
                ) : (
                  <>
                    <FiLock size={14} />
                    {isAR ? `ادفع الآن ${sign}${convertPrice(total)}` : `Pay Now ${sign}${convertPrice(total)}`}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${nBg} rounded-2xl border ${br} p-5 sticky top-24 flex flex-col gap-4`}>
              <h2 className="text-base font-extrabold text-gray-800 dark:text-white">
                {isAR ? "ملخص الطلب" : "Order Summary"}
              </h2>
              <div className="flex flex-col gap-3 max-h-48 overflow-y-auto">
                {items.map(({ key, product, qty, options }) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center text-xl shrink-0">
                      {product.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{isAR ? product.nameAR : product.name}</p>
                      <p className={`text-[10px] ${muted}`}>{[options.color, options.size].filter(Boolean).join(" · ")} × {qty}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white shrink-0">{sign}{convertPrice(product.price * qty)}</p>
                  </div>
                ))}
              </div>

              {shipping && (
                <>
                  <div className={`border-t ${br}`} />
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest text-[#f0a500] mb-2`}>{isAR ? "يُشحن إلى" : "Ships To"}</p>
                    <p className="text-xs text-gray-700 dark:text-white/70">{shipping.firstName} {shipping.lastName}</p>
                    <p className={`text-xs ${muted}`}>{shipping.address}, {shipping.city}</p>
                    <p className={`text-xs ${muted}`}>{shipping.country}</p>
                  </div>
                </>
              )}

              <div className={`border-t ${br}`} />
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className={muted}>{isAR ? "المجموع الفرعي" : "Subtotal"}</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{sign}{convertPrice(totalUSD)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={muted}>{isAR ? "الشحن" : "Shipping"}</span>
                  {shippingFee === 0
                    ? <span className="font-semibold text-[#22c55e]">{isAR ? "مجاني" : "Free"}</span>
                    : <span className="font-semibold text-gray-800 dark:text-white">{sign}{convertPrice(shippingFee)}</span>
                  }
                </div>
              </div>
              <div className={`border-t ${br}`} />
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-gray-800 dark:text-white">{isAR ? "الإجمالي" : "Total"}</span>
                <span className="text-xl font-extrabold text-[#f0a500]">{sign}{convertPrice(total)}</span>
              </div>

              {/* Accepted payments */}
              <div className={`pt-2 border-t ${br}`}>
                <p className={`text-[10px] ${muted} mb-2`}>{isAR ? "طرق الدفع المقبولة" : "We accept"}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {["visa", "mastercard", "paypal", "applepay", "googlepay", "mpesa"].map(m => (
                    <img key={m} src={`/assets/payment/${m}.svg`} alt={m} className="h-5 opacity-60" />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
