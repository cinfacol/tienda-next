"use client"

import './globals.css';
import { Providers } from './pages/_app';
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
