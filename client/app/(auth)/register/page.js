"use client";
import { useState } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsShieldCheck, BsTruck, BsHeadset, BsGift } from "react-icons/bs";
import { useLang } from "../../context/LangContext";
import AuthSlider from "../../components/AuthSlider";

const T = {
  en: {
    heading: "Create your account", sub: "Join millions of shoppers on Merkato Store",
    fullName: "Full name", namePh: "John Doe",
    email: "Email", emailPh: "you@example.com",
    phone: "Phone", phonePh: "+1 234 567 8900",
    password: "Password", confirm: "Confirm password",
    terms: "I agree to the", termsLink: "Terms", and: "&", privacyLink: "Privacy Policy",
    btn: "Create Account", or: "or sign up with", google: "Google",
    hasAccount: "Already have an account?", signin: "Sign in",
    backHome: "Back to Home",
    strength: ["", "Weak", "Fair", "Good", "Strong"],
    tagline: "Your premium marketplace across Africa & the Middle East.",
    perks: [
      { icon: <BsGift size={15} />,       text: "Welcome bonus on first order" },
      { icon: <BsTruck size={15} />,       text: "Free shipping over $100" },
      { icon: <BsShieldCheck size={15} />, text: "Secure & encrypted account" },
      { icon: <BsHeadset size={15} />,     text: "Dedicated 24/7 support" },
    ],
    stats: [{ n: "2M+", l: "Customers" }, { n: "50K+", l: "Products" }, { n: "15+", l: "Countries" }],
    headline1: "A Shopping", headline2: "Like No Other", badge: "Join Us Today",
  },
  ar: {
    heading: "إنشاء حساب جديد", sub: "انضم إلى ملايين المتسوقين في ماركاتو ستور",
    fullName: "الاسم الكامل", namePh: "محمد أحمد",
    email: "البريد الإلكتروني", emailPh: "you@example.com",
    phone: "الهاتف", phonePh: "+966 5XX XXX XXXX",
    password: "كلمة المرور", confirm: "تأكيد كلمة المرور",
    terms: "أوافق على", termsLink: "الشروط", and: "و", privacyLink: "سياسة الخصوصية",
    btn: "إنشاء الحساب", or: "أو سجّل بـ", google: "Google",
    hasAccount: "لديك حساب؟", signin: "تسجيل الدخول",
    backHome: "العودة للرئيسية",
    strength: ["", "ضعيف", "متوسط", "جيد", "قوي"],
    tagline: "سوقك المميز عبر أفريقيا والشرق الأوسط.",
    perks: [
      { icon: <BsGift size={15} />,       text: "مكافأة ترحيبية على طلبك الأول" },
      { icon: <BsTruck size={15} />,       text: "شحن مجاني للطلبات فوق $100" },
      { icon: <BsShieldCheck size={15} />, text: "حساب آمن ومشفر" },
      { icon: <BsHeadset size={15} />,     text: "دعم عملاء مخصص" },
    ],
    stats: [{ n: "2M+", l: "عميل" }, { n: "50K+", l: "منتج" }, { n: "15+", l: "دولة" }],
    headline1: "تجربة تسوق", headline2: "لا مثيل لها", badge: "انضم إلينا",
  },
};

function getStrength(pw) {
  if (!pw.length) return 0;
  if (pw.length < 6) return 1;
  let s = 1;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}
const swColor = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

export default function RegisterPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = T[isAR ? "ar" : "en"];

  const [form, setForm]       = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw]   = useState(false);
  const [showCf, setShowCf]   = useState(false);
  const [agreed, setAgreed]   = useState(false);
  const [loading, setLoading] = useState(false);

  const strength  = getStrength(form.password);
  const pwMatch   = form.confirm.length > 0 && form.password === form.confirm;
  const pwNoMatch = form.confirm.length > 0 && form.password !== form.confirm;
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  const field = "flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-gray-50 dark:bg-white/5 focus-within:border-[#f0a500] focus-within:bg-white dark:focus-within:bg-white/8 transition-all";
  const input = "flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/25 outline-none min-w-0";
  const ico   = "text-gray-400 dark:text-white/25 shrink-0";
  const lbl   = "block text-xs font-semibold text-gray-500 dark:text-white/40 mb-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#07070f] p-3 sm:p-4" dir={isAR ? "rtl" : "ltr"}>

      {/* Card wrapper — stacks on mobile, side-by-side on md+ */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row md:h-[640px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/60 border border-gray-200 dark:border-white/8">

        {/* Mobile top slider */}
        <div className="md:hidden relative h-44 overflow-hidden">
          <AuthSlider backHome={c.backHome} />
        </div>

        {/* ── FORM PANEL ── */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-10 py-7 md:py-4 bg-white dark:bg-[#111120] overflow-y-auto">
          <div className="w-full max-w-[360px]">

            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{c.heading}</h2>
              <p className="text-sm text-gray-400 dark:text-white/35 mt-1">{c.sub}</p>
            </div>

            {/* Social */}
            <div className="flex gap-2 mb-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white/70 text-sm font-medium hover:border-[#f0a500]/50 hover:bg-[#f0a500]/5 transition-all cursor-pointer">
                <FcGoogle size={15} /> {c.google}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
              <span className="text-xs text-gray-400 dark:text-white/25">{c.or}</span>
              <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">

              {/* Name */}
              <div>
                <label className={lbl}>{c.fullName}</label>
                <div className={`${field} border-gray-200 dark:border-white/10`}>
                  <FiUser size={13} className={ico} />
                  <input type="text" required value={form.name} onChange={set("name")} placeholder={c.namePh} className={input} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={lbl}>{c.email}</label>
                <div className={`${field} border-gray-200 dark:border-white/10`}>
                  <FiMail size={14} className={ico} />
                  <input type="email" required value={form.email} onChange={set("email")} placeholder={c.emailPh} className={input} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className={lbl}>{c.password}</label>
                <div className={`${field} border-gray-200 dark:border-white/10`}>
                  <FiLock size={14} className={ico} />
                  <input type={showPw ? "text" : "password"} required value={form.password} onChange={set("password")} placeholder="••••••••" className={input} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className={`${ico} hover:text-[#f0a500] transition-colors cursor-pointer`}>
                    {showPw ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex gap-0.5 flex-1">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? swColor[strength] : "bg-gray-200 dark:bg-white/10"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 dark:text-white/30 shrink-0">{c.strength[strength]}</span>
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div>
                <label className={lbl}>{c.confirm}</label>
                <div className={`${field} ${pwNoMatch ? "border-red-400" : pwMatch ? "border-green-400" : "border-gray-200 dark:border-white/10"}`}>
                  <FiLock size={14} className={ico} />
                  <input type={showCf ? "text" : "password"} required value={form.confirm} onChange={set("confirm")} placeholder="••••••••" className={input} />
                  {pwMatch && <FiCheck size={14} className="text-green-500 shrink-0" />}
                  <button type="button" onClick={() => setShowCf(!showCf)} className={`${ico} hover:text-[#f0a500] transition-colors cursor-pointer`}>
                    {showCf ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer">
                <div onClick={() => setAgreed(!agreed)}
                  className={`w-4 h-4 mt-0.5 rounded shrink-0 border-2 flex items-center justify-center transition-all cursor-pointer ${agreed ? "bg-[#f0a500] border-[#f0a500]" : "border-gray-300 dark:border-white/20"}`}>
                  {agreed && <FiCheck size={9} className="text-white" />}
                </div>
                <span className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
                  {c.terms}{" "}
                  <Link href="/terms" className="text-[#f0a500] hover:underline">{c.termsLink}</Link>
                  {" "}{c.and}{" "}
                  <Link href="/privacy" className="text-[#f0a500] hover:underline">{c.privacyLink}</Link>
                </span>
              </label>

              <button type="submit" disabled={loading || !agreed}
                className="w-full flex items-center justify-center gap-2 bg-[#f0a500] hover:bg-[#c97000] disabled:opacity-60 active:scale-[0.98] transition-all rounded-xl py-3 text-white text-sm font-bold cursor-pointer shadow-md shadow-[#f0a500]/20">
                {loading
                  ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  : <>{c.btn} <FiArrowRight size={14} /></>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 dark:text-white/35 mt-4">
              {c.hasAccount}{" "}
              <Link href="/signin" className="text-[#f0a500] font-semibold hover:underline">{c.signin}</Link>
            </p>
          </div>
        </div>

        {/* Desktop right slider */}
        <div className="relative hidden md:block md:w-[44%] md:shrink-0 overflow-hidden">
          <AuthSlider backHome={c.backHome} />
        </div>

      </div>
    </div>
  );
}
