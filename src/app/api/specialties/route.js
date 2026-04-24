import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/specialties — все специальности (с фильтрами)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get("universityId");
    const directionId = searchParams.get("directionId");
    const search = searchParams.get("search");

    const where = {};
    if (directionId) where.directionId = parseInt(directionId);
    if (universityId) where.direction = { universityId: parseInt(universityId) };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { code: { contains: search, mode: "insensitive" } },
      ];
    }

    const specialties = await prisma.specialty.findMany({
      where,
      include: {
        direction: {
          include: { university: { select: { id: true, name: true, avatar: true } } },
        },
      },
      orderBy: { code: "asc" },
    });

    return NextResponse.json(specialties);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/specialties — создать специальность
export async function POST(request) {
  try {
    const body = await request.json();

    let directionId = body.directionId;

    // Если направление не указано, создаём новое
    if (!directionId && body.directionName) {
      const dir = await prisma.direction.create({
        data: {
          name: body.directionName,
          icon: body.directionIcon || "📁",
          universityId: body.universityId,
        },
      });
      directionId = dir.id;
    }

    const specialty = await prisma.specialty.create({
      data: {
        code: body.code,
        name: body.name,
        minScore: body.minScore || 70,
        grant: body.grant || false,
        price: body.price || null,
        directionId,
      },
      include: {
        direction: { include: { university: true } },
      },
    });

    return NextResponse.json(specialty, { status: 201 });
  } catch (error) {
    console.error("POST /api/specialties error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
