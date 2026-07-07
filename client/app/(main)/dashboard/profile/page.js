"use client";
import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiCheck, FiCamera, FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
import { useLang } from "../../../context/LangContext";

function pwStrength(pw) {
  let s = 0;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { lang } = useLang();
  const isAR = lang === "ar";

  // Profile state
  const [editing, setEditing] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [form, setForm] = useState({
    name:   user.name,
    email:  user.email,
    phone:  user.phone,
    dob:    user.dob,
    gender: user.gender,
  });

  // Password state
  const [pw, setPw]         = useState({ current: "", next: "", confirm: "" });
  const [show, setShow]     = useState({ current: false, next: false, confirm: false });
  const [pwSaved, setPwSaved]   = useState(false);
  const [pwErrors, setPwErrors] = useState({});

  function handleProfileSave(e) {
    e.preventDefault();
    setEditing(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  function handlePwSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!pw.current)              errs.current = true;
    if (pw.next.length < 8)       errs.next = true;
    if (pw.next !== pw.confirm)   errs.confirm = true;
    if (Object.keys(errs).length) { setPwErrors(errs); return; }
    setPwErrors({});
    setPwSaved(true);
    setPw({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 3500);
  }

  const nBg  = "bg-white dark:bg-[#13112a]";
  const br   = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";
  const initials = form.name.split(" ").map(n => n[0]).join("").toUpperCase();

  const str = pwStrength(pw.next);
  const strLabel = ["", isAR ? "ضعيفة" : "Weak", isAR ? "متوسطة" : "Fair", isAR ? "جيدة" : "Good", isAR ? "قوية" : "Strong"][str];
  const strColor = ["", "bg-[#e05c5c]", "bg-[#f0a500]", "bg-[#3b82f6]", "bg-[#22c55e]"][str];

  function PwField({ fkey, label }) {
    const err = pwErrors[fkey];
    return (
      <div>
        <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{label}</label>
        <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-colors ${err ? "border-[#e05c5c]" : "border-gray-200 dark:border-white/10 focus-within:border-[#f0a500]"} bg-gray-50 dark:bg-[#0f0f1a]`}>
          <FiLock size={14} className={`shrink-0 ${muted}`} />
          <input
            type={show[fkey] ? "text" : "password"}
            value={pw[fkey]}
            onChange={e => { setPw(p => ({ ...p, [fkey]: e.target.value })); if (pwErrors[fkey]) setPwErrors(er => ({ ...er, [fkey]: false })); }}
            placeholder="••••••••"
            className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/25 outline-none"
          />
          <button type="button" onClick={() => setShow(s => ({ ...s, [fkey]: !s[fkey] }))} className={`${muted} hover:text-[#f0a500] transition-colors cursor-pointer shrink-0`}>
            {show[fkey] ? <FiEyeOff size={14} /> : <FiEye size={14} />}
          </button>
        </div>
        {err && (
          <p className="text-xs text-[#e05c5c] mt-1">
            {fkey === "confirm" ? (isAR ? "كلمتا المرور غير متطابقتين" : "Passwords do not match")
              : fkey === "next" ? (isAR ? "8 أحرف على الأقل" : "Minimum 8 characters")
              : (isAR ? "هذا الحقل مطلوب" : "This field is required")}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">

      {/* ── PERSONAL INFO ── */}
      <div className={`${nBg} rounded-2xl border ${br} p-6`}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg font-extrabold text-gray-800 dark:text-white">
              {isAR ? "المعلومات الشخصية" : "Personal Information"}
            </h1>
            <p className={`text-xs ${muted} mt-0.5`}>
              {isAR ? "إدارة معلومات ملفك الشخصي" : "Manage your profile information"}
            </p>
          </div>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#f0a500]/40 text-[#f0a500] text-sm font-semibold hover:bg-[#f0a500]/10 transition-colors cursor-pointer"
            >
              <FiEdit2 size={14} /> {isAR ? "تعديل" : "Edit"}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(false)}
                className={`px-4 py-2 rounded-xl border ${br} text-sm font-semibold ${muted} hover:border-gray-300 transition-colors cursor-pointer`}
              >
                {isAR ? "إلغاء" : "Cancel"}
              </button>
              <button
                form="profile-form"
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                <FiCheck size={14} /> {isAR ? "حفظ" : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f0a500] to-[#c97000] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-[#f0a500]/30">
              {initials}
            </div>
            {editing && (
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#f0a500] text-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#c97000] transition-colors">
                <FiCamera size={12} />
              </button>
            )}
          </div>
          <div>
            <p className="font-bold text-gray-800 dark:text-white">{form.name}</p>
            <p className={`text-sm ${muted}`}>{form.email}</p>
            <p className={`text-xs ${muted} mt-0.5`}>{isAR ? `عضو منذ ${user.joined}` : `Member since ${user.joined}`}</p>
          </div>
        </div>

        {profileSaved && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-sm font-semibold mb-4">
            <FiCheck size={14} />
            {isAR ? "تم حفظ التغييرات بنجاح!" : "Changes saved successfully!"}
          </div>
        )}

        <form id="profile-form" onSubmit={handleProfileSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: FiUser,     key: "name",  en: "Full Name",     ar: "الاسم الكامل",        type: "text"  },
              { icon: FiMail,     key: "email", en: "Email",         ar: "البريد الإلكتروني",   type: "email" },
              { icon: FiPhone,    key: "phone", en: "Phone",         ar: "رقم الهاتف",          type: "tel"   },
              { icon: FiCalendar, key: "dob",   en: "Date of Birth", ar: "تاريخ الميلاد",       type: "date"  },
            ].map(({ icon: Icon, key, en, ar, type }) => (
              <div key={key}>
                <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? ar : en}</label>
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-[#0f0f1a] transition-colors ${
                  editing ? "border-gray-200 dark:border-white/10 focus-within:border-[#f0a500]" : "border-transparent"
                }`}>
                  <Icon size={14} className={`shrink-0 ${muted}`} />
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    disabled={!editing}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-white disabled:cursor-default"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className={`block text-xs font-semibold ${muted} mb-1.5`}>{isAR ? "الجنس" : "Gender"}</label>
              <div className="flex gap-2">
                {[
                  { val: "Male",   en: "Male",   ar: "ذكر"  },
                  { val: "Female", en: "Female", ar: "أنثى" },
                  { val: "Other",  en: "Other",  ar: "آخر"  },
                ].map(g => (
                  <button
                    key={g.val}
                    type="button"
                    disabled={!editing}
                    onClick={() => editing && setForm(f => ({ ...f, gender: g.val }))}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      form.gender === g.val
                        ? "border-[#f0a500] bg-[#f0a500]/10 text-[#f0a500]"
                        : `border-gray-200 dark:border-white/10 ${muted} ${editing ? "hover:border-[#f0a500]/50 cursor-pointer" : "cursor-default"}`
                    }`}
                  >
                    {isAR ? g.ar : g.en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ── ACCOUNT DETAILS ── */}
      <div className={`${nBg} rounded-2xl border ${br} p-5`}>
        <h2 className="text-sm font-extrabold text-gray-800 dark:text-white mb-4">
          {isAR ? "معلومات الحساب" : "Account Details"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { en: "Account Type",   ar: "نوع الحساب",   val: isAR ? "عميل" : "Customer" },
            { en: "Member Since",   ar: "عضو منذ",      val: user.joined },
            { en: "Account Status", ar: "حالة الحساب",  val: isAR ? "نشط ✓" : "Active ✓" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1 p-3 rounded-xl bg-gray-50 dark:bg-[#0f0f1a]">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${muted}`}>{isAR ? item.ar : item.en}</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHANGE PASSWORD ── */}
      <div className={`${nBg} rounded-2xl border ${br} p-6`}>
        <div className="mb-5">
          <h2 className="text-lg font-extrabold text-gray-800 dark:text-white">
            {isAR ? "تغيير كلمة المرور" : "Change Password"}
          </h2>
          <p className={`text-xs ${muted} mt-0.5`}>
            {isAR ? "حافظ على أمان حسابك بكلمة مرور قوية" : "Keep your account secure with a strong password"}
          </p>
        </div>

        {pwSaved && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-sm font-semibold mb-5">
            <FiCheck size={15} />
            {isAR ? "تم تغيير كلمة المرور بنجاح!" : "Password changed successfully!"}
          </div>
        )}

        <form onSubmit={handlePwSubmit} className="flex flex-col gap-4 max-w-lg">
          <PwField fkey="current" label={isAR ? "كلمة المرور الحالية" : "Current Password"} />
          <PwField fkey="next"    label={isAR ? "كلمة المرور الجديدة" : "New Password"} />

          {pw.next.length > 0 && (
            <div className="flex flex-col gap-1.5 -mt-2">
              <div className="flex gap-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i <= str ? strColor : "bg-gray-200 dark:bg-white/10"}`} />
                ))}
              </div>
              <p className={`text-xs font-semibold ${str >= 3 ? "text-[#22c55e]" : str === 2 ? "text-[#f0a500]" : "text-[#e05c5c]"}`}>
                {strLabel}
              </p>
            </div>
          )}

          <PwField fkey="confirm" label={isAR ? "تأكيد كلمة المرور" : "Confirm New Password"} />

          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              { en: "At least 8 characters",     ar: "8 أحرف على الأقل",        met: pw.next.length >= 8 },
              { en: "Uppercase letter",           ar: "حرف كبير",                met: /[A-Z]/.test(pw.next) },
              { en: "Number",                     ar: "رقم",                     met: /[0-9]/.test(pw.next) },
              { en: "Special character (!@#$)",   ar: "رمز خاص (!@#$)",          met: /[^A-Za-z0-9]/.test(pw.next) },
            ].map((tip, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 ${tip.met ? "bg-[#22c55e]" : "bg-gray-200 dark:bg-white/10"}`}>
                  {tip.met && <FiCheck size={9} />}
                </span>
                <span className={`text-xs ${tip.met ? "text-gray-700 dark:text-white/70" : muted}`}>{isAR ? tip.ar : tip.en}</span>
              </div>
            ))}
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white font-bold text-sm transition-colors cursor-pointer mt-1">
            <FiShield size={15} />
            {isAR ? "تحديث كلمة المرور" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
