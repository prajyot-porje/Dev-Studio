'use client'

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { LogoMark } from '@/components/logo-mark'
import { Button } from '@/components/ui/button-premium'
import { NAV_ITEMS } from '@/lib/site-content'

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    if (!mounted) return

    const html = document.documentElement
    const currentlyDark = html.classList.contains('dark')

    if (currentlyDark) {
      html.classList.remove('dark')
      localStorage.theme = 'light'
      setIsDark(false)
      return
    }

    html.classList.add('dark')
    localStorage.theme = 'dark'
    setIsDark(true)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="section-inner flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-background/72 px-4 backdrop-blur-xl sm:px-5">
        <Link href="#top" className="inline-flex items-center gap-3 transition-opacity hover:opacity-85">
          <span className="font-heading text-2xl p-4 font-semibold tracking-tight">Dev Studio</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-foreground/76 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="#contact" className="hidden sm:inline-flex">
            <Button variant="primaryBlue" size="sm" className="rounded-lg px-4">
              Contact Us
            </Button>
          </Link>

          {mounted && (
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-background/70 text-foreground transition-colors hover:bg-secondary"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
