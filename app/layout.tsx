import { Footer, NavBar } from '@/components'
import './globals.css'

export const metadata = {
  title: 'Car Rental App',
  description: 'Rent any car you want!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        <NavBar />
        {children}
        <Footer />
        </body>
    </html>
  )
}
