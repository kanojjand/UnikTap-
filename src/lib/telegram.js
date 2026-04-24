// Хелпер для работы с Telegram Web App SDK
// https://core.telegram.org/bots/webapps

export function getTelegramUser() {
  if (typeof window === "undefined") return null;

  const tg = window.Telegram?.WebApp;
  if (!tg || !tg.initDataUnsafe?.user) {
    // Если не в Telegram — возвращаем заглушку для тестирования
    return {
      id: "test_user",
      first_name: "Абитуриент",
      last_name: "",
      username: "test_user",
      phone_number: null,
    };
  }

  return tg.initDataUnsafe.user;
}

export function getTelegramTheme() {
  if (typeof window === "undefined") return {};
  const tg = window.Telegram?.WebApp;
  return tg?.themeParams || {};
}

export function closeTelegramApp() {
  if (typeof window === "undefined") return;
  window.Telegram?.WebApp?.close();
}

export function expandTelegramApp() {
  if (typeof window === "undefined") return;
  window.Telegram?.WebApp?.expand();
}

export function isTelegramWebApp() {
  if (typeof window === "undefined") return false;
  return !!window.Telegram?.WebApp?.initData;
}

export function requestPhone() {
  if (typeof window === "undefined") return;
  window.Telegram?.WebApp?.requestContact?.((success, data) => {
    if (success) return data;
  });
}
