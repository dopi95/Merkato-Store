"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiMapPin, FiUser, FiPhone, FiMail, FiChevronDown } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import { useLang } from "../../context/LangContext";
import { useCurrency } from "../../context/CurrencyContext";

const COUNTRIES = [
  { code: "NG", en: "Nigeria",       ar: "نيجيريا" },
  { code: "KE", en: "Kenya",         ar: "كينيا" },
  { code: "ET", en: "Ethiopia",      ar: "إثيوبيا" },
  { code: "AE", en: "UAE",           ar: "الإمارات" },
  { code: "EG", en: "Egypt",         ar: "مصر" },
  { code: "SA", en: "Saudi Arabia",  ar: "السعودية" },
  { code: "US", en: "United States", ar: "الولايات المتحدة" },
  { code: "GB", en: "United Kingdom",ar: "المملكة المتحدة" },
  { code: "GH", en: "Ghana",         ar: "غانا" },
  { code: "ZA", en: "South Africa",  ar: "جنوب أفريقيا" },
];

export default function CheckoutPage() {
  const { items, totalUSD } = useCart();
  const { lang } = useLang();
  const { convertPrice, sign } = useCurrency();
  const router = useRouter();
  const isAR = lang === "ar";

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "US",
    saveAddress: false,
  });
  const [errors, setErrors] = useState({});

  const shipping = totalUSD >= 100 ? 0 : 9.99;
  const total = totalUSD + shipping;

  const nBg  = "bg-white dark:bg-[#13112a]";
  const br   = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";
  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-[#0f0f1a] placeholder-gray-400 dark:placeholder-white/30 outline-none transition-colors focus:border-[#f0a500]`;

  function set(field, val) {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = true;
    if (!form.lastName.trim())  e.lastName  = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.phone.trim())     e.phone     = true;
    if (!form.address.trim())   e.address   = true;
    if (!form.city.trim())      e.city      = true;
    if (!form.country)          e.country   = true;
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // Store shipping info for next step
    sessionStorage.setItem("merkato_shipping", JSON.stringify(form));
    router.push("/checkout/payment");
  }

  const fieldClass = (field) =>
    `${inputCls} ${errors[field] ? "border-[#e05c5c]" : `border-gray-200 dark:border-white/10`}`;

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { n: 1, en: "Shipping", ar: "الشحن" },
            { n: 2, en: "Payment",  ar: "الدفع" },
            { n: 3, en: "Receipt",  ar: "الإيصال" },
          ].map((step, i, arr) => (
            <div key={step.n} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`flex items-center gap-2 ${step.n === 1 ? "text-[#f0a500]" : muted}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                  step.n === 1 ? "bg-[#f0a500] text-white" : "bg-gray-200 dark:bg-white/10"
                }`}>{step.n}</span>
                <span className="text-sm font-semibold whitespace-nowrap">{isAR ? step.ar : step.en}</span>
              </div>
              {i < arr.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${br} border-t`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-5">
            <div className={`${nBg} rounded-2xl border ${br} p-6`}>
              <div className="flex items-center gap-2 mb-5">
                <FiUser size={16} className="text-[#f0a500]" />
                <h2 className="text-base font-extrabold text-gray-800 dark:text-white">
                  {isAR ? "معلومات شخصية" : "Personal Information"}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "الاسم الأول" : "First Name"} *</label>
                  <input value={form.firstName} onChange={e => set("firstName", e.target.value)}
                    placeholder={isAR ? "محمد" : "John"} className={fieldClass("firstName")} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "اسم العائلة" : "Last Name"} *</label>
                  <input value={form.lastName} onChange={e => set("lastName", e.target.value)}
                    placeholder={isAR ? "العمر" : "Doe"} className={fieldClass("lastName")} />
                </div>
                <div>
                  <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "البريد الإلكتروني" : "Email"} *</label>
                  <div className="relative">
                    <FiMail size={14} className={`absolute top-1/2 -translate-y-1/2 ${isAR ? "right-3" : "left-3"} ${muted}`} />
                    <input value={form.email} onChange={e => set("email", e.target.value)}
                      type="email" placeholder="you@email.com"
                      className={`${fieldClass("email")} ${isAR ? "pr-9" : "pl-9"}`} />
                  </div>
                </div>
                <div>
                  <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "رقم الهاتف" : "Phone"} *</label>
                  <div className="relative">
                    <FiPhone size={14} className={`absolute top-1/2 -translate-y-1/2 ${isAR ? "right-3" : "left-3"} ${muted}`} />
                    <input value={form.phone} onChange={e => set("phone", e.target.value)}
                      type="tel" placeholder="+1 234 567 8900"
                      className={`${fieldClass("phone")} ${isAR ? "pr-9" : "pl-9"}`} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${nBg} rounded-2xl border ${br} p-6`}>
              <div className="flex items-center gap-2 mb-5">
                <FiMapPin size={16} className="text-[#f0a500]" />
                <h2 className="text-base font-extrabold text-gray-800 dark:text-white">
                  {isAR ? "عنوان الشحن" : "Shipping Address"}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "العنوان" : "Street Address"} *</label>
                  <input value={form.address} onChange={e => set("address", e.target.value)}
                    placeholder={isAR ? "الشارع، رقم المبنى..." : "123 Main Street, Apt 4B"}
                    className={fieldClass("address")} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "المدينة" : "City"} *</label>
                    <input value={form.city} onChange={e => set("city", e.target.value)}
                      placeholder={isAR ? "القاهرة" : "New York"} className={fieldClass("city")} />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "المنطقة / الولاية" : "State / Region"}</label>
                    <input value={form.state} onChange={e => set("state", e.target.value)}
                      placeholder={isAR ? "القاهرة" : "NY"} className={`${inputCls} border-gray-200 dark:border-white/10`} />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "الرمز البريدي" : "ZIP / Postal Code"}</label>
                    <input value={form.zip} onChange={e => set("zip", e.target.value)}
                      placeholder="10001" className={`${inputCls} border-gray-200 dark:border-white/10`} />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "الدولة" : "Country"} *</label>
                    <div className="relative">
                      <select
                        value={form.country}
                        onChange={e => set("country", e.target.value)}
                        className={`${fieldClass("country")} appearance-none pr-8`}
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.code} value={c.code}>{isAR ? c.ar : c.en}</option>
                        ))}
                      </select>
                      <FiChevronDown size={14} className={`absolute top-1/2 -translate-y-1/2 right-3 ${muted} pointer-events-none`} />
                    </div>
                  </div>
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.saveAddress}
                    onChange={e => set("saveAddress", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 accent-[#f0a500]"
                  />
                  <span className={`text-sm ${muted}`}>{isAR ? "حفظ العنوان للطلبات القادمة" : "Save address for future orders"}</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <Link
                href="/cart"
                className={`flex items-center gap-2 text-sm font-semibold ${muted} hover:text-[#f0a500] transition-colors`}
              >
                {isAR ? <FiArrowRight size={14} /> : <FiArrowLeft size={14} />}
                {isAR ? "العودة للسلة" : "Back to Cart"}
              </Link>
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white font-bold transition-colors cursor-pointer"
              >
                {isAR ? "المتابعة للدفع" : "Continue to Payment"}
                {isAR ? <FiArrowLeft size={16} /> : <FiArrowRight size={16} />}
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${nBg} rounded-2xl border ${br} p-5 sticky top-24 flex flex-col gap-4`}>
              <h2 className="text-base font-extrabold text-gray-800 dark:text-white">
                {isAR ? "ملخص الطلب" : "Order Summary"}
              </h2>
              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                {items.map(({ key, product, qty, options }) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center text-xl shrink-0">
                      {product.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{isAR ? product.nameAR : product.name}</p>
                      <p className={`text-[10px] ${muted}`}>
                        {[options.color, options.size].filter(Boolean).join(" · ")} × {qty}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white shrink-0">{sign}{convertPrice(product.price * qty)}</p>
                  </div>
                ))}
              </div>
              <div className={`border-t ${br}`} />
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className={muted}>{isAR ? "المجموع الفرعي" : "Subtotal"}</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{sign}{convertPrice(totalUSD)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={muted}>{isAR ? "الشحن" : "Shipping"}</span>
                  {shipping === 0
                    ? <span className="font-semibold text-[#22c55e]">{isAR ? "مجاني" : "Free"}</span>
                    : <span className="font-semibold text-gray-800 dark:text-white">{sign}{convertPrice(shipping)}</span>
                  }
                </div>
              </div>
              <div className={`border-t ${br}`} />
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-gray-800 dark:text-white">{isAR ? "الإجمالي" : "Total"}</span>
                <span className="text-xl font-extrabold text-[#f0a500]">{sign}{convertPrice(total)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
