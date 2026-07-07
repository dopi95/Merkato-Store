"use client";
import Link from "next/link";
import { useLang } from "../../context/LangContext";
import { FiRefreshCw, FiAlertCircle, FiCheck, FiX } from "react-icons/fi";

const t = {
  en: {
    badge: "Returns & Refunds",
    title: "Hassle-free",
    titleAccent: "returns",
    sub: "Not happy with your order? We make returns simple and refunds fast.",
    policyTitle: "Return Policy",
    policy: [
      { icon: <FiCheck size={14} />, ok: true, text: "Return within 30 days of delivery" },
      { icon: <FiCheck size={14} />, ok: true, text: "Item must be unused and in original packaging" },
      { icon: <FiCheck size={14} />, ok: true, text: "Free returns on defective or wrong items" },
      { icon: <FiX size={14} />, ok: false, text: "Perishable goods (groceries) cannot be returned" },
      { icon: <FiX size={14} />, ok: false, text: "Digital products and gift cards are non-refundable" },
      { icon: <FiX size={14} />, ok: false, text: "Items marked 'Final Sale' are not eligible" },
    ],
    stepsTitle: "How to Return",
    steps: [
      { n: "1", title: "Initiate Return", desc: "Go to your dashboard → Orders → select the item → click 'Return'." },
      { n: "2", title: "Pack Your Item", desc: "Securely pack the item in its original packaging with all accessories." },
      { n: "3", title: "Ship It Back", desc: "Drop it off at any partner courier. We'll email you a prepaid label for eligible returns." },
      { n: "4", title: "Get Refunded", desc: "Once received and inspected, your refund is processed within 5–10 business days." },
    ],
    refundTitle: "Refund Timeline",
    refunds: [
      { method: "Credit / Debit Card", time: "5–10 business days" },
      { method: "PayPal", time: "3–5 business days" },
      { method: "M-Pesa", time: "1–3 business days" },
      { method: "Store Credit", time: "Instant" },
    ],
    helpText: "Need help with a return?",
    helpLink: "Contact Support",
  },
  ar: {
    badge: "الإرجاع والاسترداد",
    title: "إرجاع",
    titleAccent: "بلا متاعب",
    sub: "غير راضٍ عن طلبك؟ نجعل الإرجاع بسيطاً والاسترداد سريعاً.",
    policyTitle: "سياسة الإرجاع",
    policy: [
      { icon: <FiCheck size={14} />, ok: true, text: "الإرجاع خلال 30 يوماً من التسليم" },
      { icon: <FiCheck size={14} />, ok: true, text: "يجب أن يكون المنتج غير مستخدم وفي عبوته الأصلية" },
      { icon: <FiCheck size={14} />, ok: true, text: "إرجاع مجاني للمنتجات المعيبة أو الخاطئة" },
      { icon: <FiX size={14} />, ok: false, text: "لا يمكن إرجاع البضائع القابلة للتلف (البقالة)" },
      { icon: <FiX size={14} />, ok: false, text: "المنتجات الرقمية وبطاقات الهدايا غير قابلة للاسترداد" },
      { icon: <FiX size={14} />, ok: false, text: "المنتجات المُعلَّمة 'بيع نهائي' غير مؤهلة" },
    ],
    stepsTitle: "كيفية الإرجاع",
    steps: [
      { n: "١", title: "ابدأ الإرجاع", desc: "اذهب إلى لوحة التحكم ← الطلبات ← اختر المنتج ← اضغط 'إرجاع'." },
      { n: "٢", title: "احزم منتجك", desc: "احزم المنتج بأمان في عبوته الأصلية مع جميع الملحقات." },
      { n: "٣", title: "أرسله", desc: "أسلّمه لأي شريك شحن. سنرسل لك ملصق شحن مدفوع مسبقاً للإرجاع المؤهل." },
      { n: "٤", title: "استلم استردادك", desc: "بعد الاستلام والفحص، يُعالَج استردادك خلال 5–10 أيام عمل." },
    ],
    refundTitle: "جدول الاسترداد",
    refunds: [
      { method: "بطاقة ائتمان / خصم", time: "5–10 أيام عمل" },
      { method: "باي بال", time: "3–5 أيام عمل" },
      { method: "M-Pesa", time: "1–3 أيام عمل" },
      { method: "رصيد المتجر", time: "فوري" },
    ],
    helpText: "تحتاج مساعدة في الإرجاع؟",
    helpLink: "تواصل مع الدعم",
  },
};

export default function ReturnsPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = t[isAR ? "ar" : "en"];
  const br = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0a500]/15 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold uppercase tracking-widest">
            <FiRefreshCw size={11} /> {c.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            {c.title} <span className="text-[#f0a500]">{c.titleAccent}</span>
          </h1>
          <p className={`text-sm sm:text-base max-w-md ${muted}`}>{c.sub}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">

        {/* Policy */}
        <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6`}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-4">{c.policyTitle}</p>
          <div className="flex flex-col gap-3">
            {c.policy.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${p.ok ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#e05c5c]/15 text-[#e05c5c]"}`}>{p.icon}</span>
                <span className="text-sm text-gray-700 dark:text-white/70">{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-5">{c.stepsTitle}</p>
          <div className="flex flex-col gap-3">
            {c.steps.map((s, i) => (
              <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#13112a] border ${br}`}>
                <span className="w-8 h-8 rounded-full bg-[#f0a500]/15 text-[#f0a500] font-extrabold text-sm flex items-center justify-center shrink-0">{s.n}</span>
                <div>
                  <p className="font-bold text-gray-800 dark:text-white text-sm">{s.title}</p>
                  <p className={`text-sm mt-1 ${muted}`}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund timeline */}
        <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6`}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-4">{c.refundTitle}</p>
          <div className="flex flex-col gap-2">
            {c.refunds.map((r, i) => (
              <div key={i} className={`flex items-center justify-between py-2.5 border-b ${br} last:border-0`}>
                <span className={`text-sm ${muted}`}>{r.method}</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white">{r.time}</span>
              </div>
            ))}
          </div>
        </div>

        <p className={`text-center text-sm ${muted}`}>
          {c.helpText}{" "}
          <Link href="/contact" className="text-[#f0a500] font-semibold hover:underline">{c.helpLink}</Link>
        </p>

      </div>
    </div>
  );
}
