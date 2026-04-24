"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function DirectionPage() {
  const router = useRouter();
  const params = useParams();
  const [uni, setUni] = useState(null);
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favSpecs, setFavSpecs] = useState([]);

  useEffect(() => {
    fetch(`/api/universities/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setUni(data);
        const dir = data.directions?.find((d) => d.id === parseInt(params.dirId));
        setDirection(dir);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id, params.dirId]);

  function toggleFavSpec(specId) {
    setFavSpecs((prev) =>
      prev.includes(specId) ? prev.filter((x) => x !== specId) : [...prev, specId]
    );
    fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, specialtyId: specId }),
    }).catch(() => {});
  }

  if (loading) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-gray-400">⏳ Загрузка...</div>
      </div>
    );
  }

  if (!direction) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-gray-400">Направление не найдено</div>
      </div>
    );
  }

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#F8FAFC]/90 backdrop-blur-xl flex items-center justify-between px-4 py-3 z-50 border-b border-gray-200">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-[10px] bg-gray-100 flex items-center justify-center border-none cursor-pointer"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1E293B" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-[15px] font-semibold text-gray-900">{direction.name}</span>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="pt-[68px] px-4 pb-24">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">{direction.icon}</span>
          <span className="text-[13px] text-gray-500 font-medium uppercase tracking-wide">
            {direction.name}
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {direction.specialties?.map((spec) => (
            <div key={spec.id} className="bg-white rounded-[14px] p-3.5 border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900 mb-1">
                    {spec.code}-«{spec.name}»
                  </div>
                  <div className="flex items-center gap-3 text-[13px]">
                    <span className="text-gray-500">ЕНТ ≥ {spec.minScore}</span>
                    {spec.grant && <span className="text-green-600 font-semibold">Грант</span>}
                  </div>
                  {spec.price && (
                    <div className="text-[13px] text-gray-500 mt-1">
                      {spec.price.toLocaleString()} ₸/год
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggleFavSpec(spec.id)}
                  className="p-1 flex-shrink-0"
                >
                  {favSpecs.includes(spec.id) ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" strokeWidth="1.8">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#94A3B8" strokeWidth="1.8">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
