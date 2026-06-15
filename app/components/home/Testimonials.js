"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsQuote } from "react-icons/bs";
import { useLang } from "../../context/LangContext";

const testimonials = [
  {
    name:   { en: "Amara Okonkwo",          ar: "أمارا أوكونكو"        },
    role:   { en: "Lagos, Nigeria",          ar: "لاغوس، نيجيريا"      },
    rating: 5, avatar: "AO", color: "#f0a500",
    text: {
      en: "Merkato Store completely changed how I shop online. The delivery was lightning fast and the product quality exceeded my expectations. Highly recommend to everyone!",
      ar: "غيّر ميركاتو ستور طريقة تسوقي عبر الإنترنت كلياً. كان التوصيل سريعاً جداً وجودة المنتج فاقت توقعاتي. أنصح به بشدة للجميع!",
    },
  },
  {
    name:   { en: "Fatima Al-Hassan",        ar: "فاطمة الحسن"          },
    role:   { en: "Dubai, UAE",              ar: "دبي، الإمارات"        },
    rating: 5, avatar: "FH", color: "#ec4899",
    text: {
      en: "Amazing selection of fashion products. I found exactly what I was looking for at a fraction of the price. The customer support team was incredibly helpful too.",
      ar: "تشكيلة رائعة من منتجات الأزياء. وجدت بالضبط ما كنت أبحث عنه بسعر أقل بكثير. فريق دعم العملاء كان مفيداً للغاية أيضاً.",
    },
  },
  {
    name:   { en: "Kwame Mensah",            ar: "كوامي منساه"          },
    role:   { en: "Accra, Ghana",            ar: "أكرا، غانا"           },
    rating: 5, avatar: "KM", color: "#22c55e",
    text: {
      en: "I've been shopping on Merkato for 6 months now and I'm always impressed. The prices are fair, shipping is reliable, and returns are hassle-free. My go-to marketplace.",
      ar: "أتسوق من ميركاتو منذ 6 أشهر وأنا دائماً مندهش. الأسعار عادلة والشحن موثوق والإرجاع سهل. متجري المفضل دائماً.",
    },
  },
  {
    name:   { en: "Sara Al-Rashidi",         ar: "سارة الراشدي"         },
    role:   { en: "Riyadh, Saudi Arabia",    ar: "الرياض، السعودية"     },
    rating: 5, avatar: "SR", color: "#3b82f6",
    text: {
      en: "The electronics section is top-notch. Ordered a smart TV and it arrived in perfect condition, well-packaged and on time. Will definitely shop here again.",
      ar: "قسم الإلكترونيات ممتاز. طلبت تلفازاً ذكياً ووصل بحالة مثالية ومغلفاً جيداً وفي الوقت المحدد. سأتسوق هنا بالتأكيد مرة أخرى.",
    },
  },
  {
    name:   { en: "Yonas Tadesse",           ar: "يوناس تاديسي"         },
    role:   { en: "Addis Ababa, Ethiopia",   ar: "أديس أبابا، إثيوبيا" },
    rating: 4, avatar: "YT", color: "#a855f7",
    text: {
      en: "Great experience from start to finish. The app is easy to navigate and finding deals is super simple. Saved a lot of money on my last few orders!",
      ar: "تجربة رائعة من البداية إلى النهاية. التطبيق سهل التصفح وإيجاد العروض بسيط جداً. وفّرت الكثير من المال في آخر بضعة طلبات!",
    },
  },
  {
    name:   { en: "Nadia El-Amin",           ar: "نادية الأمين"         },
    role:   { en: "Cairo, Egypt",            ar: "القاهرة، مصر"         },
    rating: 5, avatar: "NA", color: "#14b8a6",
    text: {
      en: "The beauty products I ordered were 100% authentic and arrived beautifully packaged. I love how Merkato brings global brands to our region at great prices.",
      ar: "منتجات التجميل التي طلبتها كانت أصلية 100% ووصلت مغلفة بشكل جميل. أحب كيف يجلب ميركاتو الماركات العالمية لمنطقتنا بأسعار رائعة.",
    },
  },
];

const INTERVAL    = 4000;
const DESKTOP_VIS = 3;
const total       = testimonials.length;
const desktopMax  = total - DESKTOP_VIS;
const mobileMax   = total - 1;

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar key={s} size={13}
          className={s <= rating ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/15"} />
      ))}
    </span>
  );
}

function Card({ t, isAR }) {
  return (
    <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#13112a] hover:border-[#f0a500]/30 hover:shadow-xl hover:shadow-[#f0a500]/5 transition-colors duration-300 h-full">
      <div className="flex items-start justify-between">
        <BsQuote size={32} className="text-[#f0a500] opacity-60 shrink-0" />
        <Stars rating={t.rating} />
      </div>
      <p className="text-sm sm:text-base text-gray-600 dark:text-white/60 leading-relaxed flex-1">
        "{t.text[isAR ? "ar" : "en"]}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-white/5">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: t.color }}>
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800 dark:text-white">{t.name[isAR ? "ar" : "en"]}</p>
          <p className="text-[11px] text-gray-400 dark:text-white/40">{t.role[isAR ? "ar" : "en"]}</p>
        </div>
      </div>
    </div>
  );
}

function Slider({ current, direction, animating, children }) {
  const translate = animating
    ? direction > 0 ? "-translate-x-10 opacity-0" : "translate-x-10 opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div className={`transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${translate}`}>
      {children}
    </div>
  );
}

export default function Testimonials() {
  const { lang }  = useLang();
  const isAR      = lang === "ar";
  const paused    = useRef(false);

  const [dCurrent,   setDCurrent]   = useState(0);
  const [dAnimating, setDAnimating] = useState(false);
  const [dDirection, setDDirection] = useState(1);

  const [mCurrent,   setMCurrent]   = useState(0);
  const [mAnimating, setMAnimating] = useState(false);
  const [mDirection, setMDirection] = useState(1);

  const goDesktop = useCallback((idx, dir) => {
    if (dAnimating) return;
    setDDirection(dir);
    setDAnimating(true);
    setTimeout(() => { setDCurrent(idx); setDAnimating(false); }, 420);
  }, [dAnimating]);

  const goMobile = useCallback((idx, dir) => {
    if (mAnimating) return;
    setMDirection(dir);
    setMAnimating(true);
    setTimeout(() => { setMCurrent(idx); setMAnimating(false); }, 420);
  }, [mAnimating]);

  const nextDesktop = useCallback(() => goDesktop(dCurrent >= desktopMax ? 0 : dCurrent + 1,  1), [dCurrent, goDesktop]);
  const prevDesktop = useCallback(() => goDesktop(dCurrent <= 0 ? desktopMax : dCurrent - 1, -1), [dCurrent, goDesktop]);
  const nextMobile  = useCallback(() => goMobile(mCurrent >= mobileMax ? 0 : mCurrent + 1,    1), [mCurrent, goMobile]);
  const prevMobile  = useCallback(() => goMobile(mCurrent <= 0 ? mobileMax : mCurrent - 1,   -1), [mCurrent, goMobile]);

  const nextDesktopRef = useRef(nextDesktop);
  const nextMobileRef  = useRef(nextMobile);
  useEffect(() => { nextDesktopRef.current = nextDesktop; }, [nextDesktop]);
  useEffect(() => { nextMobileRef.current  = nextMobile;  }, [nextMobile]);

  useEffect(() => {
    const t = setInterval(() => {
      if (paused.current) return;
      nextDesktopRef.current();
      nextMobileRef.current();
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  const ArrowBtn = ({ onClick, children }) => (
    <button onClick={onClick}
      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-white/40 hover:border-[#f0a500] hover:text-[#f0a500] transition-all cursor-pointer shrink-0">
      {children}
    </button>
  );

  const Dots = ({ count, current, onDot, dir }) => (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onDot(i, i > current ? 1 : -1)}
          className="rounded-full transition-all duration-300 cursor-pointer"
          style={{
            width:           i === current ? 24 : 8,
            height:          8,
            backgroundColor: i === current ? "#f0a500" : "rgba(150,150,150,0.25)",
          }} />
      ))}
    </div>
  );

  return (
    <section
      className="bg-white dark:bg-[#0d0d1a] transition-colors duration-300"
      dir={isAR ? "rtl" : "ltr"}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10 md:mb-12">
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#f0a500] mb-1.5">
              {isAR ? "آراء العملاء" : "Testimonials"}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight">
              {isAR ? "ماذا يقول عملاؤنا" : "What Our Customers Say"}
            </h2>
          </div>
          {/* Desktop arrows in header */}
          <div className="hidden lg:flex items-center gap-2">
            <ArrowBtn onClick={prevDesktop}>
              {isAR ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
            </ArrowBtn>
            <ArrowBtn onClick={nextDesktop}>
              {isAR ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
            </ArrowBtn>
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:block overflow-hidden">
          <Slider current={dCurrent} direction={dDirection} animating={dAnimating}>
            <div className="grid grid-cols-3 gap-6">
              {testimonials.slice(dCurrent, dCurrent + DESKTOP_VIS).map((t, i) => (
                <Card key={`d-${dCurrent}-${i}`} t={t} isAR={isAR} />
              ))}
            </div>
          </Slider>
          <Dots count={desktopMax + 1} current={dCurrent} onDot={goDesktop} />
        </div>

        {/* ── MOBILE / TABLET ── */}
        <div className="lg:hidden">
          {/* arrows + card */}
          <div className="flex items-center gap-3">
            <ArrowBtn onClick={prevMobile}>
              {isAR ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
            </ArrowBtn>
            <div className="flex-1 overflow-hidden">
              <Slider current={mCurrent} direction={mDirection} animating={mAnimating}>
                <Card key={`m-${mCurrent}`} t={testimonials[mCurrent]} isAR={isAR} />
              </Slider>
            </div>
            <ArrowBtn onClick={nextMobile}>
              {isAR ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
            </ArrowBtn>
          </div>
          <Dots count={total} current={mCurrent} onDot={goMobile} />
        </div>

      </div>
    </section>
  );
}
