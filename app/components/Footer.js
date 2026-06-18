"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BsTruck, BsGlobe2, BsShieldCheck, BsHeadset,
  BsFacebook, BsInstagram, BsTwitterX, BsYoutube, BsTiktok,
} from "react-icons/bs";
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";
import { useLang } from "../context/LangContext";
import { MdDevices, MdOutlineCheckroom, MdOutlineShoppingCart, MdOutlineSpa, MdOutlineChair, MdOutlineDiamond } from "react-icons/md";

const content = {
  en: {
    tagline: "Your premium marketplace across Africa & the Middle East.",
    newsletter: { heading: "Stay in the loop", sub: "Get exclusive deals, new arrivals and offers straight to your inbox.", placeholder: "Your email address", btn: "Subscribe" },
    shop: { title: "Shop", links: [{ label: "Electronics", href: "/products?cat=electronics" }, { label: "Fashion & Clothing", href: "/products?cat=fashion" }, { label: "Groceries", href: "/products?cat=groceries" }, { label: "Beauty Products", href: "/products?cat=beauty" }, { label: "Household Items", href: "/products?cat=household" }, { label: "Accessories", href: "/products?cat=accessories" }, { label: "Deals & Offers", href: "/deals" }] },
    company: { title: "Company", links: [{ label: "About Us", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Affiliate Program", href: "/affiliate" }] },
    support: { title: "Support", links: [{ label: "Help Center / FAQ", href: "/faq" }, { label: "Contact Us", href: "/contact" }, { label: "Track Your Order", href: "/track" }, { label: "Returns & Refunds", href: "/returns" }, { label: "Shipping Info", href: "/shipping" }] },
    legal: { title: "Legal", links: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }, { label: "Cookie Policy", href: "/cookies" }] },
    contact: { title: "Contact", email: "support@merkatostore.com", phone: "+1 (800) 123-4567", address: "Serving Africa & the Middle East" },
    perks: [{ icon: <BsTruck size={22} />, title: "Free Shipping", sub: "On orders over $100" }, { icon: <BsShieldCheck size={22} />, title: "Secure Payments", sub: "100% protected checkout" }, { icon: <BsHeadset size={22} />, title: "24/7 Support", sub: "Always here to help" }, { icon: <BsGlobe2 size={22} />, title: "Global Reach", sub: "Delivering across regions" }],
    copy: `© ${new Date().getFullYear()} Merkato Store. All rights reserved.`,
    social: "Follow us",
    payment: "We accept",
  },
  ar: {
    tagline: "سوقك المميز عبر أفريقيا والشرق الأوسط.",
    newsletter: { heading: "ابقَ على اطلاع", sub: "احصل على عروض حصرية ووصولات جديدة مباشرة إلى بريدك.", placeholder: "بريدك الإلكتروني", btn: "اشترك" },
    shop: { title: "تسوق", links: [{ label: "الإلكترونيات", href: "/products?cat=electronics" }, { label: "الأزياء والملابس", href: "/products?cat=fashion" }, { label: "البقالة", href: "/products?cat=groceries" }, { label: "منتجات التجميل", href: "/products?cat=beauty" }, { label: "المستلزمات المنزلية", href: "/products?cat=household" }, { label: "الإكسسوارات", href: "/products?cat=accessories" }, { label: "العروض والتخفيضات", href: "/deals" }] },
    company: { title: "الشركة", links: [{ label: "من نحن", href: "/about" }, { label: "وظائف", href: "/careers" }, { label: "برنامج الإحالة", href: "/affiliate" }] },
    support: { title: "الدعم", links: [{ label: "مركز المساعدة / الأسئلة الشائعة", href: "/faq" }, { label: "تواصل معنا", href: "/contact" }, { label: "تتبع طلبك", href: "/track" }, { label: "الإرجاع والاسترداد", href: "/returns" }, { label: "معلومات الشحن", href: "/shipping" }] },
    legal: { title: "قانوني", links: [{ label: "سياسة الخصوصية", href: "/privacy" }, { label: "شروط الخدمة", href: "/terms" }, { label: "سياسة ملفات تعريف الارتباط", href: "/cookies" }] },
    contact: { title: "تواصل", email: "support@merkatostore.com", phone: "+1 (800) 123-4567", address: "نخدم أفريقيا والشرق الأوسط" },
    perks: [{ icon: <BsTruck size={22} />, title: "شحن مجاني", sub: "على الطلبات فوق $100" }, { icon: <BsShieldCheck size={22} />, title: "دفع آمن", sub: "دفع محمي 100%" }, { icon: <BsHeadset size={22} />, title: "دعم 24/7", sub: "دائماً في خدمتك" }, { icon: <BsGlobe2 size={22} />, title: "وصول عالمي", sub: "التوصيل عبر المناطق" }],
    copy: `© ${new Date().getFullYear()} Merkato Store. جميع الحقوق محفوظة.`,
    social: "تابعنا",
    payment: "نقبل",
  },
};

const socials = [
  { icon: <BsFacebook size={18} />,  href: "#", label: "Facebook" },
  { icon: <BsInstagram size={18} />, href: "#", label: "Instagram" },
  { icon: <BsTwitterX size={18} />,  href: "#", label: "X" },
  { icon: <BsYoutube size={18} />,   href: "#", label: "YouTube" },
  { icon: <BsTiktok size={18} />,    href: "#", label: "TikTok" },
];

export default function Footer() {
  const { lang }              = useLang();
  const [email, setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isAR = lang === "ar";
  const t    = content[isAR ? "ar" : "en"];

  const br     = "border-gray-100 dark:border-white/5";
  const muted  = "text-gray-500 dark:text-white/50";
  const navTxt = "text-gray-500 dark:text-white/60 hover:text-[#f0a500] dark:hover:text-[#f0a500] transition-colors";
  const fBg    = "bg-white dark:bg-[#0a0a15]";
  const topBg  = "bg-gray-50 dark:bg-[#0f0f1a]";

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  }

  return (
    <footer className={`w-full border-t ${br} ${fBg} transition-colors duration-300`} dir={isAR ? "rtl" : "ltr"}>

      {/* ── NEWSLETTER ── */}
      <div className={`border-b ${br} ${topBg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row md:items-center gap-6">

          {/* left — text */}
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#f0a500] mb-1">
              {isAR ? "النشرة الإخبارية" : "Newsletter"}
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{t.newsletter.heading}</p>
            <p className={`text-sm mt-2 ${muted} max-w-md`}>{t.newsletter.sub}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                isAR ? "عروض حصرية" : "Exclusive deals",
                isAR ? "لا بريد مزعج" : "No spam ever",
                isAR ? "إلغاء في أي وقت" : "Unsubscribe anytime",
              ].map((b) => (
                <span key={b} className="text-[11px] font-medium text-gray-500 dark:text-white/40 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* right — form */}
          <div className="w-full md:w-95 shrink-0">
            {submitted ? (
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-[#f0a500]/30 bg-[#f0a500]/5">
                <div className="w-9 h-9 rounded-full bg-[#f0a500]/15 flex items-center justify-center text-[#f0a500] shrink-0">
                  <FiMail size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">
                    {isAR ? "شكراً للاشتراك!" : "You're subscribed!"}
                  </p>
                  <p className={`text-xs mt-0.5 ${muted}`}>
                    {isAR ? "سنبقيك على اطلاع دائم." : "We'll keep you in the loop."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className={`flex items-center flex-1 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a15] focus-within:border-[#f0a500] focus-within:shadow-md focus-within:shadow-[#f0a500]/10 transition-all overflow-hidden`}>
                  <span className="pl-3 text-[#f0a500] shrink-0"><FiMail size={15} /></span>
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.placeholder}
                    dir={isAR ? "rtl" : "ltr"}
                    className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30 px-2 py-3 outline-none"
                  />
                </div>
                <button type="submit"
                  className="shrink-0 flex items-center gap-1.5 bg-[#f0a500] hover:bg-[#c97000] active:scale-[0.98] transition-all rounded-xl px-5 py-3 text-white text-sm font-bold cursor-pointer shadow-sm shadow-[#f0a500]/30">
                  {t.newsletter.btn} <FiArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand col — spans 2 */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/">
              <Image src="/images/logo.png" alt="Merkato Store" width={145} height={46} />
            </Link>
            <p className={`text-sm leading-relaxed ${muted} max-w-xs`}>{t.tagline}</p>

            {/* Social */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-3">{t.social}</p>
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className={`w-9 h-9 rounded-full border ${br} flex items-center justify-center ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/50 hover:bg-[#f0a500]/5 transition-all`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className={`flex flex-col gap-2 text-sm ${muted}`}>
              <a href={`mailto:${t.contact.email}`} className="inline-flex items-center gap-2 hover:text-[#f0a500] transition-colors">
                <FiMail size={14} className="text-[#f0a500] shrink-0" />{t.contact.email}
              </a>
              <a href={`tel:${t.contact.phone}`} className="inline-flex items-center gap-2 hover:text-[#f0a500] transition-colors">
                <FiPhone size={14} className="text-[#f0a500] shrink-0" />{t.contact.phone}
              </a>
              <span className="inline-flex items-center gap-2">
                <FiMapPin size={14} className="text-[#f0a500] shrink-0" />{t.contact.address}
              </span>
            </div>
          </div>

          {/* Link columns */}
          {[t.shop, t.company, t.support, t.legal].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-4">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={`text-sm ${navTxt}`}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* ── PERKS BAR ── */}
      <div className={`border-t ${br} ${topBg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.perks.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[#f0a500] shrink-0">{p.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{p.title}</p>
                <p className={`text-xs mt-0.5 ${muted}`}>{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className={`border-t ${br} ${topBg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col items-center gap-4">
          {/* Payment methods */}
          <div className="flex flex-col items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${muted}`}>{t.payment}</span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {[
                { src: "/assets/payment/visa.svg",        alt: "Visa",        w: 58 },
                { src: "/assets/payment/mastercard.svg",  alt: "Mastercard",  w: 46 },
                { src: "/assets/payment/paypal.svg",      alt: "PayPal",      w: 72 },
                { src: "/assets/payment/applepay.svg",    alt: "Apple Pay",   w: 64 },
                { src: "/assets/payment/googlepay.svg",   alt: "Google Pay",  w: 72 },
                { src: "/assets/payment/mpesa.svg",       alt: "M-Pesa",      w: 62 },
              ].map((pm) => (
                <div key={pm.alt}
                  className={`h-8 px-2 flex items-center justify-center rounded-lg border ${br} bg-white dark:bg-white/5 shadow-sm`}
                  style={{ minWidth: pm.w }}>
                  <Image src={pm.src} alt={pm.alt} width={pm.w} height={24} className="object-contain h-5 w-auto" />
                </div>
              ))}
            </div>
          </div>
          {/* Copyright */}
          <p className={`text-sm text-center ${muted}`}>{t.copy}</p>
        </div>
      </div>

    </footer>
  );
}
