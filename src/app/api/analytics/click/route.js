import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/analytics/click — записать клик по ссылке
export async function POST(request) {
  try {
    const body = await request.json();
    // type: "click_instagram" | "click_website" | "click_whatsapp" | "click_phone" | "click_2gis"

    const event = await prisma.analyticsEvent.create({
      data: {
        type: body.type,
        universityId: body.universityId,
        userId: body.userId || null,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
