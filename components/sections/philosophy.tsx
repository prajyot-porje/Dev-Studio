'use client'

import { useEffect, useRef, useState } from 'react'

export function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Main Philosophy Statement */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-relaxed mb-8 text-balance">
            We don't just build websites. We engineer digital systems designed
            for <span className="text-accent">measurable growth.</span>
          </p>

          {/* Supporting Text */}
          <div className="space-y-6 text-foreground/70 leading-relaxed">
            <p className="text-lg sm:text-xl">
              Every project is an opportunity to create something that moves the needle.
              We focus on performance, user experience, and business outcomes—not just
              aesthetics.
            </p>

            <p className="text-base sm:text-lg">
              Our approach combines technical excellence with strategic thinking, ensuring
              your digital presence becomes a competitive advantage.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`my-12 sm:my-16 h-px bg-gradient-to-r from-transparent via-border to-transparent transition-all duration-700 ${
            isVisible ? 'opacity-100 w-full' : 'opacity-0 w-0'
          }`}
        />

        {/* Values Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {[
            { label: 'Performance', icon: '⚡' },
            { label: 'Reliability', icon: '✓' },
            { label: 'Scalability', icon: '📈' },
          ].map((value, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{value.icon}</div>
              <p className="font-semibold text-foreground">{value.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
