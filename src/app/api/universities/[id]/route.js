import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/universities/[id]
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);

    const university = await prisma.university.findUnique({
      where: { id },
      include: {
        addresses: true,
        directions: {
          include: { specialties: true },
        },
      },
    });

    if (!university) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    return NextResponse.json(university);
  } catch (error) {
    console.error("GET /api/universities/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/universities/[id] — обновить университет
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    // Удаляем старые адреса и создаём новые
    await prisma.address.deleteMany({ where: { universityId: id } });

    const university = await prisma.university.update({
      where: { id },
      data: {
        name: body.name,
        fullName: body.fullName,
        city: body.city,
        avatar: body.avatar,
        color: body.color,
        minScore: body.minScore,
        hasDormitory: body.hasDormitory,
        hasMilitary: body.hasMilitary,
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

    return NextResponse.json(university);
  } catch (error) {
    console.error("PUT /api/universities/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/universities/[id]
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    await prisma.university.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/universities/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
