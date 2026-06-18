"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowLeft, FiStar } from "react-icons/fi";
import { BsLightningChargeFill, BsFire } from "react-icons/bs";
import { useLang } from "../../context/LangContext";
import { useCurrency } from "../../context/CurrencyContext";

const slides = [
  {
    imgSrc:  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=85",
    imgAlt:  "Shop now",
    badge:   { en: "Welcome",          ar: "مرحباً بك"          },
    heading: { en: "Everything You Need\nIn One Place",         ar: "كل ما تحتاجه\nفي مكان واحد"          },
    sub:     { en: "Explore thousands of premium products across all categories. Fast delivery, great prices.", ar: "استكشف آلاف المنتجات المميزة في جميع الفئات. توصيل سريع وأسعار رائعة." },
    cta:     { en: "Shop Now",         ar: "تسوق الآن"          },
    href:    "/products",
  },
  {
    imgSrc:  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=85",
    imgAlt:  "Shop electronics",
    badge:   { en: "New Arrivals",     ar: "وصل حديثاً"        },
    heading: { en: "Premium Electronics\nFor Every Budget",     ar: "إلكترونيات مميزة\nلكل ميزانية"        },
    sub:     { en: "Fast delivery across Africa & the Middle East. Shop the latest tech today.", ar: "توصيل سريع عبر أفريقيا والشرق الأوسط. تسوق أحدث التقنية اليوم." },
    cta:     { en: "Shop Electronics", ar: "تسوق الإلكترونيات" },
    href:    "/products?cat=electronics",
  },
  {
    imgSrc:  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=85",
    imgAlt:  "Fashion collection",
    badge:   { en: "New Season",       ar: "موسم جديد"          },
    heading: { en: "Trending Fashion\nEvery Week",              ar: "أزياء رائجة\nكل أسبوع"              },
    sub:     { en: "Discover exclusive styles from top designers. New collections every week.", ar: "اكتشف أناقة حصرية من أشهر المصممين. مجموعات جديدة كل أسبوع." },
    cta:     { en: "Shop Fashion",     ar: "تسوق الأزياء"       },
    href:    "/products?cat=fashion",
  },
  {
    imgSrc:  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=85",
    imgAlt:  "Flash sale deals",
    badge:   { en: "Flash Sale",       ar: "تخفيضات سريعة"     },
    heading: { en: "Up to 60% Off\nTop Products",               ar: "خصم يصل إلى 60%\nعلى أفضل المنتجات"  },
    sub:     { en: "Limited time deals on electronics, fashion, beauty and more. Don't miss out.", ar: "عروض محدودة على الإلكترونيات والأزياء والتجميل وأكثر. لا تفوتك." },
    cta:     { en: "See All Deals",    ar: "عرض كل الصفقات"     },
    href:    "/products",
  },
];

const stripTabs = [
  { key: "featured", en: "Featured",     ar: "مميزة",          icon: <BsFire size={12} /> },
  { key: "new",      en: "New Arrivals", ar: "وصل حديثاً",     icon: null },
  { key: "deals",    en: "Top Deals",    ar: "أفضل العروض",    icon: <BsLightningChargeFill size={11} /> },
  { key: "top",      en: "Top Rated",    ar: "الأعلى تقييماً", icon: null },
];

const allProducts = {
  featured: [
    { id: 1,  name: { en: "Wireless Headphones Pro",  ar: "سماعات لاسلكية برو"   }, price: 79,  original: 120, rating: 4.8, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=75" },
    { id: 2,  name: { en: "Smart Watch Series 5",     ar: "ساعة ذكية سيريز 5"    }, price: 129, original: null, rating: 4.7, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=75" },
    { id: 3,  name: { en: "4K Smart TV 55\"",         ar: "تلفاز ذكي 4K 55\""   }, price: 349, original: 499, rating: 4.9, img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=75" },
    { id: 4,  name: { en: "Designer Linen Shirt",     ar: "قميص كتان مصمم"       }, price: 45,  original: null, rating: 4.6, img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=75" },
    { id: 5,  name: { en: "Vitamin C Glow Serum",     ar: "سيروم فيتامين C"      }, price: 35,  original: 55,  rating: 4.9, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=75" },
    { id: 6,  name: { en: "Robot Vacuum Cleaner",     ar: "مكنسة روبوتية"        }, price: 199, original: 299, rating: 4.5, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=75" },
    { id: 7,  name: { en: "Running Sneakers V3",      ar: "حذاء الجري V3"        }, price: 89,  original: 130, rating: 4.7, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=75" },
  ],
  new: [
    { id: 8,  name: { en: "ANC Earbuds 2025",         ar: "سماعات ANC 2025"      }, price: 59,  original: null, rating: 4.5, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=75" },
    { id: 9,  name: { en: "Running Sneakers V3",      ar: "حذاء الجري V3"        }, price: 89,  original: null, rating: 4.7, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=75" },
    { id: 10, name: { en: "Organic Face Moisturizer", ar: "مرطب وجه عضوي"        }, price: 28,  original: null, rating: 4.4, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=75" },
    { id: 11, name: { en: "Stainless Cookware Set",   ar: "طقم أواني ستانلس"     }, price: 115, original: null, rating: 4.6, img: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&q=75" },
    { id: 12, name: { en: "Silk Evening Dress",       ar: "فستان سهرة حريري"     }, price: 75,  original: null, rating: 4.8, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=75" },
    { id: 13, name: { en: "Portable Blender",         ar: "خلاط محمول"           }, price: 39,  original: null, rating: 4.3, img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&q=75" },
    { id: 14, name: { en: "Smart Watch Series 5",     ar: "ساعة ذكية سيريز 5"    }, price: 129, original: null, rating: 4.7, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=75" },
  ],
  deals: [
    { id: 15, name: { en: "Wireless Headphones Pro",  ar: "سماعات لاسلكية برو"   }, price: 79,  original: 120, rating: 4.8, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=75" },
    { id: 16, name: { en: "4K Smart TV 55\"",         ar: "تلفاز ذكي 4K 55\""   }, price: 349, original: 499, rating: 4.9, img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=75" },
    { id: 17, name: { en: "Vitamin C Serum",          ar: "سيروم فيتامين C"      }, price: 35,  original: 55,  rating: 4.9, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=75" },
    { id: 18, name: { en: "Robot Vacuum Cleaner",     ar: "مكنسة روبوتية"        }, price: 199, original: 299, rating: 4.5, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=75" },
    { id: 19, name: { en: "Running Sneakers V3",      ar: "حذاء الجري V3"        }, price: 89,  original: 130, rating: 4.7, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=75" },
    { id: 20, name: { en: "Organic Face Moisturizer", ar: "مرطب وجه عضوي"        }, price: 28,  original: 45,  rating: 4.4, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=75" },
    { id: 21, name: { en: "Designer Linen Shirt",     ar: "قميص كتان مصمم"       }, price: 45,  original: 70,  rating: 4.6, img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=75" },
  ],
  top: [
    { id: 22, name: { en: "Vitamin C Glow Serum",     ar: "سيروم فيتامين C"      }, price: 35,  original: 55,  rating: 4.9, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=75" },
    { id: 23, name: { en: "4K Smart TV 55\"",         ar: "تلفاز ذكي 4K 55\""   }, price: 349, original: 499, rating: 4.9, img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=75" },
    { id: 24, name: { en: "Wireless Headphones Pro",  ar: "سماعات لاسلكية برو"   }, price: 79,  original: 120, rating: 4.8, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=75" },
    { id: 25, name: { en: "Silk Evening Dress",       ar: "فستان سهرة حريري"     }, price: 75,  original: null, rating: 4.8, img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=75" },
    { id: 26, name: { en: "Smart Watch Series 5",     ar: "ساعة ذكية سيريز 5"    }, price: 129, original: null, rating: 4.7, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=75" },
    { id: 27, name: { en: "Running Sneakers V3",      ar: "حذاء الجري V3"        }, price: 89,  original: null, rating: 4.7, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=75" },
    { id: 28, name: { en: "Robot Vacuum Cleaner",     ar: "مكنسة روبوتية"        }, price: 199, original: 299, rating: 4.5, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=75" },
  ],
};

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar
          key={s}
          size={10}
          className={s <= Math.round(rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/15"}
        />
      ))}
    </span>
  );
}

export default function HeroBanner() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const { convertPrice, sign } = useCurrency();
  const [current,   setCurrent]   = useState(0);
  const [activeTab, setActiveTab] = useState("featured");
  const [headerH,   setHeaderH]   = useState(140);
  const slide = slides[current];

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  useEffect(() => {
    const measure = () => {
      const h = document.querySelector("header")?.offsetHeight;
      if (h) setHeaderH(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const products = allProducts[activeTab];

  return (
    <section
      className="w-full flex flex-col"
      style={{ height: `calc(100dvh - ${headerH}px)` }}
      dir={isAR ? "rtl" : "ltr"}
    >

      {/* ══════════ SLIDER ══════════ */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden" style={{ minHeight: "320px" }}>

        {/* Background image */}
        <Image
          key={current}
          src={slide.imgSrc}
          alt={slide.imgAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Directional overlay — text side is darker */}
        <div className={`absolute inset-0 ${
          isAR
            ? "bg-gradient-to-l from-black/80 via-black/50 to-black/10"
            : "bg-gradient-to-r from-black/80 via-black/50 to-black/10"
        }`} />

        {/* Text content */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
            <div className={`flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-xl ${isAR ? "ml-auto items-end text-right" : "items-start text-left"}`}>

              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest bg-[#f0a500] text-white self-start">
                <BsLightningChargeFill size={8} />
                {slide.badge[isAR ? "ar" : "en"]}
              </span>

              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight whitespace-pre-line drop-shadow-lg">
                {slide.heading[isAR ? "ar" : "en"]}
              </h1>

              {/* Sub — hidden on very small screens */}
              <p className="hidden sm:block text-sm md:text-base lg:text-lg text-white/70 leading-relaxed max-w-sm drop-shadow">
                {slide.sub[isAR ? "ar" : "en"]}
              </p>

              {/* CTAs */}
              <div className={`flex items-center gap-3 pt-2 ${isAR ? "flex-row-reverse" : "flex-row"}`}>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[#f0a500] hover:bg-[#d4920a] shadow-lg shadow-[#f0a500]/40 transition-all hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap z-10"
                >
                  {slide.cta[isAR ? "ar" : "en"]}
                  {isAR ? <FiArrowLeft size={14} /> : <FiArrowRight size={14} />}
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-white/10 border border-white/50 hover:bg-white/20 hover:border-white/80 transition-all whitespace-nowrap z-10 backdrop-blur-sm"
                >
                  {isAR ? "كل العروض" : "All Deals"}
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Slide counter — top right */}
        <div className="absolute top-4 right-5 text-white/40 text-[11px] font-semibold tracking-widest select-none hidden sm:block">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>

        {/* Controls — bottom center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width:           i === current ? 20 : 6,
                height:          6,
                backgroundColor: i === current ? "#f0a500" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ══════════ PRODUCT STRIP ══════════ */}
      <div className="w-full shrink-0 bg-white dark:bg-[#0f0f1a] border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

          {/* Tabs */}
          <div className="flex items-center border-b border-gray-100 dark:border-white/5 overflow-x-auto scrollbar-none">
            {stripTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 -mb-px transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? "border-[#f0a500] text-[#f0a500]"
                    : "border-transparent text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60"
                }`}
              >
                {tab.icon}
                {isAR ? tab.ar : tab.en}
              </button>
            ))}
            <Link
              href="/products"
              className="ml-auto shrink-0 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold text-[#f0a500] hover:underline whitespace-nowrap"
            >
              {isAR ? "عرض الكل" : "See All →"}
            </Link>
          </div>

          {/* Product cards — horizontally scrollable */}
          <div className="flex gap-3 overflow-x-auto scrollbar-none py-3">
            {products.map((p) => {
              const disc = p.original ? Math.round(((p.original - p.price) / p.original) * 100) : null;
              return (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group flex-shrink-0 flex flex-col w-[120px] sm:w-[140px] md:w-[155px] rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#13112a] hover:border-[#f0a500]/40 hover:shadow-lg hover:shadow-[#f0a500]/8 transition-all duration-200 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative w-full h-[88px] sm:h-[105px] md:h-[110px] bg-gray-50 dark:bg-[#0d0d1a] overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.name.en}
                      fill
                      className="object-cover group-hover:scale-[1.06] transition-transform duration-300"
                      sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, 155px"
                    />
                    {disc && (
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#e05c5c] text-white text-[10px] font-bold leading-none">
                        -{disc}%
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-0.5 p-2">
                    <p className="text-[11px] sm:text-[12px] font-semibold text-gray-700 dark:text-white/80 line-clamp-2 leading-snug group-hover:text-[#f0a500] transition-colors">
                      {p.name[isAR ? "ar" : "en"]}
                    </p>
                    <Stars rating={p.rating} />
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs sm:text-sm font-extrabold text-gray-800 dark:text-white">{sign}{convertPrice(p.price)}</span>
                      {p.original && (
                        <span className="text-[10px] text-gray-400 dark:text-white/30 line-through">{sign}{convertPrice(p.original)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}
