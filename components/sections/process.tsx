'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    number: '01',
    title: 'Strategy',
    description: 'Understanding your goals, audience, and technical requirements.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Crafting intuitive interfaces with attention to detail and user experience.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Building robust, scalable solutions with clean, maintainable code.',
  },
  {
    number: '04',
    title: 'Optimization',
    description: 'Testing, monitoring, and optimizing for peak performance and reliability.',
  },
]

export function ProcessSection() {
  const [visibleSteps, setVisibleSteps] = useState(new Set<number>())
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => new Set(prev).add(index))
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
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
            Our Process
          </h2>
          <p className="text-lg text-foreground/60 mt-4 max-w-2xl">
            A proven methodology to deliver exceptional results consistently.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`relative transition-all duration-500 delay-${index * 100} ${
                visibleSteps.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Connection Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 -right-6 w-12 h-0.5 bg-gradient-to-r from-accent to-accent/20" />
              )}

              {/* Step Card */}
              <div className="flex gap-4 sm:gap-6">
                {/* Number Circle */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent text-accent font-bold text-lg">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
