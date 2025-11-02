'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            📱 VantaBlack Service
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group">
              หน้าหลัก
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group">
              สินค้า
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/promotions" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group">
              โปรโมชั่น
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/knowledge" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group">
              ความรู้เสริม
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium relative group">
              ติดต่อ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/admin" className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold">
              หลังบ้าน
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition font-medium py-2"
              >
                หน้าหลัก
              </Link>
              <Link 
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition font-medium py-2"
              >
                สินค้า
              </Link>
              <Link 
                href="/promotions"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition font-medium py-2"
              >
                โปรโมชั่น
              </Link>
              <Link 
                href="/knowledge"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition font-medium py-2"
              >
                ความรู้เสริม
              </Link>
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition font-medium py-2"
              >
                ติดต่อ
              </Link>
              <Link 
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2 rounded-lg text-center font-semibold mt-2"
              >
                หลังบ้าน
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
