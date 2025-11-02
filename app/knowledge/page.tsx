'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  content: string
  fullContent?: string
  category: string
  date: string
  author?: string
  image?: string
}

export default function KnowledgePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด')

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/knowledge')
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['ทั้งหมด', ...Array.from(new Set(articles.map(a => a.category)))]

  const filteredArticles = selectedCategory === 'ทั้งหมด'
    ? articles
    : articles.filter(article => article.category === selectedCategory)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-2xl">กำลังโหลด...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
        ความรู้เสริม
      </h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/knowledge/${article.id}`}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
          >
            {article.image && (
              <div className="w-full h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-3 py-1 bg-primary-100 text-primary-800 rounded-full font-semibold">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(article.date).toLocaleDateString('th-TH')}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {article.content}
              </p>
              <div className="text-primary-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                อ่านต่อ
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">ไม่มีบทความในหมวดหมู่นี้</p>
        </div>
      )}
    </div>
  )
}
