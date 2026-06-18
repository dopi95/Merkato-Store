"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsSun, BsMoon, BsTruck, BsGlobe2, BsLightningChargeFill } from "react-icons/bs";
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX, FiChevronDown, FiChevronRight, FiUser, FiStar } from "react-icons/fi";
import { MdDevices, MdOutlineCheckroom, MdOutlineShoppingCart, MdOutlineSpa, MdOutlineChair, MdOutlineDiamond, MdOutlineInfo, MdOutlinePhone, MdOutlineHelpOutline } from "react-icons/md";
import { useLang } from "../context/LangContext";
import { useCurrency, currencies } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";

const navLinksEN = [
  { label: "Electronics",        href: "/products?cat=electronics",  catKey: "electronics",  icon: <MdDevices size={18} />,            cat: true },
  { label: "Fashion & Clothing", href: "/products?cat=fashion",      catKey: "fashion",      icon: <MdOutlineCheckroom size={18} />,   cat: true },
  { label: "Groceries",          href: "/products?cat=groceries",    catKey: "groceries",    icon: <MdOutlineShoppingCart size={18} />, cat: true },
  { label: "Beauty Products",    href: "/products?cat=beauty",       catKey: "beauty",       icon: <MdOutlineSpa size={18} />,          cat: true },
  { label: "Household Items",    href: "/products?cat=household",    catKey: "household",    icon: <MdOutlineChair size={18} />,        cat: true },
  { label: "Accessories",        href: "/products?cat=accessories",  catKey: "accessories",  icon: <MdOutlineDiamond size={18} />,      cat: true },
  { label: "About",              href: "/about",        icon: <MdOutlineInfo size={18} /> },
  { label: "Contact",            href: "/contact",      icon: <MdOutlinePhone size={18} /> },
  { label: "FAQ",                href: "/faq",          icon: <MdOutlineHelpOutline size={18} /> },
  { label: "Deals",              href: "/deals",        icon: <BsLightningChargeFill size={15} />, highlight: true },
];

const navLinksAR = [
  { label: "الإلكترونيات",        href: "/products?cat=electronics",  catKey: "electronics",  icon: <MdDevices size={18} />,            cat: true },
  { label: "الأزياء والملابس",     href: "/products?cat=fashion",      catKey: "fashion",      icon: <MdOutlineCheckroom size={18} />,   cat: true },
  { label: "البقالة",             href: "/products?cat=groceries",    catKey: "groceries",    icon: <MdOutlineShoppingCart size={18} />, cat: true },
  { label: "منتجات التجميل",      href: "/products?cat=beauty",       catKey: "beauty",       icon: <MdOutlineSpa size={18} />,          cat: true },
  { label: "المستلزمات المنزلية",  href: "/products?cat=household",    catKey: "household",    icon: <MdOutlineChair size={18} />,        cat: true },
  { label: "الإكسسوارات",         href: "/products?cat=accessories",  catKey: "accessories",  icon: <MdOutlineDiamond size={18} />,      cat: true },
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

export default function Header() {
  const router = useRouter();
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [dark,         setDarkState]    = useState(false);
  const { lang, setLang }              = useLang();
  const [langOpen,     setLangOpen]     = useState(false);
  const { currency, setCurrency, convertPrice, sign } = useCurrency();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [userOpen,     setUserOpen]     = useState(false);
  const [query,        setQuery]        = useState("");
  const [showResults,  setShowResults]  = useState(false);
  const [activeCat,    setActiveCat]    = useState(null);
  const { totalItems } = useCart();
  const { count: wishCount } = useWishlist();
  const searchRef = useRef(null);
  const navRef    = useRef(null);

  const catProducts = activeCat
    ? products.filter(p => p.cat === activeCat).slice(0, 4)
    : [];

  const searchResults = query.trim().length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        (p.tags || []).some(t => t.includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(false);
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleResultClick() {
    setQuery("");
    setShowResults(false);
    setSearchOpen(false);
  }

  // Load persisted values
  useEffect(() => {
    const savedDark = localStorage.getItem("merkato_dark");
    if (savedDark === "true") setDarkState(true);
  }, []);

  function setDark(val) {
    setDarkState(val);
    localStorage.setItem("merkato_dark", String(val));
  }

  const langRef     = useRef(null);
  const currencyRef = useRef(null);
  const userRef     = useRef(null);

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
    const handler = (e) => {
      if (langRef.current     && !langRef.current.contains(e.target))     setLangOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(e.target)) setCurrencyOpen(false);
      if (userRef.current     && !userRef.current.contains(e.target))     setUserOpen(false);
      if (searchRef.current   && !searchRef.current.contains(e.target))   setShowResults(false);
      if (navRef.current       && !navRef.current.contains(e.target))       setActiveCat(null);
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
              <span className="mx-6 inline-flex items-center gap-1.5"><BsTruck size={13} className="text-[#f0a500]" /> {isAR ? "شحن مجاني للطلبات فوق $100 عبر أفريقيا والشرق الأوسط" : "Free shipping on orders over $100 across Africa & the Middle East"}</span>
              <span className="text-[#f0a500] mx-2">·</span>
              <span className="mx-6 inline-flex items-center gap-1.5"><BsGlobe2 size={12} className="text-[#f0a500]" /> {isAR ? "نيجيريا · كينيا · إثيوبيا · الإمارات · مصر · السعودية · وأكثر..." : "Nigeria · Kenya · Ethiopia · UAE · Egypt · Saudi Arabia · and more..."}</span>
              <span className="text-[#f0a500] mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── TOP BAR ── */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">

        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Image src="/images/logo.png" alt="Merkato Store" width={155} height={50} priority style={{ width: "155px", height: "auto" }} />
        </Link>

        {/* Search — desktop */}
        <div className="hidden md:flex flex-1 mx-4 relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className={`flex items-center w-full max-w-xl rounded-full border border-[#f0a500]/40 focus-within:border-[#f0a500] focus-within:shadow-md focus-within:shadow-[#f0a500]/10 transition-all overflow-hidden`}>
              <span className={`pl-4 pr-2 ${muted} shrink-0`}><FiSearch size={17} /></span>
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                placeholder={isAR ? "ابحث عن منتجات، ماركات، فئات..." : "Search products, brands, categories..."}
                dir={isAR ? "rtl" : "ltr"}
                className={`flex-1 ${inputCls} text-sm py-2.5 pr-2 outline-none`}
              />
              {query && (
                <button type="button" onClick={() => { setQuery(""); setShowResults(false); }} className={`px-2 ${muted} hover:text-[#f0a500]`}>
                  <FiX size={15} />
                </button>
              )}
              <button type="submit" className="bg-[#f0a500] hover:bg-[#c97000] transition-colors px-6 py-2.5 text-white text-sm font-semibold shrink-0 cursor-pointer">
                {isAR ? "بحث" : "Search"}
              </button>
            </div>
          </form>
          {/* Dropdown results */}
          {showResults && searchResults.length > 0 && (
            <div className={`absolute top-full left-0 right-0 max-w-xl mt-2 rounded-2xl border ${br} ${nBg} shadow-xl overflow-hidden z-[999]`}>
              {searchResults.map(p => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  onClick={handleResultClick}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-[#f0a500]/5 transition-colors border-b ${br} last:border-b-0`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center shrink-0 text-2xl">
                    {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{isAR ? p.nameAR : p.name}</p>
                    <p className="text-xs text-[#f0a500] font-medium">{p.brand}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} size={10} className={i < Math.floor(p.rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/20"} />
                      ))}
                      <span className={`text-[10px] ${muted}`}>({p.reviews})</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-extrabold text-gray-800 dark:text-white">{sign}{convertPrice(p.price)}</p>
                    {p.originalPrice && (
                      <p className={`text-[10px] ${muted} line-through`}>{sign}{convertPrice(p.originalPrice)}</p>
                    )}
                  </div>
                </Link>
              ))}
              <Link
                href={`/products?search=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#f0a500] hover:bg-[#f0a500]/5 transition-colors"
              >
                <FiSearch size={14} />
                {isAR ? `عرض جميع نتائج "${query}"` : `See all results for "${query}"`}
              </Link>
            </div>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 ml-auto md:ml-0">

          <button onClick={() => setSearchOpen(!searchOpen)}
            className={`md:hidden p-2 ${muted} hover:text-[#f0a500] transition-colors`} aria-label="Search">
            <FiSearch size={20} />
          </button>

          <Link href="/wishlist" className={`relative p-2 ${muted} hover:text-[#f0a500] transition-colors`} aria-label="Wishlist">
            <FiHeart size={20} />
            <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] rounded-full bg-[#e05c5c] text-white text-[9px] font-bold flex items-center justify-center px-0.5 leading-none pointer-events-none">{wishCount > 99 ? "99+" : wishCount}</span>
          </Link>

          <Link href="/cart" className={`relative p-2 ${muted} hover:text-[#f0a500] transition-colors`} aria-label="Cart">
            <FiShoppingBag size={20} />
            <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] rounded-full bg-[#f0a500] text-white text-[9px] font-bold flex items-center justify-center px-0.5 leading-none pointer-events-none">{totalItems > 99 ? "99+" : totalItems}</span>
          </Link>

          {/* User dropdown — desktop */}
          <div className="hidden md:block relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              onMouseEnter={() => setUserOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${br} ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/50 transition-colors cursor-pointer`}
            >
              <FiUser size={18} />
              <span className="text-xs font-medium leading-tight text-left">
                <span className="block text-[10px] opacity-60">{isAR ? "مرحباً" : "Welcome"}</span>
                <span>{isAR ? "دخول / تسجيل" : "Sign in / Register"}</span>
              </span>
              <FiChevronDown size={13} style={{ transform: userOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {userOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-xl border ${br} ${nBg} shadow-lg overflow-hidden z-[999]`}
              >
                <div className="px-3 py-3 flex flex-col gap-2">
                  <button onMouseDown={() => { setUserOpen(false); router.push("/signin"); }}
                    className={`block w-full text-center px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm ${navTxt} hover:border-[#f0a500] hover:text-[#f0a500] transition-colors cursor-pointer`}>
                    {isAR ? "تسجيل الدخول" : "Sign In"}
                  </button>
                  <button onMouseDown={() => { setUserOpen(false); router.push("/register"); }}
                    className="block w-full text-center px-4 py-2 rounded-full border border-[#f0a500] text-sm font-semibold text-[#f0a500] hover:bg-[#f0a500] hover:text-white transition-colors cursor-pointer">
                    {isAR ? "إنشاء حساب" : "Register"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language — desktop */}
          <div className="hidden md:block relative" ref={langRef}>
            <button onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border ${br} ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/50 text-sm font-medium transition-colors cursor-pointer`}>
              <Image src={currentLang.flag} alt={currentLang.native} width={20} height={14} className="rounded-sm object-cover" style={{ width: "20px", height: "auto" }} />
              <span>{lang.toUpperCase()}</span>
              <FiChevronDown size={13} style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {langOpen && (
              <div className={`absolute right-0 mt-2 w-44 rounded-xl border ${br} ${nBg} shadow-lg overflow-hidden z-[999]`}>
                {languages.map(l => (
                  <button key={l.code}
                    onMouseDown={(e) => { e.preventDefault(); setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors
                      ${lang === l.code ? "bg-[#f0a500]/10 text-[#f0a500] font-semibold" : `${navTxt} hover:bg-[#f0a500]/5 hover:text-[#f0a500]`}`}>
                    <Image src={l.flag} alt={l.native} width={22} height={16} className="rounded-sm object-cover shrink-0" style={{ width: "22px", height: "auto" }} />
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
        <div className="md:hidden px-4 pb-3" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <div className={`flex items-center rounded-full border border-[#f0a500]/40 focus-within:border-[#f0a500] focus-within:shadow-md focus-within:shadow-[#f0a500]/10 transition-all overflow-hidden`}>
              <span className={`pl-4 pr-2 ${muted} shrink-0`}><FiSearch size={17} /></span>
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                placeholder={isAR ? "ابحث عن منتجات، ماركات، فئات..." : "Search products, brands, categories..."}
                autoFocus dir={isAR ? "rtl" : "ltr"}
                className={`flex-1 ${inputCls} text-sm py-2.5 pr-2 outline-none`}
              />
              {query && (
                <button type="button" onClick={() => { setQuery(""); setShowResults(false); }} className={`px-2 ${muted}`}>
                  <FiX size={15} />
                </button>
              )}
              <button type="submit" className="bg-[#f0a500] hover:bg-[#c97000] transition-colors px-5 py-2.5 text-white text-sm font-semibold shrink-0 cursor-pointer">
                {isAR ? "بحث" : "Search"}
              </button>
            </div>
          </form>
          {/* Mobile dropdown results */}
          {showResults && searchResults.length > 0 && (
            <div className={`mt-2 rounded-2xl border ${br} ${nBg} shadow-xl overflow-hidden z-[999]`}>
              {searchResults.map(p => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  onClick={handleResultClick}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-[#f0a500]/5 transition-colors border-b ${br} last:border-b-0`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#0f0f1a] flex items-center justify-center shrink-0 text-xl">
                    {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{isAR ? p.nameAR : p.name}</p>
                    <p className="text-xs text-[#f0a500] font-medium">{p.brand}</p>
                  </div>
                  <p className="text-sm font-extrabold text-gray-800 dark:text-white shrink-0">{sign}{convertPrice(p.price)}</p>
                </Link>
              ))}
              <Link
                href={`/products?search=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#f0a500] hover:bg-[#f0a500]/5 transition-colors"
              >
                <FiSearch size={14} />
                {isAR ? `عرض جميع النتائج` : `See all results`}
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── NAV BAR — desktop ── */}
      <nav className={`hidden md:block border-t ${br} ${nBg} transition-colors duration-300`} ref={navRef}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Currency */}
            <div className="relative shrink-0" ref={currencyRef}>
              <button onClick={() => setCurrencyOpen(!currencyOpen)}
                className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium ${muted} hover:text-[#f0a500] transition-colors cursor-pointer`}>
                <span className="text-[#f0a500] font-bold">{currentCurrency.sign}</span>
                <span>{isAR ? currentCurrency.labelAR : currentCurrency.label}</span>
                <FiChevronDown size={12} style={{ transform: currencyOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              {currencyOpen && (
                <div className={`absolute left-0 top-full mt-1 w-52 rounded-xl border ${br} ${nBg} shadow-lg overflow-hidden z-50`}>
                  {currencies.map(c => (
                    <button key={c.code} onMouseDown={(e) => { e.preventDefault(); setCurrency(c.code); setCurrencyOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors
                        ${currency === c.code ? "bg-[#f0a500]/10 text-[#f0a500] font-semibold" : `${navTxt} hover:bg-[#f0a500]/5 hover:text-[#f0a500]`}`}>
                      <span className="w-8 font-bold text-[#f0a500] shrink-0">{c.sign}</span>
                      <span>{isAR ? c.labelAR : c.label}</span>
                      {currency === c.code && <span className="ml-auto text-[#f0a500] text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={`w-px h-4 border-l ${br} mx-1`} />
            {/* Category links with dropdowns */}
            <ul className="flex items-center gap-1">
              {navLinks.filter(l => !secondary.includes(l.label)).map((link) => (
                <li key={link.href} className="relative">
                  {link.cat ? (
                    <button
                      onMouseEnter={() => setActiveCat(link.catKey)}
                      onMouseLeave={() => {}}
                      onClick={() => setActiveCat(activeCat === link.catKey ? null : link.catKey)}
                      className={`flex items-center gap-1 whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors cursor-pointer ${
                        activeCat === link.catKey ? "text-[#f0a500]" : `${navTxt} hover:text-[#f0a500]`
                      }`}
                    >
                      {link.label}
                      <FiChevronDown size={13} style={{ transform: activeCat === link.catKey ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                    </button>
                  ) : (
                    <Link href={link.href}
                      className={`flex items-center gap-1 whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors ${navTxt} hover:text-[#f0a500]`}>
                      {link.label}
                    </Link>
                  )}
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

        {/* ── CATEGORY DROPDOWN PANEL ── */}
        {activeCat && (
          <div
            className={`absolute left-0 right-0 ${nBg} border-t border-b ${br} shadow-xl z-[998]`}
            onMouseEnter={() => setActiveCat(activeCat)}
            onMouseLeave={() => setActiveCat(null)}
          >
            <div className="max-w-7xl mx-auto px-4 py-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#f0a500]">
                  {isAR ? "أبرز المنتجات" : "Top Products"}
                </p>
                <Link
                  href={`/products?cat=${activeCat}`}
                  onClick={() => setActiveCat(null)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#f0a500] hover:underline"
                >
                  {isAR ? "عرض جميع المنتجات" : "See all products"}
                  {isAR ? <FiChevronRight size={13} className="rotate-180" /> : <FiChevronRight size={13} />}
                </Link>
              </div>
              {catProducts.length === 0 ? (
                <p className={`text-sm ${muted}`}>{isAR ? "لا توجد منتجات" : "No products found"}</p>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {catProducts.map(p => {
                    const disc = p.originalPrice
                      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                      : null;
                    return (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        onClick={() => setActiveCat(null)}
                        className={`group flex flex-col rounded-xl border ${br} bg-gray-50 dark:bg-[#0f0f1a] hover:border-[#f0a500]/40 hover:shadow-md transition-all duration-200 overflow-hidden`}
                      >
                        {/* Image */}
                        <div className="relative h-32 flex items-center justify-center bg-white dark:bg-[#13112a]">
                          {disc && (
                            <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-[#e05c5c] text-white text-[10px] font-bold">
                              -{disc}%
                            </span>
                          )}
                          {p.isNew && (
                            <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#22c55e] text-white text-[10px] font-bold">
                              {isAR ? "جديد" : "New"}
                            </span>
                          )}
                          <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{p.emoji}</span>
                        </div>
                        {/* Info */}
                        <div className="p-3 flex flex-col gap-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#f0a500]">{p.brand}</p>
                          <p className="text-xs font-semibold text-gray-800 dark:text-white line-clamp-2 group-hover:text-[#f0a500] transition-colors">
                            {isAR ? p.nameAR : p.name}
                          </p>
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <FiStar key={i} size={10} className={i < Math.floor(p.rating) ? "fill-[#f0a500] text-[#f0a500]" : "text-gray-200 dark:text-white/20"} />
                            ))}
                            <span className={`text-[10px] ${muted} ml-1`}>({p.reviews})</span>
                          </div>
                          <div className="flex items-baseline gap-1.5 mt-1">
                            <span className="text-sm font-extrabold text-gray-800 dark:text-white">{sign}{convertPrice(p.price)}</span>
                            {p.originalPrice && (
                              <span className={`text-[10px] ${muted} line-through`}>{sign}{convertPrice(p.originalPrice)}</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`md:hidden ${nBg} border-t ${br} flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        dir={isAR ? "rtl" : "ltr"}
        style={{ overflowY: menuOpen ? "auto" : "hidden" }}
      >

          {/* Auth — mobile accordion */}
          <div className="px-4 pt-3 pb-3" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border ${br} ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/40 transition-colors`}
            >
              <FiUser size={18} className="text-[#f0a500] shrink-0" />
              <span className="flex-1 text-left">
                <span className="block text-[10px] opacity-60">{isAR ? "مرحباً" : "Welcome"}</span>
                <span className="text-sm font-medium">{isAR ? "دخول / تسجيل" : "Sign in / Register"}</span>
              </span>
              <FiChevronDown size={15} style={{ transform: userOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {userOpen && (
              <div className={`mt-1 rounded-xl border ${br} ${nBg} px-3 py-3 flex flex-col gap-2`}>
                <button onClick={() => { setMenuOpen(false); setUserOpen(false); setTimeout(() => router.push("/signin"), 10); }}
                  className={`w-full text-center px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm ${navTxt} hover:border-[#f0a500] hover:text-[#f0a500] transition-colors`}>
                  {isAR ? "تسجيل الدخول" : "Sign In"}
                </button>
                <button onClick={() => { setMenuOpen(false); setUserOpen(false); setTimeout(() => router.push("/register"), 10); }}
                  className="w-full text-center px-4 py-2 rounded-full border border-[#f0a500] text-sm font-semibold text-[#f0a500] hover:bg-[#f0a500] hover:text-white transition-colors">
                  {isAR ? "إنشاء حساب" : "Register"}
                </button>
              </div>
            )}
          </div>

          <div className={`border-t ${br}`} />

          {/* Settings row: Language + Currency + Theme */}
          <div className="px-4 py-3 flex items-center gap-2">

            {/* Language */}
            <div className="relative flex-1" ref={langRef}>
              <button onClick={() => setLangOpen(!langOpen)}
                className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border ${br} ${muted} hover:text-[#f0a500] hover:border-[#f0a500]/40 text-xs font-medium transition-colors cursor-pointer`}>
                <Image src={currentLang.flag} alt={currentLang.native} width={18} height={13} className="rounded-sm object-cover" style={{ width: "18px", height: "auto" }} />
                <span>{lang.toUpperCase()}</span>
                <FiChevronDown size={11} style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              {langOpen && (
                <div className={`absolute left-0 mt-2 w-40 rounded-xl border ${br} ${nBg} shadow-lg overflow-hidden z-[999]`}>
                  {languages.map(l => (
                    <button key={l.code}
                      onMouseDown={(e) => { e.preventDefault(); setLang(l.code); setLangOpen(false); setMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer transition-colors
                        ${lang === l.code ? "bg-[#f0a500]/10 text-[#f0a500] font-semibold" : `${navTxt} hover:bg-[#f0a500]/5 hover:text-[#f0a500]`}`}>
                      <Image src={l.flag} alt={l.native} width={20} height={14} className="rounded-sm object-cover shrink-0" style={{ width: "20px", height: "auto" }} />
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
                <span>{isAR ? currentCurrency.labelAR : currentCurrency.label}</span>
                <FiChevronDown size={11} style={{ transform: currencyOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              {currencyOpen && (
                <div className={`absolute left-0 mt-2 w-48 rounded-xl border ${br} ${nBg} shadow-lg overflow-hidden z-50`}>
                  {currencies.map(c => (
                    <button key={c.code} onMouseDown={(e) => { e.preventDefault(); setCurrency(c.code); setCurrencyOpen(false); setMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer transition-colors
                        ${currency === c.code ? "bg-[#f0a500]/10 text-[#f0a500] font-semibold" : `${navTxt} hover:bg-[#f0a500]/5 hover:text-[#f0a500]`}`}>
                      <span className="w-7 font-bold text-[#f0a500] shrink-0 text-sm">{c.sign}</span>
                      <span>{isAR ? c.labelAR : c.label}</span>
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
                <button key={link.href} onClick={() => { setMenuOpen(false); setTimeout(() => router.push(link.href), 10); }}
                  className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border ${br} ${navTxt} hover:text-[#f0a500] hover:border-[#f0a500]/40 hover:bg-[#f0a500]/5 text-sm font-medium transition-all`}>
                  <span className="text-[#f0a500]">{link.icon}</span>
                  <span className="truncate">{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`border-t ${br} mx-4 my-3`} />

          {/* Deals highlight */}
          <div className="px-4 pb-2">
            <button onClick={() => { setMenuOpen(false); setTimeout(() => router.push("/deals"), 10); }}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[#f0a500]/10 border border-[#f0a500]/30 text-[#f0a500] font-semibold text-sm hover:bg-[#f0a500]/20 transition-colors">
              <span className="flex items-center gap-2">
                <BsLightningChargeFill size={15} />
                {isAR ? "العروض والتخفيضات" : "Deals & Offers"}
              </span>
              <FiChevronRight size={16} />
            </button>
          </div>

          {/* Secondary links */}
          <div className="px-4 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">
              {isAR ? "روابط أخرى" : "More"}
            </p>
            <div className="flex flex-col gap-0.5">
              {secondaryLinks.filter(l => !l.highlight).map((link) => (
                <button key={link.href} onClick={() => { setMenuOpen(false); setTimeout(() => router.push(link.href), 10); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg ${navTxt} hover:text-[#f0a500] hover:bg-[#f0a500]/5 text-sm transition-colors`}>
                  <span className="flex items-center gap-2.5">
                    <span className="text-[#f0a500]">{link.icon}</span>
                    {link.label}
                  </span>
                  <FiChevronRight size={14} className="opacity-40" />
                </button>
              ))}
            </div>
          </div>

      </div>
    </header>
  );
}
