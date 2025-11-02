'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Promotion {
  id: string
  title: string
  description: string
  discount: number
  startDate: string
  endDate: string
  active: boolean
  image?: string
  images?: string[]
  video?: string
}

export default function HomePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([])

  useEffect(() => {
    fetch('/api/promotions')
      .then(res => res.json())
      .then(data => {
        const activePromotions = data.filter((p: Promotion) => p.active).slice(0, 3)
        setPromotions(activePromotions)
      })
      .catch(err => console.error('Error fetching promotions:', err))
  }, [])

  if (promotions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        ไม่มีโปรโมชั่นในขณะนี้
      </div>
    )
  }

  return (
    <>
      {promotions.map((promotion) => (
        <div key={promotion.id} className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-white/20 h-32 flex items-center justify-center relative">
            {promotion.image ? (
              <img src={promotion.image} alt={promotion.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-4xl">🎉</div>
            )}
            {promotion.video && (
              <div className="absolute top-1 right-1 bg-black/70 text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
                <span>▶</span> วิดีโอ
              </div>
            )}
            {promotion.images && promotion.images.length > 0 && (
              <div className="absolute top-1 left-1 bg-white/30 text-white px-2 py-0.5 rounded text-xs">
                +{promotion.images.length}
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="bg-white/20 inline-block px-2 py-1 rounded-full text-xs font-bold mb-2">
              ลด {promotion.discount}%
            </div>
            <h3 className="text-lg font-bold mb-1">{promotion.title}</h3>
            <p className="text-sm text-primary-100 line-clamp-2">{promotion.description}</p>
          </div>
        </div>
      ))}
    </>
  )
}
