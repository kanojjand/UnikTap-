const BASE = process.env.NEXT_PUBLIC_APP_URL || "";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error ${res.status}`);
  }
  return res.json();
}

// ─── Universities ───
export const getUniversities = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/api/universities${qs ? `?${qs}` : ""}`);
};

export const getUniversity = (id) => apiFetch(`/api/universities/${id}`);

export const createUniversity = (data) =>
  apiFetch("/api/universities", { method: "POST", body: JSON.stringify(data) });

export const updateUniversity = (id, data) =>
  apiFetch(`/api/universities/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteUniversity = (id) =>
  apiFetch(`/api/universities/${id}`, { method: "DELETE" });

// ─── Directions ───
export const createDirection = (data) =>
  apiFetch("/api/directions", { method: "POST", body: JSON.stringify(data) });

export const updateDirection = (id, data) =>
  apiFetch(`/api/directions/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteDirection = (id) =>
  apiFetch(`/api/directions/${id}`, { method: "DELETE" });

// ─── Specialties ───
export const getSpecialties = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/api/specialties${qs ? `?${qs}` : ""}`);
};

export const createSpecialty = (data) =>
  apiFetch("/api/specialties", { method: "POST", body: JSON.stringify(data) });

export const updateSpecialty = (id, data) =>
  apiFetch(`/api/specialties/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteSpecialty = (id) =>
  apiFetch(`/api/specialties/${id}`, { method: "DELETE" });

// ─── Favorites ───
export const getFavorites = (userId) => apiFetch(`/api/favorites?userId=${userId}`);

export const toggleFavorite = (data) =>
  apiFetch("/api/favorites", { method: "POST", body: JSON.stringify(data) });

// ─── Analytics ───
export const getAnalytics = (period = "week") => apiFetch(`/api/analytics?period=${period}`);

export const trackView = (universityId, userId) =>
  apiFetch("/api/analytics", { method: "POST", body: JSON.stringify({ type: "view", universityId, userId }) });

export const trackClick = (type, universityId, userId) =>
  apiFetch("/api/analytics/click", { method: "POST", body: JSON.stringify({ type, universityId, userId }) });

// ─── Auth ───
export const adminLogin = (email, password) =>
  apiFetch("/api/auth", { method: "POST", body: JSON.stringify({ email, password }) });
