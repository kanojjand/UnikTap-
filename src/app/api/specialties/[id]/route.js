import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT /api/specialties/[id]
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const specialty = await prisma.specialty.update({
      where: { id },
      data: {
        code: body.code,
        name: body.name,
        minScore: body.minScore,
        grant: body.grant,
        price: body.price,
        directionId: body.directionId,
      },
    });

    return NextResponse.json(specialty);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/specialties/[id]
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    await prisma.specialty.delete({ where: { id } });

    // Удаляем пустые направления
    await prisma.direction.deleteMany({
      where: { specialties: { none: {} } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
