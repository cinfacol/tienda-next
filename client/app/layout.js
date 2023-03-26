import './globals.css';
import { Providers } from './redux/provider';
import Head from '@/components/head';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <Head />
      <body>
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  )
}
