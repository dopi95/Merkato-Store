"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiCheck, FiPackage, FiMapPin, FiPrinter, FiShoppingBag, FiMail } from "react-icons/fi";
import { BsTruck } from "react-icons/bs";
import { useLang } from "../../../context/LangContext";
import { useCurrency } from "../../../context/CurrencyContext";

const PAYMENT_LABELS = {
  card:      { en: "Credit / Debit Card", ar: "بطاقة ائتمان / خصم" },
  paypal:    { en: "PayPal",              ar: "باي بال" },
  applepay:  { en: "Apple Pay",           ar: "آبل باي" },
  googlepay: { en: "Google Pay",          ar: "جوجل باي" },
  mpesa:     { en: "M-Pesa",              ar: "إم-بيسا" },
};

export default function ConfirmationPage() {
  const { lang } = useLang();
  const { convertPrice, sign } = useCurrency();
  const isAR = lang === "ar";
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const data = sessionStorage.getItem("merkato_order");
      if (data) setOrder(JSON.parse(data));
    } catch {}
  }, []);

  const nBg   = "bg-white dark:bg-[#13112a]";
  const br    = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a] flex flex-col items-center justify-center gap-4 px-4" dir={isAR ? "rtl" : "ltr"}>
        <span className="text-6xl">📦</span>
        <p className="text-gray-800 dark:text-white font-bold">{isAR ? "لا يوجد طلب" : "No order found"}</p>
        <Link href="/" className="px-6 py-3 rounded-xl bg-[#f0a500] text-white font-bold hover:bg-[#c97000] transition-colors">
          {isAR ? "العودة للرئيسية" : "Go Home"}
        </Link>
      </div>
    );
  }

  const estimatedDate = new Date(order.date);
  estimatedDate.setDate(estimatedDate.getDate() + 7);
  const formatted = estimatedDate.toLocaleDateString(isAR ? "ar-EG" : "en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const orderDate  = new Date(order.date).toLocaleDateString(isAR ? "ar-EG" : "en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { n: 1, en: "Shipping", ar: "الشحن",  done: true },
            { n: 2, en: "Payment",  ar: "الدفع",   done: true },
            { n: 3, en: "Receipt",  ar: "الإيصال", active: true },
          ].map((step, i, arr) => (
            <div key={step.n} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className={`flex items-center gap-2 ${step.active ? "text-[#f0a500]" : "text-[#22c55e]"}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                  step.active ? "bg-[#f0a500] text-white" : "bg-[#22c55e] text-white"
                }`}>
                  {step.active ? step.n : <FiCheck size={12} />}
                </span>
                <span className="text-sm font-semibold whitespace-nowrap">{isAR ? step.ar : step.en}</span>
              </div>
              {i < arr.length - 1 && <div className={`flex-1 h-px mx-2 ${br} border-t`} />}
            </div>
          ))}
        </div>

        {/* Success Banner */}
        <div className={`${nBg} rounded-2xl border ${br} p-8 text-center mb-6`}>
          <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 border-2 border-[#22c55e] flex items-center justify-center mx-auto mb-4">
            <FiCheck size={28} className="text-[#22c55e]" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-1">
            {isAR ? "تم تأكيد طلبك! 🎉" : "Order Confirmed! 🎉"}
          </h1>
          <p className={`text-sm ${muted} mb-4`}>
            {isAR
              ? "شكراً لك! سيتم إرسال تفاصيل طلبك عبر البريد الإلكتروني."
              : "Thank you! Your order details have been sent to your email."}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5">
            <span className={`text-xs ${muted}`}>{isAR ? "رقم الطلب:" : "Order ID:"}</span>
            <span className="text-sm font-extrabold text-[#f0a500] font-mono">{order.orderId}</span>
          </div>
        </div>

        {/* Receipt Card */}
        <div className={`${nBg} rounded-2xl border ${br} overflow-hidden mb-4`} id="receipt-content">

          {/* Receipt Header */}
          <div className="bg-gradient-to-r from-[#0d0d1a] to-[#1a1033] px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#f0a500]">Merkato Store</p>
              <p className="text-xs text-white/60 mt-0.5">{isAR ? "إيصال الطلب" : "Order Receipt"}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">{isAR ? "تاريخ الطلب" : "Order Date"}</p>
              <p className="text-xs font-semibold text-white">{orderDate}</p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="flex items-center gap-3 px-6 py-4 bg-[#f0a500]/5 border-b border-[#f0a500]/10">
            <BsTruck size={20} className="text-[#f0a500] shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-white">{isAR ? "التسليم المتوقع" : "Estimated Delivery"}</p>
              <p className="text-sm font-extrabold text-[#f0a500]">{formatted}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-2 mb-4">
              <FiPackage size={15} className="text-[#f0a500]" />
              <p className="text-sm font-extrabold text-gray-800 dark:text-white">{isAR ? "المنتجات المطلوبة" : "Items Ordered"}</p>
            </div>
            <div className="flex flex-col gap-3">
              {order.items.map(({ key, product, qty, options }) => (
                <div key={key} className={`flex items-center gap-3 pb-3 border-b ${br} last:border-0 last:pb-0`}>
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center text-2xl shrink-0">
                    {product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{isAR ? product.nameAR : product.name}</p>
                    <p className={`text-xs ${muted}`}>
                      {[options.color && `${isAR ? "اللون" : "Color"}: ${options.color}`, options.size && `${isAR ? "المقاس" : "Size"}: ${options.size}`].filter(Boolean).join(" · ")}
                    </p>
                    <p className={`text-xs ${muted}`}>{isAR ? "الكمية" : "Qty"}: {qty}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{sign}{convertPrice(product.price * qty)}</p>
                    <p className={`text-[10px] ${muted}`}>{sign}{convertPrice(product.price)} {isAR ? "للوحدة" : "each"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping + Payment + Totals */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-0 border-t ${br}`}>
            {order.shipping && (
              <div className={`px-6 py-4 border-b sm:border-b-0 sm:border-r ${br}`}>
                <div className="flex items-center gap-2 mb-3">
                  <FiMapPin size={14} className="text-[#f0a500]" />
                  <p className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-widest">{isAR ? "عنوان الشحن" : "Ship To"}</p>
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{order.shipping.firstName} {order.shipping.lastName}</p>
                <p className={`text-xs ${muted}`}>{order.shipping.address}</p>
                <p className={`text-xs ${muted}`}>{order.shipping.city}{order.shipping.state ? `, ${order.shipping.state}` : ""} {order.shipping.zip}</p>
                <p className={`text-xs ${muted}`}>{order.shipping.country}</p>
                {order.shipping.phone && <p className={`text-xs ${muted} mt-1`}>{order.shipping.phone}</p>}
              </div>
            )}
            <div className="px-6 py-4">
              <div className="flex items-center gap-2 mb-3">
                <FiMail size={14} className="text-[#f0a500]" />
                <p className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-widest">{isAR ? "تفاصيل الدفع" : "Payment"}</p>
              </div>
              <p className={`text-sm font-semibold text-gray-800 dark:text-white`}>
                {PAYMENT_LABELS[order.method]?.[isAR ? "ar" : "en"] || order.method}
              </p>
              {order.shipping?.email && (
                <p className={`text-xs ${muted} mt-1`}>{order.shipping.email}</p>
              )}
            </div>
          </div>

          {/* Totals */}
          <div className={`px-6 py-4 border-t ${br} bg-gray-50 dark:bg-[#0f0f1a]`}>
            <div className="flex flex-col gap-2 max-w-xs ml-auto">
              <div className="flex justify-between text-sm">
                <span className={muted}>{isAR ? "المجموع الفرعي" : "Subtotal"}</span>
                <span className="font-semibold text-gray-800 dark:text-white">{sign}{convertPrice(order.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={muted}>{isAR ? "الشحن" : "Shipping"}</span>
                {order.shippingFee === 0
                  ? <span className="font-semibold text-[#22c55e]">{isAR ? "مجاني" : "Free"}</span>
                  : <span className="font-semibold text-gray-800 dark:text-white">{sign}{convertPrice(order.shippingFee)}</span>
                }
              </div>
              <div className={`border-t ${br} pt-2 flex justify-between items-center`}>
                <span className="font-extrabold text-gray-800 dark:text-white">{isAR ? "الإجمالي المدفوع" : "Total Paid"}</span>
                <span className="text-lg font-extrabold text-[#f0a500]">{sign}{convertPrice(order.totalFinal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => window.print()}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-white/80 hover:border-[#f0a500] hover:text-[#f0a500] transition-colors cursor-pointer`}
          >
            <FiPrinter size={15} />
            {isAR ? "طباعة الإيصال" : "Print Receipt"}
          </button>
          <Link
            href="/products"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white font-bold transition-colors"
          >
            <FiShoppingBag size={15} />
            {isAR ? "مواصلة التسوق" : "Continue Shopping"}
          </Link>
        </div>

      </div>
    </div>
  );
}
