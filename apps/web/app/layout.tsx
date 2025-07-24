// apps/web/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'No Surrender Forge',
  description: 'Weapon upgrade game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="font-galano">{children}</body>
    </html>
  )
}