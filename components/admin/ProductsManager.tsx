'use client'

import { useEffect, useState } from 'react'

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

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    brand: '',
    price: 0,
    originalPrice: 0,
    description: '',
    stock: 0,
    category: 'มือ1',
    image: '',
    images: [],
    video: ''
  })
  const [imagesInput, setImagesInput] = useState('')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // แปลง images จาก textarea เป็น array
      const imagesArray = imagesInput.split('\n').filter(url => url.trim() !== '')
      const submitData = {
        ...formData,
        images: imagesArray.length > 0 ? imagesArray : undefined
      }
      
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        })
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        })
      }
      fetchProducts()
      resetForm()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      description: product.description,
      stock: product.stock,
      category: product.category,
      image: product.image || '',
      images: product.images || [],
      video: product.video || ''
    })
    setImagesInput((product.images || []).join('\n'))
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) return
    
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: 0,
      originalPrice: 0,
      description: '',
      stock: 0,
      category: 'มือ1',
      image: '',
      images: [],
      video: ''
    })
    setImagesInput('')
    setEditingProduct(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="text-center py-8">กำลังโหลด...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">จัดการสินค้า</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          {showForm ? 'ยกเลิก' : '+ เพิ่มสินค้าใหม่'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">
            {editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">ชื่อสินค้า</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">แบรนด์</label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">หมวดหมู่</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'มือ1' | 'มือ2' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  <option value="มือ1">มือ1</option>
                  <option value="มือ2">มือ2</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-semibold">ราคา (฿)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">ราคาเดิม (฿)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">จำนวนคงเหลือ</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">URL รูปภาพหลัก</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-semibold">รูปภาพเพิ่มเติม (หนึ่ง URL ต่อบรรทัด)</label>
              <textarea
                rows={3}
                value={imagesInput}
                onChange={(e) => setImagesInput(e.target.value)}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <p className="text-sm text-gray-500 mt-1">ใส่ URL รูปภาพทีละ URL ต่อบรรทัด</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">URL วิดีโอ (YouTube, Vimeo, หรือ direct video URL)</label>
              <input
                type="text"
                value={formData.video}
                onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=... หรือ https://example.com/video.mp4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <p className="text-sm text-gray-500 mt-1">รองรับ YouTube, Vimeo หรือ URL วิดีโอโดยตรง</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">คำอธิบาย</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                {editingProduct ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อสินค้า</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">แบรนด์</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ราคา</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">คงเหลือ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ฿{product.price.toLocaleString()}
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through ml-2">
                        ฿{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.stock} ชิ้น</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-8 text-gray-500">ยังไม่มีสินค้า</div>
          )}
        </div>
      </div>
    </div>
  )
}
