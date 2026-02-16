'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'North American Medical Research & Learning Center (NAMRL)',
    description: 'Clinical research learning platform for medical professionals',
    img: '/namrl.png',
    metrics: {
      lighthouse: 83,
      SEO: 100,
      lcp: '2.8s',
    },
    tags: ['Next.js', 'TyepeScript', 'Tailwind','Framer Motion'],
  },
  {
    id: 2,
    title: 'KIYOMI Facilities',
    description: 'Enterprise facility management website',
    img: '/kiyomi.png',
    metrics: {
      lighthouse: 97,
      SEO : 100,
      lcp: '0.9s',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
]

export function WorkSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState(new Set<number>())
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(index))
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
      id="work"
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
            Selected Work
          </h2>
          <p className="text-lg text-foreground/60 mt-4 max-w-2xl">
            Projects that demonstrate our commitment to excellence and performance.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                refs.current[index] = el
              }}
              className={`group cursor-pointer transition-all duration-500 ${
                visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Project Card */}
              <div className="rounded-lg overflow-hidden border border-border hover:border-accent/30 transition-colors duration-300">
                {/* Image Placeholder */}
                <div className="relative w-full aspect-video bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/60 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics (Show on hover) */}
                  <div
                    className={`border-t border-border pt-6 grid grid-cols-3 gap-4 transition-all duration-300 ${
                      hoveredId === project.id
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">Lighthouse</p>
                      <p className="text-lg font-bold text-accent">
                        {project.metrics.lighthouse}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">Largest Contentful Paint</p>
                      <p className="text-lg font-bold text-accent">
                        {project.metrics.lcp}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">SEO Score</p>
                      <p className="text-lg font-bold text-accent">
                        {project.metrics.SEO}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
