import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/directions — создать направление
export async function POST(request) {
  try {
    const body = await request.json();

    const direction = await prisma.direction.create({
      data: {
        name: body.name,
        icon: body.icon || "📁",
        universityId: body.universityId,
      },
      include: { specialties: true },
    });

    return NextResponse.json(direction, { status: 201 });
  } catch (error) {
    console.error("POST /api/directions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
