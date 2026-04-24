"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import UniversityCard from "@/components/UniversityCard";
import ScrollToTop from "@/components/ScrollToTop";
import { useTelegram } from "../useTelegram";

const CITIES = ["Все города", "Шымкент", "Алматы", "Астана"];
const DIRECTIONS = ["Все направления", "IT", "Медицина", "Юриспруденция", "Экономика", "Педагогика"];

export default function HomePage() {
  const router = useRouter();
  const { user, favorites, toggleFavorite, isFavorite, loading: tgLoading } = useTelegram();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [city, setCity] = useState("Все города");
  const [direction, setDirection] = useState("Все направления");
  const [score, setScore] = useState("");

  // Загружаем университеты с API
  useEffect(() => {
    fetchUniversities();
  }, []);

  async function fetchUniversities() {
    try {
      setLoading(true);
      const res = await fetch("/api/universities");
      const data = await res.json();
      setUniversities(data);
    } catch (err) {
      console.error("Failed to fetch universities:", err);
    } finally {
      setLoading(false);
    }
  }

  // Фильтрация на клиенте
  const filtered = universities.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.fullName.toLowerCase().includes(search.toLowerCase())) return false;
    if (city !== "Все города" && u.city !== city) return false;
    if (direction !== "Все направления") {
      const has = u.directions?.some((d) => d.name.toLowerCase().includes(direction.toLowerCase()));
      if (!has) return false;
    }
    if (score && u.minScore > parseInt(score)) return false;
    return true;
  });

  function handleToggleFavorite(id) {
    toggleFavorite(id);
  }

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-[22px]">🎓</span>
          <span className="text-lg font-bold text-gray-900">UniKtap</span>
        </div>
        <p className="text-[13px] text-gray-500 mb-3">Найди свой университет в Шымкенте</p>
      </div>

      {/* Search + Filter */}
      <div className="px-4">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#94A3B8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              className="flex-1 border-none outline-none bg-transparent text-sm text-gray-900"
              placeholder="Университет, специальность..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center cursor-pointer text-gray-500"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-[14px] p-3.5 mb-3 flex flex-col gap-2.5">
            <select
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-[#F8FAFC] text-sm outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-[#F8FAFC] text-sm outline-none"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              {DIRECTIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-500 whitespace-nowrap">Мин. балл ЕНТ:</span>
              <input
                type="number"
                className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 bg-[#F8FAFC] text-sm outline-none"
                placeholder="напр. 70"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
          </div>
        )}

        <p className="text-[13px] text-gray-500 mb-3">
          Все университеты ({filtered.length})
        </p>
      </div>

      {/* University list */}
      <div className="px-4 flex flex-col gap-2.5">
        {loading ? (
          <div className="text-center py-10 text-gray-400">
            <div className="text-3xl mb-2">⏳</div>
            Загрузка...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <div className="text-3xl mb-2">🔍</div>
            Ничего не найдено
          </div>
        ) : (
          filtered.map((uni) => (
            <UniversityCard
              key={uni.id}
              uni={uni}
              isFavorite={isFavorite(uni.id)}
              onToggleFavorite={() => handleToggleFavorite(uni.id)}
              onClick={() => router.push(`/university/${uni.id}`)}
            />
          ))
        )}
      </div>

      <ScrollToTop />
      <BottomNav />
    </div>
  );
}
