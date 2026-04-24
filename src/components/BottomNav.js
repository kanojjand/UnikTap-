"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    id: "home",
    label: "Поиск",
    href: "/home",
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={active ? "#3B6DF0" : "#94A3B8"} strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "favorites",
    label: "Избранное",
    href: "/favorites",
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={active ? "#3B6DF0" : "#94A3B8"} strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Профиль",
    href: "/profile",
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={active ? "#3B6DF0" : "#94A3B8"} strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-lg border-t border-gray-200 flex justify-around py-2 pb-3 z-50">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className="flex flex-col items-center gap-0.5 px-4 py-1 no-underline"
          >
            {tab.icon(active)}
            <span className={`text-[11px] ${active ? "text-[#3B6DF0] font-semibold" : "text-[#94A3B8]"}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
