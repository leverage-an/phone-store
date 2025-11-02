'use client'

import { useEffect, useState } from 'react'

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

export default function PromotionsManager() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)
  const [formData, setFormData] = useState<Omit<Promotion, 'id'>>({
    title: '',
    description: '',
    discount: 0,
    startDate: '',
    endDate: '',
    active: true,
    image: '',
    images: [],
    video: ''
  })
  const [imagesInput, setImagesInput] = useState('')

  useEffect(() => {
    fetchPromotions()
  }, [])

  const fetchPromotions = async () => {
    try {
      const response = await fetch('/api/promotions')
      const data = await response.json()
      setPromotions(data)
    } catch (error) {
      console.error('Error fetching promotions:', error)
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
      
      if (editingPromotion) {
        await fetch(`/api/promotions/${editingPromotion.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        })
      } else {
        await fetch('/api/promotions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        })
      }
      fetchPromotions()
      resetForm()
    } catch (error) {
      console.error('Error saving promotion:', error)
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    }
  }

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion)
    setFormData({
      title: promotion.title,
      description: promotion.description,
      discount: promotion.discount,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      active: promotion.active,
      image: promotion.image || '',
      images: promotion.images || [],
      video: promotion.video || ''
    })
    setImagesInput((promotion.images || []).join('\n'))
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโปรโมชั่นนี้?')) return
    
    try {
      await fetch(`/api/promotions/${id}`, { method: 'DELETE' })
      fetchPromotions()
    } catch (error) {
      console.error('Error deleting promotion:', error)
      alert('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      discount: 0,
      startDate: '',
      endDate: '',
      active: true,
      image: '',
      images: [],
      video: ''
    })
    setImagesInput('')
    setEditingPromotion(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="text-center py-8">กำลังโหลด...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">จัดการโปรโมชั่น</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          {showForm ? 'ยกเลิก' : '+ เพิ่มโปรโมชั่นใหม่'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">
            {editingPromotion ? 'แก้ไขโปรโมชั่น' : 'เพิ่มโปรโมชั่นใหม่'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">ชื่อโปรโมชั่น</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">คำอธิบาย</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">ส่วนลด (%)</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">สถานะ</label>
                <select
                  value={formData.active ? 'true' : 'false'}
                  onChange={(e) => setFormData({ ...formData, active: e.target.value === 'true' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  <option value="true">เปิดใช้งาน</option>
                  <option value="false">ปิดใช้งาน</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-semibold">วันที่เริ่มต้น</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">วันที่สิ้นสุด</label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div className="col-span-2">
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
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
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
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                {editingPromotion ? 'บันทึกการแก้ไข' : 'เพิ่มโปรโมชั่น'}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อโปรโมชั่น</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ส่วนลด</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่เริ่มต้น</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่สิ้นสุด</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {promotions.map((promotion) => (
                <tr key={promotion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{promotion.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{promotion.discount}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(promotion.startDate).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(promotion.endDate).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      promotion.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {promotion.active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(promotion)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(promotion.id)}
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
          {promotions.length === 0 && (
            <div className="text-center py-8 text-gray-500">ยังไม่มีโปรโมชั่น</div>
          )}
        </div>
      </div>
    </div>
  )
}
