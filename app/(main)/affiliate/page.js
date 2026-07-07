"use client";
import { useState } from "react";
import { useLang } from "../../context/LangContext";
import { FiLink, FiDollarSign, FiTrendingUp, FiCheck, FiArrowRight, FiArrowLeft } from "react-icons/fi";

const t = {
  en: {
    badge: "Affiliate Program",
    title: "Earn by sharing",
    titleAccent: "what you love",
    sub: "Join thousands of creators and publishers earning commissions by promoting Merkato Store products to their audience.",
    howTitle: "How it works",
    steps: [
      { icon: <FiLink size={22} />, title: "1. Sign Up", desc: "Create your free affiliate account in minutes." },
      { icon: <FiTrendingUp size={22} />, title: "2. Share Links", desc: "Get unique links for any product and share them anywhere." },
      { icon: <FiDollarSign size={22} />, title: "3. Earn Commission", desc: "Earn up to 12% on every sale you refer. Paid monthly." },
    ],
    ratesTitle: "Commission Rates",
    rates: [
      { cat: "Electronics", rate: "5%" },
      { cat: "Fashion & Clothing", rate: "10%" },
      { cat: "Beauty & Skincare", rate: "12%" },
      { cat: "Groceries", rate: "6%" },
      { cat: "Household", rate: "8%" },
      { cat: "Accessories", rate: "10%" },
    ],
    perks: ["No minimum traffic required", "Real-time dashboard", "Monthly payouts via bank or M-Pesa", "Dedicated affiliate support"],
    cta: "Join the Program",
    ctaSub: "Free to join. No approval needed.",
    form: { name: "Full Name", namePh: "Your name", email: "Email", emailPh: "your@email.com", website: "Website / Social", websitePh: "https://...", submit: "Apply Now", success: "Application received! We'll be in touch within 48 hours." },
  },
  ar: {
    badge: "برنامج الإحالة",
    title: "اكسب من مشاركة",
    titleAccent: "ما تحبه",
    sub: "انضم إلى آلاف المبدعين والناشرين الذين يكسبون عمولات من خلال الترويج لمنتجات ميركاتو ستور لجمهورهم.",
    howTitle: "كيف يعمل",
    steps: [
      { icon: <FiLink size={22} />, title: "١. سجّل", desc: "أنشئ حساب إحالة مجاني في دقائق." },
      { icon: <FiTrendingUp size={22} />, title: "٢. شارك الروابط", desc: "احصل على روابط فريدة لأي منتج وشاركها في أي مكان." },
      { icon: <FiDollarSign size={22} />, title: "٣. اكسب عمولة", desc: "اكسب حتى 12% على كل عملية بيع تُحيلها. تُدفع شهرياً." },
    ],
    ratesTitle: "معدلات العمولة",
    rates: [
      { cat: "الإلكترونيات", rate: "5%" },
      { cat: "الأزياء والملابس", rate: "10%" },
      { cat: "الجمال والعناية بالبشرة", rate: "12%" },
      { cat: "البقالة", rate: "6%" },
      { cat: "المستلزمات المنزلية", rate: "8%" },
      { cat: "الإكسسوارات", rate: "10%" },
    ],
    perks: ["لا يشترط حد أدنى من الزيارات", "لوحة تحكم فورية", "مدفوعات شهرية عبر البنك أو M-Pesa", "دعم مخصص للمنتسبين"],
    cta: "انضم للبرنامج",
    ctaSub: "مجاني للانضمام. لا يحتاج موافقة.",
    form: { name: "الاسم الكامل", namePh: "اسمك", email: "البريد الإلكتروني", emailPh: "بريدك@example.com", website: "الموقع / السوشيال", websitePh: "https://...", submit: "قدّم الآن", success: "تم استلام طلبك! سنتواصل معك خلال 48 ساعة." },
  },
};

export default function AffiliatePage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = t[isAR ? "ar" : "en"];
  const br = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";
  const inputCls = `w-full rounded-xl border ${br} bg-white dark:bg-[#0f0f1a] text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30 px-4 py-3 outline-none focus:border-[#f0a500] transition-all`;

  const [form, setForm] = useState({ name: "", email: "", website: "" });
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0a500]/15 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold uppercase tracking-widest">{c.badge}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            {c.title} <span className="text-[#f0a500]">{c.titleAccent}</span>
          </h1>
          <p className={`text-sm sm:text-base max-w-xl ${muted}`}>{c.sub}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">

        {/* How it works */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-5">{c.howTitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {c.steps.map((s, i) => (
              <div key={i} className={`flex flex-col gap-3 p-6 rounded-2xl bg-white dark:bg-[#13112a] border ${br}`}>
                <span className="text-[#f0a500]">{s.icon}</span>
                <p className="font-bold text-gray-800 dark:text-white text-sm">{s.title}</p>
                <p className={`text-sm ${muted}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Rates */}
          <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6`}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-4">{c.ratesTitle}</p>
            <div className="flex flex-col gap-2">
              {c.rates.map((r, i) => (
                <div key={i} className={`flex items-center justify-between py-2 border-b ${br} last:border-0`}>
                  <span className={`text-sm ${muted}`}>{r.cat}</span>
                  <span className="text-sm font-extrabold text-[#f0a500]">{r.rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perks */}
          <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6 flex flex-col gap-3`}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-1">{c.cta}</p>
            <p className={`text-sm ${muted} mb-2`}>{c.ctaSub}</p>
            {c.perks.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <FiCheck size={14} className="text-[#22c55e] shrink-0" />
                <span className="text-sm text-gray-700 dark:text-white/70">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Apply form */}
        <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6 sm:p-10`}>
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#22c55e]/15 flex items-center justify-center">
                <FiCheck size={24} className="text-[#22c55e]" />
              </div>
              <p className="font-bold text-gray-800 dark:text-white">{c.form.success}</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-semibold ${muted} uppercase tracking-wide`}>{c.form.name}</label>
                  <input required type="text" placeholder={c.form.namePh} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-semibold ${muted} uppercase tracking-wide`}>{c.form.email}</label>
                  <input required type="email" placeholder={c.form.emailPh} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls} dir="ltr" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-semibold ${muted} uppercase tracking-wide`}>{c.form.website}</label>
                <input type="url" placeholder={c.form.websitePh} value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} className={inputCls} dir="ltr" />
              </div>
              <button type="submit" className="self-start flex items-center gap-2 bg-[#f0a500] hover:bg-[#c97000] active:scale-[0.98] transition-all rounded-xl px-7 py-3 text-white text-sm font-bold cursor-pointer shadow-sm shadow-[#f0a500]/30">
                {c.form.submit} {isAR ? <FiArrowLeft size={14} /> : <FiArrowRight size={14} />}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
