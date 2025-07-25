// apps/web/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Toast } from '../components/toast';

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
      <body>
        <Toast />
        {children}
      </body>
    </html>
  )
}