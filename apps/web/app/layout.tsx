import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'No Surrender Forge',
  description: 'Epic weapon forging game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="font-galano bg-gradient-to-br from-bg-dark-start to-bg-dark-end min-h-screen">
        {children}
      </body>
    </html>
  );
}