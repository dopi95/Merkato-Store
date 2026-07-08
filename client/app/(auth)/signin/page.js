"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsShieldCheck, BsTruck, BsHeadset } from "react-icons/bs";
import { useLang } from "../../context/LangContext";
import { useAuth } from "../../context/AuthContext";
import AuthSlider from "../../components/AuthSlider";
import { useRouter } from "next/navigation";

const T = {
  en: {
    welcome: "Welcome back", sub: "Sign in to your Merkato Store account",
    email: "Email", emailPh: "you@example.com",
    password: "Password", passwordPh: "••••••••",
    forgot: "Forgot password?", btn: "Sign In",
    or: "or continue with", google: "Google",
    noAccount: "Don't have an account?", register: "Create one",
    backHome: "Back to Home",
    tagline: "Your premium marketplace across Africa & the Middle East.",
    perks: [
      { icon: <BsTruck size={15} />,       text: "Free shipping on orders over $100" },
      { icon: <BsShieldCheck size={15} />, text: "100% secure & encrypted checkout" },
      { icon: <BsHeadset size={15} />,     text: "24/7 customer support" },
    ],
    stats: [{ n: "2M+", l: "Customers" }, { n: "50K+", l: "Products" }, { n: "15+", l: "Countries" }],
    headline1: "Shop Without", headline2: "Limits", badge: "Welcome back",
  },
  ar: {
    welcome: "مرحباً بعودتك", sub: "سجّل الدخول إلى حسابك في ماركاتو ستور",
    email: "البريد الإلكتروني", emailPh: "you@example.com",
    password: "كلمة المرور", passwordPh: "••••••••",
    forgot: "نسيت كلمة المرور؟", btn: "تسجيل الدخول",
    or: "أو تابع بـ", google: "Google",
    noAccount: "ليس لديك حساب؟", register: "أنشئ حساباً",
    backHome: "العودة للرئيسية",
    tagline: "سوقك المميز عبر أفريقيا والشرق الأوسط.",
    perks: [
      { icon: <BsTruck size={15} />,       text: "شحن مجاني للطلبات فوق $100" },
      { icon: <BsShieldCheck size={15} />, text: "دفع آمن ومشفر 100%" },
      { icon: <BsHeadset size={15} />,     text: "دعم العملاء على مدار الساعة" },
    ],
    stats: [{ n: "2M+", l: "عميل" }, { n: "50K+", l: "منتج" }, { n: "15+", l: "دولة" }],
    headline1: "تسوّق بلا حدود", headline2: "في كل مكان", badge: "مرحباً بك",
  },
};

export default function SignInPage() {
  const { lang } = useLang();
  const { login } = useAuth();
  const router = useRouter();
  const isAR = lang === "ar";
  const c = T[isAR ? "ar" : "en"];

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      router.push(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const field = "flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus-within:border-[#f0a500] focus-within:bg-white dark:focus-within:bg-white/8 transition-all";
  const input = "flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/25 outline-none";
  const ico   = "text-gray-400 dark:text-white/25 shrink-0";
  const lbl   = "block text-xs font-semibold text-gray-500 dark:text-white/40 mb-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#07070f] p-3 sm:p-4" dir={isAR ? "rtl" : "ltr"}>

      {/* Card wrapper — stacks on mobile, side-by-side on md+ */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row md:h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/60 border border-gray-200 dark:border-white/8">

        {/* ── BRANDING PANEL ── */}
        <div className="relative md:w-[44%] lg:w-[46%] md:shrink-0 overflow-hidden
          hidden md:block">
          <AuthSlider backHome={c.backHome} />
        </div>

        {/* Mobile top banner */}
        <div className="md:hidden relative h-44 overflow-hidden">
          <AuthSlider backHome={c.backHome} />
        </div>

        {/* ── FORM PANEL ── */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-10 py-7 md:py-4 bg-white dark:bg-[#111120]">
          <div className="w-full max-w-[360px]">

            <div className="mb-5 md:mb-6 text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{c.welcome}</h2>
              <p className="text-sm text-gray-400 dark:text-white/35 mt-1">{c.sub}</p>
            </div>

            {/* Social */}
            <div className="flex gap-2 mb-4">
              <button type="button" onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white/70 text-sm font-medium hover:border-[#f0a500]/50 hover:bg-[#f0a500]/5 transition-all cursor-pointer">
                <FcGoogle size={15} /> {c.google}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
              <span className="text-xs text-gray-400 dark:text-white/25">{c.or}</span>
              <div className="flex-1 h-px bg-gray-100 dark:bg-white/6" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {error && <p className="text-xs text-red-500 text-center -mt-1">{error}</p>}
              <div>
                <label className={lbl}>{c.email}</label>
                <div className={field}>
                  <FiMail size={14} className={ico} />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder={c.emailPh} className={input} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className={lbl}>{c.password}</label>
                  <Link href="/forgot-password" className="text-xs text-[#f0a500] hover:underline">{c.forgot}</Link>
                </div>
                <div className={field}>
                  <FiLock size={14} className={ico} />
                  <input type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder={c.passwordPh} className={input} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className={`${ico} hover:text-[#f0a500] transition-colors cursor-pointer`}>
                    {showPw ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#f0a500] hover:bg-[#c97000] disabled:opacity-70 active:scale-[0.98] transition-all rounded-xl py-3 text-white text-sm font-bold cursor-pointer shadow-md shadow-[#f0a500]/20">
                {loading
                  ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  : <>{c.btn} <FiArrowRight size={14} /></>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 dark:text-white/35 mt-5">
              {c.noAccount}{" "}
              <Link href="/register" className="text-[#f0a500] font-semibold hover:underline">{c.register}</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
