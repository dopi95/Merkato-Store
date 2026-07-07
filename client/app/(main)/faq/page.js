"use client";
import { useState } from "react";
import { useLang } from "../../context/LangContext";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const faqs = {
  en: [
    {
      category: "Orders & Shipping",
      items: [
        { q: "How long does delivery take?", a: "Standard delivery takes 3–7 business days depending on your location. Express options are available at checkout." },
        { q: "Can I track my order?", a: "Yes! Once your order ships, you'll receive a tracking link via email. You can also track it from your dashboard." },
        { q: "Do you ship internationally?", a: "We ship to 30+ countries across Africa and the Middle East. Shipping costs and times vary by destination." },
        { q: "What is the free shipping threshold?", a: "Orders over $100 qualify for free standard shipping." },
      ],
    },
    {
      category: "Returns & Refunds",
      items: [
        { q: "What is your return policy?", a: "You can return most items within 30 days of delivery for a full refund, provided they are unused and in original packaging." },
        { q: "How do I start a return?", a: "Go to your dashboard, find the order, and click 'Return Item'. Our team will guide you through the process." },
        { q: "When will I receive my refund?", a: "Refunds are processed within 5–10 business days after we receive the returned item." },
      ],
    },
    {
      category: "Payments",
      items: [
        { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, PayPal, Apple Pay, Google Pay, and M-Pesa." },
        { q: "Is my payment information secure?", a: "Absolutely. All transactions are encrypted with SSL and we never store your card details." },
        { q: "Can I pay in my local currency?", a: "Yes, you can switch currencies using the currency selector in the header." },
      ],
    },
    {
      category: "Account",
      items: [
        { q: "How do I create an account?", a: "Click 'Sign Up' in the header, fill in your details, and verify your email to get started." },
        { q: "I forgot my password. What do I do?", a: "Click 'Forgot Password' on the sign-in page and we'll send a reset link to your email." },
        { q: "Can I have multiple delivery addresses?", a: "Yes, you can save multiple addresses in your dashboard under 'Addresses'." },
      ],
    },
  ],
  ar: [
    {
      category: "الطلبات والشحن",
      items: [
        { q: "كم يستغرق التوصيل؟", a: "يستغرق التوصيل العادي من 3 إلى 7 أيام عمل حسب موقعك. خيارات التوصيل السريع متاحة عند الدفع." },
        { q: "هل يمكنني تتبع طلبي؟", a: "نعم! بمجرد شحن طلبك، ستتلقى رابط تتبع عبر البريد الإلكتروني. يمكنك أيضاً تتبعه من لوحة التحكم." },
        { q: "هل تشحنون دولياً؟", a: "نشحن إلى أكثر من 30 دولة في أفريقيا والشرق الأوسط. تختلف تكاليف الشحن والأوقات حسب الوجهة." },
        { q: "ما هو حد الشحن المجاني؟", a: "الطلبات التي تتجاوز 100 دولار تحصل على شحن مجاني." },
      ],
    },
    {
      category: "الإرجاع والاسترداد",
      items: [
        { q: "ما هي سياسة الإرجاع؟", a: "يمكنك إرجاع معظم المنتجات خلال 30 يوماً من التسليم للحصول على استرداد كامل، شريطة أن تكون غير مستخدمة وفي عبوتها الأصلية." },
        { q: "كيف أبدأ عملية الإرجاع؟", a: "اذهب إلى لوحة التحكم، ابحث عن الطلب، واضغط 'إرجاع المنتج'. سيرشدك فريقنا خلال العملية." },
        { q: "متى سأستلم استردادي؟", a: "تتم معالجة المبالغ المستردة خلال 5 إلى 10 أيام عمل بعد استلام المنتج المُرجَع." },
      ],
    },
    {
      category: "المدفوعات",
      items: [
        { q: "ما طرق الدفع المقبولة؟", a: "نقبل فيزا، ماستركارد، باي بال، آبل باي، جوجل باي، وM-Pesa." },
        { q: "هل معلومات الدفع الخاصة بي آمنة؟", a: "بالتأكيد. جميع المعاملات مشفرة بـ SSL ولا نحتفظ ببيانات بطاقتك أبداً." },
        { q: "هل يمكنني الدفع بعملتي المحلية؟", a: "نعم، يمكنك تغيير العملة باستخدام محدد العملة في الرأس." },
      ],
    },
    {
      category: "الحساب",
      items: [
        { q: "كيف أنشئ حساباً؟", a: "اضغط 'إنشاء حساب' في الرأس، أدخل بياناتك، وتحقق من بريدك الإلكتروني للبدء." },
        { q: "نسيت كلمة المرور. ماذا أفعل؟", a: "اضغط 'نسيت كلمة المرور' في صفحة تسجيل الدخول وسنرسل رابط إعادة تعيين إلى بريدك." },
        { q: "هل يمكنني حفظ أكثر من عنوان توصيل؟", a: "نعم، يمكنك حفظ عناوين متعددة في لوحة التحكم تحت 'العناوين'." },
      ],
    },
  ],
};

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  const br = "border-gray-100 dark:border-white/5";
  return (
    <div className={`border-b ${br} last:border-0`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left cursor-pointer group"
      >
        <span className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-[#f0a500] transition-colors">{q}</span>
        <FiChevronDown size={16} className={`text-[#f0a500] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="text-sm text-gray-500 dark:text-white/50 pb-4 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const data = faqs[isAR ? "ar" : "en"];
  const [query, setQuery] = useState("");

  const br = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  const filtered = data.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0a500]/15 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold uppercase tracking-widest">
            {isAR ? "الأسئلة الشائعة" : "FAQ"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            {isAR ? "كيف يمكننا مساعدتك؟" : "How can we help?"}
          </h1>
          {/* Search */}
          <div className={`w-full max-w-md flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-[#f0a500]/50 transition-all`}>
            <FiSearch size={16} className="text-white/40 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={isAR ? "ابحث في الأسئلة..." : "Search questions..."}
              dir={isAR ? "rtl" : "ltr"}
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className={`font-semibold ${muted}`}>{isAR ? "لا توجد نتائج" : "No results found"}</p>
          </div>
        ) : (
          filtered.map((cat, i) => (
            <div key={i} className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} px-6 py-2`}>
              <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] py-4">{cat.category}</p>
              {cat.items.map((item, j) => <Item key={j} q={item.q} a={item.a} />)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
