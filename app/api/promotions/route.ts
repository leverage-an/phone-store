import { NextResponse } from 'next/server'
import { getPromotions, addPromotion } from '@/lib/db'

export async function GET() {
  try {
    const promotions = getPromotions()
    return NextResponse.json(promotions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promotions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const promotion = addPromotion(body)
    return NextResponse.json(promotion, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promotion' }, { status: 500 })
  }
}
