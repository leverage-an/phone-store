'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  content: string
  fullContent: string
  category: string
  date: string
  author?: string
  image?: string
}

export default function ArticleDetailPage() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id as string)
    }
  }, [params.id])

  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/knowledge/${id}`)
      if (response.ok) {
        const data = await response.json()
        setArticle(data)
      }
    } catch (error) {
      console.error('Error fetching article:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-2xl">กำลังโหลด...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600 mb-4">ไม่พบบทความ</p>
        <Link href="/knowledge" className="text-primary-600 hover:text-primary-700">
          ← กลับไปหน้ารวมบทความ
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Link href="/knowledge" className="text-primary-600 hover:text-primary-700 mb-6 inline-block">
        ← กลับไปหน้ารวมบทความ
      </Link>

      <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {article.image && (
          <div className="w-full h-64 md:h-96 bg-gray-200 overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          <div className="flex items-center justify-between mb-6">
            <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(article.date).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
            {article.title}
          </h1>

          {article.author && (
            <div className="mb-6 text-gray-600">
              <span className="font-semibold">ผู้เขียน:</span> {article.author}
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-4">
              {(article.fullContent || article.content).split('\n\n').map((paragraph, index) => {
                // Format markdown-style content
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  const text = paragraph.replace(/\*\*/g, '')
                  return (
                    <h3 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4">
                      {text}
                    </h3>
                  )
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                      {paragraph.split('\n- ').map((item, i) => (
                        <li key={i} className="text-gray-700">
                          {item.replace(/^- /, '').replace(/\*\*/g, '')}
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 ml-4">
                      {paragraph.split(/\d+\./).filter(Boolean).map((item, i) => (
                        <li key={i} className="text-gray-700">
                          {item.trim().replace(/\*\*/g, '')}
                        </li>
                      ))}
                    </ol>
                  )
                }
                return (
                  <p key={index} className="text-gray-700">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                )
              })}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              ← กลับไปหน้ารวมบทความ
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
