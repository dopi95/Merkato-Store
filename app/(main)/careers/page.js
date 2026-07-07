"use client";
import { useState } from "react";
import { useLang } from "../../context/LangContext";
import { FiBriefcase, FiMapPin, FiClock, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { BsGlobe2, BsHeartFill, BsLightningChargeFill } from "react-icons/bs";

const t = {
  en: {
    badge: "Join Our Team",
    title: "Build the future of",
    titleAccent: "African commerce",
    sub: "We're a fast-growing team on a mission to connect millions of people with the products they love. Come grow with us.",
    perksTitle: "Why work at Merkato",
    perks: [
      { icon: <BsGlobe2 size={20} />, title: "Remote-friendly", desc: "Work from anywhere across Africa & the Middle East." },
      { icon: <BsLightningChargeFill size={20} />, title: "Fast growth", desc: "Accelerate your career in a high-impact environment." },
      { icon: <BsHeartFill size={20} />, title: "Great benefits", desc: "Competitive pay, health coverage, and learning budget." },
    ],
    openTitle: "Open Positions",
    jobs: [
      { title: "Senior Frontend Engineer", dept: "Engineering", location: "Remote", type: "Full-time" },
      { title: "Product Manager", dept: "Product", location: "Nairobi / Remote", type: "Full-time" },
      { title: "UX Designer", dept: "Design", location: "Remote", type: "Full-time" },
      { title: "Growth Marketing Manager", dept: "Marketing", location: "Dubai / Remote", type: "Full-time" },
      { title: "Customer Support Lead", dept: "Support", location: "Remote", type: "Full-time" },
      { title: "Data Analyst", dept: "Analytics", location: "Remote", type: "Full-time" },
    ],
    apply: "Apply Now",
    noRole: "Don't see your role?",
    noRoleSub: "Send your CV to",
    email: "careers@merkatostore.com",
  },
  ar: {
    badge: "انضم إلى فريقنا",
    title: "ابنِ مستقبل",
    titleAccent: "التجارة الأفريقية",
    sub: "نحن فريق سريع النمو في مهمة لربط الملايين بالمنتجات التي يحبونها. تعال وانمُ معنا.",
    perksTitle: "لماذا تعمل في ميركاتو",
    perks: [
      { icon: <BsGlobe2 size={20} />, title: "عمل عن بُعد", desc: "اعمل من أي مكان في أفريقيا والشرق الأوسط." },
      { icon: <BsLightningChargeFill size={20} />, title: "نمو سريع", desc: "طوّر مسيرتك المهنية في بيئة عالية التأثير." },
      { icon: <BsHeartFill size={20} />, title: "مزايا رائعة", desc: "راتب تنافسي وتغطية صحية وميزانية تعلم." },
    ],
    openTitle: "الوظائف المتاحة",
    jobs: [
      { title: "مهندس واجهة أمامية أول", dept: "الهندسة", location: "عن بُعد", type: "دوام كامل" },
      { title: "مدير منتج", dept: "المنتج", location: "نيروبي / عن بُعد", type: "دوام كامل" },
      { title: "مصمم تجربة مستخدم", dept: "التصميم", location: "عن بُعد", type: "دوام كامل" },
      { title: "مدير تسويق النمو", dept: "التسويق", location: "دبي / عن بُعد", type: "دوام كامل" },
      { title: "قائد دعم العملاء", dept: "الدعم", location: "عن بُعد", type: "دوام كامل" },
      { title: "محلل بيانات", dept: "التحليلات", location: "عن بُعد", type: "دوام كامل" },
    ],
    apply: "قدّم الآن",
    noRole: "لم تجد وظيفتك؟",
    noRoleSub: "أرسل سيرتك الذاتية إلى",
    email: "careers@merkatostore.com",
  },
};

export default function CareersPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = t[isAR ? "ar" : "en"];
  const br = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0a500]/15 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold uppercase tracking-widest">
            {c.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            {c.title} <span className="text-[#f0a500]">{c.titleAccent}</span>
          </h1>
          <p className={`text-sm sm:text-base max-w-xl ${muted}`}>{c.sub}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">

        {/* Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {c.perks.map((p, i) => (
            <div key={i} className={`flex flex-col gap-3 p-6 rounded-2xl bg-white dark:bg-[#13112a] border ${br}`}>
              <span className="text-[#f0a500]">{p.icon}</span>
              <p className="font-bold text-gray-800 dark:text-white text-sm">{p.title}</p>
              <p className={`text-sm ${muted}`}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Jobs */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-5">{c.openTitle}</p>
          <div className="flex flex-col gap-3">
            {c.jobs.map((job, i) => (
              <div key={i} className={`flex items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#13112a] border ${br} hover:border-[#f0a500]/40 transition-all group`}>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-gray-800 dark:text-white text-sm group-hover:text-[#f0a500] transition-colors">{job.title}</p>
                  <div className={`flex items-center gap-3 text-xs ${muted} flex-wrap`}>
                    <span className="flex items-center gap-1"><FiBriefcase size={11} /> {job.dept}</span>
                    <span className="flex items-center gap-1"><FiMapPin size={11} /> {job.location}</span>
                    <span className="flex items-center gap-1"><FiClock size={11} /> {job.type}</span>
                  </div>
                </div>
                <button className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f0a500]/10 hover:bg-[#f0a500] border border-[#f0a500]/30 hover:border-[#f0a500] text-[#f0a500] hover:text-white text-xs font-bold transition-all cursor-pointer">
                  {c.apply} {isAR ? <FiArrowLeft size={12} /> : <FiArrowRight size={12} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* No role */}
        <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-8 text-center flex flex-col gap-2`}>
          <p className="font-bold text-gray-800 dark:text-white">{c.noRole}</p>
          <p className={`text-sm ${muted}`}>
            {c.noRoleSub}{" "}
            <a href={`mailto:${c.email}`} className="text-[#f0a500] hover:underline font-semibold">{c.email}</a>
          </p>
        </div>

      </div>
    </div>
  );
}
