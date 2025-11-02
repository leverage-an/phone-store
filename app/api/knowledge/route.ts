import { NextResponse } from 'next/server'
import { getArticles, addArticle } from '@/lib/db'

export async function GET() {
  try {
    const articles = getArticles()
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const article = addArticle(body)
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
