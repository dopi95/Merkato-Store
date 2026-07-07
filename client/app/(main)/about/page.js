"use client";
import { useLang } from "../../context/LangContext";
import { BsGlobe2, BsShieldCheck, BsHeadset, BsTruck } from "react-icons/bs";
import { FiUsers, FiPackage, FiStar, FiMapPin } from "react-icons/fi";

const t = {
  en: {
    badge: "Our Story",
    title: "Built for Africa &",
    titleAccent: "the Middle East",
    sub: "Merkato Store is a premium e-commerce marketplace connecting millions of shoppers with top brands across Africa and the Middle East — delivering quality, trust, and convenience to your doorstep.",
    stats: [
      { icon: <FiUsers size={22} />, value: "2M+", label: "Happy Customers" },
      { icon: <FiPackage size={22} />, value: "50K+", label: "Products Listed" },
      { icon: <FiMapPin size={22} />, value: "30+", label: "Countries Served" },
      { icon: <FiStar size={22} />, value: "4.8", label: "Average Rating" },
    ],
    missionTitle: "Our Mission",
    mission: "To make premium products accessible to everyone across Africa and the Middle East — with fair prices, fast delivery, and world-class customer support.",
    valuesTitle: "Why Choose Us",
    values: [
      { icon: <BsTruck size={22} />, title: "Fast Delivery", desc: "Reliable shipping across 30+ countries with real-time tracking." },
      { icon: <BsShieldCheck size={22} />, title: "Secure Shopping", desc: "Every transaction is encrypted and fully protected." },
      { icon: <BsHeadset size={22} />, title: "24/7 Support", desc: "Our team is always ready to help you, any time of day." },
      { icon: <BsGlobe2 size={22} />, title: "Global Brands", desc: "Authentic products from the world's most trusted brands." },
    ],
  },
  ar: {
    badge: "قصتنا",
    title: "بُني لأفريقيا",
    titleAccent: "والشرق الأوسط",
    sub: "ميركاتو ستور هو سوق إلكتروني متميز يربط ملايين المتسوقين بأفضل العلامات التجارية عبر أفريقيا والشرق الأوسط — نوصل الجودة والثقة والراحة إلى بابك.",
    stats: [
      { icon: <FiUsers size={22} />, value: "+2M", label: "عميل سعيد" },
      { icon: <FiPackage size={22} />, value: "+50K", label: "منتج متاح" },
      { icon: <FiMapPin size={22} />, value: "+30", label: "دولة نخدمها" },
      { icon: <FiStar size={22} />, value: "4.8", label: "متوسط التقييم" },
    ],
    missionTitle: "مهمتنا",
    mission: "جعل المنتجات المتميزة في متناول الجميع عبر أفريقيا والشرق الأوسط — بأسعار عادلة وتوصيل سريع ودعم عملاء على مستوى عالمي.",
    valuesTitle: "لماذا تختارنا",
    values: [
      { icon: <BsTruck size={22} />, title: "توصيل سريع", desc: "شحن موثوق عبر أكثر من 30 دولة مع تتبع فوري." },
      { icon: <BsShieldCheck size={22} />, title: "تسوق آمن", desc: "كل معاملة مشفرة ومحمية بالكامل." },
      { icon: <BsHeadset size={22} />, title: "دعم 24/7", desc: "فريقنا جاهز دائماً لمساعدتك في أي وقت." },
      { icon: <BsGlobe2 size={22} />, title: "علامات عالمية", desc: "منتجات أصلية من أكثر العلامات التجارية ثقةً في العالم." },
    ],
  },
};

export default function AboutPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = t[isAR ? "ar" : "en"];

  const muted = "text-gray-500 dark:text-white/50";
  const br = "border-gray-100 dark:border-white/5";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#a855f7]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0a500]/15 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold uppercase tracking-widest">
            {c.badge}
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
            {c.title}
            <span className="block text-[#f0a500]">{c.titleAccent}</span>
          </h1>
          <p className={`text-sm sm:text-base max-w-2xl ${muted}`}>{c.sub}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 flex flex-col gap-14">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {c.stats.map((s, i) => (
            <div key={i} className={`flex flex-col items-center gap-2 p-6 rounded-2xl bg-white dark:bg-[#13112a] border ${br} text-center`}>
              <span className="text-[#f0a500]">{s.icon}</span>
              <span className="text-3xl font-extrabold text-gray-800 dark:text-white">{s.value}</span>
              <span className={`text-xs font-medium ${muted}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-8 sm:p-10 flex flex-col gap-3`}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500]">{c.missionTitle}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white leading-relaxed">{c.mission}</p>
        </div>

        {/* Values */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-6">{c.valuesTitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.values.map((v, i) => (
              <div key={i} className={`flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-[#13112a] border ${br}`}>
                <span className="text-[#f0a500] mt-0.5 shrink-0">{v.icon}</span>
                <div>
                  <p className="font-bold text-gray-800 dark:text-white text-sm">{v.title}</p>
                  <p className={`text-sm mt-1 ${muted}`}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
