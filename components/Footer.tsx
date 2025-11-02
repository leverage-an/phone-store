import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20 border-t border-gray-700">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VantaBlack Service</h3>
            <p className="text-gray-400 mb-2">
              ร้านโทรศัพท์มือสองและอุปกรณ์เสริมคุณภาพ
              บริการซ่อม ลงรอม ปลดล็อกมือถือ Android / iPhone ครบวงจร
            </p>
            <p className="text-gray-400 text-sm">
              หมู่บ้าน โฮมเซนเตอร์ 88/66<br />
              เขตสายไหม กรุงเทพมหานคร 10220
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition">หน้าหลัก</Link></li>
              <li><Link href="/products" className="hover:text-white transition">สินค้า</Link></li>
              <li><Link href="/promotions" className="hover:text-white transition">โปรโมชั่น</Link></li>
              <li><Link href="/knowledge" className="hover:text-white transition">ความรู้เสริม</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">ติดต่อ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="https://www.facebook.com/VantaBlackService/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Facebook: จิรเมศร์ ทวีเดชเลิศวัชร์
                </a>
              </li>
              <li>
                <a href="mailto:vantablackservice@gmail.com" className="hover:text-white transition">
                  📧 Email: vantablackservice@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:0971493615" className="hover:text-white transition">
                  📞 โทร: 097-149-3615
                </a>
              </li>
              <li>
                <a 
                  href="https://line.me/ti/p/Z_i-rJIdQm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  💬 Line: benz.kpw (ช่างเบนซ์)
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/@lwpk7428/videos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  📺 YouTube: จิรเมศร์ ทวีเดชเลิศวัชร์
                </a>
              </li>
              <li className="text-gray-400">⏰ เวลาเปิดทำการ: ทุกวัน 10:00 - 22:00 น.</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 VantaBlack Service. สงวนลิขสิทธิ์</p>
          <p className="text-gray-500 text-sm mt-2">Made with ❤️ for quality phone service</p>
        </div>
      </div>
    </footer>
  )
}
