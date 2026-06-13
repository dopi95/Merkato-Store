"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsSun, BsMoon, BsTruck, BsGlobe2, BsLightningChargeFill } from "react-icons/bs";
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { MdDevices, MdOutlineCheckroom, MdOutlineShoppingCart, MdOutlineSpa, MdOutlineChair, MdOutlineDiamond, MdOutlineInfo, MdOutlinePhone, MdOutlineHelpOutline } from "react-icons/md";

const navLinksEN = [
  { label: "Electronics",        href: "/electronics",  icon: <MdDevices size={18} />,           cat: true  },
  { label: "Fashion & Clothing", href: "/fashion",      icon: <MdOutlineCheckroom size={18} />,  cat: true  },
  { label: "Groceries",          href: "/groceries",    icon: <MdOutlineShoppingCart size={18} />,cat: true },
  { label: "Beauty Products",    href: "/beauty",       icon: <MdOutlineSpa size={18} />,         cat: true  },
  { label: "Household Items",    href: "/household",    icon: <MdOutlineChair size={18} />,       cat: true  },
  { label: "Accessories",        href: "/accessories",  icon: <MdOutlineDiamond size={18} />,     cat: true  },
  { label: "About",              href: "/about",        icon: <MdOutlineInfo size={18} /> },
  { label: "Contact",            href: "/contact",      icon: <MdOutlinePhone size={18} /> },
  { label: "FAQ",                href: "/faq",          icon: <MdOutlineHelpOutline size={18} /> },
  { label: "Deals",              href: "/deals",        icon: <BsLightningChargeFill size={15} />, highlight: true },
];

const navLinksAR = [
  { label: "الإلكترونيات",        href: "/electronics",  icon: <MdDevices size={18} />,            cat: true },
  { label: "الأزياء والملابس",     href: "/fashion",      icon: <MdOutlineCheckroom size={18} />,   cat: true },
  { label: "البقالة",             href: "/groceries",    icon: <MdOutlineShoppingCart size={18} />, cat: true },
  { label: "منتجات التجميل",      href: "/beauty",       icon: <MdOutlineSpa size={18} />,          cat: true },
  { label: "المستلزمات المنزلية",  href: "/household",    icon: <MdOutlineChair size={18} />,        cat: true },
  { label: "الإكسسوارات",         href: "/accessories",  icon: <MdOutlineDiamond size={18} />,      cat: true },
  { label: "من نحن",             href: "/about",        icon: <MdOutlineInfo size={18} /> },
  { label: "تواصل معنا",          href: "/contact",      icon: <MdOutlinePhone size={18} /> },
  { label: "الأسئلة الشائعة",     href: "/faq",          icon: <MdOutlineHelpOutline size={18} /> },
  { label: "العروض",             href: "/deals",        icon: <BsLightningChargeFill size={15} />, highlight: true },
];

const secondaryEN = ["About", "Contact", "FAQ", "Deals"];
const secondaryAR = ["من نحن", "تواصل معنا", "الأسئلة الشائعة", "العروض"];

const languages = [
  { code: "en", native: "English", flag: "/assets/flag-us.svg" },
  { code: "ar", native: "العربية", flag: "/assets/flag-sa.svg" },
];

const currencies = [
  { code: "USD", sign: "$",   label: "US Dollar" },
  { code: "NGN", sign: "₦",   label: "Nigerian Naira" },
  { code: "ETB", sign: "Br",  label: "Ethiopian Birr" },
  { code: "KES", sign: "KSh", label: "Kenyan Shilling" },
  { code: "AED", sign: "د.إ", label: "UAE Dirham" },
  { code: "EGP", sign: "E£",  label: "Egyptian Pound" },
  { code: "SAR", sign: "SR",  label: "Saudi Riyal" },
];

export default function Header() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [dark,         setDark]         = useState(false);
  const [lang,         setLang]         = useState("en");
  const [langOpen,     setLangOpen]     = useState(false);
  const [currency,     setCurrency]     = useState("USD");
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const langRef     = useRef(null);
  const currencyRef = useRef(null);

  const isAR            = lang === "ar";
  const secondary       = isAR ? secondaryAR : secondaryEN;
  const navLinks        = isAR ? navLinksAR : navLinksEN;
  const currentLang     = languages.find(l => l.code === lang);
  const currentCurrency = currencies.find(c => c.code === currency);
  const categories      = navLinks.filter(l => l.cat);
  const secondaryLinks  = navLinks.filter(l => secondary.includes(l.label));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.dir  = isAR ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isAR]);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current     && !langRef.current.contains(e.target))     setLangOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(e.target)) setCurrencyOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const hBg      = "bg-white dark:bg-[#0f0f1a]";
  const nBg      = "bg-white dark:bg-[#13112a]";
  const br       = "border-gray-100 dark:border-white/5";
  const inputCls = "bg-gray-50 dark:bg-[#1a1033] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30";
  const muted    = "text-gray-500 dark:text-white/60";
  const navTxt   = "text-gray-600 dark:text-white/70";

  return (
    <header className={`w-full sticky top-0 z-50 ${hBg} shadow-md shadow-black/10 dark:shadow-black/40 transition-colors duration-300`}>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#0d0d1a] text-white text-xs py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="mx-6 inline-flex items-center gap-1.5"><BsTruck size={13} className="text-[#f0a500]" /> Free shipping on orders over $100 across Africa &amp; the Middle East</span>
              <span className="text-[#f0a500] mx-2">·</span>
              <span className="mx-6 inline-flex items-center gap-1.5"><BsGlobe2 size={12} className="text-[#f0a500]" /> Nigeria · Kenya · Ethiopia · UAE · Egypt · Saudi Arabia · and more...</span>
              <span className="text-[#f0a500] mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── TOP BAR ── */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.png" alt="Merkato Store" width={155} height={50} priority />
        </Link>

        {/* Search — desktop */}
        <div className="hidden md:flex flex-1 mx-4">
          <div className={`flex items-center w-full max-w-xl rounded-full border border-[#f0a500]/40 focus-within:border-[#f0a500] focus-within:shadow-md focus-within:shadow-[#f0a500]/10 transition-all overflow-hidden`}>
            <span className={`pl-4 pr-2 ${muted} shrink-0`}><FiSearch size={17} /></span>
            <input type="text"
              placeholder={isAR ? "ابحث عن منتجات، ماركات، فئات..." : "Search products, brands, categories..."}
              dir={isAR ? "rtl" : "ltr"}
              className={`flex-1 ${inputCls} text-sm py-2.5 pr-2 outline-none`} />
            <button className="bg-[#f0a500] hover:bg-[#c97000] transition-colors px-6 py-2.5 text-white text-sm font-semibold shrink-0 cursor-pointer">
              {isAR ? "بحث" : "Search"}
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 ml-auto md:ml-0">

          <button onClick={() => setSearchOpen(!searchOpen)}
            className={`md:hidden p-2 ${muted} hover:text-[#f0a500] transition-colors`} aria-label="Search">
            <FiSearch size={20} />
          </button>

          <Link href="/wishlist" className={`relative p-2 ${muted} hover:text-[#f0a500] transition-colors`} aria-label="Wishlist">
            <FiHeart size={20} />
          </Link>

          <Link href="/cart" className={`relative p-2 ${muted} hover:text-[#f0a500] transition-colors`} aria-label="Cart">
            <FiShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#f0a500] text-white text-[10px] font-bold flex items-center justify-center">0</span>
          </Link>

          <Link href="/signin" className="hidden md:inline-flex items-center ml-1 px-4 py-2 rounded-full border border-[#f0a500] text-[#f0a500] text-sm font-medium hover:bg-[#f0a500]/10 transition-colors">
            {isAR ? "تسجيل الدخول" : "Sign In"}
          </Link>

          <Link href="/register" className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-[#f0a500] text-white text-sm font-bold hover:bg-[#c97000] transition-colors">
            {isAR ? "إنشاء حساب" : "Register"}
          </Link>

          {/* Language — desktop */}
          <div className="hidden md:block relative" ref={langRef}>
            <button onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border ${br} ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/50 text-sm font-medium transition-colors cursor-pointer`}>
              <Image src={currentLang.flag} alt={currentLang.native} width={20} height={14} className="rounded-sm object-cover" />
              <span>{lang.toUpperCase()}</span>
              <FiChevronDown size={13} style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {langOpen && (
              <div className={`absolute right-0 mt-2 w-44 rounded-xl border ${br} ${nBg} shadow-lg overflow-hidden z-50`}>
                {languages.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                      ${lang === l.code ? "bg-[#f0a500]/10 text-[#f0a500] font-semibold" : `${navTxt} hover:bg-[#f0a500]/5 hover:text-[#f0a500]`}`}>
                    <Image src={l.flag} alt={l.native} width={22} height={16} className="rounded-sm object-cover shrink-0" />
                    <span>{l.native}</span>
                    {lang === l.code && <span className="ml-auto text-[#f0a500] text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme — desktop */}
          <button onClick={() => setDark(!dark)} aria-label="Toggle theme"
            className={`hidden md:flex p-2 rounded-full border ${br} ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/50 transition-colors cursor-pointer`}>
            {dark ? <BsSun size={17} className="text-[#f0a500]" /> : <BsMoon size={16} />}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#f0a500]/10 border border-[#f0a500]/30 text-[#f0a500] hover:bg-[#f0a500] hover:text-white transition-all duration-200 ml-1`} aria-label="Menu">
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Search bar — mobile */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className={`flex items-center rounded-full border border-[#f0a500]/40 focus-within:border-[#f0a500] focus-within:shadow-md focus-within:shadow-[#f0a500]/10 transition-all overflow-hidden`}>
            <span className={`pl-4 pr-2 ${muted} shrink-0`}><FiSearch size={17} /></span>
            <input type="text"
              placeholder={isAR ? "ابحث عن منتجات، ماركات، فئات..." : "Search products, brands, categories..."}
              autoFocus dir={isAR ? "rtl" : "ltr"}
              className={`flex-1 ${inputCls} text-sm py-2.5 pr-2 outline-none`} />
            <button className="bg-[#f0a500] hover:bg-[#c97000] transition-colors px-5 py-2.5 text-white text-sm font-semibold shrink-0 cursor-pointer">
              {isAR ? "بحث" : "Search"}
            </button>
          </div>
        </div>
      )}

      {/* ── NAV BAR — desktop ── */}
      <nav className={`hidden md:block border-t ${br} ${nBg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Currency */}
            <div className="relative shrink-0" ref={currencyRef}>
              <button onClick={() => setCurrencyOpen(!currencyOpen)}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium ${muted} hover:text-[#f0a500] transition-colors cursor-pointer`}>
                <span className="text-[#f0a500] font-bold">{currentCurrency.sign}</span>
                <span>{currentCurrency.code}</span>
                <FiChevronDown size={12} style={{ transform: currencyOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              {currencyOpen && (
                <div className={`absolute left-0 top-full mt-1 w-52 rounded-xl border ${br} ${nBg} shadow-lg overflow-hidden z-50`}>
                  {currencies.map(c => (
                    <button key={c.code} onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                        ${currency === c.code ? "bg-[#f0a500]/10 text-[#f0a500] font-semibold" : `${navTxt} hover:bg-[#f0a500]/5 hover:text-[#f0a500]`}`}>
                      <span className="w-8 font-bold text-[#f0a500] shrink-0">{c.sign}</span>
                      <span>{c.label}</span>
                      {currency === c.code && <span className="ml-auto text-[#f0a500] text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={`w-px h-4 border-l ${br} mx-1`} />
            {/* Category links */}
            <ul className="flex items-center gap-1">
              {navLinks.filter(l => !secondary.includes(l.label)).map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className={`flex items-center gap-1 whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors ${navTxt} hover:text-[#f0a500]`}>
                    {link.label}<FiChevronDown size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Secondary links */}
          <ul className="flex items-center gap-1 shrink-0">
            {navLinks.filter(l => secondary.includes(l.label)).map((link) => (
              <li key={link.href}>
                <Link href={link.href}
                  className={`block whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors ${navTxt} hover:text-[#f0a500]`}>
                  {link.highlight ? (
                    <span className="inline-flex items-center gap-1 border border-[#f0a500] text-[#f0a500] px-2 py-0.5 rounded-full text-xs font-semibold">
                      <BsLightningChargeFill size={10} /> {isAR ? "العروض" : "Deals"}
                    </span>
                  ) : link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`md:hidden ${nBg} border-t ${br} flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        }`}
        dir={isAR ? "rtl" : "ltr"}
        style={{ overflowY: menuOpen ? "auto" : "hidden" }}
      >

          {/* Auth buttons */}
          <div className="px-4 pb-3 flex gap-3">
            <Link href="/signin" onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full border border-[#f0a500] text-[#f0a500] text-sm font-medium hover:bg-[#f0a500]/10 transition-colors">
              {isAR ? "تسجيل الدخول" : "Sign In"}
            </Link>
            <Link href="/register" onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full bg-[#f0a500] text-white text-sm font-bold hover:bg-[#c97000] transition-colors">
              {isAR ? "إنشاء حساب" : "Register"}
            </Link>
          </div>

          <div className={`border-t ${br}`} />

          {/* Settings row: Language + Currency + Theme */}
          <div className="px-4 py-3 flex items-center gap-2">

            {/* Language */}
            <div className="relative flex-1" ref={langRef}>
              <button onClick={() => setLangOpen(!langOpen)}
                className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border ${br} ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/40 text-xs font-medium transition-colors cursor-pointer`}>
                <Image src={currentLang.flag} alt={currentLang.native} width={18} height={13} className="rounded-sm object-cover" />
                <span>{lang.toUpperCase()}</span>
                <FiChevronDown size={11} style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              {langOpen && (
                <div className={`absolute left-0 mt-2 w-40 rounded-xl border ${br} ${nBg} shadow-lg overflow-hidden z-50`}>
                  {languages.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors
                        ${lang === l.code ? "bg-[#f0a500]/10 text-[#f0a500] font-semibold" : `${navTxt} hover:bg-[#f0a500]/5 hover:text-[#f0a500]`}`}>
                      <Image src={l.flag} alt={l.native} width={20} height={14} className="rounded-sm object-cover shrink-0" />
                      <span>{l.native}</span>
                      {lang === l.code && <span className="ml-auto text-[#f0a500] text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency */}
            <div className="relative flex-1" ref={currencyRef}>
              <button onClick={() => setCurrencyOpen(!currencyOpen)}
                className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border ${br} ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/40 text-xs font-medium transition-colors cursor-pointer`}>
                <span className="text-[#f0a500] font-bold">{currentCurrency.sign}</span>
                <span>{currentCurrency.code}</span>
                <FiChevronDown size={11} style={{ transform: currencyOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              {currencyOpen && (
                <div className={`absolute left-0 mt-2 w-48 rounded-xl border ${br} ${nBg} shadow-lg overflow-hidden z-50`}>
                  {currencies.map(c => (
                    <button key={c.code} onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors
                        ${currency === c.code ? "bg-[#f0a500]/10 text-[#f0a500] font-semibold" : `${navTxt} hover:bg-[#f0a500]/5 hover:text-[#f0a500]`}`}>
                      <span className="w-7 font-bold text-[#f0a500] shrink-0 text-sm">{c.sign}</span>
                      <span>{c.label}</span>
                      {currency === c.code && <span className="ml-auto text-[#f0a500] text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme */}
            <button onClick={() => setDark(!dark)} aria-label="Toggle theme"
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border ${br} ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/40 text-xs transition-colors cursor-pointer`}>
              {dark ? <BsSun size={14} className="text-[#f0a500]" /> : <BsMoon size={14} />}
              <span>{dark ? (isAR ? "فاتح" : "Light") : (isAR ? "داكن" : "Dark")}</span>
            </button>
          </div>

          <div className={`border-t ${br}`} />

          {/* Categories section */}
          <div className="px-4 pt-3 pb-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#f0a500] mb-2">
              {isAR ? "الفئات" : "Categories"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border ${br} ${navTxt} hover:text-[#f0a500] hover:border-[#f0a500]/40 hover:bg-[#f0a500]/5 text-sm font-medium transition-all`}>
                  <span className="text-[#f0a500]">{link.icon}</span>
                  <span className="truncate">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={`border-t ${br} mx-4 my-3`} />

          {/* Deals highlight */}
          <div className="px-4 pb-2">
            <Link href="/deals" onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[#f0a500]/10 border border-[#f0a500]/30 text-[#f0a500] font-semibold text-sm hover:bg-[#f0a500]/20 transition-colors">
              <span className="flex items-center gap-2">
                <BsLightningChargeFill size={15} />
                {isAR ? "العروض والتخفيضات" : "Deals & Offers"}
              </span>
              <FiChevronRight size={16} />
            </Link>
          </div>

          {/* Secondary links */}
          <div className="px-4 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
              {isAR ? "روابط أخرى" : "More"}
            </p>
            <div className="flex flex-col gap-0.5">
              {secondaryLinks.filter(l => !l.highlight).map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${navTxt} hover:text-[#f0a500] hover:bg-[#f0a500]/5 text-sm transition-colors`}>
                  <span className="flex items-center gap-2.5">
                    <span className="text-[#f0a500]">{link.icon}</span>
                    {link.label}
                  </span>
                  <FiChevronRight size={14} className="opacity-40" />
                </Link>
              ))}
            </div>
          </div>

      </div>
    </header>
  );
}
