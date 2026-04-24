/** @type {import('next').NextConfig} */
const nextConfig = {
  // Для Telegram Web App — разрешаем iframe
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
