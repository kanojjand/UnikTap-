"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── Theme ─── */
const c = {
  bg: "#F1F5F9", sidebar: "#0F172A", sidebarActive: "#3B6DF0",
  card: "#FFFFFF", primary: "#3B6DF0", primaryLight: "#EBF0FE",
  text: "#0F172A", textSec: "#475569", textMuted: "#94A3B8",
  border: "#E2E8F0", borderLight: "#F1F5F9",
  green: "#10B981", greenBg: "#D1FAE5", red: "#EF4444", redBg: "#FEE2E2",
  amber: "#F59E0B", amberBg: "#FEF3C7", purple: "#8B5CF6", purpleBg: "#EDE9FE",
};

/* ─── Icons ─── */
const Icon = {
  dashboard: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  university: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M4 22V8l8-5 8 5v14"/><path d="M9 22V12h6v10M2 22h20"/></svg>,
  specs: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M4 12h16M4 18h10"/></svg>,
  settings: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.2.65.77 1.1 1.45 1.13H21a2 2 0 0 1 0 4h-.09c-.68.03-1.25.48-1.45 1.13z"/></svg>,
  plus: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>,
  edit: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg>,
  close: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/></svg>,
  eye: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  click: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M15 15l-2 5L9 9l11 4-5 2z" strokeLinejoin="round"/><path d="M22 22l-5-5"/></svg>,
  users: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  search: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/></svg>,
  menu: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/></svg>,
  save: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>,
  refresh: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
};

/* ─── Helpers ─── */
function StatCard({ icon, label, value, change, color, bgColor }) {
  return (
    <div style={{ background: c.card, borderRadius: 16, padding: 20, border: `1px solid ${c.border}`, flex: "1 1 200px", minWidth: 160 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: bgColor, display: "flex", alignItems: "center", justifyContent: "center", color }}>{icon}</div>
        {change != null && <span style={{ fontSize: 12, color: c.green, fontWeight: 600 }}>+{change}%</span>}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: c.text }}>{typeof value === "number" ? value.toLocaleString() : value}</div>
      <div style={{ fontSize: 13, color: c.textMuted, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function MiniChart({ data, color }) {
  if (!data || data.length === 0) return <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", color: c.textMuted, fontSize: 13 }}>Нет данных</div>;
  const max = Math.max(...data.map((d) => d.views || 0), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 4 }}>
          <div style={{ width: "100%", background: color, borderRadius: 4, height: Math.max(6, ((d.views || 0) / max) * 64), opacity: 0.8 }} />
          <span style={{ fontSize: 10, color: c.textMuted }}>{d.label || ""}</span>
        </div>
      ))}
    </div>
  );
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }} onClick={onClose}>
      <div style={{ background: c.card, borderRadius: 20, width: "100%", maxWidth: wide ? 700 : 520, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 48px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid ${c.border}` }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: c.text }}>{title}</span>
          <button onClick={onClose} style={st.iconBtn}>{Icon.close}</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: c.textSec, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={st.input} />;
}

function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, color: c.text }}>
      <div onClick={() => onChange(!checked)} style={{ width: 44, height: 24, borderRadius: 12, background: checked ? c.primary : c.border, position: "relative", transition: "background 0.2s", cursor: "pointer" }}>
        <div style={{ width: 18, height: 18, borderRadius: 9, background: "#fff", position: "absolute", top: 3, left: checked ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
      </div>
      {label}
    </label>
  );
}

/* ═══════════════ MAIN ADMIN ═══════════════ */
export default function AdminPage() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [loading, setLoading] = useState(true);

  // Data from API
  const [universities, setUniversities] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // Modals
  const [editUni, setEditUni] = useState(null);
  const [editSpec, setEditSpec] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);

  // ─── Load data ───
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [uniRes, analyticsRes] = await Promise.all([
        fetch("/api/universities").then((r) => r.json()),
        fetch("/api/analytics?period=week").then((r) => r.json()),
      ]);
      setUniversities(uniRes);
      setAnalytics(analyticsRes);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ─── University CRUD ───
  async function saveUni(form) {
    setSaving(true);
    try {
      if (form.id) {
        await fetch(`/api/universities/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/universities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setEditUni(null);
      await loadData();
    } catch (err) {
      alert("Ошибка сохранения: " + err.message);
    }
    setSaving(false);
  }

  async function deleteUni(id) {
    try {
      await fetch(`/api/universities/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      await loadData();
    } catch (err) {
      alert("Ошибка удаления: " + err.message);
    }
  }

  // ─── Specialty CRUD ───
  async function saveSpecialty(data) {
    setSaving(true);
    try {
      if (data.spec.id) {
        await fetch(`/api/specialties/${data.spec.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data.spec),
        });
      } else {
        await fetch("/api/specialties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data.spec,
            directionId: data.dirId,
            directionName: data.dirName,
            directionIcon: data.dirIcon,
            universityId: data.uniId,
          }),
        });
      }
      setEditSpec(null);
      await loadData();
    } catch (err) {
      alert("Ошибка: " + err.message);
    }
    setSaving(false);
  }

  async function deleteSpecialty(specId) {
    try {
      await fetch(`/api/specialties/${specId}`, { method: "DELETE" });
      await loadData();
    } catch (err) {
      alert("Ошибка удаления: " + err.message);
    }
  }

  // ─── Computed ───
  const totalSpecs = universities.reduce((s, u) => s + (u.directions || []).reduce((ss, d) => ss + (d.specialties || []).length, 0), 0);

  const weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const chartData = (analytics?.dailyViews || []).map((d) => ({
    views: d.views,
    clicks: d.clicks,
    label: weekDays[new Date(d.date).getDay()],
  }));

  const nav = [
    { id: "dashboard", label: "Дашборд", icon: Icon.dashboard },
    { id: "universities", label: "Университеты", icon: Icon.university },
    { id: "specialties", label: "Специальности", icon: Icon.specs },
    { id: "settings", label: "Настройки", icon: Icon.settings },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: c.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {sidebarOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 199 }} onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div style={{ width: 240, background: c.sidebar, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: sidebarOpen ? 0 : -240, bottom: 0, zIndex: 200, transition: "left 0.25s ease" }}>
        <div style={{ padding: "24px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize: 24 }}>🎓</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>UniKtap</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Панель управления</div>
          </div>
        </div>
        <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
          {nav.map((n) => (
            <button key={n.id} onClick={() => { setPage(n.id); setSidebarOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: "none", background: page === n.id ? c.sidebarActive : "transparent", color: page === n.id ? "#fff" : "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", textAlign: "left", width: "100%" }}>
              {n.icon}<span>{n.label}</span>
            </button>
          ))}
        </div>
        <div style={{ marginTop: "auto", padding: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: c.sidebarActive, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 600 }}>A</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Admin</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Администратор</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1 }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", background: c.card, borderBottom: `1px solid ${c.border}`, position: "sticky", top: 0, zIndex: 50 }}>
          <button style={st.iconBtn} onClick={() => setSidebarOpen(true)}>{Icon.menu}</button>
          <div style={{ flex: 1 }} />
          <button style={{ ...st.iconBtn, color: c.textMuted }} onClick={loadData} title="Обновить">{Icon.refresh}</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: c.borderLight, borderRadius: 10, padding: "8px 14px", maxWidth: 280 }}>
            <span style={{ color: c.textMuted }}>{Icon.search}</span>
            <input placeholder="Поиск..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)} style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: c.text, flex: 1, fontFamily: "inherit" }} />
          </div>
        </div>

        <div style={{ padding: "20px 24px 40px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 60, color: c.textMuted }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
              <div>Загрузка данных...</div>
            </div>
          ) : (
            <>
              {/* ═══ DASHBOARD ═══ */}
              {page === "dashboard" && (
                <>
                  <div style={{ fontSize: 24, fontWeight: 700, color: c.text, marginBottom: 4 }}>Дашборд</div>
                  <div style={{ fontSize: 14, color: c.textMuted, marginBottom: 24 }}>Аналитика за неделю</div>

                  <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                    <StatCard icon={Icon.eye} label="Просмотров" value={analytics?.totalViews || 0} change={12} color={c.primary} bgColor={c.primaryLight} />
                    <StatCard icon={Icon.click} label="Кликов" value={analytics?.totalClicks || 0} change={8} color={c.green} bgColor={c.greenBg} />
                    <StatCard icon={Icon.university} label="Университетов" value={analytics?.totalUniversities || 0} color={c.purple} bgColor={c.purpleBg} />
                    <StatCard icon={Icon.specs} label="Специальностей" value={analytics?.totalSpecialties || 0} color={c.amber} bgColor={c.amberBg} />
                  </div>

                  <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                    <div style={{ ...st.chartCard, flex: 2, minWidth: 280 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 16 }}>Просмотры за неделю</div>
                      <MiniChart data={chartData} color={c.primary} />
                    </div>
                    <div style={{ ...st.chartCard, flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 16 }}>Клики по типу</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                          { label: "Instagram", key: "click_instagram", color: "#E1306C" },
                          { label: "Сайт", key: "click_website", color: c.primary },
                          { label: "WhatsApp", key: "click_whatsapp", color: "#25D366" },
                          { label: "Телефон", key: "click_phone", color: c.amber },
                        ].map((item) => {
                          const val = analytics?.clickTypes?.[item.key] || 0;
                          const maxVal = Math.max(...Object.values(analytics?.clickTypes || { x: 1 }), 1);
                          return (
                            <div key={item.key}>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                                <span style={{ color: c.textSec }}>{item.label}</span>
                                <span style={{ fontWeight: 600, color: c.text }}>{val}</span>
                              </div>
                              <div style={{ height: 6, borderRadius: 3, background: c.borderLight }}>
                                <div style={{ height: 6, borderRadius: 3, background: item.color, width: `${(val / maxVal) * 100}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Top unis */}
                  <div style={st.chartCard}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 16 }}>Топ университетов</div>
                    {(analytics?.topUniversities || []).map((uni, i) => (
                      <div key={uni.id || i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: i % 2 === 0 ? c.borderLight : "transparent" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: c.textMuted, width: 24 }}>{i + 1}</span>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${uni.color || "#3B82F6"}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{uni.avatar || "🏛️"}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{uni.name}</div>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: c.text }}>{uni.views} <span style={{ fontSize: 11, color: c.textMuted, fontWeight: 400 }}>просм.</span></div>
                      </div>
                    ))}
                    {(!analytics?.topUniversities || analytics.topUniversities.length === 0) && (
                      <div style={{ textAlign: "center", padding: 20, color: c.textMuted, fontSize: 13 }}>Пока нет данных</div>
                    )}
                  </div>
                </>
              )}

              {/* ═══ UNIVERSITIES ═══ */}
              {page === "universities" && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 700, color: c.text }}>Университеты</div>
                      <div style={{ fontSize: 14, color: c.textMuted }}>{universities.length} университетов</div>
                    </div>
                    <button style={st.primaryBtn} onClick={() => setEditUni({ name: "", fullName: "", city: "Шымкент", color: "#3B82F6", avatar: "🏛️", hasDormitory: false, hasMilitary: false, minScore: 70, instagram: "", website: "", phone: "", whatsapp: "", addresses: [{ name: "Главный корпус", address: "" }] })}>
                      {Icon.plus} Добавить
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {universities.filter((u) => !searchQ || u.name.toLowerCase().includes(searchQ.toLowerCase())).map((uni) => (
                      <div key={uni.id} style={st.row}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${uni.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{uni.avatar}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: 15, color: c.text }}>{uni.name}</div>
                          <div style={{ fontSize: 12, color: c.textMuted, display: "flex", gap: 10, flexWrap: "wrap", marginTop: 2 }}>
                            <span>📍 {uni.city}</span>
                            <span>📁 {(uni.directions || []).reduce((s, d) => s + (d.specialties || []).length, 0)} спец.</span>
                            {uni.hasDormitory && <span>🏠 Общежитие</span>}
                            {uni.hasMilitary && <span>🎖️ Военная кафедра</span>}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                          <button style={{ ...st.iconBtn, color: c.primary }} onClick={() => setEditUni(uni)}>{Icon.edit}</button>
                          <button style={{ ...st.iconBtn, color: c.red }} onClick={() => setDeleteConfirm({ type: "uni", id: uni.id, name: uni.name })}>{Icon.trash}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ═══ SPECIALTIES ═══ */}
              {page === "specialties" && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 700, color: c.text }}>Специальности</div>
                      <div style={{ fontSize: 14, color: c.textMuted }}>{totalSpecs} специальностей</div>
                    </div>
                    <button style={st.primaryBtn} onClick={() => setEditSpec({ uniId: universities[0]?.id, dirId: null, dirName: "", dirIcon: "📁", spec: { code: "", name: "", minScore: 70, grant: false, price: 0 } })}>
                      {Icon.plus} Добавить
                    </button>
                  </div>

                  {universities.filter((u) => !searchQ || u.name.toLowerCase().includes(searchQ.toLowerCase()) || (u.directions || []).some((d) => (d.specialties || []).some((sp) => sp.name.toLowerCase().includes(searchQ.toLowerCase())))).map((uni) => (
                    <div key={uni.id} style={{ marginBottom: 24 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: 18 }}>{uni.avatar}</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: c.text }}>{uni.name}</span>
                      </div>
                      {(uni.directions || []).map((dir) => (
                        <div key={dir.id} style={{ marginBottom: 16, marginLeft: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: c.textSec, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                            <span>{dir.icon}</span> {dir.name}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {(dir.specialties || []).map((spec) => (
                              <div key={spec.id} style={st.row}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontWeight: 600, fontSize: 14, color: c.text }}>{spec.code} — {spec.name}</div>
                                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: c.textMuted, marginTop: 2, flexWrap: "wrap" }}>
                                    <span>ЕНТ ≥ {spec.minScore}</span>
                                    {spec.grant && <span style={{ color: c.green, fontWeight: 600 }}>Грант</span>}
                                    <span>{spec.price?.toLocaleString()} ₸</span>
                                  </div>
                                </div>
                                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                  <button style={{ ...st.iconBtn, color: c.primary }} onClick={() => setEditSpec({ uniId: uni.id, dirId: dir.id, dirName: dir.name, dirIcon: dir.icon, spec })}>{Icon.edit}</button>
                                  <button style={{ ...st.iconBtn, color: c.red }} onClick={() => deleteSpecialty(spec.id)}>{Icon.trash}</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}

              {/* ═══ SETTINGS ═══ */}
              {page === "settings" && (
                <>
                  <div style={{ fontSize: 24, fontWeight: 700, color: c.text, marginBottom: 24 }}>Настройки</div>

                  <div style={st.chartCard}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 16 }}>Администраторы</div>
                    {[{ name: "Admin 1", role: "Главный администратор", email: "admin@uniktap.kz" }, { name: "Admin 2", role: "Администратор", email: "admin2@uniktap.kz" }].map((admin, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < 1 ? `1px solid ${c.borderLight}` : "none" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: c.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", color: c.primary, fontWeight: 700 }}>{admin.name.charAt(0)}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{admin.name}</div>
                          <div style={{ fontSize: 12, color: c.textMuted }}>{admin.role}</div>
                        </div>
                        <span style={{ fontSize: 12, color: c.textMuted }}>{admin.email}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ ...st.chartCard, marginTop: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 16 }}>Общие настройки</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <Toggle checked={true} onChange={() => {}} label="Telegram Web App режим" />
                      <Toggle checked={true} onChange={() => {}} label="Показывать стоимость обучения" />
                      <Toggle checked={false} onChange={() => {}} label="Режим обслуживания" />
                    </div>
                  </div>

                  <div style={{ ...st.chartCard, marginTop: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 12 }}>Платформа</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: c.textSec }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>Версия</span><span style={{ fontWeight: 600 }}>1.0.0</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>Университетов</span><span style={{ fontWeight: 600 }}>{universities.length}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>Специальностей</span><span style={{ fontWeight: 600 }}>{totalSpecs}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><span>Пользователей</span><span style={{ fontWeight: 600 }}>{analytics?.totalUsers || 0}</span></div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* ─── Edit University Modal ─── */}
      {editUni && <UniModal uni={editUni} onSave={saveUni} onClose={() => setEditUni(null)} saving={saving} />}

      {/* ─── Edit Specialty Modal ─── */}
      {editSpec && <SpecModal data={editSpec} universities={universities} onSave={saveSpecialty} onClose={() => setEditSpec(null)} saving={saving} />}

      {/* ─── Delete confirm ─── */}
      {deleteConfirm && (
        <Modal title="Подтвердите удаление" onClose={() => setDeleteConfirm(null)}>
          <p style={{ fontSize: 14, color: c.textSec, marginBottom: 20, lineHeight: 1.6 }}>
            Вы уверены, что хотите удалить <strong>{deleteConfirm.name}</strong>? Все связанные данные (направления, специальности, аналитика) тоже будут удалены.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button style={st.secondaryBtn} onClick={() => setDeleteConfirm(null)}>Отмена</button>
            <button style={{ ...st.primaryBtn, background: c.red }} onClick={() => deleteUni(deleteConfirm.id)}>Удалить</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ═══ University Edit Modal ═══ */
function UniModal({ uni, onSave, onClose, saving }) {
  const [form, setForm] = useState({ ...uni, addresses: uni.addresses || [{ name: "Главный корпус", address: "" }] });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Modal title={uni.id ? "Редактировать университет" : "Добавить университет"} onClose={onClose} wide>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
        <Field label="Краткое название"><Input value={form.name} onChange={(v) => set("name", v)} placeholder="ЮКУ им. Ауэзова" /></Field>
        <Field label="Полное название"><Input value={form.fullName} onChange={(v) => set("fullName", v)} placeholder="Южно-Казахстанский..." /></Field>
        <Field label="Город"><Input value={form.city} onChange={(v) => set("city", v)} placeholder="Шымкент" /></Field>
        <Field label="Цвет бренда">
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="color" value={form.color || "#3B82F6"} onChange={(e) => set("color", e.target.value)} style={{ width: 40, height: 36, borderRadius: 8, border: `1px solid ${c.border}`, cursor: "pointer" }} />
            <Input value={form.color} onChange={(v) => set("color", v)} />
          </div>
        </Field>
        <Field label="Эмодзи"><Input value={form.avatar} onChange={(v) => set("avatar", v)} placeholder="🏛️" /></Field>
        <Field label="Мин. балл ЕНТ"><Input type="number" value={form.minScore} onChange={(v) => set("minScore", parseInt(v) || 0)} /></Field>
        <Field label="Instagram"><Input value={form.instagram || ""} onChange={(v) => set("instagram", v)} placeholder="@username" /></Field>
        <Field label="Веб-сайт"><Input value={form.website || ""} onChange={(v) => set("website", v)} placeholder="https://..." /></Field>
        <Field label="Телефон"><Input value={form.phone || ""} onChange={(v) => set("phone", v)} placeholder="+7..." /></Field>
        <Field label="WhatsApp"><Input value={form.whatsapp || ""} onChange={(v) => set("whatsapp", v)} placeholder="+7..." /></Field>
      </div>
      <div style={{ display: "flex", gap: 20, margin: "8px 0 16px" }}>
        <Toggle checked={form.hasDormitory} onChange={(v) => set("hasDormitory", v)} label="Общежитие" />
        <Toggle checked={form.hasMilitary} onChange={(v) => set("hasMilitary", v)} label="Военная кафедра" />
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 8 }}>Адреса / Корпуса</div>
      {form.addresses.map((addr, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
          <input style={{ ...st.input, flex: 1 }} value={addr.name} onChange={(e) => { const a = [...form.addresses]; a[i] = { ...a[i], name: e.target.value }; set("addresses", a); }} placeholder="Название" />
          <input style={{ ...st.input, flex: 2 }} value={addr.address} onChange={(e) => { const a = [...form.addresses]; a[i] = { ...a[i], address: e.target.value }; set("addresses", a); }} placeholder="Адрес" />
          <button style={{ ...st.iconBtn, color: c.red }} onClick={() => set("addresses", form.addresses.filter((_, idx) => idx !== i))}>{Icon.trash}</button>
        </div>
      ))}
      <button style={{ ...st.secondaryBtn, fontSize: 12, padding: "6px 12px", marginBottom: 20 }} onClick={() => set("addresses", [...form.addresses, { name: "", address: "" }])}>{Icon.plus} Добавить адрес</button>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
        <button style={st.secondaryBtn} onClick={onClose}>Отмена</button>
        <button style={st.primaryBtn} onClick={() => onSave(form)} disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </Modal>
  );
}

/* ═══ Specialty Edit Modal ═══ */
function SpecModal({ data, universities, onSave, onClose, saving }) {
  const [uniId, setUniId] = useState(data.uniId);
  const [dirId, setDirId] = useState(data.dirId);
  const [dirName, setDirName] = useState(data.dirName || "");
  const [dirIcon, setDirIcon] = useState(data.dirIcon || "📁");
  const [spec, setSpec] = useState({ ...data.spec });
  const [newDir, setNewDir] = useState(!data.dirId);
  const selectedUni = universities.find((u) => u.id === uniId);

  return (
    <Modal title={data.spec?.id ? "Редактировать специальность" : "Добавить специальность"} onClose={onClose}>
      <Field label="Университет">
        <select style={st.input} value={uniId || ""} onChange={(e) => { setUniId(parseInt(e.target.value)); setDirId(null); }}>
          {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </Field>
      <Field label="Направление">
        {!newDir && selectedUni?.directions?.length > 0 ? (
          <div style={{ display: "flex", gap: 8 }}>
            <select style={{ ...st.input, flex: 1 }} value={dirId || ""} onChange={(e) => setDirId(parseInt(e.target.value))}>
              <option value="">Выберите</option>
              {selectedUni.directions.map((d) => <option key={d.id} value={d.id}>{d.icon} {d.name}</option>)}
            </select>
            <button style={{ ...st.secondaryBtn, whiteSpace: "nowrap", fontSize: 12 }} onClick={() => setNewDir(true)}>+ Новое</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <input style={{ ...st.input, width: 50 }} value={dirIcon} onChange={(e) => setDirIcon(e.target.value)} placeholder="📁" />
            <input style={{ ...st.input, flex: 1 }} value={dirName} onChange={(e) => setDirName(e.target.value)} placeholder="Название направления" />
            {selectedUni?.directions?.length > 0 && <button style={{ ...st.secondaryBtn, fontSize: 12 }} onClick={() => setNewDir(false)}>Выбрать</button>}
          </div>
        )}
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <Field label="Код"><Input value={spec.code || ""} onChange={(v) => setSpec((s) => ({ ...s, code: v }))} placeholder="6B06101" /></Field>
        <Field label="Название"><Input value={spec.name || ""} onChange={(v) => setSpec((s) => ({ ...s, name: v }))} placeholder="Информатика" /></Field>
        <Field label="Мин. балл ЕНТ"><Input type="number" value={spec.minScore || ""} onChange={(v) => setSpec((s) => ({ ...s, minScore: parseInt(v) || 0 }))} /></Field>
        <Field label="Стоимость ₸/год"><Input type="number" value={spec.price || ""} onChange={(v) => setSpec((s) => ({ ...s, price: parseInt(v) || 0 }))} /></Field>
      </div>
      <div style={{ margin: "4px 0 20px" }}>
        <Toggle checked={spec.grant || false} onChange={(v) => setSpec((s) => ({ ...s, grant: v }))} label="Доступен грант" />
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
        <button style={st.secondaryBtn} onClick={onClose}>Отмена</button>
        <button style={st.primaryBtn} onClick={() => onSave({ uniId, dirId: newDir ? null : dirId, dirName, dirIcon, spec })} disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </Modal>
  );
}

/* ─── Styles ─── */
const st = {
  iconBtn: { width: 36, height: 36, borderRadius: 10, border: `1px solid ${c.border}`, background: c.card, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: c.textSec },
  primaryBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, border: "none", background: c.primary, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  secondaryBtn: { display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.card, color: c.text, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  chartCard: { background: c.card, borderRadius: 16, padding: 20, border: `1px solid ${c.border}` },
  row: { display: "flex", alignItems: "center", gap: 14, padding: 16, background: c.card, borderRadius: 14, border: `1px solid ${c.border}` },
  input: { width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${c.border}`, fontSize: 14, color: c.text, fontFamily: "inherit", outline: "none", background: c.bg, boxSizing: "border-box" },
};
