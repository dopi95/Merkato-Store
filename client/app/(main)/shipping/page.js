"use client";
import { useLang } from "../../context/LangContext";
import { FiTruck, FiZap, FiMapPin, FiAlertCircle } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";

const t = {
  en: {
    badge: "Shipping Info",
    title: "Fast & reliable",
    titleAccent: "delivery",
    sub: "We ship to 30+ countries across Africa and the Middle East. Here's everything you need to know.",
    methodsTitle: "Shipping Methods",
    methods: [
      { icon: <FiTruck size={20} />, title: "Standard Shipping", time: "3–7 business days", price: "From $4.99 · Free over $100" },
      { icon: <FiZap size={20} />, title: "Express Shipping", time: "1–3 business days", price: "From $12.99" },
      { icon: <BsBoxSeam size={20} />, title: "Same-Day Delivery", time: "Order before 12 PM", price: "Available in select cities · From $19.99" },
    ],
    zonesTitle: "Delivery Zones",
    zones: [
      { region: "East Africa", countries: "Kenya, Ethiopia, Tanzania, Uganda, Rwanda", time: "3–5 days" },
      { region: "West Africa", countries: "Nigeria, Ghana, Senegal, Côte d'Ivoire", time: "4–7 days" },
      { region: "North Africa", countries: "Egypt, Morocco, Tunisia, Algeria", time: "3–5 days" },
      { region: "Middle East", countries: "UAE, Saudi Arabia, Qatar, Kuwait, Jordan", time: "2–4 days" },
      { region: "Rest of Africa", countries: "Other African countries", time: "5–10 days" },
    ],
    notesTitle: "Important Notes",
    notes: [
      "Delivery times are estimates and may vary due to customs or local conditions.",
      "Orders placed on weekends or public holidays are processed the next business day.",
      "You'll receive a tracking link via email once your order ships.",
      "Customs duties and import taxes may apply depending on your country.",
    ],
  },
  ar: {
    badge: "معلومات الشحن",
    title: "توصيل سريع",
    titleAccent: "وموثوق",
    sub: "نشحن إلى أكثر من 30 دولة في أفريقيا والشرق الأوسط. إليك كل ما تحتاج معرفته.",
    methodsTitle: "طرق الشحن",
    methods: [
      { icon: <FiTruck size={20} />, title: "الشحن العادي", time: "3–7 أيام عمل", price: "من 4.99$ · مجاني فوق 100$" },
      { icon: <FiZap size={20} />, title: "الشحن السريع", time: "1–3 أيام عمل", price: "من 12.99$" },
      { icon: <BsBoxSeam size={20} />, title: "التوصيل في نفس اليوم", time: "اطلب قبل الساعة 12 ظهراً", price: "متاح في مدن مختارة · من 19.99$" },
    ],
    zonesTitle: "مناطق التوصيل",
    zones: [
      { region: "شرق أفريقيا", countries: "كينيا، إثيوبيا، تنزانيا، أوغندا، رواندا", time: "3–5 أيام" },
      { region: "غرب أفريقيا", countries: "نيجيريا، غانا، السنغال، ساحل العاج", time: "4–7 أيام" },
      { region: "شمال أفريقيا", countries: "مصر، المغرب، تونس، الجزائر", time: "3–5 أيام" },
      { region: "الشرق الأوسط", countries: "الإمارات، السعودية، قطر، الكويت، الأردن", time: "2–4 أيام" },
      { region: "بقية أفريقيا", countries: "دول أفريقية أخرى", time: "5–10 أيام" },
    ],
    notesTitle: "ملاحظات مهمة",
    notes: [
      "أوقات التوصيل تقديرية وقد تتفاوت بسبب الجمارك أو الظروف المحلية.",
      "الطلبات المقدمة في عطل نهاية الأسبوع أو الأعياد تُعالَج في يوم العمل التالي.",
      "ستتلقى رابط تتبع عبر البريد الإلكتروني بمجرد شحن طلبك.",
      "قد تُطبَّق رسوم جمركية وضرائب استيراد حسب بلدك.",
    ],
  },
};

export default function ShippingPage() {
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
            <FiTruck size={11} /> {c.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            {c.title} <span className="text-[#f0a500]">{c.titleAccent}</span>
          </h1>
          <p className={`text-sm sm:text-base max-w-md ${muted}`}>{c.sub}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">

        {/* Methods */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-5">{c.methodsTitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {c.methods.map((m, i) => (
              <div key={i} className={`flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-[#13112a] border ${br}`}>
                <span className="text-[#f0a500]">{m.icon}</span>
                <p className="font-bold text-gray-800 dark:text-white text-sm">{m.title}</p>
                <p className="text-xs font-semibold text-[#f0a500]">{m.time}</p>
                <p className={`text-xs ${muted}`}>{m.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zones */}
        <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6`}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-4">{c.zonesTitle}</p>
          <div className="flex flex-col gap-0">
            {c.zones.map((z, i) => (
              <div key={i} className={`grid grid-cols-3 gap-4 py-3 border-b ${br} last:border-0`}>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{z.region}</p>
                </div>
                <div className="col-span-1">
                  <p className={`text-xs ${muted}`}>{z.countries}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#f0a500]">{z.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6`}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-4">{c.notesTitle}</p>
          <div className="flex flex-col gap-3">
            {c.notes.map((n, i) => (
              <div key={i} className="flex items-start gap-3">
                <FiAlertCircle size={14} className="text-[#f0a500] shrink-0 mt-0.5" />
                <p className={`text-sm ${muted}`}>{n}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
