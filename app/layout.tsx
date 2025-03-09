import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Batt - Maximizing Your Batter Life",
  description: "Maximizing Your Batter Life",
  icons: {
    icon: [
      { url: '/batt.svg', type: 'image/svg+xml' },
      //{ url: '/favicon.ico' }
    ],
  },
  openGraph: {
    title: "Batt",
    description: "Maximizing Your Batter Life",
    images: [{
      url: 'https://batt-gilt.vercel.app/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Batt",
    description: "Maximizing Your Battery Life 🚀",
    images: ['http://batt-gilt.vercel.app/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
