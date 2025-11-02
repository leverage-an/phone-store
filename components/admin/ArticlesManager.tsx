'use client'

import { useEffect, useState } from 'react'

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

export default function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState<Omit<Article, 'id'>>({
    title: '',
    content: '',
    fullContent: '',
    category: 'เคล็ดลับ',
    date: new Date().toISOString().split('T')[0],
    author: 'VantaBlack Service',
    image: ''
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingArticle) {
        await fetch(`/api/knowledge/${editingArticle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } else {
        await fetch('/api/knowledge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }
      fetchArticles()
      resetForm()
    } catch (error) {
      console.error('Error saving article:', error)
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    }
  }

  const handleEdit = (article: Article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      content: article.content,
      fullContent: article.fullContent,
      category: article.category,
      date: article.date,
      author: article.author || 'VantaBlack Service',
      image: article.image || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?')) return
    
    try {
      await fetch(`/api/knowledge/${id}`, { method: 'DELETE' })
      fetchArticles()
    } catch (error) {
      console.error('Error deleting article:', error)
      alert('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      fullContent: '',
      category: 'เคล็ดลับ',
      date: new Date().toISOString().split('T')[0],
      author: 'VantaBlack Service',
      image: ''
    })
    setEditingArticle(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="text-center py-8">กำลังโหลด...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">จัดการบทความ</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          {showForm ? 'ยกเลิก' : '+ เพิ่มบทความใหม่'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">
            {editingArticle ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">ชื่อบทความ</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">หมวดหมู่</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  <option value="เคล็ดลับ">เคล็ดลับ</option>
                  <option value="การดูแล">การดูแล</option>
                  <option value="ความรู้ทั่วไป">ความรู้ทั่วไป</option>
                  <option value="งานซ่อม">งานซ่อม</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-semibold">วันที่</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">ผู้เขียน</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-semibold">URL รูปภาพ</label>
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
              <label className="block mb-2 font-semibold">เนื้อหาสั้นๆ (สำหรับแสดงในหน้า list)</label>
              <textarea
                required
                rows={3}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                placeholder="เนื้อหาสั้นๆ ที่จะแสดงใน card บทความ"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">เนื้อหาเต็ม (สำหรับอ่านต่อ)</label>
              <textarea
                required
                rows={10}
                value={formData.fullContent}
                onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 font-mono text-sm"
                placeholder="เนื้อหาเต็มของบทความ (รองรับ Markdown แบบง่าย)"
              />
              <p className="text-sm text-gray-500 mt-1">**ข้อความ** = ตัวหนา, - รายการ = bullet list, 1. = numbered list</p>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                {editingArticle ? 'บันทึกการแก้ไข' : 'เพิ่มบทความ'}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อบทความ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">หมวดหมู่</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{article.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(article.date).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
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
          {articles.length === 0 && (
            <div className="text-center py-8 text-gray-500">ยังไม่มีบทความ</div>
          )}
        </div>
      </div>
    </div>
  )
}
