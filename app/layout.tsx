import type { Metadata, Viewport } from 'next'
import { DM_Sans, IBM_Plex_Mono, Outfit } from 'next/font/google'

import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Dev Studio | Premium Technology Consultancy',
  description:
    'Dev Studio engineers digital growth through high-performance web platforms, mobile applications, custom software, and AI automation.',
  keywords: [
    'premium technology consultancy',
    'web platform development',
    'custom software development',
    'ai automation',
    'digital growth',
  ],
  creator: 'Dev Studio',
  metadataBase: new URL('https://devstudio.com'),
  openGraph: {
    title: 'Dev Studio | Engineering Digital Growth',
    description:
      'Build systems, not just websites. We design and engineer premium digital systems for measurable business outcomes.',
    type: 'website',
    url: 'https://devstudio.com',
    siteName: 'Dev Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Studio | Premium Technology Consultancy',
    description:
      'Engineering digital growth with web, mobile, software, and AI systems designed for scale.',
  },
  icons: {
    icon: '/favicon-dark.png',
    shortcut: '/favicon-dark.png',
    apple: '/favicon-dark.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try { if (localStorage.theme === 'light') { document.documentElement.classList.remove('dark') } else { document.documentElement.classList.add('dark') } } catch (e) { document.documentElement.classList.add('dark') }`,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${dmSans.variable} ${ibmPlexMono.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  )
}
