"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useLang } from "../context/LangContext";

const slides = {
  en: [
    {
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
      badge: "New Arrivals",
      headline: ["Shop Without", "Limits"],
      sub: "Discover thousands of premium products delivered to your door.",
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      badge: "Fashion & Style",
      headline: ["Dress for", "Every Moment"],
      sub: "Latest trends in fashion from top brands across Africa & the Middle East.",
    },
    {
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
      badge: "Electronics",
      headline: ["Tech That", "Moves You"],
      sub: "Cutting-edge gadgets and electronics at unbeatable prices.",
    },
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
      badge: "Beauty & Care",
      headline: ["Feel Your", "Best Self"],
      sub: "Premium beauty products curated for every skin type and tone.",
    },
    {
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      badge: "Exclusive Deals",
      headline: ["Save More,", "Get More"],
      sub: "Unbeatable deals and offers updated daily just for you.",
    },
  ],
  ar: [
    {
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
      badge: "وصل حديثاً",
      headline: ["تسوّق بلا", "حدود"],
      sub: "اكتشف آلاف المنتجات المميزة توصل مباشرة إلى بابك.",
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      badge: "الأزياء والستايل",
      headline: ["أناقة في", "كل لحظة"],
      sub: "أحدث صيحات الموضة من كبرى الماركات عبر أفريقيا والشرق الأوسط.",
    },
    {
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
      badge: "الإلكترونيات",
      headline: ["تقنية تواكب", "حياتك"],
      sub: "أحدث الأجهزة والإلكترونيات بأسعار لا تُقاوم.",
    },
    {
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
      badge: "الجمال والعناية",
      headline: ["اشعري", "بجمالك"],
      sub: "منتجات تجميل فاخرة مختارة لكل نوع بشرة.",
    },
    {
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      badge: "عروض حصرية",
      headline: ["وفّر أكثر", "واحصل على أكثر"],
      sub: "عروض وتخفيضات لا تُصدق تتجدد يومياً خصيصاً لك.",
    },
  ],
};

export default function AuthSlider({ backHome = "Back to Home" }) {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const list = slides[isAR ? "ar" : "en"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % list.length), 4000);
    return () => clearInterval(t);
  }, [list.length]);

  const slide = list[current];

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>

      {/* Slide images */}
      {list.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <img src={s.image} alt={s.headline[0]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5 md:p-6 lg:p-10">

        {/* Top — back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-white/50 hover:text-[#f0a500] text-xs transition-colors w-fit">
          {isAR ? <FiArrowRight size={11} /> : <FiArrowLeft size={11} />} {backHome}
        </Link>

        {/* Bottom — slide text + dots */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#f0a500] mb-2">
            {slide.badge}
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
            {slide.headline[0]}<br />
            <span className="text-[#f0a500]">{slide.headline[1]}</span>
          </h1>

          <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-5 max-w-xs">
            {slide.sub}
          </p>

          {/* Dots + arrows */}
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrent((p) => (p - 1 + list.length) % list.length)}
              className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-[#f0a500] hover:text-[#f0a500] transition-all">
              <FiArrowLeft size={12} />
            </button>

            <div className="flex gap-1.5">
              {list.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-1.5 bg-[#f0a500]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>

            <button onClick={() => setCurrent((p) => (p + 1) % list.length)}
              className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-[#f0a500] hover:text-[#f0a500] transition-all">
              <FiArrowRight size={12} />
            </button>

            <span className="ml-auto text-white/25 text-xs">{current + 1} / {list.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
