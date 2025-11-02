import Link from 'next/link'
import HomePromotions from './components/HomePromotions'
import HomeProducts from './components/HomeProducts'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent animate-slide-up">
              ยินดีต้อนรับสู่
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              VantaBlack Service
            </h2>
            <p className="text-xl md:text-2xl mb-6 text-primary-100 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
              ร้านโทรศัพท์มือสองคุณภาพ พร้อมอุปกรณ์เสริมและบริการซ่อม
            </p>
            <p className="text-lg md:text-xl mb-10 text-primary-200 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
              บริการซ่อม ลงรอม ปลดล็อกมือถือ Android / iPhone ครบวงจร
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Link 
                href="/products" 
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 text-lg"
              >
                ดูสินค้า
              </Link>
              <Link 
                href="/promotions" 
                className="bg-primary-800/80 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-900/90 transition-all duration-300 border-2 border-white/30 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 text-lg"
              >
                โปรโมชั่น
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            ทำไมต้องเลือกเรา
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group transform hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">✅</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">สินค้าคุณภาพ</h3>
              <p className="text-gray-600 leading-relaxed">ตรวจสอบคุณภาพทุกเครื่องก่อนขาย รับประกันความพอใจ</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group transform hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">ราคาดีที่สุด</h3>
              <p className="text-gray-600 leading-relaxed">ราคาแข่งขันได้ พร้อมโปรโมชั่นพิเศษและส่วนลดมากมาย</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group transform hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🔧</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">บริการซ่อม</h3>
              <p className="text-gray-600 leading-relaxed mb-2">ทีมช่างมืออาชีพพร้อมให้บริการด้วยอุปกรณ์ทันสมัย</p>
              <p className="text-sm text-primary-600 font-semibold">ลงรอม • ปลดล็อก Android / iPhone • ซ่อมครบวงจร</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              โปรโมชั่นพิเศษ
            </h2>
            <Link href="/promotions" className="text-primary-600 hover:text-primary-700 font-bold text-lg flex items-center gap-2 group">
              ดูทั้งหมด
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HomePromotions />
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              สินค้าขายดี
            </h2>
            <Link href="/products" className="text-primary-600 hover:text-primary-700 font-bold text-lg flex items-center gap-2 group">
              ดูทั้งหมด
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HomeProducts />
          </div>
        </div>
      </section>
    </div>
  )
}
