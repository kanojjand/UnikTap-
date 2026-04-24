"use client";

import { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import { getTelegramUser, isTelegramWebApp } from "@/lib/telegram";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ universities: 0, favorites: 0 });

  useEffect(() => {
    // Получаем данные пользователя из Telegram
    const tgUser = getTelegramUser();
    setUser(tgUser);

    // Загружаем статистику
    fetch("/api/universities")
      .then((r) => r.json())
      .then((data) => setStats((s) => ({ ...s, universities: data.length })))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F8FAFC] pb-20">
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-[22px]">🎓</span>
          <span className="text-lg font-bold text-gray-900">UniKtap</span>
        </div>
      </div>

      <div className="px-4">
        {/* User info */}
        <div className="flex flex-col items-center py-5">
          <div className="w-[72px] h-[72px] rounded-[20px] bg-blue-50 flex items-center justify-center text-[32px] mb-3">
            🎓
          </div>
          <h1 className="text-lg font-bold text-gray-900">
            {user?.first_name || "Абитуриент"}
          </h1>
          <p className="text-[13px] text-gray-500">г. Шымкент</p>
          {isTelegramWebApp() && (
            <span className="text-xs bg-blue-50 text-[#3B6DF0] px-2.5 py-1 rounded-full font-medium mt-2">
              Telegram Web App
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-2.5 mb-6">
          <div className="flex-1 bg-white rounded-[14px] py-4 px-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-[#3B6DF0]">{stats.favorites}</div>
            <div className="text-xs text-gray-500 mt-0.5">Избранное</div>
          </div>
          <div className="flex-1 bg-white rounded-[14px] py-4 px-3 text-center border border-gray-200">
            <div className="text-2xl font-bold text-[#3B6DF0]">{stats.universities}</div>
            <div className="text-xs text-gray-500 mt-0.5">ВУЗов</div>
          </div>
        </div>

        {/* User details */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          <InfoRow
            icon={<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
            label="Имя"
            value={user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "—"}
          />
          <InfoRow
            icon={<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
            label="Телефон"
            value={user?.phone_number || "Не указан"}
          />
          <InfoRow
            icon={<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>}
            label="Telegram"
            value={user?.username ? `@${user.username}` : user?.id || "—"}
            last
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function InfoRow({ icon, label, value, last }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${last ? "" : "border-b border-gray-100"}`}>
      <span className="text-gray-400">{icon}</span>
      <div>
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="text-[13px] text-gray-500">{value}</div>
      </div>
    </div>
  );
}
