import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { NavigationEvents } from '../components/NavigationEvents'
import logoIcon from './coin.ico'
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
        {children}
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  )
}
