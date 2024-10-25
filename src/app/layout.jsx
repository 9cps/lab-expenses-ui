import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import NavBars, { NavigationEvents } from '../components/NavBars'
import logoIcon from './coin.ico'
import Providers from '@/components/Providers'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Expense WebApplication',
  description: 'Survey your statement',
  icons: {
    icon: '/coin.ico',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <NavBars /> */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
