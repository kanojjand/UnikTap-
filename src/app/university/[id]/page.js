"use client";

import { useTelegram } from "@/app/useTelegram";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function UniversityPage() {
  const { user, isFavorite, toggleFavorite } = useTelegram();
  const router = useRouter();
  const params = useParams();
  const [uni, setUni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/universities/${params.id}`)
      .then((r) => r.json())
      .then((data) => setUni(data))
      .catch(console.error)
      .finally(() => setLoading(false));

    // Трекаем просмотр
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "view", universityId: parseInt(params.id) }),
    }).catch(() => {});
  }, [params.id]);

  function trackClick(type) {
    fetch("/api/analytics/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, universityId: uni.id }),
    }).catch(() => {});
  }

  if (loading) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="text-3xl mb-2">⏳</div>
          Загрузка...
        </div>
      </div>
    );
  }

  if (!uni) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="text-3xl mb-2">😕</div>
          Университет не найден
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div
        className="px-4 pt-5 pb-8 relative"
        style={{ background: `linear-gradient(135deg, ${uni.color}, ${uni.color}dd)` }}
      >
        <button
          onClick={() => router.back()}
          
          className="w-9 h-9 rounded-[10px] bg-white/15 flex items-center justify-center border-none cursor-pointer"
          {/* Кнопка избранного */}
          <button
            onClick={() => user && toggleFavorite(uni?.id)}
            className="absolute top-5 right-4 w-9 h-9 rounded-[10px] bg-white/15 flex items-center justify-center border-none cursor-pointer text-xl"
          >
            {user && uni && isFavorite(uni.id) ? "⭐" : "☆"}
          </button>
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex flex-col items-center pt-7">
          <div className="w-[72px] h-[72px] rounded-[20px] bg-white/20 flex items-center justify-center text-4xl mb-3">
            {uni.avatar}
          </div>
          <h1 className="text-xl font-bold text-white text-center">{uni.name}</h1>
          <p className="text-[13px] text-white/80 mt-1">г. {uni.city}</p>
        </div>
      </div>

      <div className="px-4 py-5 pb-24">
        {/* Badges */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {uni.hasDormitory && (
            <span className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium">
              🏠 Общежитие
            </span>
          )}
          {uni.hasMilitary && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-medium">
              🎖️ Военная кафедра
            </span>
          )}
          <span className="text-xs bg-blue-50 text-[#3B6DF0] px-2.5 py-1 rounded-full font-medium">
            📊 от {uni.minScore} баллов
          </span>
        </div>

        {/* Contacts */}
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
          Контакты и ссылки
        </p>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          {uni.instagram && (
            <ContactRow
              icon="instagram"
              label="Instagram"
              value={uni.instagram}
              onClick={() => {
                trackClick("click_instagram");
                window.open(`https://instagram.com/${uni.instagram.replace("@", "")}`, "_blank");
              }}
            />
          )}
          {uni.website && (
            <ContactRow
              icon="globe"
              label="Веб-сайт"
              value={uni.website.replace("https://", "")}
              onClick={() => {
                trackClick("click_website");
                window.open(uni.website, "_blank");
              }}
            />
          )}
          {uni.addresses?.map((addr, i) => (
            <ContactRow
              key={i}
              icon="map"
              label={addr.name}
              value={addr.address}
              onClick={() => trackClick("click_2gis")}
            />
          ))}
          {uni.phone && (
            <ContactRow
              icon="phone"
              label="Приёмная комиссия"
              value={uni.phone}
              onClick={() => {
                trackClick("click_phone");
                window.open(`tel:${uni.phone}`, "_blank");
              }}
            />
          )}
          {uni.whatsapp && (
            <ContactRow
              icon="whatsapp"
              label="WhatsApp"
              value={uni.whatsapp}
              onClick={() => {
                trackClick("click_whatsapp");
                window.open(`https://wa.me/${uni.whatsapp.replace(/[^0-9]/g, "")}`, "_blank");
              }}
              last
            />
          )}
        </div>

        {/* Directions */}
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
          Направления
        </p>
        <div className="flex flex-col gap-2.5">
          {uni.directions?.map((dir) => (
            <button
              key={dir.id}
              onClick={() => router.push(`/university/${uni.id}/direction/${dir.id}`)}
              className="flex items-center gap-3 bg-white rounded-[14px] p-3.5 border border-gray-200 cursor-pointer w-full text-left hover:shadow-sm transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[22px]">
                {dir.icon}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[15px] text-gray-900">{dir.name}</div>
                <div className="text-[13px] text-gray-500">
                  {dir.specialties?.length || 0} специальностей
                </div>
              </div>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94A3B8" strokeWidth="2">
                <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">© 2026 {uni.name}</p>
      </div>

      <BottomNav />
    </div>
  );
}

function ContactRow({ icon, label, value, onClick, last }) {
  const icons = {
    instagram: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>,
    globe: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    map: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    phone: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    whatsapp: <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${last ? "" : "border-b border-gray-100"}`}
    >
      <span className="text-gray-400">{icons[icon]}</span>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="text-[13px] text-gray-500 break-all">{value}</div>
      </div>
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94A3B8" strokeWidth="2">
        <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
