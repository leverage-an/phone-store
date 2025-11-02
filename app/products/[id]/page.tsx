'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import VideoPlayer from '@/components/VideoPlayer'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  description: string
  stock: number
  category: 'มือ1' | 'มือ2'
  image?: string
  images?: string[]
  video?: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
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

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600">ไม่พบสินค้า</p>
        <Link href="/products" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          ← กลับไปหน้าสินค้า
        </Link>
      </div>
    )
  }

  // รวมรูปภาพทั้งหมด (รูปหลัก + รูปเพิ่มเติม)
  const allImages = [
    product.image,
    ...(product.images || [])
  ].filter(Boolean) as string[]

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/products" className="text-primary-600 hover:text-primary-700 mb-6 inline-block">
        ← กลับไปหน้าสินค้า
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ส่วนแสดงรูปภาพและวิดีโอ */}
        <div>
          {product.video && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">วิดีโอ</h3>
              <VideoPlayer url={product.video} />
            </div>
          )}

          {allImages.length > 0 && (
            <>
              {/* รูปภาพใหญ่ */}
              <div className="bg-gray-200 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '1/1' }}>
                <img 
                  src={allImages[selectedImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* รูปภาพย่อ */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`bg-gray-200 rounded-lg overflow-hidden aspect-square ${
                        selectedImageIndex === index ? 'ring-2 ring-primary-600' : ''
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ส่วนข้อมูลสินค้า */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">{product.brand}</p>
            <span className={`text-sm px-3 py-1 rounded-full font-semibold ${
              product.category === 'มือ1' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {product.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-primary-600">
              ฿{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                ฿{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">คำอธิบาย:</p>
            <p className="text-gray-800 whitespace-pre-line">{product.description}</p>
          </div>

          <div className="mb-6">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              product.stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `คงเหลือ ${product.stock} ชิ้น` : 'สินค้าหมด'}
            </span>
          </div>

          <a 
            href={product.stock > 0 ? `https://m.me/VantaBlackService?text=${encodeURIComponent(`สวัสดีครับ สนใจซื้อสินค้า ${product.name}`)}` : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full bg-primary-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary-700 transition text-lg text-center block ${
              product.stock === 0 ? 'bg-gray-400 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            {product.stock > 0 ? `💬 สั่งซื้อสินค้า "${product.name}"` : 'สินค้าหมด'}
          </a>
        </div>
      </div>
    </div>
  )
}
