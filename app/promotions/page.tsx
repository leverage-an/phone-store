'use client'

import { useEffect, useState } from 'react'
import VideoPlayer from '@/components/VideoPlayer'

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

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPromotions()
  }, [])

  const fetchPromotions = async () => {
    try {
      const response = await fetch('/api/promotions')
      const data = await response.json()
      setPromotions(data.filter((p: Promotion) => p.active))
    } catch (error) {
      console.error('Error fetching promotions:', error)
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

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">โปรโมชั่นพิเศษ</h1>
      
      {promotions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">ไม่มีโปรโมชั่นในขณะนี้</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion) => (
            <div key={promotion.id} className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg shadow-lg overflow-hidden">
              {promotion.video ? (
                <div className="bg-black">
                  <VideoPlayer url={promotion.video} className="h-48" />
                </div>
              ) : (
                <div className="bg-white/20 h-48 flex items-center justify-center">
                  {promotion.image ? (
                    <img src={promotion.image} alt={promotion.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-6xl">🎉</div>
                  )}
                </div>
              )}
              <div className="p-6">
                <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-sm font-bold mb-3">
                  ลด {promotion.discount}%
                </div>
                <h3 className="text-2xl font-bold mb-2">{promotion.title}</h3>
                <p className="text-primary-100 mb-4">{promotion.description}</p>
                {promotion.images && promotion.images.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-primary-200 mb-2">รูปภาพเพิ่มเติม:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {promotion.images.slice(0, 3).map((img, index) => (
                        <img 
                          key={index}
                          src={img} 
                          alt={`${promotion.title} ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="text-sm text-primary-100">
                  <p>วันที่เริ่มต้น: {new Date(promotion.startDate).toLocaleDateString('th-TH')}</p>
                  <p>วันที่สิ้นสุด: {new Date(promotion.endDate).toLocaleDateString('th-TH')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
