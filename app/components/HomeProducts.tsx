'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image?: string
  images?: string[]
  video?: string
  description: string
  stock: number
  category: 'มือ1' | 'มือ2'
}

export default function HomeProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 4))
      })
      .catch(err => console.error('Error fetching products:', err))
  }, [])

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        ยังไม่มีสินค้า
      </div>
    )
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
          <div className="bg-gray-200 h-48 flex items-center justify-center relative">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-6xl">📱</div>
            )}
            {product.video && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <span>▶</span> มีวิดีโอ
              </div>
            )}
            {product.images && product.images.length > 0 && (
              <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-xs">
                +{product.images.length} รูป
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
            <h3 className="text-lg font-bold mb-2 line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold text-primary-600">
                ฿{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ฿{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
            <a 
              href={product.stock > 0 ? `https://m.me/VantaBlackService?text=${encodeURIComponent(`สวัสดีครับ สนใจซื้อสินค้า ${product.name}`)}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-center block ${
                product.stock === 0 ? 'bg-gray-400 cursor-not-allowed pointer-events-none' : ''
              }`}
            >
              {product.stock > 0 ? '💬 สั่งซื้อ' : 'สินค้าหมด'}
            </a>
          </div>
        </div>
      ))}
    </>
  )
}
