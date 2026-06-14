"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import AuthSlider from "../../components/AuthSlider";
import { useLang } from "../../context/LangContext";

const T = {
  en: {
    title: "Forgot Password?",
    sub: "Enter your email and we'll send you a reset link.",
    email: "Email address", emailPh: "you@example.com",
    btn: "Send Reset Link",
    backSignin: "Back to Sign In",
    backHome: "Back to Home",
  },
  ar: {
    title: "نسيت كلمة المرور؟",
    sub: "أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.",
    email: "البريد الإلكتروني", emailPh: "you@example.com",
    btn: "إرسال رابط الاسترداد",
    backSignin: "العودة لتسجيل الدخول",
    backHome: "العودة للرئيسية",
  },
};

export default function ForgotPasswordPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = T[isAR ? "ar" : "en"];
  const router = useRouter();

  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/check-email?email=" + encodeURIComponent(email));
    }, 1500);
  }

  const field = "flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus-within:border-[#f0a500] focus-within:bg-white dark:focus-within:bg-white/8 transition-all";
  const input = "flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/25 outline-none";
  const lbl   = "block text-xs font-semibold text-gray-500 dark:text-white/40 mb-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#07070f] p-3 sm:p-4" dir={isAR ? "rtl" : "ltr"}>
      <div className="w-full max-w-4xl flex flex-col md:flex-row md:h-[560px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/60 border border-gray-200 dark:border-white/8">

        {/* Slider — top on mobile, left on desktop */}
        <div className="md:hidden relative h-44 overflow-hidden">
          <AuthSlider backHome={c.backHome} />
        </div>
        <div className="relative hidden md:block md:w-[44%] lg:w-[46%] md:shrink-0 overflow-hidden">
          <AuthSlider backHome={c.backHome} />
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-10 py-10 bg-white dark:bg-[#111120]">
          <div className="w-full max-w-[360px]">

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#f0a500]/10 border border-[#f0a500]/20 flex items-center justify-center mb-5 mx-auto">
              <FiMail size={24} className="text-[#f0a500]" />
            </div>

            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{c.title}</h2>
              <p className="text-sm text-gray-400 dark:text-white/35 mt-1">{c.sub}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className={lbl}>{c.email}</label>
                <div className={field}>
                  <FiMail size={14} className="text-gray-400 dark:text-white/25 shrink-0" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder={c.emailPh} className={input} />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#f0a500] hover:bg-[#c97000] disabled:opacity-70 active:scale-[0.98] transition-all rounded-xl py-3 text-white text-sm font-bold cursor-pointer shadow-md shadow-[#f0a500]/20">
                {loading
                  ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  : <>{c.btn} <FiArrowRight size={14} /></>}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/signin" className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-white/35 hover:text-[#f0a500] transition-colors">
                <FiArrowLeft size={13} /> {c.backSignin}
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
