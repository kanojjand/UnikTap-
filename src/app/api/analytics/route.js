import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/analytics — получить статистику
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "week"; // week, month, all

    let dateFilter = {};
    const now = new Date();
    if (period === "week") {
      dateFilter = { createdAt: { gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } };
    } else if (period === "month") {
      dateFilter = { createdAt: { gte: new Date(now - 30 * 24 * 60 * 60 * 1000) } };
    }

    // Общие цифры
    const totalViews = await prisma.analyticsEvent.count({
      where: { type: "view", ...dateFilter },
    });

    const totalClicks = await prisma.analyticsEvent.count({
      where: { type: { startsWith: "click_" }, ...dateFilter },
    });

    const totalUsers = await prisma.user.count();
    const totalUniversities = await prisma.university.count();
    const totalSpecialties = await prisma.specialty.count();

    // Клики по типам
    const clickTypes = await prisma.analyticsEvent.groupBy({
      by: ["type"],
      where: { type: { startsWith: "click_" }, ...dateFilter },
      _count: true,
    });

    // Топ университетов по просмотрам
    const topUniversities = await prisma.analyticsEvent.groupBy({
      by: ["universityId"],
      where: { type: "view", ...dateFilter },
      _count: true,
      orderBy: { _count: { universityId: "desc" } },
      take: 10,
    });

    // Получаем названия универов
    const uniIds = topUniversities.map((u) => u.universityId);
    const unis = await prisma.university.findMany({
      where: { id: { in: uniIds } },
      select: { id: true, name: true, avatar: true, color: true },
    });

    const topUnis = topUniversities.map((item) => ({
      ...unis.find((u) => u.id === item.universityId),
      views: item._count,
    }));

    // Просмотры по дням (за последнюю неделю)
    const dailyViews = await prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) FILTER (WHERE type = 'view') as views,
        COUNT(*) FILTER (WHERE type LIKE 'click_%') as clicks
      FROM "AnalyticsEvent"
      WHERE created_at >= ${new Date(now - 7 * 24 * 60 * 60 * 1000)}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Per-university stats
    const uniStats = await prisma.analyticsEvent.groupBy({
      by: ["universityId", "type"],
      ...dateFilter,
      _count: true,
    });

    return NextResponse.json({
      totalViews,
      totalClicks,
      totalUsers,
      totalUniversities,
      totalSpecialties,
      clickTypes: clickTypes.reduce((acc, item) => {
        acc[item.type] = item._count;
        return acc;
      }, {}),
      topUniversities: topUnis,
      dailyViews: dailyViews.map((d) => ({
        date: d.date,
        views: Number(d.views),
        clicks: Number(d.clicks),
      })),
      uniStats,
    });
  } catch (error) {
    console.error("GET /api/analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/analytics — записать событие (просмотр)
export async function POST(request) {
  try {
    const body = await request.json();

    const event = await prisma.analyticsEvent.create({
      data: {
        type: body.type || "view",
        universityId: body.universityId,
        userId: body.userId || null,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
