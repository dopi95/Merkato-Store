"use client";
import { useLang } from "../../context/LangContext";

const sections = {
  en: [
    { title: "Acceptance of Terms", body: "By accessing or using Merkato Store, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform." },
    { title: "Eligibility", body: "You must be at least 18 years old to create an account and make purchases. By using our services, you confirm that you meet this requirement." },
    { title: "Account Responsibilities", body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use." },
    { title: "Orders & Payments", body: "All orders are subject to availability and confirmation. We reserve the right to cancel orders at our discretion. Prices are subject to change without notice." },
    { title: "Prohibited Activities", body: "You may not use our platform for any unlawful purpose, to transmit harmful content, to impersonate others, to scrape data, or to interfere with the platform's operation." },
    { title: "Intellectual Property", body: "All content on Merkato Store — including logos, text, images, and software — is owned by or licensed to us. You may not reproduce or distribute it without written permission." },
    { title: "Limitation of Liability", body: "To the maximum extent permitted by law, Merkato Store is not liable for indirect, incidental, or consequential damages arising from your use of the platform." },
    { title: "Governing Law", body: "These terms are governed by applicable laws. Disputes shall be resolved through binding arbitration or in the courts of the applicable jurisdiction." },
    { title: "Changes to Terms", body: "We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms." },
    { title: "Contact", body: "For questions about these terms, contact us at legal@merkatostore.com." },
  ],
  ar: [
    { title: "قبول الشروط", body: "بالوصول إلى ميركاتو ستور أو استخدامه، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق، يرجى عدم استخدام منصتنا." },
    { title: "الأهلية", body: "يجب أن يكون عمرك 18 عاماً على الأقل لإنشاء حساب وإجراء عمليات شراء. باستخدام خدماتنا، تؤكد استيفاءك لهذا الشرط." },
    { title: "مسؤوليات الحساب", body: "أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك وعن جميع الأنشطة التي تجري تحت حسابك. أخطرنا فوراً بأي استخدام غير مصرح به." },
    { title: "الطلبات والمدفوعات", body: "جميع الطلبات خاضعة للتوفر والتأكيد. نحتفظ بالحق في إلغاء الطلبات وفق تقديرنا. الأسعار عرضة للتغيير دون إشعار مسبق." },
    { title: "الأنشطة المحظورة", body: "لا يجوز استخدام منصتنا لأي غرض غير قانوني أو لنقل محتوى ضار أو انتحال شخصية الآخرين أو استخراج البيانات أو التدخل في تشغيل المنصة." },
    { title: "الملكية الفكرية", body: "جميع المحتويات على ميركاتو ستور — بما في ذلك الشعارات والنصوص والصور والبرامج — مملوكة لنا أو مرخصة لنا. لا يجوز إعادة إنتاجها أو توزيعها دون إذن كتابي." },
    { title: "تحديد المسؤولية", body: "بالقدر الأقصى المسموح به قانوناً، لا تتحمل ميركاتو ستور المسؤولية عن الأضرار غير المباشرة أو العرضية أو التبعية الناجمة عن استخدامك للمنصة." },
    { title: "القانون الحاكم", body: "تخضع هذه الشروط للقوانين المعمول بها. تُحسم النزاعات عبر التحكيم الملزم أو في محاكم الاختصاص القضائي المعني." },
    { title: "التغييرات على الشروط", body: "قد نحدّث هذه الشروط في أي وقت. استمرار استخدام المنصة بعد التغييرات يُعدّ قبولاً للشروط الجديدة." },
    { title: "التواصل", body: "للاستفسار عن هذه الشروط، تواصل معنا على legal@merkatostore.com." },
  ],
};

export default function TermsPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";
  const data = sections[isAR ? "ar" : "en"];
  const br = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d1a]" dir={isAR ? "rtl" : "ltr"}>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f0a500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0a500]/15 border border-[#f0a500]/30 text-[#f0a500] text-xs font-bold uppercase tracking-widest">
            {isAR ? "شروط الخدمة" : "Terms of Service"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            {isAR ? "شروط" : "Terms &"} <span className="text-[#f0a500]">{isAR ? "الاستخدام" : "Conditions"}</span>
          </h1>
          <p className={`text-sm ${muted}`}>{isAR ? "آخر تحديث: يناير 2025" : "Last updated: January 2025"}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className={`rounded-2xl bg-white dark:bg-[#13112a] border ${br} divide-y divide-gray-100 dark:divide-white/5`}>
          {data.map((s, i) => (
            <div key={i} className="p-6 sm:p-8">
              <p className="font-bold text-gray-800 dark:text-white mb-2">{s.title}</p>
              <p className={`text-sm leading-relaxed ${muted}`}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
