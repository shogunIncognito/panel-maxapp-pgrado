import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import 'animate.css'
import SessionAuthProvider from '@/context/SessionProviderContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MaxPanel',
  description: 'Pagina de MaxAutos'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Toaster />
        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
