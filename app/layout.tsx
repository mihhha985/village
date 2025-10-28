import type { Metadata } from 'next'
import '@/src/styles/globals.css'

export const metadata: Metadata = {
  title: 'DeРевня - бронирование домов в деревне',
  description: 'Новый уровень отдыха в деревне с комфортом и уютом. Бронируйте дома для незабываемых выходных!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}