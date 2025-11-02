# วิธี Deploy เว็บไซต์ให้ทุกคนเข้าถึงได้

## 🚀 วิธีที่ 1: Deploy บน Vercel (แนะนำ - ง่ายและฟรี)

Vercel เป็นแพลตฟอร์มที่เหมาะกับ Next.js มากที่สุด มีบริการฟรี

### ขั้นตอนการ Deploy:

#### วิธีที่ 1: Deploy ผ่านเว็บ Vercel (ง่ายที่สุด)

1. **สร้าง GitHub Repository** (ถ้ายังไม่มี):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/phone-store.git
   git push -u origin main
   ```

2. **ไปที่ [Vercel.com](https://vercel.com)**:
   - ลงทะเบียน/เข้าสู่ระบบด้วย GitHub account
   - คลิก "Add New Project"
   - เลือก repository ของคุณ
   - Vercel จะ detect Next.js อัตโนมัติ
   - คลิก "Deploy"

3. **ตั้งค่า Environment Variables** (ถ้าต้องการส่งอีเมล):
   - ไปที่ Project Settings > Environment Variables
   - เพิ่ม:
     - `SMTP_HOST` = smtp.gmail.com
     - `SMTP_PORT` = 587
     - `SMTP_USER` = your-email@gmail.com
     - `SMTP_PASS` = your-app-password

4. **เว็บไซต์พร้อมใช้งาน!**
   - Vercel จะให้ URL เช่น: `https://your-project.vercel.app`
   - สามารถตั้งค่า custom domain ได้

#### วิธีที่ 2: Deploy ผ่าน Vercel CLI

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Deploy
vercel

# สำหรับ production
vercel --prod
```

---

## 🌐 วิธีที่ 2: Deploy บน Netlify

1. **สร้าง GitHub Repository** (เหมือน Vercel)

2. **ไปที่ [Netlify.com](https://www.netlify.com)**:
   - ลงทะเบียนด้วย GitHub
   - คลิก "Add new site" > "Import an existing project"
   - เลือก repository
   - ตั้งค่า:
     - Build command: `npm run build`
     - Publish directory: `.next`

3. **ตั้งค่า Environment Variables** ใน Site settings

---

## 💻 วิธีที่ 3: Deploy บน Server ของตัวเอง

### Build และทดสอบก่อน Deploy:

```bash
# Build เว็บไซต์
npm run build

# ทดสอบ production build
npm start
```

### ใช้กับ VPS/Server:

1. **เตรียม Server** (แนะนำ Ubuntu):
   - ติดตั้ง Node.js และ npm
   - ติดตั้ง PM2 สำหรับจัดการ process

2. **Deploy code:**
   ```bash
   # Clone repository
   git clone your-repo-url
   cd phone-store
   
   # ติดตั้ง dependencies
   npm install
   
   # Build
   npm run build
   
   # ใช้ PM2 รัน
   pm2 start npm --name "phone-store" -- start
   pm2 save
   ```

3. **ตั้งค่า Nginx** (reverse proxy):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 📝 สิ่งที่ต้องตรวจสอบก่อน Deploy:

### 1. Build และทดสอบ:
```bash
npm run build
npm start
```
ตรวจสอบว่าไม่มี errors

### 2. ตรวจสอบไฟล์ที่ต้อง ignore:
- `.env` (ไม่ควร commit ขึ้น GitHub)
- `node_modules/`
- `.next/`

### 3. Environment Variables:
ถ้าใช้ SMTP สำหรับส่งอีเมล ต้องตั้งค่าใน hosting platform:
- Vercel: Project Settings > Environment Variables
- Netlify: Site settings > Environment variables

### 4. ข้อมูลสำคัญ:
- ✅ GitHub repository ต้องเป็น public หรือเชื่อมต่อกับ hosting platform
- ✅ ตรวจสอบว่า `.gitignore` ถูกต้อง
- ✅ ข้อมูลใน `lib/data.json` จะถูก commit (หรือใช้ database แทนในอนาคต)

---

## 🔒 Custom Domain (ชื่อโดเมนของคุณเอง):

### Vercel:
1. ไปที่ Project Settings > Domains
2. เพิ่ม domain ของคุณ
3. ตั้งค่า DNS records ตามที่ Vercel บอก

### Netlify:
1. ไปที่ Domain settings
2. Add custom domain
3. ตั้งค่า DNS

---

## 📊 ตัวเลือก Hosting อื่นๆ:

- **Railway**: https://railway.app
- **Render**: https://render.com
- **Fly.io**: https://fly.io
- **DigitalOcean App Platform**: https://www.digitalocean.com/products/app-platform

---

## ⚠️ หมายเหตุสำคัญ:

1. **Database**: ตอนนี้ใช้ JSON file ซึ่งจะ reset ทุกครั้งที่ deploy ใหม่
   - ควรเปลี่ยนเป็น database จริง (เช่น MongoDB, PostgreSQL) ในอนาคต

2. **File Storage**: ถ้าต้องการ upload รูป ควรใช้บริการ cloud storage (เช่น Cloudinary, AWS S3)

3. **Environment Variables**: อย่าลืมตั้งค่าทั้งใน local และ production

---

## 🎉 หลังจาก Deploy สำเร็จ:

1. แชร์ URL ของเว็บไซต์
2. ทดสอบทุกหน้าที่สำคัญ
3. ตรวจสอบว่า contact form ทำงานได้ (ถ้ายังใช้อยู่)
4. ตรวจสอบ responsive design บนมือถือ

---

## 🆘 ถ้ามีปัญหา:

- ตรวจสอบ Build logs ใน hosting platform
- ดู Console errors ใน browser
- ตรวจสอบ Environment Variables
- ดู Documentation ของ hosting platform ที่ใช้

