'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<'ทั้งหมด' | 'มือ1' | 'มือ2'>('ทั้งหมด')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string>('ทั้งหมด')
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({min: 0, max: 100000})
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== 'ทั้งหมด') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by brand
    if (selectedBrand !== 'ทั้งหมด') {
      filtered = filtered.filter(p => p.brand === selectedBrand)
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max)

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'th'))
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, selectedBrand, priceRange, searchQuery, sortBy, products])

  // รายการแบรนด์มือถือที่ใช้ในไทย
  const allBrands = [
    'Apple',
    'Samsung',
    'Xiaomi',
    'OPPO',
    'vivo',
    'Realme',
    'Huawei',
    'Honor',
    'OnePlus',
    'Nothing',
    'Nokia',
    'Motorola',
    'ASUS',
    'ROG Phone',
    'Google Pixel',
    'Sony',
    'Lenovo',
    'Infinix',
    'Tecno',
    'Itel',
    'อื่นๆ'
  ]
  
  // รวมแบรนด์ที่มีในสินค้าและแบรนด์ทั้งหมด
  const existingBrands = Array.from(new Set(products.map(p => p.brand)))
  const brands = [...new Set([...allBrands, ...existingBrands])].sort()
  const maxPrice = Math.max(...products.map(p => p.price), 100000)

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
        สินค้าทั้งหมด
      </h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="ค้นหาสินค้า (ชื่อ, แบรนด์, คำอธิบาย)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent text-lg"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">กรองสินค้า</h2>
        
        {/* Category Filter */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">หมวดหมู่</label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('ทั้งหมด')}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === 'ทั้งหมด'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setSelectedCategory('มือ1')}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === 'มือ1'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              มือ1
            </button>
            <button
              onClick={() => setSelectedCategory('มือ2')}
              className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === 'มือ2'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              มือ2
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand Filter */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">แบรนด์</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="ทั้งหมด">ทั้งหมด</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              ราคา: ฿{priceRange.min.toLocaleString()} - ฿{priceRange.max.toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">เรียงตาม</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="default">ค่าเริ่มต้น</option>
              <option value="price-low">ราคา: ต่ำ → สูง</option>
              <option value="price-high">ราคา: สูง → ต่ำ</option>
              <option value="name">ชื่อ: ก → ฮ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-600">
        พบสินค้า <span className="font-bold text-primary-600">{filteredProducts.length}</span> รายการ
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">ไม่มีสินค้าในหมวดหมู่นี้</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition block"
            >
              <div className="bg-gray-200 h-64 flex items-center justify-center relative">
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
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    product.category === 'มือ1' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-primary-600">
                    ฿{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ฿{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `คงเหลือ ${product.stock} ชิ้น` : 'สินค้าหมด'}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = `/products/${product.id}`
                    }}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed" 
                    disabled={product.stock === 0}
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
