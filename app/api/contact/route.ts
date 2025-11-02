import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      )
    }

    // สร้างเนื้อหาอีเมล
    const emailSubject = `ข้อความติดต่อจาก ${name} - VantaBlack Service`
    const emailContent = `
ชื่อ: ${name}
อีเมล: ${email}

ข้อความ:
${message}

---
ส่งมาจากเว็บไซต์ VantaBlack Service
เวลาที่ส่ง: ${new Date().toLocaleString('th-TH')}
    `.trim()

    // บันทึกข้อความไว้ในไฟล์ (สำหรับเก็บ log)
    try {
      const fs = require('fs')
      const path = require('path')
      const messagesPath = path.join(process.cwd(), 'lib', 'messages.json')
      
      let messages = []
      try {
        const existingData = fs.readFileSync(messagesPath, 'utf8')
        messages = JSON.parse(existingData)
      } catch (e) {
        // ไฟล์ยังไม่มี
      }
      
      messages.push({
        id: Date.now().toString(),
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
        read: false
      })
      
      fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), 'utf8')
    } catch (e) {
      console.error('Error saving message:', e)
    }

    // ส่งอีเมลผ่าน Gmail SMTP (ถ้ามีการตั้งค่า)
    // ตรวจสอบว่ามี environment variables สำหรับ email หรือไม่
    const hasEmailConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS

    if (hasEmailConfig) {
      try {
        const nodemailer = require('nodemailer')
        
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        })

        await transporter.sendMail({
          from: `"${name}" <${process.env.SMTP_USER}>`,
          replyTo: email,
          to: 'vantablackservice@gmail.com',
          subject: emailSubject,
          text: emailContent,
          html: emailContent.replace(/\n/g, '<br>')
        })

        return NextResponse.json({
          success: true,
          message: 'ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด'
        })
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // ถ้าส่งอีเมลไม่สำเร็จ ยังคงบันทึกข้อมูลไว้แล้ว
      }
    }

    // ถ้าไม่ได้ตั้งค่า email หรือส่งไม่สำเร็จ ให้ใช้ mailto link
    const subject = encodeURIComponent(emailSubject)
    const mailtoBody = encodeURIComponent(emailContent)
    const mailtoLink = `mailto:vantablackservice@gmail.com?subject=${subject}&body=${mailtoBody}`

    return NextResponse.json({
      success: true,
      message: 'บันทึกข้อความสำเร็จ! กรุณาตรวจสอบอีเมลของคุณ',
      mailtoLink,
      note: hasEmailConfig ? '' : 'หมายเหตุ: กรุณาตั้งค่า SMTP environment variables สำหรับส่งอีเมลอัตโนมัติ'
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการส่งข้อความ' },
      { status: 500 }
    )
  }
}
