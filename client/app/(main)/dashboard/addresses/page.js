"use client";
import { useState } from "react";
import { FiMapPin, FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useLang } from "../../../context/LangContext";

const DEFAULT_ADDRESSES = [
  { id: 1, label: "Home",   name: "John Doe",   phone: "+1 555-012-3456", address: "123 Main Street, Apt 4B", city: "New York",   country: "United States", zip: "10001", isDefault: true  },
  { id: 2, label: "Work",   name: "John Doe",   phone: "+971 50-123-4567", address: "456 Sheikh Zayed Rd",    city: "Dubai",      country: "UAE",           zip: "00000", isDefault: false },
];

const EMPTY = { label: "Home", name: "", phone: "", address: "", city: "", country: "", zip: "" };

export default function AddressesPage() {
  const { lang } = useLang();
  const isAR = lang === "ar";

  const [addresses, setAddresses] = useState(DEFAULT_ADDRESSES);
  const [showForm,  setShowForm]  = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [form,      setForm]      = useState(EMPTY);
  const [deleted,   setDeleted]   = useState(null);

  const nBg   = "bg-white dark:bg-[#13112a]";
  const br    = "border-gray-100 dark:border-white/5";
  const muted = "text-gray-500 dark:text-white/50";
  const inputCls = `w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0f0f1a] text-sm text-gray-800 dark:text-white outline-none focus:border-[#f0a500] transition-colors`;

  function openAdd() { setForm(EMPTY); setEditId(null); setShowForm(true); }
  function openEdit(addr) { setForm({ ...addr }); setEditId(addr.id); setShowForm(true); }
  function cancel() { setShowForm(false); setEditId(null); }

  function save(e) {
    e.preventDefault();
    if (editId) {
      setAddresses(a => a.map(x => x.id === editId ? { ...form, id: editId, isDefault: x.isDefault } : x));
    } else {
      setAddresses(a => [...a, { ...form, id: Date.now(), isDefault: false }]);
    }
    setShowForm(false); setEditId(null);
  }

  function remove(id) {
    setAddresses(a => a.filter(x => x.id !== id));
    setDeleted(id);
    setTimeout(() => setDeleted(null), 2000);
  }

  function setDefault(id) {
    setAddresses(a => a.map(x => ({ ...x, isDefault: x.id === id })));
  }

  const LABELS = ["Home", "Work", "Other"];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-extrabold text-gray-800 dark:text-white">{isAR ? "العناوين" : "Addresses"}</h1>
          <p className={`text-xs ${muted} mt-0.5`}>{addresses.length} {isAR ? "عنوان محفوظ" : "saved addresses"}</p>
        </div>
        {!showForm && (
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white text-sm font-bold transition-colors cursor-pointer">
            <FiPlus size={15} /> {isAR ? "إضافة عنوان" : "Add Address"}
          </button>
        )}
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className={`${nBg} rounded-2xl border border-[#f0a500]/30 p-5`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-extrabold text-gray-800 dark:text-white">
              {editId ? (isAR ? "تعديل العنوان" : "Edit Address") : (isAR ? "عنوان جديد" : "New Address")}
            </h2>
            <button onClick={cancel} className={`p-1.5 rounded-lg ${muted} hover:text-[#e05c5c] cursor-pointer`}><FiX size={16} /></button>
          </div>
          <form onSubmit={save} className="flex flex-col gap-3">
            {/* Label */}
            <div className="flex gap-2">
              {LABELS.map(l => (
                <button key={l} type="button" onClick={() => setForm(f => ({ ...f, label: l }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    form.label === l ? "border-[#f0a500] bg-[#f0a500]/10 text-[#f0a500]" : `border-gray-200 dark:border-white/10 ${muted} hover:border-[#f0a500]/50`
                  }`}>
                  {l}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "name",    ph: "Full Name",    phAR: "الاسم الكامل"    },
                { key: "phone",   ph: "Phone",        phAR: "رقم الهاتف"      },
                { key: "address", ph: "Street Address",phAR: "عنوان الشارع"   },
                { key: "city",    ph: "City",         phAR: "المدينة"          },
                { key: "country", ph: "Country",      phAR: "الدولة"           },
                { key: "zip",     ph: "ZIP / Postal", phAR: "الرمز البريدي"   },
              ].map(({ key, ph, phAR }) => (
                <input key={key} required value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={isAR ? phAR : ph} className={inputCls} />
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={cancel} className={`flex-1 py-2.5 rounded-xl border ${br} text-sm font-semibold ${muted} hover:border-gray-300 transition-colors cursor-pointer`}>
                {isAR ? "إلغاء" : "Cancel"}
              </button>
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#f0a500] hover:bg-[#c97000] text-white text-sm font-bold transition-colors cursor-pointer">
                <FiCheck size={14} /> {isAR ? "حفظ" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address cards */}
      {addresses.length === 0 ? (
        <div className={`${nBg} rounded-2xl border ${br} flex flex-col items-center justify-center py-16 gap-3`}>
          <FiMapPin size={36} className={muted} />
          <p className="font-semibold text-gray-700 dark:text-white/70">{isAR ? "لا توجد عناوين محفوظة" : "No saved addresses"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {addresses.map(addr => (
            <div key={addr.id} className={`${nBg} rounded-2xl border ${addr.isDefault ? "border-[#f0a500]/40" : br} p-4 flex flex-col gap-3 relative`}>
              {addr.isDefault && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#f0a500]/10 text-[#f0a500] text-[10px] font-bold border border-[#f0a500]/20">
                  {isAR ? "افتراضي" : "Default"}
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#f0a500]/10 flex items-center justify-center text-[#f0a500]">
                  <FiMapPin size={14} />
                </span>
                <span className="text-xs font-bold text-gray-700 dark:text-white/70 uppercase tracking-widest">{addr.label}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-bold text-gray-800 dark:text-white">{addr.name}</p>
                <p className={`text-xs ${muted}`}>{addr.address}</p>
                <p className={`text-xs ${muted}`}>{addr.city}, {addr.zip}</p>
                <p className={`text-xs ${muted}`}>{addr.country}</p>
                <p className={`text-xs ${muted}`}>{addr.phone}</p>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-gray-50 dark:border-white/5">
                {!addr.isDefault && (
                  <button onClick={() => setDefault(addr.id)} className={`text-xs ${muted} hover:text-[#f0a500] transition-colors cursor-pointer`}>
                    {isAR ? "تعيين كافتراضي" : "Set default"}
                  </button>
                )}
                <button onClick={() => openEdit(addr)} className={`ml-auto flex items-center gap-1 text-xs ${muted} hover:text-[#f0a500] transition-colors cursor-pointer`}>
                  <FiEdit2 size={11} /> {isAR ? "تعديل" : "Edit"}
                </button>
                <button onClick={() => remove(addr.id)} className={`flex items-center gap-1 text-xs ${muted} hover:text-[#e05c5c] transition-colors cursor-pointer`}>
                  <FiTrash2 size={11} /> {isAR ? "حذف" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
