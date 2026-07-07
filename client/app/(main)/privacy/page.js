"use client";
import { useLang } from "../../context/LangContext";

const sections = {
  en: [
    { title: "Information We Collect", body: "We collect information you provide directly (name, email, address, payment details) and information collected automatically (device data, browsing behavior, IP address) when you use our platform." },
    { title: "How We Use Your Information", body: "We use your data to process orders, personalize your experience, send transactional and promotional emails (with your consent), improve our services, and comply with legal obligations." },
    { title: "Sharing Your Information", body: "We do not sell your personal data. We share it only with trusted partners (payment processors, shipping carriers, analytics providers) who are contractually bound to protect it." },
    { title: "Cookies", body: "We use cookies and similar technologies to keep you signed in, remember preferences, and analyze traffic. You can manage cookie preferences in your browser settings." },
    { title: "Data Retention", body: "We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion at any time by contacting us." },
    { title: "Your Rights", body: "Depending on your location, you may have the right to access, correct, delete, or export your personal data. Contact us at privacy@merkatostore.com to exercise these rights." },
    { title: "Security", body: "We use industry-standard encryption (SSL/TLS) and security practices to protect your data. However, no method of transmission over the internet is 100% secure." },
    { title: "Changes to This Policy", body: "We may update this policy periodically. We'll notify you of significant changes via email or a prominent notice on our website." },
    { title: "Contact", body: "For privacy-related questions, contact us at privacy@merkatostore.com." },
  ],
  ar: [
    { title: "المعلومات التي نجمعها", body: "نجمع المعلومات التي تقدمها مباشرةً (الاسم، البريد الإلكتروني، العنوان، بيانات الدفع) والمعلومات المجمَّعة تلقائياً (بيانات الجهاز، سلوك التصفح، عنوان IP) عند استخدامك لمنصتنا." },
    { title: "كيف نستخدم معلوماتك", body: "نستخدم بياناتك لمعالجة الطلبات وتخصيص تجربتك وإرسال رسائل المعاملات والترويج (بموافقتك) وتحسين خدماتنا والامتثال للالتزامات القانونية." },
    { title: "مشاركة معلوماتك", body: "لا نبيع بياناتك الشخصية. نشاركها فقط مع شركاء موثوقين (معالجو الدفع، شركات الشحن، مزودو التحليلات) الملتزمون تعاقدياً بحمايتها." },
    { title: "ملفات تعريف الارتباط", body: "نستخدم ملفات تعريف الارتباط وتقنيات مماثلة لإبقائك مسجلاً الدخول وتذكر التفضيلات وتحليل حركة المرور. يمكنك إدارة التفضيلات في إعدادات متصفحك." },
    { title: "الاحتفاظ بالبيانات", body: "نحتفظ ببياناتك الشخصية طالما حسابك نشط أو حسب الحاجة لتقديم الخدمات. يمكنك طلب الحذف في أي وقت بالتواصل معنا." },
    { title: "حقوقك", body: "بحسب موقعك، قد يحق لك الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها أو تصديرها. تواصل معنا على privacy@merkatostore.com لممارسة هذه الحقوق." },
    { title: "الأمان", body: "نستخدم تشفيراً بمعايير الصناعة (SSL/TLS) وممارسات أمنية لحماية بياناتك. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة 100%." },
    { title: "التغييرات على هذه السياسة", body: "قد نحدّث هذه السياسة دورياً. سنخطرك بالتغييرات الجوهرية عبر البريد الإلكتروني أو إشعار بارز على موقعنا." },
    { title: "التواصل", body: "للاستفسارات المتعلقة بالخصوصية، تواصل معنا على privacy@merkatostore.com." },
  ],
};

export default function PrivacyPage() {
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
            {isAR ? "سياسة الخصوصية" : "Privacy Policy"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            {isAR ? "خصوصيتك" : "Your Privacy"} <span className="text-[#f0a500]">{isAR ? "تهمنا" : "Matters"}</span>
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
