"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import { useTelegram } from "../useTelegram";

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading: tgLoading } = useTelegram();
  const [favUniversities, setFavUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch favorite university IDs, then fetch full university data
  useEffect(() => {
    async function loadFavorites() {
      if (!user?.userId) {
        setLoading(false);
        return;
      }

      try {
        // Get favorite university IDs
        const favRes = await fetch(`/api/favorites?userId=${user.userId}`);
        if (!favRes.ok) throw new Error('Failed to fetch favorites');
        const favIds = await favRes.json();

        if (favIds.length === 0) {
          setFavUniversities([]);
          setLoading(false);
          return;
        }

        // Fetch all universities and filter by favorites
        const uniRes = await fetch('/api/universities');
        if (!uniRes.ok) throw new Error('Failed to fetch universities');
        const allUniversities = await uniRes.json();

        const favorites = allUniversities.filter(u => favIds.includes(u.id));
        setFavUniversities(favorites);
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [user?.userId]);

  const filteredUnis = favUniversities.filter((u) =>
    !search || u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F8FAFC] pb-20">
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-[22px]">🎓</span>
          <span className="text-lg font-bold text-gray-900">UniKtap</span>
        </div>
        <h1 className="text-base font-bold text-gray-900 mt-2 mb-3">Избранное</h1>

        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 mb-4">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#94A3B8" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            className="flex-1 border-none outline-none bg-transparent text-sm text-gray-900"
            placeholder="Поиск в избранном..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4">
        {loading || tgLoading ? (
          <div className="text-center py-10 text-gray-400">⏳ Загрузка...</div>
        ) : !user ? (
          <div className="text-center py-10 text-gray-400">
            <div className="text-4xl mb-3">🔒</div>
            <div className="text-[15px] font-semibold text-gray-500">Требуется авторизация</div>
            <div className="text-[13px] mt-1">Откройте приложение через Telegram</div>
          </div>
        ) : filteredUnis.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <div className="text-4xl mb-3">💙</div>
            <div className="text-[15px] font-semibold text-gray-500">Пока пусто</div>
            <div className="text-[13px] mt-1">Нажми ♡ на университете, чтобы сохранить</div>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
              Университеты ({filteredUnis.length})
            </p>
            <div className="flex flex-col gap-2 mb-5">
              {filteredUnis.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => router.push(`/university/${uni.id}`)}
                  className="bg-white rounded-2xl p-4 border border-gray-200 cursor-pointer hover:shadow-sm transition"
                >
                  <div className="flex gap-3 items-center">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: `${uni.color}18` }}
                    >
                      {uni.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 truncate">{uni.name}</div>
                      <div className="text-xs text-gray-500">от {uni.minScore} баллов</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <ScrollToTop />
      <BottomNav />
    </div>
  );
}
