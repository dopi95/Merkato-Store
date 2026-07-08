"use client";
import { useAuth } from "../../context/AuthContext";
import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp } from "react-icons/fi";

const stats = [
  { icon: FiUsers,       label: "Total Users",   value: "—", color: "text-[#f0a500]",  bg: "bg-[#f0a500]/10"  },
  { icon: FiShoppingBag, label: "Total Orders",  value: "—", color: "text-[#3b82f6]",  bg: "bg-[#3b82f6]/10"  },
  { icon: FiDollarSign,  label: "Revenue",       value: "—", color: "text-[#22c55e]",  bg: "bg-[#22c55e]/10"  },
  { icon: FiTrendingUp,  label: "Growth",        value: "—", color: "text-[#a855f7]",  bg: "bg-[#a855f7]/10"  },
];

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Welcome back, {user?.name} 👋</h1>
        <p className="text-sm text-white/40 mt-1">Here's what's happening in your store.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="bg-[#13112a] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-xs text-white/40 font-semibold uppercase tracking-widest">{label}</p>
              <p className="text-xl font-extrabold text-white mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#13112a] border border-white/5 rounded-2xl p-6">
        <p className="text-sm text-white/40 text-center">Admin panel is ready. Build your features here.</p>
      </div>
    </div>
  );
}
