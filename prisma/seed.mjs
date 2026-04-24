import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Админы ───
  await prisma.admin.createMany({
    data: [
      { email: "admin@uniktap.kz", password: "admin123", name: "Admin", role: "superadmin" },
      { email: "admin2@uniktap.kz", password: "admin123", name: "Admin 2", role: "admin" },
    ],
    skipDuplicates: true,
  });

  // ─── Университеты ───
  const auezov = await prisma.university.create({
    data: {
      name: "ЮКУ им. М.О. Ауэзова",
      fullName: "Южно-Казахстанский университет имени М.О. Ауэзова",
      city: "Шымкент",
      avatar: "🏛️",
      color: "#3B82F6",
      minScore: 70,
      hasDormitory: true,
      hasMilitary: true,
      instagram: "@auezov_university",
      website: "https://auezov.edu.kz",
      phone: "+7 (7252) 21-01-00",
      whatsapp: "+77252210100",
      addresses: {
        create: [
          { name: "Главный корпус", address: "пр. Тауке хана, 5" },
          { name: "Корпус №2 (Инженерный)", address: "ул. Байтурсынова, 31" },
          { name: "Корпус №3 (Медицинский)", address: "ул. Жангельдина, 12" },
        ],
      },
      directions: {
        create: [
          {
            name: "Информационные технологии",
            icon: "💻",
            specialties: {
              create: [
                { code: "6B06101", name: "Информатика", minScore: 75, grant: true, price: 650000 },
                { code: "6B06102", name: "Информационные системы", minScore: 70, grant: true, price: 620000 },
                { code: "6B06103", name: "Программная инженерия", minScore: 80, grant: true, price: 700000 },
                { code: "6B06104", name: "Кибербезопасность", minScore: 78, grant: false, price: 680000 },
              ],
            },
          },
          {
            name: "Юриспруденция",
            icon: "⚖️",
            specialties: {
              create: [
                { code: "6B04201", name: "Юриспруденция", minScore: 75, grant: true, price: 600000 },
                { code: "6B04202", name: "Международное право", minScore: 80, grant: false, price: 650000 },
                { code: "6B04203", name: "Таможенное дело", minScore: 70, grant: true, price: 580000 },
              ],
            },
          },
          {
            name: "Экономика",
            icon: "📊",
            specialties: {
              create: [
                { code: "6B04101", name: "Экономика", minScore: 70, grant: true, price: 550000 },
                { code: "6B04102", name: "Менеджмент", minScore: 65, grant: false, price: 510000 },
                { code: "6B04103", name: "Финансы", minScore: 72, grant: true, price: 580000 },
              ],
            },
          },
        ],
      },
    },
  });

  const tashenev = await prisma.university.create({
    data: {
      name: "Университет Ташенева",
      fullName: "Университет имени Ташенева",
      city: "Шымкент",
      avatar: "🎓",
      color: "#8B5CF6",
      minScore: 70,
      hasDormitory: true,
      hasMilitary: false,
      instagram: "@tashenev_uni",
      website: "https://tashenev.kz",
      phone: "+7 (7252) 39-57-57",
      whatsapp: "+77252395757",
      addresses: { create: [{ name: "Главный корпус", address: "ул. Казыбек би, 28" }] },
      directions: {
        create: [
          {
            name: "Бизнес и управление",
            icon: "💼",
            specialties: {
              create: [
                { code: "6B04101", name: "Экономика", minScore: 70, grant: true, price: 510000 },
                { code: "6B04102", name: "Менеджмент", minScore: 65, grant: false, price: 510000 },
              ],
            },
          },
          {
            name: "Педагогика",
            icon: "📚",
            specialties: {
              create: [
                { code: "6B01101", name: "Педагогика и психология", minScore: 70, grant: true, price: 480000 },
                { code: "6B01201", name: "Дошкольное обучение", minScore: 65, grant: true, price: 450000 },
              ],
            },
          },
        ],
      },
    },
  });

  const yukma = await prisma.university.create({
    data: {
      name: "ЮКМА",
      fullName: "Южно-Казахстанская медицинская академия",
      city: "Шымкент",
      avatar: "🏥",
      color: "#10B981",
      minScore: 70,
      hasDormitory: true,
      hasMilitary: false,
      instagram: "@medacadem_skma",
      website: "https://new.skma.edu.kz/ru",
      phone: "+7 (7252) 39-57-57",
      whatsapp: "+77252395757",
      addresses: { create: [{ name: "Главный корпус", address: "пл. Аль-Фараби, 1" }] },
      directions: {
        create: [
          {
            name: "Медицина",
            icon: "🏥",
            specialties: {
              create: [
                { code: "BM086", name: "Медицина", minScore: 70, grant: true, price: 800000 },
                { code: "BM087", name: "Стоматология", minScore: 70, grant: true, price: 900000 },
                { code: "BM088", name: "Педиатрия", minScore: 70, grant: true, price: 780000 },
                { code: "BM089", name: "Медициналық-профилактикалық іс", minScore: 70, grant: true, price: 750000 },
                { code: "B085", name: "Фармация", minScore: 70, grant: true, price: 720000 },
              ],
            },
          },
        ],
      },
    },
  });

  const miras = await prisma.university.create({
    data: {
      name: "Университет Мирас",
      fullName: "Университет Мирас",
      city: "Шымкент",
      avatar: "🌟",
      color: "#F59E0B",
      minScore: 65,
      hasDormitory: false,
      hasMilitary: false,
      instagram: "@miras_university",
      website: "https://miras.edu.kz",
      phone: "+7 (7252) 53-42-16",
      whatsapp: "+77252534216",
      addresses: { create: [{ name: "Главный корпус", address: "ул. Желтоксан, 48" }] },
      directions: {
        create: [
          {
            name: "IT",
            icon: "💻",
            specialties: {
              create: [
                { code: "6B06101", name: "Информатика", minScore: 70, grant: false, price: 510000 },
                { code: "6B06102", name: "Информационные системы", minScore: 70, grant: false, price: 510000 },
              ],
            },
          },
          {
            name: "Экономика",
            icon: "📊",
            specialties: {
              create: [
                { code: "6B04101", name: "Экономика", minScore: 65, grant: false, price: 510000 },
                { code: "6B04102", name: "Менеджмент", minScore: 65, grant: false, price: 510000 },
              ],
            },
          },
        ],
      },
    },
  });

  const shimkentUni = await prisma.university.create({
    data: {
      name: "Шымкентский университет",
      fullName: "Шымкентский университет",
      city: "Шымкент",
      avatar: "📘",
      color: "#6366F1",
      minScore: 70,
      hasDormitory: true,
      hasMilitary: false,
      instagram: "@shymkent_uni",
      website: "https://shimkent-uni.kz",
      phone: "+7 (7252) 21-15-10",
      whatsapp: "+77252211510",
      addresses: { create: [{ name: "Главный корпус", address: "ул. Сайрамская, 45" }] },
      directions: {
        create: [
          {
            name: "IT и инженерия",
            icon: "💻",
            specialties: {
              create: [
                { code: "6B06101", name: "Информатика", minScore: 70, grant: true, price: 580000 },
                { code: "6B07101", name: "Строительство", minScore: 65, grant: true, price: 550000 },
              ],
            },
          },
          {
            name: "Право",
            icon: "⚖️",
            specialties: {
              create: [
                { code: "6B04201", name: "Юриспруденция", minScore: 75, grant: true, price: 600000 },
                { code: "6B04202", name: "Правоохранительная деятельность", minScore: 70, grant: false, price: 570000 },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── Seed аналитику (чтобы дашборд не был пустым) ───
  const allUnis = [auezov, tashenev, yukma, miras, shimkentUni];
  const eventTypes = ["view", "click_instagram", "click_website", "click_whatsapp", "click_phone"];

  const analyticsData = [];
  for (const uni of allUnis) {
    for (let day = 0; day < 30; day++) {
      const date = new Date();
      date.setDate(date.getDate() - day);
      const viewCount = Math.floor(Math.random() * 20) + 5;
      for (let i = 0; i < viewCount; i++) {
        analyticsData.push({
          type: "view",
          universityId: uni.id,
          createdAt: new Date(date.getTime() + Math.random() * 86400000),
        });
      }
      // Клики
      for (const clickType of eventTypes.slice(1)) {
        const clickCount = Math.floor(Math.random() * 5);
        for (let i = 0; i < clickCount; i++) {
          analyticsData.push({
            type: clickType,
            universityId: uni.id,
            createdAt: new Date(date.getTime() + Math.random() * 86400000),
          });
        }
      }
    }
  }

  await prisma.analyticsEvent.createMany({ data: analyticsData });

  console.log("✅ Database seeded successfully!");
  console.log(`   ${allUnis.length} universities`);
  console.log(`   ${analyticsData.length} analytics events`);
  console.log(`   2 admins`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
