import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/favorites?userId=123 — fetch user's favorite university IDs
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const favs = await prisma.favorite.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'desc' },
    })

    // Return array of university IDs
    return NextResponse.json(favs.map(f => f.universityId))
  } catch (error) {
    console.error('GET /api/favorites error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/favorites — add a favorite { userId, universityId }
export async function POST(request) {
  try {
    const { userId, universityId } = await request.json()

    if (!userId || !universityId) {
      return NextResponse.json({ error: 'userId and universityId required' }, { status: 400 })
    }

    await prisma.favorite.upsert({
      where: { userId_universityId: { userId: parseInt(userId), universityId: parseInt(universityId) } },
      update: {},
      create: { userId: parseInt(userId), universityId: parseInt(universityId) },
    })

    return NextResponse.json({ ok: true, action: 'added' })
  } catch (error) {
    console.error('POST /api/favorites error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/favorites — remove a favorite { userId, universityId }
export async function DELETE(request) {
  try {
    const { userId, universityId } = await request.json()

    if (!userId || !universityId) {
      return NextResponse.json({ error: 'userId and universityId required' }, { status: 400 })
    }

    await prisma.favorite.deleteMany({
      where: {
        userId: parseInt(userId),
        universityId: parseInt(universityId),
      },
    })

    return NextResponse.json({ ok: true, action: 'removed' })
  } catch (error) {
    console.error('DELETE /api/favorites error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}