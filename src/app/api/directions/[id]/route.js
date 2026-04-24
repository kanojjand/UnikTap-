import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT /api/directions/[id]
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const direction = await prisma.direction.update({
      where: { id },
      data: {
        name: body.name,
        icon: body.icon,
      },
      include: { specialties: true },
    });

    return NextResponse.json(direction);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/directions/[id]
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    await prisma.direction.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
