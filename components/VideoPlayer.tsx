'use client'

interface VideoPlayerProps {
  url: string
  className?: string
}

export default function VideoPlayer({ url, className = '' }: VideoPlayerProps) {
  // ตรวจสอบว่าเป็น YouTube URL หรือไม่
  const isYouTube = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/.test(url)
  
  // ตรวจสอบว่าเป็น Vimeo URL หรือไม่
  const isVimeo = /vimeo\.com\/(\d+)/.test(url)

  // แปลง YouTube URL เป็น embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`
    }
    return url
  }

  // แปลง Vimeo URL เป็น embed URL
  const getVimeoEmbedUrl = (url: string): string => {
    const match = url.match(/vimeo\.com\/(\d+)/)
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}`
    }
    return url
  }

  if (isYouTube) {
    return (
      <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={getYouTubeEmbedUrl(url)}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (isVimeo) {
    return (
      <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={getVimeoEmbedUrl(url)}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // Direct video URL (MP4, WebM, etc.)
  return (
    <video 
      controls 
      className={`w-full rounded-lg ${className}`}
      src={url}
    >
      เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
    </video>
  )
}
