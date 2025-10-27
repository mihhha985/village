import type { Metadata } from 'next'
import { Oranienbaum, Manrope} from 'next/font/google'
import '@/src/styles/globals.css'

const oranienbaum = Oranienbaum({
	subsets: ['latin', 'cyrillic'],
	weight: ['400'],
	variable: '--font-oranienbaum',
});

const manrope = Manrope({
	subsets: ['latin', 'cyrillic'],
	weight: ['200', '300', '400'],
	variable: '--font-manrope',
});

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
      <body className={`${oranienbaum.variable} ${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}