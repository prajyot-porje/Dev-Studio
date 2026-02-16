'use client'

import { LogoMark } from '@/components/logo-mark'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    if (!mounted) return

    const html = document.documentElement
    const isDark = html.classList.contains('dark')

    if (isDark) {
      html.classList.remove('dark')
      localStorage.theme = 'light'
      setIsDark(false)
    } else {
      html.classList.add('dark')
      localStorage.theme = 'dark'
      setIsDark(true)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="inline-flex gap-4 items-center hover:opacity-80 transition-opacity">
          <LogoMark className="w-12 h-12" />
                    <span className="hidden sm:inline text-xl font-semibold tracking-tight">Dev Studio</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#work"
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Work
          </Link>
          <Link
            href="#services"
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="#contact"
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </header>
  )
}
