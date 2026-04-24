import "./globals.css";

export const metadata = {
  title: "UniKtap — Найди свой университет",
  description: "Агрегатор университетов Шымкента. Сравни специальности, баллы ЕНТ и стоимость обучения.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <script src="https://telegram.org/js/telegram-web-app.js" defer></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
