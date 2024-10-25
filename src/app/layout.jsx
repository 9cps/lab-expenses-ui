import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import NavBars, { NavigationEvents } from '../components/NavBars'
import Providers from '@/components/Providers'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Expense WebApplication',
  description: 'Survey your statement'
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/coin.ico" />
      <body className={inter.className}>
        <Providers>
          {/* <NavBars /> */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
