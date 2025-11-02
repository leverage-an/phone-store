# VantaBlack Service - เว็บไซต์ร้านโทรศัพท์

เว็บไซต์ร้านโทรศัพท์มือสองพร้อมระบบหลังบ้านสำหรับจัดการสินค้าและโปรโมชั่น

**เว็บไซต์:** https://ร้านโทรศัพท์.com

---
**อัพเดท:** เว็บไซต์พร้อมใช้งานแล้ว

## คุณสมบัติ

- 🏠 **หน้าหลัก** - แสดงข้อมูลร้านและโปรโมชั่นพิเศษ
- 📱 **หน้าสินค้า** - แสดงรายการสินค้าทั้งหมด
- 🎉 **หน้าโปรโมชั่น** - แสดงโปรโมชั่นพิเศษ
- 📞 **หน้าติดต่อ** - ข้อมูลติดต่อและฟอร์มส่งข้อความ
- 🔧 **หลังบ้าน** - ระบบจัดการสินค้าและโปรโมชั่น

## การติดตั้ง

1. ติดตั้ง dependencies:
```bash
npm install
```

2. ติดตั้ง nodemailer สำหรับส่งอีเมล (ถ้าต้องการ):
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

3. ตั้งค่า environment variables:
```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env` และตั้งค่า:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**สำหรับ Gmail:**
1. เปิดการใช้งาน 2-Step Verification
2. ไปที่ https://myaccount.google.com/apppasswords
3. สร้าง App Password สำหรับ "Mail"
4. ใช้ App Password ใน SMTP_PASS

4. รันเว็บไซต์ในโหมด development:
```bash
npm run dev
```

5. เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## การใช้งาน

### หน้าหลัก
- แสดงข้อมูลร้าน โปรโมชั่นพิเศษ และสินค้าขายดี

### หลังบ้าน (Admin Panel)
- เข้าถึงได้ที่ `/admin`
- **จัดการสินค้า**: เพิ่ม, แก้ไข, ลบสินค้า (รองรับรูปภาพหลายรูปและวิดีโอ)
- **จัดการโปรโมชั่น**: เพิ่ม, แก้ไข, ลบโปรโมชั่น (รองรับรูปภาพหลายรูปและวิดีโอ)

### ฟอร์มติดต่อ
- บันทึกข้อความไว้ใน `lib/messages.json`
- ส่งอีเมลอัตโนมัติไปยัง `vantablackservice@gmail.com` (ถ้าตั้งค่า SMTP)
- ถ้าไม่ได้ตั้งค่า SMTP จะสร้าง mailto link

### API Endpoints

#### Products
- `GET /api/products` - ดึงรายการสินค้าทั้งหมด
- `POST /api/products` - เพิ่มสินค้าใหม่
- `GET /api/products/[id]` - ดึงสินค้าตาม ID
- `PUT /api/products/[id]` - แก้ไขสินค้า
- `DELETE /api/products/[id]` - ลบสินค้า

#### Promotions
- `GET /api/promotions` - ดึงรายการโปรโมชั่นทั้งหมด
- `POST /api/promotions` - เพิ่มโปรโมชั่นใหม่
- `GET /api/promotions/[id]` - ดึงโปรโมชั่นตาม ID
- `PUT /api/promotions/[id]` - แก้ไขโปรโมชั่น
- `DELETE /api/promotions/[id]` - ลบโปรโมชั่น

#### Contact
- `POST /api/contact` - ส่งข้อความติดต่อ (บันทึกและส่งอีเมล)

## โครงสร้างโปรเจกต์

```
phone-store/
├── app/
│   ├── api/           # API routes
│   ├── admin/         # หน้าหลังบ้าน
│   ├── products/      # หน้าสินค้า
│   ├── promotions/    # หน้าโปรโมชั่น
│   ├── contact/       # หน้าติดต่อ
│   └── page.tsx       # หน้าหลัก
├── components/        # React components
│   ├── admin/         # Components สำหรับหลังบ้าน
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── VideoPlayer.tsx
├── lib/              # Utilities และ database
│   ├── db.ts         # Database functions
│   ├── data.json     # ข้อมูลสินค้าและโปรโมชั่น
│   └── messages.json # ข้อความติดต่อ (auto-generated)
└── public/           # Static files
```

## เทคโนโลยีที่ใช้

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **JSON File** - Database (สามารถเปลี่ยนเป็น database จริงได้)
- **Nodemailer** - Email sending (optional)

## การ Deploy เว็บไซต์

สำหรับวิธี deploy เว็บไซต์ให้ทุกคนเข้าถึงได้ ดูที่ไฟล์ [DEPLOY.md](./DEPLOY.md)

### ตัวเลือกที่แนะนำ:
1. **Vercel** - ง่ายที่สุด เหมาะกับ Next.js (แนะนำ)
2. **Netlify** - ใช้งานง่าย มีบริการฟรี
3. **Self-hosted** - Deploy บน server ของตัวเอง

## การพัฒนาเพิ่มเติม

- ✅ เพิ่มระบบ authentication สำหรับหลังบ้าน
- ✅ เชื่อมต่อกับ database จริง (MongoDB, PostgreSQL, etc.)
- ✅ เพิ่มระบบ upload รูปภาพ
- ✅ เพิ่มระบบสั่งซื้อสินค้า
- ✅ เพิ่มระบบ notification
- ✅ เพิ่มระบบส่งอีเมลอัตโนมัติ

## License

MIT