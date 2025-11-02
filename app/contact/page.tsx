export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">ติดต่อเรา</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">ข้อมูลติดต่อ</h2>
          
          <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <h3 className="font-bold mb-3 text-primary-800 text-lg">บริการของเรา 🔧📱</h3>
            <div className="space-y-3 text-gray-700 leading-relaxed text-sm">
              <p>
                💻 <strong>ซ่อมโทรศัพท์ทุกอาการ</strong> – หน้าจอแตก, แบตเสื่อม, กล้องเสีย, เครื่องเปิดไม่ติด, น้ำเข้า และปัญหาอื่น ๆ
              </p>
              <p>
                📲 <strong>ลงรอม / อัปเกรดระบบ</strong> – ปรับแต่งรอม ลงเฟิร์มแวร์ แก้บั๊ก รีเซ็ตเครื่อง หรือติดตั้งแอปเฉพาะทาง
              </p>
              <p>
                🔓 <strong>ปลดล็อกทุกระบบ</strong> – Android / iPhone / iCloud / Gmail / FRP / รหัสผ่าน / ลืมแพตเทิร์น
              </p>
              <p className="pt-2 border-t border-primary-200">
                ⚡ <strong>ครบวงจร</strong> – จบในที่เดียว – รับประกันทุกงานซ่อม มีอะไหล่แท้ บริการรวดเร็ว ราคายุติธรรม
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">ที่อยู่ร้าน</h3>
            <p className="text-gray-700 leading-relaxed">
              หมู่บ้าน โฮมเซนเตอร์ 88/66<br />
              เขตสายไหม กรุงเทพมหานคร 10220
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Facebook</h3>
              <a 
                href="https://www.facebook.com/VantaBlackService/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                จิรเมศร์ ทวีเดชเลิศวัชร์
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">อีเมล</h3>
              <a 
                href="mailto:vantablackservice@gmail.com"
                className="text-primary-600 hover:text-primary-700"
              >
                vantablackservice@gmail.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">โทรศัพท์</h3>
              <a 
                href="tel:0971493615"
                className="text-primary-600 hover:text-primary-700"
              >
                097-149-3615
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Line</h3>
              <div className="space-y-2">
                <a 
                  href="https://line.me/ti/p/Z_i-rJIdQm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
                >
                  <span>💬</span>
                  <span>benz.kpw (ช่างเบนซ์)</span>
                </a>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://line.me/ti/p/Z_i-rJIdQm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://line.me/ti/p/Z_i-rJIdQm`}
                      alt="Line QR Code"
                      className="w-32 h-32 border-2 border-gray-300 rounded-lg"
                    />
                  </a>
                  <div className="text-sm text-gray-600">
                    <p>สแกน QR Code</p>
                    <p>เพื่อเพิ่มเพื่อน</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">YouTube</h3>
              <a 
                href="https://www.youtube.com/@lwpk7428/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
              >
                <span>📺</span>
                <span>จิรเมศร์ ทวีเดชเลิศวัชร์</span>
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">เวลาเปิดทำการ</h3>
              <p className="text-gray-600">ทุกวัน 10:00 - 22:00 น.</p>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">แผนที่ร้าน</h2>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.597028652!2d100.6839936!3d13.9280775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e283c9df8efe01%3A0xecc4bf8d4fe1cba1!2z4Lir4Li34LiZ4Lir4LiB4LmE4LiX4LijIEVsZWN0cm9uaWNz!5e0!3m2!1sth!2sth!4v1735468800000!5m2!1sth!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-lg"
            />
          </div>
          <a
            href="https://www.google.com/maps/place/%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%AA%E0%B8%B1%E0%B8%81+Lamaiink/@13.9280775,100.6839936,21z/data=!4m6!3m5!1s0x30e283c9df8efe01:0xecc4bf8d4fe1cba1!8m2!3d13.9281023!4d100.6840256!16s%2Fg%2F11k3kyr3lz?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center gap-1 mt-2 font-semibold"
          >
            เปิดใน Google Maps →
          </a>
        </div>
      </div>
    </div>
  )
}
