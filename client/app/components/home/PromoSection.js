"use client";
import Link from "next/link";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import { useLang } from "../../context/LangContext";

const promos = [
  {
    gradient: "from-[#0d0d1a] to-[#1a1033]",
    accent: "#f0a500",
    badge: { en: "Flash Sale",  ar: "تخفيضات سريعة" },
    heading: { en: "Up to 60% Off\nElectronics",       ar: "خصم يصل إلى 60%\nعلى الإلكترونيات"  },
    sub:  { en: "Limited time — grab the best deals before they're gone.", ar: "وقت محدود — استغل أفضل العروض قبل نفادها." },
    cta:  { en: "Shop Now",    ar: "تسوق الآن"        },
    href: "/products",
    img:  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
  },
  {
    gradient: "from-[#0d1a0f] to-[#0f2a14]",
    accent: "#22c55e",
    badge: { en: "New Season",  ar: "موسم جديد"       },
    heading: { en: "Fresh Fashion\nCollection",        ar: "مجموعة أزياء\nموسم جديد"            },
    sub:  { en: "Discover the latest trends from top designers worldwide.", ar: "اكتشف أحدث صيحات الموضة من أشهر المصممين عالمياً." },
    cta:  { en: "Explore",     ar: "استكشف"           },
    href: "/products",
    img:  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  },
];

export default function PromoSection() {
  const { lang } = useLang();
  const isAR = lang === "ar";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6" dir={isAR ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {promos.map((promo, i) => (
          <div
            key={i}
            className={`relative rounded-2xl bg-gradient-to-br ${promo.gradient} overflow-hidden`}
          >
            {/* Background image with dark overlay */}
            <div className="absolute inset-0">
              <img
                src={promo.img}
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
            </div>

            <div className="relative flex flex-col gap-2 p-4 sm:p-5">
              {/* Badge */}
              <span
                className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                style={{ borderColor: `${promo.accent}40`, color: promo.accent, backgroundColor: `${promo.accent}15` }}
              >
                <BsLightningChargeFill size={8} />
                {promo.badge[isAR ? "ar" : "en"]}
              </span>

              {/* Heading */}
              <h3 className="text-base sm:text-lg font-extrabold text-white whitespace-pre-line leading-tight">
                {promo.heading[isAR ? "ar" : "en"]}
              </h3>

              {/* Sub */}
              <p className="text-[11px] text-white/50 max-w-xs leading-relaxed">
                {promo.sub[isAR ? "ar" : "en"]}
              </p>

              {/* CTA */}
              <Link
                href={promo.href}
                className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full text-[11px] font-bold text-white transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: promo.accent, boxShadow: `0 4px 16px ${promo.accent}40` }}
              >
                {promo.cta[isAR ? "ar" : "en"]}
                {isAR ? <FiArrowLeft size={12} /> : <FiArrowRight size={12} />}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
