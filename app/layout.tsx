import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://qrcraft.ai'),
  title: 'QRCraft AI — Free Real-Time QR Code Generator',
  description: 'Create beautiful, real-time QR codes from any URL or text. Customize colors, download PNG or SVG, and generate privately in your browser.',
  keywords: ['QR code generator', 'free QR code generator', 'real-time QR code', 'QR code maker', 'PNG QR code', 'SVG QR code'],
  authors: [{ name: 'Afaq Ahmad' }],
  creator: 'Afaq Ahmad',
  publisher: 'QRCraft AI',
  generator: 'QRCraft AI',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://qrcraft.ai',
    title: 'QRCraft AI — Free Real-Time QR Code Generator',
    description: 'Turn any URL or text into a beautiful, downloadable QR code instantly.',
    siteName: 'QRCraft AI',
    images: [{ url: '/afaq-ahmad.jpeg', width: 1098, height: 1368, alt: 'Afaq Ahmad, developer of QRCraft AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QRCraft AI — Free Real-Time QR Code Generator',
    description: 'Create and download real QR codes instantly, privately, and for free.',
    images: ['/afaq-ahmad.jpeg'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#07111f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-[#07111f] ${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
