'use client'

import { Button } from '@/components/ui/button-premium'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <svg
          viewBox="0 0 1200 700"
          className="w-full h-full"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 480 C260 360 520 620 900 440 C1010 385 1090 320 1200 330" stroke="#D1D5DB" strokeWidth="1" />
          <path d="M0 540 C300 420 540 680 980 510 C1080 470 1140 430 1200 400" stroke="#E5E7EB" strokeWidth="1" />
          <path d="M160 40 L1040 260 L860 640 L120 460 Z" stroke="#D1D5DB" strokeWidth="1" />
          <circle cx="910" cy="300" r="190" stroke="#D1D5DB" strokeWidth="1" />
          <circle cx="910" cy="300" r="130" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="720" y1="300" x2="1100" y2="300" stroke="#D1D5DB" strokeWidth="1" />
          <line x1="910" y1="110" x2="910" y2="490" stroke="#D1D5DB" strokeWidth="1" />
          <ellipse cx="910" cy="300" rx="190" ry="74" stroke="#E5E7EB" strokeWidth="1" />
          <ellipse cx="910" cy="300" rx="74" ry="190" stroke="#E5E7EB" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
        <div className="lg:col-span-7 lg:-mt-12">
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-4xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Engineering Intelligent Digital Systems.
          </h1>

          <p
            className={`mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            We build high-performance web platforms, mobile applications, and AI-powered systems designed for scale.
          </p>

          <div
            className={`mt-10 flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <Link href="#work">
              <Button size="lg" variant="primaryBlue" className="px-8">
                View Our Work
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outlineNeutral" className="px-8">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>

        <div
          className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          
        </div>
      </div>
    </section>
  )
}
