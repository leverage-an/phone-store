import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'lib', 'data.json')

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  description: string
  stock: number
  category: 'มือ1' | 'มือ2'  // หมวดหมู่สินค้า
  image?: string
  images?: string[]  // รองรับหลายรูป
  video?: string     // URL วิดีโอ (YouTube, Vimeo, หรือ direct video URL)
}

export interface Promotion {
  id: string
  title: string
  description: string
  discount: number
  startDate: string
  endDate: string
  active: boolean
  image?: string
  images?: string[]  // รองรับหลายรูป
  video?: string     // URL วิดีโอ
}

export interface Article {
  id: string
  title: string
  content: string  // เนื้อหาสั้นๆ สำหรับแสดงใน list
  fullContent: string  // เนื้อหาเต็ม
  category: string
  date: string
  author?: string
  image?: string
}

interface Data {
  products: Product[]
  promotions: Promotion[]
  articles: Article[]
}

export function readData(): Data {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8')
    const data = JSON.parse(fileContents)
    return {
      products: data.products || [],
      promotions: data.promotions || [],
      articles: data.articles || []
    }
  } catch (error) {
    return { products: [], promotions: [], articles: [] }
  }
}

export function writeData(data: Data): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8')
}

export function getProducts(): Product[] {
  const data = readData()
  return data.products
}

export function getProduct(id: string): Product | undefined {
  const products = getProducts()
  return products.find(p => p.id === id)
}

export function addProduct(product: Omit<Product, 'id'>): Product {
  const data = readData()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString()
  }
  data.products.push(newProduct)
  writeData(data)
  return newProduct
}

export function updateProduct(id: string, product: Partial<Product>): Product | null {
  const data = readData()
  const index = data.products.findIndex(p => p.id === id)
  if (index === -1) return null
  
  data.products[index] = { ...data.products[index], ...product }
  writeData(data)
  return data.products[index]
}

export function deleteProduct(id: string): boolean {
  const data = readData()
  const index = data.products.findIndex(p => p.id === id)
  if (index === -1) return false
  
  data.products.splice(index, 1)
  writeData(data)
  return true
}

export function getPromotions(): Promotion[] {
  const data = readData()
  return data.promotions
}

export function getPromotion(id: string): Promotion | undefined {
  const promotions = getPromotions()
  return promotions.find(p => p.id === id)
}

export function addPromotion(promotion: Omit<Promotion, 'id'>): Promotion {
  const data = readData()
  const newPromotion: Promotion = {
    ...promotion,
    id: Date.now().toString()
  }
  data.promotions.push(newPromotion)
  writeData(data)
  return newPromotion
}

export function updatePromotion(id: string, promotion: Partial<Promotion>): Promotion | null {
  const data = readData()
  const index = data.promotions.findIndex(p => p.id === id)
  if (index === -1) return null
  
  data.promotions[index] = { ...data.promotions[index], ...promotion }
  writeData(data)
  return data.promotions[index]
}

export function deletePromotion(id: string): boolean {
  const data = readData()
  const index = data.promotions.findIndex(p => p.id === id)
  if (index === -1) return false
  
  data.promotions.splice(index, 1)
  writeData(data)
  return true
}

export function getArticles(): Article[] {
  const data = readData()
  return data.articles || []
}

export function getArticle(id: string): Article | undefined {
  const articles = getArticles()
  return articles.find(a => a.id === id)
}

export function addArticle(article: Omit<Article, 'id'>): Article {
  const data = readData()
  const newArticle: Article = {
    ...article,
    id: Date.now().toString()
  }
  if (!data.articles) data.articles = []
  data.articles.push(newArticle)
  writeData(data)
  return newArticle
}

export function updateArticle(id: string, article: Partial<Article>): Article | null {
  const data = readData()
  if (!data.articles) return null
  const index = data.articles.findIndex(a => a.id === id)
  if (index === -1) return null
  
  data.articles[index] = { ...data.articles[index], ...article }
  writeData(data)
  return data.articles[index]
}

export function deleteArticle(id: string): boolean {
  const data = readData()
  if (!data.articles) return false
  const index = data.articles.findIndex(a => a.id === id)
  if (index === -1) return false
  
  data.articles.splice(index, 1)
  writeData(data)
  return true
}
