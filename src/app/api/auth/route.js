import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

// HMAC-SHA256 verification for Telegram WebApp initData
function verifyTelegramData(initData) {
  const params = new URLSearchParams(initData)
  const hash = params.get('hash')
  params.delete('hash')

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n')

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(process.env.BOT_TOKEN)
    .digest()

  const expectedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex')

  return expectedHash === hash
}

// POST /api/auth — Telegram WebApp authorization
export async function POST(request) {
  try {
    const { initData } = await request.json()

    if (!initData) {
      return NextResponse.json({ error: 'initData required' }, { status: 400 })
    }

    if (!verifyTelegramData(initData)) {
      return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 401 })
    }

    const params = new URLSearchParams(initData)
    const userParam = params.get('user')

    if (!userParam) {
      return NextResponse.json({ error: 'User data not found in initData' }, { status: 400 })
    }

    const tgUser = JSON.parse(userParam)

    // Upsert user in database
    const user = await prisma.user.upsert({
      where: { telegramId: BigInt(tgUser.id) },
      update: {
        username: tgUser.username || null,
        firstName: tgUser.first_name || null,
        lastName: tgUser.last_name || null,
      },
      create: {
        telegramId: BigInt(tgUser.id),
        username: tgUser.username || null,
        firstName: tgUser.first_name || null,
        lastName: tgUser.last_name || null,
      },
    })

    // Return user data (convert BigInt to Number for JSON serialization)
    return NextResponse.json({
      userId: user.id,
      firstName: user.firstName,
    })
  } catch (error) {
    console.error('POST /api/auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}