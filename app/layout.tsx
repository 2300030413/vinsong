import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VIN Song',
  description: 'Created with love for music',
  generator: 'fsad project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
