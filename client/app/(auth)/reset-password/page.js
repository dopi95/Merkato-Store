"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import AuthSlider from "../../components/AuthSlider";
import { useLang } from "../../context/LangContext";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const T = {
  en: {
    title: "Reset Password",
    sub: "Create a new strong password for your account.",
    newPw: "New password", confirmPw: "Confirm new password",
    btn: "Reset Password",
    backSignin: "Back to Sign In",
    backHome: "Back to Home",
    strength: ["", "Weak", "Fair", "Good", "Strong"],
    success: "Password reset successfully!",
    successSub: "You can now sign in with your new password.",
    goSignin: "Go to Sign In",
  },
  ar: {
    title: "إعادة تعيين كلمة المرور",
    sub: "أنشئ كلمة مرور جديدة وقوية لحسابك.",
    newPw: "كلمة المرور الجديدة", confirmPw: "تأكيد كلمة المرور",
    btn: "إعادة التعيين",
    backSignin: "العودة لتسجيل الدخول",
    backHome: "العودة للرئيسية",
    strength: ["", "ضعيف", "متوسط", "جيد", "قوي"],
    success: "تم إعادة تعيين كلمة المرور!",
    successSub: "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.",
    goSignin: "الذهاب لتسجيل الدخول",
  },
};

function getStrength(pw) {
  if (!pw.length) return 0;
  if (pw.length < 8) return 1;
  let s = 1;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}
const swColor = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = T[isAR ? "ar" : "en"];
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";

  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [showCf, setShowCf]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [done, setDone]           = useState(false);
  const [error, setError]         = useState("");

  const strength  = getStrength(password);
  const pwMatch   = confirm.length > 0 && password === confirm;
  const pwNoMatch = confirm.length > 0 && password !== confirm;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!pwMatch) return;
    setError("");
    setLoading(true);
    try {
      await axios.post(`${API}/auth/reset-password`, { token, password });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const field = "flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-gray-50 dark:bg-white/5 focus-within:border-[#f0a500] focus-within:bg-white dark:focus-within:bg-white/8 transition-all";
  const input = "flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/25 outline-none";
  const ico   = "text-gray-400 dark:text-white/25 shrink-0";
  const lbl   = "block text-xs font-semibold text-gray-500 dark:text-white/40 mb-1";

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

        {/* Form / Success */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-10 py-10 bg-white dark:bg-[#111120]">
          <div className="w-full max-w-[360px]">

            {done ? (
              /* ── SUCCESS STATE ── */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/15 border border-green-300 dark:border-green-500/30 flex items-center justify-center mb-5 mx-auto">
                  <FiCheck size={28} className="text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{c.success}</h2>
                <p className="text-sm text-gray-400 dark:text-white/35 mb-8">{c.successSub}</p>
                <button onMouseDown={() => router.push("/signin")}
                  className="w-full flex items-center justify-center gap-2 bg-[#f0a500] hover:bg-[#c97000] transition-all rounded-xl py-3 text-white text-sm font-bold cursor-pointer shadow-md shadow-[#f0a500]/20">
                  {c.goSignin} {isAR ? <FiArrowLeft size={14} /> : <FiArrowRight size={14} />}
                </button>
              </div>
            ) : (
              /* ── FORM STATE ── */
              <>
                <div className="w-14 h-14 rounded-2xl bg-[#f0a500]/10 border border-[#f0a500]/20 flex items-center justify-center mb-5 mx-auto">
                  <FiLock size={24} className="text-[#f0a500]" />
                </div>

                <div className="mb-6 text-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{c.title}</h2>
                  <p className="text-sm text-gray-400 dark:text-white/35 mt-1">{c.sub}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                  {/* New password */}
                  <div>
                    <label className={lbl}>{c.newPw}</label>
                    <div className={`${field} border-gray-200 dark:border-white/10`}>
                      <FiLock size={14} className={ico} />
                      <input type={showPw ? "text" : "password"} required value={password}
                        onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={input} />
                      <button type="button" onClick={() => setShowPw(!showPw)} className={`${ico} hover:text-[#f0a500] transition-colors cursor-pointer`}>
                        {showPw ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                      </button>
                    </div>
                    {password.length > 0 && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex gap-0.5 flex-1">
                          {[1,2,3,4].map((i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? swColor[strength] : "bg-gray-200 dark:bg-white/10"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400 dark:text-white/30 shrink-0">{c.strength[strength]}</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
                      {[
                        [/.{8,}/, isAR ? "٨ أحرف" : "8+ chars"],
                        [/[A-Z]/, isAR ? "حرف كبير" : "Uppercase"],
                        [/[a-z]/, isAR ? "حرف صغير" : "Lowercase"],
                        [/[0-9]/, isAR ? "رقم" : "Number"],
                        [/[^A-Za-z0-9]/, isAR ? "رمز" : "Special"],
                      ].map(([rx, label]) => (
                        <span key={label} className={`text-[10px] font-medium transition-colors ${rx.test(password) ? "text-green-500" : "text-gray-400 dark:text-white/25"}`}>
                          {rx.test(password) ? "✓" : "○"} {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Confirm */}
                  <div>
                    <label className={lbl}>{c.confirmPw}</label>
                    <div className={`${field} ${pwNoMatch ? "border-red-400" : pwMatch ? "border-green-400" : "border-gray-200 dark:border-white/10"}`}>
                      <FiLock size={14} className={ico} />
                      <input type={showCf ? "text" : "password"} required value={confirm}
                        onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" className={input} />
                      {pwMatch && <FiCheck size={14} className="text-green-500 shrink-0" />}
                      <button type="button" onClick={() => setShowCf(!showCf)} className={`${ico} hover:text-[#f0a500] transition-colors cursor-pointer`}>
                        {showCf ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={loading || !pwMatch}
                    className="w-full flex items-center justify-center gap-2 bg-[#f0a500] hover:bg-[#c97000] disabled:opacity-60 active:scale-[0.98] transition-all rounded-xl py-3 text-white text-sm font-bold cursor-pointer shadow-md shadow-[#f0a500]/20 mt-1">
                    {loading
                      ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      : <>{c.btn} {isAR ? <FiArrowLeft size={14} /> : <FiArrowRight size={14} />}</>}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link href="/signin" className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-white/35 hover:text-[#f0a500] transition-colors">
                    {isAR ? <FiArrowRight size={13} /> : <FiArrowLeft size={13} />} {c.backSignin}
                  </Link>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
