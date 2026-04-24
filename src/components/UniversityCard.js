"use client";

export default function UniversityCard({ uni, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${uni.color}18` }}
        >
          {uni.avatar}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[15px] text-gray-900 mb-0.5">{uni.name}</div>
          <div className="text-xs text-gray-500 mb-1.5 truncate">{uni.fullName}</div>
          <div className="flex gap-2 text-xs text-gray-500 flex-wrap">
            <span>{uni.specCount || uni.directions?.reduce((s, d) => s + d.specialties?.length, 0) || 0} спец.</span>
            <span>{uni.directionCount || uni.directions?.length || 0} направл.</span>
            <span>от {uni.minScore} баллов</span>
          </div>
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            {uni.hasDormitory && (
              <span className="text-[11px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                🏠 Общежитие
              </span>
            )}
            {uni.hasMilitary && (
              <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                🎖️ Военная кафедра
              </span>
            )}
          </div>
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
          className="p-1 flex-shrink-0 self-start"
        >
          {isFavorite ? (
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
  );
}
