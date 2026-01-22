import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/app/server/db'
import { users } from '@/app/server/db/schema'
import { eq } from 'drizzle-orm'

// GET - 获取所有用户
export async function GET() {
  try {
    const allUsers = await db.select().from(users)
    return NextResponse.json({
      success: true,
      data: allUsers,
      count: allUsers.length
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const newUser = await db.insert(users).values({
      name,
      email,
    }).returning()

    return NextResponse.json({ success: true, data: newUser[0] })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
