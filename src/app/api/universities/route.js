import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/universities — получить все университеты с адресами и направлениями
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const direction = searchParams.get("direction");
    const minScore = searchParams.get("minScore");
    const search = searchParams.get("search");

    const where = {};

    if (city && city !== "Все города") {
      where.city = city;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { fullName: { contains: search, mode: "insensitive" } },
      ];
    }

    if (minScore) {
      where.minScore = { lte: parseInt(minScore) };
    }

    if (direction && direction !== "Все направления") {
      where.directions = {
        some: { name: { contains: direction, mode: "insensitive" } },
      };
    }

    const universities = await prisma.university.findMany({
      where,
      include: {
        addresses: true,
        directions: {
          include: {
            specialties: true,
          },
        },
        _count: {
          select: { analytics: true },
        },
      },
      orderBy: { name: "asc" },
    });

    // Добавляем подсчёты
    const result = universities.map((uni) => ({
      ...uni,
      specCount: uni.directions.reduce((sum, d) => sum + d.specialties.length, 0),
      directionCount: uni.directions.length,
      viewCount: uni._count.analytics,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/universities error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/universities — создать новый университет
export async function POST(request) {
  try {
    const body = await request.json();

    const university = await prisma.university.create({
      data: {
        name: body.name,
        fullName: body.fullName,
        city: body.city || "Шымкент",
        avatar: body.avatar || "🏛️",
        color: body.color || "#3B82F6",
        minScore: body.minScore || 70,
        hasDormitory: body.hasDormitory || false,
        hasMilitary: body.hasMilitary || false,
        instagram: body.instagram,
        website: body.website,
        phone: body.phone,
        whatsapp: body.whatsapp,
        addresses: {
          create: (body.addresses || []).map((addr) => ({
            name: addr.name,
            address: addr.address,
          })),
        },
      },
      include: {
        addresses: true,
        directions: { include: { specialties: true } },
      },
    });

    return NextResponse.json(university, { status: 201 });
  } catch (error) {
    console.error("POST /api/universities error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
