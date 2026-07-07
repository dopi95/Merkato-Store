"use client";
import { BsTruck, BsShieldCheck, BsHeadset, BsArrowRepeat } from "react-icons/bs";
import { useLang } from "../../context/LangContext";

const perks = [
  {
    icon: <BsTruck size={24} />,
    en: { title: "Free Shipping",       sub: "On all orders over $100 across Africa & the Middle East." },
    ar: { title: "شحن مجاني",           sub: "على جميع الطلبات فوق $100 عبر أفريقيا والشرق الأوسط."   },
    color: "#f0a500",
  },
  {
    icon: <BsShieldCheck size={24} />,
    en: { title: "Secure Payments",     sub: "100% protected checkout with industry-standard encryption." },
    ar: { title: "دفع آمن",             sub: "دفع محمي 100% بتشفير على مستوى الصناعة."                  },
    color: "#22c55e",
  },
  {
    icon: <BsHeadset size={24} />,
    en: { title: "24/7 Support",        sub: "Our team is always ready to help you anytime, anywhere."   },
    ar: { title: "دعم على مدار الساعة", sub: "فريقنا دائماً مستعد لمساعدتك في أي وقت وأي مكان."       },
    color: "#3b82f6",
  },
  {
    icon: <BsArrowRepeat size={24} />,
    en: { title: "Easy Returns",        sub: "Hassle-free 30-day return policy on all products."         },
    ar: { title: "إرجاع سهل",           sub: "سياسة إرجاع سهلة خلال 30 يوماً على جميع المنتجات."       },
    color: "#a855f7",
  },
];

export default function WhyChooseUs() {
  const { lang } = useLang();
  const isAR = lang === "ar";

  return (
    <section className="bg-gray-50 dark:bg-[#0f0f1a] border-y border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12" dir={isAR ? "rtl" : "ltr"}>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-0.5 sm:mb-1">
            {isAR ? "لماذا نحن" : "Why Us"}
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-white">
            {isAR ? "لماذا تختار ميركاتو ستور؟" : "Why Choose Merkato Store?"}
          </h2>
        </div>

        {/* Grid — 2 cols on mobile, 4 on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {perks.map((perk, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-[#13112a] border border-gray-100 dark:border-white/5 hover:border-[#f0a500]/30 hover:shadow-lg hover:shadow-[#f0a500]/5 transition-all duration-200"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0"
                style={{ color: perk.color, backgroundColor: `${perk.color}15` }}
              >
                {perk.icon}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white mb-1">
                  {isAR ? perk.ar.title : perk.en.title}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-white/50 leading-relaxed">
                  {isAR ? perk.ar.sub : perk.en.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
