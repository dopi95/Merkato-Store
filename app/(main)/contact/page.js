"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "../../context/LangContext";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from "react-icons/fi";
import { BsHeadset, BsWhatsapp } from "react-icons/bs";

const t = {
  en: {
    badge: "Get in Touch",
    title: "We'd love to",
    titleAccent: "hear from you",
    sub: "Have a question, issue, or just want to say hello? Our support team is available 24/7.",
    cards: [
      { icon: <FiMail size={22} />, title: "Email Us", value: "support@merkatostore.com", href: "mailto:support@merkatostore.com" },
      { icon: <FiPhone size={22} />, title: "Call Us", value: "+1 (800) 123-4567", href: "tel:+18001234567" },
      { icon: <BsWhatsapp size={22} />, title: "WhatsApp", value: "Chat with us", href: "https://wa.me/18001234567" },
      { icon: <BsHeadset size={22} />, title: "Live Chat", value: "Available 24/7", href: "/faq" },
    ],
    form: {
      name: "Full Name", namePh: "Your name",
      email: "Email Address", emailPh: "your@email.com",
      subject: "Subject", subjectPh: "How can we help?",
      message: "Message", messagePh: "Tell us more...",
      submit: "Send Message",
      success: "Message sent! We'll get back to you within 24 hours.",
    },
    faqNote: "Looking for quick answers?",
    faqLink: "Browse our FAQ",
  },
  ar: {
    badge: "تواصل معنا",
    title: "يسعدنا",
    titleAccent: "سماعك",
    sub: "هل لديك سؤال أو مشكلة أو تريد فقط أن تقول مرحباً؟ فريق الدعم متاح على مدار الساعة.",
    cards: [
      { icon: <FiMail size={22} />, title: "راسلنا", value: "support@merkatostore.com", href: "mailto:support@merkatostore.com" },
      { icon: <FiPhone size={22} />, title: "اتصل بنا", value: "+1 (800) 123-4567", href: "tel:+18001234567" },
      { icon: <BsWhatsapp size={22} />, title: "واتساب", value: "تحدث معنا", href: "https://wa.me/18001234567" },
      { icon: <BsHeadset size={22} />, title: "دردشة مباشرة", value: "متاح 24/7", href: "/faq" },
    ],
    form: {
      name: "الاسم الكامل", namePh: "اسمك",
      email: "البريد الإلكتروني", emailPh: "بريدك@example.com",
      subject: "الموضوع", subjectPh: "كيف يمكننا مساعدتك؟",
      message: "الرسالة", messagePh: "أخبرنا بالمزيد...",
      submit: "إرسال الرسالة",
      success: "تم إرسال رسالتك! سنرد عليك خلال 24 ساعة.",
    },
    faqNote: "تبحث عن إجابات سريعة؟",
    faqLink: "تصفح الأسئلة الشائعة",
  },
};

export default function ContactPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const c = t[isAR ? "ar" : "en"];

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const br = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";
  const inputCls = `w-full rounded-xl border ${br} bg-white dark:bg-[#0f0f1a] text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30 px-4 py-3 outline-none focus:border-[#f0a500] focus:shadow-md focus:shadow-[#f0a500]/10 transition-all`;

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0a500]/15 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold uppercase tracking-widest">
            {c.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            {c.title}
            <span className="block text-[#f0a500]">{c.titleAccent}</span>
          </h1>
          <p className={`text-sm sm:text-base max-w-md ${muted}`}>{c.sub}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">

        {/* Contact cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {c.cards.map((card, i) => (
            <a
              key={i}
              href={card.href}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-[#13112a] border ${br} hover:border-[#f0a500]/40 hover:shadow-lg hover:shadow-[#f0a500]/5 transition-all text-center group`}
            >
              <span className="text-[#f0a500] group-hover:scale-110 transition-transform">{card.icon}</span>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-white">{card.title}</p>
                <p className={`text-xs mt-0.5 ${muted}`}>{card.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} p-6 sm:p-10`}>
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 flex items-center justify-center">
                <FiCheck size={28} className="text-[#22c55e]" />
              </div>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{c.form.success}</p>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-[#f0a500] hover:underline cursor-pointer"
              >
                {isAR ? "إرسال رسالة أخرى" : "Send another message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-semibold ${muted} uppercase tracking-wide`}>{c.form.name}</label>
                  <input required type="text" placeholder={c.form.namePh} value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputCls} dir={isAR ? "rtl" : "ltr"} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-semibold ${muted} uppercase tracking-wide`}>{c.form.email}</label>
                  <input required type="email" placeholder={c.form.emailPh} value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={inputCls} dir="ltr" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-semibold ${muted} uppercase tracking-wide`}>{c.form.subject}</label>
                <input required type="text" placeholder={c.form.subjectPh} value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className={inputCls} dir={isAR ? "rtl" : "ltr"} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={`text-xs font-semibold ${muted} uppercase tracking-wide`}>{c.form.message}</label>
                <textarea required rows={5} placeholder={c.form.messagePh} value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`${inputCls} resize-none`} dir={isAR ? "rtl" : "ltr"} />
              </div>
              <button
                type="submit"
                className="self-start flex items-center gap-2 bg-[#f0a500] hover:bg-[#c97000] active:scale-[0.98] transition-all rounded-xl px-7 py-3 text-white text-sm font-bold cursor-pointer shadow-sm shadow-[#f0a500]/30"
              >
                <FiSend size={14} /> {c.form.submit}
              </button>
            </form>
          )}
        </div>

        {/* FAQ note */}
        <p className={`text-center text-sm ${muted}`}>
          {c.faqNote}{" "}
          <Link href="/faq" className="text-[#f0a500] font-semibold hover:underline">{c.faqLink}</Link>
        </p>

      </div>
    </div>
  );
}
