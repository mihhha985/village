import type { Metadata } from 'next'
import { Toaster } from "@/src/lib/ui/sonner"
import '@/src/styles/globals.css'

export const metadata: Metadata = {
  title: 'TheВилла — бронирование домов за городом',
  description: 'Новый уровень отдыха в деревне с комфортом и уютом. Бронируйте дома для незабываемых выходных!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
				<Toaster />
      </body>
    </html>
  )
}
