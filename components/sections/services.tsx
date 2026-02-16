'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  {
    title: 'Web Platforms',
    description: 'High-performance, SEO-first architecture built for measurable growth.',
  },
  {
    title: 'Mobile Applications',
    description: 'Scalable iOS and Android systems engineered for long-term reliability.',
  },
  {
    title: 'Custom Software Systems',
    description: 'Business workflow and operational platforms tailored to your model.',
  },
  {
    title: 'AI Integration & Automation',
    description: 'Intelligent automation, AI assistants, and connected data systems.',
  },
  {
    title: 'Payment & Infrastructure Integration',
    description: 'Secure gateway, API, and backend integrations for critical operations.',
  },
]

export function ServicesSection() {
  const [visibleItems, setVisibleItems] = useState(new Set<number>())
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index))
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section
      id="services"
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
            Integrated capabilities for building resilient, scalable digital systems.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`p-6 sm:p-7 border border-border rounded-lg bg-card shadow-[0_2px_8px_rgba(17,17,17,0.03)] transition-all duration-300 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <div className="inline-block mb-4">
                <span className="text-xs font-semibold tracking-[0.08em] text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
