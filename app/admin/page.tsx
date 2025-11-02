'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductsManager from '@/components/admin/ProductsManager'
import PromotionsManager from '@/components/admin/PromotionsManager'
import ArticlesManager from '@/components/admin/ArticlesManager'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'promotions' | 'articles'>('products')

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-600">หลังบ้าน - จัดการร้าน</h1>
            <Link href="/" className="text-primary-600 hover:text-primary-700">
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-4 font-semibold transition ${
                activeTab === 'products'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              จัดการสินค้า
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`px-6 py-4 font-semibold transition ${
                activeTab === 'promotions'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              จัดการโปรโมชั่น
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-6 py-4 font-semibold transition ${
                activeTab === 'articles'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              จัดการบทความ
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'promotions' && <PromotionsManager />}
        {activeTab === 'articles' && <ArticlesManager />}
      </div>
    </div>
  )
}
