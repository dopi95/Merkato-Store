"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiMail, FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import { BsEnvelopeCheck } from "react-icons/bs";
import { useState, Suspense } from "react";
import AuthSlider from "../../components/AuthSlider";
import { useLang } from "../../context/LangContext";

const T = {
  en: {
    title: "Check your email",
    sub: "We sent a password reset link to",
    sub2: "Check your inbox and click the link to reset your password.",
    resend: "Resend email", resending: "Resending...", resent: "Email resent!",
    backSignin: "Back to Sign In",
    backHome: "Back to Home",
    noEmail: "Didn't receive it? Check your spam folder or",
  },
  ar: {
    title: "تحقق من بريدك الإلكتروني",
    sub: "أرسلنا رابط إعادة تعيين كلمة المرور إلى",
    sub2: "افتح بريدك الإلكتروني وانقر على الرابط لإعادة تعيين كلمة المرور.",
    resend: "إعادة إرسال", resending: "جارٍ الإرسال...", resent: "تم الإرسال!",
    backSignin: "العودة لتسجيل الدخول",
    backHome: "العودة للرئيسية",
    noEmail: "لم تستلمه؟ تحقق من مجلد الرسائل غير المرغوب فيها أو",
  },
};

function CheckEmailContent() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = T[isAR ? "ar" : "en"];
  const params = useSearchParams();
  const email = params.get("email") || "your email";

  const [status, setStatus] = useState("idle");

  function handleResend() {
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#07070f] p-3 sm:p-4" dir={isAR ? "rtl" : "ltr"}>
      <div className="w-full max-w-4xl flex flex-col md:flex-row md:h-[560px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/60 border border-gray-200 dark:border-white/8">

        {/* Slider */}
        <div className="md:hidden relative h-44 overflow-hidden">
          <AuthSlider backHome={c.backHome} />
        </div>
        <div className="relative hidden md:block md:w-[44%] lg:w-[46%] md:shrink-0 overflow-hidden">
          <AuthSlider backHome={c.backHome} />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-10 py-10 bg-white dark:bg-[#111120]">
          <div className="w-full max-w-[360px] text-center">

            {/* Animated icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#f0a500]/10 border border-[#f0a500]/20 flex items-center justify-center mb-5 mx-auto">
              <BsEnvelopeCheck size={28} className="text-[#f0a500]" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{c.title}</h2>

            <p className="text-sm text-gray-400 dark:text-white/40 mb-1">{c.sub}</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-white mb-3 break-all">{email}</p>
            <p className="text-sm text-gray-400 dark:text-white/35 mb-8">{c.sub2}</p>

            {/* Resend */}
            <button onClick={handleResend} disabled={status !== "idle"}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer mb-4
                ${status === "sent"
                  ? "border-green-400 text-green-500 bg-green-50 dark:bg-green-500/10"
                  : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:border-[#f0a500] hover:text-[#f0a500]"}`}>
              {status === "sending"
                ? <><FiRefreshCw size={14} className="animate-spin" /> {c.resending}</>
                : status === "sent"
                ? <>{c.resent}</>
                : <><FiMail size={14} /> {c.resend}</>}
            </button>

            <p className="text-xs text-gray-400 dark:text-white/30 mb-6">
              {c.noEmail}{" "}
              <button onClick={handleResend} className="text-[#f0a500] hover:underline cursor-pointer">{c.resend.toLowerCase()}</button>
            </p>

            <Link href="/signin" className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-white/35 hover:text-[#f0a500] transition-colors">
              <FiArrowLeft size={13} /> {c.backSignin}
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense>
      <CheckEmailContent />
    </Suspense>
  );
}
