import { NextResponse } from 'next/server'
import { getPromotion, updatePromotion, deletePromotion } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const promotion = getPromotion(params.id)
    if (!promotion) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 })
    }
    return NextResponse.json(promotion)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promotion' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const promotion = updatePromotion(params.id, body)
    if (!promotion) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 })
    }
    return NextResponse.json(promotion)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update promotion' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = deletePromotion(params.id)
    if (!success) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete promotion' }, { status: 500 })
  }
}
